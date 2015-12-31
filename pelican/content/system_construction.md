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
| ARM Architecture Reference Manual (ARMv7-AR, ARM ARM) | Possibility of implementing the processor. For compilers and tools. Partly used for system programming |
| ARM Technical System Reference (ARM Cortex-A7MPCore Family) | Particular Implementation. Some redundant information to ARM ARM. |
| System On Chip Implementation Manual (BCM 2835) | How the core is embedded on the chip with peripherals. Address map. Peripheral information. |

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
- PC-Relative Addressing: Loading large constants (that have no space in instruction encoding) form code

### Execution Modes

- 7 Modes
- for exception handling
- Processor starts in supervisor mode
- Registers are shadowed (banked) in different modes
- System Mode: privileged but same registers as user mode

| Privilege Level | Mode  | Description/Cause          | Exception/Normal Execution |
|-----------------|-------|----------------------------|-----------------------------|
|privileged | Supervisor | Reset / Software Interrupt | exception |
|privileged | FIQ        | Fast Interrupt             | exception |
|privileged | IRQ        | Normal Interrupt           | exception |
|privileged | Abort      | Memory Access Violation    | exception |
|privileged | Undef      | Undefined Instruction      | exception |
|privileged | System     | Privileged Mode with same registers as in User Mode  | normal execution |
|**un**privileged | User | Regular Application Mode                            | normal execution |

### Special Registers

- R15: PC (Program Counter)
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
    - Pushes params
    - `BL #address`: Stores PC of next instruction in LR

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
- ARM's memory mapped registers start from `0x3f000000`, opposed to `0x7e000000` in BMC manual


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
    - Run-time support for type guards / tests
- High Level (minimal Assembler code)
- Special low level functions in `SYSTEM` pseudo module (compiler directives)

#### Oberon07

- Minimal
- No type `OBJECT*` no member functions (methods)

#### Language Constructs

##### Program Units

- `MODULE`
- `PROCEDURE`
    - Value, `VAR` (in-out) and `CONST` parameters

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

##### Built-in Functions

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

##### Run-time Support for Inheritance

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

#### Compilation and Linking

- A module (.mod) is compiled to an executable file / object file (.arm) and a symbol file (.smb)
- The executable file contains a fingerprint
- The linker adds fingerprint to dependant object files (fix-up)

#### Object File Format

Compiler flags:

    :::
    Compiler.Compile -b=ARM --objectFile=Minos

- The object file is very compact
- Key: Fingerprint
- Fix-ups &rarr; Fix-up-root (relocation table) linked list to fix-ups
- Downsides:
    - Module file is limited
    - Not very maintainable

![Minos Object Files](/images/syscon_minos_object_file.png)

This image is taken from the lecture slides provided by Felix Friedrich

#### Boot-file

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

#### System Start-up

- Firmware (RPI2, GPU)
    1. Initialise HW
    2. Copy boot image to RAM
    3. Jump to boot image (initializer)

- Initializer
    1. Set *stack registers* for all processor modes
    2. Setup *free heap* and *module* list
    3. Initialise *MMU* and *page table*
    4. Setup *interrupt handler* and *vectors*
    5. Start *timer* and *enable interrupts*
    6. Initializer UARTs, RAM disks, ...
    7. Enter scheduling loop on OS


The Minos Kernel is modular:

- Minos: Command interpreter and scheduler
- Modules: Module loader, dynamic linker
- File System: RamVolumes, OFS, ...
- Kernel: Memory management, device drivers
- I/O: Kernel logging, ...
- Run-time: Memory allocation (heaps), FPU emulation, ...


<!-- Slides Week 3 09-29 p. 84 (6) -->

...

<!-- Slides and Notes Week 4 -->

#### Initialisation of Interrupts

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
- Preemption is possible
    - Preempting task needs to be completed before returning


##### Scheduler (Minos)

Recursive interrupt procedure

- Prolog: Interrupts masked
- Scheduling: Interrupts allowed
- Epilogue: Interrupts masked

Scheduler procedure must be *reentrant*

- Register values on stack
- Private variables


Assumptions for scheduler

- Linked list stores tasks sorted by period and priority
- Tasks run to completion within given period

<!-- End of Week 4 -->

<!-- Beginning of Week 5 -->

## Serial Communication

- Directionally
    - Simplex
    - Half duplex
    - Full duplex
- Synchrony
    - Synchronous
    - Asynchronous

Examples:

- RS-232
- RS-458
- SPI (SSP, Microwire)
- I$^2$C
- 1-Wire
- USB

