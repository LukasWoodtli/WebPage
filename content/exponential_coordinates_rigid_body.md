Title: Exponential Coordinate Representation of Rigid-Body Motions 
Category: Mathematics
Tags: Robotics


Every displacement of a rigid body can be expressed as a displacement along a fixed screw axis $S$ (*Chasles-Mozzi theorem*).

Exponential coordinates of a homogeneous transformation $T$:

$$S\theta \in \mathbb{R}^6$$

With:

- $S$: Screw axis
- $\theta$: distance to travel along screw axis to take a frame form $I$ to $T$

# Matrix Exponential of Rigid-Body Motions


With $S = (\omega, v)$ as screw axis:

- if $\left\| \omega \right\| = 1$ then for any distance $\theta \in \mathbb{R}$ moved along $S$:

$$e^{[S]\theta} =
\begin{bmatrix}
e^{[\omega]\theta} &
I\theta + (1 - \cos \theta) [\omega] + (\theta - \sin \theta) [\omega]^2 v \\
0 & 1
\end{bmatrix}$$

- if $\omega = 0$ and $\left\| v \right\| = 1$ then:

$$e^{[S]\theta} =
\begin{bmatrix}
    I & v\theta \\
    0 & 1
\end{bmatrix}$$


Exp: $[S]\theta \in se(3) \rightarrow T \in SE(3)$

> Matrix exponential is like integration


# Matrix Logarithm of Rigid-Body Motions


Given: $T = (R, p) \in SE(3)$

Find:

- $\theta \in [0, \pi]$
- $S = (\omega, v) \in \mathbb{R}^6$
  - at least one of $\left\| \omega \right\|$ or $\left\| v \right\|$ is unity
  
Such that:

$$e^{[S]\theta} = T$$

- $S\theta \in \mathbb{R}^6$: vector comprising exponential coordinates of $T$
- $[S]\theta \in se(3)$: matrix representing logarithm of $T$

Algorithm:

1. if $R=I$ then $\omega=0$, $v = p / \left\| p \right\|$ and $\theta = \left\| p \right\|$
2. otherwise:
     - calculate $\omega = \hat{\omega}$ and $\theta$ for $R$ (see [matrix log on SO(3)]({filename}/content/rodrigues_formula.md))
     - then: $v$ is calculated as $$v = G^{-1}(\theta)p$$
     - with: $$G^{-1}(\theta) = \frac{1}{\theta}I - \frac{1}{2}[\omega] + \left( \frac{1}{\theta} - \frac{1}{2} \cot \frac{\theta}{2} \right) [\omega]^2$$

Log: $T \in SE(3) \rightarrow [S]\theta \in se(3)$

> Matrix log is like differentiation
