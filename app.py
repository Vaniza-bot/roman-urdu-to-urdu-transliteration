from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import M2M100ForConditionalGeneration, M2M100Tokenizer

app = Flask(__name__)
CORS(app)

model_name = "facebook/m2m100_418M"
tokenizer = M2M100Tokenizer.from_pretrained(model_name)
model = M2M100ForConditionalGeneration.from_pretrained(model_name)

@app.route("/")
def home():
    return "API Running"

@app.route("/translate", methods=["POST"])
def translate():
    data = request.get_json()
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    tokenizer.src_lang = "en"

    encoded = tokenizer(text, return_tensors="pt")
    tokens = model.generate(
        **encoded,
        forced_bos_token_id=tokenizer.get_lang_id("ur")
    )

    output = tokenizer.batch_decode(tokens, skip_special_tokens=True)[0]

    return jsonify({"output": output})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7860)