### SPI

- Very simple
- 4 Wires:
    - SCLK: Serial bit-rate Clock
    - MOSI: Master data Output, Slave data Input
    - MISO: Master data Input, Slave data Output
    - SS: Slave Select
- Configurations:
    - Single slave mode: 1 Master, 1 Slave
    - multiple slave mode: 1 Master, N Slaves
- Synchronous bidirectional data transfer
- Data transfer initiated by master
- Bandwidth some KBits/s up to several MBits/s
- Simple implementation in software possible (bit-banging)
- Master and Slave have shift registers for data (in and output)
    - During communication data 'circles around' between the two shift registers

Communication

1. Master pulls SS to low
2. Master pushed data out of shift register
3. Slave pushes data out of shift register at the same time
4. Sampling happens at SCLK
5. To finish communication master stops SCLK

- No acknowledgement mechanism
- No device interrupts

#### Setup

- Polarity (SCLK):
    - 0: Sampling happens on rising SCLK edge
    - 1: Sampling happens on falling SCLK edge
- Phase (SCLK):
    - 0: Rising SCLK edge in the middle of data
    - 1: Rising SCLK edge on beginning of data

### UART

- Serial transmission (least significant bit first)
- Configurable
    - Number of data bits: 5, 6, 7, 8
    - Parity: odd, even, none
    - Stop-bits: 1, 1.5, 2
    - Transfer rate (bits per second): 75, 110, 300, ..., 115200
    - Flow control exists in some implementations

<!-- End of Week 5 -->

<!-- Beginning of Week 6 -->

# A2 (Case Study 2)

## Intel x86

- Shared Memory (for all processors)
- Symmetrical Multiple Processors (SMP)

### Resources (x86 compatible HW)

