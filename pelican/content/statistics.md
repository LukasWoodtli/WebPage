Title: Introduction to Statistics
Date: 2015-05-22
Modified: 2015-06-01
Category: Mathematics
Tags: Statistics
Status: draft

> This article is still work in progress!

The notes on this page are from the Udacity course
[Intro to Statistics](https://www.udacity.com/course/intro-to-statistics--st101 "Udacity").

Statistics and Probability
==========================

![Statistics and Probability](/images/statistics_probability.svg)


Independent Events
==================

- Probability of Event: $P$
- Probability of opposite Event: $1-P$
- Probability of composit Events: $P \cdot P \cdot ... \cdot P$


Dependent Events
================

$P(A\mid B)$: Probability of Event $A$ when $B$ already occured.


Bayes' Rule
===========

See also [Wikipedia](http://en.wikipedia.org/wiki/Bayes%27_theorem "Bayes' theorem")


$$P(A\mid B) \; = \; \frac {P(B\mid A) \cdot P(A)} {P(B)}$$


> Prior Probability  & Test Evidence -> Posterior Probability

Prior: $P(A)$

Posterior: $$P(A \mid B) = P(A) \cdot P(B \mid A)\\
    P(\lnot A\mid B) = P(\lnot A) \cdot P(B \mid \lnot A)$$ 


* $P(A)$: the prior, is the initial degree of belief in $A$.
* $P(A \mid B)$: the posterior, is the degree of belief having accounted for $B$.
* the quotient $\frac{P(B \mid A)}{P(B)}$ represents the support $B$ provides for $A$.


Algorithm
---------

Imagine there is a disease. The posibility to get this particular desease is $P(D)$.

There is a test to check if someone has that disease. But the test is not completely reliable.

Prior: $P(D)$
Sensitivity: $P(Pos \mid D)$
Specitivity: $P(Neg \mid \lnot D)$

The **Prior** says how many people have the disease.

The **Sensitivity** says how many get a **positive** test if they **have the desease**.

The **Selicivity** says how many get a **negative** test if they **don't have the desease**.


Imagine someone get's a **positive** test result. How can we calculate the probability that this person has the desease?

![Algorithm to calculate Bayes' rule](/images/bayes_algorithm.svg)

1. Take the **Prior** and multiplicate it with $P(Pos \mid D)$ (Sensitivity) &rarr; $P(Pos, D)$.
2. Take the **Prior** and multiplicate it with $P(Pos \mid \lnot D)$ &rarr; $P(Pos, \lnot D)$.
3. Add the results of 1. and 2. up &rarr; $P(Pos)$.
4. Divide the result from 1. $P(Pos, D)$ by the result of 3. $P(Pos)$ &rarr; $P(D \mid Pos)$.
5. Divide the result from 2. $P(Pos, \lnot D)$ by the result of 3. $P(Pos)$ &rarr; $P(\lnot D \mid Pos)$.
6. Check: add the results of 4. and 5. &rarr; $1$.

The calculation for a **negative** test result are analogous. Just replace $Pos$ with $Neg$.

Probablity Distributions
========================

> In **Continous Distributions** every outcome has the **Probability** $0$.

Density
-------

PDF: Probability Density Function

Probability for continous spaces. Density can be bigger than $1$.

Density:

- Always non-negative
- Doesn't need to be continous
- Doesn't need to be smaller or equal than one
- Integrates to one
