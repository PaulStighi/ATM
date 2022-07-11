Feature: SafeBox : Singleton SafeBox
    It's needed to be checked if the SafeBox 
    really behaves like a Singleton

    Scenario: SafeBox : Checking the safebox state from operator and billboxes
        Given SafeBox : The operator is instantiated
        When SafeBox : The money in SafeBox is compared
        Then SafeBox : The answer should be "equal"
        Given SafeBox : The operator asks for an addMoneyInSafeBox
        When SafeBox : The money in SafeBox is compared
        Then SafeBox : The answer should be "equal"