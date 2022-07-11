Feature: AccDBDumbFactory : Get Account DB
    Asking the factory to create a
    hard coded Account DB
    
    Scenario: AccDBDumbFactory : Ask for an account database
        Given AccDBDumbFactory : The AccDBDumbFactory was created
        When AccDBDumbFactory : The factory is asked to create a hard coded Account DB
        Then AccDBDumbFactory : The type of the Account DB should be AccDBDumb