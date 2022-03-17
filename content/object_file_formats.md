---
title: Object File Formats
date: 2015-08-05
modified: 2015-08-05
category: Programming
tags: [OS]
---

Most information of this page is taken from
[Calling conventions for different C++ compilers and operating systems](http://www.agner.org/optimize/#manuals).

Overview
========

| Object Format  | Platform                           |
|----------------|------------------------------------|
| COFF / PE      | Windows 32 (PE), Windows 64 (PE32+)|
| ELF            | Linux, UNIX, BSD...                |
| Mach-O         | OS X (Darwin)                      |
| a.out          | Older versions of UNIX             |


Common Object File Format (COFF, PE)
------------------------------------

First used in UNIX System V, later superseeded by ELF.

PE (Portable Executable) is a modified version of COFF from
Microsoft that is used for Windows.

The same format is used for object files and for executables.

Compilers that use COFF / PE:

- Visual C++
- Intel (Win)
- GCC (Win)

COFF uses many different data structures. This makes it difficult to handle.
Alignment handling of the data structures can be difficult.


Properties: 

- Can contain debug information
- Different implementations (COFF, PE, XCOFF, ECOFF) are not compatible

Limitations:

- Segment word size: 32 or 64 bits.
- Max number of sections: 32k.
- Max file size: 4 GB.
- Max section size: 4 GB.
- Max relocations per section: 64k.
- Max library size: 4 GB.


Executable and Linkable Format (ELF)
------------------------------------

Replaced older formats like a.out and COFF in Linux and BSD.

Compilers:

- GCC (Linux, BSD, Win...)

Clear and robust design.

Limitations:


- Segment word size: 32 or 64 bits.
- Max number of sections: 64k.
- Max file size: 4 GB for 32 bits, $2^{64}$ for 64 bits.
- Max section size: 4 GB for 32 bits, $2^{64}$ for 64 bits.
- String table size: 4 GB.
- Max number of symbols: 16M for 32 bits, 4G for 64 bits.
- Max library size: 4 GB.


Mach-O Format
-------------

This format is used by OS X.
Only the format for Intel Mac OS X is described here.

Can be used for object files and executable files.

Object files have only one segment record that contains several section records.

Executable files contain several segment records.

Mach-O allows address specifications relative to any reference point in any section.
This is used for position-independent code.

Limitations:

- Section name length: 16 characters.
- Max file size: 4 GB.
- Max section size: 16 MB for position-indep code, 4 GB for 32 bits, $2^{64}$ for 64 bits.
- Max number of sections: 16 M.
- Max number of symbols: 16 M.
- Max library size: 4 GB.


a.out Format
------------

Stands for 'Assembler Output'.

Is used in older UNIX systems.

'a.out' is often the default output file name of linkers. Even if the
output format is an other one.

Some tools still support the a.out format.


Data Endianness
---------------

All systems based on x86 (16-bit, 32-bit and 64-bit) use little endian.

