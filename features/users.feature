# This file contains a user story for demonstration only.
# Learn how to get started with Behat and BDD on Behat's website:
# http://behat.org/en/latest/quick_start.html

Feature:
    In order to prove that the Behat Symfony extension is correctly installed
    As a user
    I want to have a demo scenario

    Scenario: User successful login
        When I send a POST request to "/api/login" with json body:
        | email    | user@example.com |
        | password | plainPassword    |
        Then the JSON node "username" should be equal to "Test user"
        And the JSON node "token" should exist

    Scenario: User login with bad credentials
        Given 1 maximum exception traces
        When I send a POST request to "/api/login" with json body:
            | email    | user@example.com |
            | password | plainPasswordasd    |
        Then print last JSON response