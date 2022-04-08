---
title: Twists
category: Mechanics
tags: [Robotics]
---
# Linear and Angular (Spacial) Velocities

Given a transformation matrix that represents the configuration $\{b\}$ as seen from $\{s\}$

$$
T = T(t) = T_{sb}(t) = \begin{bmatrix} R(t) & p(t) \\ 0 & 1 \end{bmatrix}
$$

the *spacial velocity* can be calculated analogous to the angular velocity.

$$
T^{-1}\dot{T} =
\begin{bmatrix}
R^T & -R^Tp \\
0 & 1
\end{bmatrix}
\begin{bmatrix}
\dot{R} & \dot{p} \\
0 & 0
\end{bmatrix} =
\begin{bmatrix}
R^T\dot{R} & R^T\dot{p} \\
0 & 0
\end{bmatrix} =
\begin{bmatrix}
[\omega_b] & v_b \\
0 & 0
\end{bmatrix}
$$

with

- $R^T\dot{R} = [\omega_b]$: skew-symmetric representation of angular velocity (expressed in $\{b\}$ coordinates)
- $\dot{p}$: linear velocity of origin of $\{b\}$ expressed in $\{s\}$ coordinates
- $R^T\dot{p} = v_b$: linear velocity (expressed in $\{b\}$ cooridnates)

A twist is the velocity of a screw motion.


# Matrix Representation of a Twist (Spatial Velocity)

## Body Twist

The *spacial velocity* in the body frame, or *body twist* is (in matrix representation):

$$
[V_b] = T_{sb}^{-1}\dot{T}_{sb} = 
\begin{bmatrix}
[\omega_b] & v_b \\
0 & 0
\end{bmatrix}
\in se(3)
$$

where:

- $[\omega_b] \in so(3)$: Angular velocity (skew-symmetric matrix representation) expressed in $\{b\}$
- $v_b \in \mathbb{R}^3$: linear velocity of a point at the origin of $\{b\}$ expressed in $\{b\}$

The set of all $4 \times 4$ matrices of the form of $[V_b]$ is called $se(3)$ (Lie algebra for the Lie group $SE(3)$).

$se(3)$ is the set of the matrix representations of the twists associated with the rigid-body configuration $SE(3)$.

$se(3)$ consists of all possible $\dot{T}$ (when $T= I$).

## Spacial Twist

The *spacial twist* (spacial velocity in the space frame) is analogous to the body twist 

$$
[V_s] = \dot{T}_{sb}T^{-1}_{sb} = 
\begin{bmatrix}
[\omega_s] & v_s \\
0 & 0
\end{bmatrix}
\in se(3)
$$

Where:

- $[\omega_s] \in so(3)$: Angular velocity (skew-symmetric matrix representation) expressed in $\{s\}$
- $v_s \in \mathbb{R}^3$: linear velocity of a point at the origin of $\{s\}$ expressed in $\{s\}$

## Conversion between Body-Frame and Space-Frame (adjoint map)


### From body frame $\{b\}$ to space frame $\{s\}$:

$$
V_s =
\begin{bmatrix}
\omega_s \\
v_s
\end{bmatrix} =
\begin{bmatrix}
R & 0 \\
[p]R & R
\end{bmatrix}
\begin{bmatrix}
\omega_b \\
v_b
\end{bmatrix} =
[Ad_{T_{sb}}]V_b
$$

### From space frame $\{s\}$ to body frame $\{b\}$:

$$
V_b =
\begin{bmatrix}
\omega_b \\
v_b
\end{bmatrix} =
\begin{bmatrix}
R^T & 0 \\
-R^T[p] & R^T
\end{bmatrix}
\begin{bmatrix}
\omega_s \\
v_s
\end{bmatrix} =
[Ad_{T_{bs}}]V_s
$$

Where $[Ad_T] \in \mathbb{R}^{6 \times 6}$ is the *adjoint representation* (adjoint map) of $T = (R,p) \in SE(3)$.

$$
[Ad_T] = \begin{bmatrix}
R & 0 \\
[p]R & R
\end{bmatrix} \in \mathbb{R}^{6 \times 6}
$$

