Title: Intel Architecture
Category: Computer Science
Tags: Assembler
Date: 2015-06-22
Modified: 2015-06-23

On this page I write down some notes about the Intel architecture (x86). I learned most of it in [school](http://www.vdf.ethz.ch/info/showDetails.asp?isbnNr=3255) few years ago.

I'ts mainly for Intel 80186. But I'll extend it with informations about modern [Intel processors](http://www.intel.com/content/www/us/en/processors/architectures-software-developer-manuals.html) ([IA-32](https://en.wikipedia.org/wiki/IA-32), [x86-64](https://en.wikipedia.org/wiki/X86-64)).

I'm trying to keep all code examples in [NASM](http://www.nasm.us) syntax.

[TOC]

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

| Register | Value  |
|----------|--------|
| IP       | 0x0000 |
| CS       | 0xffff |
| DS       | 0x0000 |
| ES       | 0x0000 |
| SS       | 0x0000 |

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
