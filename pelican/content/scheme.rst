Scheme (Lisp)
#############

:date: 2016-07-24
:category: Programming
:tags: Lisp

This page collects notes about Scheme (an Lisp in general).

Sources
=======
Most information is taken from:

`Structure and Interpretation of Computer Programs <http://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-001-structure-and-interpretation-of-computer-programs-spring-2005/>`_

`My Github repository with examples <https://github.com/LukasWoodtli/SchemeCourse>`_


Evaluation Rules
================

1. If *self-evaluating*: return value
2. If *name*: return value of associated name in environment
3. If *special form*: do something special
4. If *combination*:
    a) *evaluate* all subexpressions (in any order)
    b) *apply* operator on arguments and return result

Application Rules
=================

1. If *primitive procedure*, just do it
2. If *compound procedure*, then *evaluate* body of procedure with each *formal* parameter replaced with corresponding *actual* argument value.

Linear Recursion and Iteration
==============================

TODO:

https://mitpress.mit.edu/sicp/full-text/book/book-Z-H-11.html#%_sec_1.2.1

http://stackoverflow.com/questions/17254240/sicp-recursive-process-vs-iterative-process-using-a-recursive-procedure-to-gene

Iterative Process
-----------------

- Iterative algorithms have constant space
- Develop iterative algorithm:

  - figure out a way to accumulate partial answers
  - write out table to analyze precisely

    - initialization of first row
    - update rules for other rows
    - how to know when to stop

- Iterative algorithms have no pending operations when the procedure calls itself
