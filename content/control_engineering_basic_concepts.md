---
title: Control Engineering Basic Concepts
category: Robotics
tags: [Control Systems, Robotics]
---

# Ordinary Differential Equation

- Mathematical description of physical system
- $a_ny^{(n)} + ... + a_1\dot{y} + a_0y = b_qu^{(q)} + ... + b_1\dot{u} + b_0u$

# State-space representation

- Matrix form ($A, B, C, D$)
- Used in Modern Control Engineering
- [State-space representation](/blog/state_space_representation)

# Transfer Function (Übertragungsfunktion)

- Describes the dynamic behavior of a system over time
- Provides a calculation oof the output signal from any input signal
- Laplace transform of the impulse response
- Denoted: $G(s)$

# Impulse Response (Gewichtsfunktion, Impulsantwort)

- Output signal for a Dirac impulse at input
- Completely describes an LTI (Linear Time-Invariant) system
- Denoted: $g(t)$

# Step Response (Sprungantwort, Übergangsfunktion)

- Technically easy to generate, used instead of impulse response
- Completely describes an LTI (Linear Time-Invariant) system
- Denoted: $h(t)$

# Frequency Response (Frequenzgang)

- Relationship between input/output of an LTI system
- Amplitude and phase (Complex quantity)
- Fourier transform of the impulse response
  - Analysis tools: Bode plot and Nyquist plot
- Denoted: $G(j\omega)$

# Block Diagrams

- Used to analyze and model systems
- Can be split into smaller subgroups
- Can be combined to form larger systems
