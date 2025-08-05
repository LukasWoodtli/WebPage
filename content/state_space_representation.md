---
title: State Space Representation
category: Robotics
tags: [Control Systems, Robotics]
---

## Differential Equation of a Dynamic System

$$ 
a_n \frac{d^n y}{dt^n} + a_{n-1} \frac{d^{n-1} y}{dt^{n-1}} + \dots + a_0 y(t) = b_q \frac{d^q u}{dt^q} + \dots + b_0 u(t)
$$

- **Causality**: 
  - $q \leq n$
  - Only causal systems can be realized
- **Relative Degree**: $p = n - m$


## State-Space Representation


$$
\begin{align}
\dot{x}(t) &= A x(t) + B u(t), \quad x(0) = x_0 \\
y(t) &= C x(t) + D u(t)
\end{align}
$$

### Meaning of the Variables and Matrices

- $x(t) \in \mathbb{R}^n$: State vector (order = number of states = order of the differential equation)
- $u(t) \in \mathbb{R}^m$: Input vector
- $y(t) \in \mathbb{R}^r$: Output vector
- $A \in \mathbb{R}^{n \times n}$: System matrix (describes the dynamics)
- $B \in \mathbb{R}^{n \times m}$: Input matrix (how inputs affect the states)
- $C \in \mathbb{R}^{r \times n}$: Output matrix (how outputs are calculated from states)
- $D \in \mathbb{R}^{r \times m}$: Feedthrough matrix (direct influence of inputs on outputs)

with:

- $m$: number of input signals
- $r$: number of output signals
- $n$: number of states

## State-Space Model from a Differential Equation

**System Matrix $A$:**

$$
A = \begin{bmatrix}
0 & 1 & 0 & \cdots & 0 \\
0 & 0 & 1 & \cdots & 0 \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
0 & 0 & 0 & \cdots & 1 \\
-a_0 & -a_1 & -a_2 & \cdots & -a_{n-1}
\end{bmatrix}
$$

**Input Matrix $B$:**

$$
B = \begin{bmatrix}
0 \\
0 \\
\vdots \\
0 \\
1
\end{bmatrix}
$$

**Output Matrix $C$** (for output equation coefficients $b_0, b_1, \dots, b_q$):

$$
C = \begin{bmatrix}
b_0 - b_n a_0 & b_1 - b_n a_1 & \dots & b_{n-1} - b_n a_{n-1}
\end{bmatrix}
$$

**Feedthrough Matrix $D$:**

$$
D = b_0
$$

**Special case for $q \lt n$**:

$$
C = \begin{bmatrix}
b_0 & b_1  & \dots & b_{q} & 0 & \dots & 0
\end{bmatrix}
$$

$$
D = 0
$$
