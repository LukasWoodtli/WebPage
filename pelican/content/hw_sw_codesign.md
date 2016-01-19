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
    - Worst-Case Execution Time Analysis
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
| Few Applications, known at design-time | Broad class of applications |
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
    - Behavioral
    - Structural
- Timing
- State oriented behavior (micro controller, FPGA)
- Dataflow oriented behavior (DSP)

## State Charts

- Classical automata (Moore/Mealy): FSM
- State: **Information** needed to get (determine) the output form the input
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
    3. Simultaneously make transition and apply the actions
        - Execute the right hand side of action simultaneously and assign then after

## Specification and Description Language (SDL)

- Targeted at unambiguous specification and description of systems
- *Asynchronous* message passing
- Appropriate also for distributed systems
- Communication between FSMs (or processes)
    - message passing with FIFO queues
    - FIFOs can be indefinitely large
- Each process fetches entry from FIFO
    - if input enables transition it takes place
    - otherwise discard input
- All orders of events are legal: different correct behavior in simulators (not deterministic)

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

- Random: knowing about system and inputs is not sufficient to determine output
- Determinate: the histories of *all channels* depend only on the histories of the *input channels*
- Importance
    - Functional behavior is independent of timing (scheduling, communication time, execution time of processes)
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
    1. Establish relative execution rates (solving a system of linear balancing equations)
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

