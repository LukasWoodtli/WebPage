Title: SystemC
Category: Computer Science
Tags: C++, Embedded Systems
Date: 2016-02-15
Modified: 2016-02-16

SystemC is a system-level modeling language. It's implemented as a C++ library.

The library is open source and platform independent.

It contains an event-driven simulation kernel for executing models.

[Accellera](http://accellera.org/) is the main resource for SystemC.

# Simulation

SystemC is a discrete-event driven simulation.

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

## Delta Cycle

Within the same simulation cycle *cause* and *effect* events may share the same time of occurrence.

The simulator uses a zero duration *virtual time interval*: delta cycle


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
- notify: raise an event
    - `my_event.notify()`
    - notify with arguments: delayed notification
        - `my_event.notify(SC_ZERO_TIME)`: notify next delta cycle
        - `my_event.notify(time)`: notify after *time*

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






