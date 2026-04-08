from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from transformers import M2M100Tokenizer, M2M100ForConditionalGeneration
import os

# ======================================
# ✅ Flask App Setup
# ======================================
app = Flask(__name__)
CORS(app)

# ======================================
# ✅ Configuration
# ======================================
# Update MODEL_PATH to the new folder on Desktop
MODEL_PATH = "C:/Users/shahid/Desktop/my_model"
SOURCE_LANG = "en"        # Roman Urdu can be treated as 'en'
TARGET_LANG = "ur"

print("🔄 Loading model and tokenizer...")

# ======================================
# ✅ Check local model folder
# ======================================
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Local model folder not found: {MODEL_PATH}")
else:
    print(f"✅ Local model folder found: {MODEL_PATH}")

# ======================================
# ✅ Device Setup
# ======================================
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"🔄 Using device: {device}")

# ======================================
# ✅ Load Tokenizer
# ======================================
# Use pre-trained tokenizer as base
tokenizer = M2M100Tokenizer.from_pretrained("facebook/m2m100_418M")

# Add custom token safely
if "__roman-ur__" not in tokenizer.get_vocab():
    tokenizer.add_tokens(["__roman-ur__"], special_tokens=True)

# ======================================
# ✅ Load Model
# ======================================
model = M2M100ForConditionalGeneration.from_pretrained(
    MODEL_PATH,
    ignore_mismatched_sizes=True
)

# Resize embeddings if a token was added
model.resize_token_embeddings(len(tokenizer))
model.to(device)

print(f"✅ Model loaded successfully on {device}!")
print("🚀 Backend Ready!")

# ======================================
# ✅ Translation Function
# ======================================
def translate_text(text):
    try:
        tokenizer.src_lang = SOURCE_LANG
        inputs = tokenizer(text, return_tensors="pt").to(device)

        generated_tokens = model.generate(
            **inputs,
            forced_bos_token_id=tokenizer.get_lang_id(TARGET_LANG),
            max_length=200
        )

        translated = tokenizer.batch_decode(
            generated_tokens,
            skip_special_tokens=True
        )[0]

        return translated

    except Exception as e:
        return f"Translation Error: {str(e)}"

# ======================================
# ✅ API Route
# ======================================
@app.route("/translate", methods=["POST"])
def translate():
    data = request.get_json()
    if not data or "text" not in data:
        return jsonify({"error": "No text provided"}), 400

    text = data["text"]
    result = translate_text(text)

    return jsonify({"translated_text": result})

# ======================================
# ✅ Health Check Route
# ======================================
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Roman Urdu Local Translator Running 🚀"})

# ======================================
# ✅ Run Server
# ======================================
if __name__ == "__main__":
    app.run(debug=True, port=5000)