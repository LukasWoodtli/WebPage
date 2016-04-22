Title: Models of Computation
Category: Computer Science
Tags: ETH
Date: 2016-02-29
Modified: 2016-04-21

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
    - Anomunous functions

- Functions: 'Plugging in' arguments
- Functions return other functions (Currying)

For example:

$$((\lambda xy. 2x + y) 2 ) 3 = (\lambda y. 4 + y) 3 = 4 + 3 = 7$$

- Can get rid of
    - function names
    - multi-argument functions

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
