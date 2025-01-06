import os
from allure_behave.hooks import allure_report

def before_all(context):
    # Set the output directory for Allure results
    allure_report(context, os.path.join(os.getcwd(), "allure-results"))
    print("Starting tests with Allure reporting...")

def after_all(context):
    print("Tests completed!")