The fixed-frame representation of a twist $V_s$ does *not* depend on the choice of the body frame $\{b\}$.

And the body-frame representation $V_b$ of the same twist does not depend on the choice of the fixed frame $\{s\}$.

### Properties of the Adjoint Map

- Composition:
    - $Ad_{T_1}(Ad_{T_2}(V)) = Ad_{T_1T_2}(V)$
    - or: $[Ad_{T_1}][Ad_{T_2}]V = [Ad_{T_1T_2}]V$
    - with:
      - $T_1, T_2 \in SE(3)$
      - $V = (\omega, v)$
- Inverse:
    - $[Ad_T]^{-1} = [Ad_{T^{-1}}]$ for any $T \in SE(3)$:

# Screw interpretation of a Twist

A twist $V$ can be viewed as a screw axis $S$ and a velocity $\dot{\theta}$ (just like an angular velocity $\omega$ can be combined as $\hat{\omega}\dot{\theta}$).

$$
V =
\begin{bmatrix}
  \omega \\ v  
\end{bmatrix} =
S\dot{\theta}
$$

The screw axis $S$ is defined using a normalized version of any twist $V = (\omega, v)$ corresponting to motion along the screw:

1. if $\omega \neq 0$:
    - Screw axis $S$ is just $V$ normalized by length of angular velocity vector:  $S = V / \left\| \omega \right\| = (\omega/\left\| \omega \right\|, v/\left\| \omega \right\|)$
    - Angular velocity about screw axis is $\dot{\theta} = \left\| \omega \right\|$ such that $S\dot{\theta} = V$
2. if $\omega = 0$:
    - Screw axis $S$ is just $V$ normalized by length of linear velocity vector:  $S = V / \left\| v \right\| = (0, v/\left\| v \right\|)$
    - Linear velocity along screw axis is $\dot{\theta} = \left\| v \right\|$ such that $S\dot{\theta} = V$


## Normalized Screw Axis

A *unit* screw axis is a noramlized twist defined as:

$$
S =
\begin{bmatrix}
S_{\omega} \\ S_v
\end{bmatrix} =
\begin{bmatrix}
\textit{angular velocity when: } \dot{\theta} = 1 \\
\textit{linear velocity of origin when: } \dot{\theta} = 1 \end{bmatrix}
\in \mathbb{R}^6
$$

Where:

- either pitch $h$ is finite
    - $\left\| S_{\omega} \right\| = 1$ (equivalent: $\left\| \omega \right\| = 1$)
    - $\dot{\theta}$: rotational speed
    - then: $v = -\omega \times q + h\omega$
        - $q$: a point on the screw axis
        - $h$: pitch of the screw ($h=0$ for pure rotation)
- or pitch $h$ is infinite ($h \to \infty$)
    - $S_{\omega} = 0$ (equivalent: $\omega = 0$)
    - $\left\| S_{v} \right\| = 1$ (equivalent: $\left\| v \right\| = 1$)
    - $\dot{\theta}$: linear speed
    - pure translation along the axis defined by $v$

A screw axis $S$ is just a normalized twist. It can be represented as a $4 \times 4$ matrix $[S]$ of $S = (\omega, v)$:


$$
[S] =
\begin{bmatrix}
[\omega] & v \\
0 & 0
\end{bmatrix}
\in se(3)
$$

with:

- $[\omega] \in so(3)$: the screw-symmetric representation of $\omega$


### Conversion of Screw Axes

A screw axis represented in any frame $\{a\}$ can be represented in another frame $\{b\}$ (with a modified version of the subscript cancellation rule):

$$
S_a = [Ad_{T_{a\not{b}}}]S_{\not{b}}
$$

With:

- $S_a$: Screw axis represented in $\{a\}$ coordinates
- $S_b$: Same screw axis represented in $\{b\}$ coordinates
- $[Ad_{T_{ab}}]$: Adjoint map (from $b$ to $a$)


# Literature

Notes taken from:

[Modern Robotics: Mechanics, Planning, and Control](http://hades.mech.northwestern.edu/index.php/Modern_Robotics) by Kevin M. Lynch and Frank C. Park, Cambridge University Press, 2017
