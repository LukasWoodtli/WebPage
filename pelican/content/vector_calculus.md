Title: Vector Calculus
Date: 2015-09-09
Modified: 2015-09-09
Category: Mathematics
Tags: Calculus

Some notes about Vector Calculus. Mainly Divergence, Gradient and Curl.

[TOC]


Nabla Operator ($\nabla$)
========================



$$\nabla = \left (\frac\partial{\partial x_1},\ldots, \frac\partial{\partial x_n}\right)$$

For a 3-dimensional cartesian coordinate system:

$$\nabla = \left(\frac\partial {\partial x}, \frac\partial {\partial y}, \frac\partial {\partial z}\right) = \vec e_x \frac\partial {\partial x} + \vec e_y \frac\partial {\partial y} + \vec e_z \frac\partial {\partial z}$$


Sometimes $\vec\nabla$ is written instead of $\nabla$ to show that it's basically a vector.


Gradient ($\operatorname{grad}$)
================================

The gradient represents the slope of the tangent of the graph of a function.

Input: A [Scalar field](https://en.wikipedia.org/wiki/Scalar_field)

Output: A [Vector field](https://en.wikipedia.org/wiki/Vector_field) 

The direction of the gradient at one position shows the direction of the biggest change in the scalar field.
The length (absolute value) of the gradient at that point is a measurement of the change (slope).

$$\nabla f = \frac{\partial f}{\partial x_1}\mathbf{e}_1 + \cdots + \frac{\partial f}{\partial x_n }\mathbf{e}_n$$

$e_i$: The orthogonal unit vectors pointing in the coordinate directions


Divergence ($\operatorname{div}$)
=================================

The divergence is a vector operator that measures the **magnitude** of a vector field's source or sink. It is a
scalar field with signed components (positive values for sources, negative values for sinks). 

Input: A [Vector field](https://en.wikipedia.org/wiki/Vector_field)

Output: A [Scalar field](https://en.wikipedia.org/wiki/Scalar_field)


The divergence is the *scalar product* between the Nable operator ($\nabla=(\tfrac{\partial}{\partial x_1},\ldots,\tfrac{\partial}{\partial x_n})$ and the vector $\vec F = (F^1,\ldots,F^n)$.


$$\operatorname{div}\,\mathbf{F} = \nabla\cdot\mathbf{F}=\frac{\partial F_1}{\partial x_1}+\frac{\partial F_2}{\partial x_2}+\cdots +\frac{\partial F_n}{\partial x_n} = \sum_{i=1}^n\frac{\partial}{\partial x_i}F^i$$
