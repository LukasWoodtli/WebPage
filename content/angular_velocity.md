Title: Angular Velocity 
Category: Mathematics
Tags: Robotics

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

Let $R_{sb}(t)$ be the rotation matrix that describes the orientation of
frame $\{b\}$  with respect to the fixed frame $\{s\}$.
$\dot{R}_{sb}(t)$ it its rate of change.

The columns $r_i(t)$ describe the the unit axes $\hat{x}$, $\hat{y}$ and  $\hat{z}$ respectively in fixed frame coordinates.

Let $\omega_s \in \mathbb{R}^3$ be the angular velocity $w$ expressed in
fixed frame $\{s\}$ coordinates.

$$\dot{r}_i = \omega_s \times r_i \qquad \forall i \in \{1,\ldots ,3\}$$

These equations can be combined:

$$\dot{R}_{sb} = \begin{bmatrix}
\omega_s \times r_1 & \omega_s \times r_2 &  \omega_s \times r_3
\end{bmatrix} = \omega_s \times R_{sb}$$

this can be simplified to:

$$\dot{R}_{sb} = [\omega_s]R_{sb}$$

where:

$[\omega_s]$ is a $3 \times 3$ [skew-symmetric matrix]({filename}/skew_symmetric_matrix.md) representation of $\omega_s \in \mathbb{R}^3$.


# General Relations


$$\dot{R}_{sb}R_{sb}^{-1} = [\omega_s]$$

and

$$R_{sb}^{-1}\dot{R}_{sb} = [\omega_b]$$

Where

- $[\omega_s] \in so(3)$: fixed frame representation of the angular velocity $w$
- $[\omega_b] \in so(3)$: body frame representation of the angular velocity $w$

# Subscript Cancellation Rule

An angular velocity expressed in an arbitrary frame $\{d\}$ can be 
represented in another frame $\{c\}$ using the subscript cancellation rule:

$$\omega_c = R_{cd}\omega_d$$


# Literature

Notes taken from:

[Modern Robotics: Mechanics, Planning, and Control](http://hades.mech.northwestern.edu/index.php/Modern_Robotics) by Kevin M. Lynch and Frank C. Park, Cambridge University Press, 2017
