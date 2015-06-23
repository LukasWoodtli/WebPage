Title: Intel Architecture
Category: Computer Science
Tags: Assembler
Date: 2015-06-22
Modified: 2015-06-23

On this page I write down some notes about the Intel architecture (x86) that I learned in school. I'ts mainly for Intel 80186. But I'll extend it with informations about modern Intel processors ([IA-32](https://en.wikipedia.org/wiki/IA-32), [x86-64](https://en.wikipedia.org/wiki/X86-64)).

[TOC]


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

The operand is given indirectly by one or two registers. i.e:

<pre>MOV <strong>[BX + DI]</strong>, CH; calculate the operand with the values from BX and DI</pre>

### Address
To calculate the address with immediate addressing  mode the following scheme is used:

$$Offset := \begin{Bmatrix}-\\CS:\\DS:\\SS:\\ES:\end{Bmatrix}\begin{Bmatrix}-\\BX\\BP\end{Bmatrix} +\begin{Bmatrix}-\\SI\\DI\end{Bmatrix} + \begin{Bmatrix}-\\displacement_8\\displacement_{16}\end{Bmatrix}$$

$-$ means that this element is not used.

The three possible address parts are:

1. Basis Register (BX or BP): Contains usually the start address of a data structure.
2. Index Register (SI or DI): Can contain an index (i.e Array index) that can be calculated at runtime. It's 16-bit unsigned.
3. Displacement: A *signed* constant value (8-bit or 16-bit) that gives an offset.

This addressing scheme gives a total of 27 addressing combinations. But only *24* combinations are allowed. The following three are **not allowed**:

- No address at all: <pre><strike>MOV AX, [];</strike></pre> or <pre><strike>MOV AX, ;</strike></pre>.
- Only 8-bit displacement: Only memory 0-255 could be addressed.
- Only BP: BP points to stack. No practical use. <pre><strike>MOV AX, [BP];</strike></pre>.

#### Examples

    :::nasm
    MOV DX, [BX];
    MOV AL, [BX+4];
    MOV CX, [BX+SI];
    MOV ES, [BX+DI+2];



## Addressing Memory
 For addressing the memory the immediate, direct and indirect method can be used.

# Registers

This are the 16 bit registers of Intel 8086, 8088,  80186 and 80188.

| Register          | Purpose                         | Notes                                                            |
|-------------------|---------------------------------|------------------------------------------------------------------|
| AX                | General-Purpose Register (GPR)  |                                                                  |
| BX                | General-Purpose Register (GPR)  |                                                                  |
| CX                | General-Purpose Register (GPR)  | Only register that can be used for `loop`.                       |
| DX                | General-Purpose Register (GPR)  |                                                                  |
| SP                | Stack Pointer                   | Points to the "top" of the stack.                                |
| BP                | Base Pointer                    | Often used as Frame Pointer.                                     |
| SI, DI, BX and BP | Address Registers               | May also be used for array indexing.                             |
| CS, DS, SS and ES | Segment Registers               | Used to form a memory address.                                   |
| FLAGS             | Status Register                 | Carry Flag, Overflow Flag, Zero flag...                          |
| IP                | Instruction Pointer             | Points to the *next* instruction (cannot be directly accessed).  |


## 8-bit Registers
Each of the *GPRs* can be accessed as two 8 bit registers. i. e:
*BX's* high byte can be accessed as *BH* and low byte as *BL*.

## FLAGS Register

| Bit      |     15   |     14             |     13 and 12              |     11   |     10    |     9            |     8    |
|----------|:--------:|:------------------:|:--------------------------:|:--------:|:---------:|:----------------:|:--------:|
| Mnemonic |  -       |  NT                | IOPL                       |  OF      | DF        |  IF              |  TF      |
| Meaning  | Reserved | Nested Task (286+) | I/O Privilege Level (286+) | Overflow | Direction | Interrupt Enable |  Trap    |

| Bit      |    7   |    6   |     5    |    4   |     3    |    2   |     1    |   0   | 
|----------|:------:|:------:|:--------:|:------:|:--------:|:------:|:--------:|:-----:| 
| Mnemonic |  SF    |  ZF    |  -       | AF     |  -       |  PF    |  -       |  CF   | 
| Meaning  | Sign   | Zero   | Reserved | Adjust | Reserved | Parity | Reserved | Carry | 
