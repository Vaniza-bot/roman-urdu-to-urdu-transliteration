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
# Load model from Hugging Face instead of local path
MODEL_ID = os.getenv("MODEL_ID", "Vaniza-bot/roman-urdu-transliteration-model")

SOURCE_LANG = "en"   # Roman Urdu treated as English
TARGET_LANG = "ur"

print("🔄 Loading model and tokenizer...")

# ======================================
# ✅ Device Setup
# ======================================
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"🔄 Using device: {device}")

# ======================================
# ✅ Load Tokenizer
# ======================================
tokenizer = M2M100Tokenizer.from_pretrained("facebook/m2m100_418M")

# Add custom token safely
if "__roman-ur__" not in tokenizer.get_vocab():
    tokenizer.add_tokens(["__roman-ur__"], special_tokens=True)

# ======================================
# ✅ Load Model from Hugging Face
# ======================================
model = M2M100ForConditionalGeneration.from_pretrained(
    MODEL_ID,
    ignore_mismatched_sizes=True
)

# Resize embeddings if token added
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
    return jsonify({"message": "Roman Urdu Translator Running 🚀"})

# ======================================
# ✅ Run Server
# ======================================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7860)