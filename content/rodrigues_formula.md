Title: Exponential Coordinates of Rotations (Rodrigues' formula) 
Category: Mathematics
Tags: Robotics

# Axis-Angle Representation of Rotation

An alternative representation to rotation matrices is the **axis-angle** representation in the form:

$$\hat{\omega}\theta \in \mathbb{R}^3$$

Where:

- $\hat{\omega} \in \mathbb{R}^3$: Rotation axis (unit vector: $\left\|\hat{\omega}\right\| = 1$)
- $\theta \in \mathbb{R}$: Rotation angle

# Exponential Coordinates of Rotation

If a frame (initially coincident with the identity matrix $I$) rotates about $\hat{\omega}$ for $\theta$ units of time (i.e. $\hat{\omega}$ is integrated over that time interval) the final position would be expressed by the rotation matrix $R$.

## Matrix Exponential (Rodrigues' formula)

From the **axis-angle**  $[\hat{\omega}]\theta =[\hat{\omega}\theta] \in so(3)$ representation the matrix exponential (rotation matrix) can be calculated:

$$Rot(\hat{\omega}, \theta) = e^{[\hat{\omega}]\theta} =I+\sin(\theta)[\hat{\omega}]+(1-\cos(\theta))[\hat{\omega}]^{2}$$

With:

- $Rot(\hat{\omega}, \theta) \in SO(3)$: Matrix exponential of $\hat{\omega}\theta$
- $\hat{\omega} \in \mathbb{R}^3$: Rotation axis (unit vector)
- $\theta\in \mathbb{R}$: Rotation angle
- $[\hat{\omega}]\theta = [\hat{\omega}\theta] \in \mathbb{R}^3$: Skew-symmetric matrix form of axis-angle representation

The matrix exponential is used to construct a rotation matrix from a rotation axis $\hat{\omega}$ and an angle of rotaion $\theta$. The resulting rotation matrix represents the final orientation. The initial orientation is the identity matrix $I$.

Exponentiation integrates the angular velocity $\hat{\omega}$ for time $\theta$ seconds going from the identity matrix $I$ to the final rotation matrix $R$.

Exp: $[\hat{\omega}]\theta \in so(3) \rightarrow R \in SO(3)$

> Matrix exponential is like integration

### Rotation of a Vector

$e^{[\hat{\omega}]\theta}p$ has the effect of rotating $p \in \mathbb{R}^3$ about the *fixed frame* axis $\hat{\omega}$ by angle $\theta$.

## Rotation of a Frame

$R' = e^{[\hat{\omega}] \theta} R = Rot(\hat{\omega}, \theta)R$ is the orientation achieved by rotating $R$ by $\theta$ about the axis $\hat{\omega}$ in the *fixed frame*.


$R'' = Re^{[\hat{\omega}] \theta} = R Rot(\hat{\omega}, \theta)$ is the orientation achieved by rotating $R$ by $\theta$ about the axis $\hat{\omega}$ in the *body frame*.

## Logarithm

The inverse of th matrix exponential (matrix logarithm) takes a rotation matrix $R$ and returns the skew-symmetric representation of the exponential coordinates that achieve it starting from the identity orientation $I$.

It returns the angular velocity and the integration time that achieves the rotation matrix $R$.

The matrix logarithm is an algorithm that inverts Rodrigues' formula:

1. if $R = I$ then $\theta = 0$ and $\hat{\omega}$ is undefined
2. else if $tr R = -1$ then $\theta = \pi$ and $\hat{\omega}$ is one of the following (choose a feasible solution):
    - $$\hat{\omega} = \frac{1}{\sqrt{2(1 + r_{33})}}\begin{bmatrix} r_{13}\\r_{23}\\ 1 + r_{33}\end{bmatrix}$$
    - $$\hat{\omega} = \frac{1}{\sqrt{2(1 + r_{22})}}\begin{bmatrix} r_{12}\\1+r_{22}\\ r_{32}\end{bmatrix}$$
    - $$\hat{\omega} = \frac{1}{\sqrt{2(1 + r_{11})}}\begin{bmatrix} 1+ r_{11}\\r_{21}\\ r_{31}\end{bmatrix}$$
3. otherwise $\theta = cos^{-1}(\frac{1}{2}(tr R - 1)) \in [0, \pi)$ and $[\hat{\omega}] = \frac{1}{2 sin \theta}(R - R^T)$

> If $\hat{\omega}$ is a solution so is $-\hat{\omega}$ as well

Every $R \in SO(3)$ satisfies one of the three cases of the algorithm.
That means that for every $R$ there exists a matrix logarithm $[\hat{\omega}]\theta$ and thus also a set of exponential coordinates $\hat{\omega}\theta$.


Log: $R \in SO(3) \rightarrow [\hat{\omega}]\theta \in so(3)$

> Matrix log is like differentiation
 