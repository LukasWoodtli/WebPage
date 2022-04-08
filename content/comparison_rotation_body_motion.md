---
title: Comparison of Rotations and Rigid-Body Motions
category: Mechanics
tags: [Robotics]
---
[TOC]

# Analogies

| Rotations                      | Rigid-Body Motions                                     |
|--------------------------------|--------------------------------------------------------|
| Rotation Matrix $R$            | Homogeneous Tranformation Matrix $T$                   |
| Rotation Axis $\hat\omega$     | Screw Axis $S$                                         |
| Angular Velocity $\omega = \hat\omega \dot\theta$            | Twist $V = S\dot\theta$  |
| Exponential Coordinates $\hat\omega \theta \in \mathbb{R}^3$ | Exponential Coordinates $S\theta \in \mathbb{R}^6$ |


# Rotation Matrix and Homogeneous Translation Matrix

| Rotations                      | Rigid-Body Motions             |
|--------------------------------|--------------------------------|
| $R \in SO(3)$                  | $T \in SE(3)$                  |
| $SO(3)$: $3 \times 3$ matrices | $SE(3)$: $4 \times 4$ matrices |
| $R^TR = 1$ and $\det R =1$ | $$T = \begin{bmatrix}R & p \\ 0 & 1 \end{bmatrix}$$ where $R \in SO(3)$, $p \in \mathbb{R}^3$ |

## Inverse

| Rotations      | Rigid-Body Motions             |
|----------------|--------------------------------|
| $R^{-1} = R^T$ | $$T^{-1}\begin{bmatrix}R^T & -R^Tp \\ 0 & 1 \end{bmatrix}$$ |


## Change of Coordinate Frame

|        | Rotations                           | Rigid-Body Motions                 |
|--------|-------------------------------------|-------------------------------------|
| matrix | $R_{a\not{b}}R_{\not{b}c} = R_{ac}$ | $T_{a\not{b}}T_{\not{b}c} = T_{ac}$ |
| vector | $R_{a\not{b}}p_{\not{b}} = p_{a}$   | $T_{a\not{b}}p_{\not{b}} = p_{a}$   |

## Rotating or Displacing a Frame

| Rotating frame $\{b\}$        | Displacing frame $\{b\}$          |
|-------------------------------|-----------------------------------|
| $R = Rot(\hat\omega, \theta)$ | $$T=\begin{bmatrix} Rot(\hat\omega, \theta) & p \\ 0 & 1 \end{bmatrix}$$ |

### Fixed Frame

- $\hat\omega_s = \hat\omega$: Rotation axis defined in $\{s\}$ coordinates
- $p$: Translation vector defined in $\{s\}$ coordinates

| Rotating frame $\{b\}$    | Displacing frame $\{b\}$ |
|---------------------------|--------------------------|
| $R_{sb'} = RR_{sb}$       | $T_{sb'} = TT_{sb}$      |
| rotate $\theta$ about $\hat\omega_s = \hat\omega$ | rotate $\theta$ about $\hat\omega_s = \hat\omega$ (moves origin of $\{b\}$)|
| | then translate $p$ in $\{s\}$ |



### Body Frame

- $\hat\omega_s = \hat\omega$: Rotation axis defined in $\{s\}$ coordinates
- $p$: Translation vector defined in $\{s\}$ coordinates

| Rotating frame $\{b\}$    | Displacing frame $\{b\}$ |
|---------------------------|--------------------------|
| $R_{sb''} = R_{sb}R$       | $T_{sb''} = T_{sb}T$      |
| rotate $\theta$ about $\hat\omega_b = \hat\omega$ | translate $p$ in $\{b\}$  |
| | then rotate $\theta$ about $\hat\omega$ in new body frame | 


# Velocities

## Axis

| Unit Rotation Axis              | "Unit" Screw Axis              |
|---------------------------------|--------------------------------|
| $\hat{\omega} \in \mathbb{R}^3$ | $$S = (S_\omega, S_v) = \begin{bmatrix} \omega \\ v\end{bmatrix} \in \mathbb{R}^6$$ |
| $\| \hat{\omega} \| = 1$        | either $\|S_\omega\| = 1$      |
|                                 | or $S_\omega = 0, \|S_v\| = 1$ |


Screw axis $\{q, \hat s, h\}$ with finite $h$:

$$S =
\begin{bmatrix}
\omega \\ v  
\end{bmatrix} =
\begin{bmatrix}
\hat s \\
  - \hat s \times q + h \hat s
\end{bmatrix}
$$

## Angular Velocity and Twist

| Rotations (angular velocity)         | Rigid-Body Motions (twist) |
|--------------------------------------|----------------------------|
| $\omega = \hat{\omega} \dot{\theta}$ | $V = S \dot{\theta}$       |

### Matrix Representation of Angular Velocity and Twist

