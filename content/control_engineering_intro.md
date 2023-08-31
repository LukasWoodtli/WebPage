---
title: Control Engineering Introduction
category: Mechanics
tags: [Robotics]
---

# Ordinary Differential Equation

$$
a_p\theta_e^{(p)} + a_{p-1}\theta_e^{(p-1)} + \cdots + a_2\ddot{\theta_e}+ a_1\dot{\theta_e} + a_0\theta_e = c
$$

For homogeneous ($c = 0$) linear error dynamics:

$$
\begin{align*}
\theta_e^{(p)} &= - \frac{1}{a_p} (a_{p-1}\theta_e^{(p-1)} + \cdots + a_2\ddot{\theta_e}+ a_1\dot{\theta_e} + a_0\theta_e) \\
 &= -a'_{p-1}\theta_e^{(p-1)} - \cdots - a'_2\ddot{\theta_e}- a' _1\dot{\theta_e} - a'_0\theta_e
\end{align*}
$$

Using $p$ coupled first order ODE's defining $x = (x_1, \dots , x_p)$ where:

$$
\begin{align*}
x_1 &= \theta_e \\
x_2 &= \dot{x}_1 = \dot{\theta_e} \\
\vdots & \qquad \vdots \\
x_p &= \dot{x}_{p-1} = \theta_e^{(p-1)}
\end{align*}
$$

The ODE can be written as:

$$
\dot{x}_p = - a'_0 x_1 - a'_1 x_2 - \cdots - a'_{p-1} x_p
$$

Then $\dot{x}(t) = A\;x(t)$ where:

$$
A= \begin{bmatrix}
 0 & 1 & 0 & \cdots & 0 & 0 \\
 0 & 0 & 1 & \cdots & 0 & 0 \\
 \vdots & \vdots & \vdots & \ddots  & \vdots & \vdots \\
 0 & 0 & 0 & \cdots & 1 & 0 \\
 0 & 0 & 0 & \cdots & 0 & 1 \\
 -a'_0 &  -a'_1 & -a'_2 & \cdots & -a'_{p-2} & -a'_{p-1}
\end{bmatrix} \in \mathbb{R}^{p\times p}
$$

The vector differential equation $\dot{x}(t) = A\;x(t)$ has the solution: $x(t) = e^{At}\;x(0)$


## Stability

$\dot{x}(t) = A\;x(t)$ converges to $x = 0$ if:

$A$ is negative definite. i.e. all eigenvalues of $A$ (which can be complex) have negative real components.

### Eigenvalues

The eigenvalues of $A$ are given by the roots of the characteristic polynomial. i.e. complex values $s$ satisfying:

$$det(sI - A) = s^p + a'_{p-1}s^{p-1}+ \cdots +a'_ss^2+a'_1s + a'_0 = 0$$

Necessary condition for each root to have a negative real component: all coefficients $a'_0, \cdots, a'_{p-1}$ must be positive.

### Stability

Error dynamics are:

- *stable*: if each root has negative real component
- *unstable*: if any root has positive real component

# First-Order Error Dynamics

$$
\dot{\theta}_e(t) + \frac{k}{b}\theta_e(t) = 0
$$

or

$$
\dot{\theta}_e(t) + \frac{1}{\tau}\theta_e(t) = 0
$$

where:

- $\tau = b/k$: time constant

solution:

$$
\theta_e(t) = e^{-t / \tau}\theta_e(0)
$$

# Second-Order Error Dynamics

$$
\ddot{\theta}_e(t) + \frac{b}{m}\dot{\theta}_e(t) + \frac{k}{m}\theta_e(t) = 0
$$

## Standard Second-Order Form

$$
\ddot{\theta}_e(t) + 2\zeta\omega_n\dot{\theta}_e(t) + \omega^2_n\theta_e(t) = 0
$$

with:

- $\omega_n$: natural frequency
- $\zeta$: damping ratio


For mass-spring-damper analogy:

