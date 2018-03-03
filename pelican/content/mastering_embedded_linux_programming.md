Title: Mastering Embedded Linux Programming
Category: Programming
Tags: Embedded Systems, OS, Linux, Unix
Date: 2018-01-20



Notes to the book [Mastering Embedded Linux Programming](https://www.packtpub.com/networking-and-servers/mastering-embedded-linux-programming)


My code examples can be found here: [GitHub](https://github.com/LukasWoodtli/MasteringEmbeddedLinuxProgramming)


*"The versions of the main packages [...] are U-Boot 2015.07, Linux 4.1, Yocto Project 1.8 "Fido", and Buildroot 2015.08"*


[TOC]

# Chapter 1. Starting Out

*"At the heart of most embedded devices is a highly integrated chip that contains one or more processor cores and interfaces with main memory, mass storage, and peripherals of many types. This is referred to as a System on Chip, or SoC"*

## Selecting the right operating system

*"Some things to consider*

- *Is your hardware up to the job? Compared to a traditional RTOS [...], Linux requires a lot more resources. It needs at least a 32-bit processor, and lots more memory.*
- *Do you have the right skill set? [...] detailed knowledge of Linux and how it relates to your hardware.*
- *Is your system real-time? Linux can handle many real-time activities so long as you pay attention to certain details"*

## Project lifecycle

*"Four sections that reflect the phases of a project. The phases are not necessarily sequential."*

- *"set up the development environment and create a working platform for the later phases. "board bring-up" phase."*
- *"System architecture and design choices [...] storage of programs and data, how to divide work between kernel device drivers and applications, and how to initialize the system."*
- *"Writing embedded applications [...] Linux process and threads model and how to manage memory in a resource-constrained device."*
- *"Debugging and optimizing performance [...] trace, profile, and debug your code in both the applications and the kernel."*


*"Debugging and optimizing performance (chapters 12 and 13) describe how to trace, profile, and debug your code in both the applications and the kernel."*

## The four elements of embedded Linux

- *"Toolchain: This consists of the compiler and other tools needed to create code for your target device. Everything else depends on the toolchain."*
- *"Bootloader: This is necessary to initialize the board and to load and boot the Linux kernel."*
- *"Kernel: This is the heart of the system, managing system resources and interfacing with hardware."*
- *"Root filesystem: This contains the libraries and programs"*

## Hardware for embedded Linux

*"[In] source code for Linux 4.1, there are 30 architectures, each represented by a sub-directory in the `arch/` directory. They are all 32- or 64-bit architectures, most with a **memory management unit (MMU)**, but some without."*

*"There is another group that doesn't have an MMU that runs a subset of Linux known as micro controller Linux or uClinux."*

*"[Linux needs] a reasonable amount of RAM. 16 MiB is a good minimum"*

*"[We need] non-volatile storage, usually flash memory. 8 MiB is enough for a simple device"*

*"Linux has extensive support for flash storage devices, including raw NOR and NAND flash chips and managed flash in the form of SD cards, eMMC chips, USB flash memory"*

*"A debug port is very useful, most commonly an RS-232 serial port. It does not have to be fitted on production boards, but makes board bring-up, debugging, and development much easier."*

*"[We] need some means of loading software when starting from scratch. [For example JTAG] but modern SoCs have the ability to load boot code directly from removable media, especially SD and micro SD cards, or serial interfaces such as RS-232 or USB."*


# Chapter 2. Learning About Toolchains

## What is a toolchain?

*"A standard GNU toolchain consists of three main components:"*

- [Binutils](http://www.gnu.org/software/binutils/): Assembler, linker, (ld) and other tools
- [GCC](http://gcc.gnu.org/): Compilers for C, C++, Objective-C, Objective-C++, Java, Fortran, Ada, and Go. They all use a common back-end which produces assembler code for the GNU assembler (GAS)
- **C library**: Standardized API based on POSIX (interface to the operating system kernel from applications)

*"As well as these, you will need a copy of the Linux kernel headers,"*

*"of the header files in the include directory of your kernel source code. Those headers are intended for use in the kernel only and contain definitions that will cause conflicts if used in their raw state to compile regular Linux applications. Instead, you will need to generate a set of sanitized kernel headers"*


## Types of toolchain - native versus cross toolchain

*"here are two types of toolchain:*

- *Native: This toolchain runs on the same type of system [...] This is the usual case for desktops and servers, and it is becoming popular on certain classes of embedded devices. [...]*
- *Cross: This toolchain runs on a different type of system than the target, allowing the development to be done on a fast desktop PC and then loaded onto the embedded target for testing."*

*"Almost all embedded Linux development is done using a cross development toolchain, partly because most embedded devices are not well suited to program development since they lack computing power, memory, and storage, but also because it keeps the host and target environments separate."*

*"there is a counter argument in favor of native development. Cross development creates the burden of cross-compiling all the libraries and tools that you need for your target."*


## CPU architectures

*"toolchain has to be built according to the capabilities of the target CPU:*

- *CPU architecture: arm, mips, x86_64, and so on*
- *Big- or little-endian operation: Some CPUs can operate in both modes, but the machine code is different for each*
- *Floating point support: Not all versions of embedded processors implement a hardware floating point unit, in which case, the toolchain can be configured to call a software floating point library instead*
- *Application Binary Interface (ABI): The calling convention used for passing parameters between function calls"*


### ARM OABI, EABI and EABIHF

*"With many architectures, the ABI is constant across the family of processors. One notable exception is ARM. The ARM architecture transitioned to the *Extended Application Binary Interface* (**EABI**) in the late 2000's, resulting in the previous ABI being named the *Old Application Binary Interface* (**OABI**). While the OABI is now obsolete, you continue to see references to EABI. Since then, the *EABI has split into two*, based on the way that floating point parameters are passed. The *original EABI uses general purpose (integer)* registers* while the *newer **EABIHF** uses floating point registers. The EABIHF is significantly faster at floating point operations since it removes the need for copying between integer and floating point registers, but it is not compatible with CPUs that do not have a floating point unit. The choice, then, is between two incompatible ABIs: *you cannot mix and match the two* and so you have to decide at this stage."*


### GNU prefix tuple

*"GNU uses a prefix to the tools to identify the various combinations that can be generated, consisting of a tuple of three or four components separated by dashes:*

- *CPU: The CPU architecture, such as arm, mips, or x86_64. If the CPU has both endian modes, they may be differentiated by adding **el for little-endian**, or **eb for big-endian**. Good examples are little-endian MIPS, mipsel and big-endian ARM, armeb.*
- *Vendor: This identifies the provider of the toolchain. Examples include buildroot, poky, or just unknown. Sometimes it is left out altogether.*
- *Kernel: For our purposes, it is always 'linux'.*
- *Operating system: A name for the user space component, which might be `gnu` or `uclibcgnu`. The ABI may be appended here as well so, for ARM toolchains, you may see `gnueabi`, `gnueabihf`, `uclibcgnueabi`, or `uclibcgnueabihf`."*

*"You can find the tuple used when building the toolchain by using the `-dumpmachine` option of `gcc`"*


## Choosing the C library

*"The programming interface to the Unix operating system is defined in the C language, which is now defined by the **POSIX** standards. The C library is the implementation of that interface"*

*"There are several C libraries:*

- *glibc: is the standard GNU C library. It is big and, until recently, not very configurable, but it is the most complete implementation*
- *eglibc: This is the embedded GLIBC. [...] the code base from eglibc has been merged back into glibc. eglibc is no longer maintained.*
- *uClibc: was first developed to work with uClinux. There is a configuration utility which allows you to fine-tune its features to your needs. [...] smaller than glibc*
- *musl libc: is a new C library designed for embedded systems.*"

*"So, which to choose?*

- *uClibc only if you are using uClinux or if you have very limited amounts of storage or RAM*
- *Otherwise, I prefer to use an up-to-date glibc, or eglibc"*

## Finding a toolchain

*"three choices for your cross development toolchain:*

- *a ready built toolchain that matches your needs* (i.e. [Linaro](https://www.linaro.org/) for ARM)
- *generated by an embedded build tool* (i.e. Yocto)
- *create one yourself"* (crosstool-ng)


## Finding out about your cross compiler

*"To find the version [of gcc], you use `--version`:"*

`arm-cortex_a8-linux-gnueabi-gcc --version`

*"To find how [gcc] was configured, use `-v`:"*

`arm-cortex_a8-linux-gnueabi-gcc -v`

The output contains (among other information):

- `--with-sysroot=/home/luki/x-tools/arm-cortex_a8-linux-gnueabihf/arm-cortex_a8-linux-gnueabihf/sysroot`: the default sysroot directory
- `--enable-languages=c,c++`: C and C++ languages are enabled
- `--with-arch=armv7-a`: code is generated using the ARM v7a instruction set
- `--with-cpu=cortex-a8` and `--with-tune=cortex-a8`: code is tweaked for Cortex A8
- `--with-float=hard`: Generate opcodes for the floating point unit and uses the VFP registers for parameters
- `--enable-threads=posix`: Enable POSIX threads


*"you can override the configured setting, `–-with-cpu`, by adding `-mcpu` to the command line`:"*

`arm-cortex_a8-linux-gnueabihf-gcc -mcpu=cortex-a5 helloworld.c -o helloworld`

*"You can print out the the range of architecture-specific options available using:"*

`arm-cortex_a8-linux-gnueabihf-gcc --target-help``


## The sysroot, library, and header files

*"The toolchain sysroot is a directory which contains subdirectories for libraries, header files, and other configuration files."*

*"It can be set when the toolchain is configured through `--with-sysroot=` or it can be set on the command line, using `--sysroot=`. You can see the location of the default sysroot by using `-print-sysroot`"*

*"You will find the following in the sysroot:*
- *`lib`: Contains the shared objects for the C library and the dynamic linker/loader, `ld-linux`*
- *`usr/lib`: the static library archives for the C library and any other libraries that may be installed subsequently*
- *`usr/include`: Contains the headers for all the libraries*
- *`usr/bin`: Contains the utility programs that run on the target, such as the `ldd` command*
- *`/usr/share`: Used for localization and internationalization*
- *`sbin`: Provides the ldconfig utility, used to optimize library loading paths*"

*"some of these are needed on the development host to compile programs, and others - for example the shared libraries and `ld-linux` - are needed on the target at runtime."*


## Other tools in the toolchain

- `addr2line`: Converts program addresses into filenames and numbers. Useful for decoding addresses from a crash report
- `ar`: used to create static libraries
- `as`: GNU assembler
- `c++filt`: demangle C++ and Java symbols
- `cpp`: Standalone C preprocessor
- `elfedit`: update the ELF header
- `gcov`: coverage tool
- `gdb`: GNU debugger
- `gprof`: profiling tool
- `ld`: the GNU linker
- `nm`: list symbols from object files
- `objcopy`: copy and translate object files
- `objdump`: display information from object files
- `ranlib`: creates or modifies an index in a static library, making the linking stage faster
- `readelf`: display information in ELF object files
- `size`: list section sizes
- `strings`: display printable characters in files
- `strip`: strip the debug symbols of object file


## Looking at the components of the C library

*"The C library [...] is composed of four main parts"*:

- `libc`: the main C library
- `libm`: matn functions
- `libpthread`: POSIX threads
- `librt`: real-time extensions to POSIX

*"`libc`, is always linked in but the others have to be explicitly linked"*

*"You can verify which libraries have been linked [...] by using the readelf command:"*

`arm-cortex_a8-linux-gnueabihf-readelf -a myprog | grep "Shared library"``

*"Shared libraries need a run-time linker [...]:"*

`arm-cortex_a8-linux-gnu eabihf-readelf -a myprog | grep "program interpreter"`


## Linking with libraries: static and dynamic linking

*"Any application [...] will be linked with the C library, libc. [...] Other libraries [...] have to be explicitly named through the `-l` option."*


### Static libraries

*"Static linking is useful in a few circumstances.

- building a small system which consists of only BusyBox
- if you need to run a program before the filesystem that holds the runtime libraries is available"*

*"[Tell] `gcc` to link all libraries statically by adding `-static`:"*

`arm-cortex_a8-linux-gnueabihf-gcc -static helloworld.c -o helloworld-static`

*"the size of the binary increases dramatically"*


### Shared libraries

*"The object code for a shared library must be position-independent so that the runtime linker is free to locate it in memory at the next free address. To do this, add the `-fPIC` parameter to gcc, and then link it using the `-shared` option"*


### Understanding shared library version numbers

*"Each library has a release version and an interface number. The release version is simply a string that is appended to the library name"*


*"The `soname` encodes the interface number when the library was built and is used by the runtime linker when it loads the library. It is formatted as `<library name>.so.<interface number>`"*

Find the `soname`:

`readelf -a <path_to_so> | grep SONAME`

Libraries and symbolic links in a library directory (example `libjpeg`):

| File               | Use                                                                      |
|--------------------|--------------------------------------------------------------------------|
| `libjpeg.a`        | library archive used for static linking                                  |
| `libjpeg.so -> libjpeg.so.8.0.2`   | symbolic link, used for dynamic linking                  |
| `libjpeg.so.8 -> libjpeg.so.8.0.2` | symbolic link used when loading the library at runtime   |
| `libjpeg.so.8.0.2` | This is the actual shared library, used at both compile time and runtime |


*"The first two are only needed on the host computer for building, the last two are needed on the target at runtime."*

See also: [`ldconfig`](http://man7.org/linux/man-pages/man8/ldconfig.8.html)


## The art of cross compiling

### Simple makefiles

*"[For] the Linux kernel, the U-Boot bootloader, and Busybox [and others] you only need to put the toolchain prefix in the make variable `CROSS_COMPILE`, for example `arm-cortex_a8-linux-gnueabi-`. Note the trailing dash `-`."*

*"In the case of U-Boot and Linux, you also have to set the `make` variable `ARCH` to one of the machine architectures they support"*


### Autotools

*"Autotools, refers to a group of tools that are used as the build system in many open source projects."*

- [GNU Autoconf](http://www.gnu.org/software/autoconf/autoconf.html) 
- [GNU Automake](http://www.gnu.org/savannah-checkouts/gnu/automake)
- [GNU Libtool](http://www.gnu.org/software/libtool/libtool.html)
- [Gnulib](https://www.gnu.org/software/gnulib)


*"The role of Autotools is to smooth over the differences between the many different types of system that the package may be compiled for, accounting for different versions of compilers, different versions of libraries, different locations of header files, and dependencies with other packages."*

*"Packages that use Autotools come with a script named `configure` that checks dependencies and generates makefiles according to what it finds."*

*"Find the options [...] by running `./configure --help`."*


*"Autotools is able to handle cross development as well. You can influence the behavior of the configure script by setting these shell variables:*

- *`CC`: The C compiler command*
- *`CFLAGS`: Additional C compiler flags*
- *`LDFLAGS`: Additional linker flags, for example if you have libraries in a non-standard directory `<lib dir>` you would add it to the library search* path by adding `-L<lib dir>`*
- *`LIBS`: Contains a list of additional libraries to pass to the linker, for instance `-lm` for the math library*
- *`CPPFLAGS`: Contains C/C++ preprocessor flags, for example you would add `-I<include dir>` to search for headers in a non-standard directory `<include dir>`*
- *`CPP`: The C preprocessor to use*"

*"Autotools understands three different types of machine that may be involved when compiling a package:*

- *`Build`: This is the computer that is to build the package, which defaults to the current machine.*
- *`Host`: This is the computer the program will run on: for a native compile this is left blank and it defaults to be the same computer as build. For a **cross compile** you set it to be the **tuple of your toolchain**.*
- *`Target`: This is the computer the program will generate code for: you would set this when building a cross compiler, for example.*"


## Package configuration

*"Tracking package dependencies is quite complex. The package configuration utility, [`pkg-config`]( http://www.freedesktop.org/wiki/Software/pkg-config) helps track which packages are installed and which compile flags each needs by keeping a database of Autotools packages in `[sysroot]/usr/lib/pkgconfig`."*

*"You can use the utility pkg-config to extract information in a form that you can feed straight to gcc. In the case of a library [...], you want to know the library name (`--libs`) and any special C flags (`--cflags`)."*

*"You need to point it at the sysroot of the target toolchain by setting the shell variable `PKG_CONFIG_LIBDIR`"*

`PKG_CONFIG_LIBDIR=$(arm-cortex_a8-linux-gnueabihf-gcc -print-sysroot)/usr/lib/pkgconfig pkg-config sqlite3 --libs --cflags`


## Problems with cross compiling

*"Typical pain points include:*

- *Home-grown build systems, zlib, for example, has a configure script but it does not behave like the Autotools configure*
- *Configure scripts that read `pkg-config` information, headers, and other files from the host, disregarding the `--host` override*
- *Scripts that insist on trying to run cross compiled code*"

## Summary

*"Beware of toolchains or distributions that are offered to you for free as part of a hardware package: they are often poorly configured and not maintained. In any case, you should make the choice according to your situation, and then be consistent in its use throughout the project."*
