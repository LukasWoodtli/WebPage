Title: GCC, binutils and other developer tools
Category: Programming
Tags: C, C++, OS, Linux
Date: 2018-02-22

> Work in Progress!



# ld

## Flags

- `-z now`
- `-O1` (linker!)
- `--no-undefined`: gives an error if some symbols are not available in the object files at linking stage
- `--no-allow-shlib-undefined`: Similar to `--no-undefined`, but gives an error if symbols are not available in other shared libraries we link against

## Environment Variables

- `LD_BIND_NOW`
- `LD_PRELOAD`
- `LD_DEBUG`
- `LD_DEBUG_OUTPUT`


ld/gcc?

`--hash-style=gnu`

# readelf

## Show which libraries have been linked

`readelf -a <prog> | grep "Shared library"`

## Show the run-time linker

`readelf -a <prog> | grep "program interpreter"`

# objdump

## Flags

- `-d`: disassemble
- `-C`: demangle C++ symbols


# Library Directories

https://stackoverflow.com/questions/9922949/how-to-print-the-ldlinker-search-path


# ldd

> TODO
