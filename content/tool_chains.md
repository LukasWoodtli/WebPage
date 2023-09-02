---
title: Linux Toolchains
category: Programming
tags: [Assembler, Computer Science, OS, Linux]
date: 2023-09-02
---
# Toolchains


The GNU toolchain consists of these components:

- [Binutils](http://www.gnu.org/software/binutils/): Assembler, linker, (ld) and other tools
- [GCC](http://gcc.gnu.org/): Compilers for C, C++, Objective-C, Objective-C++, Java, Fortran, Ada, and Go. They all use a common back-end which produces assembler code for the GNU assembler (GAS)
- **C library**: Standardized API based on POSIX (interface to the operating system kernel from applications)

## GNU prefix tuple

GNU uses a prefix to identify the various combinations of it's tools:

- CPU: The CPU architecture
    - `arm`, `mips`, `x86_64`, ...
    - may add postfix for endianes `mipsel` (little-endian MIPS), `armeb` (big-endian ARM), ...
- Vendor: The provider of the toolchain
    - `buildroot`, `poky`, `unknown`, ...
    - Sometimes it is left out
- Kernel:
    - `linux`, ...
- Operating system (user space):
    - `gnu`, `uclibcgnu`, ...
    - ABI can be appended (ARM): `gnueabi`, `gnueabihf`, `uclibcgnueabi`, `uclibcgnueabihf`, ...

Print the tuple: `gcc -dumpmachine`

### C library

There are several C libraries

- `glibc`: standard GNU C library. It is big and not very configurable, but it is the most complete implementation
- `uClibc`: initially for *uClinux*. Allows you to fine-tune its features, smaller than glibc
- `musl libc`: small, new C library designed for embedded systems


## gcc as Cross Compiler

`gcc` version: `arm-cortex_a8-linux-gnueabi-gcc --version`

How `gcc` was configured, use: `arm-cortex_a8-linux-gnueabi-gcc -v`

The output contains (among other information):

- `--with-sysroot=/home/luki/x-tools/arm-cortex_a8-linux-gnueabihf/arm-cortex_a8-linux-gnueabihf/sysroot`: the default sysroot directory
- `--enable-languages=c,c++`: C and C++ languages are enabled
- `--with-arch=armv7-a`: code is generated using the ARM v7a instruction set
- `--with-cpu=cortex-a8` and `--with-tune=cortex-a8`: code is tweaked for Cortex A8
- `--with-float=hard`: Generate opcodes for the floating point unit and uses the VFP registers for parameters
- `--enable-threads=posix`: Enable POSIX threads

Print architecture-specific options: `arm-cortex_a8-linux-gnueabihf-gcc --target-help`

## The sysroot, library, and header files

Sysroot directory contains

- libraries
- header files
- other configuration files.

Print default sysroot by using `-print-sysroot`

Sysroot can be changed

Subdirectories:

- `lib`: shared objects for the C library and the dynamic linker/loader (`ld-linux`)
- `usr/lib`: the static library archives for the C library and other libraries
- `usr/include`: headers for all the libraries
- `usr/bin`: utility programs that run on the target (`ldd`, ...)
- `/usr/share`: Used for localization and internationalization
- `sbin`: `ldconfig` utility (and others)

## Binutils and other tools

- `addr2line`: Convert program addresses into filenames and numbers (decoding addresses from a crash report)
- `ar`: create static libraries (archives)
- `as`: assembler
- `c++filt`: demangle C++ symbols
- `cpp`: C preprocessor
- `elfedit`: update ELF headers
- `gcov`: coverage tool
- `gdb`: debugger
- `gprof`: profiling
- `ld`: linker
- `nm`: list symbols from object files
- `objcopy`: copy and translate object files
- `objdump`: display information from object files
- `ranlib`: creates or modifies an index in a static library (make the linking faster)
- `readelf`: display information in ELF object files
- `size`: list section sizes
- `strings`: display printable characters in files
- `strip`: strip the debug symbols

## Looking at the components of the C library


- `libc`: the main C library
- `libm`: math functions
- `libpthread`: POSIX threads
- `librt`: real-time extensions for POSIX

`libc` is always linked, the others have to be explicitly linked.


### Shared libraries

Compile with `-fPIC` and link with `-shared` option

See also: [`ldconfig`](http://man7.org/linux/man-pages/man8/ldconfig.8.html)
