Title: Rotation Matrix
Category: Mechanics
Tags: Robotics

> This page is work in progress

[TOC]

# Rotation

The configuration of a point is fully described by a position, bodies additionally require a rotation to define their pose.

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

$$R^TR = I$$

Where:

- $I$: Identity matrix

$$I = \begin{bmatrix}
1 & 0 & 0\\ 
0 & 1 & 0\\ 
0 & 0 & 1
\end{bmatrix}$$

Furthermore for right-handed frames the following must hold:

$$\det R = 1$$

## Special Orthogonal Group *SO(2)* and  *SO(3)*

The Special Orthogonal Group $SO(2)$ and $SO(3)$ is the set of all possible $2 \times 2$ or $3 \times 3$
real matrices $R$ that satisfy:

$$R^TR = RR^T = I$$

$$det R = 1$$

We refer to $SO(3)$ as the *rotation group* of $\mathbb{R}^3$

The rotation group $SO(3)$ is referred to as the *configuration space* of the system and a trajectory of the system is a curve $R(t) \in SO(3)$ for $t \in [0,T]$.

Because a rotation matrix $R$ lives in $SO(3)$, there is *no* numerical equivalent to a position *such as angular position*.


## Properties of Rotation Matrices

These properties hold for $SO(2)$ and $SO(3)$.

- Inverse:
  - $R^{-1} = R^T \in SO(n)$
  - $R R^{-1} = R^{-1} R = I$
- Closure: $R_1 R_2 \in SO(n)$
- Associative $(R_1 R_2) R_3 = R_1 (R_2 R_3)$
- *Not* commutative: $R_1 R_2 \neq R_2 R_1$
- Identity element: $R I = I R = R$
- Composition Rule for Rotations (Combining by matrix multiplication): $R_{ac} = R_{ab} R_{bc}$ (subscript cancellation)
- Rotating a vector doesn't change its length: $x \in \mathbb{R}^3, \left \| Rx \right \| = \left \| x \right \|$
- A rotation matrix (in 2D) has 3 eigenvectors:
  - One real eigenvector corresponding to to eigenvalue $1$
  - Two complex eigenvectors with eigenvalues: $\lambda = \cos \theta \pm j \sin \theta$ where $\theta$ is the rotation angle


## Composition of Rotations

The coordinates of a vector $\mathbf{u}$ can be mapped from frame $B$ to frame $A$ by writing:

$${}_A\mathbf{u} = R_{AB} \cdot {}_B\mathbf{u}$$

The vector $\mathbf{u}$ can also be mapped from frame $C$ to frame $C$ by writing:

$${}_B\mathbf{u} = R_{BC} \cdot {}_C\mathbf{u}$$

Combining these equations:

$$\begin{align*}
{}_A\mathbf{u} &= R_{AB} \cdot (R_{BC} \cdot {}_C\mathbf{u}) \\
 &= R_{AC} \cdot {}_C\mathbf{u}
\end{align*}$$


The resulting rotation matrix $R_{AC} = R_{AB} \cdot R_{BC}$ (s.a. subscript cancellation) can be interpreted as the rotation obtained by rotating frame $A$ until it coincides with frame $B$, and then rotating frame $B$ until it coincides with frame $C$.

## Uses of Roatation Matrices

There are three uses for a rotation matrix:

- To represent an [orientation]({filename}/pose_and_position.md)
- To change the reference frame in which a vector or a frame is represented (passive rotation)
- To rotate a vector or a frame (active rotation)

In the first use, $R$ is thought of as representing a frame; in the 
second and third uses, $R$ is thought of as an operator that acts on a
vector or frame.

### Representing Orientation

$R_c$ means implicit the orientation of frame ${c}$ relative to the reference 
frame ${s}$. Explicit notation would be $R_{sc}$.

$R_c = R_{sc}$

Properties:

- $R_{ac} R_{ca} = I$
- $R_{ac} = R_{ca}^{-1} = R_{ca}^T$


### Changing the reference Frame (Passive Rotation)

$$R_{ac} = \underbrace{R_{ab}}_{operator} \times \overbrace{R_{bc}}^{orientation}$$

Meaning: $R_{ac} = change\_reference\_frame\_from\_b\_to\_a(R_{bc})$

