---
title: Introduction to Statistics
category: Mathematics
tags: [Statistics]
---
> This article is still work in progress!

The notes on this page are taken from:

Udacity: [Intro to Statistics](https://www.udacity.com/course/intro-to-statistics--st101).

Packt: [Statistics for Data Science and Business Analysis](https://www.packtpub.com/product/statistics-for-data-science-and-business-analysis-video/9781789803259)
.

# Population and Sample

## Population

- all items of interest
- properties of interest: *parameters*
- mathematical symbol: $N$

## Sample

- a subset of the population
- properties of interest: *statistics*
- mathematical symbol: $n$

A sample needs to be random and representative for the population.

# Data

## Types of Data

- Categorical
- Numerical
  - Discrete
  - Continuous

## Measurement Levels

- Qualitative
  - Nominal
  - Ordinal
- Quantitative
  - Interval
  - Ratio

# Statistics and Probability

![Statistics and Probability](images/statistics_probability.svg)

## Independent Events

- Probability of Event: $P$
- Probability of opposite Event: $1-P$
- Probability of composite Events: $P \cdot P \cdot ... \cdot P$

## Dependent Events

$P(A\mid B)$: Probability of Event $A$ when $B$ already occurred.

# Probability Distributions

> In **Continuous Distributions** every outcome has the **Probability** $0$.

## Density

PDF: Probability Density Function

Probability for continuous spaces. Density can be bigger than $1$.

Density:

- Always non-negative
- Doesn't need to be continuous
- Doesn't need to be smaller or equal than one
- Integrates to one

# Estimation

Estimation problem is:

Data &rarr; P

P &rarr; P(Data)

## Maximum Likelihood Estimator (MLE):

$$
\frac{1}{N} \cdot \sum_{i}^{} X_i
$$

The sum is always between $0$ and $1$.

## Laplace Estimator:

$$
\frac{1}{N + k} \cdot \left(1 + \sum_{i}^{} X_i \right)
$$

$k$: Number of Outcomes

$N$: Number of Experiments

# Averages

## Mean

Sum up all elements and divide by the number of elements.

### Population

${\displaystyle {\mu}={\frac {1}{n}}\sum_{i=1}^{n}{x_{i}}}$

### Sample

${\displaystyle {\bar {x}}={\frac {1}{n}}\sum_{i=1}^{n}{x_{i}}}$

## Median

Sort all elements and take the one in the middle (or the mean of the two elements in the middle).

- if $n$ is odd: ${\displaystyle \mathrm {median} (x)=x_{(n+1)/2}}$
- if $n$ is even: ${\displaystyle \mathrm {median} (x)={\frac {x_{(n/2)}+x_{(n/2)+1}}{2}}}$

## Mode

The value of the elements that appears most often in a data set.

# Asymmetry

## Skewness

- Positive skew: $mean > median$
- Zero skew: $mean = median = mode$
- Negative skew: $mean < median$


## Sample Skewness

$$
{\displaystyle g_{m}={\frac {{\tfrac {1}{n}}\sum_{i=1}^{n}(x_{i}-{\overline {x}})^{3}}{{\sqrt {{\tfrac {1}{n-1}}\sum_{i=1}^{n}(x_{i}-{\overline {x}})^{2}}}^{3}}}}
$$

# Variability

## Variance

The variance measures the dispersion of data points around their mean.

Subtract the *mean* from every item. Then sum up the *squares* of the subtractions
and divide the result by the number of data items.

### Population

$$
\sigma^2 = {\displaystyle \operatorname {Var} (X)={\frac {1}{n}}\sum _{i=1}^{n}(x_{i}-\mu )^{2}}
$$

### Sample

$$
{\displaystyle S^{2}={\frac {1}{n-1}}\sum _{i=1}^{n}\left(x_{i}-{\overline {x}}\right)^{2}}
$$

## Standard Deviation

The standard deviation is giving a sense how far away the items in a data set are from the mean.

It is the square root of its variance.

It's the most common measure of variability for a *single* data set.

### Population

$$
\sigma = \sqrt{\sigma^2}
$$

### Sample

$$
S = \sqrt{S^2}
$$

## Coefficient of Variation

It is used to compare *multiple* data sets.

### Population

$$
c_{v} = \frac{\sigma}{\mu}
$$

### Sample

$$
\hat{c_{v}} = \frac{S}{\overline {x}}
$$

# Overview of Mean, Variance and Standard Deviation

These notes are taken
from [Khan Academy](https://www.khanacademy.org/math/probability/descriptive-statistics/variance_std_deviation/v/statistics-standard-deviation)

| Concept  | Population                                            | Samples                                                |
|----------|-------------------------------------------------------|--------------------------------------------------------|
| Mean     | $\mu = \frac{1}{N}\sum_{i=1}^{N} x_i$                 | $\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i$              |
| Variance | $\sigma^2 = \frac{1}{N} \sum_{i=1}^{N} (x_i - \mu)^2$ | $s^2 = \frac{1}{n-1} \sum_{i=1}^{N} (x_i - \bar{x})^2$ |
| Standard Deviation | $\sigma = \sqrt{\sigma^2}$                  | $s = \sqrt{s^2}$                                       |

$N$: Number of items in Population

$n$: Number of items in sample set taken from the population

> For an unbiased estimator (Variance of samples) the sum is divided by $n-1$!

$s = \sqrt{s^2}$: is not an unbiased estimator due to the non-linear nature of the square root.

# Relationship between Variables

Correlation: variables are statically related.

## Covariance

Main statistic to measure correlation.

Population:

$$
\sigma_{xy} =\operatorname {cov}(x, y) = {\frac {1}{N}}\sum_{i=1}^{N}(x_{i}-\mu_x ) \cdot (y_{i}-\mu_y )
$$

Sample:

$$
S_{xy} =\operatorname {cov}(x, y) = {\frac {1}{n -1}}\sum_{i=1}^{n}(x_{i}-\overline x ) \cdot (y{i}- \overline y )
$$

## Correlation Coefficient

Adjust covariance to be easy to interpret.

$\operatorname {corr}(xy)={\frac {\operatorname {cov} (x,y)}{\operatorname{stdev}(x) \cdot \operatorname{stdev}(y)}}$

The correlation coefficient is between $-1$ and $1$.


Population:

$$
\rho_{xy} =\frac{\sigma_{xy}}{\sigma_{x} \cdot \sigma_{y}}
$$

Sample:

$$
r_{xy} =\frac{S_{xy}}{S_{x} \cdot S_{y}}
$$

## Binomial Coefficients

Choose $k$ elements from $n$ possible elements (without putting
back elements and without caring about the order of the chosen
elements):

$$
\binom{n}{k} = \frac{n!}{k! \cdot (n - k)!}
$$

# Inferential Statistics

Use *Probability Theory* and *Distributions* with sample data, to predict population values.

## Distributions

A distribution is a function that shows how often each value of a variable occurs.

### Binomial Distribution

Binomial Distribution is a discrete distribution.

i.e. Flip a loaded coin:

$p = P(heads)$: Probability to get a head from one coin flip.

Flip coin $n$ times.

$P(\#heads = k)$: Expectation to get $k$ heads from all the flips.

$$
P(\#heads = k) = \frac{n!}{k! \cdot (n - k)!} \cdot p^k \cdot (1-p)^{n-k} = \binom{n}{k} \cdot p^k \cdot (1-p)^{n-k}
$$

### The Normal Distribution

Also called *Gaussian Distribution* or Bell Curve.

Notation:

$$
N \sim (\mu, \sigma^2)
$$

Where:


- $N \sim$: Normal Distribution
- $\mu$: Mean
- $\sigma^2$: Variance
- $\sigma$: Standard Deviation

Definition:

$$
f(x) = \frac{1}{\sqrt{2\pi\sigma^2}}\cdot e^{\left(-\frac{1}{2}\cdot\frac{\left(x-\mu\right)^2}{\sigma^2}\right)}
$$

Properties:

- mean $=$ median $=$ mode
- no skew

#### Standard Normal Distribution

Standardizing the Normal distribution to have a mean $\mu = 0$ and standard deviation $\sigma^2 = 1$.

$$
\sim (\mu, \sigma^2) \ \Rightarrow \ \sim (0, 1)
$$

Formula:

$$
z = \frac{x - \mu}{ \sigma }
$$

Where:

- $z \sim N(0, 1)$
- $z$: Standard Normal Distribution ($z$-Score)
- $\mu$: Mean
- $\sigma$: Standard Deviation

## Central Limit Theorem (CLT)

Given a normalized sample mean. That is the mean of a number of samples from a population.
That sample mean converges to a standard normal distribution as the number of samples increase.

1. take a sample from the population
2. calculate the mean of that sample (sample mean)
3. repeat until enough samples were processed

All the sample means together form the *Sampling Distribution* of the mean.

> The *Sampling Distribution* of the mean will approximate a normal distribution no matter of what kind the population distribution is (binomial, exponential, ...).

### Sampling distribution:

The sampling distribution has the same mean as the original (population) distribution. It's variance is the population variance divided by the sampling size:

$$
N(\mu, \frac{\sigma^2}{n})
$$

Where:

- $\mu$: mean of the population distribution
- $\sigma^2$: variance of the population distribution
- $n$: number of samples

Typically, at least around 30 samples are needed for the CLT to apply. 

### Standard Error

The standard deviation of the sampling distribution.

That is standard deviation of the distribution formed by the sampling mean.

It shows the variability of the means of the samples. 

Variance of the sampling distribution: $\frac{\sigma^2}{n}$

Standard error:

$$
\frac{\sigma}{\sqrt{n}}
$$

## Normaliser

The expression $\frac{1}{\sqrt{2\pi\sigma^2}}$ is needed to normalise the area underneath curve given by the rest of
the formula ($e^{\left(-\frac{1}{2}\cdot\frac{\left(x-\mu\right)^2}{\sigma^2}\right)}$). Otherwise it would not add up to $1$.

# Bayes' Rule

See also [Wikipedia](http://en.wikipedia.org/wiki/Bayes%27_theorem "Bayes' theorem")


$$
P(A\mid B) \; = \; \frac {P(B\mid A) \cdot P(A)} {P(B)}
$$


> Prior Probability  & Test Evidence -> Posterior Probability

Prior:

$$
P(A)
$$

Posterior:

$$
P(A \mid B) = P(A) \cdot P(B \mid A)\\
P(\lnot A\mid B) = P(\lnot A) \cdot P(B \mid \lnot A)
$$


* $P(A)$: the prior, is the initial degree of belief in $A$.
* $P(A \mid B)$: the posterior, is the degree of belief having accounted for $B$.
* the quotient $\frac{P(B \mid A)}{P(B)}$ represents the support $B$ provides for $A$.

## Algorithm

Imagine there is a disease. The possibility to get this particular disease is $P(D)$.

There is a test to check if someone has that disease. But the test is not completely reliable.

Prior: $P(D)$
Sensitivity: $P(Pos \mid D)$
Specificity: $P(Neg \mid \lnot D)$

The **Prior** says how many people have the disease.

The **Sensitivity** says how many get a **positive** test if they **have the disease**.

The **Sensitivity** says how many get a **negative** test if they **don't have the disease**.

Imagine someone get's a **positive** test result. How can we calculate the probability that this person has the disease?

![Algorithm to calculate Bayes' rule](images/bayes_algorithm.svg)

1. Take the **Prior** and multiply it with $P(Pos \mid D)$ (Sensitivity) &rarr; $P(Pos, D)$.
2. Take the **Prior** and multiply it with $P(Pos \mid \lnot D)$ &rarr; $P(Pos, \lnot D)$.
3. Add the results of 1. and 2. up &rarr; $P(Pos)$.
4. Divide the result from 1. $P(Pos, D)$ by the result of 3. $P(Pos)$ &rarr; $P(D \mid Pos)$.
5. Divide the result from 2. $P(Pos, \lnot D)$ by the result of 3. $P(Pos)$ &rarr; $P(\lnot D \mid Pos)$.
6. Check: add the results of 4. and 5. &rarr; $1$.

Note: $P(A, B) = P(B, A)$

The calculation for a **negative** test result are analogous. Just replace $Pos$ with $Neg$.