| Rotations (angular velocity)         | Rigid-Body Motions (twist) |
|--------------------------------------|----------------------------|
| for $\omega \in \mathbb{R}^3$ | for $V = \begin{bmatrix} \omega \\ v\end{bmatrix} \in \mathbb{R}^6$ |
| $[\omega] = \begin{bmatrix} 0 & -\omega_3 & \omega_2 \\ \omega_3 & 0 & -\omega_1 \\ -\omega_2 & \omega_1 & 0\end{bmatrix} \in so(3)$ | $[V] = \begin{bmatrix} [\omega] & v \\ 0 & 0 \end{bmatrix} \in se(3)$ |
| $\dot{R}R^{-1} = [\omega_s]$         | $\dot{T}T^{-1} = [V_s]$    |
| $R^{-1}\dot{R} =[\omega_b]$          | $T^{-1}\dot{T} = [V_b]$    |


#### Idenities for Angular Velocities

With $\omega, x \in \mathbb{R}^3$ and $R \in SO(3)$:

- $[\omega] = -[\omega]^T$
- $[\omega]x = -[x]\omega$
- $[\omega][x] = ([x][\omega])^T$
- $R[\omega]R^T = [R\omega]$


## Adjoint Representation of a Homogeneous Translation Matrix

With a Homogeneous Translation Matrix $$T = \begin{bmatrix}R & p \\ 0 & 1 \end{bmatrix}$$ where $R \in SO(3)$, $p \in \mathbb{R}^3$ the *adjoint representation* is:

$$[Ad_T] =
\begin{bmatrix}
R & 0 \\ 
[p]R & R
\end{bmatrix} \in \mathbb{R}^{6\times 6}
$$

### Identities for Adjoint Representation

- $[Ad_T]^{-1} = [Ad_{T^{-1}}]$
- $[Ad_{T_1}][Ad_{T_2}] = [Ad_{T_1T_2}]$

## Change of Coordinate Frame

| Rotations                                             | Rigid-Body Motions                     |
|-------------------------------------------------------|----------------------------------------|
| $\hat{\omega}_a = R_{a\not{b}}\hat{\omega}_{\not{b}}$ | $S_a = [Ad_{T_{a\not{b}}}]S_{\not{b}}$ |
| $\omega_a = R_{a\not{b}} \omega_{\not{b}}$            | $V_a = [Ad_{T_{a\not{b}}}]V_{\not{b}}$ |


# Exponential Coordinates

|     | Rotations               | Rigid-Body Motions                    |
|-----|-------------------------|---------------------------------------|
| exponential coordinates for | $R \in SO(3)$ | $T \in SE(3)$           |  
| are | $\hat\omega\theta \in \mathbb{R}^3$ |$S\theta \in \mathbb{R}^6$ |


## Matrix Representation

| Rotations                        | Rigid-Body Motions                |
|----------------------------------|-----------------------------------|
| $[\hat{\omega}]\theta \in so(3)$ |$[S]\theta \in se(3)$  |


## Exponential and Logarithm

|             | Rotations           | Rigid-Body Motions  |
|-------------|---------------------|---------------------|
| exponential | $so(3) \rightarrow SO(3)$ | $se(3) \rightarrow SE(3)$ |
| logarithm   | $SO(3) \rightarrow so(3)$ | $SE(3) \rightarrow se(3)$ |

### Exponential

| Rotations                                        | Rigid-Body Motions                                  |
|--------------------------------------------------|-----------------------------------------------------|
| $[\hat\omega]\theta \in so(3) \rightarrow R \in SO(3)$ | $[S]\theta \in se(3) \rightarrow T \in SE(3)$ |
| $R = Rot(\hat\omega, \theta) = e^{[\hat{\omega}]\theta} = I + \sin\theta[\hat\omega]+(1 - \cos\theta)[\hat\omega]^2$ | $$T = e^{[S]\theta} = \begin{bmatrix} e^{[\omega]\theta} & (I\theta + (1 - \cos \theta) [\omega] + (\theta - \sin \theta) [\omega]^2) v \\ 0 & 1 \end{bmatrix}$$ |

### Logarithm

| Rotations                                                 | Rigid-Body Motions                            |
|-----------------------------------------------------------|-----------------------------------------------|
| $R \in SO(3) \rightarrow [\hat\omega]\theta \in so(3)$    | $T \in SE(3) \rightarrow [S]\theta \in se(3)$ |
| see [here]({filename}/rodrigues_formula.md) for algorithm | see [here]({filename}/exponential_coordinates_rigid_body.md) for algorithm |


# Change Coordinate frame for Moment and Wrench

- Moment: $m_a = R_{ab}m_b$
- Wrench: $F_a = (m_a, f_a) = [Ad_{T_{ba}}]^TF_b$

# Literature

Notes taken from:

[Modern Robotics: Mechanics, Planning, and Control](http://hades.mech.northwestern.edu/index.php/Modern_Robotics) by Kevin M. Lynch and Frank C. Park, Cambridge University Press, 2017
