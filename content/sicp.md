---
title: Structure and Interpretation of Computer Programs
category: Programming
tags: [Lisp]
---
Notes to the book
> Structure and Interpretation of Computer Programs, Second Edition
> Harold Abelson, Gerald Jay Sussman, Julie Sussman
> MIT Press


[My Github repository with examples](https://github.com/LukasWoodtli/SchemeCourse)

See also [Scheme (Lisp)]({filename}/scheme.md)

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

*"The Lisp community also (unfortunately) uses the word "closure" to describe a totally unrelated concept: A closure is an implementation technique for representing procedures with free variables."*

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


# 4 Metalinguistic Abstraction

## 4.1 The Metacircular Evaluator

*"The model has two basic parts:*

1. *To evaluate a combination (a compound expression other than a special form), evaluate the subexpressions and then apply the value of the operator subexpression to the values of the operand subexpressions.*
2. *To apply a compound procedure to a set of arguments, evaluate the body of the procedure in a new environment. To construct this environment, extend the environment part of the procedure object by a frame in which the formal parameters of the procedure are bound to the arguments to which the procedure is applied."*

*"The job of the evaluator is not to specify the primitives of the language, but rather to
provide the connective tissue - the means of combination and the means of abstraction - that
binds a collection of primitives to form a language. Specifically:*

- *The evaluator enables us to deal with nested expressions.*
- *The evaluator allows us to use variables. [...] We need an evaluator to keep track of variables and obtain their values before invoking the primitive procedures.*
- *The evaluator allows us to define compound procedures. This involves keeping track of procedure definitions, knowing how to use these definitions in* evaluating expressions, and providing a mechanism that enables procedures to accept arguments.*
- *The evaluator provides the special forms, which must be evaluated differently from procedure calls."*

### 4.1.1 The Core of the Evaluator

*"The evaluation process can be described as the interplay between two procedures:
`eval` and `apply`."*

#### Eval

*"`Eval` takes as arguments an expression and an environment. It classifies the expression
and directs its evaluation. `Eval` is structured as a case analysis of the syntactic type
of the expression to be evaluated."*

*"Each type of expression has a predicate that tests for it and an abstract means for
selecting its parts. This **abstract syntax** makes it easy to see how we can change the
syntax of the language by using the same evaluator."*

#### Primitive expressions

- *"For self-evaluating expressions, such as numbers, eval returns the expression itself.*
- *Eval must look up variables in the environment to find their values.*
- *For quoted expressions, `eval` returns the expression that was quoted.*
- *An assignment to (or a definition of) a variable must recursively call eval to compute the new value to be associated with the variable. The environment must be modified to change (or create) the binding of the variable.*
- *An `if` expression requires special processing of its parts, so as to evaluate the consequent if the predicate is true, and otherwise to evaluate the alternative.*
- *A `lambda` expression must be transformed into anapplicable procedure by packaging together the parameters and body specified by the `lambda` expression with the environment of the evaluation.*
- *A `begin` expression requires evaluating its sequence of expressions in the order in which they appear.*
- *A case analysis (`cond`) is transformed into a nest of `if` expressions and then evaluated."*


### 4.1.4 Running the Evaluator as a Program

*"Our evaluator program reduces expressions ultimately to the application
of primitive procedures."*

*"We thus set up a global environment that associates unique objects with the names
of the primitive procedures that can appear in the expressions we will be evaluating."*

*"The global environment also includes bindings for the symbols `true` and `false`."*


### 4.1.5 Data as Programs

*"Turing presented a simple computational model - now known
as a **Turing machine** - and argued that any "effective process"
can be formulated as a program for such a machine. (This argument
is known as the **Church-Turing thesis**.) Turing then implemented
a universal machine, i.e., a Turing machine that behaves
as an evaluator for Turing-machine programs."*

*"An evaluator, which is
implemented by a relatively simple procedure, can emulate programs
that are more complex than the evaluator itself. The existence
of a universal evaluator machine is a deep and wonderful
property of computation."*


### 4.2.1 Normal Order and Applicative Order

*"We noted that Scheme is an **applicativeorder**
language, namely, that all the arguments to Scheme
procedures are evaluated when the procedure is applied.
In contrast, **normal-orde**r languages delay evaluation of
procedure arguments until the actual argument values are
needed. Delaying evaluation of procedure arguments until
the last possible moment (e.g., until they are required by a
primitive operation) is called **lazy evaluation**"*

### 4.2.2 An Interpreter with Lazy Evaluation

*"The basic idea is that, when applying a procedure, the interpreter
must determine which arguments are to be evaluated
and which are to be delayed. The delayed arguments
are not evaluated; instead, they are transformed into objects
called **thunks**."*

*"The word **thunk** was invented by an informal working group that
was discussing the implementation of call-by-name in Algol 60.
They observed that most of the analysis of ("thinking about") the
expression could be done at compile time; thus, at run time, the
expression would already have been "thunk" about"*


## 4.3 Variations on a Scheme - Nondeterministic Computing

*"With nondeterministic evaluation, an expression
represents the exploration of a set of possible worlds,
each determined by a set of choices. Some of the possible
worlds lead to dead ends, while others have useful values.
The nondeterministic program evaluator supports the illusion
that time branches, and that our programs have different
possible execution histories. When we reach a dead
end, we can revisit a previous choice point and proceed
along a different branch."*


### 4.3.1 Amb and Search

*"Abstractly, we can imagine that evaluating an `amb` expression
causes time to split into branches, where the
computation continues on each branch with one of the
possible values of the expression. We say that `amb` represents
a nondeterministic choice point."*

*"It is better to **systematically search** all possible execution paths.
The amb evaluator [...] implements a systematic search as follows:
When the evaluator encounters an application of `amb, it
initially selects the first alternative. This selection may itself
lead to a further choice. The evaluator will always initially
choose the first alternative at each choice point. If
a choice results in a failure, then the evaluator **automagically**
backtracks to the most recent choice point and tries
the next alternative."*


### 4.3.3 Implementing the Amb Evaluator

*"The evaluation of an ordinary Scheme expression may return
a value, may never terminate, or may signal an error.
In nondeterministic Scheme the evaluation of an expression
may in addition result in the discovery of a dead
end, in which case evaluation must backtrack to a previous
choice point. The interpretation of nondeterministic
Scheme is complicated by this extra case."*

#### Execution procedures and continuations

*"Recall that the execution procedures for the ordinary evaluator
take one argument: the environment of execution.
In contrast, the execution procedures in the `amb` evaluator
take three arguments: the environment, and two procedures
called **continuation procedures**. The evaluation of
an expression will finish by calling one of these two continuations:
If the evaluation results in a value, the **success
continuation** is called with that value; if the evaluation results
in the discovery of a dead end, the **failure continuation**
is called."*

*"The failure continuation
in hand at that point will cause the most recent choice
point to choose another alternative. If there are no more
alternatives to be considered at that choice point, a failure
at an earlier choice point is triggered, and so on."*

*"In addition, if a side-effect operation (such as assignment
to a variable) occurs on a branch of the process resulting
from a choice, it may be necessary, when the process
finds a dead end, to undo the side effect before making
a new choice."*

*"When the failure continuation for an `amb` runs out of
choices, it calls the failure continuation that was originally
given to the `amb`, in order to propagate the failure
back to the previous choice point or to the top level."*


## 4.4 Logic Programming

*"Computer science deals with
imperative (how to) knowledge, whereas mathematics
deals with declarative (what is) knowledge."*

*"In a nondeterministic language, expressions
can have more than one value, and, as a result, the
computation is dealing with relations rather than with
single-valued functions. Logic programming extends this
idea by combining a relational vision of programming
with a powerful kind of symbolic pattern matching called
**unification**."*


# 5 Computing with Register Machines

## 5.1 Designing Register Machines

*"To design a register machine, we must design its **data paths** (registers and operations) and the **controller** that sequences these operations."*

### 5.1.4 Using a Stack to Implement Recursion

*"Since there is no a priori limit on the depth of nested re- cursive calls, we may need to save an arbitrary number of register values. These values must be restored in the re- verse of the order in which they were saved, since in a nest of recursions the last subproblem to be entered is the first to be finished. This dictates the use of a **stack**."*


*"Although in principle the factorial computation requires an infinite machine, the machine in [...] is actually finite except for the stack, which is potentially unbounded."*

*"When a recursive sub- problem is encountered, we save on the stack the registers whose current values will be required after the subproblem is solved, solve the recursive subproblem, then restore the saved registers and continue execution on the main problem."*

*"[The] registers that need to be saved depends on the particular machine, since not all recursive computations need the original values of registers that are modified during solution of the subproblem."*

### 5.2.2 The Assembler

*"The assembler transforms the sequence of controller expressions for a machine into a corresponding list of machine instructions, each with its execution procedure."*

## 5.3 Storage Allocation and Garbage Collection

### 5.3.1 Memory as Vectors

*"Memory addresses can be incremented to support sequential access to some set of the cubbyholes. More generally, many important data operations require that memory addresses be treated as data, which can be stored in memory locations and manipulated in machine registers. The representation of list structure is one application of such **address arithmetic**."*

*"In order to describe memory operations, we use two primitive Scheme procedures for manipulating vectors:"*

- `(vector-ref <vector> <n>)` returns the $n^{th}$ element of the vector.
- `(vector-set! <vector> <n> <value>)` sets the $n^{th}$ element of the vector to the designated value.

#### Representing Lisp data

*"Let us imagine that computer memory is divided into two vectors: `the-cars` and `the-cdrs`. We will represent list structure as follows: A pointer to a pair is an index into the two vectors. The `car` of the pair is the entry in `the-cars` with the designated index, and the `cdr` of the pair is the entry in `the-cdrs` with the designated index. We also need a representation for objects other than pairs (such as numbers and symbols) and a way to distinguish one kind of data from another. [...] using **typed pointers**, that is, to extending the notion of "pointer" to include information on data type."*


### 5.3.2 Maintaining the Illusion of Infinite Memory

*"Garbage collection is based on the observation that, at any moment in a Lisp interpretation, the only objects that can affect the future of the computation are those that can be reached by some succession of `car` and `cdr` operations starting from the pointers that are currently in the machine registers."*

*"We assume here that the stack is represented as a list [...], so that items on the stack are accessible via the pointer in the stack register."*

### 5.4.1 The Core of the Explicit-Control Evaluator

#### Evaluating simple expressions

*"Numbers and strings (which are self-evaluating), variables, quotations, and `lambda` expressions have no subexpressions to be evaluated."*

#### Evaluating procedure applications

*"A procedure application is specified by a combination containing an operator and operands. The operator is a subexpression whose value is a procedure, and the operands are subexpressions whose values are the arguments to which the procedure should be applied."*

*"Saving registers whose contents will not be needed later may also hold onto useless data that could otherwise be garbage-collected, freeing space to be reused."*


### 5.4.4 Running the Evaluator

*"we have explored successively more precise models of the evaluation process. 
We started with the relatively informal substitution model, then extended this
[...] to the environment model, which enabled us to deal with state and change.
In the metacircular evaluator [...], we used Scheme itself as a language for
making more explicit the environment structure constructed during evaluation of
an expression. Now, with register machines, we have taken a close look at the
evaluator’s mechanisms for storage management, argument passing, and control. At
each new level of description, we have had to raise issues and resolve
ambiguities that were not apparent at the previous, less precise treatment of
evaluation. To understand the behavior of the explicit-control evaluator, we can
simulate it and monitor its performance."*

*"There are two common strategies for bridging the gap between higher-level languages and register-machine languages."*

*"An interpreter written in the native language of a machine configures the
machine to execute programs written in a language (called the **source language**)
that may differ from the native language of the machine performing the
evaluation. The primitive procedures of the source language are implemented as a
library of subroutines written in the native language of the given machine. A
program to be interpreted (called the **source program**) is represented as a data
structure. The interpreter traverses this data structure, analyzing the source
program. As it does so, it simulates the intended behavior of the source program
by calling appropriate primitive subroutines from the library."*

*"[...] the alternative strategy of **compilation**. A compiler for a given
source language and machine translates a source program into an equivalent
program (called the **object program**) written in the machine’s native
language."*

*"In view of the complementary advantages of compi-lation and interpretation,
modern program-development environments pursue a mixed strategy. Lisp
interpreters are generally organized so that interpreted procedures and
compiled procedures can call each other."*


### 5.5.1 Structure of the Compiler

#### Targets and linkages

*"`Compile` and the code generators that it calls take two arguments 
in addition to the expression to compile. There is a **target**,
which specifies the register in which the compiled code is to return 
the value of the expression. There is also a **linkage descriptor**, 
which describes how the code resulting from the compilation of the
expression should proceed when it has finished its execution. The
linkage descriptor can require that the code do one of the following
three things:*

- *continue at the next instruction in sequence (this is specified by the linkage descriptor `next`),*
- *return from the procedure being compiled (this is spec- ified by the linkage descriptor `return`), or*
- *jump to a named entry point (this is specified by using the designated label as the linkage descriptor)."*


#### Instruction sequences and stack usage

*"An instruction sequence will contain three pieces of information:*

- *the set of registers that must be initialized before the instructions in the sequence are executed (these registers are said to be **needed** by the sequence),*
- *the set of registers whose values are modified by the instructions in the sequence, and**
- *the actual instructions (also called **statements**) in the sequence."*


### 5.5.6 Lexical Addressing

*"One of the most common optimizations performed by compilers is the optimization of variable lookup."*

*"Because our language is lexically scoped, the runtime environment
for any expression will have a structure that parallels the lexical
structure of the program in which the expression appears."*

*"This is not true if we allow internal definitions, unless we scan them out."*

*"We can exploit this fact by inventing a new kind of
variable-lookup operation, `lexical-address-lookup`, that takes as
arguments an environment and a **lexical address** that consists of
two numbers: a **frame number**, which specifies how many frames to
pass over, and a **displacement number**, which specifies how many
variables to pass over in that frame."*

*"In order to generate such code, the compiler must be able to 
determine the lexical address of a variable it is about to compile a 
reference to."*

### 5.5.7 Interfacing Compiled Code to the Evaluator

#### Interpretation and compilation

*"An interpreter raises the machine to the level of the user
program; a compiler lowers the user program to the level of the 
machine language. We can regard the Scheme language (or any
programming language) as a coherent family of abstractions erected
on the machine language."*

*"We incur significant overhead if we insist that errors encountered 
in execution of a user program be detected and signaled, rather than 
being allowed to kill the system or produce wrong answers."*
