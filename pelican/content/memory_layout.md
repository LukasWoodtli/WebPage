Title: Memory Layout
Date: 2015-06-09
Modified: 2015-06-09
Category: Programming
Tags: C, C++
Status: draft

When a process is started the operating system allocates memory for this process.
On modern systems this memory is usually mapped to an virtual address space (using the MMU).

But also on deeply embedded system the compiler and runtime environment need to define a memory
layout. In this case there is only one process and there is no virtual memory.


Memory Layout on different Operating Systems
============================================

The use of the memory for a process is different in each operating system.

This example overwiew is taken from *Secure Coding in C and C++, by Robert Seacord*:
![Memory layouts on different OS's](/images/memory_layout.png)


Stack Growth
============

Depending on the platform the stack grows in different directions:

- Downwards: the stack grows from high adresses to low ones
- Upwards: it grows from high addresses to low ones

On most platforms the stack grows downwards. But there are some exeptions.


This table is an inclomplete (but hopefully correct) overview. Most data in this
table is taken from the [FreeRTOS](http://www.freertos.org/) code.

| Architecture | Compiler   | Stack growth  |
|--------------|-------|----------------|
| Windows  | MSVC, MingW | downwards |
| POSIX | GCC | downwards |
| DOS (16Bit) | Open Watcom | downwards |
| Renesas 78K0R | IAR | downwards |
| ARM7 (LPC2xxx, AT91SAM7S, AT91FR40008)  | GCC, RVDS, IAR | downwards |
| ARM Cortex (A5, A9, M0, M4, M3, M7, R4) | GCC, IAR, RVDS, CCS, Tasking | downwards |
| ATMega323 | GCC, IAR | downwards |
| AVR32 UC3 | GCC, IAR | downwards |
| AtmelSAM7S64 | IAR | downwards |
| AtmelSAM9XE | IAR | downwards |
| CORTUS APS3 | GCC | downwards |
| ColdFire | CodeWarrior, GCC | downwards |
| Cygnal | SDCC | **upwards** |
| H8S2329 | GCC | downwards |
| HCS12 | CodeWarrior, GCC | downwards |
| MB91460 | Softune | downwards |
| MB96340 | Softune | downwards |
| MCF5235 | GCC | downwards |
| MSP430 | GCC, IAR, Rowley, CCS | downwards |
| MicroBlaze | GCC | downwards |
| MicroBlazeV8 | GCC | downwards |
| NiosII | GCC | downwards |
| PIC18 | WizC | downwards |
| PIC18F | MPLAB | **upwards** |
| PIC24_dsPIC | MPLAB | **upwards** |
| PIC32MX | MPLAB | downwards |
| PIC32MZ | MPLAB | downwards |
| PowerPC  | GCC | downwards |
| RL78 | GCC, IAR | downwards |
| RX100 | GCC, IAR, Renesas | downwards |
| RX200 | Renesas | downwards |
| RX600 | GCC, IAR, Renesas | downwards |
| RX600v2 | GCC | downwards |
| RX600v2 | Renesas | downwards |
| SH2A_FPU | Renesas | downwards |
| STR71x | IAR | downwards |
| STR75x | GCC, IAR | downwards |
| STR91x | IAR | downwards |
| Tern_EE | Paradigm | downwards |
| TriCore 1782 | GCC | downwards |
| V850ES | IAR | downwards |