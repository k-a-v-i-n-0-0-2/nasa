"""
Evaluation utilities: load model package and evaluate on a supplied dataset.
"""

from .utils import logger, safe_read_csv
import joblib
import os
import pandas as pd
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score, f1_score

MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "models", "exoplanet_model_package.joblib")

def evaluate_on_file(input_csv: str):
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError("Model package missing. Train first.")
    pkg = joblib.load(MODEL_PATH)
    model = pkg['model']
    scaler = pkg['scaler']
    label_enc = pkg['label_encoder']
    feature_cols = pkg['feature_columns']

    df = safe_read_csv(input_csv)
    # keep only needed columns if present (best-effort)
    X = df[[c for c in feature_cols if c in df.columns]].apply(pd.to_numeric, errors='coerce')
    # fill missing
    for c in feature_cols:
        if c not in X.columns:
            X[c] = 0.0
    X = X[feature_cols]
    X_scaled = scaler.transform(X.values)
    preds = model.predict(X_scaled)
    if 'target' not in df.columns:
        logger.info("No 'target' column in file — only predictions will be shown.")
        out = df.copy()
        out['predicted'] = [label_enc.inverse_transform([p])[0] for p in preds]
        out.to_csv("predictions_from_eval.csv", index=False)
        logger.info("Predictions saved to predictions_from_eval.csv")
        return
    y_true = label_enc.transform(df['target'].astype(str))
    logger.info("Accuracy: %.4f", accuracy_score(y_true, preds))
    logger.info("F1 (weighted): %.4f", f1_score(y_true, preds, average='weighted'))
    logger.info("Classification Report:\n%s", classification_report(y_true, preds, target_names=label_enc.classes_))
    logger.info("Confusion Matrix:\n%s", str(confusion_matrix(y_true, preds)))
