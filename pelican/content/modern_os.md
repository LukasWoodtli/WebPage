Title: Modern OS's
Date: 2015-04-01
Modified: 2015-04-03

This page collects some notes about different Operating System approaches.

Most of the information gathered here is from the course [Advanced Operating Systems](https://www.udacity.com/course/ud189).


Overview of Kernels
===================
> Tis overview Table is still work in progress!

| Kernel   | Type                   | Programming Language | Notes                                                                 |
|----------|------------------------|----------------------|-----------------------------------------------------------------------|
| SPIN     | Microkernel (Mach-like)| Modula-3             | special approach                                                      |
| Linux    | Monolithic (modular)   | C (assembler)        | loadable kernel modules allow loading extensions (drivers) at runtime |
| XNU      | Hybrid                 |                      |                                                                       |
| BSD      | Monolithic             |                      |                                                                       |
| Mach     | Microkernel            |                      |                                                                       |
| Windows  |                        |                      |                                                                       |
| FreeRTOS |                        |                      |                                                                       |
| UNIX     | Monolithic             |                      |                                                                       |



Exokernel
=========
Allocating resources to library OS's: space (memory), time (CPU)

Library OS's can 'download' code into the kernel. A security management mechanism checks if it is allowed by th library OS.

Memory (TLB)
------------
TLB: Translation Lookaside Buffer
Software-TLB is snapshot for the TLB for switching the library OS's.


CPU-Scheduling
--------------
- Linear vector of "time slots"
- Each library-OS marks the time slots for own use
- If OS takes more time than allowed in a time slot it gets less time in the next time slot (penalty)
- Strand as abstraction of threads

Revoction of Resources
----------------------
- Exokernel tells the library OS which resources are revoked (repossesion vector)


L3
==
L3 strikes against microkernel
------------------------------
- Kernel-User switches (boarder crossing cost)
- Address space switches (Protected Procedures Calls for Cross Protection domain calls)
- Thread switches + IPC (Kernel mediation for PPC)
- Memory effects (locality loss)


L3 is faster than Mach (Microkernel)


Memory Virtualization
=====================

Not virtualized:  
Page Table maps Virtual Page Numbers of processes to Physical Page Number.


Virtualized:
