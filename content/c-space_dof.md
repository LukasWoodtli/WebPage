Title: Configuration Space and Degrees of Freedoms
Category: Mechanics
Tags: Robotics




# Joints

Every joint connects *exactly* two links.

A joint:

- provides freedoms to allow one rigid body to move relative to another.
- provides constraints on the possible motions of the two rigid bodies it connects.

$dof\ (of\ joint) = dof\ (of\ rigid\ body) - number\ of\ constraints\ (of\ joint)$


## Typical Joints

| Joint type                                                                | dof ($f$) | Constraints $c$ in 2D | Constraints $c$ in 3D |
|---------------------------------------------------------------------------|-----------|-----------------------|-----------------------|
| [Revolute (Scharnier)](https://en.wikipedia.org/wiki/Revolute_joint)      |        1  |           2           |           5           |
| [Prismatic (Schubgelenk)](https://en.wikipedia.org/wiki/Prismatic_joint)  |        1  |           2           |           5           |
| [Cylindrical (Drehschubgelenk)](https://en.wikipedia.org/wiki/Cylindrical_joint) |  2 |           -           |           4           |
| [Universal (Kardangelenk)](https://en.wikipedia.org/wiki/Universal_joint) |        2  |           -           |           4           |
| [Spherical (Kugelgelenk)](https://en.wikipedia.org/wiki/Ball_joint)       |        3  |           -           |           3           |



# Configuration Space

Configuration: a specification of the positions of all points of the robot.

Configuration space (C-space):

- The space of all configurations.
- The n-dimensional space containing all possible configurations of the robot.

The configuration of a robot is represented by a point in its C-space.


# Degrees of Freedom (dof)

Degrees of freedom: smallest number of *real-valued* coordinates needed to represent its configuration.
It's the dimension of the C-space or minimum number of real-valued numbers needed to represent the configuration.


Rigid body (number of degrees of freedom):

- 2D (planar bodies): 3
- 3D (spatial bodies): 6


Degrees of freedom in 3D:

- x
- y
- z
- roll
- pitch
- yaw


$dof = (sum\ of\ freedoms\ of\ the\ bodies) - (number\ of\ independent\ constraints)$


# Grübler's Formula

- $N$: Number of links (ground is also a link)
- $J$: Number of joints
- $m$: Degrees of freedom of rigid body (3 in 2D, 6 in 3D)
- $f_i$: Number of freedoms of joint $i$
- $c_i$: Number of constraints of joint $i$
- where $\forall i;f_i + c_i = m$


$$\begin{align*}
dof &= \underbrace{m(N-1)}_{rigid\ body \ freedoms} - \underbrace{\sum_{i=1}^Jc_i}_{joint\ constraints}\\ 
 &= m(N-1)-\sum_{i=1}^J(m-f_i)\\ 
 &= m(N-1-J)+\sum_{i=1}^Jf_i
\end{align*}$$

The formula holds only if all constraints for the joints are independent.

# Literature

Notes taken from:

[Modern Robotics: Mechanics, Planning, and Control](http://hades.mech.northwestern.edu/index.php/Modern_Robotics) by Kevin M. Lynch and Frank C. Park, Cambridge University Press, 2017
