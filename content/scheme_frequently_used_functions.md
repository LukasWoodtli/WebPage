---
title: Scheme
date: 2016-10-14
category: Programming
tags: [Lisp]
---

# Pairs (`cons`, `car` and `cdr`)

- `(cons a b)`: Construct a pair
- `(car p)`: Get first element of pair (or list)
- `(cdr p)`: Get second element of pair (or rest of list)

# Lists

- `(list a0 a1 a2 ... aN)`: create a list

Equivalent to `(cons (cons a0 (cons a1 (cons a2 (cons ... (cons (cons aN nil))...)))))`

- `nil`: end of list marker (equivalent to the empty list `'()`)
- `(null? p)`: checks if the given element is `nil`
- `(pair? e)`: checks if the given element is a pair

> the empty list satisfies `null?` and also is *not* a pair

- `(cons a lst)` makes a list like the original one (`lst`), but with an additional item (`a`) at the beginning

Example:

    :::scheme
    (define a (list 1 2 3))
    (cons 10 a)
    >> (10 1 2 3)

- `(list-ref lst i)`: retrieves element at index `i` (index is zero-based)
- `(length lst)`: returns the length of a list
- `(append lst1 lst2)`: combines the elements of two lists into one new list
- `(map fun lst)`: applies the function `fun` to each element of `lst` and returns a new list with the results

The `map` function can be applied on multiple lists:

*"This more general `map` takes a procedure of **n** arguments, together with **n** lists, and applies the procedure to all the first elements of the lists, all the second elements of the lists, and so on, returning a list of the results.*

*For example:*"

    :::scheme
    (map +
        (list 1 2 3)
        (list 40 50 60)
        (list 700 800 900))
    >>> (741 852 963)

    (map (lambda (x y) (+ x (* 2 y)))
        (list 1 2 3)
        (list 4 5 6))
    >>> (9 12 15)

[SICP:2.2.1  Representing Sequences:Mapping over lists](https://mitpress.mit.edu/sicp/full-text/book/book-Z-H-15.html#%_sec_2.2.1)

- `(for-each fun lst)`: applies a function `fun` to each element in the list `lst` but doesn't create a new list. The return value of the function is ignored.


*"The procedure `for-each` is similar to map. It takes as arguments a procedure and a list of elements. However, rather than forming a list of the results, `for-each` just applies the procedure to each of the elements in turn, from left to right. The values returned by applying the procedure to the elements are not used at all - `for-each` is used with procedures that perform an action, such as printing."*

[SICP:2.2.1  Representing Sequences:Exercise 2.23](https://mitpress.mit.edu/sicp/full-text/book/book-Z-H-15.html#%_sec_2.2.1)


- `(flatten t)`: flattens a tree structure into a list

- `(filter p lst)`: Creates a new list with the elements of `lst` for which the predicate `p` is satisfied

- `(foldr f b lst)`: applies the function `f` to the next element of the list and the result of the previous element. `b` is the initial begining value. The list is traversed from right to left. Also known as `acumulate` ([SICP:2.2.3](https://mitpress.mit.edu/sicp/full-text/book/book-Z-H-15.html#%_sec_2.2.3))

- `(foldl f b lst)`: Same as `foldlr` but the list is traversed from left to right.

- `(reduce f lst)`: Same as `foldl` but take the first (leftmost) element as starting element.

If `reduce` is not available (e.g in Racket) it can be defined in terms of `foldl`:

    :::scheme
    (define (reduce f xs)
        (and (not (empty? xs)) (foldl f (first xs) (rest xs))))

[Stack Overflow](http://stackoverflow.com/a/25211454/1272072)

- `(memq  v lst)`: find element `v` in list `lst` and return the rest of the list starting at the found element. If element is not found `#f` is returned. Similar functions: `member`, `memv`, `memf`


# Local Binding

`let` is syntactic sugar for a procedure call:

    :::scheme
    (let ((<var> <exp>)) <body>)


is interpreted as an alternate syntax for

    :::scheme
    ((lambda (<var>) <body>) <exp>)


# Delayed Evaluation

`delay` is a special form that returns a *delayed object*. It is a 
*promise* to evaluate the given expression at some future time.

`force` takes a *delayed object* and performs the evaluation. It forces
the `delay` to fulfill its promise.


Delay can be a special form such that:

    :::scheme
    (delay <exp>)

is syntactic sugar for

    :::scheme
    (lambda () <exp>)

Force simply calls the procedure (of no arguments) pro-
duced by delay, so we can implement force as a proce-
dure:

    :::scheme
    (define (force delayed-object) (delayed-object))

# Dotted-tail Notation

- Used for functions with arbitrary number of arguments

Example:

    :::scheme
    (define (x a b . c) ...)
    (x 1 2 3 4 5) ;; in the body of x: a=1, b=2, c='(3 4 5)
