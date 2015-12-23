Title: System Construction
Category: Programming
Tags: ETH, Assembler
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
    - Load: from memory to register
    - Store: from register to memory
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

- R15: PC (Programm Counter)
- R14: LR (Return address for procedure)
- R13: SP ('top' of the stack)
- R12: FP (by convention, stored SP before procedure call)
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
![Oberon Language and OS Family](/images/syscon_oberon_history.png)

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

##### Builtin Functions

Increment and decrement

    :::modula2
    INC(x);
    DEC(x);
    INC(x,n);
    DEC(x,n);

Sets

    :::modula2
    INCL(set, element);
    EXCL(set, element);

Assert and Halt

    :::modula2
    ASSERT(b<0);
    HALT(100);

Allocation

    :::modula2
    NEW(x, ...);

Shifts

    :::modula2
    ASH(x,y);
    LSH(x,y);
    ROT(x,y);

Conversion

    :::modula2
    SHORT(x);
    LONG(x);
    ORD(ch);
    CHR(i);
    ENTIER(r);

Arrays

    :::modula2
    LEN(x);
    LEN(x,y);
    DIM(t);

Misc

    :::modula2
    ABS(x);
    MAX(type);
    MIN(type);
    ODD(i);
    CAP(c);

Addresses and Sizes

    :::modula2
    ADDRESS OF x;
    ADDRESSOF(x);
    SIZE OF t;
    SIZEOF(t);

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


#### Pseudo Module `SYSTEM`

Direct Memory Access Functions

    :::modula2
    SYSTEM.PUT (a, x);
    SYSTEM.GET (a, x);
    SYSTEM.PUT8|16|32|64(a, x);
    x := SYSTEM.GET8|16|32|64(a);
    SYSTEM.MOVE(src, dest, length);

Data Type

    :::modula2
    SYSTEM.BYTE

Type Cast

    :::modula2
    b := SYSTEM.VAL(a, t);


Example of Low-Level access

    :::modula2
    IMPORT SYSTEM;

    PROCEDURE LetThereBeLight;
    CONST GPSET0 = 03F20001CH;
    BEGIN
        SYSTEM.PUT(GPSET0, {21});
    END LetThereBeLight;

##### `SYSTEM`: ARM Specific

Register Access

    :::modula2
    SYSTEM.SP();
    SYSTEM.FP();
    SYSTEM.LNK();

    SYSTEM.SETSP(x);
    SYSTEM.SETFP(x);
    SYSTEM.SETLR(x);

    SYSTEM.LDPSR(b,x);
    SYSTEM.STPSR(b,x);
    SYSTEM.LDCPR(a,b,c);
    SYSTEM.STCPR(a,b,c);
    SYSTEM.FLUSH(x);

Floating Point

    :::modula2
    SYSTEM.NULL(x);
    SYSTEM.MULD(a,b,c);


#####  Interrupt Procedures

    :::modula2
    PROCEDURE Handler {INTERRUPT, PCOFFSET=k};
    BEGIN (* k is the offset to the next instruction
             cf. table of exceptions *)
    END Handler;

##### Special Flags and Features


Procedure without activation frame

    :::modula2
    PROCEDURE {NOTAG}

Procedure that is linked to the beginning of a kernel

    :::modula2
    PROCEDURE {INITIAL}

Inline assembler block

    :::modula2
    CODE ... END

Alignment of a symbol (i. e variable)

    :::modula2
    symbol {ALIGNED(32)}


Pinning of a symbol

    :::modula2
    symbol {FIXED(0x8000))

Unsafe pointer that is assignment compatible with type `ADDRESS`

    :::modula2
    POINTER {UNSAFE} TO ...

Symbol that is invisible to a Garbage Collector

    :::modula2
    symbol {UNTRACED}


##### Type Declarations

    :::modula2
    TYPE

    Device* = POINTER TO DeviceDesc;  (* Pointer to record (reference type)*)
    DeviceDesc* = RECORD              (* Record: Value type *)
        id*: INTEGER;
        Open*: PROCEDURE(dev: Device);
        Close*: PROCEDURE(dev: Device);
        next*: Device;
    END;

    (* Procedure type with signature *)
    TrapHandler* = PROCEDURE(type, addr, fp: INTEGER; VAR res: INTEGER);

    NumberType* = REAL; (* Type alias *)

    DeviceName* ARRAY DeviceNameLength OF CHAR; (* Array Type *)

    Data* POINTER TO ARRAY OF CHAR; (* Dynamic array type *)

##### Inheritance

    :::modula2
    Task* = POINTER TO TaskDesc;
    TaskDesc* = RECORD
        task task task
        task task
        proc:PROCEDURE(me:Task); (* This procedure is executed in the task *)
        next: Task;              (* The next task in the list of tasks *)
    END;

    PeriodicTask* = POINTER TO PeriodicTaskDesc;
    PeriodicTaskDesc* = RECORD (TaskDesc) (* inherits TaskDesc *)
        priority: LONGINT; (* The priority determines the execution order *)
        interval: LONGINT; (* The task is executed every "interval" msecs *)
    END;

