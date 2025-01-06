import allure
from behave import given, when, then
from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager

@given("I navigate to the login page")
@allure.title("Navigate to Login Page")
def navigate_to_login_page(context):
    with allure.step("Open the login page"):
        context.driver = webdriver.Chrome(ChromeDriverManager().install())
        context.driver.get("https://example.com/login")
        context.driver.maximize_window()

@when("I enter valid credentials")
@allure.title("Enter Valid Credentials")
def enter_valid_credentials(context):
    with allure.step("Enter username and password"):
        context.driver.find_element(By.ID, "username").send_keys("testuser")
        context.driver.find_element(By.ID, "password").send_keys("securepassword")

@when("I click the login button")
@allure.title("Click Login Button")
def click_login_button(context):
    with allure.step("Click the login button"):
        context.driver.find_element(By.ID, "login-button").click()

@then("I should see the user dashboard")
@allure.title("Verify Dashboard")
def verify_dashboard(context):
    with allure.step("Check if dashboard is visible"):
        assert "Dashboard" in context.driver.title
        context.driver.quit()
