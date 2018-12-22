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

# 1 Building Abstractions with Procedures

## 1.1 The Elements of Programming

*"[The] language provides for combining simple ideas to form more complex ideas.  Every powerful language has three mechanisms for accomplishing this:*

- ***primitive expressions**, which represent the simplest entities the language is concerned with,*
- ***means of combination**, by which compound elements are built from simpler ones, and*
- ***means of abstraction**, by which compound elements can be named and manipulated as units."*

### 1.1.3 Evaluating Combinations

*"To evaluate a combination, do the following:*

- *Evaluate the subexpressions of the combination.*
- *Apply the procedure that is the value of the leftmost subexpression (the operator) to the arguments that are the values of the other subexpressions (the operands).*"

*"[...] first perform the evaluation process on each element of the combination. Thus, the evaluation rule is **recursive** in nature"*


### 1.1.5 The Substitution Model for Procedure Application

#### Applicative order versus normal order

*"[The] interpreter first evaluates the operator and operands and then applies the resulting procedure to the resulting arguments."*

*"[An] alternative evaluation model would not evaluate the operands until their values were needed. Instead it would first substitute operand expressions for parameters until it obtained an expression involving only primitive operators, and would then perform the evaluation."*

*"This alternative 'fully expand and then reduce' evaluation method is known as **normal-order evaluation**, in contrast to the 'evaluate the arguments and then apply' method that the interpreter actually uses, which is called **applicative-order evaluation**."*

*"Normal-order and applicative-order evaluation produce the same value."*

*"Lisp uses applicative-order evaluation."*

*"Lisp obeys the convention that every expression has a value."*

### 1.2.1 Linear Recursion and Iteration

*"In the iterative case, the program variables provide a complete description of the state of the process at any point."*

*"In contrasting iteration and recursion, we must be careful not to confuse the notion of a recursive **process** with the notion of a recursive **procedure** . When we describe a procedure as recursive, we are referring to the syntactic fact that the procedure definition refers (either directly or indirectly) to the procedure itself. But when we describe a process as following a pattern that is, say, linearly recursive, we are speaking about how the process evolves, not about the syntax of how a procedure is written."*

*"One reason that the distinction between process and procedure may be confusing is that most implementations of common languages (including Ada, Pascal, and C) are designed in such a way that the interpretation of any recursive procedure consumes an amount of memory that grows with the number of procedure calls, even when the process described is, in principle, iterative. As a consequence, these languages can describe iterative processes only by resorting to special-purpose 'looping constructs' such as `do`, `repeat`, `until`, `for`, and `while`."*

*"any iterative process can be realized 'in hardware' as a machine that has a fixed set of registers and no auxiliary memory. In contrast, realizing a recursive process requires a machine that uses an auxiliary data structure known as a **stack**."*


## 1.3 Formulating Abstractions with Higher-Order Procedures

### 1.3.2 Constructing Procedures Using `lambda`

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

# 2 Building Abstractions with Data

### 2.1.3 What Is Meant by Data?

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

## 2.2 Hierarchical Data and the Closure Property

*"The ability to create pairs whose elements are pairs is the essence of list structure's importance as a representational tool. We refer to this ability as the **closure property** of cons. In general, an operation for combining data objects satisfies the closure property if the results of combining things with that operation can themselves be combined using the same operation."*


### 2.2.3 Sequences as Conventional Interfaces

#### Sequence Operations

*"The key to organizing programs so as to more clearly reflect the signal-flow structure is to concentrate on the 'signals' that flow from one stage in the process to the next. If we represent these signals as lists, then we can use list operations to implement the processing at each of the stages."*

*"The value of expressing programs as sequence operations is that this helps us make program designs that are modular, that is, designs that are constructed by combining relatively independent pieces. We can encourage modular design by providing a library of standard components together with a conventional interface for connecting the components in flexible ways."*

*"The Lisp community also (unfortunately) uses the word “closure” to describe a totally unrelated concept: A closure is an implementation technique for representing procedures with free variables."*

*"Unlike Lisp with its pairs, these languages have no built-in general-purpose glue that makes it easy to manipulate compound data in a uniform way."*


# 3 Modularity, Objects, and State

## 3.1 Assignment and Local State

### 3.1.1 Local State Variables

*"The `set!` special form, whose syntax is:"*

    :::scheme
    set! <name> <new-value>

