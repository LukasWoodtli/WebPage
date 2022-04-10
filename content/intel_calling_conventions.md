---
title: x86 Calling Conventions
category: Programming
tags: [Assembler, Embedded Systems, Computer Science]
date: 2017-11-05
---

There are a lot of different calling conventions fir x86 processors.
See also [Wikipedia:x86 calling conventions](https://en.m.wikipedia.org/wiki/X86_calling_conventions)


# Unix

System V AMD64 ABI:

- Linux
- macOS
- FreeBSD
- Solaris

This calling conventions are also used for C/C++ programs.

## Instructions

- `call`: Save return address, implicitely pushing `RIP`to stack
- `ret`: Pop's corrent top of stack (`RSP`) into `RIP`

## Argument Passing

The first 6 arguments (integer or pointer) are passed in registers:

| Register | Argument     |
|----------|--------------|
| `RDI`    | 1st argument |
| `RSI`    | 2nd argument |
| `RDX`    | 3rd argument |
| `RCX`    | 4th argument |
| `R8`     | 5th argument |
| `R9`     | 6th argument |

The first 8 floating point arguments are in the registers `xmm0` - `xmm7`.

- Additional arguments are located on the stack in reverse order (from right to left)
- `R10` is used as static chain pointer for nested functions
- Variadic functions:
    - Number of floating point arguments: `RAX`
    - The arguments are passed in the vector registers

## Return Value

The return value is passed in registers `RAX` and if needed also in `RDX`.

If the return value is a floating point number it is passed in `xmm0`.

## Call by Reference (out params)

Output parameters need two steps to return a value:

1. Get the address from the stack
2. Use that address to return the value


## Registers

- Calle: must save and restore `RBP`, `RBX` and `R12`-`R15` if they are used
- Caller: all other registers must be saved and restored if their content is needed after the function cal
- No `XMM` registers are preserved


| Register | Usage         | Notes                              |
|----------|---------------|------------------------------------|
| `rax`    | Return Value  |                                    |
| `rbx`    | Callee Saved  |                                    |
| `rcx`    | 4th Argument  | Not preserved during function call |
| `rdx`    | 3rd Argument  | Not preserved during function call |
| `rsi`    | 2nd Argument  | Not preserved during function call |
| `rdi`    | 1st Argument  | Not preserved during function call |
| `rbp`    | Callee Saved  |                                    |
| `rsp`    | Stack Pointer |                                    |
| `r8 `    | 5th Argument  | Not preserved during function call |
| `r9`     | 6th Argument  | Not preserved during function call |
| `r10`    | Temporary     | Not preserved during function call |
| `r11`    | Temporary     | Not preserved during function call |
| `r12`    | Callee Saved  |                                    |
| `r13`    | Callee Saved  |                                    |
| `r14`    | Callee Saved  |                                    |
| `r15`    | Callee Saved  |                                    |
| `xmm0` - `xmm15` |       | Not preserved during function call |


## Clean-Up

The caller is responsible for clearing the argument from the stack.
This is usually donne by adjusting the `RSP`, instead of `POP` instructions.

```nasm
add rsp, numberOfArguments * 8 ; number of arguments placed on stack
```


## Stack Frame

The stack frame is the data on the stack that belong to one function call.
It's also called activation record or call frame.

[Here](https://eli.thegreenplace.net/2011/09/06/stack-frame-layout-on-x86-64) is a good explanation.

1. Arguments that are not passed in registers
2. Return address (saved by `call`)
3. Saved `rbp` from last stack frame. `rbp` needs to point now to this address
4. Local variables. `rsp` points to last used address
5. After the last stack frame there are 128 bytes *red zone*

> The System V AMD64 ABI doesn't require to use the base pointer

To save and adjust `rbp`:

```nasm
; prologue
push rbp
   ; save the 'old' `rbp` on the stack
mov rbp, rsp   ; adjust `rbp` to point to the just saved 'old' `rbp`
```

## The Red Zone

- The 128 bytes after the last stack frame are reserved for compiler optimization
- This range is not allowed to be changed asynchonically (e.g by signals or IRQ handlers)
- Some functions (i.e. leaf functions) don't need a stack frame at all. They can use the red zone
