Title: Rotation Matrix
Category: Mechanics
Tags: Robotics

> This page is work in progress

Space frame $\{s\}$
Body frame $\{b\}$

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

- $R_{sb}:
    - Subscript $s$: Reference frame
    - Subscript $b$: frame whose orientation is being represented


Constraints:

There are only $3$ dimensions for orientation of a rigid body in space. But the $3 \times 3$ rotation matrix has $9$ numbers.
So $6$ constraints are required.


- All $3$ column vectors are *unit vectors*
- Dot product of any $2$ column vectors is zero (they are all orthogonal to each other

> These constraints ensure that the determinant or $R$ is $1$ for right-handed frames

$$R^TR = I$$

Where:

- $I = \begin{bmatrix}
1 & 0 & 0\\ 
0 & 1 & 0\\ 
0 & 0 & 1
\end{bmatrix}$: Identity matrix


## Special Orthogonal Group

The Special Orthogonal Group $SO(3)$ is the set of all possible $3 \times 3$ real matrices $R$ satisfying:

$$R^TR = I$$

$$det R = 1$$


## Properties of Rotation Matrices

- Inverse: $R^{-1} = R^T \in SO(3)$
- Closure: $R_1 R_2 \in SO(3)$
- Associative $(R_1 R_2) R_3 = R_1 (R_2 R_3)$
- *Not* commutative: $R_1 R_2 \neq R_2 R_1$
- Rotating a vector doesn't change its length: $x \in \mathbb{R}^3, \left \| Rx \right \| = \left \| x \right \|$




# Literature

Notes taken from:

[Modern Robotics: Mechanics, Planning, and Control](http://hades.mech.northwestern.edu/index.php/Modern_Robotics) by Kevin M. Lynch and Frank C. Park, Cambridge University Press, 2017
