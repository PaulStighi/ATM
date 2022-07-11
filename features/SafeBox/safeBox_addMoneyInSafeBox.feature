Feature: SafeBox : Add Money In Safe Box
    Add a specific amount of money in
    the safebox only if it's locked 

    Scenario Outline: SafeBox : Add money (locked)
        When SafeBox : <amount> is added in the safebox
        Then SafeBox : The new amount inside is <money_inside> 

    Examples:
    | amount | money_inside |
    | 15     | 15           |
    | 20     | 35           |
    | 300    | 335          |

    Scenario: SafeBox : Add money (unlocked)
        Given SafeBox : SafeBox is unlocked
        When SafeBox : 100 is added in the safebox
        Then SafeBox : The answer for the adding should be "The SafeBox remained opened"