[osdev.org](http://wiki.osdev.org)

- SDM: Intel® 64 and IA-32 Architectures Software Developer’s Manual (4000 p., 3 volumes)
    1. Architecture
    2. Instruction Set Reference
    3. System Programming Guide
- MP Spec: Intel Multiprocessor Specification, version 1.4 (100 p.)
- ACPI Spec: Advanced Configuration and Power Interface Specification (1000 p.)
- PCI Spec: PCI Local Bus Specification Rev. 2.2 (322 p.)

### Interrupt System (x86)

- External IRQ's (asynchronous)
    - I/O Devices
    - Timer
    - Inter-processor interrupts
- Software IRQ's (synchronous)
    - Traps/Syscall: special instructions
- Processor exceptions (synchronous)
    - Faults (restartable): i.e page fault
    - Aborts (Fatal): i.e machine check

#### APIC

- Each CPU has local APIC (local interrupts)
- I/O APIC for all CPU's (external interrupts)

- Messages to processors
    - Start Processor: Activation and Initialisation of individual processors
    - Halt Processor: Deactivation of individual processors
    - Halt Process, schedule new process: Interrupt in order to transfer control to scheduler
- Local timers
    - Periodical interrupts

#### MultiProcessor Specification

- Standard by Intel (MP Spec 1.4)
- Hardware Specification
    - Memory Map
    - APIC
    - Interrupt Modes
- MP Configuration Table
    - Processor, Bus, I/O APIC
    - Table address searched via "floating pointer structure"

#### Exception Numbers
| Vector # | Description                | Source                    |
|----------|----------------------------|---------------------------|
| 0        | Div error                  | div / idiv instruction    |
| 1        | Debug                      | Code / data reference     |
| 2        | NMI                        | Non maskable external IRQ |
| 3        | Breakpoint                 | int 3 instruction         |
| 4 – 19   | Other processor exceptions | E.g. page fault etc.      |
| 20-31    | reserved                   |                           |
| 32-255   | Maskable Interrupts        | External Interrupts from `INTR` pin `INT` n instruction |

#### Configuring APIC

- Local Vector Table (for local interrupt sources)
    - Vector Number, Trigger Mode, Status, Interrupt Vector Mask
    - Timer Mode (one shot / periodic)
- Command Register: Inter Processor Interrupt with
    - vector number,
    - delivery mode: fixed, nmi, init, startup (..)
    - logical / physical destination (including self and broadcasts with / without self

### PCI Local Bus

- Connect Peripheral Components
- Standardised Configuration Address Space for all PCI Devices
- Interrupt Routing Configuration

Access mechanism

- PCI BIOS: offers functionality such as "find device by classcode". Presence determined by floating data structure in BIOS ROM
- Addressable via in / out instructions operating on separate I/O memory address space
- PCI Express now Memory Mapped I/O

## Active Oberon Language

### Locks vs. Monitors

- Lock based
    - shared data
    - protected from concurrent access by locks
- Monitor based
    - locks code (methods) that access shared data
    - No direct locking of data structures needed

### Threads vs. Active Objects

- Threads
    - Concurrently running code
- Active Objects
    - Objects that contain threads
    - Threads in form of Monitors

### Object Model (Active Oberon)

- `EXCLUSIVE`: Protection (mutual exclusion)
    - *Methods* tagged `EXCLUSIVE` run under *mutual exclusion*
    - As `synchronized` in Java

-  `AWAIT`: Synchronisation
    - Wait until condition of `AWAIT` becomes true

- `ACTIVE`: Parallelism
    - Body marked `ACTIVE` *executed as thread* for each instance

### Signal-Wait Implementations

- Signal-and-Continue
    - Java uses this
    - Race conditions can occur
- Signal-and-Exit
    - Active Oberon uses this
    - Can be achieved in Java by looping on wait condition

Active Oberon:

    :::modula2
    Semaphore = OBJECT
        number := 1: LONGINT;

        PROCEDURE enter;
        BEGIN{EXCLUSIVE}
            AWAIT number > 0;
            DEC(number)
        END enter;

        PROCEDURE exit;
        BEGIN{EXCLUSIVE}
            INC(number)
        END exit;

    END Semaphore;


Equivalent Java code:

    :::java
    class Semaphore{
        int number = 1;
        synchronized void enter() {
            while (number <= 0)  // while needed!
                try { wait();}
                catch (InterruptedException e) { };
            number--;
        }

        synchronized void exit() {
            number++;
            if (number > 0)
                notify();  /* notifyAll() needed if different threads
                              evaluate different conditions */
        }
    }


### Monitors in Active Oberon

- No *notify()* (or *notifyAll()*): Every `EXCLUSIVE` procedure triggers reevaluation of `AWAIT` when it returns
- Downsides of Monitors:
    - Wasting of processor time on looping on 'locks'
    - Ordering can not be influenced


## Active Object System (A2)

### Modular Kernel Structure

- Cover: Kernel
- Activity Scheduler: Objects
- Module Loader (Memory Management): Modules, Heaps
- Hardware Abstraction: Machine

### Atomic Operations (HW Support)

The supported operations are typically a lot slower than simple read and write operations.

#### Intel (x86)

From AMD64 Architecture Programmer’s Manual:

- `CMPXCHG mem, reg`

"compares the value in Register A with the value in a memory location If the two values are equal,
the instruction copies the value in the second operand to the first operand and sets the ZF flag
in the flag registers to 1. Otherwise it copies the value in the first operand to A register and
clears ZF flag to 0"

- Lock Prefix

"The lock prefix causes certain kinds of memory read-modify- write instructions to occur atomically"

#### ARM

From ARM Architecture Reference Manual:

- `LDREX <rd>, <rn>`

"Loads a register from memory and if the address has the shared memory attribute, mark the physical
address as exclusive access for the executing processor in a shared monitor"

- `STREX <rd>, <rm>, <rn>`

"performs a conditional store to memory. The store only occurs if the executing processor has
exclusive access to the memory addressed"

#### Overview

Some typical instructions for atomic operations and implementation examples.

- Test-And-Set (TAS)
    - `TSL register, flag` (Motorola 68000)
- Compare-And-Swap (CAS)
    - `LOCK CMPXCHG` (Intel x86)
    - `CASA` (Sparc)
- Load Linked / Store Conditional
    - `LDREX` / `STREX` (ARM)
    - `LL` / `SC` (MIPS)

> These hardware instructions are often much slower than simple read and write.
> Caches can't be exploited (direct access to memory)!

- Compare-And-Swap is the most universal instruction

#### Compare-And-Swap (CAS)

Atomic operation implemented in processor.

Compares memory location with an value. If it's same a new (given) value is written at the
memory address. Returns the previous value at memory position in any case.

    :::c
    int CAS(int* a, int old, int new)

- If value `old` is at memory location of `a`: safe `new` at `a`
- Return previous value at `a` in any case

#### Implementation of a spinal using CAS

    :::modula2
    (* Initialisation *)
    Init(lock)
        lock = 0;


    (* Acquire Lock *)
    Acquire (var lock: word)
        repeat
            res := CAS(lock, 0, 1);
        until res = 0;

    (* Release Lock *)
    Release (var lock: word)
        CAS(lock, 1, 0); (* atomicy not needed but visibility/ordering *)

<!-- End of Notes Week 6 -->

<!-- Beginning of Notes Week 7 -->

### Boot Procedure (A2)

- Start BIOS Firmware
- Load A2 Boot-file
- Initialise modules
    - Module *Machine*
    - Module *Heaps*
    - ...
    - Module *Objects*
        - Setup scheduler and self process
    - Module *Kernel*
        - Start all processors
    - ...
    - Module Boot-console
        - read configuration and execute boot commands

> This all happens on the Boot Processor (BP)

#### Processor Startup

- Start processor **P** (Boot-processor)
    1. Setup boot program (`Machine.InitProcessors`)
    2. Enter processor IDs into table (`Machine.InitBootPage`)
    3. Send *startup* message to **P** via APIC (`Machine.ParseMPConfig`)
    4. Wait with timeout on *started* flag by P (`Machine.StartProcessor`)
- Boot program (For each processor)
    1. Set 32-bit run-time environment (`Machine.EnterMP`)
    2. Initializer control registers, memory management, interrupt handling, APIC
    3. Set *started* flag (`Machine.StartMP`)
    4. Setup Scheduler (`Objects.Start`)
    5. Boot-processor proceeds with boot console

### A2 Activities States

- Ready: ready to be scheduled
- Running: currently scheduled
- Waiting
    - Condition (`AWAIT`): waiting until condition is met
    - Lock (`EXCLUSIVE`): waiting to enter monitor
- Terminated: Activity finished executing


> Java doesn't make difference between waiting on a condition or a lock.

![A2 Activities States](/images/syscon_a2_activieties_states.png)

### Run-Time Data Structures

- Running Array/List
    - One entry for each processor
    - Index: id of processor
- Object header (for each object)
    - List of conditions (for each condition)
    - List of locks (for each monitor)
- Ready Queues/Heap
    - Idle
    - Low
    - Medium
    - High
    - Garbage Collector (GC)
    - Real-time (RT)
- Interrupt Array (first level IRQ's)
    - Index: IRQ number

### Stack Management

- Virtual addressing
- Allocation in page units
- Page fault for detecting stack overflow
- Deallocate process stack via garbage collector (in process finalizer)
- Life cycle:
    - CreateProcess: Allocate first frame
    - Page fault: Allocate another frame
    - Finalize: Deallocate all frames

> Active Oberon has one shared memory for all processes!

- One Heap for all processes (no heavy-weight processes)
- Each process has own stack
- All processes share same address space
- 8'000 processes can be allocated
    - 4 GB address space
    - 4 kB pages
    - 1024 pages per process
    - &#x21B3; ~ 8'000 processes

### Context Switch

- Synchronous
    - Explicit
        - A process terminates
        - `Yield`
    - Implicit
        - Mutual exclusion
        - `AWAIT`
- Asynchronous
    - Preemption
        - Priority handling
        - Time-slicing


#### Coroutines (Synchronous)

- Synchronous context switch
- Context switch:
    - Replace *SP* and *FP* of old process with *SP* and *FP* of new process
    - *PC* needs also to be adjusted
- Stack can be used to identify process

#### Asynchronous Context Switch

- Needs to save much more than for a synchronous context switch
- Save *all registers* (copy state)

### Synchronisation

#### Object Locking

- Object descriptors (added by system): Object with mutual exclusion contain additional fields
    - `headerLock: BOOLEAN;`
    - `lockedBy: Process;`
    - `awaitingLock: ProcessQueue;`
    - `awaitingCondition: ProcessQueue;`

- Locking (Procedure `Lock`)
    - Try to acquire object
        - when we have it, we can change the data structure
        - if we don't have it (we need to give up control)
            - Synchronous switching to an other process
            - `Select` and `SwitchTo`
- Unlocking (Procedure `Unlock`)
    - When giving up a lock all conditions need to be evaluated again (signal-and-exit)
    - Otherwise the opposite of locking
- Wait Conditions (`AWAIT`)
    - Internally boxed into a procedure (`PROCEDURE $Condition(fp: ADDRESS): BOOLEAN;`)
    - Stack frame is needed in condition: *FP*
    - `AWAIT` code: put condition on await queue

> Side-effects in `AWAIT` conditions are dangerous!


#### Priority Inversion

Example:

- 3 processes, 1 shared resource
    - P1: low
    - P2: high
    - P3: medium
    - R: shared resource
- P1 locks R
- P2 tries to lock R (needs to wait)
- P3 preempts P1
    - P1 can't release R
    - P2 can't continue until P1 releases R

![Priority Inversion](/images/syscon_priority_inversion.png)

This image is taken from the lecture slides provided by Felix Friedrich

#### Priority Inheritance

- One possibility to cope with priority inversion
- The priority of each process holding a lock to a resource is increased to the highest priority of all waiting processes (for the lock)
- Need to walk the graph of locks and processes

<!-- End of Notes Week 7 -->

<!-- Beginning of Notes Week 8 -->

### Lock-Free Programming

Problems with Locks

- Deadlocks
- Livelocks
- Starvation

Different Goals

- Parallelism
- Progress Guarantees
- Reentrancy
- Granularity
- Fault Tolerance

Definition of Lock-Freedom

> At least one algorithm (process, thread) makes progress, even if others run concurrently, fail or get suspended.

- Starvation can still happen

Definition of Wait-Freedom

> Each algorithm makes eventually progress.

- Implies freedom from starvation

Progress Conditions:

|                         | Blocking        | Non-Blocking |
|-------------------------|-----------------|--------------|
| Someone make progress   | Deadlock-free   | Lock-free    |
| Everyone makes progress | Starvation-free | Wait-free    |


- Lock-free programming basically makes loop around CAS
- Overflows (i.e INTEGER) is critical

#### A2

##### Goals

- Lock Freedom
    - Progress Guarantees
    - Reentrant Algorithms
- Portability
    - Hardware Independence
    - Simplicity, Maintenance

##### Guiding Principles

- Use *implicit cooperative multitasking*
- no virtual memory
- possible optmizations are limited
- Co-design of OS, Compiler and Programming Language

##### Lock-Free Kernel

- Needs lock-free queue
- Compare-And-Swap (CAS) is implemented *wait-free* in hardware

##### Memory Model for Lock-Free Active Oberon

1. Data shared between two or more activities at the same time has to be either
    - protected by `EXCLUSIVE` blocks or
    - read or modified using the *compare-and-swap* operation
2. Changed shared data is visible to other activities after
    - leaving an `EXCLUSIVE` block or
    - executing a *compare-and-swap* operation

- `CAS` is an operation in the programming language

    :::modula2
    PROCEDURE CAS(variable, old, new: BaseType): BaseType


- Performance of `CAS`
    - On the HW level `CAS` triggers a memory barrier
    - Performance suffers with increasing number of contenders (contention)

#### ABA Problem

The [ABA Problem](https://en.wikipedia.org/wiki/ABA_problem) occurs when one thread
fails to recognise that a memory location was
modified temporarily by another thread and therefore erroneously assumes
that the overal state has not been changed.

![ABA Problem](/images/syscon_aba_problem.png)

This image is taken from the lecture slides provided by Felix Friedrich


- The ABA Problem makes it difficult to reuse nodes in a stack structure
    - Possible to allocate always new memory, but it's expensive
- Solution: hazard pointers

##### Hazard Pointers

- ABA Problem because of reuse of pointers
    - Pointer *P* that has been read by one thread *X* but not yet written by same thread
    - Pointer *P* is written by other thread *Y* between reading and writing of first thread *X*
- [Hazard pointers](https://en.wikipedia.org/wiki/Hazard_pointer:
    - Each lock-free datastructure has an array (hazard array) of the size of number of threads (n=number of threads)
    - Before *X* reads *P*, it marks it hazarduous in the hazard array of data structure (e.g. the stack)
    - When finished (after the `CAS`), process *X* removes *P* from the hazard array
    - Before a process *Y* tries to reuse *P*, it checks all entries of the hazard array
- Hazard pointers don't solve problem when several pointers need to be changed at same time
    - i.e Enqueue/Dequeue
    - Solution: use *sentinel*
        - Notion of helping other threads
        - Employ Hazard pointers
<!-- See Notes Week 8 p. 3 45:00 -->

### Cooperative Multitasking (implicit)

- Compiler automatically inserts code for cooperatice multitasking (implicit)
- Each process has a quantum

At regular intervals, the compiler inserts code to decrease the quantum and calls the scheduler if necessary

    :::nasm
       sub    [rcx + 88], 10   ; decrement quantum by 10
       jge    skip             ; check if it is negative (jump if greater)
       call   Switch           ; perform task switch
    skip:
       ; ...

- Uncooperative block (`UNCOOPERATIVE`): Guarantee that no scheduling happens
    - Not like a *lock* different processors can execute the code in parallel
    - like disabling interrupts
- Cons
    - Small overhead of inserted code
    - Sacrifice register (`rcx`)
- Guarantees
    - Max number of parallel execution of uncooperative code is number of processors
    - Hazard pointer can be associated with processor (instead of processes)
    - Search time constant: thread-local storage &rarr; processor local storage

#### Interrupts

- Interrupt handlers are moddeled as *virtual* processors
- M = # of physical processors + # of potentially concurrent interrupts

<!-- End of Week 8 -->

<!-- Beginning of Week 9 -->

#### Queue Data Structures


![Queue Datat Structures](/images/syscon_queue_data_structure.png)

This image is taken from the lecture slides provided by Felix Friedrich


- Hazard Pointers: in use (writing)
- Pool: Reuse nodes that are not used anymore
- Lock-free but not wait-free (starvation possible)
- if not possible to en-/dequeue: help other threads (processors)


##### Scheduling (Activities)

    :::modula2
    TYPE Activity* = OBJECT {DISPOSABLE} (Queues.Item) (* Queues.Item accessed via activity register *)
    VAR
        (* access to current processor *)
        (* stack management *)
        (* quantum and scheduling *)
        (* active object *)
    END Activity;


##### Task Switch Finalizer

Finest granular protection makes **races** possible that did not occur previously:

Need to pass information to the new thread.

    :::modula2
    current := GetCurrentTask()
    next := Dequeue(readyqueue)
    Enqueue(current, readyqueue)
    (* Here an other thread can dequeue and run (on the stack of)
       the currently executing thread! *)
    SwitchTo(next)

- When switching to new thread
    - Enqueue runs on new thread
    - Call finalizer of previous thread

Solution with finalizer:

    :::modula2
    SwitchTo (nextActivity, Enqueue,  (* Enqueue runs on new thread *)
              ADDRESS OF readyQueue[currentActivity.priority]);
    FinalizeSwitch; (* Calls finalizer of previous thread *)


#### Stack Management

- Stacks organized as Heap Blocks
- Stack check instrumented at beginning of procedure
- Stack expansion is possible
- Possiblities to expand stack:
    1. Allocate more memory for stack, copy old stack to beginning of new (pointers to stack need to be updated `VAR` parameters)
    2. Manage stack in a linked list, link to new portion of stack from the old one: `ReturnToStackSegment` funtion needed to go back to previous stack segment

##### Interrupts

- First Level IRQ by non-portable CPU module
- Second level IRQ handling with activities

Wait for interrupt:

    :::modula2
    Interrupts.Await(interrupt);

First level IRQ code affecting scheduler queues runs on a virtual processor

    :::modula2
    PROCEDURE Handle (index: SIZE);
    BEGIN {UNCOOPERATIVE, UNCHECKED}
        IF previousHandlers[index] # NIL THEN
            previousHandlers[index] (index)
        END;
        Activities.CallVirtual(NotifyNext,
    END Handle;

- Very powerful to write IRQ handlers in to levels
- Possible with cooperative multi tasking

##### Lock-Free Memory Management

- Allocation/Deallocation by lock-free algorithms
- Buddy system: old apporach but simple when returning blocks and merging them in free memory
- Mark-and-sweep
    1. Traverse heap and mark used blocks
    2. Remove all unmarked blocks
- Multiple garbage collectors can run in parallel
- Precise: doesn't delete used blocks by accident (can happen in GC with heuristics)
- Optional
- Incremental: Possible to run on a subset all blocks (on different parts of heap)
- Concurrent: GC can run in concurrency of a mutating thread
- Parallel: Several instances of the GC can run at once

Data Structures:

|                | Global            | Per Object      |
|----------------|-------------------|-----------------|
| Mark Bit       | Cycle Count       | Cycle Count     |
| Marklist       | Marked First      | Next Marked     |
| Watchlist      | Watched First     | Next Watched    |
| Root Set       | Global References | Local Refcount  |

- Cycle Count: used to mark visited objects
- Mark List: all objects that were marked previously
- Watch List: all candidates that could be garbage collected
- Root Set: where to start to find all reachable object

### Portability

- Lock-free A2 kernel written exclusively in a high-level language
- No timer interrupt required (cooperative multitasking): scheduler hardware independent
- No virtual memory
    - no separate address spaces
    - everything runs in user mode, all the time
- Hardware-dependent functions (CAS) are pushed into the language
- Almost completely portable:
    - Some minimal stub written in assembly code to initialize memory mappings and initialize all processors

<!-- End of Notes Week 9 -->
