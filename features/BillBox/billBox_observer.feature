Feature: Observer : Notify & update
    Observe a change in the subject and
    notify the observers about it

    Scenario Outline: Observer : general
     Given Observer : The observer is created with <num_of_bills>, <bill_value> and attached to the subject
     When Observer : The subject changes it's state
     Then Observer : The observer acts regarding the notification : <expected>

    Examples:
    | num_of_bills | bill_value | expected |
    | 25           | 100        | 15       |
    | 10           | 100        | 0        |
    | 125          | 100        | 115      |
    | 42           | 100        | 32       |