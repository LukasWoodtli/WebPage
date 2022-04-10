---
title: Scheme (Lisp)
category: Programming
tags: [Lisp]
---
This page collects notes about Scheme (an Lisp in general).

[TOC]

## Sources

Most information is taken from: [Structure and Interpretation of
Computer
Programs](http://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-001-structure-and-interpretation-of-computer-programs-spring-2005/)

See also [my notes on Structure and Interpretation of Computer
Programs]({filename}/sicp.md)

[My Github repository with examples](https://github.com/LukasWoodtli/SchemeCourse)

## Evaluation Rules

1. If *self-evaluating*: return value
2. If *name*: return value of associated name in environment
3. If *special form*: do something special
4. If *combination*:
    1.  *evaluate* all subexpressions (in any order)
    2.  *apply* operator on arguments and return result

## Application Rules

1.  If *primitive procedure*, just do it
2.  If *compound procedure*, then *evaluate* body of procedure with each
    *formal* parameter replaced with corresponding *actual* argument
    value.

## Linear Recursion and Iteration

See [SICP section 1.2.1](https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book-Z-H-11.html#%_sec_1.2.1)
and [stack overflow](http://stackoverflow.com/questions/17254240/sicp-recursive-process-vs-iterative-process-using-a-recursive-procedure-to-gene)

It\'s confusing that both the recursive and the iterative implementation
call themselves. There is a distinction between

-   Recursive process and
-   Recursive function

A recursive function calls itself. But it can be implemented as
*recursive* or *iterative* process.


| Recursive Process                                 | Iterative Process                                      |
|---------------------------------------------------|--------------------------------------------------------|
| Function calls itself                             | Function calls itself                                  |
| Itermediate result is kept on caller side         | Intermedia result is passed to the called function: additional argument needed, initial value needed |
| Each recursive call needs a new stack frame       | Stack frame can be reused (tail call)                  |
| Recursive function call part of bigger expression | Recursive function call not part of bigger expression  |
| Easier to understand                              | More difficult to understand and to implement          |
| Needs stack                                       | Can be implemented in register machine (without stack) |



### Recursive Process

```scheme
(define (factorial n)
(if (= n 1)
    1
    (* n (factorial (- n 1))))) ;; 'factorial' is part of bigger expression
```

### Iterative Process

```scheme
(define (factorial n)
  (fact-iter 1 1 n)) ;; inital values need to be provided

(define (fact-iter product counter max-count) ;; max-cout: intermediate result
  (if (> counter max-count)
       product
       (fact-iter (* counter product)
                  (+ counter 1)
                  max-count))) ;; max-cout: supply intermediate result to next call
```

-   Iterative algorithms have constant space
-   Develop iterative algorithm:
    -   figure out a way to accumulate partial answers
    -   write out table to analyze precisely
        -   initialization of first row
        -   update rules for other rows
        -   how to know when to stop
-   Iterative algorithms have no pending operations when the procedure
    calls itself

## Expressions

-   In Scheme everything is an expression
-   Expressions can be nested arbritarly

## Sequences as Conventional Interfaces

*"The key to organizing programs so as to more clearly reflect the
signal-flow structure is to concentrate on the "signals" that flow
from one stage in the process to the next. If we represent these signals
as lists, then we can use list operations to implement the processing at
each of the stages.*"

*"The value of expressing programs as sequence operations is that this
helps us make program designs that are modular, that is, designs that
are constructed by combining relatively independent pieces. We can
encourage modular design by providing a library of standard components
together with a conventional interface for connecting the components in
flexible ways."*

[SICP section 2.2.3 Sequences as Conventional Interfaces](https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book-Z-H-15.html#%_sec_2.2.3)

## Lazy Evaluation

Normal-order (lazy) evaluation doesn't work well in some cases:

-   Tail recursion (Iterative Process): the stack frame can't be reused
    because computation of a promise is not executed until it's needed.
    The delayed promises let the stack grow until their computation is
    forced.
-   Side effects: Setting variables to values calculated by promises is
    difficult because it's not clear when the promise is forced to
    calculate the value. The time decoupling mechanism of promises
    (streams) doesn't work well with statefull models where time is of
    essence.

## Quotation

*"Allowing quotation in a language wreaks havoc with the ability to
reason about the language in simple terms, because it destroys the
notion that equals can be substituted for equals. For example, three is
one plus two, but the word "three" is not the phrase "one plus two".
Quotation is powerful because it gives us a way to build expressions
that manipulate other expressions"*

[SICP section 2.3.1 Quotation](https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book-Z-H-16.html#%_sec_2.3.1)

## Backquote

Preceding a list with a backquote symbol (`) is much like quoting it,
except that anything in the list that is flagged with a comma is
evaluated.

[SICP section 5.5.2 Compiling Expressions](https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book-Z-H-35.html#%_sec_5.5.2)
