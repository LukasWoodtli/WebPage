Title: Hardware-Software Codesign
Date: 2015-11-15
Modified: 2015-11-15
Category: Computer Science
Tags: ETH

# 0. Overview

- Specification and Models of Computation
    - State-Charts
    - Kahn Process Networks
- Design Space Exploration
    - Mapping
    - Partitioning
    - Multi-Criteria Optimization
- Performance Estimation
    - Simulation-based Methods
    - Worst-Case Execution Time Analyis
    - Performance Analysis of Distributed Systems
    - Thermal-aware Design

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

### Difference Embedded Systems &#8596; General Purpose Computing


| Embedded Systems                       | General Purpose Computing   |
|----------------------------------------|-----------------------------|
| Few Applications, knonw at design-time | Broad class of applications |
| Not programmable by end user           | Programmable by end user    |
| Fixed run-time requirement             | Faster is better            |



### Levels of abstraction (from higher to lower)
    - Transistors
    - Gates
    - Processor (Memory, Register, ALU, ...)
    - Architecture (CPU, ASIC, FPGA, LAN, ...)
    - Distributed System

### Design
- Design aspects look similar in every level
- Design goes usually from higher abstraction level to lower level
- Abstraction: leave out (unimportant) details
- System level design:
    - SW Synthesis (compile)
    - HW Synthesis
    - Interfaces

### Estimation
- Reason about solution
- Different solutions for a specific task
- Precision of estimation is different on each level
    - Higher level estimation usually less precise than lower level

### Mapping
- **Mapping** parts of specification to different parts of the system
    - Similar to scheduling but bigger design space (including HW)

### Specification
- Specification: in embedded systems higher requirements to correctness
- Specific languages:
    1. Developer is restricted (lesser errors)
    2. Better code generator/synthesizer

> Doing things right is difficult!

- Observer Oattern is not save!
    - Race conditions
    - Dead-Locks
    - Use non-locking algorithms!


# 2. Models of Computation

- Hierarchy
    - Behavioural
    - Structural
- Timing
- State oriented behaviour (micro controller, FPGA)
- Dataflow oriented behavour (DSP)

...

## State Charts

- Classical automata (Moore/Mealy): FSM
- State: **Information** needed to get (determin) the output form the input
- State Charts introduce hierarchy
    - Combining States with Sub-States in Super-States
    - Active States
    - Basic States (no Sub-States)
    - Super-States (ancestor states): OR-Super-States (hierarchy)
    - Default State, History State (can be combined)
    - AND-Super-States (concurrency)
- 2 distinct features form FSM
    - Hierarchy
    - Difference of Control-Path and Data-Path

- Communication between Control- and Data-Path
    - Control-Path to Data-Path: action
    - Data-Path to Control-Path: condition

- Events, Conditions, Actions

$$\underrightarrow{event [condtition] / action}$$

- No storage of events (only available for next step)
- Events are global

### Evaluation of State Charts

- Evaluation is **not** trivial!
- Three phases
    1. Event is emitted
    2. Transition is selected
    3. Simultaniously makte transition and apply the actions
        - Execute the right hand side of action simultaniously and assign then after



<!-- Week 05 - 14.10.15 -->

> Mapping = Binding + Scheduling

Binding: Bind SW (Application) to HW (Components)
