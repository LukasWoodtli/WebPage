Title: SystemC
Category: Computer Science
Tags: C++, Embedded Systems
Date: 2016-02-15
Modified: 2016-02-15

> This page is work in progress!

SystemC is a C++ library that is used to evaluate and simulate systems.

It's open source and platform independent.

(Accellera)[http://accellera.org/] is the main resource about SystemC.



# Constructs

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

## Modules

Building blocks of SystemC models.

- Hierarchy
- Abstraction
- IP reuse

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




