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

[Data Flow Graph on Wikipeida](https://en.wikipedia.org/wiki/Data_flow_diagram)

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

[Control Flow Graph on Wikipedia](https://en.wikipedia.org/wiki/Control_flow_graph)

## Architecture Specification

- Reflects structure and properties of underlying platform
- Can be done at different abstraction levels

## Mapping Specification

Mapping: application and architecture specification

- *binds* processes to proressors
- *binds* communication between processes to architecture communication paths
- specifies *resource sharing* and *scheduling*


![Partitioning and Mapping](/images/hscd_partitioning_mapping.svg)

<!-- TODO: Repeat Slides 3-10 to 3-14 -->


# 4. System Partitioning


> Partitioning: Given a set of objects: Partition this set in subsets.

> Mapping: Subset is mapped to specific resource.


## Mapping at different Levels

### Low Level

- Register Transfer Level (RTL) or Netlist Level
- Split a digital circuit and map it to several devices (FPGAs, ASICs)
- System parameters (e.g., area, delay) relatively easy to determine

### High Level

- System Level
- Comparison of design alternatives for optimality (design space exploration)
- System parameters are unknown and difficult to determine
    - to be estimated via analysis, simulation, (rapid) prototyping

## Cost Functions

- system cost (*C[$]*)
- latency (*L[sec]*)
- power consumption (*P[W]*)
- ...


### Estimation

Estimation is required to find *C*, *L*, *P* values, for each design point

i.e

$$f(C,L,P)= k_1 \cdot h_C(C,C_{max})+ k_2 \cdot h_L(L,L_{max})+ k_3 \cdot h_P(P,P_{max})$$

- $h_C$, $h_L$, $h_P$: denote how strong $C$, $L$, $P$ violate design constraints $C_{max}$, $L_{max}$, $P_{max}$
- $k_1$, $k_2$, $k_3$: weighting and normalization

### The Formal Partitioning Problem

Assign $n$ objects $O= \{  o_1, \cdots , o_n \}$ to $m$ blocks (also called partitions)
$P= \{  p_1, \cdots , p_m \}$, such that

- $p_1 \cup p_2 \cup \cdots \cup p_m = O$ (all objects are assigned - mapped)
- $p_i \cap p_j = \{ \}\; \forall i,j:i\neq j$ (an object is not assigend or mapped twice)
- and costs $c(P)$ are minimized


### Partitioning Methods

Exact vs. Heuristic Methods:

- Exact provides optimal solution (or set of solutions)
- Heuristic provides a 'good' solution but not best

Overview: 
- Exact Methods
    - Enumeration
    - Integer linear programs (ILP)
- Heuristic
    - Constructive Methods
        - Random mapping
        - Hierarchical clustering
    - Iterative methods
        - Kerninghan-Lin algorithm
        - Simulated annealing
        - Evolutionary algorithm

#### Hierarchical Clustering

- Combine always 2 nodes
- Then recalculate
- Repeat until goal achieved
- Steps can be visualized in a tree diagram


### Integer Linear Programming (ILP)

- Exact method
- Objective function
- Constraints

Objective:

$$C = \sum_{x_i\in X}a_ix_i\; with\; a_i \in \mathbb{R}, x_i \in \mathbb{N}$$

Constraints:

$$\forall j \in J: \sum_{x_i \in X}b_{i,j}x_i \geq c_j \; with \; b_{i,j}, c_j \in \mathbb{R}$$

Integer programming problem:
- Minimize objective function subject to constraints


<!-- End of Notes Week 5 -->

<!-- Beginning of Notes Week 6 -->


#### Example for Partitioning

- optimize for a load balanced system

Scheduling:

| Task       | t0 | t1 | t2 | t3 |
|------------|----|----|----|----|
| Processor0 | 1  | 1  | 0  | 0  |
| Processor1 | 0  | 0  | 1  | 1  |


Run Times:

| Run time   | t0 | t1 | t2 | t3 |
|------------|----|----|----|----|
| Processor0 | 5  | 15 | 10 | 30 |
| Processor1 | 10 | 20 | 10 | 10 |

Cost $c_{i,k}$:

$$\left.\begin{matrix}
c_{0,0} = 5\\
c_{0,1} = 10\\
\cdots
\end{matrix}\right\}
\begin{matrix}
0 \leq i \leq 3\\
0 \leq k \leq 1
\end{matrix}$$

Binary variables $x_{i,k}$:

$$\left.\begin{matrix}
x_{0,0} + x_{0,1} = 1\\
x_{1,0} + x_{1,1} = 1\\
\cdots
\end{matrix}\right\}
\sum_{k=0}^1 x_{k,i} = 1\; \forall\; 0 \leq i \leq 3$$


#### Aproaches

1. Aproach:

$$min\left \{ \sum_{i=0}^3 \sum_{k=0}^1 c_{i,k} x_{i,k} \right \}$$

2. Aproach:

$$min\left \{ \left | \sum_{i=0}^3  c_{i,0} x_{i,0} - \sum_{i=0}^3 c_{i,1} x_{i,1} \right |\right \}$$

This is not a linear problem!

#### Solutions

1. Solution:

Solving 2 linear problems: split aproach 2 into 2 linear problems:

$$min\left \{ \left | \underbrace{\sum_{i=0}^3  c_{i,0} x_{i,0}}_{l_1} - \underbrace{\sum_{i=0}^3 c_{i,1} x_{i,1}}_{l_2} \right |\right \}$$

Becomes:

$$\begin{matrix}
l_0 \geq l_1: min\left \{ l_0 - l_1 \right \} \\
l_1 \geq l_0: min\left \{ l_1 - l_0 \right \} 
\end{matrix}$$


2. Solution:

Empirical aproach: Run code and measure execution time and try to minimize it.

Move tasks to different processors.

$$\begin{matrix}
l_0 = \sum_{(i)}  c_{i,0} x_{i,0}\\ 
l_1 = \sum_{(i)}  c_{i,1} x_{i,1}
\end{matrix}$$


$$min{B}$$

$$\begin{matrix}
B \geq l_0 \\ 
B \geq l_1
\end{matrix}
$$


<!-- Notes Week 6 30:00 -->


<!--

Topics
------
- Architecture Graph (problem Graph)
- Specification Graph
- Closeness Function


-->
