---
title: Pose and Position
category: Mechanics
tags: [Robotics]
---
> This page is work in progress


# Position

Position of point $B$ relative to point $A$:

$$
\mathbf{r}_{AB}
$$

In 3D space positions are represented by vectors $\mathbf{r} \in \mathbb{R}^3$

It is necessary to define a reference frame $A$ and to express the vector in this frame:

$$
\mathcal{A}^\mathbf{r}AB
$$

With:

- $\mathcal{A}$: Frame $\mathcal{A}$ is used to express position vector $\mathbf{r}_{AB}$
- $\mathbf{r}_{AB}$: Position vector of point $B$ with with respect to the origin of frame $\mathcal{A}$


The unit vectors $\left ( \mathbf{e}^\mathcal{A}_x, \mathbf{e}^\mathcal{A}_y, \mathbf{e}^\mathcal{A}_z \right )$ of frame $\mathcal{A}$ form an ortho-normal basis of $\mathbb{R}^3$.


An alternative notation:

$$
{}^A \mathbf{p}_B
$$

Meaning: Vector $\mathbf{p}$ to $B$ with respect to coordinate frame ${A}$.
(The bound vector $\mathbf{p}$ pointing from the origin of ${A}$ to the point $B$,
Where everything is in the coordnate frame ${A}$).


# Representation of Positions

## Cartesian Coordinates

$$
\mathbf{\chi}_{Pc} = \begin{pmatrix}
x \\
y \\
z
\end{pmatrix}
$$

Where $\mathbf{\chi}_P$ are the stacked parameters of the position representation.

The position vector is given by

$$
\mathcal{A}^\mathbf{r} = x\mathbf{e}^\mathcal{A}_x + y\mathbf{e}^\mathcal{A}_y + z\mathbf{e}^\mathcal{A}_z =
\begin{pmatrix}
x \\
y \\
z
\end{pmatrix}
$$

Where:

- $\mathbf{e}^\mathcal{A}_i$: Unit vector of dimension $i$ in frame $\mathcal{A}$


## Cylindrical coordinates

$$
\mathbf{\chi}_{Pz} = \begin{pmatrix}
\rho  \\
\theta \\
z
\end{pmatrix}
$$

A position vector is given by

$$
\mathcal{A}^\mathbf{r} =
 \begin{pmatrix}
\rho \cos \theta \\
\rho \sin \theta  \\
z
\end{pmatrix}
$$


## Spherical coordinates

$$
\mathbf{\chi}_{Pz} = \begin{pmatrix}
r \\
\theta \\
\phi
\end{pmatrix}
$$

A position vector is given by

$$
\mathcal{A}^\mathbf{r} = \begin{pmatrix}
r \cos \theta \sin \phi \\
r \sin \theta \sin \phi \\
r \cos \phi 
\end{pmatrix}
$$


Where:

- $\theta$: azimuthal angle
- $\phi$: polar angle (sometimes $\varphi$)


# Pose

To fully describe the configuration of a rigid body (pose) a position and a rotation is needed.

A pose $\xi$ in 2D has 3 parameters $(x, y, \theta)$. It can be considered as the motion (translation
and rotation) of a coordinate frame.

The pose of a coordinate frame can be described with respect to another coordinate frame:

$$
{}^A\xi_B
$$

Meaning: Pose $\xi$ of coordinate frame ${B}$ with respect to frame ${A}$.


# Sources

Notes taken from:

[Robot Academy](https://robotacademy.net.au/)
