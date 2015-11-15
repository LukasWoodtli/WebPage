Title: Hardware-Software Codesign
Date: 2015-11-15
Modified: 2015-11-15
Category: Computer Science
Tags: ETH

# 1. Introduction

## System Design

- Specifications and Models
- Design
- Estimation

## Embedded Systems

- Information processing system embedded in a larger product
- Interface to outside world
    - external process
    - Sensors, actors
    - Human interface
- Technical environment does not forgive errors
- Stricter requirements (usually update not possible)

> TODO: Difference Embedded Systems <-> General Purpose Computing

- Levels of abstraction (from higher to lower)
    - Transistors
    - Gates
    - Processor (Memory, Register, ALU, ...)
    - Architecture (CPU, ASIC, FPGA, LAN, ...)
    - Distributed System
- Design aspects look similar in every level
- Design goes usually from higher abstraction level to lower level
- Abstraction: leave out (unimportant) details
- System level design:
    - SW Synthesis (compile)
    - HW Synthesis
    - Interfaces
- Estimation
    - Different solutions for a specific task
    - Precision of estimation is different on each level
        - Higher level estimation usually less precise than lower level
- **Mapping** parts of specification to different parts of the system
    - Similar to scheduling but bigger design space (including HW)
- Specification: in embedded systems higher requirements to correctness
- Specific languages:
    1. Developer is restricted (lesser errors)
    2. Better code generator/synthesizer

> Doing things right is difficult!

- Observer Oattern is not save!
    - Race conditions
    - Dead-Locks
    - Use non-locking algorithms!





<!-- Week 05 - 14.10.15 -->

> Mapping = Binding + Scheduling

Binding: Bind SW (Application) to HW (Components)