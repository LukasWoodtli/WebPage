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

<!-- Notes Week 1 End -->




<!-- TODO -->
<!-- Notes Week 2 Start -->

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
    - Reduction is an optimistic term since the result of the $\beta$-reduction can be bigger then the expression before
- $\alpha$-conversion: changing a functions 'argument symbol' ($\lambda x.x \equiv \lambda y.y$)
- $\eta$-conversion: $\lambda v. f v \equiv f$ because $(\lambda v. f v) a \equiv f a$

## Chruch Numerals

- Numbers can be encoded as functions
- Arbitary encoding of numbers suggested by church

Each number is a function that takes 2 arguments: $f$ and $x$:

$$\begin{align*}
0 :&= \lambda f.\lambda x. x\\
1 :&= \lambda f.\lambda x. f x\\
2 :&= \lambda f.\lambda x. f (f x)\\
3 :&= \lambda f.\lambda x. f (f (f x))\\
\cdots \\
n :&= \lambda f.\lambda x. f^n x
\end{align*}$$


> The number $n$ is a function that takes a function $f$ as argument and applies it $n$-times to the second argument $x$

Example: $(5 inc) x$: apply function $inc$ $5$-times to $x$

![Church Numerals](/images/lambda_calculus/church_numerals.png)


## Lambda Calculus Expressions

- Using just *substitution step* to calculate
    - seems complex, but only one operation needed: substitution

### Variables

- $a$, $b$, $c$ ...
- representing functions

### Function Application

$(a b)$: $a$ applied to $b$

![Function Application](/images/lambda_calculus/function_application.png)

### Function Creation

$\lambda a. aa$

![Function Creation](/images/lambda_calculus/function_creation.png)

### Evaluation

![Evaluation](/images/lambda_calculus/function_evaluation.png)

Example:

![Evaluation Example](/images/lambda_calculus/function_evaluation_example.png)


### Examples

#### Increment

$$\lambda k f x. f ( k f x)$$

Example:

increment $2$

$$
\begin{align*}
\underbrace{(\lambda k f x. f ( k f x))}_{inc}\underbrace{(\lambda f x. f ( f x))}_{2} &= \\
(\lambda f x. f ( (\lambda f x. f ( f x)) f x)) &= \\
(\lambda f x. f ( f ( f x)))
\end{align*}
$$

![Increment](/images/lambda_calculus/increment.png)


#### Addition

![Addition](/images/lambda_calculus/addition.png)


#### Multiplication

![Multiplication](/images/lambda_calculus/multiplication.png)


#### Boolean Logic

![Boolean Logic](/images/lambda_calculus/boolean_logic.png)


#### If-Then-Else

![If Then Else](/images/lambda_calculus/if_then_else.png)



#### Pair

![Pair](/images/lambda_calculus/pair.png)

![Shift Pair](/images/lambda_calculus/pair_shifting.png)


## Conclusion

- No distinction between code and data: everything is code!
- No structure is safe from substitution (safety issue)
- Data has to be run, can't be examined

<!-- Notes Week 7 End -->
<!-- Notes Week 8 Start -->

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
- [p-adic number](https://en.wikipedia.org/wiki/P-adic_number)
    - related to two's complement


<!-- Notes Week 8 End -->



<!-- Notes Week 10 Begin -->

# Tag Systems

- Tape with a starting string
- Reading and deleting at the beginning (left)
- Appending (writing) at the end (right)

## 2-Tag System

1. reads *1* symbol at the beginning of the tape
2. appends a string at the end of the type
    - appended string depends on read symbol
3. removes *2* symbols at the beginning of the tape

### Example: Test for odd/even number

- Alphabet: $\Sigma = \{C_1, C_2,C_3\}$
- Rules:
    - $C_3 \rightarrow \epsilon$
    - $C_1 \rightarrow C_2 \; O$
    - $C_2 \rightarrow E$
- $\epsilon$: empty word
- $O$: Odd
- $E$: Even

- $C_1 \; C_1 \; (C_3)^x$
- $a^x$: symbol a is repeated $x$ times
- the given rules show if $x$ is odd or even

Example even:
$$\begin{align*}
C_1 C_1 C_3 C_3 C_3 C_3 \rightarrow  \\ 
C_3 C_3 C_3 C_3 C_2 O \rightarrow \\
C_3 C_3 C_2 O \rightarrow \\
C_2 O \rightarrow \\
E
\end{align*}$$

Example odd:
\begin{align*}
C_1 C_1 C_3 C_3 C_3 \rightarrow  \\ 
C_3 C_3 C_3 C_2 O \rightarrow \\
C_3 C_2 O \rightarrow \\
O
\end{align*}


### Example: Power of Two

\begin{align*}
2^n &\rightarrow  n \\ 
C_1 &\rightarrow C_1 C_2 C_4 C_5 \\
C_2 &\rightarrow \epsilon \\ 
C_3 &\rightarrow C_3 \\ 
C_4 &\rightarrow C_4 C_5 \\ 
C_5 &\rightarrow C_6
\end{align*}

Starting with:

$$(C_3)^{2n}C_1C_1 \rightarrow (C_6)^n$$

For $n=2$:

$$\begin{align*}
C_3 C_3 C_3 C_3 C_1 C_1 \rightarrow \\
C_3 C_3 C_1 C_1 C_3 \rightarrow \\
C_1 C_1 C_3 C_3 \rightarrow \\
C_3 C_3 C_1 C_2 C_4 C_5\rightarrow \\
C_1 C_2 C_4 C_5 C_3 \rightarrow \\
C_4 C_5 C_3 C_1 C_2 C_4 C_5 \rightarrow \\
C_2 C_4 C_5 C_4 C_5 C_3 \rightarrow \\
C_5 C_4 C_5 C_3 \rightarrow \\
C_5 C_3 C_6 \rightarrow \\
C_6 C_6
\end{align*}$$

<!-- Notes Week 10 ~00:10:00 -->



