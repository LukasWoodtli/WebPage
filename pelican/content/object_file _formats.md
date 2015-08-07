Title: Object File Formats
Date: 2015-08-05
Modified: 2015-08-05
Category: Programming


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
Alignment handlin of the data structures can be difficult.


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


