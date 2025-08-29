---
title: Quaternions
category: Mathematics
tags: [Robotics]
---

Quaternions are an extension to the real numbers. They have some similarities with [Complex Numbers](/blog/complex_numbers).
The Quaternions are denoted with the symbol $ \mathbb {H}$.
# Basic Form

$$
x_0 + x_1 i + x_2 j + x_3 k
$$

where $1$, $i$, $j$ and $k$ are the basis vectors (or basis elements).

## Vector Representation

$$
q = (s, v) = s \langle v_1, v_2, v_3 \rangle
$$

where:

- $s = x_0$
- $v = (v_1, v_2, v_3) = (x_1, x_2, x_3)$



## Matrix Representation

### Complex Matrices

$$
\begin{align*}
1 &= \begin{bmatrix}
1 & 0 \\
0 & 1 \\
\end{bmatrix} \\
I &= \begin{bmatrix}
i & 0 \\
0 & -i \\
\end{bmatrix} \\
J &= \begin{bmatrix}
0 & 1 \\
-1 & 0 \\
\end{bmatrix} \\
K &= \begin{bmatrix}
0 & i \\
i & 0 \\
\end{bmatrix}
\end{align*}
$$

#### As Complex $2 \times 2$ Matrix

Quaternion $x_0 + x_1 i + x_2 j + x_3 k$ as complex $\mathbb{C}^{2 \times 2}$ matrix:

$$
\begin{bmatrix}
x_0 + x_1 i & x_2 + x_3 i \\
-x_2 + x_3 i & x_0 - x_1 i
\end{bmatrix}
$$

#### As Real $4 \times 4$ Matrix

Quaternion $x_0 + x_1 i + x_2 j + x_3 k$ as real $\mathbb{R}^{4 \times 4}$ matrix:

$$
\begin{bmatrix}
x_0 & -x_1 & x_3 & -x_2 \\
x_1 & x_0 & -x_2 & -x_3 \\
-x_3 & x_2 & x_0 & -x_1 \\
x_2 & x_3 & x_1 & x_0
\end{bmatrix}
$$


## Addition

$$
x+y = (x_{0}+y_{0})+(x_{1}+y_{1})\mathrm {i} +(x_{2}+y_{2})\mathrm {j} +(x_{3}+y_{3})\mathrm {k}
$$

Addition is associative and commutative.

## Multiplication

### Basis Elements

$$
\begin{align*}
 \mathrm {i} ^{2}=\mathrm {j} ^{2}=\mathrm {k} ^{2}=-1 \\
 \mathrm {i} \mathrm {j} =+\mathrm {k} ,\quad \mathrm {j} \mathrm {k} =+\mathrm {i} ,\quad \mathrm {k} \mathrm {i} =+\mathrm {j} \\
 \mathrm {j} \mathrm {i} =-\mathrm {k} ,\quad \mathrm {k} \mathrm {j} =-\mathrm {i} ,\quad \mathrm {i} \mathrm {k} =-\mathrm {j} \\
 \mathrm {i} \mathrm {j} \mathrm {k} =-1
\end{align*}
$$

### Quaternion Multiplication (Hamilton Product)

$$
q_1 \circ q_2 = s_1s_2 - v_1 \cdot v_2 \langle s_1 v_2 + s_2 v_1 + v_1 \times v_2 \rangle
$$

Multiplication is associative but *not* commutative ($xy \neq yx$).

### Inner Product

$$
q_1 \cdot q_2 = s_1 s_2 + v_{x1} v_{x2} + v_{y1} v_{y2} + v_{z1} v_{z2} \in \mathbb{H}
$$

## Conjugation

$$
 {\bar {x}} =x_{0}-x_{1}\mathrm {i} -x_{2}\mathrm {j} -x_{3}\mathrm {k} 
$$

## Norm

$$
\lVert q\rVert ={\sqrt {q\bar{q}}}={\sqrt {\bar{q}q}}={\sqrt {a^{2}+b^{2}+c^{2}+d^{2}}}
$$

## Unit Quaternion

A unit Quaternion has the length (norm) of $1$. It's also called versor.

$$
U_q = \frac{q}{\lVert q\rVert} = 1
$$

## Rotation

Unit quaternions can be used to represent rotations of an angle $\Theta$ around a unit vector $\hat{v}$.

$$
U_q = \cos \frac{\Theta}{2} \langle \hat{v} \sin \frac{\Theta}{2} \rangle \in S^3
$$

Note: $U_q$ amd $-U_q$ represent the same rotation.

### Rotation Matrix

$$
q = \begin{pmatrix}q_0\\q_1\\q_2\\q_3\end{pmatrix} = \begin{pmatrix} \cos \frac{\theta}{2} \\ \hat{\omega} \sin \frac{\theta}{2}\end{pmatrix} \in {\mathbb{R}}^4
$$

with:

- $\lVert q\rVert = 1$: Unit Quaternion (therefore only 3 degrees of freedom)

Note:

- $q_0$ corresponds to $\cos \frac{\theta}{2}$
- $\begin{pmatrix}q_1\\q_2\\q_3\end{pmatrix}$ corresponds to $\hat{\omega} \sin \frac{\theta}{2}$

#### From Rotation Matrix to Quaternion

Given the rotation matrix:

$$
R = \begin{pmatrix}r_{11} & r_{12} & r_{13}\\r_{21} & r_{22} & r_{23} \\r_{31} & r_{32} & r_{33}\end{pmatrix}
$$

Calculate the Quaternion:

$$
q_{0} = \cos \frac{\theta}{2} = \frac{1}{2} \sqrt {1+r_{11}+r_{22}+r_{33}}
$$

and

$$
\begin{pmatrix}q_1\\q_2\\q_3\end{pmatrix} = \hat{\omega} \sin \frac{\theta}{2} = \frac{1}{4 q_0} \begin{pmatrix}r_{32}-r_{23}\\r_{13}-r_{31}\\r_{21}-r_{12}\end{pmatrix}
$$

#### From Quaternion to Rotation Matrix

$$
R = \begin{pmatrix}{q_{0}}^2 + {q_{1}}^2 - {q_{2}}^2 - {q_{3}}^2 & 2(q_{1}q_{2}-q_{0}q_{3}) & 2(q_{0}q_{2}+q_{1}q_{3})\\2(q_{0}q_{3}+q_{1}q_{2}) & {q_{0}}^2 - {q_{1}}^2 + {q_{2}}^2 - {q_{3}}^2 & 2(q_{2}q_{3}-q_{0}q_{1})\\2(q_{1}q_{3}-q_{0}q_{2}) & 2(q_{0}q_{1}+q_{2}q_{3}) & {q_{0}}^2 - {q_{1}}^2 - {q_{2}}^2 + {q_{3}}^2\end{pmatrix}
$$
