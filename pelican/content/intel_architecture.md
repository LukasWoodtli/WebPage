Title: Intel Architecture
Category: Computer Science
Tags: Assembler
Date: 2015-06-22
Modified: 2015-06-23

On this page I write down some notes about the Intel architecture (x86). I learned most of it in [school](http://www.vdf.ethz.ch/info/showDetails.asp?isbnNr=3255) few years ago.

I'ts mainly for Intel 80186. But I'll extend it with informations about modern [Intel processors](http://www.intel.com/content/www/us/en/processors/architectures-software-developer-manuals.html) ([IA-32](https://en.wikipedia.org/wiki/IA-32), [x86-64](https://en.wikipedia.org/wiki/X86-64)).

I'm trying to keep all code examples in [NASM](http://www.nasm.us) syntax.

[TOC]

# General

|               |                                                                               |
|---------------|-------------------------------------------------------------------------------|
| CPU Design    | [CISC](https://en.wikipedia.org/wiki/Complex_instruction_set_computing)       |
| Endianness    | [little](https://en.wikipedia.org/wiki/Endianness)                            |
| Type          | [Register-memory](https://en.wikipedia.org/wiki/Register_memory_architecture) |


# Operation Modes

| Mode              | Introduced in |
|-------------------|---------------|
| Real Mode         | 8086          |
| Protected Mode    | 80286         |
| Virtual 8086 mode | 80386         |
| Long Mode         | x86-64        |


# Registers

This are the 16-bit registers of Intel 8086, 8088,  80186 and 80188.

| Register          | Purpose                         | Notes                                                                              |
|-------------------|---------------------------------|------------------------------------------------------------------------------------|
| AX                | General-Purpose Register (GPR)  | Accumulator for `IN`/`OUT` (AX or AL). Can be used as 8-bit registers (AH/AL).     |
| BX                | General-Purpose Register (GPR)  | Base index (array). Can be used as 8-bit registers (BH/BL).                        |
| CX                | General-Purpose Register (GPR)  | Only register that can be used for `LOOP`. Can be used as 8-bit registers (CH/CL). |
| DX                | General-Purpose Register (GPR)  | Needs to contain port address for `IN`/`OUT`. Extend precision of accumulator. Can be used as 8-bit registers (DH/DL). |
| DI                | Destination Index               | Destination for string operations.                                                 |
| SI                | Source Index                    | Source for string operations.                                                      |
| BP                | Base Pointer                    | Often used as Frame Pointer (pointing to current stack frame).                     |
| SP                | Stack Pointer                   | Points to the top of the stack.                                                    |
| CS                | Segment Register                | Code Segment.                                                                      |
| DS                | Segment Register                | Data Segment.                                                                      |
| SS                | Segment Register                | Stack Segment.                                                                     |
| ES                | Segment Register                | Extra Segment.                                                                     |
| FLAGS             | Status Register                 | Carry Flag, Overflow Flag, Zero flag...                                            |
| IP                | Instruction Pointer             | Points to the *next* instruction (cannot be directly accessed).                    |


## 8-bit Registers
Each of the *GPRs* can be accessed as two 8 bit registers. i. e:
*BX's* high byte can be accessed as *BH* and low byte as *BL*.

## Values after Reset

| Register | Value    |
|----------|----------|
| IP       | `0x0000` |
| CS       | `0xffff` |
| DS       | `0x0000` |
| ES       | `0x0000` |
| SS       | `0x0000` |

All other registers have a random value after reset.


## FLAGS Register

| Bit      |     15   |     14             |     13 and 12              |     11   |     10    |     9            |     8    |
|----------|:--------:|:------------------:|:--------------------------:|:--------:|:---------:|:----------------:|:--------:|
| Mnemonic |  -       |  NT                | IOPL                       |  OF      | DF        |  IF              |  TF      |
| Meaning  | Reserved | Nested Task (286+) | I/O Privilege Level (286+) | Overflow | Direction | Interrupt Enable |  Trap    |

| Bit      |    7   |    6   |     5    |    4   |     3    |    2   |     1    |   0   |
|----------|:------:|:------:|:--------:|:------:|:--------:|:------:|:--------:|:-----:|
| Mnemonic |  SF    |  ZF    |  -       | AF     |  -       |  PF    |  -       |  CF   |
| Meaning  | Sign   | Zero   | Reserved | Adjust | Reserved | Parity | Reserved | Carry |


# Segmentation

To allow access to 20-bit addresses with 16-bit registers the 8086 uses segmentation.

$$physical\_ address = segment\_ register \times 10_{hex} + offset$$


- $\times 10_{hex}$ means a 4-bit shift to left
- Each addressable segment is 64 kB big.
- 20-bit address bus: Total $2^{20}$ bytes addressable (1'048'576 bytes = 1 MB).
- 16-bit offset: $2^{16}$ bytes addressable (65'536 bytes = 64 kB) per segment.
- Needed segments: $2^{20}/2^{16} = 2^4 = 16$ segments needed to access complete address space.
- Segments can overlap or there can be gaps between them.


# Addressing

Intel processors have 5 different addressing modes.

## Imediate

The operand (constant) is given with the command. i.e:

<pre>MOV CL, <strong>42</strong>; move the value 42 to register CL</pre>


## Implicit

Some commands work always with the same register/address. i.e:

`PUSH`/`POP` work always with SP register.

## Register

The operand is held in a register

<pre>INC <strong>CH</strong>; Increment value in CH register</pre>


## Direct

The address of the operand value comes directly after the command. i. e:

<pre>MOV CX, <strong>counter</strong>; counter holds the address of the value</pre>

## Register-Indirect

The operand is given indirectly by one or two registers. A segment register and a constant offset value can be supplied.

The calculated value acts as a pointer (address to a memory location).

i.e:

<pre>MOV <strong>[BX + DI]</strong>, CH; calculate the operand with the values from BX and DI</pre>

### Address
To calculate an address the following scheme is used:

$$Offset := \begin{Bmatrix}-\\CS:\\DS:\\SS:\\ES:\end{Bmatrix}\begin{Bmatrix}-\\BX\\BP\end{Bmatrix} +\begin{Bmatrix}-\\SI\\DI\end{Bmatrix} + \begin{Bmatrix}-\\displacement_8\\displacement_{16}\end{Bmatrix}$$

$-$ means that this element is not used.

The three possible address parts are:

1. Basis Register (BX or BP): Contains usually the start address of a data structure. A segment prefix can be given.
2. Index Register (SI or DI): Can contain an index (i.e Array index) that can be calculated at runtime. It's 16-bit unsigned.
3. Displacement: A *signed* constant value (8-bit or 16-bit) that gives an offset.

This addressing scheme gives a total of 27 addressing combinations. But only *24* combinations are allowed. The following three are **not allowed**:

- No address at all: <pre><strike>MOV AX, [];</strike></pre> or <pre><strike>MOV AX, ;</strike></pre>
- Only 8-bit displacement: Only memory 0-255 could be addressed.
- Only BP: BP points to stack. No practical use. <pre><strike>MOV AX, [BP];</strike></pre>

#### Segment Prefix

A segment prefix (**CS:**, **DS:**, **ES:** or **SS:**) defines which segment register will be used for calculating the address.
Default for most registers is DS. But for BP the default is SS.

#### Operand Size (`WORD`, `DWORD`...)

In some cases the size of an operand can be given (for some cases it is even mandatory). Size types:


`BYTE`, `WORD`, `DWORD`, `QWORD`, `TBYTE`, `FAR`...

#### Examples

    :::nasm
    MOV DX, [BX];
    MOV AL, [BX+4];
    MOV CX, [CS:BX+SI];
    MOV ES, [BX+DI+2];
    MOV WORD [ES:BX+DI+8], AX;



## Addressing Memory
 For addressing the memory the immediate, direct and indirect method can be used.


# Data Transfer Commands

## Move Command (`MOV`)

Moves (copies) a value from a source to a destination.

    :::nasm
    MOV dest, src;

- `dest` can be a memory variable or a register (but not CS or IP).
- `src` can be a memory variable, a register or a constant.
- Only one memory operand can be used. Then the other one needs to be a register or a constant.


## Exchange Command (`XCHG`)

Exchanges the values of the two operands (memory/registers).

    :::nasm
    XCHG op1, op2

- Addressing memory/register is same as with `MOV`.
- Segment Register and Immediate addressing is not possible.

## Input-/Output Commands (`IN`/`OUT`)

For reading and writing data to/from ports

Input/Output can only be done with accumulator register (AX/AL).

Port address needs to be written to DX before calling the IN-/OUT-Command. As special case a 8-bit port address can be given directly.

    :::nasm
    IN AL, DX;
    OUT DX, AX;
    IN AX, 42h;
    OUT 16h, AL;

It's not possible communicate directly between memory and ports. For this a DMA (Direct Memory Access) Hardware would be needed.

# Arithmetic Commands

- The result of arithmetic commands is written to the first operand (the original value is lost).
- Both operands (of binary arithmetic commands) need to be of same size.
- Only one operand is allowed to be a memory operand.

## Addition (`ADD`)

Adds the two operands and writes the result into the first one. The first operand can not be a constant.

### Affected Flags

- Carry: with unsigned operands
- Overflow: with signed operands
- Zero: if result is zero
- Sign: if signed result is negative
- Parity: if parity is even

## Addition with Carry (`ADC`)

Adds the two operands and the carry flag. The result is written into the first operand. The first operand can not be a constant.

> Addition of big signed operands can be splitted into several `ADC` commands.

### Affected Flags

- Carry: with unsigned operands
- Overflow: with signed operands
- Zero: if result is zero
- Sign: if signed result is negative
- Parity: if parity is even


## Increment (`INC`)

Adds one to the operand. The result is saved in the given operand.

### Affected Flags

- Overflow: with signed operands
- Zero: if result is zero
- Sign: if signed result is negative
- Parity: if parity is even

> The carry-flag is not affected! An overflow can be recognized with the zero-flag.

> `INC` can be used to increment a control variable in a loop without affecting the carry-flag.

## Subtraction (`SUB`)

Subtracts the second operand from the first. The result is written into the first operand. The first operand can not be a constant.

### Affected Flags

- Carry: with unsigned operands
- Overflow: with signed operands
- Zero: if result is zero
- Sign: if signed result is negative
- Parity: if parity is even

## Subtraction with Borrow (`SBB`)

Subtracts the second operand and the carry-flag (borrow) from the first operand. The result is written into the first operand. The first operand can not be a constant.

### Affected Flags

- Carry: with unsigned operands
- Overflow: with signed operands
- Zero: if result is zero
- Sign: if signed result is negative
- Parity: if parity is even

> Subtraction of big signed operands can be splitted into several `SBB` commands.

## Decrement (`DEC`)

Subtracts one from the given operand.

### Affected Flags

- Overflow: with signed operands
- Zero: if result is zero
- Sign: if signed result is negative
- Parity: if parity is even

> The carry-flag is not affected! An overflow can be only recognized with checking the result for 0xFF.

> `DEC` can be used to decrement a control variable in a loop without affecting the carry-flag.

## Negate a signed Number (`NEG`)

Changes a negative into a positive number and vice versa. It's basically subtracting the operand from zero (0).

### Affected Flags

- Carry: set if operand wasn't zero (not very useful)
- Overflow: if no positive representation exist (operand was biggest negative number)
- Zero: if result is zero
- Sign: if signed result is negative
- Parity: if parity is even

## Multiplication (`MUL`, `IMUL`)

Multiplicates unsigned (`MUL`) or signed (`IMUL`) numbers.

There is a explicit operand given after the command and an implicit operand in the AX or AL register.

The explicit operand sets the size and defines the used implicit register. It can be either a register or a memory location.

The result is always twice as big as the operands. It's either the accumulator (*AX*)
or the **extended accumulator** (*DX/AX*).

![The x86 MUL/IMUL commands](/images/intel_mul.svg)

    ::nasm
    MUL 0x0 ; Use AL as implicit operand. Result is saved in AX.
    IMUL BX ; Use AX as implicit operand. Result is saved in DX/AX.

### Affected Flags

- Carry: set if operand extended acumulator is needed for saving result (*DX/AX*)
- Zero: changed (undefined)
- Sign: changed (undefined)
- Parity: changed (undefined)

> The 8086 can not multiply with constants (immediate).

## Division (`DIV`, `IDIV`)

There are different division operations for unsigned (`DIV`) and signed (`IDIV`) numbers.

The explicit operand (given directly after the command) defines the size of the operands.
It can be a register or a memory location.

The implicit operand is the accumulator (*AX*) or the extended accumulator (*DX/AX*), dependant on
the size of the explicit operator.

The result (quotient) is saved either in *AX* or *AL*. The remainder is saved in either *DX* or *AH*.

![The x86 MUL/IMUL commands](/images/intel_div.svg)

    ::nasm
    DIV BX ; Use DX/AX  as implicit operand. Result is saved in AX. Remainder is saved in DX.
    IDIV 0x34 ; Use AX as implicit operand. Result is saved in AL. Remainder is saved in AH.

### Affected Flags

- **All** flags are changed to *undefined*!

> If the result is too big for the register *AL* resp. *AX* a interrupt (*division error*) is caused.
> If it is not handled the **program can crash** (undefined behaviour).

## Convert Operand Size (`CBW`, `CWD`)

The commands *convert byte to word* (`CBW`) and *convert word to doubleword* (`CWD`) convert a *signed*
number to a number of the same value but twice the size. This is needed to keep the
[two's complement](https://en.wikipedia.org/wiki/Two%27s_complement) format.

# Logical Commands

## And, Or and Xor (`AND`, `OR`, `XOR`)

Bitwise **and**, **or** or **xor**  operation. The first operand can be a register or a memory address. The second operand can
be a register, a memory address or a constant.

The first operand is overwritten with the result.

### Affected Flags

- Carry and Overflow: are always reset (0)
- Zero and Sign: are set according to the result


## Not (`NOT`)

Bitwise **not** (inverse) operation. The operand can be a register or a memory address.

The operand is overwritten with the result.

### Affected Flags

- **No** flags are changed

# Rotation Commands

## Roatate (`ROL`, `ROR`)

Rotate left (`ROL`) or right (`ROR`).

Rotates the first operand (memory or register) by the constant **1** (immediate) or by the value given in *CL*.

    ::::nasm
    ROL 0x34, 1; Rotate by one.
    ROR AX, CL; Rotate by value in CL.

### Affected Flags

- Overflow:
    * For one-bit rotation: Overflow set if MSB is changed by the rotation. Otherwise it's not set.
    * For other cases: Overflow is undefined
- Carry has the value of the bit that was shifted from one end to the other.

## Rotate with Carry (`RCL`, `RCR`)

Rotate left (`RCL`) or right (`RCR`) with carry as MSB.

The first operand (memory or register) is extended with the carry bit as the MSB.
It is then rotated by the constant **1** (immediate) or by the value given in *CL*.


### Affected Flags

- Overflow:
    * For one-bit rotation: Overflow set if MSB is changed by the rotation. Otherwise it's not set.
    * For other cases: Overflow is undefined
- Carry has the value of the bit that was shifted from one end to the other.

# Manipulate the Carry Flag (`CLC`, `STC`, `CMC`)

Clear Carry Flag (`CLC`): CF = 0.

Set Carry Flage (`STC`): CF = 1.

Complement Carry Flag (`CMC`): CF = !CF.

# Shift Commands

The shift commands can be used to multiply with or divide by a
power of two (2, 5, 8, ...).

For a multiplication or a division of a *unsigned* number the *logical
shift operators* need to be used.

For a multiplication or a division of a *signed* number the *arithmetic
shift operators* need to be used.

## Left Shift Commands (`SHL`, `SAL`)

Both left shift operators are functional identical. They muliplicate
the operator by *2* or by $2^{CL}$.

Shifts the given operator (memory or register) left by
the constant **1** (immediate) or by the value given in *CL*.

### Affected Flags

- Zero
- Sign
- Offset
-  For one-bit shift:
    * Carry: For unsigned Operands a set carry flag means *overflow*
    * Overflow: For signed Operands a set overflow flag means *overflow*

## Right  Shift Commands (`SHR`, `SAR`)


The *logical shift right* (`SHR`) divides a unsigned value by *2* or by $2^{CL}$.

The *arithmetic shift right* (`SHR`) divides a unsigned value by *2* or by $2^{CL}$.
The sign stays unchanged.


The first operand is a memory location or a register. The second operand is the
constant **1** or the register *CL*.

### Affected Flags

- CF: For one-bit shifts the carry flag holds the remainder of the division
- ZF
- SF
- (OF)

# Jump Commands

Jump commands can be divided by different topics.

## Conditional/Unconditional Jumps

Unconditional jumps are always performed. Conditional jumps are only
performed if a check gives an expected result (i.e flags).

## Short, Near and Far Jumps

- Short: signed 8-bit distance
- Near: unsigned 16-bit distance
- Far: 32-bit (Segment and Offset)

## Direct and Indirect Jumps

- Direct: The target address is given directly after the command
- Indirect: The position is given indirectly by a register or a memory position

## Absolute and Relative Jumps

- Absolute jumps: The target address is an absolute address
- Relative jumps: The target address is given relative to the actual position (*IP*)

The 8086 has following possible jump commands:

![The Intel x86 jump commands](/images/intel_architecture_jump.svg)

## Intra- and Inter-Segment Jumps

All jumps change the *IP* register.

Far jumps also change the *CS* register.

### Intra-Segment Jump

Short- and Near-Jumps change only the *IP* register. The target
is always inside the actual code segment (*CS*).

#### Near Jump

- Direct Near-Jumps are always relative to *IP*.
- Indirect Near-Jumps are always absolute to the actual code segment.

#### Short Jump

Short Jumps are always relative to *IP*.

### Inter-Segment Jump

Far jumps change *CS* and *IP*.

All far jumps are absolute.

## Unconditional Jumps

- 8-bit displacement is added to *IP* as signed number:<pre><strong>JMP</strong> displ8</pre>
- 16-bit displacement is added to *IP* as unsigned number:<pre><strong>JMP</strong> displ16</pre>
- The constant is the absolute 32-bit FAR-addresd:<pre><strong>JMP</strong> const32</pre>
- *IP* is loaded with the value of the register:<pre><strong>JMP</strong> reg16</pre>
- *IP* is loaded with the value given by the memory position:<pre><strong>JMP</strong> mem16</pre>
- *CS* and *IP* are loaded with the value at the memory position:<pre><strong>JMP</strong> mem32</pre>

## Conditional Jumps

Conditional jumps check one or more flags and jump to a given address if a condition is met.

Before the jump can be performed the flags need to be set by a logical or arithmetic command.
Alternatively the commands `CMP` and `TEST` can be used.

Conditional jumps can be divided into following groups:

- Arithmetic jumps: The jump depends on size difference of two operands. The two operands have to be *divided* in advance.
                    One or more flags have to be checked.
- Flag oriented jumps: A jump is performed if *one* given flag is set or deleted.

### Arithmetic Jumps

The jump is performed if the size relation between two given operands is as expected.

The relation is expressed differently for signed and unsigned operands:

| Relation | unsigned | signed  |
|----------|----------|---------|
|  $=$     | equal    | equal   |
|  $<$     | below    | less    |
|  $>$     | above    | greater |

#### Arithmetic *"unsigned"* Jumps

| Relation    | Command | Explanation                | Condition             |
|-------------|---------|----------------------------|-----------------------|
| $=$         | `JE`    | Jump if equal              | ZF $=$ 1              |
| $\neq$      | `JNE`   | Jump if not equal          | ZF $=$ 0              |
| $<$         | `JB`    | Jump if below              | CF $=$ 1              |
| $\ngeq$     | `JNAE`  | Jump if not above or equal | CF $=$ 1              |
| $\ge$       | `JAE`   | Jump if above or equal     | CF $=$ 0              |
| $\not<$     | `JNB`   | Jump if not below          | CF $=$ 0              |
| $\le$       | `JBE`   | Jump if below or equal     | CF $=$ 1 or ZF $=$ 1  |
| $\not>$     | `JNA`   | Jump if not above          | CF $=$ 1 or ZF $=$ 1  |
| $>$         | `JA`    | Jump if above              | CF $=$ 0 and ZF $=$ 0 |
| $\not\le$   | `JNBE`  | Jump if not below or equal | CF $=$ 0 and ZF $=$ 0 |


#### Arithmetic *"signed"* Jumps

| Relation    | Command | Explanation                  | Condition                |
|-------------|---------|------------------------------|--------------------------|
| $=$         | `JE`    | Jump if equal                | ZF $=$ 1                 |
| $\neq$      | `JNE`   | Jump if not equal            | ZF $=$ 0                 |
| $<$         | `JL`    | Jump if less                 | OF $\neq$ SF             |
| $\ngeq$     | `JNGE`  | Jump if not greater or equal | OF $\neq$ SF             |
| $\ge$       | `JGE`   | Jump if greater or equal     | OF $=$ SF                |
| $\not<$     | `JNL`   | Jump if not less             | OF $=$ SF                |
| $\le$       | `JLE`   | Jump if less or equal        | OF $\neq$ SF or ZF $=$ 1 |
| $\not>$     | `JNG`   | Jump if not greater          | OF $\neq$ SF or ZF $=$ 1 |
| $>$         | `JG`    | Jump if greater              | OF $=$ SF and ZF $=$ 0   |
| $\not\le$   | `JNLE`  | Jump if not less or equal    | OF $=$ SF and ZF $=$ 0   |


### Flag oriented Jumps

| Command | Explanation         | Condition  |
|---------|---------------------|------------|
| `JZ`    | Jump if zero        | ZF $=$ 1   |
| `JNZ`   | Jump if not zero    | ZF $=$ 0   |
| `JC`    | Jump if carry       | CF $=$ 1   |
| `JNC`   | Jump if no carry    | CF $=$ 0   |
| `JS`    | Jump if sign        | SF $=$ 1   |
| `JNS`   | Jump if no sign     | SF $=$ 0   |
| `JO`    | Jump if overflow    | OF $=$ 1   |
| `JNO`   | Jump if no overflow | OF $=$ 0   |
| `JP`    | Jump if parity      | PF $=$ 1   |
| `JNP`   | Jump if no parity   | PF $=$ 0   |
| `JPE`   | Jump if parity even | PF $=$ 1   |
| `JPO`   | Jump if parity odd  | PF $=$ 0   |


## Compairing Commands (`CMP`, `TEST`)

Since the different jump commands depend on flags set or not there
are special commands that only affect the flags.

- `CMP` is a subtraction of the operands (8-bit or 16-bit) but it only changes the flags.
   The result is not written anywhere.
- `TEST` is a *AND* operation of the operands (8-bit or 16-bit) that only changes the flags.
   The result is not written anywhere.

Both commands accept a register or a memory location as first operand and a register, a memory location
or a constant as second operator.

# Loop Commands (`LOOPx`, `JCXZ`)

All loop commands accept an displacement operator (8-bit).

None of the loop commands affects any flags!

## Loop (`LOOP`)

Decremets *CX* by one (1). If *CX* is not zero (*CX* $\neq$ 0) it performs the jump.

## Loop while equal and Loop while zero (`LOOPE`, `LOOPZ`)

`LOOPE` and `LOOPZ` are different mnemonics for the same command.

Decrements *CX* by one (1). Performs the jump if if Zero Flag is set and *CX* is not zero (0).

Jump if: ZF $=$ 1 and CX $\neq$ 0

## Loop while not equal and Loop while not zero (`LOOPNE`, `LOOPNZ`)

`LOOPNE` and `LOOPNZ` are different mnemonics for the same command.

Decrements *CX* by one (1). Performs the jump if if Zero Flag is not set and *CX* is not zero (0).

Jump if: ZF $=$ 0 and CX $\neq$ 0

## Jump if *CX* zero (`JCXZ`)
Performs the jump if *CX* is zero.

Jump if: CX $=$ 0

