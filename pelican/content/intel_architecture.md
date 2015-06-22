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

    MOV CL, 42; move the value 42 to register CL

## Implicit

Some commands work always with the same register/address. i.e:

PUSH/POP work. always with SP register

## Register

The operand is held in a register

    INC CH;


## Direct

The address of the operand value comes directly after the command. i. e:

MOV CX, counter;

## Register-Indirect

The operand is given indirectly by one or two registers. i.e:

MOV [BX + DI], CH;

### Offset Address
To calculate the address offset with immediate addressing  mode the following scheme is used:

TODO


## Addressing Memory
 For addressing the memory the immediate, direct and indirect method can be used.
