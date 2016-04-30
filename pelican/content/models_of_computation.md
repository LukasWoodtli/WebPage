Title: Models of Computation
Category: Computer Science
Tags: ETH
Date: 2016-02-29
Modified: 2016-04-21

[TOC]

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




<!-- TODO -->


<!-- Notes Week 7 Start -->

# Lambda Calculus

- Meta-Mathematics
- Turing Machines simulate a person that calculate (State: Mind, Tape: Paper)
- Lambda Calculus: about functions

## Syntax

Traditional Syntax:

$$f(x) = \frac{e^x - sin(x)}{x+3}$$

Lambda Syntax:

$$\lambda x.  \frac{e^x - sin(x)}{x+3}$$

- Functions in lambda calculus don't have names
    - Just put the function completely, where it is used
    - Anonymous functions

- Functions: 'Plugging in' arguments
- Functions return other functions (Currying)

For example:

$$((\lambda xy. 2x + y) 2 ) 3 = (\lambda y. 4 + y) 3 = 4 + 3 = 7$$

- Can get rid of
    - function names
    - multi-argument functions


## Main Operations

- $\beta$-reduction: apply a function to an argument using substitution
    - Reduction is an optimistic term since the result of the $\beta$-reduction can be bigger then the expression before<!-- Notes Week 8 Start -->

## Recursion

- in $\lambda$-calculus a function can't reference (call) itself since there are no names for functions
- [Tail-call](https://en.wikipedia.org/wiki/Tail_call) recursion: in some cases the same stack frame can be reused for recursive functions

- How can we build an infinite loop (recursion)?

This structure rebuilds itself infinitely:

$$\Omega = (\lambda w. w w) (\lambda w. w w)$$


### Y-Combinator

See [Wikipedia](https://en.wikipedia.org/wiki/Fixed-point_combinator#Fixed_point_combinators_in_lambda_calculus)

and [The Y Combinator (no, not that one)](https://medium.com/@ayanonagon/the-y-combinator-no-not-that-one-7268d8d9c46#.c11j5arpk).

$$Y = \lambda f. (\lambda x. f (x\; x))(\lambda x. f (x \;x))$$

Beta recursion gives:

$$\begin{align*}
Y g &= \lambda f. (\lambda x. f (x\; x))(\lambda x. f (x\; x)) g \\
 &= (\lambda x. g (x\; x)) (\lambda x. g (x\; x)) \\ 
 &= g ((\lambda x. g (x\; x)) (\lambda x. g (x\; x)))  \\ 
 &= g (Y\; g)
\end{align*}$$

- Only way to do a loop if you don't know in advance how many iterations the loop needs to be done
- Functions can't see their own structure
    - Needs to be provided as argument so the function can reproduce itself: 'twin'-functions

# Numbers

- Numbers are an abstract concept
- It's only possible to manipulate *representations* of numbers

There Are a lot of different representations of numbers.

Each representation has it's pros and cons.

- Decimal
- Roman Numerals
- Binary
- [Two's complement](https://en.wikipedia.org/wiki/Two's_complement)
- [Binary with digits up to 2](Redundant binary representation)
    - Addition can be faster
    - Logical operation are slower
- Ternary
- Church Numerals
- Prime Factorization: $1, 2, 3, 2^2, 5, 2\cdot 3, 7, 2^3, 3^2, \ldots$
    - Multiplication and Factorization is easy
    - Increment by one is hard
- [Chinese remainder theorem](https://en.wikipedia.org/wiki/Chinese_remainder_theorem)
    - Comparing two numbers is hard


