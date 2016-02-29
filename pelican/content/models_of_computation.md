Title: Models of Comutation
Category: Computer Science
Tags: ETH
Date: 2016-02-29
Modified: 2016-02-29

# Boolean Circuits

- AND/OR/NOT gates
- Gate: function
- Inputs: arguments to function
- In-/Outputs: wires
- Circuits: combination of gates
- Truth table: all possible combination (look-up table)

## XOR

- Parity: odd/even
    - 0: even
    - 1: odd
    - 0 is even number, 1 is odd number
- works with more than 2 inputs

| X | Y | Z | XOR |
|---|---|---|-----|
| 0 | 0 | 0 |  0  |
| 0 | 0 | 1 |  1  |
| 0 | 1 | 0 |  1  |
| 0 | 1 | 1 |  0  |
| 1 | 0 | 0 |  1  |
| 1 | 0 | 1 |  0  |
| 1 | 1 | 0 |  0  |
| 1 | 1 | 1 |  1  |

- Cost of circuit: number of
    - AND gates and
    - OR gates
    - usually NOT gates are not counted (they are too simple)


Truth table:

- for $n$ inputs: $2^n$ combinations

Number of functions:

- for $n$ inputs: $2^{2^n}$ functions (circuits)

General of **XOR**:

- for $n$ inputs $2^{n-1}+1$ gates needed

<!-- Notes Week 1 40:00 -->


