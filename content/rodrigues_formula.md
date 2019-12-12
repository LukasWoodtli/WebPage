Title: Exponential Coordinates of Rotations (Rodrigues' formula) 
Category: Mathematics
Tags: Robotics

# Rodrigues' formula
Given a vector $\hat{\omega}\theta \in \mathbb{R}^3$ such tha $\theta$ is a scalar and $\hat{\omega}$ is a unit vector in $\mathbb{R}^3$, the matrix exponential of $[\hat{\omega}]\theta = [\hat{\omega}\theta] \in so(3)$ is:

$$Rot(\hat{\omega}, \theta) = e^{[\hat{\omega}]\theta} \exp(\hat{\omega}, \theta)=I+\sin(\theta)[\hat{\omega}]+(1-\cos(\theta))[\hat{\omega}]^{2}$$

With:

- $Rot(\hat{\omega}, \theta) \in SO(3)$
- $\hat{\omega}$ rotation axis
- $\theta$ rotation angle

## Rotation of a Vector
$e^{[\hat{\omega}]\theta}p$ has the effect of rotating $p \in \mathbb{R}^3$ about the *fixed frame* axis $\hat{\omega}$ by angle $\theta$.

## Rotation of a Frame

$e^{[\hat{\omega}] \theta} R = Rot(\hat{\omega}, \theta)R$ is the orientation achieved by rotating $R$ by $\theta$ about the axis $\hat{\omega}$ in the *fixed frame*.


$Re^{[\hat{\omega}] \theta} = R Rot(\hat{\omega}, \theta)$ is the orientation achieved by rotating $R$ by $\theta$ about the axis $\hat{\omega}$ in the *body frame*.


## Exponentiation

Exponentiation integrates the angular velocity $\hat{\omega}$ for time $\theta$ seconds going from the identity matrix $I$ to the final rotation matrix $R$.

Exp: $[\hat{\omega}]\theta \in so(3) \rightarrow R \in SO(3)$

> Matrix exponential is like integration


## Logarithm

The inverse of th matrix exponential (matrix logarithm) takes a rotation matrix $R$ and returns the skew-symmetric representation of the exponential coordinates that achieve it starting from the identity orientation $I$.

Log: $R \in SO(3) \rightarrow [\hat{\omega}]\theta \in so(3)$

> Matrix log is like differentiation
 
It returns the angular velocity and the integration time that achieves the rotation matrix $R$.

The matrix logarithm is an algorithm that inverts Rodrigues' formula.
