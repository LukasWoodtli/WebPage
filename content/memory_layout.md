---
title: Memory Layout
date: 2015-06-09
modified: 2015-07-06
category: Programming
tags: [C, C++]
---

When a process is started the operating system allocates memory for this process.
On modern systems this memory is usually mapped to an virtual address space (using the MMU).

But also on deeply embedded system the compiler and runtime environment need to define a memory
layout. In this case there is only one process and there is no virtual memory.


Memory Layout on different Operating Systems
============================================

The use of the memory for a process is different in each operating system.

This example overwiew is taken from *Secure Coding in C and C++, by Robert Seacord*:

![Memory layouts on different OS's](/images/memory_layout.png)

See also [Anatomy of a Program in Memory](http://duartes.org/gustavo/blog/post/anatomy-of-a-program-in-memory/)

Stack Growth
============

Depending on the platform the stack grows in different directions:

- Downwards (descending): the stack grows from high adresses to low ones
- Upwards (ascending): it grows from high addresses to low ones

There is also a distinction on where a stack pointer points to:

- Full: on the last written position.
- Empty: on the position where the next value is going to be written.

So for example x86 and ARM (usually) have a full descending stack.

[Here](http://stackoverflow.com/a/3844164) is a short explanation.

On most platforms the stack grows downwards. But there are some exeptions.

This table is an inclomplete (but hopefully correct) overview. Most data in this
table is taken from the [FreeRTOS](http://www.freertos.org/) code.

| Architecture                                    | Compiler                     | Stack growth |
|-------------------------------------------------|------------------------------|--------------|
| Windows                                         | MSVC, MingW                  | downwards    |
| POSIX                                           | GCC                          | downwards    |
| DOS (16Bit)                                     | Open Watcom                  | downwards    |
| [x86]({filename}/intel_architecture.md)         | any                          | downwards    |
| [ARM]({filename}/arm_cortex_m3_architecture.md) | any                          | downwards    |
| Renesas 78K0R                                   | IAR                          | downwards    |
| ARM7 (LPC2xxx, AT91SAM7S, AT91FR40008)          | GCC, RVDS, IAR               | downwards    |
| ARM Cortex (A5, A9, M0, M4, M3, M7, R4)         | GCC, IAR, RVDS, CCS, Tasking | downwards    |
| ATMega323, AVR32 UC3, ATSAM7S64, SAM9XE...      | GCC, IAR                     | downwards    |
| CORTUS APS3                                     | GCC                          | downwards    |
| Freescale ColdFire                              | CodeWarrior, GCC             | downwards    |
| Cygnal                                          | SDCC                         | **upwards**  |
| H8S2329                                         | GCC                          | downwards    |
| HCS12                                           | CodeWarrior, GCC             | downwards    |
| MB91460, MB96340 (Fujitsu)                      | Softune                      | downwards    |
| MCF5235                                         | GCC                          | downwards    |
| TI MSP430                                       | GCC, IAR, Rowley, CCS        | downwards    |
| MicroBlaze (IP core)                            | GCC                          | downwards    |
| NiosII (IP core)                                | GCC                          | downwards    |
| Microchip PIC18                                 | WizC                         | downwards    |
| Microchip PIC18F                                | MPLAB                        | **upwards**  |
| Microchip PIC24/dsPIC                           | MPLAB                        | **upwards**  |
| Microchip PIC32MX, PIC32MZ                      | MPLAB                        | downwards    |
| PowerPC                                         | GCC                          | downwards    |
| Renesas X100, X200, X600, RL78                  | GCC, IAR, Renesas            | downwards    |
| SH2A_FPU                                        | Renesas                      | downwards    |
| STMicroelectronics STR71x, STR75x, STR91x       | GCC, IAR                     | downwards    |
| Tern EE                                         | Paradigm                     | downwards    |
| TriCore 1782                                    | GCC                          | downwards    |
| V850ES                                          | IAR                          | downwards    |

