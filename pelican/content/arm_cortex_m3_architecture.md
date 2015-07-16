Title: ARM Cortex-M3 Architecture
Category: Computer Science
Tags: Assembler
Date: 2015-07-03
Modified: 2015-07-10

This page collects my notes about the Cortex-M3 architecture.
In particular I use the *EFM32TG840F32* processor on a STK3300 starter kit by Energy Micro.




[TOC]


# General

|            |                                                                                               |
|------------|-----------------------------------------------------------------------------------------------|
| CPU Design | [RISC](https://en.m.wikipedia.org/wiki/Reduced_instruction_set_computer)                      |
| Endianness | [bi-endian (little as default)](https://en.m.wikipedia.org/wiki/Bi-endian#Bi-endian_hardware) |
| Type       | [Load/Store](https://en.m.wikipedia.org/wiki/Load/store_architecture)                         |

# EFM32TG Overview

| Feature  |                            |
|----------|----------------------------|
| CPU      | 32 MHz ARM Cortex-M3 (r2p1)|
| Flash    | 32 kB                      |
| RAM      | 4 kB                       |
| SPI      | 1                          |
| I2C      | 1                          |
| USART    | 2                          |
| I2S      | 1                          |
| Dig. Pins| 56                         |
| ADC      | 12-bit, 8 ch, 1 Msps       |
| DAC      | 12-bit, 2 ch               |
| IRQs     | 23                         |
| LCD      | Yes                        |
| MPU      | No                         |
| ETM      | No                         |
| Package  | QFN64 9x9 mm               |


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

The reset values of R0 - R12 are random.

## Stack Pointers (SP, R13, MSP, PSP)
The  Cortex-M3  contains  two  stack  pointers:

- Main Stack Pointer (SP_main): The default stack pointer, used by the operating system and exception handlers
- Process Stack Pointer (SP_process): Used by application code

In thread mode CONTROL bit[1] indicates the used stack pointed:

- 0: MSP
- 1: PSP

The two Stack Pointers are banked. Only one is visible at a time through R13.

The lowest 2 bits of the stack pointers are always 0. So they are always word aligned.

It's not nessecary to use both stack pointers (SP_main and SP_process). Simple applications use only SP_main.

PUSH and POP work with the actual *SP* (R13). The stack is 32-bit aligned.

    :::nasm
    PUSH {R3}  ; R13 = R13-4, memory[R13] = R3
    POP {R3}   ; R3 = memory[R13], R13 = R13+4

It's also possible to to push and pop multiple registers in one instruction.

    :::nasm
    my_function
        PUSH {R0-R3, R3, R7} ; Save registers
        ...
        POP {R0-R3, R3, R7}  ; Restore registers
        BX R7                ; Return to caller

It's possible to use *SP* instead of *R13* for accessing the actual Stack Pointer.
For accessing a particular Stack Pointer the mnemonic MSP (for SP_main) or PSP (for SP_process) exist.

## Link Register (R14, LR)

The Link Register contains the return address of a subroutine/function.
On function entry (BL) the return address is automatically saved on LR.

    :::nasm
    main
       BL my_func; call funct. with branch and link. PC=my_func, LR=next instr in main

    ...

    my_func
        ...
        BX LR ; return to address in LR


## Program Counter (R15, PC)

This register holds the current program position.

It can be written to for controlling the program flow (jumps). But then *LR* is not updated.

Since the Cortex-M3 has a piplelined architecture the PC can be ahead of the actual executed
instruction (normally by 4).

On reset, the processor loads the PC with the value of the reset vector, which is at address 0x00000004.

> The least-significant bit of each address loaded into *PC* must be 1 (indicating thumb mode).
> Otherwise an exception will occure on the Cortex-M3.

## Program Status Registers

The special-purpose program status registers (*xPSR*) provide arithmethic and logic flags (zero and carry flag),
execution status and current executing IRQ number.


| Bit   | APSR    |  IPSR            | EPSR   |
|------:|:-------:|:----------------:|:------:|
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
- **C (bit[29])**: Carry (or borrow) condition flag. Set if instrucion results in a carry condition (i.e unsigned overflow on addition)
- **V (bit[28])**: Overflow condition flag. Set if the instuction results in a an overflow condition (i.e. signed overflow on addition)
- **Q (bit[27])**: Set if a `SSAT` or `USAT` instruction changes the input value for the signed/unsigned range of the result (saturation).
- **GE[3:0] (bits[19:16])**: DSP extension only. Otherwise reserved.

### Interrupt Program Status Register (IPSR)

- Handler Mode: This register holds the exception number of the exception that is currently processed.
- Thread Mode: If no exception is processed the value is zero (0).

### Execution Program Status Register (EPSR)

- **T bit[24]**: Defines the instuction set. The Cortex-M3 supports only Thumb-2. So it must be 0. An fault is caused if this bit is set to 0.
- **ICI/IT**: TBD

### Composite views of the xPSR registers

The commands `MSR` and `MRS` can use the mnemonics APSR, IPSR, and EPSR directly or combined mnemonics for the Program Status Registers.

| Mnemonic| Registers                  |
|---------|----------------------------|
| IAPSR   | IPSR and APSR              |
| EAPSR   | EPSR and APSR              |
| IEPSR   | IPSR and EPSR              |
|  PSR    | All three xPSR registers   |


## Special-Purpose Mask Registers

This registers are set to 0 at reset.

They can only be written if in privileged level.

- *PRIMASK*: Disable interrupts except nonmaskable interrupt (NMI) and hard fault.
- *FAULTMASK*: Disable interrupts except nonmaskable interrupt (NMI).
- *BASEPRI*: Disable interrupts of given priority level or lower priority level.

## Control Register

Define privileged status and select stack pointer.

### Control bit[0] (nPRIV, privilege level)
This bit has only a meaning in thread mode.

- 0: Privileged Level
- 1: Unprivileged (user) Level

In handler mode the processor operates in privileged mode.

This bit is only writable with privileged level.

### Control bit[1] (SPSEL, stack selection)

This bit makes only sense in thread mode.

- 0: Use SP_process
- 1: Use SP_main

In handler mode this bit must be 0 (SP_main is used).

This bit is only writable if in thread mode with privileged level.

### Switching Privilege Level

To switch from privileged level to user level the *Control bit[0]* can be written directly.

The switch from user level to privilege level heeds to be performed within an exeption handler.

## Reset Values and Required Access Privileges

| Name      | Read/Write | Required privilege | Reset value                   |
|-----------|------------|--------------------|-------------------------------|
| R0-R12    | RW         | Both               | Undef                         |
| MSP (R13) | RW         | Privileged         | value from address 0x00000000 |
| PSP (R13) | RW         | Both               | Undef                         |
| LR  (R14) | RW         | Both               | 0xFFFFFFFF                    |
| PC  (R15) | RW         | Both               | value of the reset vector     |
| ASPR      | RW         | Both               | 0x00000000                    |
| IPSR      | R          | Privileged         | 0x00000000                    |
| EPSR      | R          | Privileged         | 0x01000000                    |
| PRIMASK   | RW         | Privileged         | 0x00000000                    |
| FAULTMASK | RW         | Privileged         | 0x00000000                    |
| BASEPRI   | RW         | Privileged         | 0x00000000                    |
| CONTROL   | RW         | Privileged         | 0x00000000                    |


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

# Exceptions


| Exception number  | Exception | Priority |
|-------------------|-----------|----------|
| 1                 | Reset     | -3       |
| 2                 | NMI       | -2       |
| 3                 | Hard Fault| -1       |
| 4                 | MemManage | configurable |
| 5                 | BusFault  | configurable |
| 6                 | UsageFault| configurable |
| 7 - 10            | Reserved  |   -          |
| 11                | SVCall    | configurable |
| 12                | DebugMonitor | configurable |
| 13                | Reserved  |   -           |
| 14                | PendSV    | configurable |
| 15                | SysTick   | configurable |
| 16 - 16+N         | External interrupt 0 .. N | configurable |


## Reset

There are two levels of reset:

- Power Reset: Resets processor, System Control Space and debug logic.
- Local Reset: Resets processor and System Control Space (except some fault and debug resources).

The exception can't be disabled.
Reset exception has a fixed priority of *-3*.

## Non Maskable Interrupt (NMI)
NMI is the highest priority exception after reset.

NMI can be generated by hardware or software can set the NMI exception to the Pending state.

It can't be disabled.
The fixed priority is *-2*.

## HardFault

HardFault is a generic exception. It usually means that the system is
not recoverable anymore. But in some cases it might be recoverable.

HardFault can't be disabled.
It has a fixed priority of *-1*.

## MemManage

MemManage indicates a violation of memory access protected by the MPU (Memory Protection Unit).
It can occur for data and instruction memory transactions.

This fault can be disabled by software. Then a MemManage escalates to a HardFault.

The priority can be configured.

## BusFault

This are memory faults other than MemManage faults. They can occure
for data and instruction transactions.
They can occur synchronous or asynchronous and araise usually by errors
on system buses.

This fault can be disabled by software. Then a BusFault escalates to a HardFault.

The priority can be configured.

## UsageFault

UsageFaults can have different causes:

- Undefined instruction.
- Invalid state when executing instruction.
- Error on exception return.
- Attempt to access coprocessor when it's unsvailable (or disabled).

The reporting of the following UsageFaults can be activated:

- Word/halfword access on unaligned memory address.
- Division by zero.

This fault can be disabled by software. Then a UsageFault escalates to a HardFault.

The priority can be configured.

## DebugMonitor

The DebugMonitor is a fault and it's a synchronous exception.
It occurs when halting debug is disabled and the DebugMonitor is enabled.

The priority is configurable.

> A debug watchpoint is asynchronous and behaves as an interrupt.

## SVCall

This exception is used as supervisor calls it's caused by the instruction SVC.

It's permanently activated. The priority is configurable.

## Interrupts

The Cortex-M3 has two levels of system interrupts and up to 496 external interrupts (the EFM32TG has 23).

### System-Level Interrupts

#### PendSV

Used for system calls (Supervisor call) generated by software. An application uses a Supervisor call if it uses resources from the OS.

The Supervisor call caused by PendSV executes when the processor takes the PendSV interrupt.

> For a synchronous Supervisor call (with application code), software uses the SVC instruction. This generates an SVCall exception.

PendSV is permanently enabled, and is controlled using the ICSR.PENDSVSET and ICSR.PENDSVCLR bits.

#### SysTick
Generated by the SysTick Timer (integral part of Cortex-M3).

SysTick is permanently enabled, and is controlled using the ICSR.PENDSTSET and ICSR.PENDSTCLR bits.

> Software can suppress hardware generation of the SysTick event.

# The Vector Table

The Vector Table contains the reset value of *SP_main* and the addresses of each exception handler function.

| Offset in Table (32-bit words) | Description                  |
|--------------------------------|------------------------------|
| 0                              | Reset value of SP_main       |
| Exception Number               | Address of exception handler |

> The least-significant bit of each exception handler address (vector) must be 1, indicating that the exception handler is in Thumb code.

The position of the *Vector Table* is defined by the *Vector Table Offset Register (VTOR)*.

# Reset Sequence

At start up the *Vector Table* is located at memory position 0 (flash).
It can later be relocated to an other memory position by software.

After reset the processor does:

1. Set main Stack Pointer
    - Load 32-bit value from address 0x00000000
    - Save that value to *SP_main*
2. Run start up code
    - Read the next entry in the *Vector Table* (0x00000004, reset vector)
    - Jump to that address and start running code there

> Since the Cortex-M4 has a full descending stack the initial stack address
has to be 0x04 bigger the the beginning of the stack.


# Assembler

Most assembler examples use the [GCC Assembler (gas)](https://sourceware.org/binutils/docs-2.25/as/index.html).

## Addressing Modes

`addr`: Absolute addressing mode (memory address of operator is given directly).

`%Rn`: Register direct (the value given in the register is used as operator).

`[%Rn]`: Register indirect or indexed (the value given in the register is used as address to the operator).

`[%Rn,#n]`: Register based with offset (the address of the operand is calculated by the content of the register plus a constant).

`#imm`: Immediate data (the operator is given directly as a constant).

*Rn* can be any of the numbered registers.

## Suffixes

Some instructions can have suffixes.

### Write Flags Suffix

The Suffix `S` indicates that the instruction updates the flags (in *APSR*) according to the result.

For example `ADDS R0, R0, R1;` updates the flags.

### Conditional Suffixes

This suffixes can be used for branching instructions but also for conditional execution commands.

| Suffix            | Meaning                             | Tested Flags           |
|-------------------|-------------------------------------|------------------------|
| `EQ`              | Equal                               | Z$=$1                  |
| `NE`              | Not equal                           | Z$=$0                  |
| `CS`or `HS`       | Unsigned higher or same (carry set) | C$=$1                  |
| `CC`or `LO`       | Unsigned lower (or carry clear)     | C$=$0                  |
| `MI`              | Negative (minus)                    | N$=$1                  |
| `PL`              | Positive or zero (plus)             | N$=$0                  |
| `VS`              | Signed overflow (V set)             | V$=$1                  |
| `VC`              | No signed overflow (V clear)        | V$=$0                  |
| `HI`              | Unsigned higher                     | (C$=$1) AND (Z$=$0)    |
| `LS`              | Unsigned lower or same              | (C$=$0) OR (Z$=$1)     |
| `GE`              | Signed greater than or equal        | N$=$V                  |
| `LT`              | Signed less than                    | N$\neq$V               |
| `GT`              | Signed greater than                 | (Z$=$0) AND (N$=$V)    |
| `LE`              | Signed less than or equal           | (Z$=$1) OR (N$\neq$V)  |
| `AL` (or omitted) | Always executed                     |  None                  |


In the instruction examples `<c>` is used to indicate that one of the conditional
suffixes can be used.

## Instruction Width Qualifier

This assembler qualifier is used to select a 16-bit
or 32-bit instruction encoding.

`.N`: Narrow: Assembler must select a 16-bit istruction.

`.W`: Wide: Assembler must select a 32-bit istruction.

If the instruction is not available in the requested encoding the
assembler prroduces an error.

If no qualifier is given the assembler selects the 16-bit encoding if it
is available.

In the instruction examples `<q>` is used to indicate that `.N` or `.W` can be used.

## Data Transfer Commands

### Move Data between Registers (`MOV`, `MVN`)

Moves a value (or it's negated value) from one register to an other.

Moving immediate value directly into a register is also possible.

There are also command for movig shifted data. In this case
the `MOV` commands are aliases for the shifting commands.

#### Immediate

    :::nasm
    MOVS <Rd>,#<imm8>     /* Outside IT block */
    MOV<c> <Rd>,#<imm8>   /* Inside IT block */
    MOV{S}<c>.W <Rd>,#<const>
    MOVW<c> <Rd>,#<imm16>

#### Register

    :::nasm
    MOV<c> <Rd>,<Rm>
    MOVS <Rd>,<Rm>
    MOV{S}<c>.W <Rd>,<Rm>

Examples:

    :::nasm
    MOV R3, R2; /* Move the value from R2 to R3 */
    MVN R5, R6; /* Move the negated value of R6 to R5 */

#### Move to top halfword of Register (`MOVT`)

Moves an immediate value to the top half of the given register. The
bottom half of the register is not written.

    :::nasm
    MOVT<c><q> <Rd>, #<imm16>


#### Move Special Register to Register (`MRS`)


    :::nasm
    MRS<c> <Rd>,<spec_reg>

`MRS` is a system level instruction except when accessing the *APSR* or *CONTROL* register.


#### Move Register to Special Register (`MSR`)

    :::nasm
    MSR<c> <spec_reg>,<Rn>

`MRS` is a system level instruction except when accessing the *APSR* or *CONTROL* register. 

<!---### Move Data between Register and Memory

The basic commands for moving data to and from memory are store and load.
They exist with different operand sizes (byte, half word, word and double word).

With some commands a register operand can be updated after the operation with `!`. If it's
available it is optional.

There are commands for storing or loading multiple registers at once.
--->

## Arithmetic Commands

### Addition (`ADD`)

Adds two values.

#### Immediate

    :::nasm
    ADDS <Rd>,<Rn>,#<imm3>         /* Outside IT block */
    ADD<c> <Rd>,<Rn>,#<imm3>       /* Inside IT block */
    ADDS <Rdn>,#<imm8>             /* Outside IT block */
    ADD<c> <Rdn>,#<imm8>           /* Inside IT block */
    ADD{S}<c>.W <Rd>,<Rn>,#<const>
    ADDW<c> <Rd>,<Rn>,#<imm12>
    ADD{S}<c><q> {<Rd>,} <Rn>,  #<const>
    ADDW<c><q> {<Rd>,} <Rn>,  #<const>


#### Register

The second regisyer operand can be shifted.
 
    :::nasm
    ADDS <Rd>,<Rn>,<Rm>     /* Outside IT block */
    ADD<c> <Rd>,<Rn>,<Rm>   /* Inside IT block */
    ADD<c> <Rdn>,<Rm>
    ADD{S}<c>.W <Rd>,<Rn>,<Rm>{,<shift>}
    ADD{S}<c><q> {<Rd>,}  <Rn>, <Rm> {,<shift>}

#### *SP* plus Immediate
Adds an immediate value to the *SP*, writes the result to the destination register.

    :::nasm
    ADD<c> <Rd>,SP,#<imm8>
    ADD<c> SP,SP,#<imm7>
    ADD{S}<c>.W <Rd>,SP,#<const>
    ADDW<c> <Rd>,SP,#<imm12>
    ADD{S}<c><q> {<Rd>,} SP, #<const>
    ADDW<c><q> {<Rd>,} SP, #<const>
    
#### *SP* plus Register

Adds an (optionally-shifted) register value to the *SP*,
writes the result to the destination register.

    :::nasm
    ADD<c> <Rdm>, SP, <Rdm>
    ADD<c> SP,<Rm>
    ADD{S}<c>.W <Rd>,SP,<Rm>{,<shift>}
    ADD{S}<c><q> {<Rd>,} SP, <Rm>{, <shift>}


### Addition with Carry (`ADC`)

Adds values with carry.

#### Immediate

    :::nasm
    ADC{S}<c>  <Rd>,<Rn>,#<const>
    
#### Register

The register operand can be shifted.

    :::nasm
    ADCS <Rdn>,<Rm>     /* Outside IT block */
    ADC<c> <Rdn>,<Rm>   /* Inside IT block */
    ADC{S}<c>.W <Rd>,<Rn>,<Rm>{,<shift>}
    ADC{S}<c><q> {<Rd>,}  <Rn>, <Rm> {,<shift>}


## Logical Commands

### And (`AND`)

#### Immediate

Bitwise *AND* of register and immediate value.

    :::nasm
    AND{S}<c>  <Rd>,<Rn>,#<const>
    AND{S}<c><q> {<Rd>,} <Rn>,  #<const>

#### Register

Bitwise *AND* of a register and a second (optionally-shifted) register.
The flags can be updated based on the result.

    :::nasm
    ANDS<Rdn>,<Rm>                       /* Outside IT block */
    AND<c> <Rdn>,<Rm>                    /* Inside IT block */
    AND{S}<c>.W <Rd>,<Rn>,<Rm>{,<shift>}
    AND{S}<c><q> {<Rd>,} <Rn>, <Rm> {,<shift>}

## Bit Commands

### Bit Field Clear (`BFC`)

Clear a number of adjacent bits in a register.

    :::nasm
    BFC<c><q> <Rd>, #<lsb>, #<width>
    
Where:

`<lsb>`: The least significant bit that is cleared (Range: 0-31).

`<width>`: Number of bits to clear.


### Bit Field Insert (`BFI`)

Insert given number of the lowest bits from source register to
a given position in the destination register.

    :::nasm
    BFI<c><q><Rd>, <Rn>, #<lsb>, #<width>

`<lsb>`: The least significant bit in destinatin where bits are copied to (Range: 0-31).

`<width>`: Number of bits to copy from source.

### Bit Clear (`BIC`)

#### Immediate

Performs a bitwise *AND* of register and the complement of the immediate
value.

The flags can be updated.

    :::nasm
    BIC{S}<c>  <Rd>,<Rn>,#<const>
    BIC{S}<c><q> {<Rd>,} <Rn>,  #<const>
    
#### Register

Performs a bitwise *AND* one register and the complement of a second register.
The second register can be shifted.

The flags can be updated.

    :::nasm
    BICS<Rdn>,<Rm>    /* Outside IT block */
    BIC<c> <Rdn>,<Rm> /* Inside IT block */
    BIC{S}<c>.W <Rd>,<Rn>,<Rm>{,<shift>}
    BIC{S}<c><q> {<Rd>,}  <Rn>, <Rm> {,<shift>}


## Shift and Rotate Commands

### Arithmetic Shift Right (`ASR`)

#### Immediate
Shifts a register right by an immediate value. Shifts in copies
of it's *sign bit*.

Can update flags.

    :::nasm
    ASRS <Rd>,<Rm>,#<imm5>    /* Outside IT block */
    ASR<c> <Rd>,<Rm>,#<imm5>  /*Inside IT block */
    ASR{S}<c>.W <Rd>,<Rm>,#<imm5>
    ASR{S}<c><q> <Rd>, <Rm>,  #<imm5>
    
#### Register
Shifts a register by a variable number of bits, shifting in copies
of it's sing flag. The number of bits
to shift is read from the *bottom byte* of a register.

Flags can be set.

    :::nasm
    ASRS<Rdn>,<Rm>             /* Outside IT block */
    ASR<c> <Rdn>,<Rm>          /* Inside IT block */
    ASR{S}<c>.W <Rd>,<Rn>,<Rm>
    ASR{S}<c><q> <Rd>, <Rn>, <Rm>

## Branching and Jumping Commands

### Branch (`B`)

Branch to a target addresd.

    :::nasm
    B<c> <label>
    B<c>.W <label>
    B<c><q> <label>

## Other Commands

### Calculate Address (`ADR`)

Calculate *PC* relative address.

Add immediate value to *PC* and store result in register.

    :::nasm
    ADR<c> <Rd>,<label>
    ADR<c>.W <Rd>,<label> /* <label> before current instruction */
    SUB <Rd>,PC,#0.       /* Special case for zero offset */
    ADR<c><q> <Rd>, <label> 
    ADD<c><q> <Rd>, PC,  #<const> 
    SUB<c><q> <Rd>, PC,  #<const> /* Special case */

### No Operation (`NOP`)

The NOP does nothing.

    :::nasm
    NOP<c>
    NOP<c>.W
