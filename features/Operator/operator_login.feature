Feature: Operator : Login
   The operator tries to login with a card and pin for
   having some operations done later.

   Scenario Outline: Operator : Login scenario (successful or not)
    Given Operator : Card Number is <card_number>
    And Operator : Pin Code is <card_pin>
    When Operator : The ATM tries to login with this credentials
    Then Operator : The answer of login should be "<answer>"

   Examples:
    | card_number   | card_pin | answer              |
    | "2123 1212"   | 1234     | logged in           |
    | "3221 3173"   | 1234     | logged in           |
    | "4750 4891"   | 1234     | logged in           |
    | "7519 3147"   | 4317     | logged in           |
    | "7519 3147"   | 1234     | Wrong PIN!          |
    | "6478 1247"   | 3412     | logged in           |
    | "6478 124"    | 3412     | Account not found!  |
    | "1234 5678"   | 1234     | Account not found!  |