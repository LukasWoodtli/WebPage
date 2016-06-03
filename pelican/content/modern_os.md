Title: Modern OS's
Category: Computer Science
Tags: OS
Date: 2015-04-01
Modified: 2015-04-11

This page collects some notes about different Operating System approaches.

Most of the information gathered here is from the course [Advanced Operating Systems](https://www.udacity.com/course/ud189).

Some information is from [Operating System](http://en.wikipedia.org/wiki/Operating_system "Wikipedia"). And other Wikipedia pages.

The book *Modern Operating Systems* by Andrew S. Tanenbaum is also a very good resource I'm using for learning about Operating Systems.
5

[TOC]


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
| FreeRTOS   | Microkernel (RTOS)         | C, Assembly          | Real Time OS. Mainly for embedded systems.                               |
| UNIX       | Monolithic                 | C, Assembly          | Original: AT&T Unix.                                                     |
| L3         | Microkernel                | ELAN                 | Predecessor of L4.                                                       |
| Barrelfish |                            | C                    | Special aproach.                                                         |
| Mac OS 9   | Microkernel (Nanokernel)   | ?                    | Legacy                                                                   |
| QNX        | Microkernel                | ?                    | CPUs: x86, MIPS, PowerPC, SH-4, ARM, StrongARM und xScale
| VxWorks    | Monolithic (RTOS)          | ?                    |                                                                          |



Sharing Resources
=================
One of the most important task of an OS is to share (hardware) resources. There are two posibilities how resources can be shared.

1. time sharing: i.e CPU, Printer
2. space sharing: i.e RAM, Hard Disc



Exokernel
=========
Allocating resources to library OS's:

- space (memory)
- time (CPU)

Library OS's can 'download' code into the kernel. A security management mechanism checks if it is allowed by th library OS.

Memory (TLB)
------------
TLB: Translation Lookaside Buffer.
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

L3 is faster than Mach (Microkernel).


Virtualization
==============
Hypervisor: Operation system of operation systems (VMM: Virtal Machine Monitor).

Native Hypervisor (bare metal)
------------------------------
Hypervisor runs directly on hardware.
Guest OS's running inside the hypervisor.

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
----------------

Page Table (PT) maps Virtual Page Numbers (VPN) of processes to Physical Page Number (PPN).


Virtualized:
------------

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


Memory Models
=============

- Memory Consistency: What is the Model presented to the Programmer?
- Cache Coherence: How is the System implementing the Model in presence of private caches?


Sequential Consistency (Memory Model)
-------------------------------------

Access to a shared memory location is performed in sequence by the processors. The accesses can be
interwoven.


Cache Coherence
---------------

### Non cache coherent shared address space multi processor (NCC shared memory multi processor)

System only gives access to shared address space. System Software maintains chaching.

- Shared address space available for all processors
- Private caches

> If you modify data it's a problem of the system software to make sure the caches are coherent!


### CC shared memory multi processor

- Hardware provides shared address space
- Maintains cache coherence in hardware


#### Write-Invalidate

Hardware ensures that written memory location is invalidated in all caches.


#### Write-Update

Hardware ensure that modified memory location is updated in all caches.


> "Shared memory machines scale well when you don't share memory.", Chuck Thacker

Synchronization
===============

Synchronization Primitives
--------------------------

- Mutex Locks (single exclusive access to resource)
- Shared Lock (Multiple reader to one resource)
- Barriers (Synchronize threads, wait for other threads till all completed their work)

Atomic Instruction
------------------

During the execution of an instruction the processor can not be interrupted.


Aquiring a lock needs to be atomic.

### Read-Modify-Write (RMW)

Different aproaches:

- Test-and-Set (T+S): Reads a memory location. Then returns the actual value and sets it to 1 atomically.
- Fetch-and-Inc: Reads a memory location. Then returns the actual value and increments it atomically.
- Fetch-and-$\Phi$: Generally with any given function ($\Phi$) after fetching and returning the actual value.

### Scalability issues with Synchronitation

- Latency: Latency is the time that a thread needs to acquire a lock.
- Waiting time: The time that a thread needs to wait to get the lock. This time is in the hands of the application developers and not of the OS developers.
- Contention: If a lock is released and several threads are waiting for it. How long does it take until a thread is chosen from the waiting threads.

Spinlock
--------

### Naive Spinlock (Spin on T+S)


A thread or processor waiting for a lock loops (spins) without doing any useful work.

    LOCK(L):
        WHILE(T+S(L) == locked);


Problems with this naive spinlock implementation:

- Too much contention: Every processor tries to access lock.
- Does not exploit caches: Private caches in processor can't contain lock variable (T+S needs to be atomic. That's not possible with cached variables).
- Disrupts useful work: After releasing a lock a processor usually wants to do some work. But other processors need resources for trying to acquire the lock.


### Caching Spinlock (Spin on read)

Waiting processors spin on cached copy of `L`. So there is no communication to memory. The cached copy
of `L` is updated by the cache coherence mechanism of the system.

    LOCK(L):
        WHILE(L == locked); // Spinning on cached var. Reading L is atomic.
            IF(T+S(L) == locked) // Read L from memory (not cache).
                go back; // If it fails start spinning on cached L again.

- Less traffic on bus.
- Disruptive.

### Spinlock with Delay

If a lock is released every process waits for a given time before trying to aquire the lock.

#### Delay after lock release

    WHILE((L == locked) or
          (T+S(L) == locked))
    {
        WHILE(L == locked);
        delay(d[Pi]); // when I get the lock I wait a while
    }

The delay time is dependent on the processor.

#### Delay with exponential backoff

    WHILE(T+S(L) == locked) // not using chaching at all
    {
        delay(d); // d is small at first
        d = d * 2;
    }

Every time when the lock is checked and not free the processor waits a longer time before trying again.
T+S can be used because we wait before trying to quire the lock again. This reduces the contention.
This algorithm works also on architecture without chaches (or cache coherent system in HW).


### Ticket Lock

The process that tries to acquire a lock gets a ticket.
When the lock is released the process is notified.

This adds fairness to the locking algorithm.

But it causes contention.

### Summary

- Spin on T+S, Spin on read and Spinlock with Delay are not fair
- Ticket Lock is fair but noisy (contention)


Queuing Lock
------------

### Array-based queuing Lock (Anderson Lock)

For each lock there is an array with flags. The size of the
array is equal to the number of processors.

Flags:

- has-lock (**hl**)
- must-wait (**mw**)

![The flag array structure](/images/array_based_queuing_lock.png)

Only one slot can be marked as **hl**.

The slots are not statically associated with a particular processor.

    LOCK(L):
       myPlace = fetch_and_inc(queuelast);
       WHILE(flags[myPlace mod N] == mw);

    UNLOCK(L):
        flags[current mod N] = mw; // release lock for feature use
        flags[(current+1) mod N] = hl; // next processor in queue gets lock


- Only one atomic operation needed per critical section
- Fairness: first-come, first-served
- But needs a lot of space. For each lock there is one array with the size of number of processors

### Link Based queuing Lock

The Locks are stored in a linked list.

Synchronization for adding and removing clients to a lock.

Published by [John M. Mellor-Crummey and Michael L. Scott (MCS)](http://www.cs.rice.edu/~johnmc/papers/tocs91.pdf)

