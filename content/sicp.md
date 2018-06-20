Title: Structure and Interpretation of Computer Programs
Category: Programming
Tags: Lisp

Notes to the book
> Structure and Interpretation of Computer Programs, Second Edition
> Harold Abelson, Gerald Jay Sussman, Julie Sussman
> MIT Press


[My Github repository with examples](https://github.com/LukasWoodtli/SchemeCourse)

See also [Scheme (Lisp)]({filename}/scheme.rst)

[TOC]

# Building Abstractions with Procedures

## The Elements of Programming

*"[The] language provides for combining simple ideas to form more complex ideas.  Every powerful language has three mechanisms for accomplishing this:*

- ***primitive expressions**, which represent the simplest entities the language is concerned with,*
- ***means of combination**, by which compound elements are built from simpler ones, and*
- ***means of abstraction**, by which compound elements can be named and manipulated as units."*

### Evaluating Combinations

*"To evaluate a combination, do the following:*
- *Evaluate the subexpressions of the combination.*
- *Apply the procedure that is the value of the leftmost subexpression (the operator) to the arguments that are the values of the other subexpressions (the operands).*"

*"[...] first perform the evaluation process on each element of the combination. Thus, the evaluation rule is**recursive** in nature"*

### The Substitution Model for Procedure Application
#### Applicative order versus normal order

*"interpreter first evaluates the operator and operands and then applies the resulting procedure to the resulting arguments"*

*"[An] alternative evaluation model would not evaluate the operands until their values were needed. Instead it would first substitute operand expressions for parameters until it obtained an expression involving only primitive operators, and would then perform the evaluation"*

*"This alternative 'fully expand and then reduce' evaluation method is known as **normal-order evaluation**, in contrast to the 'evaluate the arguments and then apply' method that the interpreter actually uses, which is called **applicative-order evaluation**"*

*"normal-order and applicative-order evaluation produce the same value"*

*"Lisp uses applicative-order evaluation"*

*"Lisp obeys the convention that every expression has a value"*

### The Substitution Model for Procedure Application

*"In the iterative case, the program variables provide a complete description of the state of the process at any point."*

*"In contrasting iteration and recursion, we must be careful not to confuse the notion of a recursive **process** with the notion of a recursive **procedure** . When we describe a procedure as recursive, we are referring to the syntactic fact that the procedure definition refers (either directly or indirectly) to the procedure itself. But when we describe a process as following a pattern that is, say, linearly recursive, we are speaking about how the process evolves, not about the syntax of how a procedure is written."*

*"One reason that the distinction between process and procedure may be confusing is that most implementations of common languages (including Ada, Pascal, and C) are designed in such a way that the interpretation of any recursive procedure consumes an amount of memory that grows with the number of procedure calls, even when the process described is, in principle, iterative. As a consequence, these languages can describe iterative processes only by resorting to special-purpose 'looping constructs' such as `do`, `repeat`, `until`, `for`, and `while`."*

*"any iterative process can be realized 'in hardware' as a machine that has a fixed set of registers and no auxiliary memory. In contrast, realizing a recursive process requires a machine that uses an auxiliary data structure known as a **stack**."*


## Formulating Abstractions with Higher-Order Procedures
### Constructing Procedures Using `lambda`

#### Using `let` to create local variables

*"we could use a lambda expression to specify an anonymous procedure for binding our local variables*

*The general form of a `let` expression is*

    :::scheme
    (let
       ((<var 1> <exp 1>)
        (<var 2> <exp 2>)
        ...
        (<var n> <exp n>))
      <body>)

*the `let` expression is interpreted as an alternate syntax for*

    :::scheme
    ((lambda (<var 1> ... <var n>)
      <body>)
        <exp 1>
        ...
        <exp n>)

*No new mechanism is required in the interpreter in order to provide local variables. A `let` expression is simply syntactic sugar for the underlying lambda application."*

*"`Let` allows one to bind variables as locally as possible to where they are to be used."*


#### Abstractions and first-class procedures

*"programming languages impose restrictions on the ways in which computational elements can be manipulated. Elements with the fewest restrictions are said to have first-class status."*

*"Some of the 'rights and privileges' of first-class elements are:*
- *They may be named by variables.*
- *They may be passed as arguments to procedures.*
- *They may be returned as the results of procedures.*
- *They may be included in data structures."*

# Building Abstractions with Data

### What Is Meant by Data?

*"In general, we can think of data as defined by some collection of selectors and constructors, together with specified conditions that these procedures must fulfill in order to be a valid representation."*

*"we could implement `cons`, `car`, and `cdr` without using any data structures at all but only using procedures. Here are the definitions:*

    :::scheme
    (define (cons x y)
      (define (dispatch m)
          (cond ((= m 0) x)
              ((= m 1) y)
                  (else (error "Argument not 0 or 1: CONS" m))))
       dispatch)

    (define (car z)(z 0))
    (define (cdr z) (z 1))

## Hierarchical Data and the Closure Property

*"The ability to create pairs whose elements are pairs is the essence of list structure's importance as a representational tool. We refer to this ability as the **closure property** of cons. In general, an operation for combining data objects satisfies the closure property if the results of combining things with that operation can themselves be combined using the same operation."*



### Sequences as Conventional Interfaces

#### Sequence Operations

*"The key to organizing programs so as to more clearly reflect the signal-flow structure is to concentrate on the 'signals' that flow from one stage in the process to the next. If we represent these signals as lists, then we can use list operations to implement the processing at each of the stages."*

*"The value of expressing programs as sequence operations is that this helps us make program designs that are modular, that is, designs that are constructed by combining relatively independent pieces. We can encourage modular design by providing a library of standard components together with a conventional interface for connecting the components in flexible ways."*

*"The Lisp community also (unfortunately) uses the word “closure” to describe a totally unrelated concept: A closure is an implementation technique for representing procedures with free variables."*

*"Unlike Lisp with its pairs, these languages have no built-in general-purpose glue that makes it easy to manipulate compound data in a uniform way."*
