Feature: Authenticator : Logout
   The autheticator tries to log out of the session.

    Scenario Outline: Authenticator : Logout of an active session
        Given Authenticator : An account with card_number <card_number> 
        And Authenticator : And pin <card_pin> is logged in
        When Authenticator : The authenticator tries to logout
        Then Authenticator : The answer of the logout should be "<answer>"

    Examples:
    | card_number   | card_pin | answer     |
    | "2123 1212"   | 1234     | logged out |
    | "3221 3173"   | 1234     | logged out |
    | "4750 4891"   | 1234     | logged out |

    Scenario: Authenticator : Logout without an active session
        Given Authenticator : There is no session account logged in
        When Authenticator : The authenticator tries to logout
        Then Authenticator : The answer of the logout should be "There is no active session to log out of!"