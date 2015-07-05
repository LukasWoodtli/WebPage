Title: ARM Cortex-M3 Architecture
Category: Computer Science
Tags: Assembler
Date: 2015-07-03
Modified: 2015-07-03


# General

|            |                                                                                               |
|------------|-----------------------------------------------------------------------------------------------|
| CPU Design | [RISC](https://en.m.wikipedia.org/wiki/Reduced_instruction_set_computer)                      |
| Endianness | [bi-endian (little as default)](https://en.m.wikipedia.org/wiki/Bi-endian#Bi-endian_hardware) |
| Type       | [Load/Store](https://en.m.wikipedia.org/wiki/Load/store_architecture)                         |

# Registers

All registers are 32-bit wide.

| Register   | Use                       |
|------------|---------------------------|
| R0 - R12   | General Purpose Registers |
| R13        | Stack Pointers (MSP, PSP) |
| R14        | Link Register (LR)        |
| R15        | Program Counter (PC)      |

## General Purpose Registers

Some 16-bit Thumb instruction can only access R0 - R7.

## Stack Pointers
The  Cortex-M3  contains  two  stack  pointers:

- Main Stack Pointer (MSP): The default stack pointer, used by the operating system and exception handlers
- Process Stack Pointer (PSP): Used by application code

The two Stack Pointers are banked. Only one is visible at a time.

The lowest 2 bits of the stack pointers are always 0. So they are always word aligned.

## Link Register

The Link Register contains the return address of a subroutine/function.

## Program Counter

This register holds the current program position. It can be written to for 
controlling the program flow (jumps).

## Special Registers

| Register  | Use                                    |
|-----------|----------------------------------------|
| xPSR      | Program Status Registers               |
| PRIMASK   | Disable IRQs except NMI and hard fault |
| FAULTMASK | Disable IRQs except NMI                |
| BASEPRI   | Disable IRQs of given priority         |
| CONTROL   | Control resgister                      |

### Program Status Registers

The *xPSR* provide arithmethic and logic flags (zero and carry flag),
execution status and current executing IRQ number.

### Interrupt Mask Registers

- *PRIMASK*: Disable interrupts except nonmaskable interrupt (NMI) and hard fault.
- *FAULTMASK*: Disable interrupts except nonmaskable interrupt (NMI).
- *BASEPRI*: Disable interrupts of given priority level or lower priority level.

### Control Register

Define privileged status and select stack pointer.

# Modes

The Cortex-M3 has two modes:

- Thread Mode
- Handler Mode

In Thread Mode the processor can run in two privilege levels:

- User Level
- Privileged Level

In Handler Mode only the Privileged Level is available.

|                  | Application Code | Exception Handler |
|------------------|------------------|-------------------|
| User Level       | Thread Mode      |       -           |
| Privileged Level | Thread Mode      | Handler Mode      |

![The ARM Cortex-M3 Modes and Levels](/images/arm_cortex_m3_modes_levels.svg)


# Nested Vectored Interrupt Controller (NVIC)

## Nested

All external and some system interrupts can be assigned to different priority levels. Current
handled interrupts can only be disruppted by interrupts of higher priority.

## Vectored

The addresses of the interrupt service routines (ISRs) are stored in a vector. If an interrupt
occures the lookup of the routine is fast and the handling of the interrupt is not delayed by lookup
code.

## Dynamic Priority Setting

The priority of an interrupt can be changed at run time.

# Memory Layout

The Cortex-M3 has a defined memory map. So most built in peripherals are accessible by their
memory address. Thus it's easy to access it in C/C++ code.

| Address Range           | Use                  | Description                                          |
|-------------------------|----------------------|------------------------------------------------------|
| 0x00000000 - 0x1FFFFFFF | CODE                 | Program Code. Exception vector table after start up. |
| 0x20000000 - 0x3FFFFFFF | SRAM                 | Used as static RAM.                                  |
| 0x40000000 - 0x5FFFFFFF | Peripherals          | For integrated peripherals.                          |
| 0x60000000 - 0x9FFFFFFF | External RAM         | For external connected RAM.                          |
| 0xA0000000 - 0xDFFFFFFF | External Peripherals | For external connected peripherals.                  |
| 0xE0000000 - 0xFFFFFFFF | System               | NVIC, MPU, Debug...                                  |


# Bus Interfaces

The Cortex-M3 has multiple bus interfaces:

- Code Memory Bus: For fetching instructions from code memory.
- System Bus: For static RAM and peripherals.
- Private Peripheral Bus: For access to a part of the system memory and for debugging.



