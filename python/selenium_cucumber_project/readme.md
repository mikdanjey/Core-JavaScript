
pip install pipenv

pipenv shell
pipenv install


https://allurereport.org/

python tests/run_tests.py

behave --no-capture --format allure_behave.formatter:AllureFormatter --outfile=allure-results

allure serve allure-results

allure generate allure-results --clean -o allure-report


pipenv run behave --format allure_behave.formatter:AllureFormatter --outfile=allure-results
