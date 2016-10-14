Title: Scheme: Frequently used Functions
Date: 2016-10-14
Category: Programming
Tags: Lisp


# Pairs (`cons`, `car` and `cdr`)

- `(cons a b)`: Construct a pair
- `(car p)`: Get first element of pair (or list)
- `(cdr p)`: Get second element of pair (or rest of list)

# Lists

- `(list a0 a1 a2 ... an)`: create a list

Equivalent to `(cons (cons a0 (cons a1 (cons a2 (cons ... (cons (cons an nil))...)))))`

- `nil`: end of list marker (equivalent to the empty list `'()`
- `cons` makes a list like the original one, but with an additional item at the beginning

Example:
    :::scheme
    (define a (list 1 2 3))
    (cons 10 a)
    >> (10 1 2 3)