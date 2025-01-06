from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

# Step 1: Initialize the driver and navigate to the login page
driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get("https://your-login-url.com")  # Replace with your actual login URL

# Step 2: Wait for redirection to the federated login page
try:
    # Wait for the username field to be visible (adjust 'usernameFieldId' to the actual ID)
    username_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "usernameFieldId"))  # Replace with actual ID
    )
    
    # Step 3: Enter the username
    username_field.send_keys("your-username")  # Replace with actual username

    # Step 4: Click the submit button
    submit_button = driver.find_element(By.ID, "submitButtonId")  # Replace with actual ID
    submit_button.click()
    
    print("Username entered and submit button clicked successfully.")
    
except Exception as e:
    print(f"An error occurred: {e}")

# Keep the browser open for debugging
input("Press Enter to close the browser...")

# Quit the driver (optional if you want to close it)
driver.quit()


 # Step 3: Slow typing into the username field
    username = "your-username"  # Replace with the desired username
    for char in username:
        username_field.send_keys(char)
        time.sleep(0.2)  # Adjust delay between keystrokes (0.2 seconds here)


# Wait for the title to contain "my title"
def wait_for_title(driver, expected_title, timeout=10):
    try:
        WebDriverWait(driver, timeout).until(
            EC.title_contains(expected_title)  # Wait until title contains the expected text
        )
        print(f"Title contains '{expected_title}'.")
    except Exception as e:
        print(f"An error occurred while waiting for the title: {e}")
        raise  # Optional: Raise the error to stop the test

# Example usage
wait_for_title(driver, "my title")

# Optionally, assert if you want to enforce the check:
assert "my title" in driver.title