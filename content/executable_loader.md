---
title: Executable Loader
date: 2015-08-11
category: Programming
tags: [Computer Science]
---
Most information of this page is taken from
[Calling conventions for different C++ compilers and operating systems](http://www.agner.org/optimize/#manuals).

Some other good information sources are:

[Linkers and Loaders](http://www.iecc.com/linker/)

[Wikipedia:Linker](https://en.wikipedia.org/wiki/Linker_%28computing%29)

[Wikipedia:Loader](https://en.wikipedia.org/wiki/Loader_%28computing%29)

[Wikipedia:Relocation](https://en.wikipedia.org/wiki/Relocation_%28computing%29)

Book: Computer Systems: A Programmer's Perspective, Randal E. Bryant, David R. O'Hallarom

> Most explanations on this page are for the x86 platform!

Modern OS's allow to load executable code at runtime. This can be
complete programms or (dynamic) libraries.

On UNIX a dynamic library is called *shared object*. On Windows it's
called *dynamic link library (dll)*.

The OS needs to load the code to a specific position in memory and 
it needs to adjust any internal references and addresses.

This loading is done in a simmilar way in most OS.

The relocation of the executable image is done according to the
image base. 

The image base is the virtal memory address at which the image is
loaded.

The load-time relocation can be avoided if the image base is fixed.

The most common values for the image base are:

- Windows (32-bit, 64-bit): 0x400000
- Linux (32-bit): 0x8048000
- Linux (64-bit): 0x400000
- Mach-O (32-bit): 0x1000
- Mach-O (64-bit): 0x100000000

Dynamic libraries can't be loaded at a fixed image base.

There are three aproaches for loading executables without fixed image base:

1. The executable (or library) contains a relocation table. This contains
   all cross-references in the file. The loader adjusts all these 
   cross-references if the executable is loaded at another base address
   then the the one chosen by the linker.
   
   This aproach is used by Windows (32-bit, 64-bit)

2. The executable is designed position independant. All addresses are
   calculated at runtime relative to *IP*.
   
   This aproach is used on OS X (Intel)
   
3. The shared object contains a Global Offset Table (GOT). In the GOT
   are the addressrs of static objects stored. The addresses in the GOT
   are afjusted by the loader according to the base address.
   Code that accesses static data points to the GOT and the GOT 
   then points to the data.
   
   This aproach is often used in Linux (32-bit) and BSD
   
   
# Difference between Relocation Table and Global Offset Table (GOT)

## Relocation Table

Relocation table is not changed when shared object is loaded.
The relocation table points to data references in the code.
These references are modified in place.

## Global Offset Table (GOT)

The GOT is changed by the loader. So the entries in the GOT point
to the new (relocated) addresses. Static data references in the
code still point to the GOT but the entries in the GOT were updated.


# Function calls across shared objects (DLLs)

Shared objects can have references to functions in other shared objects.
Usually calls to these functions go through an import table in the
executable (shared object) file.

Either the loader fills the import table at load time or it is lazy
initialized for each function when it is called the first time.
