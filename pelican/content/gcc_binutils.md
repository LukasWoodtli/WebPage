Title: GCC, binutils and other developer tools
Category: Programming
Tags: C, C++, OS, Linux
Date: 2018-02-22

> Work in Progress!



# ld

## Flags
-z now
-O1 (linker!)

## Environment Variables

LD_BIND_NOW
LD_PRELOAD
LD_DEBUG
LD_DEBUG_OUTPUT


ld/gcc?
--hash-style=gnu

# readelf

## Flags

-d

## Show which libraries have been linked

`readelf -a <prog> | grep "Shared library"`

## Show the run-time linker

`readelf -a <prog> | grep "program interpreter"`

# objdump

## Flags

-d: disassemble
-C: demangle C++ symbols

# Library Directories
https://stackoverflow.com/questions/9922949/how-to-print-the-ldlinker-search-path


# ldd

ldd 
