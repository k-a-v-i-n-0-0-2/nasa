# predict_exoplanet_manual.py
import pickle
import numpy as np

# =========================
# 1. Load the saved model package
# =========================
with open("exoplanet_classifier_model.pkl", "rb") as f:
    model_package = pickle.load(f)

model = model_package["model"]
scaler = model_package["scaler"]
label_encoder = model_package["label_encoder"]

# =========================
# 2. Define feature columns
# =========================
feature_cols = [
    "transit_duration", "planetary_radius", "stellar_radius", "stellar_temp",
    "semi_major_axis", "orbital_period", "transit_depth", "eccentricity",
    "inclination", "stellar_mass", "snr"
]

# =========================
# 3. Get manual input from terminal
# =========================
print("\nEnter the following 11 features (numbers only):")
input_data = []
for feat in feature_cols:
    while True:
        try:
            val = float(input(f"{feat}: "))
            input_data.append(val)
            break
        except ValueError:
            print("❌ Please enter a valid number")

# =========================
# 4. Scale and predict
# =========================
input_scaled = scaler.transform([input_data])
pred_encoded = model.predict(input_scaled)
pred_class = label_encoder.inverse_transform(pred_encoded)

print("\n🎯 Predicted Exoplanet Class:", pred_class[0])
