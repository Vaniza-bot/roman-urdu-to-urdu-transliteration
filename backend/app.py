from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
    set_access_cookies,
    set_refresh_cookies,
    unset_jwt_cookies
)
import os
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))
import torch
from transformers import M2M100ForConditionalGeneration, M2M100Tokenizer
from datetime import timedelta

# ---------------- APP ----------------
app = Flask(__name__)

CORS(
    app,
    supports_credentials=True,
    origins=[os.getenv("FRONTEND_URL", "http://localhost:3001")]
)
)

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]

app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_COOKIE_HTTPONLY"] = True
app.config["JWT_COOKIE_SAMESITE"] = "Lax"
app.config["JWT_COOKIE_CSRF_PROTECT"] = False

app.config["JWT_ACCESS_COOKIE_PATH"] = "/"
app.config["JWT_REFRESH_COOKIE_PATH"] = "/"

app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=15)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=7)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# ---------------- MODELS ----------------
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)

class Transliteration(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    input_text = db.Column(db.Text, nullable=False)
    output_text = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer)

# ---------------- MODEL ----------------
MODEL_NAME = "Mavkif/m2m100_rup_rur_to_ur"
TOKENIZER_NAME = "Mavkif/m2m100_rup_tokenizer_both"

model = M2M100ForConditionalGeneration.from_pretrained(MODEL_NAME)
tokenizer = M2M100Tokenizer.from_pretrained(TOKENIZER_NAME)

device = torch.device("cpu")
model.to(device)

def translate_text(text):
    inputs = tokenizer(str(text), return_tensors="pt")

    outputs = model.generate(
        **inputs,
        forced_bos_token_id=tokenizer.get_lang_id("ur"),
        max_length=200
    )

    return tokenizer.batch_decode(outputs, skip_special_tokens=True)[0]

# ---------------- SIGNUP ----------------
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json

    email = data.get("email")
    password = data.get("password")

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "User already exists"}), 400

    hashed = bcrypt.generate_password_hash(password).decode("utf-8")

    new_user = User(email=email, password_hash=hashed)
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=str(new_user.id))
    refresh_token = create_refresh_token(identity=str(new_user.id))

    response = jsonify({
        "msg": "Signup successful",
        "success": True
    })

    set_access_cookies(response, access_token)
    set_refresh_cookies(response, refresh_token)

    return response

# ---------------- LOGIN ----------------
@app.route("/login", methods=["POST"])
def login():
    data = request.json

    user = User.query.filter_by(email=data.get("email")).first()

    if not user:
        return jsonify({"msg": "User not found"}), 404

    if not bcrypt.check_password_hash(user.password_hash, data.get("password")):
        return jsonify({"msg": "Wrong password"}), 401

    access_token = create_access_token(identity=str(user.id))
    refresh_token = create_refresh_token(identity=str(user.id))
    response = jsonify({
        "msg": "Login successful",
        "success": True
    })

    set_access_cookies(response, access_token)
    set_refresh_cookies(response, refresh_token)

    return response

# ---------------- REFRESH ----------------
@app.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    user_id = get_jwt_identity()

    new_token = create_access_token(identity=user_id)

    response = jsonify({"msg": "Token refreshed"})
    set_access_cookies(response, new_token)

    return response

# ---------------- TRANSLATE ----------------
@app.route("/translate", methods=["POST"])
@jwt_required()
def translate():
    user_id = get_jwt_identity()

    data = request.get_json()
    text_input = data.get("text")

    result = translate_text(text_input)

    db.session.add(Transliteration(
        input_text=text_input,
        output_text=result,
        user_id=user_id
    ))
    db.session.commit()

    return jsonify({
        "input": text_input,
        "output": result
    })

# ---------------- LOGOUT (FIXED) ----------------
@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "Logged out successfully", "success": True})

    unset_jwt_cookies(response)

    return response

# ---------------- ME ----------------
@app.route("/me", methods=["GET"])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))

    if not user:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({
        "success": True,
        "id": user.id,
        "email": user.email
    })

# ---------------- INIT DB ----------------
if __name__ == "__main__":
    app.run()

# ---------------- RUN ----------------
if __name__ == "__main__":
    app.run(debug=True)
