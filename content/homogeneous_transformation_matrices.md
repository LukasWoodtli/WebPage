Title: Homogeneous Transformation Matrices 
Category: Mathematics
Tags: Robotics

# Planar rigid-body motions

A planar rigid body motion is defined as:

$$T =
\begin{bmatrix} R & p \\ 0 & 1 \\
\end{bmatrix}
= 
\begin{bmatrix}
r_{11}& r_{12} & p_1 \\ 
r_{21}& r_{22} & p_2 \\ 
0  & 0 & 1 \\
\end{bmatrix}
= 
\begin{bmatrix}
\cos \theta & -\sin \theta & p_1\\
\sin \theta & \cos \theta & p_2 \\
0 & 0  & 1 \\
\end{bmatrix} \in SE(2)$$

Where:
- $T \in SE(2)$: A $3 \times 3$ real matrix representig a rigid body motion in $\mathbb{R}^2$
- $R \in SO(2)$: Rotational part of the motion (Rotation matrix)
- $p \in \mathbb{R}^2$: Linear displacement of the motion (and roation axis)
- $\theta \in [0,\pi)$: Rotation angle


> The set of all planar homogeneous transforamtion matrices is called **special Euclidean group** $SE(2)$


# Spacial rigid-body motions

A homogeneous transformation matrix (or rigid body motion) $T$ in $\mathbb{R}^3$ is defined as:

$$T = (R, p) = \begin{bmatrix}
 R & p \\
 0 & 1 \\
\end{bmatrix}
= \begin{bmatrix}
 r_{11}& r_{12} & r_{13} & p_1 \\
 r_{21}& r_{22} & r_{23} & p_2 \\
 r_{31}& r_{32} & r_{33} & p_3 \\
 0 & 0  & 0 & 1 \\
\end{bmatrix} \in SE(3)$$

Where:

- $T \in SE(3)$: A $4 \times 4$ real matrix representig a rigid body motion in $\mathbb{R}^3$
- $R \in SO(3)$: Rotational part of the motion (Rotation matrix)
- $p \in \mathbb{R}^3$: Linear displacement of the motion (and rotation axis)

> The set of all spacial homogeneous transformation matices is called the **special Euclidian group** $SE(3)$


## Multiplication with a Vector

Sometimes it's useful to calculate $Rx + p$ (where $x \in \mathbb{R}^3$ and $(R,p) = T$).

We then need to append a $1$ to $x$ to make it a $4 \times 1$ vector.

$$T \begin{bmatrix} x \\ 1 \end{bmatrix} =
\begin{bmatrix} R & p \\ 0 & 1 \end{bmatrix}
\begin{bmatrix} x \\ 1 \end{bmatrix} =
\begin{bmatrix} Rx + p \\ 1 \end{bmatrix}
$$

Where
- $[x^T 1]^T$: *homogeneous coordinates* representation of  $x$
- $T \in SE(3)$: homogenous transformation

$$Tx = Rx + p$$

# Properties of Transformation Matrices

These properties hold for $SE(2)$ and $SE(3)$.

- Inverse:
    - $$T^{-1} = \begin{bmatrix} R & p \\ 0 & 1 \\
\end{bmatrix}^{-1} =  \begin{bmatrix} R^T & -R^Tp \\ 0 & 1 \\
\end{bmatrix} \in SE(n)$$
- Closure: $T_1 T_2 \in SE(n)$
- Associative $(T_1 T_2) T_3 = T_1 (T_2 T_3)$
- *Not* commutative: $T_1 T_2 \neq T_2 T_1$
- Composition Rule for Rotations (Combining by matrix multiplication): $T_{ac} = T_{ab} T_{bc}$ (subscript cancellation)
- $T = (R, p) \in SE(3)$ transforms a point $x \in \mathbb{R}^3$ to $Tx$
  - $T$ preserves distances: $\left\| T_x - T_y \right\| = \left\| x - y \right\|$
      - $\left\| a \right\| = \sqrt{a^Ta}$: standard Euclidian norm in $\mathbb{R}^3$
  - $T$ preserves angles: $\left< T_x - T_z, T_y - T_z\right> = \left< x - z, y - z\right>$ for all $z \in \mathbb{R}^3$
      - $\left< a, b\right> = a^Tb$: standard Euclidian inner product in $\mathbb{R}^3$


# Uses of Transformation Matrices

There are three uses for a transformation matrix:

- To represent a configuration (position and orientation) of a rigid body
- To change the reference frame in which a vector or a frame is represented (operator for passive rotation)
- To displace a vector or a frame (operator for active rotation)

## Representing a Configuration

Any frame can be expressed relative to any other frame.

$T_{sa} = (R_{sa}, p_{sa})$ represents the configuration of frame $a$ relative to frame $s$.

## Changing the reference Frame of a Vector or Frame

Changing the reference frame of a vector or a frame is analogous to [rotation matirces]({filename}/rotation_matrix.md) using the subscript cancellation rule:

$$T_{ab} T_{bc} = T_{a\not{b}} T_{\not{b}c} = T_{ac} $$
$$T_{ab} v_b = T_{a\not{b}} v_{\not{b}} = v_a $$


## Displace a Frame or Vector

A displacement (rotation and translaation) of a frame or a vector can be seen as a translation along a vector $p$ ($Trans(p)$) and a rotation around the axis $\hat{\omega}$ with angle $\theta$ ($Rot(\hat{\omega}, \theta)$).

$$T = Trans(p)Rot(\hat{\omega}, \theta)$$

With:

$Trans(p) =
\begin{bmatrix}
 1 & 0 & 0 & p_x \\
 0 & 1 & 0 & p_y \\
 0 & 0 & 1 & p_z \\
 0 & 0 & 0 & 1 
\end{bmatrix}$

$Rot(\hat{\omega}, \theta) =
\begin{bmatrix}
  &  &  & 0 \\
  & e^{[\hat{\omega}]\theta} &  & 0 \\
  &  &  & 0 \\
 0 & 0 & 0 & 1 
\end{bmatrix}$


### Space-Frame Transformation

When a frame $T_{sb}$ is *premultiplied* by a transformation matrix $T$ the vectors $p$ and $\hat{\omega}$ are interpreted in the coordinate system of the $\{s\}$ frame (first subscript of $T_{sb}$):

$$T_{sb'} = TT_{sb} = Trans(p)Rot(\hat{\omega}, \theta)T_{sb}$$

The order of the operations is:

1. rotation (this will cause the origin of $\{b\}$ to move if it is not coincident with the origin of $\{s\}$)
2. translation

### Body-Frame Transformation

When the frame $T_{sb}$ is *postmultiplied* by a transformation matrix $T$ the vectors $p$ and $\hat{\omega}$ are interpreted in the coordinate system of the $\{b\}$ frame (second subscript of $T_{sb}$):

$$T_{sb''} = T_{sb}T = T_{sb}Trans(p)Rot(\hat{\omega}, \theta)$$

The order of the operations is:

1. translation
2. rotation (this does not move the origin of the frame)


# Literature

Notes taken from:

[Modern Robotics: Mechanics, Planning, and Control](http://hades.mech.northwestern.edu/index.php/Modern_Robotics) by Kevin M. Lynch and Frank C. Park, Cambridge University Press, 2017
