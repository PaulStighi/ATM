Feature: Authenticator : Login
   The authenticator tries to login with a card and pin.

    Scenario Outline: Authenticator : Login scenario (successful or not)
        Given Authenticator : Card Number is <card_number>
        And Authenticator : Pin Code is <card_pin>
        When Authenticator : The authenticator tries to login with this credentials
        Then Authenticator : The Answer should be "<answer>"

     Examples:
    | card_number   | card_pin | answer            |
    | "2123 1212"   | 1234     | logged in         |
    | "3221 3173"   | 1234     | logged in         |
    | "4750 4891"   | 1234     | logged in         |
    | "7519 3147"   | 1234     | Wrong PIN!        |
    | "6478 124"    | 3412     | Account not found!|
    | "1234 5678"   | 1234     | Account not found!|

    Scenario Outline: Authenticator : Login while another account is logged in
        Given Authenticator : An account is logged with card_number "2123 1212" and pin 1234
        And Authenticator : Another account tries to log in with <card_number> card number
        And Authenticator : And with <card_pin> card pin
        When Authenticator : The authenticator tries to login with this credentials
        Then Authenticator : The Answer should be "<answer_2>"

    Examples:
    | card_number   | card_pin | answer_2                  |
    | "2123 1212"   | 1234     | Another account logged in |
    | "3221 3173"   | 1234     | Another account logged in |
    | "4750 4891"   | 1234     | Another account logged in |
    | "7519 3147"   | 1234     | Another account logged in |
    | "6478 124"    | 3412     | Another account logged in |
    | "1234 5678"   | 1234     | Another account logged in |