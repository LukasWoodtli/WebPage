Title: SystemC
Category: Programming
Tags: Computer Science, C++, Embedded Systems
Date: 2016-02-15
Modified: 2016-02-19

SystemC is a system-level modeling language. It's implemented as a C++ library.

The library is open source and platform independent.

It contains an event-driven simulation kernel for executing models.

[Accellera](http://accellera.org/) is the main resource for SystemC.

# Simulation

SystemC contains a kernel for discrete-event driven simulation.
The main purpose of the kernel is to ensure to model concurrent activities (parallelism) correctly.


The simulation clock represents the current value of the simulation time.


![Simulation Engine](/images/systemc_simulation_engine.svg){: style="float:right"}


- Initialization of simulation model
    - Set initial states of subsystem modules
    - Fill event queue with initial events
- Timing routine
    - Determine *next* event from event queue
    - Advance simulation clock to the time when the event is to occur
- Event routine
    - Update the system state when a particular type of event occurs

A more detailed description can be found on the [Doulos tutorial](https://www.doulos.com/knowhow/systemc/tutorial/primitive_channels/):

1. Initialization: execute all processes (except `SC_CTHREAD`s) in any (undefined) order
2. Evaluation: select a process (ready to run) and resume its execution
    - This may cause immediate event notifications to occur
    - which may result in additional processes being made ready to run in this same phase
3. Repeat step 2. until there are no processes ready to run
4. Update: execute all pending calls to `update()` resulting from calls to `request_update()` made in step 2.
5. If there were any delta event notifications made during steps 2. or 4.
    - determine which processes are ready to run due to all those events and go back to step 2.
6. If there are no timed events: simulation is finished
7. Advance the simulation time to the time of the earliest pending timed event notification
8. Determine which processes are ready to run due to all the timed events at what is now the current time
    - go back to step 2.


(note: the list above is taken mostly from the Doulos tutorial)

## Delta Cycle

Within the same simulation cycle *cause* and *effect* events may share the same time of occurrence.

The simulator uses a zero duration *virtual time interval*: delta cycle

The delta cycle is the smallest simulated time slot. It consist of two phases:

1. Evaluation phase
2. Update phase

Separating the two phases makes it possible to guarantee deterministic behavior.
A channel will not change it's value until the update phase occurs.
It cannot change the value during the evaluation phase.

It's possible to run a process without the update phase (without the delta cycle) with `notify()`.

# Constructs

## Modules

Building blocks of SystemC models.

- Hierarchy (subsystems)
- Abstraction
- IP reuse

Modules are called by the simulation engine if an relevant event is scheduled.

Modules process events, manipulate the event queue and contain (and manipulate) the system state.

## Processes

Processes must be contained in a module.

- `SC_THREAD`
    - Typically called once, run in an endless loop
    - Can be suspended with `wait()`
    - Keep the state of execution implicitly
- `SC_METHOD`
    - Execute repeatedly form beginning to end
    - Simulate *faster*
    - Do *not* keep state of execution implicitly

### Wait and Notify

- wait: halt process execution until an event is raised
    - `wait()`
    - wait with arguments: dynamic sensitivity
        - `wait(sc_event)`
        - `wait(time)`
        - `wait(time_out, sc_event)`
- notify: raise an event (method of `sc_event` class)
    - `my_event.notify()`: immediate notification. Processes sensitive to the event will run during current evaluation phase
    - notify with arguments: delayed notification
        - `my_event.notify(SC_ZERO_TIME)`: notify during evaluation phase of next delta cycle
        - `my_event.notify(time)`: notify after *time* (in evaluation phase of that delta cycle)
    - notify allows non-deterministic behavior

## Communication

- Event
    - Flexible
    - low-level synchronization primitive
- Channel
    - Container for
        - Communication and
        - Synchronization
    - Can have state (private data), transport data/events
    - Implement one or more *interfaces*
- Interface
    - Set of access methods to channel
    - Interface methods need to be implemented (pure virtual)

Other communication and synchronization models can be built
based on these primitives.


### Channels

- Separating communication from behavior
- Interfaces define access to channel
- Ports are used to access the channel

# Non-Determinism

SystemC allows for non-determinism. This might not be acceptable for hardware modeling.
But it can be needed for software system modeling.

An example of non-determinism can be found here: [Doulos: Primitive Channels and the Kernel](https://www.doulos.com/knowhow/systemc/tutorial/primitive_channels/).

It shows two threads (`SC_THREAD`s) in a module that both access the same variable. It's not known in
which order the variable is accessed.

In software systems a mutex might be needed to control the access to the variable.



