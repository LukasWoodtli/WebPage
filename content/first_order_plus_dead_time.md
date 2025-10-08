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

The values of $K_p$, $\tau_p$ and $\theta_p$ are usually found with data from a step response, by minimizing the error.

# Controller Tuning

For tuning a FOPDT based controller, the values of $K_p$, $\tau_p$ and $\theta_p$ can be used for a correlation.

# P-Control

## Integral of Time-weighted Absolute Error (ITAE)

There are two variants:

- Set point tracking (servo control): $K_c = \frac{0.20}{K_p}\left(\frac{\tau_p}{\theta_p}\right)^{1.22}$
- Disturbance rejection (regulatory control): $K_c = \frac{0.50}{K_p}\left(\frac{\tau_p}{\theta_p}\right)^{1.08}$

# PI-Control

## Internal Model Control

$$K_c = \frac{1}{K_p}\frac{\tau_p}{\left( \theta_p + \tau_c \right)}$$

with: $\tau_I = \tau_p$

- Aggressive tuning: $ \tau_c = \max \left( 0.1 \tau_p, 0.8 \theta_p \right)$
- Moderate tuning: $ \tau_c = \max \left( 1.0 \tau_p, 8.0 \theta_p \right)$
- Conservative tuning: $ \tau_c = \max \left( 10.0 \tau_p, 80.0 \theta_p \right)$

## Integral of Time-weighted Absolute Error (ITAE)


- Set point tracking (servo control):
  - $K_c = \frac{0.586}{K_p}\left(\frac{\theta_p}{\tau_p}\right)^{-0.916}$
  - $\tau_I = \frac{\tau_p}{1.03-0.165\left(\theta_p/\tau_p\right)}$
- Disturbance rejection (regulatory control):
  - $K_c = \frac{0.859}{K_p}\left(\frac{\theta_p}{\tau_p}\right)^{-0.977}$
  - $\tau_I = \frac{\tau_p}{0.674}\left(\frac{\theta_p}{\tau_p}\right)^{0.680}$

# PID-Control

$$u(t) = K_P \cdot e(t) + K_I\cdot \int_0^t e(t)\;dt + K_D \frac{d\,e(t)}{dt}$$

## Internal Model Control

$$K_c = \frac{1}{K_p}\frac{\tau_p}{\left( \theta_p + \tau_c \right)}$$

$$\tau_I = \tau_p + 0.5\theta_p$$

$$\tau_D = \frac{\tau_p\theta_p}{2\tau_p + \theta_p}$$

- Aggressive tuning: $ \tau_c = \max \left( 0.1 \tau_p, 0.8 \theta_p \right)$
- Moderate tuning: $ \tau_c = \max \left( 1.0 \tau_p, 8.0 \theta_p \right)$
- Conservative tuning: $ \tau_c = \max \left( 10.0 \tau_p, 80.0 \theta_p \right)$
