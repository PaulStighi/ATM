Feature: AccDBFile : Extract account
    Search an account by it's card_number
    in the DataBase and extracting it.

    Background: 
        Given AccDBFile : The database was already created and imported the accounts

    Scenario Outline: AccDBFile : Searching an existing account <card_number>
        Given AccDBFile : The card number for the account is <card_number>
        When AccDBFile : The account is searched for in DB
        Then AccDBFile : The answer will be "<answer>"

    Examples:
    | card_number   | answer     |
    | "2123 1212"   | found      |
    | "3221 3173"   | found      |
    | "4750 4891"   | found      |
    | "7519 3147"   | found      |
    | "6478 1247"   | found      |
    | "5321 4515"   | not found  |
    | "9312 1281"   | not found  |
    | "9125 2142"   | not found  |
    | ""            | not found  |
    | "21231212"    | not found  |
    | "2123 12"     | not found  |
    | "2123 1212 12"| not found  |