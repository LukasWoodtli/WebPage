Title: Space Topology
Category: Mechanics
Tags: Robotics

# Space Topology

- Euclidian space: $\mathbb{E}^n$ or $\mathbb{R}^n$
- Sphere: $S^n$
- Torus: $T^n$ ($T^2 = S^1 \times S^1$)


$\mathbb{R}^n$ is the $n$-dimensional Euclidian space, $S^n$ the $n$-dimensional surface of a sphere and $T^n$ is the $n$-dimensional
surface of a torus in a $(n + 1) dimensional space.

> $S^1 \times S^1 \times S^1 \times \cdots \times S^1 = T^n$ for $n$ copies of $S^1$

Some spaces ([c-spaces]({filename}/c-space_dof.md)) can be represented as Cartesian product of two or more lower dimensional spaces.

| C-space             | Cartesian product        | Explanation                                            |
|---------------------|--------------------------|--------------------------------------------------------|
| Rigid body in plane | $\mathbb{R}^2\times S^1$ | x-y-coordinates and an angle                           |
| PR robot arm        | $\mathbb{R}^1\times S^1$ | prismatic joint: $\mathbb{R}^1$, revolute joint: $S^1$ |
| 2R robot arm        | $S^1 \times S^1 = T^2$   | 2 times revolute joint                                 |
| planar rigid body with 2R robot arm | $\mathbb{R}^2\times S^1\timesT^2 = \mathbb{R}^2\times T^3$ |      |
| rigid body in 3-D   | $\mathbb{R}^3\times S^2\times S^1$ | 1 point in 3-D, a point on a 2-D sphere and a point an a circle |


# Space Representation

> A numerical representation is not fundamental as the topology of a space. It involves always a choice.

Implicit representations don't have *singularities* but have more numbers than the number of degrees of freedom.

- [Unit quaternion](https://en.wikipedia.org/wiki/Quaternion#Unit_quaternion)
- [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)


# Literature

Notes taken from:

Modern Robotics: Mechanics, Planning, and Control by Kevin M. Lynch and Frank C. Park, Cambridge University Press, 2017
