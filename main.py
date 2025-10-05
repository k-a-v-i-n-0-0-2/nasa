"""
Entry point script.
Usage:
  py main.py train --toi <path> --cumulative <path> --k2 <path>
  py main.py predict
  py main.py predict_csv --input <path>
  py main.py evaluate --input <path>
"""

import argparse
from src.train_model import train_pipeline, MODEL_PATH
from src.predict_exoplanet import interactive_predict, load_model_package
from src.evaluate_model import evaluate_on_file
from src.utils import logger
import os

def cli():
    parser = argparse.ArgumentParser()
    sub = parser.add_subparsers(dest="cmd")

    # train
    train_p = sub.add_parser("train")
    train_p.add_argument("--toi", required=True)
    train_p.add_argument("--cumulative", required=True)
    train_p.add_argument("--k2", required=True)
    train_p.add_argument("--target_map", default=None, help="Optional JSON mapping for target columns")

    # predict
    sub.add_parser("predict")

    # predict csv
    predict_csv = sub.add_parser("predict_csv")
    predict_csv.add_argument("--input", required=True)

    # evaluate
    evaluate = sub.add_parser("evaluate")
    evaluate.add_argument("--input", required=True)

    args = parser.parse_args()
    if args.cmd == "train":
        if args.target_map:
            import ast
            target_map = ast.literal_eval(args.target_map)
        else:
            target_map = {'toi': 'tfopwg_disp', 'cumulative': 'koi_pdisposition', 'k2': 'k2c_disp'}
        path = train_pipeline(args.toi, args.cumulative, args.k2, target_map)
        logger.info(f"Training finished. Package saved to: {path}")
    elif args.cmd == "predict":
        # interactive
        interactive_predict()
    elif args.cmd == "predict_csv":
        from src.predict_exoplanet import load_model_package, predict_csv
        pkg = load_model_package()
        from src.predict_exoplanet import predict_csv as _predict_csv
        _predict_csv(args.input)
    elif args.cmd == "evaluate":
        evaluate_on_file(args.input)
    else:
        parser.print_help()

if __name__ == "__main__":
    cli()
