Statements and Expressions
##########################

:date: 2016-07-04
:modified: 2016-07-04
:category: Programming
:tags: Computer Science


"The purpose of an expression is to be evaluated to produce another expression; a statement, on the other hand, is evaluated to make some change to the state of the abstract machine." [Tom Stuart, Understanding Computation]

Statements often contain expressions but not the other way around.

$$\underbrace{x = \overbrace{1 + 2}^{\text{expression}}}_{\text{statement}}$$

Expressions (Ausdruck)
======================

- is *evaluated* according to semantics in a context
- 'returns' a value
- can have side-effects (in most languages)
- some languages have expressions as only construct (functional, declarative)
- some languages have declarations for defining context of expression (among other things)
- can be nested with each other


Statement (Anweisung)
=====================

- mostly just in imperative languages
- is *executed*, action to be carried out
    - in most languages no result/value (no eval)
    - only side-effects (change of state)
- in assembly languages statements are often called instruction/command
- most languages have fixed set of statements (can not be changed/extended)
- statements are often language keywords
    - can't be redefined
- some statements can be expressions
    - assignment
    - increment
    - function calls
    - ...
- Examples:
    - Assignments
    - Control statements
        - jumps
        - loops
        - conditionals (if, else, switch, ...)
        - ...
    - procedure calls
    - assertion
    - declarations
    - class/type definitions
- statements often begin with a identifier/keyword
- the syntax of statements can be described with
    - `BNF <https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_Form>`_
    - `Syntax diagram <https://en.wikipedia.org/wiki/Syntax_diagram>`_
- statements differ from subroutine calls by handling of parameters
    - subroutine parameters are evaluated once
    - statement parameters can be evaluated multiple times (e.g. condition in while loop)
        - call-by-name (lazy evaluation)
- can't be nested with each others or with expressions

Declaration
===========

- set properties
    - identifier (word/name)
    - dimension
    - scope
    - ...
- of
    - variables
    - constants
    - functions
    - classes
    - enums
    - type-defs
    - ...
