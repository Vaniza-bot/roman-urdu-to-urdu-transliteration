# roman-urdu-to-urdu-transliteration
Web-based Roman Urdu to Urdu transliteration system using Transformer model

# Breaking the Language Barrier: Intelligent Roman Urdu to Urdu Transliteration Framework

> **A low-resource Natural Language Processing framework for automatic Roman Urdu → Urdu transliteration using multilingual Transformer models.**

This project investigates the use of pretrained multilingual Transformer architectures for converting Roman Urdu text into Urdu script. The work focuses on the challenges of transliteration in a **low-resource language setting**, where non-standard spelling, informal writing patterns, and limited standardized resources make accurate text conversion particularly challenging.

The project combines **Transformer-based model fine-tuning, dataset development, systematic evaluation, error analysis, and a web-based deployment** into an end-to-end transliteration framework.

---

## Research Overview

Roman Urdu is widely used in digital communication, but it is typically written without standardized spelling conventions. The same Urdu word may therefore appear in multiple Roman Urdu forms.

For example:

```text
Roman Urdu:
aap kaise hain

Urdu:  آپ کیسے ہیں
آپ کیسے ہیں
```

Such spelling variation creates challenges for conventional rule-based transliteration systems and motivates the use of data-driven neural approaches.

This research explores multilingual sequence-to-sequence Transformer models for learning the mapping:

```text
Roman Urdu  →  Transformer Model  →  Urdu Script
```

---

## Research Objectives

The project was designed around the following objectives:

* Develop a dataset for Roman Urdu–Urdu transliteration.
* Investigate multilingual Transformer models for low-resource transliteration.
* Fine-tune pretrained sequence-to-sequence models for the Roman Urdu → Urdu task.
* Compare model performance using multiple automatic evaluation metrics.
* Analyze common transliteration errors and challenges.
* Develop a web-based application for practical transliteration.

---

## Models

Two multilingual Transformer architectures were investigated:

| Model      | Architecture                                  | Purpose                                |
| ---------- | --------------------------------------------- | -------------------------------------- |
| **M2M100** | Multilingual sequence-to-sequence Transformer | Roman Urdu → Urdu transliteration      |
| **mBART**  | Multilingual sequence-to-sequence Transformer | Comparative transliteration experiment |

The models were fine-tuned using the **Hugging Face Transformers** framework.

---

## Dataset

A dedicated Roman Urdu–Urdu sentence-pair dataset was prepared for this research.

### Dataset characteristics

* **Task:** Roman Urdu → Urdu transliteration
* **Data type:** Sentence-level parallel pairs
* **Approximate size:** ~20,000 sentence pairs
* **Source language:** Roman Urdu
* **Target language:** Urdu
* **Data preparation:** Cleaning, preprocessing, normalization, and transliteration-pair preparation
* **Evaluation setup:** Training / validation / test split

The dataset preparation process focused on representing the spelling variability commonly found in Roman Urdu.

> **Note:** The complete dataset is not included in this repository where redistribution may be restricted. A representative sample may be provided where appropriate.

---

## Methodology

The overall research workflow follows an end-to-end Transformer-based sequence-to-sequence approach.

```text
                    ┌─────────────────────┐
                    │     Roman Urdu      │
                    │       Input         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Data Preprocessing  │
                    │ & Normalization     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Tokenization     │
                    └──────────┬──────────┘
                               │
                     ┌─────────┴─────────┐
                     ▼                   ▼
              ┌─────────────┐     ┌─────────────┐
              │   M2M100    │     │    mBART    │
              │ Fine-Tuning │     │ Fine-Tuning │
              └──────┬──────┘     └──────┬──────┘
                     │                   │
                     └─────────┬─────────┘
                               ▼
                    ┌─────────────────────┐
                    │   Urdu Prediction   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Model Evaluation &  │
                    │   Error Analysis    │
                    └─────────────────────┘
```

---

## Experimental Setup

The experiments were implemented using the Hugging Face Transformers ecosystem.

### Core technologies

* Python
* Hugging Face Transformers
* Hugging Face Datasets
* Google Colab
* Jupyter Notebook
* Pandas
* NumPy
* Scikit-learn
* SacreBLEU / evaluation utilities
* JiWER

### Training pipeline

```text
Dataset
   ↓
Preprocessing
   ↓
Tokenizer
   ↓
Train / Validation / Test Split
   ↓
Transformer Fine-Tuning
   ↓
Model Checkpoint
   ↓
Inference
   ↓
Evaluation
```

---

## Evaluation

Multiple complementary metrics were used to evaluate transliteration quality.

| Metric               |             M2M100 |              mBART |
| -------------------- | -----------------: | -----------------: |
| BLEU                 | **81.20**          |    **75.26 **      |
| ChrF                 | **90.39**          |  **86.66**         |
| Character-level BLEU | **92.49**          |  **89.46**         |
| CER                  | **0.039**          |  **0.056**         |
| WER                  | **0.091**          |  **0.120**         |

### Metric interpretation

* **BLEU** — evaluates n-gram overlap between generated and reference translations.
* **ChrF** — evaluates character-level similarity and is particularly useful for transliteration.
* **Character-level BLEU** — captures similarity at the character level.
* **CER** — measures character-level transcription errors.
* **WER** — measures word-level transcription errors.

> **Replace the values above with the final results reported in the research manuscript.**

---

## Qualitative Examples

The following section demonstrates representative transliteration outputs.

| # | Roman Urdu Input                              | Reference Urdu                   | Model Output                     |
| - | ----------------------------------------------| ---------------------------------| -------------------------------- |
| 1 | `bohat shukria aap ka is izzat afzai ke liye` | `بہت شکریہ آپ کا اس عزت افزائی کے لیے` | `بہت شکریہ آپ کا اس عزت افزائی کے لیے` |
| 2 | `gussa mein kuch bhi ho sakta hai`            | `غصہ میں کچھ بھی ہو سکتا ہے`  |         `غصہ میں کچھ بھی ہو سکتا ہے`         |
| 3 | `aaj ke din to bohat hi masroof rahi hon` | `آج کے دن تو بہت ہی مصروف رہی ہوں` |       `آج کے دن تو بہت ہی مصروف رہی ہوں`   |


These examples can be expanded to include both successful predictions and representative failure cases.

---

## Error Analysis

Roman Urdu transliteration presents several challenges that can affect Transformer-based models.

### Spelling Variation

The same Urdu word may be represented using different Roman Urdu spellings.

```text
Example:
"kaise"
"kaisay"
"kesay"
```

Such variation increases the difficulty of learning a consistent mapping.

### Unseen or Rare Words

Words that occur rarely or do not appear in the training data may produce incorrect or partially incorrect Urdu outputs.

### Informal Language

Roman Urdu is frequently used in informal digital communication, resulting in inconsistent spelling, abbreviations, and conversational expressions.

### Ambiguity

A single Roman Urdu form can sometimes correspond to multiple Urdu interpretations depending on context.

### Character-Level Errors

Some predictions may be semantically understandable but contain minor character-level differences, making character-based evaluation particularly important.

---

## Web Application

To demonstrate practical use of the trained model, a web-based transliteration application was developed.

### Application architecture

```text
┌─────────────────────┐
│   React Frontend    │
│                     │
│ User Input / Output │
└──────────┬──────────┘
           │
           │ HTTP Requests
           ▼
┌─────────────────────┐
│    Flask Backend    │
│                     │
│ REST API + Auth     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Fine-Tuned M2M100   │
│ Transliteration     │
│ Model               │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    Urdu Output      │
└─────────────────────┘
```

The application provides a practical interface through which users can submit Roman Urdu text and receive the corresponding Urdu transliteration.

---

## Repository Structure

```text
roman-urdu-to-urdu-transliteration/
│
├── backend/
│   └── app.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
│
├── README.md
├── requirements.txt
├── LICENSE
└── .gitignore
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/[YOUR-USERNAME]/roman-urdu-to-urdu-transliteration.git
cd roman-urdu-to-urdu-transliteration
```

### 2. Create a Python environment

```bash
python -m venv venv
```

Activate the environment.

**Windows:**

```bash
venv\Scripts\activate
```

**Linux / macOS:**

```bash
source venv/bin/activate
```

### 3. Install backend dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file locally.

```text
JWT_SECRET_KEY=your_secret_key
DATABASE_URL=your_database_url
```

> Never commit `.env` or other credentials to GitHub.

### 5. Start the backend

```bash
python backend/app.py
```

### 6. Start the frontend

```bash
cd frontend
npm install
npm start
```

---

## Model Availability

The fine-tuned model and tokenizer are hosted separately from the source repository.

This repository intentionally does **not** include large model-weight files.

Model:

```text
Mavkif/m2m100_rup_rur_to_ur
```

Tokenizer:

```text
Mavkif/m2m100_rup_tokenizer_both
```

---

## Research Contributions

The project brings together several components into a single transliteration framework:

1. Development of a Roman Urdu–Urdu sentence-pair dataset.
2. Investigation of multilingual Transformer architectures for a low-resource transliteration task.
3. Fine-tuning and comparison of M2M100 and mBART.
4. Evaluation using both word-level and character-level metrics.
5. Qualitative error analysis of transliteration outputs.
6. Development of a web-based application around the trained model.

---

## Limitations

The current system has several limitations:

* Roman Urdu spelling is highly inconsistent.
* Performance may decrease for unseen words and unusual spellings.
* The available parallel data remains relatively limited compared with high-resource NLP tasks.
* Contextual ambiguity can affect transliteration accuracy.
* Model performance depends on the diversity and quality of the training data.

---

## Future Work

Potential directions for extending this research include:

* Expanding the Roman Urdu–Urdu parallel dataset.
* Improving robustness to spelling variations.
* Incorporating additional linguistic and contextual information.
* Exploring semi-supervised and self-supervised learning.
* Investigating parameter-efficient fine-tuning methods.
* Studying efficient adaptation of pretrained and foundation models.
* Extending the framework to other low-resource language varieties.
* Evaluating robustness across different domains and informal communication styles.

---

## Research Status

**Manuscript status:** Manuscript based on this research is currently **under supervisor review (2026)**.

The repository contains the implementation and supporting software associated with the research project. The manuscript itself is not included in this repository at this stage.

---

## Citation

If you reference this work, please use the following provisional citation:

```bibtex
@misc{shahid2026romanurdu,
  author       = {Vaniza Shahid},
  title        = {Breaking the Language Barrier: Intelligent Roman Urdu to Urdu Transliteration Framework},
  year         = {2026},
  note         = {Manuscript under supervisor review}
}
```

> This citation can be updated if the manuscript is later published or formally submitted.

---

## Acknowledgment

This research was conducted as an undergraduate final-year project at the **University of Education Lahore, Attock Campus**.

The project was completed as a collaborative two-member undergraduate research project.

---

## License

This project is distributed under the license provided in the repository.

For questions regarding the research or implementation, please contact the repository author.

