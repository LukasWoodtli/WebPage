Title: Scheme: Frequently used Functions
Date: 2016-10-14
Category: Programming
Tags: Lisp


# Pairs (`cons`, `car` and `cdr`)

- `(cons a b)`: Construct a pair
- `(car p)`: Get first element of pair (or list)
- `(cdr p)`: Get second element of pair (or rest of list)

# Lists

- `(list a0 a1 a2 ... aN)`: create a list

Equivalent to `(cons (cons a0 (cons a1 (cons a2 (cons ... (cons (cons aN nil))...)))))`

- `nil`: end of list marker (equivalent to the empty list `'()`)
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

*"This more general `map?  takes a procedure of **n** arguments, together with **n** lists, and applies the procedure to all the first elements of the lists, all the second elements of the lists, and so on, returning a list of the results.*

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

## Dotted-tail Notation

- Used for functions with arbitrary number of arguments

Example:

    :::scheme
    (define (x a b . c) ...)
    (x 1 2 3 4 5) ;; in the body of x: a=1, b=2, c='(3 4 5)


