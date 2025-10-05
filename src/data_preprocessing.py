import os
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from typing import Tuple, List

# -------------------------------
# Logger helper
def logger(msg: str):
    print(f"[INFO] {msg}")

# -------------------------------
# Safe CSV read with delimiter auto-detect
def safe_read_csv(csv_path: str) -> pd.DataFrame:
    if not os.path.exists(csv_path):
        raise FileNotFoundError(f"{csv_path} not found!")
    try:
        # Use python engine and auto-detect separator
        df = pd.read_csv(csv_path, on_bad_lines='skip', sep=None, engine='python')
        logger(f"Loaded CSV {csv_path}, shape: {df.shape}")
        return df
    except Exception as e:
        raise RuntimeError(f"Failed to read {csv_path}: {e}")

# -------------------------------
# Preprocess dataset: select features and encode labels
def preprocess_dataset(df: pd.DataFrame, target_column: str) -> Tuple[pd.DataFrame, np.ndarray]:
    if target_column not in df.columns:
        logger(f"[WARNING] Target column '{target_column}' not found in dataframe.")
        return df, np.array([])
    
    # Drop rows where target is missing
    df = df.dropna(subset=[target_column])
    
    # Example: drop columns with non-numeric data (keep only float/int)
    feature_cols = df.select_dtypes(include=[np.number]).columns.tolist()
    if target_column in feature_cols:
        feature_cols.remove(target_column)
    
    X = df[feature_cols]
    y = df[target_column]
    
    # Encode target labels
    le = LabelEncoder()
    y_encoded = le.fit_transform(y)
    
    logger(f"Selected features: {feature_cols}")
    logger(f"Target classes: {list(le.classes_)}")
    
    return X, y_encoded

# -------------------------------
# Main
if __name__ == "__main__":
    # Paths to your CSV files
    toi_csv = r"C:\Users\profe\Desktop\NASA\data\TOI_2025.10.01_21.00.31.csv"
    cumulative_csv = r"C:\Users\profe\Desktop\NASA\data\cumulative_2025.10.01_20.59.20.csv"
    k2_csv = r"C:\Users\profe\Desktop\NASA\data\k2pandc_2025.10.01_21.01.04.csv"

    # Target column map (update after checking your CSV columns)
    target_map = {
        'toi': 'tfopwg_disp',
        'cumulative': 'tfopwg_disp',
        'k2': 'k2c_disp'
    }

    # Load datasets
    df_toi = safe_read_csv(toi_csv)
    df_cumulative = safe_read_csv(cumulative_csv)
    df_k2 = safe_read_csv(k2_csv)

    # Preprocess datasets
    X_toi, y_toi = preprocess_dataset(df_toi, target_map['toi'])
    X_cum, y_cum = preprocess_dataset(df_cumulative, target_map['cumulative'])
    X_k2, y_k2 = preprocess_dataset(df_k2, target_map['k2'])

    # Combine datasets (only if labels exist)
    X_list = [df for df in [X_toi, X_cum, X_k2] if not df.empty]
    y_list = [y for y in [y_toi, y_cum, y_k2] if len(y) > 0]

    if X_list and y_list:
        X_combined = pd.concat(X_list, ignore_index=True)
        y_combined = np.concatenate(y_list)
        logger(f"Combined features shape: {X_combined.shape}, Labels shape: {y_combined.shape}")
    else:
        logger("No valid datasets to combine.")
