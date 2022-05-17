---
title: Closure
date: 2016-10-13
category: Programming
tags: [Lisp]
---
There are 2 concepts that are called *closure*

# Lambdas

Closures are (anonymous) functions with free variables that capture the context of the calling function (stack).

[Wikipedia:Closure](https://en.m.wikipedia.org/wiki/Closure_(computer_programming))

# The Closure Property

From [SICP: 2.2 Hierarchical Data and the Closure Property](https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book-Z-H-15.html#%_sec_2.2):

*"The ability to create pairs whose elements are pairs is the essence of list structure's importance as a representational tool. We refer to this ability as **the closure property** of `cons`. In general, an operation for combining data objects satisfies the closure property if the results of combining things with that operation can themselves be combined using the same operation."*

*"The use of the word 'closure' here comes from abstract algebra, where a set of elements is said to be closed under an operation if applying the operation to elements in the set produces an element that is again an element of the set. The Lisp community also (unfortunately) uses the word "closure" to describe a totally unrelated concept: A closure is an implementation technique for representing procedures with free variables."*

## Cons Cells

Related to the closure property is the ability to create compound data (e.g pairs) only with functions:

```scheme
(define (cons a b)
  (lambda (p) (p a b)))
(define (car p)
  (p (lambda (a b) a)))
(define (cdr p)
  (p (lambda (a b) b)))
```

[Wikipedia:Cons](https://en.m.wikipedia.org/wiki/Cons#Functional_Implementation)
