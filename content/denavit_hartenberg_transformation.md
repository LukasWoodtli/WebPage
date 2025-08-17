---
title: Denavit–Hartenberg Transformation
category: Robotics
tags: [Control Systems, Robotics]
---

# DH - Parameters

- Serial-link manipulator
  - Links are rigid
  - Joints connect links
    - can move
    - revolute or prismatic
- Every link connects 2 joints
  - except the first and last link
- Every joint connects 2 links

## Numbering Links and Joints

- $N+1$ Links ($0 \dots n$)
  - First link: (link $0$) base
  - Last link $n$: end effector
- $N$ Joints ($0 \dots n$)

## Coordinate Frames

- Start at base
- - Attach a coordinate frame to the end of every link
- Enumerate joints and links
  - Base: $0$
  - Joint $j$ connects joint $j$ with joint $j-1$
- Base frame $\{0\}$:
  - $z_0$ aligns with axis of first link
- Generally: $z_j$ axis aligns with $j+1$ joint axis
- $x_j$ axis:
  - Along normal between $z_{j-1}$ and $z_j$ axis
  - Point from joint $j$ to joint $j+1$

> The link frame is not necessarily located on the link

## Parameters

- Describe pose of a link $j$ with respect to previous link frame $\{j-1\}$
- Only 4 parameters: $a$, $\alpha$, $d$ and $\theta$
- DH notation: constraints
  - Axis $x_j$ intersects $z_{j-1}$
  - Axis $x_j$ is perpendicular to $z_{j-1}$
- Axis of each joint defined by $z$-axis of previous coordinate frame
  - Revolute: rotates about $z$-axis
  - Prismatic: translates about $z$-axis
- Define coordinate system $\{j\}$
  - $z_j$ axis: axis of movement of joint ($j+1$) for end of link
  - Origin of $\{z_j\}$ frame: intersection point of $z_j$ with common normal of $z_{j-1}$ and $z_j$
  - $y$ axis is not considered (defined by $x$ and $z$ axes, through right-handed coordinate system)


| What        | Symbol     | Description                                                                                                        | Variable / Constant                  |
|-------------|------------|--------------------------------------------------------------------------------------------------------------------|--------------------------------------|
| Link Length | $a_j$      | Distance between $z_j$ and $z_{j+1}$ along $x_{j+1}$ axis. For intersecting axes: parallel to $z_j \times z_{j+1}$ | Constant                             |
| Link Twist  | $\alpha_j$ | Angle from $z_j$ axis to $z_{j+1}$ axis about $x_{j+1}$ axis                                                       | Constant                             |
| Link Offset | $d_j$      | Distance from origin of frame $\{j\}$ to $x_{j+1}$ axis along $z_j$ axis                                           | Constant or prismatic joint variable |
| Joint Angle | $\theta_j$ | Angle between $x_j$ and $x_{j+1}$ about $z_{j-1}$ axis                                                             | Revolute joint variable or constant  |
| Joint Type  | $\sigma_j$ | $\sigma_j = R$ for revolute, $\sigma_j = P$ for prismatic                                                          | Constant: $R=0$, $P=1$               |
