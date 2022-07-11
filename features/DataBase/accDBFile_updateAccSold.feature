Feature: AccDB : Update account sold
    Search an account by it's card_number
    in the DataBase and update it's sold.

    Background: 
        Given AccDB : The Database was already created and imported the accounts

    Scenario Outline: AccDB : Searching an existing account <card_number> and update it's sold to <new_sold>
        Given AccDB : The card number for the account to update is <card_number>
        And AccDB : The updated sold is <new_sold>
        When AccDB : The account to update is searched for in DB
        Then AccDB : The Answer will be "<answer>"
        And AccDB : The new sold will be <new_sold>
    
    Examples:
    | card_number   | new_sold | answer      |
    | "2123 1212"   | 230      | updated     |
    | "3221 3173"   | 120      | updated     |
    | "4750 4891"   | 470      | updated     |
    | "7519 3147"   | 100      | updated     |
    | "6478 1247"   | 90       | updated     |

    Scenario: AccDB : Searching a nonexistent account and trying to update it's sold
        Given AccDB : The card number for the account to update is "1234 5678"
        And AccDB : The updated sold is 1000000
        When AccDB : The account to update is searched for in DB
        Then AccDB : The Answer will be "account not found"