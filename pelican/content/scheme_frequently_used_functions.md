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

## Dotted-tail Notation

- Used for functions with arbitrary number of arguments

Example:

    :::scheme
    (define (x a b . c) ...)
    (x 1 2 3 4 5) ;; in the body of x: a=1, b=2, c='(3 4 5)


