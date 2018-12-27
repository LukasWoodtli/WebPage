Title: Twist, Screw and Wrench
Category: Mechanics
Tags: Robotics



# Screw

A rigid body can be moved from one position to any other by rotation around a line (vector) and translation along that line. This is called a screw motion.

# Twist

The instantaneous spatial velocity of a rigid body in terms of its linear and angular components is called a twist.
It can be represented as a point in $\mathbb{R}^6$, defined by 3 angular and 3 linear velocities.
A twist can be seen as an infinitesimal screw motion.

Any configuration of a rigid-body can be achieved by starting from a fixed point (reference frame) and integrating a *constant twist* for a specified time (Exponential Coordinates). Such a motion resembles the motion of a screw, rotating about and translating along the same fixed axis.

# Wrench

A system of forces acting on a rigid body can be replaced by a single force along a line and a torque about that line. These forces are referred to as wrench. Many theorems that apply to twists can be extended to wrenches.

Similar to angular and linear velocities are packed into a vector in $\mathbb{R}^6$ (twist), moments (torques) and forces are packed together into a vector in $\mathbb{R}^6$ called *wrench* (*spacial forces*).


# Literature

Notes taken from:

[Modern Robotics: Mechanics, Planning, and Control](http://hades.mech.northwestern.edu/index.php/Modern_Robotics) by Kevin M. Lynch and Frank C. Park, Cambridge University Press, 2017
