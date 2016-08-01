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


See [SICP section 1.2.1](https://mitpress.mit.edu/sicp/full-text/book/book-Z-H-11.html#%_sec_1.2.1)

and [stack overflow](http://stackoverflow.com/questions/17254240/sicp-recursive-process-vs-iterative-process-using-a-recursive-procedure-to-gene)


It's confusing that both the recursive and the iterative implementation call themselves. There is a distinction between

- Recursive process and
- Recursive function

A recursive function calls itself. But it can be implemented as *recursive* or *iterative* process.

+---------------------------------------------------+----------------------------------------------------------------+
| Recursive Process                                 | Iterative Process                                              |
+===================================================+================================================================+
| Function calls itself                             | Function calls itself                                          |
+---------------------------------------------------+----------------------------------------------------------------+
| Itermediate result is kept on caller side         | Intermedia result is passed to the called function             |
|                                                   |                                                                |
|                                                   | - additinal argument needed                                    |
|                                                   | - initial value needed                                         |
|                                                   |                                                                |
+---------------------------------------------------+----------------------------------------------------------------+
| Each recursive call needs a new stack frame       | Stack frame can be reused (tail call)                          |
+---------------------------------------------------+----------------------------------------------------------------+
| Recursive function call part of bigger expression | Recursive function call not part of bigger expression          |
+---------------------------------------------------+----------------------------------------------------------------+
| Easier to understand                              | More difficult to understand and to implement                  |
+---------------------------------------------------+----------------------------------------------------------------+
| Needs stack                                       | Can be implemented in register machine (without stack)         |
+---------------------------------------------------+----------------------------------------------------------------+


Recursive Process
-----------------

.. code-block:: scheme

    (define (factorial n)
      (if (= n 1)
          1
          (* n (factorial (- n 1))))) ;; 'factorial' is part of bigger expression


Iterative Process
-----------------

.. code-block:: scheme

    (define (factorial n)
      (fact-iter 1 1 n)) ;; inital values need to be provided

    (define (fact-iter product counter max-count) ;; max-cout: intermediate result
      (if (> counter max-count)
           product
           (fact-iter (* counter product)
                      (+ counter 1)
                      max-count))) ;; max-cout: supply intermediate result to next call


- Iterative algorithms have constant space
- Develop iterative algorithm:

  - figure out a way to accumulate partial answers
  - write out table to analyze precisely

    - initialization of first row
    - update rules for other rows
    - how to know when to stop

- Iterative algorithms have no pending operations when the procedure calls itself