$R_{bc}$ can be viewed as a representation of the **orientation** of ${c}$.
$R_{ab}$ can be viewed as a mathematical **operator** that changes the reference frame from ${b}$ to ${a}$.

Subscript cancellation rule:
$R_{ab} R_{bc}  = R_{a\not{b}} R_{\not{b}c} = R_{ac}$

The reference frame of a vector can also be changed by a rotation matrix:
$R_{ab} p_b  = R_{a\not{b}} p_{\not{b}} = p_a$


### Rotating a vector or a frame (Active Rotation)

$R$ as a rotation operator can be written:

$$R = Rot(\hat{\omega}, \theta)$$



#### Elementary Rotations

$$Rot(\hat{x}, \theta) = \begin{pmatrix}
1 &   0         & 0           \\
0 & \cos \varphi & -\sin \varphi \\
0 & \sin \varphi &  \cos \varphi
\end{pmatrix}$$


$$Rot(\hat{y}, \theta)= \begin{pmatrix}
\cos \varphi & 0 & \sin \varphi \\
0 &   1         & 0           \\
-\sin \varphi & 0 & \cos \varphi
\end{pmatrix}$$

$$Rot(\hat{z}, \theta) = \begin{pmatrix}
\cos \varphi & -\sin \varphi & 0\\
\sin \varphi & \cos \varphi & 0 \\
0 &   0         & 1           \\
\end{pmatrix}$$

#### General form of Rotation

$$Rot(\hat{\omega}, \theta) =
\begin{bmatrix}
\cos \theta + \hat{\omega}_1^2(1-\cos \theta) &
\hat{\omega}_1 \hat{\omega}_2(1-\cos \theta) - \hat{\omega}_3 \sin \theta &
\hat{\omega}_1 \hat{\omega}_3(1-\cos \theta) - \hat{\omega}_2 \sin \theta  \\
\hat{\omega}_1 \hat{\omega}_2(1-\cos \theta) - \hat{\omega}_3 \sin \theta&
\cos \theta + \hat{\omega}_2^2(1-\cos \theta) &
\hat{\omega}_2 \hat{\omega}_3(1-\cos \theta) - \hat{\omega}_1 \sin \theta\\
\hat{\omega}_1 \hat{\omega}_3(1-\cos \theta) - \hat{\omega}_2 \sin \theta&
\hat{\omega}_2 \hat{\omega}_3(1-\cos \theta) - \hat{\omega}_1 \sin \theta&
\cos \theta + \hat{\omega}_3^2(1-\cos \theta)
\end{bmatrix}$$

with: $\hat{\omega} = (\hat{\omega}_1, \hat{\omega}_2, \hat{\omega}_3)$


#### Properties
- Any $R \in SO(3)$ can be obtained by rotating from the identity matrix $I$ by some $\theta$ about some $\hat{\omega}$
- $Rot(\hat{\omega},\theta) = Rot(-\hat{\omega},-\theta)$


#### Reference Frame for Rotation

When rotating a frame ${b}$  by $Rot(\hat{\omega}, \theta)$ and $R_{sb}$ represents the orientation
of ${b}$ relative to ${s}$, it's important to express if the rotation
axis $\hat{\omega}$ is in ${s}$ or in ${b}$ coordinates.

Given $R = Rot(\hat{\omega}, \theta)$:

- Rotate by $R$ in ${s}$ frame:
    - $R_{s{b}'} = RR_{sb}$
    - Premultiplying by $R$: $\hat{\omega}$ considered in the fixed frame
- Rotate by $R$ in ${b}$ frame:
    - $R_{s{b}''} = R_{sb}R$
    - Postmulitplying by $R$: $\hat{\omega}$ considered in the body frame.


To rotate a vector $v$, there is only one frame involved. $\hat{\omega}$
has to be interpreted as being in the frame in which $v$ is represented:

$${v}' = Rv$$

# Literature

Notes taken from:

[Modern Robotics: Mechanics, Planning, and Control](http://hades.mech.northwestern.edu/index.php/Modern_Robotics) by Kevin M. Lynch and Frank C. Park, Cambridge University Press, 2017

[A Mathematical Introduction to Robotic Manipulation](http://www.cds.caltech.edu/~murray/mlswiki/index.php?title=Main_Page) by Richard M. Murray, Zexiang Li and S. Shankar Sastry, CRC Press, 1994