Type Test

    :::modula2
    IF task IS PeriodicTask THEN ... END;

Type Guard (cast)

    :::modula2
    IF task(PeriodicTask).priority = 1 THEN ... END;

Type Test and Guard

    :::modula2
    WITH task: PeriodicTask DO ... END;

##### Runtime Support for Inheritance

- RTTI is supported
- Each type gets an unique type descriptor (`LONGINT`)
- The variables contain an array of up to 3 tags
- The tags point to the type descriptors
- Inheritance level is restricted to 3


#### Module Loading and Commands

- Modules are loaded on demand (first use)
- Statically linked modules are loaded at boot-time
- Exported Procedures without parameters act as commands
- Modification of modules needs reloading
- Unloading possible, if no other loaded module (static or dynamic) depends on it
- If a command of a not loaded module is executed the module is loaded first

#### Compilation and Linknig

- A module (.mod) is compiled to an executable file / object file (.arm) and a symbol file (.smb)
- The executable file contains a fingerprint
- The linker adds fingerprint to dependant object files (fixup)

#### Object File Format

Compiler flags:

    :::
    Compiler.Compile -b=ARM --objectFile=Minos

- The object file is very compact
- Key: Fingerprint
- Fixups &rarr; Fixup-root (relocation table) linked list to fixups
- Downsides:
    - Module file is limited
    - Not very maintainable

![Minos Object Files](/images/syscon_minos_object_file.png)

This image is taken from the lecture slides provided by Felix Friedrich

#### Bootfile

- Linked Modules of Kernel files (hierarchy)
- Predefined loading address and entry point (0x8000 for RPI2)


Boot-Linking command in host system

    :::
    MinosLinker.Link minimalinit.img 108000H kernel.img OFSRamVolumes SerialLog Minos  ~

Image header: `minimalinit.img`
Start address: `108000H`
Image file name: `kernel.img`
Object file names (compiled): `OFSRamVolumes SerialLog Minos  ~`



<!-- Beginning of Slides Week 3 -->

### Minos Kernel

#### System Startup

- Firmware (RPI2, GPU)
    1. Initialize HW
    2. Copy boot image to RAM
    3. Jump to boot image (initializer)

- Initializer
    1. Set *stack registers* for all processor modes
    2. Setup *free heap* and *module* list
    3. Initialize *MMU* and *page table*
    4. Setup *interrupt handler* and *vectors*
    5. Start *timer* and *enable interrupts*
    6. Initialize UARTs, RAM disks, ...
    7. Enter scheduling loop on OS


The Minos Kernal is modular:

- Minos: Command interpreter and scheduler
- Modules: Module loader, dynamic linker
- File System: RamVolumes, OFS, ...
- Kernel: Memory management, device drivers
- I/O: Kernel logging, ...
- Runtime: Memory allocation (heaps), FPU emulation, ...


<!-- Slides Week 3 09-29 p. 84 (6) -->

...

<!-- Slides and Notes Week 4 -->

#### Initialization of Interrupts

1. Set handlers of IRQ's
    - Write handlers for needed interrupts
    - Put jumps to handlers into interrupt table
2. Enable IRQ's

Usually Interrupts need to be configured in 3 parts:

- CPU (enable, masking...)
- Interrupt Controller
- Device

The RPI2 has 3 memory-mapped IRQ registers (32-bit):

- *Pending Bits* indicate which interrupts are pending
- Need to be checked in the *IRQ Trap Handler* (1st level handler)
- Call *IRQ Handler* (2nd level) depending on pending bits

#### Task Scheduling (Minos)

3 Task types:

- High Priority (every 5 ms)
- Low Priority (every 20 ms)
- Background tasks

Preemption:

- High priority tasks preempt low priority and background tasks
- Low priority tasks preempt only low priority tasks
- Background tasks don't preempt any tasks

Task Descriptors for

- Synchronous (periodic) tasks
- Asynchronous (background) tasks


##### Stack (Minos)

- One stack for all processes
- Every task needs to run to completion
- Preemtion is possible
    - Preemting task needs to be completed before returning


##### Scheduler (Minos)

Recursive interrupt procedure

- Prolog: Interrupts masked
- Scheduling: Interrupts allowed
- Epilog: Interrupts masked

Scheduler procedure must be *reentrant*

- Register values on stack
- Private variables


Assumptions for scheduler

- Linked list stores tasks sorted by period and priority
- Tasks run to completion within given period

<!-- End of Week 4 -->

<!-- Week 8 -->

## Compare-And-Swap (CAS)

Atomic operation implemented in processor.

Compares memory location with an value. If it's same a new (given) value is written at the
memory address. Returns the previous value at memory positin in any case.

`int CAS(int* a, int old, int new)`

- If value `old` is at memory location of `a`: safe `new` at `a`
- Return previous value at `a` in any case
