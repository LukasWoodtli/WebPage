Title: Wrenches
Category: Mechanics
Tags: Robotics


A linear force $f$ acting on a rigid body at point $p$ creates a *torque* (*moment*) $m$ that can be represented in a reference frame $\{a\}$ as:

$$m_a = r_a \times f_a$$

With:

- $m_a \in \mathbb{R}^3$: Torque or moment
- $r_a \in \mathbb{R}^3$: Point of action (of rigid body)
- $f_a \in \mathbb{R}^3$: Force acting on the rigid body


# Wrench

The *moment* and the *force* can be combined in a 6-dimensional vector (like with twists) called *wrench* (or *spacial force*).

$$F_a =
\begin{bmatrix}
m_a \\
f_a
\end{bmatrix}
\in \mathbb{R}^6$$

- $F_a \in \mathbb{R}^6$: Wrench (spacial force)
- $m_a \in \mathbb{R}^3$: Torque or moment on rigid body
- $f_a \in \mathbb{R}^3$: Force acting on rigid body

> A wrench that has a zero linear component is a *pure moment*

## Sum of Wrenches

If multiple wreches act on a rigid body, the total wrench is the sum of all wrench vectors. The wrenches need to be represented in the same frame.

$$F_a = F_{a1} + F_{a2} + \cdots + F_{aN} =
\begin{bmatrix}
m_{a1} \\
f_{a1}
\end{bmatrix} +
\begin{bmatrix}
m_{a2} \\
f_{a2}
\end{bmatrix} +
\cdots +
\begin{bmatrix}
m_{aN} \\
f_{aN}
\end{bmatrix}
$$

## Conversion between Frame Representations


- $F_s$: spacial wrech
- $F_b$: body wrech

### From Body Frame to Space Frame

$$F_s = Ad_{T_{bs}}^T(F_b)= [Ad_{T_{bs}}]^TF_b$$

### From Space Frame to Body Frame

$$F_b = Ad_{T_{sb}}^T(F_s)= [Ad_{T_{sb}}]^TF_b$$

# Literature

Notes taken from:

[Modern Robotics: Mechanics, Planning, and Control](http://hades.mech.northwestern.edu/index.php/Modern_Robotics) by Kevin M. Lynch and Frank C. Park, Cambridge University Press, 2017
