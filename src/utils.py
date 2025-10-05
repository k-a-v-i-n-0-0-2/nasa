import os
import logging
import pandas as pd

# simple logger
def get_logger(name="ExoplanetAI"):
    logger = logging.getLogger(name)
    if not logger.handlers:
        handler = logging.StreamHandler()
        formatter = logging.Formatter("[%(asctime)s] %(levelname)s - %(message)s", "%Y-%m-%d %H:%M:%S")
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        logger.setLevel(logging.INFO)
    return logger

logger = get_logger()

def safe_read_csv(path: str) -> pd.DataFrame:
    """
    Read CSV robustly, skipping header comment lines that NASA files sometimes include.
    """
    if not os.path.exists(path):
        raise FileNotFoundError(f"{path} not found.")
    # comment '#' handles NASA header lines; engine='python' helps auto-detect separators
    df = pd.read_csv(path, comment='#', sep=None, engine='python', on_bad_lines='skip')
    return df