*"Here `<name>` is a symbol and `<new-value>` is any expression.
`Set!` changes `<name>` so that its value is the result obtained by
evaluating `<new-value>`."*

*"The value of a `set!` expression is implementation-dependent. `Set!` should be used only for its effect, not for its value."*


### 3.1.2 The Benefits of Introducing Assignment

*"From the point of view of one part of a complex process, the other parts appear to change with time. They have hidden time-varying local state. If we wish to write computer programs whose structure reflects this decomposition, we make computational objects whose behavior changes with time. We model state with local state variables, and we model the changes of state with assignments to those variables."*


### 3.1.3 The Costs of Introducing Assignment 

#### Sameness and change

*"A language that supports the concept that "equals can be substituted for equals" in an expression without changing the value of the expression is said to be referentially transparent. Referential transparency is violated when we include `set!` in our computer language. This makes it tricky to determine when we can simplify expressions by substituting equivalent expressions. Consequently, reasoning about programs that use assignment becomes drastically more difficult."*

*"The phenomenon of a single computational object being accessed by more than one name is known as aliasing."*

#### Pitfalls of imperative programming

*"programs written in imperative style are susceptible to bugs that cannot occur in functional programs."*


## 3.2 The Environment Model of Evaluation

*"Once we admit assignment into our programming language […], a variable can no longer be considered to be merely a name for a value. Rather, a variable must somehow designate a "place" in which values can be stored. In our new model of evaluation, these places will be maintained in structures called environments."*

*"An environment is a sequence of frames. Each frame is a table (possibly empty) of bindings, which associate variable names with their corresponding values."*

*"Each frame also has a pointer to its enclosing environment […]. The value of a variable with respect to an environment is the value given by the binding of the variable in the first frame in the environment that contains a binding for that variable. If no frame in the sequence specifies a binding for the variable, then the variable is said to be unbound in the environment."*

*"Indeed, one could say that expressions in a programming language do not, in themselves, have any meaning. Rather, an expression acquires a meaning only with respect to some environment in which it is evaluated."*


### 3.2.1 The Rules for Evaluation

*"In the environment model of evaluation, a procedure is always a pair consisting of some code and a pointer to an environment. Procedures are created in one way only: by evaluating a $\lambda$-expression. This produces a procedure whose code is obtained from the text of the $\lambda$-expression and whose environment is the environment in which the $\lambda$-expression was evaluated to produce the procedure."*

*"In general, `define` creates definitions by adding bindings to frames."*

*"Now that we have seen how procedures are created, we can describe how procedures are applied. The environment model specifies: To apply a procedure to arguments, create a new environment containing a frame that binds the parameters to the values of the arguments. The enclosing environment of this frame is the environment specified by the procedure. Now, within this new environment, evaluate the procedure body."*


*"The environment model of procedure application can be summarized by two rules:*

- *A procedure object is applied to a set of arguments by constructing a frame, binding the formal parameters of the procedure to the arguments of the call, and then evaluating the body of the procedure in the context of the new environment constructed. The new frame has as its enclosing environment the environment part of the procedure object being applied.*

- *A procedure is created by evaluating a $\lambda$-expression relative to a given environment. The resulting procedure object is a pair consisting of the text of the $\lambda$-expression and a pointer to the environment in which the procedure was created."*


*"We also specify that defining a symbol using `define` creates a binding in the current environment frame and assigns to the symbol the indicated value."*

*"Evaluating the expression (`set! <variable> <value>`) in some environment locates the binding of the variable in the environment and changes that binding to indicate the new value. That is, one finds the first frame in the environment that contains a binding for the variable and modifies that frame. If the variable is unbound in the environment, then `set!` signals an error."*

## 3.3 Modeling with Mutable Data

### 3.3.1 Mutable List Structure

#### Sharing and identity

*"One way to detect sharing in list structures is to use the predicate `eq?`, […] as a way to test whether two symbols are equal. More generally, (`eq? x y`) tests whether `x` and `y` are the same object (that is, whether `x` and `y` are equal as pointers)."*

#### Mutation is just assignment

*"We can implement mutable data objects as procedures using assignment and local state."*

*"Assignment is all that is needed, theoretically, to account for the behavior of mutable data. As soon as we admit `set!` to our language, we raise all the issues, not only of assignment, but of mutable data in general."*

*"On the other hand, from the viewpoint of implementation, assignment requires us to modify the environment, which is itself a mutable data structure. Thus, assignment and mutation are equipotent: Each can be implemented in terms of the other."*
