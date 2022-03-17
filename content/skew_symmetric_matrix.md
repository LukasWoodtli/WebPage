---
title: Skew-symmetric matrix
category: Mathematics
tags: [Robotics]
---

A skew-symmetric matrix has the property:

$$A^{T}=-A$$

or expressed differently:

$$a_{{ij}}=-a_{{ji}}\qquad \forall i,j\in \{1,\ldots ,n\}$$

It can be formed from a vector $v = \left ( a_1 a_2 a_3 \right )$ as

$${\displaystyle [a]={\begin{pmatrix}0&-a_{3}&a_{2}\\a_{3}&0&-a_{1}\\-a_{2}&a_{1}&0\end{pmatrix}}}$$

For real valued skew-symmetric matrices $A\in \mathbb {R}^{n\times n}$ the
diagonal values are $0$ and the eigenvalues are pure imaginary or $0$.

# $so(3)$

$so(3)$ is the set of all $3\times 3$ skew-symmetric matrices.

# Angular Velocity

$[\omega]$ is the matrix representation of an angular velocity $\omega \in {\mathbb  {R}}^{3}$ and is an element of $so(3)$.

# Cross product

For the special case $n = 3$ the skew-symmetric matrices can be used to express a
vector cross product as a matrix multiplication.

The cross product of two vectors $a\in {\mathbb  {R}}^{3}$ and
$b\in {\mathbb  {R}}^{3}$  can be expressed as:

$$a\times b=[a] \cdot b$$

This allows to differentiate formula with a cross product:

$${\frac  {\partial }{\partial b}}(a\times b)={\frac  {\partial }{\partial b}}([a] b)=[a]$$

# Relation to Rotation Matrices

$$[\omega_s] = \dot{R}_{sb}R^{-1}_{sb}$$

$$[\omega_b] = R^{-1}_{sb}\dot{R}_{sb}$$

Where $[\omega_c] \in so(3)$ and $[\omega_b] \in so(3)$ are the angular velocities represented in the the reference frame $\{s\}$ and the body frame $\{b\}$, respectively, as skew-symmetric matrices.

Note:

$R$ and $\dot{R}$ individually depend on both $\{s\}$ and $\{b\}$.

But:

- $\dot{R}R^{-1}$ is independent of $\{b\}$
- $R^{-1}\dot{R}$ is independent of $\{s\}$

