Feature: AccDBFileFactory : Get Account DB
    Asking the factory to create a
    file-soruce Account DB
    
    Scenario: AccDBFileFactory : Ask for an account database
        Given AccDBFileFactory : The AccDBFileFactory was created
        When AccDBFileFactory : The factory is asked to create a file-source Account DB
        Then AccDBFileFactory : The type of the Account DB should be AccDBFile