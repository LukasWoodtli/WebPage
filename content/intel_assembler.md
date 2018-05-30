Title: Intel Assembler Overview
Category: Programming
Tags: Computer Science, Assembler
Date: 2017-10-17

[TOC]

# Program Format

Typical sections of an assembler program are:

- `Data` section: declaration and definition of initialized data
- `BSS` section: declaration of uninitialized data
- `Text` section: where the code is placed


# Comments

Code comments are written using the semicolon (`;`).
It can be placed anywhere. Everything to the end of the line is ignored.


# Numeric Literals

| Radix   | Format      | Example |
|---------|-------------|---------|
| Decimal | *default*   | `127`   |
| Hex     | `0x` prefix | `0x7F`  |
| Octal   | `q` postfix | `177q`  |



# Constants

    :::nasm
    <name>  equ   <value>

Constants are substituted with their value during the assembly process.
They are not assigned a memory location

Example:

    :::nasm
    SIZE  equ   127


# Initialized Variables (data)

- Declared in `section .data`
- Name, data type and initial value
- Supported data types:
    - `db`: 8-bit(byte)
    - `dw`: 16-bit (word)
    - `dd`: 32-bit (double word)
    - `dq`: 64-bit (quad word)
    - `ddq`: 128-bit integer
    - `dt`: 128-bit float
- Arrays are Initialized with comma separated values

Format:

    :::nasm
    <varName>  <dataType>   <initialValue>

Examples:

    :::nasm
    bVal db 2            ; byte
    cVal db "H"          ; char
    str db "Hello World" ; string
    wVal dw 5000         ; 16-bit word
    dVal dd 50000        ; 32-bit (double word)
    arr dd 100, 200, 300 ; 3 element array
    flt1 dd 3.14159      ; 32-bit float
    qVar dq 1000000000   ; 64-bit (quad word)


# Uninitialized Variables (BSS)

- Declared in `section .bss`
- Name, data type and count
- Supported data types:
    - resb 8-bit (byte)
    - resw 16-bit (word)
    - resd 32-bit (double-word)
    - resq 64-bit (quad-word)
    - resdq 128-bit (double quad-word)



Format:

    :::nasm
    <varName>  <resType>   <count>

Examples:

    :::nasm
    bArr resb 5   ; 5 element byte array
    wArr resw 20  ; 20 element word array
    dArr resd 30  ; 30 element double array
    qArr resq 25  ; 25 element quad array

# Code (text)

- Placed in `section .text
- initial program entry point needs to be defined

For the standard linker (Linux) the entry point is defined:

    :::nasm
    global _start
    _start:


# Assembler Directives

Assembler directives are instrutions for the assembler that are not directly translated
to CPU instrutions.


# Labels

- Labels are used as targets for jumps
- Can contain letters, numbers and `_`
- Terminated with colon (`:`)
- Case sensitive (at least in *yasm*)
- May be definied only once

Examples:

    :::nasm
    loopBegin:
    end:


