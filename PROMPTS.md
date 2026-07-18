# PROMPTS.md

# Smart HomeStay Review Analyzer

## Overview
This document records the prompts tested during the development of the **Home Stay Review Analyzer** project. The goal of the project is to analyze customer reviews of home stays and classify them into **Positive**, **Negative**, or **Neutral** sentiments using Natural Language Processing (NLP) and Machine Learning.

---

# Prompt Variation 1

## Prompt
You are a Python developer with experience in Natural Language Processing. Create a Home Stay Review Analyzer that classifies customer reviews as Positive, Negative, or Neutral. Write clean, readable Python code with comments.

### Example Input
```
The room was clean and spacious. The staff was very friendly and helpful.
```

### Example Output
```
Predicted Sentiment: Positive

Reason:
The review contains positive words such as "clean", "spacious", "friendly", and "helpful".
```

### System Prompt / Role
**Role:** Python Developer specializing in NLP.

---

# Prompt Variation 2

## Prompt
Act as a Data Scientist. Build a machine learning pipeline for sentiment analysis of home stay reviews. Preprocess the text by converting it to lowercase, removing punctuation, removing stop words, and applying TF-IDF vectorization. Train a classifier and predict the sentiment with a confidence score.

### Example Input
```
The room was okay, but the service was very slow and disappointing.
```

### Example Output
```
Preprocessing Completed:
✔ Lowercase conversion
✔ Stop word removal
✔ TF-IDF vectorization

Predicted Sentiment: Negative

Confidence Score: 0.86
```

### System Prompt / Role
**Role:** Data Scientist with expertise in NLP and Machine Learning.

---

# Prompt Variation 3

## Prompt
You are an AI Engineer. Develop a production-quality Home Stay Review Analyzer using Python. The application should preprocess customer reviews, classify sentiment (Positive, Negative, or Neutral), provide a confidence score, handle invalid input gracefully, and generate modular, well-commented code following best coding practices.

### Example Input
```
I absolutely loved my stay. The rooms were spotless, the food was delicious, and the staff treated us like family.
```

### Example Output
```
Predicted Sentiment: Positive

Confidence Score: 0.98

Explanation:
The review contains several highly positive expressions such as "loved", "spotless", "delicious", and "treated us like family", indicating strong customer satisfaction.
```

### System Prompt / Role
**Role:** AI Engineer specializing in Machine Learning, NLP, and Python development.

---

# Best Prompt

**Prompt Variation 3** worked best because it generated well-structured, modular, and production-ready code while following software engineering best practices. It included robust text preprocessing, sentiment prediction, confidence scores, error handling, and clear documentation. Compared to the other prompts, it produced cleaner code with better organization and explanations, making the application easier to understand, maintain, and extend in the future.