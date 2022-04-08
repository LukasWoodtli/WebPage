---
title: Eigenvectors and Eigenvalues
category: Mathematics
---
An eigenvector of a linear transformation is a vector (non-zero) that, when the linear transformation is applied to it, changes by only a scalar factor. This scalar factor is called eigenvalue.

$$
A \cdot \overrightarrow{v} = \lambda \cdot \overrightarrow{v}
$$

Where:

- $A$: Transformation Matrix
- $ \overrightarrow{v}$: Eigenvector
- $\lambda$: Eigenvalue


To calculate the Eigenvectors we need to find the Eigenvalues first.

# Finding the Eigenvalues

From

$$
A \cdot \overrightarrow{v} = \lambda \cdot \overrightarrow{v} \rightarrow A \cdot \overrightarrow{v}
= \lambda \cdot I \cdot \overrightarrow{v}
$$

follows

$$
(A - \lambda I) \cdot \overrightarrow{v} = 0
$$

which is only solvable if $det(A - \lambda I) = 0$ (characteristic equation).

This means $(A - \lambda  I)$ not invertible.

The solution of the characteristic equation ($det(A - \lambda I) = 0$) are the eigenvalues.

# Eigenvectors

There is one independent Eigenvector for each Eigenvalue.

For each Eigenvalue solve

$$
(A - \lambda I) \cdot \overrightarrow{v} = 0
$$

to get the corresponding Eigenvector $\overrightarrow{v}$ for a given Eigenvalue $\lambda$.
