Title: Modern OS's
Category: Computer Science
Date: 2015-04-01
Modified: 2015-04-11

This page collects some notes about different Operating System approaches.

Most of the information gathered here is from the course [Advanced Operating Systems](https://www.udacity.com/course/ud189).

Some information is from [Wikipedia]http://en.wikipedia.org/wiki/Operating_system). And other Wikipedia pages.

The book *Modern Operating Systems* by Andrew S. Tanenbaum is also a very good resource I'm using for learning about Operating Systems.


Overview of Kernels
===================
> This overview Table is still work in progress!

| Kernel     | Type                       | Programming Language | Notes                                                                    |
|------------|----------------------------|----------------------|--------------------------------------------------------------------------|
| SPIN       | Microkernel (Mach-like)    | Modula-3             | Special approach.                                                        |
| Linux      | Monolithic (modular)       | C, Assembly          | Loadable kernel modules allow loading extensions (drivers) at runtime.   |
| XNU        | Hybrid                     | C, C++               | Kernel of OS X. Mach-3.0 and FreeBSD combined.                           |
| BSD        | Monolithic                 | C                    | FreeBSD, OpenBSD, NetBSD...                                              |
| Mach       | Microkernel                | C?                   | One of the earlyest mikrokernel. Not all mach versions are mikrokernels. |
| Windows    | Hybrid                     | C, C++, Assembly     | Win NT: Hybrid, Win 9x and earlyer: Mololithic.                          |
| FreeRTOS   | Microkernel                | C, Assembly          | Real Time OS. Mainly for embedded systems.                               |
| UNIX       | Monolithic                 | C, Assembly          | Original: AT&T Unix.                                                     |
| L3         | Microkernel                | ELAN                 | Predecessor of L4.                                                       |
| Barrelfish |                            | C                    | Special aproach.                                                         |
| Mac OS 9   | Microkernel (Nanokernel)   | ?                    | Legacy                                                                   |



Sharing Resources
=================
One of the most important task of an OS is to share (hardware) resources. There are two posibilities how resources can be shared.
1. time sharing: i.e CPU, Printer
2. space sharing: i.e RAM, Hard Disc



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


Thesis of L3 for OS structuring
-------------------------------
- Minimal abstractions in microkernel
- Microkernels are processor specific in implementation => non-portable
- Right set of microkernel abstractions and processor-specific implementation => efficient processor independent abstractions at higher levels


L3 is faster than Mach (Microkernel)


Virtualization
==============
Hypervisor: Operation system of operation systems (VMM: Virtal Machine Monitor)

Native Hypervisor (bare metal)
------------------------------
Hypervisor runs directly on hardware.  
Guest OS's running inside the hypervisor

Hosted Hypervisors
------------------
Run on top of a Host OS (as an application process).  
Guest OS's running inside the hypervisor.

- VMWare Workstation
- VirtualBox

Full virtualization
-------------------
- Guest OS's are not touched (unchanged binaries)
- They are running as user process in host OS
- Privileged instructios in guest OS's trigger trap in hypervisor (trap and emulate)
- i.e. VMWare

Para Virtualization
-------------------
- Guest OS is modified to run on an an hypervisor
- A very small percentage of the guest OS code needs to be changed
- i.e. Xen

Overview
--------
Virtualize hardware:

- memory hierarchy
- CPU
- Devices


Memory Virtualization
=====================

Not virtualized:  
Page Table (PT) maps Virtual Page Numbers (VPN) of processes to Physical Page Number (PPN).

Virtualized:
Guest OS translates Virtual Page Number (VPN) to Physical Page Number (PPN) with Page Table (PT). Hypervisor then translates Physical Page Number (PPN) to Machine Page Number (MPN) with Shadow Page Table (S-PT).


CPU Virtualization
==================

Events that happen in a task of the Guest OS need to be delivered to the Guest OS by the Hypervisor.

An event can be:

- External Interrupt (HW Interrupt)
- Exception (HW- and SW-Exception)
- Page Fault
- Syscall

The occured events are delivered to the Guest OS wrapped in a SW-Interrupt by the Hypervisor.

Communication from the Guest OS to the CPU hapens generally through traps. So the hypervisor can
handle it. In para-virtualized environment the Hypervisor can provide an API for the Guest OS instead
of using traps.

- Full virtualization: "trap and emulate"
- Para virtualization: more opportunity for innovation

Control Transfer
----------------

### Full virtualization

- implicit (traps) guest &rarr; hypervisor
- software interrupts (events) hypervisor &rarr; guest

### Para virtualization

- explicit (hypercalls) guest &rarr; hypervisor
- software interrupts (events) hypervisor &rarr; guest

> Guest has control via hypercalls on when event notifications
  need to be delivered.


Data Transfer
-------------

### Full virtualization

- implicit

### Para virtualization (e.g. Xen)

- explicit &rArr; opportunity to innovate

#### Xen I/O-Rings

Xen uses a ring buffer for data transfer with producer-consumer pattern.
There are 4 pointer to the buffer.

1. Request producer (shared, updated by guest)
2. Request consumer (private to Xen)
3. Response producer (shared, updated by guest)
4. Response consumer (private to guest)

