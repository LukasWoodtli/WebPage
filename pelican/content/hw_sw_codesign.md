Title: Hardware-Software Codesign
Date: 2015-11-15
Modified: 2015-11-15
Category: Computer Science
Tags: ETH

[TOC]

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

- Observer Pattern is not save!
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

## Specification and Description Language (SDL)

- Targeted at unambiguous specification and despription of systems
- *Asynchrnous* message passing
- Appropriate also for distributed systems
- Communication between FSMs (or processes)
    - meassge passing with FIFO queues
    - FIFOs can be indefinitely large
- Each process fetches entry from FIFO
    - if input enables transition it takes place
    - otherwise discard input
- All orders of events are legal: different correct behaviour in simulators (not deterministic)

## Dataflow Languages

- Imperative language style (*program counter*)
- Movement of data is priority
- Scheduling: responsibility of the system (not the programmer)

- Basic characteristics:
    - all processes run 'simultaneously'
    - Processes can be described with imperative code
    - Processes can **only** communicate through buffers
    - Sequence of read tokens is same as of read tokens
- Useful for applications that deal with streams of data
    - Concurrent: maps to parallel hardware
    - Perfect for block-diagram specifications (control systems, signal processing)

### Kahn Process Networks

- General-purpose scheme for parallel programming
    - *read*: destructive and blocking (reading empty channel blocks until data is available)
    - *write*: non-blocking
    - *FIFO*: infinite size
- Unique attribute: *determinate*

#### Determinacy

- Random: knowing about system and inputs is not sufficient to determin output
- Determinate: the histories of *all channels* depend only on the histories of the *input channels*
- Importence
    - Functional behaviour is independent of timing (scheduling, communication time, execution time of processes)
    - Separation of functional properties and timing

#### Adding Non-Determinacy

- Several possibilities
    - Allow processes to test for empty queues
    - Allow multiple processes to write to or read from one channel
    - Allow processes to share a variable (memory)

### Synchronous Dataflow (SDF)

- Restriction of Kahn Networks to allow compile-time scheduling
- Each process reads and writes a *fixed number of tokens* each time it fires
- Firing is an atomic process
- Schedule can be determined completely at compile-time
- Steps:
    1. Establish relative execution rates (solving a system of linar blancing equations)
    2. Determine periodic schedule by simulating system for a single round


<!-- Week 05 - 14.10.15 -->

<!-- Beginning of Notes Week 5 -->
<!-- Beginning of Slides 3 -->

# 3. Mapping Application to Architecture

System synthesis from specification

- Allocation: Select components (HW)
- Binding: Bind SW (Application) to HW (Components)
- Scheduling: Executing code

> Mapping = Binding + Scheduling

## Specification Examples

### Data-Flow Graph (DFG)

    :::c
    x = *3a + B*b - c;
    y = a + b*x;
    z = b - c*(a + b);

- no loops
- parallelism

### Control-Flow Graph (CFG)

    :::c
    what_is_this {
        read(a, b);
        done = FALSE;
        repeat {
            if (a>b)
                a = a-b;
            else if (b>a)
                b = b-a;
            else done = TRUE;
        } until done;
        write(a);
    }

- State machine
- Contional branches


## Architecture Specification

- Reflects structure and properties of underlying platform
- Can be done at different abstraction levels

## Mapping Specification

Mapping: application and architecture specification

- *binds* processes to proressors
- *binds* communication between processes to architecture communication paths
- specifies *resource sharing* and *scheduling*

<!-- 10:00 -->
