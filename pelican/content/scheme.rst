Scheme (Lisp)
#############

:date: 2016-07-24
:category: Programming
:tags: Lisp

This page collects notes about Scheme (an Lisp in general).

Sources
=======
Most information is taken from:

`Structure and Interpretation of Computer Programs<http://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-001-structure-and-interpretation-of-computer-programs-spring-2005/>_

`My Github repository with examples<https://github.com/LukasWoodtli/SchemeCourse>`_


Evaluation Rules
================

1. If *self-evaluating*: return value
2. If *name*: return value of associated name in environment
3. If *special form*: do something special
4. If *combination*:
    a) *evaluate* all subexpressions (in any order)
    b) *apply* operator on arguments and return result


Linear Recursion and Iteration
==============================

TODO:

https://mitpress.mit.edu/sicp/full-text/book/book-Z-H-11.html#%_sec_1.2.1

http://stackoverflow.com/questions/17254240/sicp-recursive-process-vs-iterative-process-using-a-recursive-procedure-to-gene
