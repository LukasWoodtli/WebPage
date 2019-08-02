Title: Mechanical Constraints
Category: Mechanics
Tags: Robotics


# Pfaffian Constraints

A Pfaffian constraint is a set of $k$ ($k \leq n$) linearly independent constraints so that:

$$A(q)\dot{q} = 0$$

Where:

- $A(q) \in \mathbb{R}^{k \times n}$
- $\dot{q}$: derivative of $q$ with respect to time
- $k$: number of constraints
- $n$: number of variables needed to define robots configuration (implicit representation)


## Holonomic Constraints

- A holonomic mechanical system can move in arbitrary directions (in its C-space)
- Holonomic constraints can be defined independent of $\dot{q}$ (i.e. $f(q,t)= 0$)
- Holonomic constraints reduce the dimension of the C-space (geometric limitation)
- C-space can be viewed as a surface of dimension $n-k$ embedded in $\mathbb{R}^n$
    - $n$: number of variables to define robots configuration
    - $k$: independent holonomic constraints
    - $n-k$: dimension of C-space, degree of freedom
- Integrable constraints:
    - Kinematic constraints may be integrable. In this case, the constraints are geometric constraints
    - the velocity constraints that they imply can be integrated to give equivalent configuration (geometric) constraints


Holonomic constraints $g(q(t)) = 0$ can be differentiated with respect to $t$ to yield:

$$\frac{\partial g}{\partial q}(q)\dot{q}=0$$


## Nonholonomic Constraints

- A nonholonomic mechanical system *cannot* move in arbitrary directions (in its C-space)
- Constraints can not be integrated
- They reduce the dimension of the feasible velocities of the system (kinematic/velocity limitation)
- They do *not* reduce the dimension of the reachable C-space
- e.g. rolling without slipping
