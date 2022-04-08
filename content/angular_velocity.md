---
title: Angular Velocity
category: Mathematics
tags: [Robotics]
---
Rotation of a body in space can be represented with a unit rotation vector
(axis) and an angle of rotation around this axis.

The angular velocity $w$ can be defined as:

$$w = \hat{w} \dot{\theta}$$

Where:

- $\hat{w}$: Rotation axis (unit vector), coordinate frame free
- $\dot{\theta}$: Rate of rotation

# Matrix Representation in a Coordinate Frame

To represent the angular velocity $w$ in coordinates a reference
frame needs to be chosen. For example the stationary frame $\{s\}$.


## Angular Velocity

$\omega_s \in \mathbb{R}^3$ is the angular velocity $w$ expressed in
fixed frame $\{s\}$ coordinates.

$$\dot{r}_x = \omega_s \times r_{\hat{x}}$$
$$\dot{r}_y = \omega_s \times r_{\hat{y}}$$
$$\dot{r}_z = \omega_s \times r_{\hat{z}}$$


Where:

- $r_i$: unit axes $\hat{x}$, $\hat{y}$ and $\hat{z}$ in fixed frame coordinates (the columns of the rotation matrix representing the fixed frame)
- $\dot{r_i}$: rate of change (angular velocity) of axis $i$ around the rotation axis


These equations can be combined:

$$
\dot{R}_{sb} = \begin{bmatrix}
\omega_s \times r_1 & \omega_s \times r_2 &  \omega_s \times r_3
\end{bmatrix} = \omega_s \times R_{sb}
$$


Where:

- $R_{sb}$: the rotation matrix that describes the orientation of frame $\{b\}$ with respect to the fixed frame $\{s\}$
- $\dot{R}_{sb}$: its rate of change

This can be simplified to:

$$
\dot{R}_{sb} = [\omega_s]R_{sb}
$$

where:

$[\omega_s]$ is a $3 \times 3$ [skew-symmetric matrix]({filename}/skew_symmetric_matrix.md) representation of  the angular velocity $\omega_s \in \mathbb{R}^3$ represented in the coordinate frame $\{s\}$.


## General Relations


$$[\omega_s] = \dot{R}_{sb}R_{sb}^{-1} = \dot{R}_{sb}R_{sb}^T$$

and

$$[\omega_b] = R_{sb}^{-1}\dot{R}_{sb}= R_{sb}^T\dot{R}_{sb}$$

Where

- $[\omega_s] \in so(3)$: fixed frame $\{s\}$ representation of the angular velocity $w$ in skew-symmetric matrix representation
- $[\omega_b] \in so(3)$: body frame $\{b\}$  representation of the angular velocity $w$ in skew-symmetric matrix representation 

# Conversion between Frames

An angular velocity $\omega$ expressed in an arbitrary frame $\{d\}$
can be represented in another frame $\{c\}$ using the 
subscript cancellation rule:

$$\omega_c = R_{cd}\omega_d$$

$$\omega_d = R_{dc}\omega_c = R^{-1}_{cd}\omega_c = R^T_{cd}\omega_c$$

# Literature

Notes taken from:

[Modern Robotics: Mechanics, Planning, and Control](http://hades.mech.northwestern.edu/index.php/Modern_Robotics) by Kevin M. Lynch and Frank C. Park, Cambridge University Press, 2017
