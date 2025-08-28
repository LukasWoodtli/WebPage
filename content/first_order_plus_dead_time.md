---
title: First-Order Plus Dead Time (FOPDT)
category: Robotics
tags: [Control Systems, Robotics]
---


Sometimes also referred to as the First-Order Plus Time Delay model.

It's often used to model the dynamic behavior of systems.

$$
\tau_p \frac{dy(t)}{dt} = -y(t) + K_p u(t - \theta_p)
$$

where:

* $y(t)$: The output of the system.
* $u(t)$: The input to the system.
* $K_p$: The process gain. Ratio of the change in the output to the change in the input ($\frac{\Delta y}{\Delta u}).$
* $\tau_p$: The time constant. How quickly the system's output responds to a change in the input. The time it takes to go from one steady state to another.
* $\theta_p$: The dead time (or time delay). The time lag between a change in the input and the start of the output's response.
