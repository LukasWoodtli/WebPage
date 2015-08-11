Title: Executable Loader
Date: 2015-08-11
Category: Computer Science

This explanation concerns the x86 platform!

Modern OS's allow to load executable code at runtime. This can be
complete programms or (dynamic) libraries.

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

