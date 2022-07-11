Feature: Account : Create Account
    Using Account's constructor, an account
    object is created for later 
    adding it to the database.
    The Account number should be a string
    The Account pin should be a number

    Scenario: Account : Creating account
        Given Account : Card Number for the new profile is "1234 5678"
        And Account : Pin Code for the new profile is 1234
        And Account : Email adress for the new profile is "a@a.com"
        And Account : Phone Number for the new profile is "0712345678"
        And Account : Current Sold for the new account is 300
        When Account : The constructor is creating the account object
        Then Account : The profile card_number should be "1234 5678"
        And Account : The profile card_pin should be 1234
        And Account : The profile email should be "a@a.com"
        And Account : The profile phone_number should be "0712345678"
        And Account : The current sold should be 300