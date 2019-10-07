Title: GCC, binutils and other developer tools
Category: Programming
Tags: C, C++, OS, Linux
Date: 2018-02-22

> Work in Progress!

[TOC]


# ld

## Flags

If the linker is called through the compler the linker flags need to be added with `-Wl,<linker-flag>`.

- `-z now`: Symbols are resolved at program initialization time (instead of lazy, dynamic binding through PLT)
- `-O1` (linker!)
- `--no-undefined`: gives an error if some symbols are not available in the object files at linking stage
- `--no-allow-shlib-undefined`: Similar to `--no-undefined`, but gives an error if symbols are not available in other shared libraries we link against
- `--as-needed`: Link only libraries that are needed

See also: [The new "--as-needed" option to the GNU linker](http://www.bnikolic.co.uk/blog/gnu-ld-as-needed.html)

## Environment Variables

- `LD_BIND_NOW`: same as linker flag `-z now`
- `LD_PRELOAD`: Add libraries that are loaded first (can be used to override functionality)
- `LD_DEBUG`: Trace functionality of the linker/loader
- `LD_DEBUG_OUTPUT`


# readelf

## Show which libraries have been linked

`readelf -a <prog> | grep "Shared library"`

## Show the run-time linker

`readelf -a <prog> | grep "program interpreter"`

# objdump

## Flags

- `-d`: disassemble
- `-C`: demangle C++ symbols
- `--no-show-raw-insn`: Do not print the instruction bytes in disassembled code


# Link Time Optimization

Add `-flto` flag to compile and link commands.


# Find Unused Code

Add flags `-ffunction-sections` and `-fdata-sections` to the compiler invocation. For the linker use the flags `--gc-sections` and `--print-gc-sections`.

These flags can prevent some optimizations.

# Output Link Map

The link map contains information about object files, symbols, addresses...

Add these flags to the linker invocation: `--cref -Map name.map`


# Dump Default Linker Script

`gcc -o /dev/null -xc /dev/null -Wl,--verbose`



# Library Directories

[Print `ld` search pathes](https://stackoverflow.com/questions/9922949/how-to-print-the-ldlinker-search-path)
