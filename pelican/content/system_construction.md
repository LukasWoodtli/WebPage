Title: System Construction
Category: Programming
Tags:
Date: 2015-11-07
Modified: 2015-11-07


> My Notes for the *System Construction* Course at ETH

[TOC]

# Minos on Raspberry PI 2 (Case Study 1)

## ARM A7

The ARM *Architecture* is not the same thing as the ARM *Processor-Families*

### Documentation

There is a lot of good documentation for the ARM processors available. But it's difficult to
find the right documents.


| Document                                     | Main Content |
|----------------------------------------------|------------|
| ARM Architecture Referense Manual (ARMv7-AR, ARM ARM) | Possibility of implementing the processor. For compilers and tools. Partly used for system programming |
| ARM Technical System Reference (ARM Cortex-A7MPCore Family) | Perticular Implementation. Some endundant information to ARM ARM. |
| System On Chip Implementation Manual (BCM 2835) | How the core is embedded on the chip with periperals. Address map. Peripheral information. |

### 6 Kinds Of Instructions

1. Data Processing
2. Branch Instructions
3. Status Register Transfer
4. Load and Store (RISC)
5. Generic Coprocessor Instructions
6. Exception Generation

- Load-/Store: No memory operands (not as x86)
- Multiple-Data-Transfer commands (`stmdb sp!,{fp,lr}`, `!`: Write-Back)
- Link Register: `bl`: Branch-and-Link (stores PC in link register)
- PC-Relative Addressing: Loading large constants (that have no soace in instruction encoding) form code

### Execution Modes

- 7 Modes
- for exception handling
- Processor starts in supervisor mode
- Registers are shadowed (banked) in different modes
- System Mode: priviledged but same registers as user mode

| Privilege Level | Mode  | Description/Cause          | Exception/Normal Execution |
|-----------------|-------|----------------------------|-----------------------------|
|priviledged | Supervisor | Reset / Software Interrupt | exception |
|priviledged | FIQ        | Fast Interrupt             | exception |
|priviledged | IRQ        | Normal Interrupt           | exception |
|priviledged | Abort      | Memory Access Violation    | exception |
|priviledged | Undef      | Undefined Instruction      | exception |
|priviledged | System     | Privileged Mode with same registers as in User Mode  | normal execution |
|**un**priviledged | User | Regular Application Mode                            | normal execution |

### Special Registers

- R15: PC
- R14: LR
- R13: SP
- R12: FP (by convention)
- CPSR (Processor Status Register)
    - Mode Bits
    - IRQ Disable
    - Condition Flags
    - ...

### Typical Procedure Call

- Caller
    - Pushes parmams
    - `BL #address`: Stores PC of next instuction in LR

- Callee
    - Save LR and FP on stack: `stmdb sp!, {fp, lr}`
    - Set new FP: `mov fp, sp`
    - Execute procedure content
    - Reset stack pointer: `mov lr, sp`
    - Restore FP and jump back to caller address: `ldmia sp!, {fp, pc}`

- Caller
    - Clean up parameters from stack: `add sp,sp, #n`

### Exceptions

- Interrupt: asynchronous event triggered by a device signal
- Trap / Syscall: intentional exception
- Fault: error condition that a handler might be able to correct
- Abort: error condition that cannot be corrected

### Misc

- FIRQ is about having more stacked registers
- Return Link type: Different sizes because of pipe-line

## Raspberry PI 2

- Quad Core
- 1 GB RAM
- 40 Pin GPIO, ...
- UART, SPI, USB, Ethernet, ...
- Powered from MicroUSB

### Booting

- Kernel is copied to address: `0x8000h` and branches there (instead to `0x00`)
- MMU is disabled
- Only one core is running

### MMU

- Memory translation is complicated due to two different MMU's
- ARM's memory mapped registers sart from `0x3f000000`, opposed to `0x7e000000` in BMC manual


### GPIO

- Some GPIO Registers need Read-Modify-Write (i.e GPFSELn)
- Other Registers support setting or clearing single bits:
    - i.e Set GPIO Pin: GPSETn
    - i.e Clear GPIO Pin: GPCLRn

## Minos and Oberon

### History of Oberon
![Oberon Language and OS Family](/images/oberon_history.png)

### Oberon

- Modules can be compiled separately
- Strongly typed
    - Static type checking at compile time
    - Runtime support for type guards / tests
- High Level (minimal Assembler code)
- Special low level functions in `SYSTEM` pseudo module (compiler directives)

#### Oberon07

- Minimal
- No type `OBJECT*` no member functions (methods)

#### Language Constructs

##### Program Units

- `MODULE`
- `PROCEDURE`
    - Value, `VAR` (in-out) and `CONST` parmaeters

##### Data Types

- `BOOLEAN`, `CHAR`, `SHORTINT`, `INTEGER`, `LONGINT`, `HUGEINT`, `REAL`, `LONGREAL`, `SET`, `ADDRESS`, `SIZE`

##### Structured Types

- `ARRAY`, `POINTER TO ARRAY`
- `RECORD` (with type extension), `POINTER TO RECORD`

##### Control Structures

###### `IF`

    :::modula2
    IF a = 0 THEN
        (* statement sequence *)
    END;


###### `WHILE`

    :::modula2
    WHILE x<n DO
        (* statement sequence *)
    END;

###### `REPEAT`

    :::modula2
    REPEAT
        (* statement sequence *)
    UNTIL x=n;


###### `FOR`

    :::modula2
    FOR i := 0 TO 100 DO
        (* statement seq *)
    END;


#### Modules

- `PROCEDURE Write* ...`: Exported (`*`)
- Module body is executed first and only once
- Module can be loaded only once (keeps state, can be unloaded)
- Procedures without params can be executed as commands
- Comments: `(* ... *)`
- Special Type: `SET` contains ints up to CPU bit size: i.e 1..32 (`{12, 5}`)
- `SYSTEM` Pseudo Module
    - Unsafe!
    - Memory Access
    - `SYSTEM.BYTE`: raw binary data (with length and bound checks)
    - Type Casts: can be unsafe!
- Procedure Flags:
    - `INTERRUPT`: for ISR's
    - `PCOFFSET=k`: offset for returning from ISR
- Unsafe Pointer: can write to memory address



<!-- Week 8 -->

## Compare-And-Swap (CAS)

Atomic operation implemented in processor.

Compares memory location with an value. If it's same a new (given) value is written at the
memory address. Returns the previous value at memory positin in any case.

`int CAS(int* a, int old, int new)`

- If value `old` is at memory location of `a`: safe `new` at `a`
- Return previous value at `a` in any case