[Data Flow Graph on Wikipedia](https://en.wikipedia.org/wiki/Data_flow_diagram)

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
- Conditional branches

[Control Flow Graph on Wikipedia](https://en.wikipedia.org/wiki/Control_flow_graph)

## Architecture Specification

- Reflects structure and properties of underlying platform
- Can be done at different abstraction levels

## Mapping Specification

Mapping: application and architecture specification

- *binds* processes to processors
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
- $p_i \cap p_j = \{ \}\; \forall i,j:i\neq j$ (an object is not assigned or mapped twice)
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


#### Approaches

1. Approach:

$$min\left \{ \sum_{i=0}^3 \sum_{k=0}^1 c_{i,k} x_{i,k} \right \}$$

2\. Approach:

$$min\left \{ \left | \sum_{i=0}^3  c_{i,0} x_{i,0} - \sum_{i=0}^3 c_{i,1} x_{i,1} \right |\right \}$$

This is not a linear problem!

#### Solutions

1\. Solution:

Solving 2 linear problems: split approach 2 into 2 linear problems:

$$min \left \{ \left | \underbrace{\sum_{i=0}^3  c_{i,0} x_{i,0}}_{l_1} - \underbrace{\sum_{i=0}^3 c_{i,1} x_{i,1}}_{l_2} \right | \right \}$$

Becomes:

$$\begin{matrix}
l_0 \geq l_1: min\left \{ l_0 - l_1 \right \} \\
l_1 \geq l_0: min\left \{ l_1 - l_0 \right \}
\end{matrix}$$


2\. Solution:

Empirical approach: Run code and measure execution time and try to minimize it.

Move tasks to different processors.

$$\begin{matrix}
l_0 = \sum_{(i)}  c_{i,0} x_{i,0}\\
l_1 = \sum_{(i)}  c_{i,1} x_{i,1}
\end{matrix}$$


$$min \{ B \}$$

$$\begin{matrix}
B \geq l_0 \\
B \geq l_1
\end{matrix}
$$


### Iterative Methods

Often used principle:

- Start with some initial configuration (partitioning)
- search neighborhood (similar partitions)
    - select a neighbor as candidate
- evaluate *fitness* (cost) function of candidate
    - accept candidate using acceptance rule
    - if not, select another neighbor
- Stop if:
    - Quality is sufficient or
    - no improvement can be found or
    - after a fixed time

Ingredients:

- initial configuration
- function to find a neighbor as candidate
- cost function
- acceptance rule
- stop criterion

Disadvantages:

- local optimum as best result
- local optimum depends on initial configuration
- generally no upper bound on iteration length

#### Kernighan-Lin

- as long as a better partition is found
    - from all possible pairs of objects: *virtually* re-group the 'best' (lowest cost of resulting partition)
    - from the remaining (not yet touched) objects: *virtually* re-group the 'best' pair
    - continue until all objects have been re-grouped
    - from these n/2 partitions, take the one with smallest cost and *actually* perform the corresponding re-group operation

#### Simulated Annealing

- inspired by physical process
- replace existing solutions by (random) new feasible solutions form neighborhood
- always accept better solutions but allow for a guided acceptance for worse neighbors
- gradually cooling: gradually decrease the probability of accepting worse solutions

Advantage:
- Allowance for 'uphill' moves potentially avoids local optima

Possible implementation:

    :::python
    temp = temp_start
    cost = c(P)
    while Frozen() == False:
        while Equilibrium() == False:
            P_new = RandomMove(P)
            cost_new = c(P_new)
            deltacost = cost_new - cost
            if Accept(deltacost, temp) > random(0,1)
                P = P_new
                cost = cost_new
            temp = DecreaseTemp(temp)


Functions:

`RandomMove(P)`:

- Choose a random solution in the neighborhood of `P`

`DecreaseTemp()`, `Frozen()`:

- Cooling down. There are different choices. For example:
    - initially: `temp := 1.0`
    - in any iteration: `temp := alpha * temp` (typically: 0.8 $\leq$ `alpha` $\leq$ 0.99)
- Frozen
    - after a given time or
    - if there is not further improvement

`Equilibrium()`:

- Usually after a defined number of iterations

`Accept(deltacost, temp)`:

- $e^{- \frac{deltacost}{k \cdot temp}}$

Complexity:

- From exponential to constant depending on
`Equilibrium()`, `DecreaseTemp()` and `Frozen()`.

<!-- End of Slides 4 -->

<!-- Beginning of Slides 5 -->

# 5. Multi-Criteria Optimization

Part of system synthesis.

> *Exploration* of different solutions.

## Example: Network Processors

Network processor: High-performance, programmable device designed to efficiently execute communication workloads


- Given:
    1. Specification of the task structure (task model): tasks to be executed for each flow
    2. Different usage scenarios (flow model): sets of flows
- Sought:
    - Network processor implementation: architecture + task mapping + scheduling
- Objectives:
    1. Maximize performance
    2. Minimize cost
- Subject to:
    1. Memory constraint
    2. Delay constraint

## Basic Definition

- We intend to minimize a *vector-valued* ***objective function***

$$f= (f_1; f_2; ... ; f_n): X \rightarrow R^n$$

- $X$ denotes the **decision space**. i.e the feasible set of alternatives for the optimization problem
- The image of the decision space $X$ using the objective function $f$ is denoted as the **objective space** $Z \subset R^n$ with

$$Z = \{f(x) |x \in X  \}$$

- A single alternative $x \in X$ is (sometimes) named *solution* and the corresponding object value $z = f(x) \in Z$ is named *objective vector*

> decision space &rarr; objective space

Basic question:

How do we define the minimum of a vector-valued function?

## Pareto Dominance

Definition:

A solution $a \in X$ weakly *Pareto-dominates* a solution $b \in X$, denoted as $a \preceq  b$, if it is at least as good in
all objectives, i.e:

$$f_i(a) \leq f_i(b)\; \forall 1 \leq i \leq n$$


- Dominance is transitive
- A solution is named *Pareto-optimal*, if it's not Pareto-dominated by any other solution in $X$

### Optimization Alternatives

- Classical single objective optimization methods
    - Simulated annealing
    - Integer linear program
    - other constructive or iterative heuristic methods

&rarr; Decision making is done before the optimization


- Population based optimization methods
    - Evolutionary / genetic algorithms

&rarr; Decision making is done after the optimization

### Evolutionary Algorithms

Basic scheme (many variations exist):

1. A set of initial solution (initial population is chosen (usually at random). This set is called *parent* set.
2. Solutions form *parent* set are selected (*mating selection*)
3. Solutions from *mating selection* are changed using neighborhood operators (*cross-over* and *mutation* operators). The resulting set is called *children* set.
4. Determine union of the *parent* and the *children* sets
5. Solutions of the set from 4. are selected based on their merit to construct the new *parent* set (*environmental selection*).
6. continue at 2.


![Evolutionary Algorithm](/images/hscd_evolutionary_algorithm.svg){: style="float:right"}


- Cross-over operator: Take best parts of two solutions
- Mutation operator: same as in simulated annealing (make small variations)
- How to choose solutions that should be removed from the population
    - Solutions should be 'close' to the (unknown) Pareto-optimal front (optimality)
    - Solutions should cover large parts of the objective space (diversity)

#### Hypervolume Indicator

- Environmental selection:
    - Select subset of solutions that *maximizes hypervolume indicator*

Given a set of solutions $A \subseteq X$ and a set of *reference points* $R \subset \mathbb{R}^n$. Then the
*hypervolume indicator* $I_H(A,R)$ of $A$ with respect to $R$ is defined as

$$I_H(A,R) = \int_{z \in H(A,R)} dz$$

where $H(A,R)$ id the dominated space of $A$ regarding $R$:

$$H(A,R) = \{ z \in \mathbb{R}^n | \exists a \in A : \exists r \in R : (f(a) \leq z \leq r) \}$$

$z$: Objective

- The hypervolume indicator leads to *diversity* and *optimality*

#### Representation and Neighborhood

- A *representation* corresponds to an *abstract data* that encodes a *solution*
- *Neighborhood operators* work on *representations*

Issues:

- Each solution has an encoding (completeness)
- All solutions are represented equally often (uniformity)
- Each encoding maps to a feasible solution (feasibility)

Encoding: i.e order of tasks executing to explore scheduling.

<!-- End of Notes Week 7 -->

#### Tree Representation

- Solutions can be represented as tree structures
- Mutation:
    - Grow subtree
    - Shrink subtree
    - Switch two subtrees
    - Replace subtree
    - Subtrees can be single nodes


#### Handling Constraints

Constraint: $g(x) \geq 0$

- Feasible: $g \geq 0$
- Infeasible: $g < 0$

Approaches:

1. Representation is chosen such that decoding always yields a feasible solution
2. Construct initialization and neighborhood operators such that Infeasible solutions are not generated
3. Add only feasible solutions to children population
4. Preferably select feasible solutions in environmental selection
5. Penalty function:
    - Calculate constraint violation $g(x)$ and incorporate it into objective function
    - $penalty(x) > 0\; if g(x) < 0,\; penalty(x) = 0\; if g(x) \geq 0$
    - i.e add penalty function to every objective (increase 'price' for Infeasible solutions)
6. Include the constraints as new objectives


# 6. System Simulation

Estimation with simulation.

Estimation: find out if a solution is good or bad.

## System and Model

- System: Combination of components that act together
- Model: Formal description of the system (covers selected information)

## State

- Contains all information of the system at $t_0$ that is necessary to determine the output (for $t \geq t_0$) from the input (at (at $t \geq t_0$).

> Input + State = Output

- The set $X$ of all possible states of a system is called it's *state space*

## Discrete/Continuous Systems

Examples:

- Continuous state systems:
    - Physical processes (usually)
    - Electrical networks
    - Mechanical systems
- Discrete state systems
    - Finite state machines
    - Queuing systems
    - Computer systems
- Continuous time systems
    - Physical processes (usually)
    - Electrical circuits
    - Asynchronous systems
- Discrete time systems
    - Digital clocked system
    - Equidistant sampling (z-transform)
    - Synchronous system models

### Discrete Event Systems (DES)

- Driven by events
- Event: $e = (v, t)$ is a touple of a value $v$ and a tag $t$
    - Tags are usually totally ordered
    - If the tag denotes *time*, then the event is a *timed event*
    - If the tag (only) denotes a *sequence number*, the event is an *untimed event*

- DES is an event-driven system
    - Depends entirely on occurrence of discrete events
    - Does *not* depend on evolution of time
- Can be defined in *continuous* of *discrete time*
- The *state space* $X$ can be either discrete or continuous


- *Signals* or *streams* represent ordering/timing of events
- *Processes* are represented as functions acting on signals or streams

#### Simulation

- Discrete-time, time-driven
    - Simulated time is partitioned into equidistant time intervals
    - Length of time intervals determined by
        - The simulated system (i.e clock period)
        - The intended precision (dicretization loss)
        - The simulation effort
    - A simulation step is performed *even if nothing happens*

- Event-driven simulation
    - State change only at events
    - Analysis and simulation possible in *discrete* or *continuous* time

#### Discrete-Event Modeling and Simulation

- Concurrent processes are modeled using modules
    - *Behavior* described as logic/algebraic expressions
    - *State* described using persistent variables (inside module)
    - *Communication* between modules through ports, via signals
    - *Synchronization* through abstract events
- Modules can be hierarchical
- Event-Driven

##### Components of Discrete-Event Simulation

- Simulation time
    - Simulation clock represents the current value of simulation time
    - In discrete-event simulations the clock advances to the *next event start-time* during simulation
- Event list
    - Events are processed in order
    - Event list is typically organized as priority queue
    - Event lists may include simulation times when events will happen
- System modules
    - Model subsystems of simulated system
    - Are called by simulation engine if a relevant event is scheduled

##### Simulation Engine

1. Initialization routine
    - Initialize the simulation model;
        - Set initial states of subsystem modules
        - Fill the event queue with initial events
2. Timing routine
    - Determine *next event* from the event queue
    - Advance the simulation clock to the time when the event occurs
3. Event routine
    - Update *system state* when event occurs

- In a simulation cycle 'cause' and 'effect' can share the same time of occurrence
    - Use *zero duration virtual time interval* called **delta cycle** ($\delta$)

<!-- End of Notes Week 8 (morning) -->


<!--

Topics
------
- Architecture Graph (problem Graph)
- Specification Graph
- Closeness Function


-->
