Feature: Authenticator : Get Account Sold
   The authenticator tries to get the account sold

    Scenario Outline: Authenticator : Get Account Sold with an active session
        Given Authenticator : An Account with Card Number <card_number> 
        And Authenticator : And PIN <card_pin> is logged in
        When Authenticator : The authenticator tries to getAccSold
        Then Authenticator : The answer of the getAccSold should be "<answer>"

     Examples:
    | card_number   | card_pin | answer |
    | "2123 1212"   | 1234     | 3700   |
    | "3221 3173"   | 1234     | 300    |
    | "4750 4891"   | 1234     | 700    |
    | "7519 3147"   | 4317     | 350    |
    | "6478 1247"   | 3412     | 620    |

    Scenario: Authenticator : Get Account Sold without an active session
        Given Authenticator : There is no session account logged in
        When Authenticator : The authenticator tries to getAccSold
        Then Authenticator : The answer of the getAccSold should be "Not logged in!"