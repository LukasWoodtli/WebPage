---
title: Linux System Calls
category: Programming
tags: [Assembler, Computer Science, OS, Linux]
date: 2017-11-06
---
A system call is the basic interface between applications and the kernel.

Linux has more than 300 [system calls](http://man7.org/linux/man-pages/man2/syscalls.2.html).

The syscalls are implemented by the [`syscall` function](http://man7.org/linux/man-pages/man2/syscall.2.html).

# Intel x86-64

System calls use the default [calling convention](/blog/intel_calling_conventions) (System V AMD64 ABI).

Stack based arguments are not used. This limits the number
of arguments to 6.

Each system call has an unique call code. The call code are provided
in the `rax` register.

Call codes and arguments can be found [here](https://filippo.io/linux-syscall-table/).


## Registers

The registers are only used when needed.

The call code is necessary.

| Register | Usage        |
|----------|--------------|
| `rax`    | Call code, return value after call |
| `rdi`    | 1st argument |
| `rsi`    | 2nd argument |
| `rdx`    | 3rd argument |
| `rcx`    | 4th argument |
| `r8`     | 5th argument |
| `r9`     | 6th argument |


## `SYSCALL` Instruction

After the call code and the arguments are placed in the registers
the `syscall` instruction is executed. Then the current process
will pause and control is passed to the kernel. When the system call
returns the process will be resumed.

