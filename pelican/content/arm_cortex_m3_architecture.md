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



