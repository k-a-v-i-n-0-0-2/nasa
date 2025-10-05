"""
Interactive prediction script (module). Load saved package and provide interactive terminal interface.
"""

import os
import joblib
from .utils import logger
import numpy as np
import pandas as pd

MODEL_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "models")
MODEL_PATH = os.path.join(MODEL_DIR, "exoplanet_model_package.joblib")

def load_model_package(path: str = MODEL_PATH):
    if not os.path.exists(path):
        raise FileNotFoundError(f"{path} not found. Train model first.")
    pkg = joblib.load(path)
    logger.info("Loaded model package.")
    return pkg

def interactive_predict():
    pkg = load_model_package()
    model = pkg['model']
    scaler = pkg['scaler']
    label_enc = pkg['label_encoder']
    feature_cols = pkg['feature_columns']

    # ask user for a standard set of raw features (11)
    ask_list = [
        'transit_duration', 'planetary_radius', 'stellar_radius', 'stellar_temp',
        'semi_major_axis', 'orbital_period', 'transit_depth', 'eccentricity',
        'inclination', 'stellar_mass', 'snr'
    ]
    print("\nEnter values for the following features (press Enter to set 0):")
    raw = {}
    for k in ask_list:
        while True:
            val = input(f"{k}: ").strip()
            if val == "":
                raw[k] = 0.0
                break
            try:
                raw[k] = float(val)
                break
            except ValueError:
                print("Numeric value required.")

    # compute derived features in same order as feature_cols
    def compute_vector(raw_dict):
        vec = []
        for col in feature_cols:
            if col in raw_dict:
                vec.append(float(raw_dict[col]))
                continue
            lc = col.lower()
            # derived handling
            if col == 'radius_ratio':
                pr = raw_dict.get('planetary_radius', 0.0)
                sr = raw_dict.get('stellar_radius', 1.0)
                val = pr / sr if sr != 0 else 0.0
                vec.append(float(val))
                continue
            if col == 'log_period':
                p = raw_dict.get('orbital_period', 0.0)
                val = np.log1p(p) if p > 0 else 0.0
                vec.append(float(val))
                continue
            if col == 'log_depth':
                d = raw_dict.get('transit_depth', 0.0)
                val = np.log1p(abs(d)) if d != 0 else 0.0
                vec.append(float(val))
                continue
            # fallback 0
            vec.append(0.0)
        return np.array(vec).reshape(1, -1)

    v = compute_vector(raw)
    v_scaled = scaler.transform(v)
    pred_idx = model.predict(v_scaled)[0]
    pred_label = label_enc.inverse_transform([pred_idx])[0]
    print("\n=== Prediction ===")
    print("Predicted class:", pred_label)
    if hasattr(model, "predict_proba"):
        probs = model.predict_proba(v_scaled)[0]
        top = sorted([(label_enc.inverse_transform([i])[0], float(probs[i])) for i in range(len(probs))], key=lambda x: x[1], reverse=True)
        print("Top probabilities:")
        for lab, p in top[:6]:
            print(f"  {lab}: {p:.3f}")
