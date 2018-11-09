Title: Rotation Matrix
Category: Mechanics
Tags: Robotics

> This page is work in progress

[TOC]

# Rotation

A rotation $R$ in 3D is specified by a *rotation angle* $\theta$ and a unit vector **u** (the *rotation axis*).

## Frames

- Space frame: $\{s\}$
- Body frame: $\{b\}$


Expressing orientation of $\{b\}$ relative to $\{s\}$:

- writing the unit coordinate axis of $\{b\}$ as column vectors in the coordinates of $\{s\}$
- Form a matrix from the column vectors

Example:

$$\begin{matrix}
\hat{x}_b = \begin{bmatrix}
0\\ 
1\\ 
0
\end{bmatrix} &  
\hat{y}_b = \begin{bmatrix}
-1\\ 
0\\ 
0
\end{bmatrix}
&
\hat{z}_b = \begin{bmatrix}
0\\ 
0\\ 
1
\end{bmatrix} 
\end{matrix}$$


Where:

- $\hat{x}_b$, $\hat{y}_b$, $\hat{z}_b$: Unit vectors of $\{b\}$ represented in coordinates of $\{s\}$


Combined unit vectors:

$$R_{sb}=\begin{bmatrix}
\hat{x}_b & \hat{y}_b & \hat{z}_b
\end{bmatrix}
= 
\begin{bmatrix}
0 & -1 & 0\\ 
1 & 0 & 0\\ 
0 & 0 & 1 
\end{bmatrix}$$


Where:

- $R_{sb}$:
    - Subscript $s$: Reference frame
    - Subscript $b$: Frame whose orientation is being represented


## Constraints

There are only $3$ dimensions for orientation of a rigid body in space. But the $3 \times 3$ rotation matrix has $9$ numbers.
So $6$ constraints are required:


- All $3$ column vectors are *unit vectors*
- Dot product of any $2$ column vectors is zero (they are all mutually orthogonal to each other)

> These constraints ensure that the determinant of $R$ is $1$ for right-handed frames

$$R^TR = I$$

Where:

- $I$: Identity matrix

$$I = \begin{bmatrix}
1 & 0 & 0\\ 
0 & 1 & 0\\ 
0 & 0 & 1
\end{bmatrix}$$


## Special Orthogonal Group *SO(3)*

The Special Orthogonal Group $SO(3)$ is the set of all possible $3 \times 3$ real matrices $R$ that satisfy:

$$R^TR = RR^T = I$$

$$det R = 1$$

We refer to $SO(3)$ as the *rotation group* of $\mathbb{R}^3$

The rotation group $SO(3)$ is referred to as the *configuration space* of the system and a trajectory of the system is a curve $R(t) \in SO(3)$ for $t \in [0,T]$

## Properties of Rotation Matrices

- Inverse: $R^{-1} = R^T \in SO(3)$
- Closure: $R_1 R_2 \in SO(3)$
- Associative $(R_1 R_2) R_3 = R_1 (R_2 R_3)$
- *Not* commutative: $R_1 R_2 \neq R_2 R_1$
- Identity element: $R I = I R = R$
- Composition Rule for Rotations (Combining by matrix multiplication): $R_{ac} = R_{ab} R_{bc}$
- Rotating a vector doesn't change its length: $x \in \mathbb{R}^3, \left \| Rx \right \| = \left \| x \right \|$


# Screw, Twist and Wrench

## Screw

A rigid body can be moved from one position to any other by rotation around a line (vector) and translation along that line. This is called a screw motion.

## Twist

An infinitesimal screw motion is called a twist. It describes the instantaneous velocity of a rigid in terms of its linear and angular components.

## Wrench

A system of forces acting on a rigid body can be replaced by a single force along a line and a torque about that line. These forces are referred to as wrench. Many theorems that apply to twists can be extended to wrenches.




# Literature

Notes taken from:

[Modern Robotics: Mechanics, Planning, and Control](http://hades.mech.northwestern.edu/index.php/Modern_Robotics) by Kevin M. Lynch and Frank C. Park, Cambridge University Press, 2017

[A Mathematical Introduction to Robotic Manipulation](http://www.cds.caltech.edu/~murray/mlswiki/index.php?title=Main_Page) by Richard M. Murray, Zexiang Li and S. Shankar Sastry, CRC Press, 1994

