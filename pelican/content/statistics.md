Title: Introduction to Statistics
Date: 2015-05-22
Modified: 2015-06-01
Category: Mathematics
Tags: Statistics

> This article is still work in progress!

The notes on this page are from the Udacity course
[Intro to Statistics](https://www.udacity.com/course/intro-to-statistics--st101 "Udacity").


[TOC]


Statistics and Probability
==========================

![Statistics and Probability](/images/statistics_probability.svg)


Independent Events
==================

- Probability of Event: $P$
- Probability of opposite Event: $1-P$
- Probability of composite Events: $P \cdot P \cdot ... \cdot P$


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

Imagine there is a disease. The possibility to get this particular disease is $P(D)$.

There is a test to check if someone has that disease. But the test is not completely reliable.

Prior: $P(D)$
Sensitivity: $P(Pos \mid D)$
Specificity: $P(Neg \mid \lnot D)$

The **Prior** says how many people have the disease.

The **Sensitivity** says how many get a **positive** test if they **have the disease**.

The **Sensitivity** says how many get a **negative** test if they **don't have the disease**.


Imagine someone get's a **positive** test result. How can we calculate the probability that this person has the disease?

![Algorithm to calculate Bayes' rule](/images/bayes_algorithm.svg)

1. Take the **Prior** and multiplicate it with $P(Pos \mid D)$ (Sensitivity) &rarr; $P(Pos, D)$.
2. Take the **Prior** and multiplicate it with $P(Pos \mid \lnot D)$ &rarr; $P(Pos, \lnot D)$.
3. Add the results of 1. and 2. up &rarr; $P(Pos)$.
4. Divide the result from 1. $P(Pos, D)$ by the result of 3. $P(Pos)$ &rarr; $P(D \mid Pos)$.
5. Divide the result from 2. $P(Pos, \lnot D)$ by the result of 3. $P(Pos)$ &rarr; $P(\lnot D \mid Pos)$.
6. Check: add the results of 4. and 5. &rarr; $1$.

Note: $P(A, B) = P(B, A)$

The calculation for a **negative** test result are analogous. Just replace $Pos$ with $Neg$.

Probability Distributions
=========================

> In **Continuous Distributions** every outcome has the **Probability** $0$.

Density
-------

PDF: Probability Density Function

Probability for continuous spaces. Density can be bigger than $1$.

Density:

- Always non-negative
- Doesn't need to be continuous
- Doesn't need to be smaller or equal than one
- Integrates to one


Estimation
==========

Estimation problem is:

Data &rarr; P

P &rarr; P(Data)

Maximum Likelihood Estimator (MLE):
-----------------------------------

$$\frac{1}{N} \cdot \sum_{i}^{} X_i$$

The sum is always between $0$ and $1$.


Laplace Estimator:
------------------

$$\frac{1}{N + k} \cdot \left(1 + \sum_{i}^{} X_i \right)$$

$k$: Number of Outcomes

$N$: Number of Experiments


Averages
========

Mean
----

$$\mu = \frac{1}{n} \sum_{i=1}^n{x_i}$$

Sum up all elements and divide by the number of elements.

Median
------

Sort all elements and take the one in the middle.

Mode
----

The value of the elements that occur most in the data set.

Variance
========

The variance is a measure how disperse a data set is.

Subtract the *mean* from every item. Then sum up the *squares* of the subtractions
and devide the result by the number of data items.

$$Var(X) = \sigma^2_X = \frac{1}{n} \sum_{i}(x_i - \mu)^2$$

Alternative Formula:

$$\sigma^2_X = \frac{\sum X_i^2}{N} - \frac{\left( \sum X_i  \right)^2}{N^2}$$

Standard Deviation
==================

The standard deviation is giving a sense how far away the items in a data set are from the mean.
$$\sigma_X = \sqrt{Var(X)}$$


Overwiev of Mean, Variance and Standard Deviation
=================================================

This notes are taken from [Khan Academy](https://www.khanacademy.org/math/probability/descriptive-statistics/variance_std_deviation/v/statistics-standard-deviation)

| Concept          | Population                           | Samples                                     |
|------------------|--------------------------------------|---------------------------------------------|
| Mean             | $\mu = \frac{1}{N}\sum_{i=1}^{N} x_i$ |  $\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i$ | 
| Variance         | $\sigma^2 = \frac{1}{N} \sum_{i=1}^{N} (x_i - \mu)^2$ | $s^2 = \frac{1}{n-1} \sum_{i=1}^{N} (x_i - \bar{x})^2 |

Binomial Coefficients
=====================

Choose $k$ elements from $n$ possible elements (without putting
back elements and without caring about the order of the chosen
elements):

$$\binom{n}{k} = \frac{n!}{k! \cdot (n - k)!}$$

Binomial Distribution
=====================

i.e. Flip a loaded coin:

$p = P(heads)$: Probability to get a head from one coin flip.

Flip coin $n$ times.

$P(\#heads = k)$: Expectation to get $k$ heads from all the flips.

$$P(\#heads = k) = \frac{n!}{k! \cdot (n - k)!} \cdot p^k \cdot (1-p)^{n-k} = \binom{n}{k} \cdot p^k \cdot (1-p)^{n-k}$$


The Normal Distribution
=======================

$\mu$: Mean

$\sigma^2$: Variance

$\sigma$: Standard Deviation


$$f(x) = \frac{1}{\sqrt{2\pi\sigma^2}}\cdot e^{\left(-\frac{1}{2}\cdot\frac{\left(x-\mu\right)^2}{\sigma^2}\right)}$$

Normaliser
----------

The expression $\frac{1}{\sqrt{2\pi\sigma^2}}$ is needed to normalise the area underneath curve given by the rest of
the formula ($e^{\left(-\frac{1}{2}\cdot\frac{\left(x-\mu\right)^2}{\sigma^2}\right)}$). Otherwise it would not add up to $1$.
