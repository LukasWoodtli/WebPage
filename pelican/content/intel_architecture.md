Title: Intel Architecture
Category: Computer Science
Tags: Assembler
Date: 2015-06-22
Modified: 2015-06-22
Status: draft


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

### Offset Address
To calculate the address offset with immediate addressing  mode the following scheme is used:

$$Offset := \begin{Bmatrix}CS:\\DS:\\SS:\\ES:\end{Bmatrix}\begin{bmatrix}\begin{Bmatrix}-\\BX\\BP\end{Bmatrix}\end{bmatrix} +\begin{bmatrix}\begin{Bmatrix}-\\SI\\DI\end{Bmatrix}\end{bmatrix} + \begin{bmatrix}-\\displacement_8\\displacement_16\end{bmatrix}$$


## Addressing Memory
 For addressing the memory the immediate, direct and indirect method can be used.
