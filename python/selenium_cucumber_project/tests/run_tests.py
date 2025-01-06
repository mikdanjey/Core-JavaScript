import os
import subprocess

if __name__ == "__main__":
    feature_path = os.path.join(os.path.dirname(__file__), "../features")
    subprocess.run([
        "behave",
        feature_path,
        "--no-capture",
        "--format", "allure_behave.formatter:AllureFormatter",
        "--outfile", "allure-results"
    ])
