Title: Pose and Position
Category: Mechanics
Tags: Robotics

> This page is work in progress

[TOC]

# Position

Position of point $B$ relative to point $A$:

$$\mathbf{r}_{AB}$$

In 3D space positions are represented by vectors $\mathbf{r} \in \mathbb{R}^3$

It is necessary to define a reference frame $A$ and to express the vector in this frame:

$$\mathcal{A}^\mathbf{r}AB$$

With:

- $\mathcal{A}$: Frame $\mathcal{A}$ is used to express position vector $\mathbf{r}AB$
- $\mathbf{r}_AB$: Position vector of point $B$ with with respect to the origin of frame $\mathcal{A}$


The unit vectors $\left ( \mathbf{e}^\mathcal{A}_x, \mathbf{e}^\mathcal{A}_y, \mathbf{e}^\mathcal{A}_z \right )$ of frame $\mathcal{A}$ form an ortho-normal basis of $\mathbb{R}^3$.


# Representation of Positions

## Cartesian Coordinates

$$\mathbf{\chi}_{Pc} = \begin{pmatrix}
x \\ 
y \\ 
z
\end{pmatrix}$$

Where $\mathbf{\chi}_P$ are the stacked parameters of the position representation.

The position vector is given by

$$\mathcal{A}^\mathbf{r} = x\mathbf{e}^\mathcal{A}_x + y\mathbf{e}^\mathcal{A}_y + z\mathbf{e}^\mathcal{A}_z =
\begin{pmatrix}
x \\ 
y \\ 
z
\end{pmatrix}$$

Where:

- $\mathbf{e}^\mathcal{A}_i$: Unit vector of dimension $i$ in frame $\mathcal{A}$

