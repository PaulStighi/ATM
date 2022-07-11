Feature: Client : chooseStrategy
    The Client imports the strategies from the abstract
    class it extends and and at every new operation it 
    decides which strategy to use from the map of strategies

    Scenario Outline: DescAscClient : chooseStrategy
        Given Client : The operation number is <step>
        And Client : The amount to hadle is <amount>
        When Client : The dealer hadles the amount
        Then Client : The strategy used will be "<strategy>"

    Examples:
    | step | amount | strategy           |
    | 1    | 320    | DescendingStrategy |
    | 2    | 450    | DescendingStrategy |
    | 3    | 30     | AscendingStrategy  |
    | 4    | 70     | AscendingStrategy  |
    | 5    | 1020   | AscendingStrategy  |
    | 6    | 610    | DescendingStrategy |
    | 7    | 100    | DescendingStrategy |
    | 8    | 80     | DescendingStrategy |
    | 9    | 740    | DescendingStrategy |
    | 10   | 500    | AscendingStrategy  |
        