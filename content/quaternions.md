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

Quaternion $x_0 + x_1 i + x_2 j + x_3 k$ as complex $\mathbb{C}^{2 \times 2}$ matrix:

$$
\begin{bmatrix}
x_0 + x_1 i & x_2 + x_3 i \\
-x_2 + x_3 i & x_0 - x_1 i
\end{bmatrix}
$$

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

### Two Quaternions

$$
\begin{align*}x\;y&=(x_{0}y_{0}-x_{1}y_{1}-x_{2}y_{2}-x_{3}y_{3})&\quad &\\&+(x_{0}y_{1}+x_{1}y_{0}{\;+\;x_{2}y_{3}}{\;-\;x_{3}y_{2}})\mathrm {i} &&\\& +(x_{0}y_{2}{\;-\;x_{1}y_{3}}+x_{2}y_{0}{\;+\;x_{3}y_{1}})\mathrm {j} &&\\& +(x_{0}y_{3}{\;+\;x_{1}y_{2}}{\;-\;x_{2}y_{1}}+x_{3}y_{0})\mathrm {k} &&\end{align*}
$$

Multiplication is associative but *not* commutative ($xy \neq yx$).

## Conjugation

$$
 {\bar {x}} =x_{0}-x_{1}\mathrm {i} -x_{2}\mathrm {j} -x_{3}\mathrm {k} 
$$

## Norm

$$
\lVert q\rVert ={\sqrt {q\bar{q}}}={\sqrt {\bar{q}q}}={\sqrt {a^{2}+b^{2}+c^{2}+d^{2}}}
$$

## Unit Quaternion

A unit Quaternion has the length (norm) of $1$:

$$
U_q = \frac{q}{\lVert q\rVert}
$$
