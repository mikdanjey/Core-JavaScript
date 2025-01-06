Feature: Login functionality
  Scenario: Successful login with valid credentials
    Given I navigate to the login page
    When I enter valid credentials
    And I click the login button
    Then I should see the user dashboard
