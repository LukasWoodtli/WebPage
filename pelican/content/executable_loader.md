Title: Executable Loader
Date: 2015-08-11
Category: Computer Science

This explanation concerns the x86 platform!

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
   
3. ...
