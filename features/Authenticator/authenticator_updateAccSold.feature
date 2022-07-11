Feature: Authenticator : Update Account Sold
   The authenticator tries to update the account
   sold of the current session account.

    Scenario Outline: Authenticator : Update Account Sold with a positive amount
        Given Authenticator : An Account with card number <card_number> 
        And Authenticator : And pin code <card_pin> is logged in
        When Authenticator : The authenticator tries to updateAccSold with amount <amount>
        Then Authenticator : The answer of the updateAccSold should be "successful"
        And Authenticator : The new sold of the account should be <new_sold>

    Examples:
    | card_number   | card_pin | amount | new_sold |
    | "2123 1212"   | 1234     | 100    | 3600     |
    | "3221 3173"   | 1234     | 150    | 150      |
    | "4750 4891"   | 1234     | 300    | 400      |
    | "7519 3147"   | 4317     | 250    | 100      |
    | "6478 1247"   | 3412     | 120    | 500      |

    Scenario Outline: Authenticator : Update Account Sold with a negative amount
        Given Authenticator : An Account with card number <card_number> 
        And Authenticator : And pin code <card_pin> is logged in
        When Authenticator : The authenticator tries to updateAccSold with amount <amount>
        Then Authenticator : The answer of the updateAccSold should be "unsuccessful"
        And Authenticator : The new sold of the account should be <new_sold>

    Examples:
    | card_number   | card_pin | amount  | new_sold |
    | "2123 1212"   | 1234     | -100    | 3600     |
    | "3221 3173"   | 1234     | -50     | 150      |
    | "4750 4891"   | 1234     | -200    | 400      |
    | "7519 3147"   | 4317     | -100    | 100      |
    | "6478 1247"   | 3412     | -100    | 500      |