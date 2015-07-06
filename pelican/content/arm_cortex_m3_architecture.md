Title: ARM Cortex-M3 Architecture
Category: Computer Science
Tags: Assembler
Date: 2015-07-03
Modified: 2015-07-03


[TOC]


# General

|            |                                                                                               |
|------------|-----------------------------------------------------------------------------------------------|
| CPU Design | [RISC](https://en.m.wikipedia.org/wiki/Reduced_instruction_set_computer)                      |
| Endianness | [bi-endian (little as default)](https://en.m.wikipedia.org/wiki/Bi-endian#Bi-endian_hardware) |
| Type       | [Load/Store](https://en.m.wikipedia.org/wiki/Load/store_architecture)                         |


# Registers

All registers are 32-bit wide.

| Register   | Use                                  |
|------------|--------------------------------------|
| R0 - R12   | General Purpose Registers            |
| R13        | Stack Pointers (SP_main, SP_process) |
| R14        | Link Register (LR)                   |
| R15        | Program Counter (PC)                 |

## General Purpose Registers

Some 16-bit Thumb instruction can only access R0 - R7.

## Stack Pointers
The  Cortex-M3  contains  two  stack  pointers:

- Main Stack Pointer (SP_main): The default stack pointer, used by the operating system and exception handlers
- Process Stack Pointer (SP_process): Used by application code

The two Stack Pointers are banked. Only one is visible at a time (R13).

The lowest 2 bits of the stack pointers are always 0. So they are always word aligned.

## Link Register

The Link Register contains the return address of a subroutine/function.

## Program Counter

This register holds the current program position. It can be written to for
controlling the program flow (jumps).


## Program Status Registers


The special-purpose program status registers (*xPSR*) provide arithmethic and logic flags (zero and carry flag),
execution status and current executing IRQ number.


| Bit   | APSR    |  IPSR            | EPSR   |
|-------|---------|------------------|--------|
| 31    |  N      |   -              |  -     |
| 30    |  Z      |   -              |  -     |
| 29    |  C      |   -              |  -     |
| 28    |  V      |   -              |  -     |
| 27    |  Q      |   -              |  -     |
| 25-26 |  -      |   -              | ICI/IT |
| 24    |  -      |   -              |   T    |
| 20-23 |  -      |   -              |   -    |
| 16-19 | GE[3:0] |   -              |   -    |
| 9-15  |  -      |   -              | ICI/IT |
| 0-8   |  -      | Exception Number |   -    |


### Application Program Status Register (APSR)

Flags that can be set by application code (unprivileged mode).

- **N (bit[31])**: Negative condition flag. Set if result of instruction is negative.
- **Z (bit[30])**: Zero condition flag. Set if result of instuction is zero (0).
- **C (bit[29])**: Carry condition flag. Set if instrucion results in a carry condition (i.e unsigned overflow on addition)
- **V (bit[28])**: Overflow condition flag. Set if the instuction results in a an overflow condition (i.e. signed overflow on addition)
- **Q (bit[27])**: Set if a `SSAT` or `USAT` instruction changes the input value for the signed/unsigned range of the result (saturation).
- **GE[3:0] (bits[19:16])**: DSP extension only. Otherwise reserved.

### Interrupt Program Status Register (IPSR)

- Handler Mode: This register holds the exception number of the exception that is currently processed.
- Thread Mode: If no exception is processed the value is zero (0).

### Execution Program Status Register (EPSR)

- **T bit[24]**: Defines the instuction set. The Cortex-M3 supports only Thumb-2. So the processor can execute instructions only if the T bit is set.
- **ICI/IT**: TBD

### Composite views of the xPSR registers

The commands `MSR` and `MRS` can use the mnemonics APSR, IPSR, and EPSR directly or combined mnemonics for the Program Status Registers.

| Mnemonic| Registers                  |
|---------|----------------------------|
| IAPSR   | IPSR and APSR              |
| EAPSR   | EPSR and APSR              |
| IEPSR   | IPSR and EPSR              |
| XPSR    | All three xPSR registers   |


## Special-Purpose Mask Registers

## Special Registers

- *PRIMASK*: Disable interrupts except nonmaskable interrupt (NMI) and hard fault.
- *FAULTMASK*: Disable interrupts except nonmaskable interrupt (NMI).
- *BASEPRI*: Disable interrupts of given priority level or lower priority level.

## Control Register

Define privileged status and select stack pointer.

# Modes

The Cortex-M3 has two modes:

- Thread Mode
- Handler Mode

In Thread Mode the processor can run in two privilege levels:

- User Level
- Privileged Level

In Handler Mode only the Privileged Level is available.

|                           | Application Code | Exception Handler |
|---------------------------|------------------|-------------------|
| Unprivileged (user) Level | Thread Mode      |       -           |
| Privileged Level          | Thread Mode      | Handler Mode      |

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



# Data Types

Following data types are supported in memory:

- Byte: 8 bits.
- Halfword: 16 bits.
- Word: 32 bits.

The registers are 32 bit wide. The instruction set supports following data types in the registers:

- 32-bit pointers.
- Unsigned and signed 32-bit integers.
- Unsigned 16-bit and 8-bit integers in zero-extended form.
- Signed 16-bit and 8-bit integers in sign-extended form.
- Unsigned and signed 64-bit integers held in two registers (limited direct support).

Signed data is represented using two's complement format.