- $\omega_n = \sqrt{k/m}$
- $\zeta = b/(2\sqrt{k\,m})$

Characteristic polynomial:

$$
s^2 + 2 \zeta \omega_n s + \omega_n^2 = 0
$$


Roots:

$$
s_{1,2} = -\zeta\omega_n \pm\omega_n\sqrt{\zeta^2-1}
$$

Stable if and only if $\zeta\omega_n >0$ and $\omega_n^2 >0$.

### Damping

The system behaves different depending on the roots $s_{1,2}$

#### Overdamped

- $\zeta > 1$
- Roots $s_{1,2}$ are real and distinct ($s_1 \neq s_2$)
- Solution to ODE: $\theta_e(t) = c_1\,e^{s_1t} + c_2\,e^{s_2t}$
  - $c_1$ and $c_2$ can be calculated from initial condition

#### Critically Damped

- $\zeta = 1$
- Roots $s_{1,2} = -\omega_n$ are real and equal
- Solution to ODE: $\theta_e(t) = ( c_1 + c_2\,t) e^{-\omega_n t}$


#### Underdamped

- $\zeta < 1$
- Roots $s_{1,2}$ are complex conjugates
  - $s_{1,2} = -\zeta\omega_n \pm j\,\omega_d$ 
  - where $\omega_d = \omega_n \sqrt{1-\zeta^2}$: damped natural frequency
- Solution to ODE: $\theta_e(t) = (c_1\cos{\omega_d t} + c_2\sin{\omega_d t}) e^{-\zeta\omega_n t}$

# Controller

## P Controller

Simplest feedback controller:

$$
\dot{\theta}(t) = K_p(\theta_d(t) - \theta(t)) = K_p\theta_e(t)
$$

with:

- actual position: $\theta(t)$
- desired position: $\theta_d(t)$
- error: $\theta_e(t) = \theta_d(t) - \theta(t)$

### Error Dynamics

With constant desired (reference) velocity: $\dot{\theta}_d(t) = c$:

$$
\dot{\theta}_e(t) = \dot{\theta}_d(t) - \dot{\theta}(t) = c - K_p\theta_e(t)
$$

Solution to first-order homogeneous linear ODE:

$$
\theta_e(t) = \frac{c}{K}+ \left(\theta_e(0) - \frac{c}{K_p} \right)e^{-K_pt}
$$

This converges to $c/K_p$ as time goes to infinity.

## PI Controllers

$$
\dot{\theta}(t) = K_p\theta_e(t) + K_i \int_{0}^{t}\theta_e(t)\; d t
$$

### Error Dynamics

With constant desired velocity: $\dot{\theta}_d(t) = c$

$$
\dot{\theta}_e(t) + K_p\theta_e(t) + K_i \int_{0}^{t}\theta_e(t)\; d t = c
$$


Taking derivative:

$$
\ddot{\theta}_e(t) + K_p\dot{\theta}_e(t) + K_i \theta_e(t) = 0
$$

Stable if $K_i > 0$ and $K_p > 0$.

The roots of the characteristic equation:

$$
s_{1,2} = - \frac{K_p}{2}\pm \sqrt{\frac{K_p^2}{4}- K_i}
$$


## Feedforward Plus Feedback PI Controller

Add a term with the desired velocity $\dot{\theta}_d(t)$:

$$
\dot{\theta}(t) = \dot{\theta}_d(t) + K_p\theta_e(t) + K_i \int_{0}^{t}\theta_e(t)\; d t
$$

# Multi-joint Robot

Same as for scalars but with vectors and matrices:


- actual position: $\theta(t) \in \mathbb{R}^n$
- desired (reference) position: $\theta_d(t) \in \mathbb{R}^n$
- P gain: $K_p = k_p\,I\in \mathbb{R}^{n \times n}$
- I gain: $K_i = k_i\,I\in \mathbb{R}^{n \times n}$

with:

- $k_p \in \mathbb{R}^{+}$ and $k_i \in \mathbb{R}^{+}$
- $I$: Identity matrix
