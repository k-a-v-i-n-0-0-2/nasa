"""
Train model script. Calls preprocessing utilities, trains XGBoost (and optional alternate models),
saves a model package in models/.
"""

import os
from .utils import logger
from .data_preprocessing import prepare_unified_dataset, preprocess_unified
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import joblib
import xgboost as xgb
from sklearn.metrics import classification_report, f1_score, accuracy_score

MODEL_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "models")
os.makedirs(MODEL_DIR, exist_ok=True)
MODEL_PATH = os.path.join(MODEL_DIR, "exoplanet_model_package.joblib")

def train_pipeline(toi_path: str, cumulative_path: str, k2_path: str, target_map: dict):
    logger.info("Preparing unified dataset...")
    unified = prepare_unified_dataset(toi_path, cumulative_path, k2_path, target_map)
    X, y, label_enc = preprocess_unified(unified)
    # simple train-test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    logger.info("Scaling features...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    logger.info("Training XGBoost classifier...")
    model = xgb.XGBClassifier(n_estimators=200, max_depth=8, learning_rate=0.05, use_label_encoder=False, eval_metric='mlogloss', n_jobs=-1, random_state=42)
    model.fit(X_train_scaled, y_train)

    logger.info("Evaluating on test set...")
    preds = model.predict(X_test_scaled)
    acc = accuracy_score(y_test, preds)
    f1 = f1_score(y_test, preds, average='weighted')
    logger.info(f"Test Accuracy: {acc:.4f}  F1 (weighted): {f1:.4f}")
    logger.info("Classification report:\n" + classification_report(y_test, preds, target_names=label_enc.classes_))

    # save package
    package = {
        "model": model,
        "scaler": scaler,
        "label_encoder": label_enc,
        "feature_columns": X.columns.tolist()
    }
    joblib.dump(package, MODEL_PATH, compress=3)
    logger.info(f"Model package saved to {MODEL_PATH}")
    return MODEL_PATH
