---
title: Complexity
date: 2017-01-08
category: Programming
---

> This page is work in progress

*"Halving the size of the problem at each step is the distinguishing characteristic of logarithmic growth"*

[SICP: 2.3.3 Example: Representing Sets](http://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book-Z-H-16.html#%_sec_2.3.3)

Main complexity names:

| Running time  | Name         |
|---------------|--------------|
| `O(1)`        | constant     |
| `O(n)`        | linear       |
| `O(log(n))`   | logarithmic  |
| `O(n*log(n))` | linearithmic |
| `O(n^2)`      | quadratic    |
| `O(2^n)`      | exponential  |

Algorithm with *exponential* run time are considered as *not feasible*.

*Amortized* time means that there is no guarantee that the algorithm is run every time with that complexy but that an
average value of the run time is taken.
