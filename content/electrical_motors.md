---
title: Electrical Motors
category: Mechanics
---

> This page is work in progress


# AC Motors

High power, single- or multi-phase, constant torque and speed, large loads

# DC Motors

Normal DC motors almost linear characteristics:

- rotation speed determined by applied DC voltage
- output torque determined by current

Speed: few rpm (revolutions per minute) to many thousands rpm


## Brushed Motor

Cheap, small, easy to control

## Brushless Motors

Use Hall effect switches for stator field rotation sequence, smaller, more efficient, better torque/speed characteristics, more expensive than brushed motors

## Servo Motors

Brushed motor with positional feedback control, can be controlled by PWM.

A DC (RC) Servo Motor consists of a DC motor, gearbox, position feedback device and error correction (closed loop control).


## Stepper Motor

Accurate positioning, fast response to starting, stoping and reversing.


# Low-Level Control

A motor usually doesn't produce the exact force or torque requested.
So different approaches are used to control the motors at low-level.

## Current Control of Direct-Drive Motor

- Motor with no gearhead
- Controlled by an amplifier
- Torque: $\tau = k_t I$
  - Torque is (approximately) proportional to the current through motor
- Current sensor used to measure actual current
- Local feedback runs at higher rate than high-level control loop
  - Typical example:
    - $10 kHz$ for low-level control
    - $1 kHz$ for high-level control
- Cons:
  - Ungeared motors are large for sufficient torque 

## Current Control of Geared Motor

- Similar to Current Control of Direct-Drive Motor
- Motor with gearhead increase available torque (gear ratio $G \gt 1$)
- Pros:
  - Smaller motors for necessary torque
  - Motor operates at higher speed: more efficient
- Cons:
  - Backlash and friction due to gearhead
  - Backlash can be nearly eliminated by harmonic drive gears

## Current Control of a Geared Motor with Local Strain Gauge Feedback

- Similar to Current Control of Geared Motor
- Harmonic drive gearing instrumented with strain gauges to sense torque
- Pros:
  - Sensor at output allows compensation of friction
- Cosn:
  - Additional complexity

## Series Elastic Actuator (SEA)

- Electric motor with
  - Gearhead (often harmonic drive gearhead)
  - Torsional spring attaching output of gearhead to output of actuator
- Pros:
  - Torsional spring makes joint naturally "soft"
  - Protects gearing and motor from shocks at output
- Cons:
  - Additional complexity
  - More challenging to control high-speed or high-frequency at output

# Literature

[Modern Robotics: Mechanics, Planning, and Control](http://hades.mech.northwestern.edu/index.php/Modern_Robotics) by Kevin M. Lynch and Frank C. Park, Cambridge University Press, 2017
