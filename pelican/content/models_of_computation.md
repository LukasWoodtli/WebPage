Title: Models of Computation
Category: Programming
Tags: Computer Science, ETH
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





<!-- Notes Week 2 Start -->


# Finite State Machines (FSM)

- Also called Finite State Automaton (FSA)

See also [Tutorialspoint](http://www.tutorialspoint.com/automata_theory/automata_theory_introduction.htm)

Can be represented as a 5-touple $(Q, \Sigma, \delta, q_0, F)$:

- $Q$: finite set of states
- $\Sigma$: alphabet (finite set of symbols)
- $\delta$: transition function
- $q_0$: initial state ($q_0 \in Q$)
- $F$: set of final states ($F \subseteq  Q$)

## Deterministic / Non-Deterministic FSM

- Deterministic
    - For each arriving event it's clear what the next state is
- Non-deterministic
    - For some (or all) events the next state can be more than one (it's not clear to which state the machine will change)

- Any non-deterministic FSM can be turned into a deterministic FSM

## Acceptor (Recognizer)

- Calculates a Boolean function
- All states are either *accepting* or *rejecting* for a given input
- In graphical notation the *accepting* states have a double circle
- Non-deterministic Acceptor
    - accepts if there is *any* way to accept
    - methodically try all possibilities
    - 'Parallel World' - try all possibilities *simultaneously* in separate copies of the machine (for complexity theory)

## Classifier

- Has more than two final states
- gives single output when it terminates

## Transducer

- Produces outputs based on current input and on previous state
- 2 different types
    - Mealy Machine: output depends only on *current state*
    - Moore Machine: output depends on *current state* and *current input*
    - They can be transformed into each other


# Register Machines

- A register machine has multiple registers that store positive integers
- There are only two possible operations on these registers
    1. incrementing ($+1$)
    2. decrementing ($-1$)
    - Decrementing a register that holds $0$ fails
- There are other (slightly different) definitions of register machines that allow different operations (e.g checking for $0$)
- Register Machines can be graphically represented like FSMs or as a simple list of instructions (programming language)

Example of list of instructions for a Register Machine:

|    | Action | Next Instruction | Alternative Instruction (if actual instruction fails) |
|----|--------|------------------|-------------------------------------------------------|
| 1. | x-     |  2               |   4                                                   |
| 2. | y+     |  3               |   -                                                   |
| 3. | x-     |  1               |   8                                                   |
| 4. | y-     |  5               |   6                                                   |
| 5. | x+     |  4               |   -                                                   |
| 6. | x-     |  7               |   5                                                   |
| 7. | x-     |  9               |   HALT                                                |
| 8. | y-     |  9               |   3                                                   |
| 9. | x+     |  10              |   -                                                   |
| 10.| x+     |  11              |   -                                                   |
| 11.| x+     |  8               |   -                                                   |

- Register Machines and Turing Machines can simulate each other in polynomial time
- For each Register Machine with more than 2 registers ($N$) there is an equivalent Register Machine with only 2 registers
    - The $N$ registers need to be encoded
- Whenever a loop ends (in a 2 Register Machine)
    - one register is $0$
    - in the other register is some information available

<!-- Notes Week 2 End -->


<!-- Notes Week 4 Start -->

# Fractran

See also [Wikipedia:Fractran](https://en.wikipedia.org/wiki/FRACTRAN)

Example PRIMEGAME:

$${\frac  {17}{91}},{\frac  {78}{85}},{\frac  {19}{51}},{\frac  {23}{38}},{\frac  {29}{33}},{\frac  {77}{29}},{\frac  {95}{23}},{\frac  {77}{19}},{\frac  {1}{17}},{\frac  {11}{13}},{\frac  {13}{11}},{\frac  {15}{2}},{\frac  {1}{7}},{\frac  {55}{1}}$$

State/Memory: an Integer

Computation: multiply by first fraction that yields an integer

Start with $2$: calculate primes.

Implementation in racket:

<script src="https://gist.github.com/LukasWoodtli/c391e391dcc9f9c9e9231a8c6fb954a4.js"></script>


Fractran is similar to stack machines.

# Tilings

See also [Wikipedia:Wang tile](https://en.wikipedia.org/wiki/Wang_tile)

- Graphical model of computation
- The edges of each tile have special form/color
- Tiles can be arranged on plain so that edges match

## Tiles as Turing Machine

- Tiled plain can be seen as Turing Machine over time
    - one dimension (horizontal, x) is tape
    - other dimension (vertical, y) is time
    - so each row shows the tape at a given time
3 kind of tiles needed

| Kind of Tile | Use                                      |
|--------------|------------------------------------------|
| TAPE         | One for each symbol in the alphabet      |
| ACTION       | One tile for each transition of the TM   |
| PREPARE      | Two for each (symbol, state) pair        |

- Seed row: initial configuration
- We can tile the floor with the tiles if TM halts


<!-- Notes Week 4 End -->

<!-- Notes Week 6 Start -->

# Cellular Automata

- Inspired by natural cells
- World is grid of cells
- Cells have state (e.g. dead/alive)
- Next state of a cell is calculated by
    - actual state of the cell
    - actual state of the neighbor cells
- All cells work with same rules
- Time is discrete (round based)
- Often used in physics
- Good model for unreliability
- parallel, local comuptation
- can model a Turing Machine

## The Model

- $N$-dimensional array of cells (infinitely large)
- Finite number of states
    - each cell is in some state
- At each time step, each cell updates its state based on
    - it's own state
    - the states of its neighbors
- Variations:
    - number of dimensions
    - neighborhood size (and geometry)
    - asynchronouns
    - error-prone (add randomness)
    - finite size
    - grid type

## Variants

- [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
    - [My implementation (Qt, C++)](https://github.com/LukasWoodtli/GameOfLife)
- [Toom's rule](https://en.wikipedia.org/wiki/Toom%27s_rule)
    - asymetrc rule

<!-- Notes Week 6 End -->

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

## Church Numerals

- Numbers can be encoded as functions
- Arbitrary encoding of numbers suggested by church

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



### Simulation of Turing Machines with Tag Systems

Some of the notes here are taken from 'Understanding Computation' by Tom Stuart.

1. Tape uses only 2 characters: $0$ and $1$
    - $0$ is the blank character
2. Split the tape into two pieces
    - left part
        - character under the head
        - all characters left of the head
    - right part
        - all characters right of the head
3. Interpret left part as binary number
4. Interpret right part as binary number written *backwards*
5. Encode those 2 numbers as string (suitable to be used for Tag System)
6. Simple operations:
    - Simulate
        - *reading* from tape
        - *writing* to tape
        - *moving* the head
    - with simple operations
        - doubling / halfing
        - incrementing / decrementing
        - odd / even (parity) check
        - ...
    - e.g
        - move head to right:
            - doubling left number
            - halving right number
        - reading from tape
            - check if left number is even/odd
        - writing
            - $1$: incrementing number
            - $0$: decrementing number
7. Current *state* of simulated Turing machine represented by different encoding
    - e. g
        - State 1: use *a*, *b*, *c*
        - State 2: use *d*, *e*, *f*
        - ...
8. Convert each Turing Machine rule into a Tag Systems that rewrites the current string in the expected way
9. Combine all the Tag Systems to make a large one the simulates every rule of the Turing Machine


### Cyclic Tag Systems

This are simplified Tag Systems

- The tape is allowed only to have 2 symbols $0$ and $1$
- A string is only appended if a $1$ is read
- The rules for appending strings is ordered
- The deletion number is $1$

Algorithm:

In each round:
- Read next rule in rule-set
- Read next symbol on tape
    - if $1$: append the string from the rule set to the tape
    - if $0$: ignore the rule
- Remove the last read symbol from the tape
- Start from the beginning with reading the next rule

A Cyclic Tag System can simulate a normal Tag System. See 'Understanding Computation' by Tom Stuart on how to do that.

<!-- End Notes Week 10 -->


<!-- Begin Notes Week 11 -->

# Diophantine Equations

See also [Wikipedia:Diophantine equation](https://en.wikipedia.org/wiki/Diophantine_equation)

- Polynomal equations
- Only integer solutions are sought
- Properties
    - no state
    - no dynamics
    - no time
    - no loops
    - no 'IF'/'THEN'
    - just *equations* which all must be true

How to compute?

- Consider a space-time history
- Solve it in the digits of a large number
- Use equations to force it to be valid

<!-- End Notes Week 11 -->


<!-- Begin Notes Week 12 -->

# Primitive Recursive Functions

- Recursion can do a lot!
- Functions are defined using itselves or other functions
- Each function has 2 definition:
    1. Definition for argument $0$
    2. General definition

| Function           | Name           | Definition ($\text{if } n=0$) | Definition ($\text{if } n=S(m)$) |
|--------------------|----------------|-----------------------|--------------------------|
| $S(n) = n + 1$     | Successor      | intrinsic/primitive   | -                        |
| $A(n,a)=n+a$       | Addition       | $a$                   | $S(A(m,a))$              |
| $M(n,a)=n\cdot a$  | Multiplication | $0$                   | $A(a,M(m,a))$            |
| $E(n,a)=a^n$       | Exponentiation | $1$                   | $M(a,E(m,a))$            |
| $V(n)=sign(n)$     | Positivity     | $0$                   | $1$                      |
| $P(n) = n-1$       | Predecessor    | $0$                   | $m$                      |
| $D(a,n) = a-n$     | Subtraction    | $a$                   | $P(D(n,m))$              |
| $R(n,a)=n \bmod a$ | Remainder      | $0$                   | $M(S(R(m,a)),V(D(P(a),R(m,a))))$ |
| $C(n,a)=\prod_{i=2}^{n+1} a \bmod i$ | 'mod Product'  | $0$ | $M(C(m,a),R(a,(S(S(m)))))$ |
| $Z(n)=1$ if prime ; $0$ else | Primality | $0$ | $V(M(m,(P(m),S(m))))$ |

- Infinite loops not possible
- Can simulate a Turing Machine only for a given number of steps (weaker than TM's)
    - Number of iterations of a loop need to be known from beginning
    - Infinite loops are not possible
- *Not* considierd as universal system


# Some Simple Models

## Chemical Reaction Networks

- Inspired by chemical reaction equations

$$\begin{matrix}
A & \rightarrow  & B \\ 
C & \rightarrow & D \\ 
B + C & \rightarrow & A \\ 
A + D & \rightarrow & A + 2E\\ 
B + E & \rightarrow & B + D
\end{matrix}$$

- Nondeterministic: any reaction can happen at any time
- Primitive Recursive Functions can always compute this in bounded time, even if answer is $\infty$.
- Chemical Reaction Networks are not stronger than Primitive Recursive Functions.

## Petri Nets

- A lot of different form of [Petri Nets](https://en.wikipedia.org/wiki/Petri_net)
- Components
    - Transition (edges)
    - Places (nodes)
    - Tokens (arcs) travel from transitions to places (or vice versa)
- Nondeterministic
- Similar to (and as powerful as) Chemical Transition Networks
- Used to simulate concurrency in distributed systems (but not turing-complete)

## Vector Addition Systems

- Rules: Starting position and list of possible moves (like a knight in chess)
- no coordinate ca go negative
- N-dimensional is posible

|  A |  B |  C |  D |  E |  F |  G |
|----|----|----|----|----|----|----|
| -1 |  1 |  0 |  0 |  0 |  0 |  0 |
|  0 |  0 | -1 |  1 |  0 |  0 |  0 |
|  1 | -1 | -1 |  0 |  0 |  0 |  0 |
| -1 |  0 |  0 | -1 |  0 |  1 |  0 |
|  1 |  0 |  0 | -1 |  0 |  1 |  0 |
|  0 | -1 |  0 |  0 | -1 |  0 |  1 |
|  0 |  1 |  1 |  0 |  0 |  0 | -1 |

- 7 moves for 7 dimensions
- Non-deterministic
- Same as Chemical Reduction Networks
    - Put equations in vectors (linear combination)



## Unordered Fractran

- Similar to fractran
- Choose any fraction randomly that yields an integer when multiplied with given number
- non-deterministic

## Broken Register Machine

- decrementing a register might fail even if register could be decremented

## General Notes

- A lot of these systems get more powerful if they allow prioritizing
- determinism: turing complete

<!-- End Notes Week 13 -->

<!-- Beginn Notes Week 14 -->

