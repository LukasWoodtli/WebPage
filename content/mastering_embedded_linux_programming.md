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

### The four elements of embedded Linux

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


### Types of toolchain - native versus cross toolchain

*"here are two types of toolchain:*

- *Native: This toolchain runs on the same type of system [...] This is the usual case for desktops and servers, and it is becoming popular on certain classes of embedded devices. [...]*
- *Cross: This toolchain runs on a different type of system than the target, allowing the development to be done on a fast desktop PC and then loaded onto the embedded target for testing."*

*"Almost all embedded Linux development is done using a cross development toolchain, partly because most embedded devices are not well suited to program development since they lack computing power, memory, and storage, but also because it keeps the host and target environments separate."*

*"there is a counter argument in favor of native development. Cross development creates the burden of cross-compiling all the libraries and tools that you need for your target."*


### CPU architectures

*"toolchain has to be built according to the capabilities of the target CPU:*

- *CPU architecture: arm, mips, x86_64, and so on*
- *Big- or little-endian operation: Some CPUs can operate in both modes, but the machine code is different for each*
- *Floating point support: Not all versions of embedded processors implement a hardware floating point unit, in which case, the toolchain can be configured to call a software floating point library instead*
- *Application Binary Interface (ABI): The calling convention used for passing parameters between function calls"*


#### ARM OABI, EABI and EABIHF

*"With many architectures, the ABI is constant across the family of processors. One notable exception is ARM. The ARM architecture transitioned to the *Extended Application Binary Interface* (**EABI**) in the late 2000's, resulting in the previous ABI being named the *Old Application Binary Interface* (**OABI**). While the OABI is now obsolete, you continue to see references to EABI. Since then, the *EABI has split into two*, based on the way that floating point parameters are passed. The *original EABI uses general purpose (integer)* registers* while the *newer **EABIHF** uses floating point registers. The EABIHF is significantly faster at floating point operations since it removes the need for copying between integer and floating point registers, but it is not compatible with CPUs that do not have a floating point unit. The choice, then, is between two incompatible ABIs: *you cannot mix and match the two* and so you have to decide at this stage."*


#### GNU prefix tuple

*"GNU uses a prefix to the tools to identify the various combinations that can be generated, consisting of a tuple of three or four components separated by dashes:*

- *CPU: The CPU architecture, such as arm, mips, or x86_64. If the CPU has both endian modes, they may be differentiated by adding **el for little-endian**, or **eb for big-endian**. Good examples are little-endian MIPS, mipsel and big-endian ARM, armeb.*
- *Vendor: This identifies the provider of the toolchain. Examples include buildroot, poky, or just unknown. Sometimes it is left out altogether.*
- *Kernel: For our purposes, it is always 'linux'.*
- *Operating system: A name for the user space component, which might be `gnu` or `uclibcgnu`. The ABI may be appended here as well so, for ARM toolchains, you may see `gnueabi`, `gnueabihf`, `uclibcgnueabi`, or `uclibcgnueabihf`."*

*"You can find the tuple used when building the toolchain by using the `-dumpmachine` option of `gcc`"*


### Choosing the C library

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


# Chapter 3. All About Bootloaders

*"The bootloader [...] starts the system up and loads the operating system kernel. [...] it passes control from itself to the kernel using [...] a device tree (flattened device tree or FDT)"*

## What does a bootloader do?

*"the bootloader has two main jobs:*

- *basic system initialization and*
- *the loading of the kernel"*

*"Typically, the only resources operational at the beginning [after booting] are a single CPU core and some on-chip static memory."*

## The boot sequence

### Phase 1: ROM code
*"the code that runs immediately after a reset or power-on has to be stored on-chip in the SoC; this is known as ROM code.
It is programmed into the chip when it is manufactured, hence ROM code is proprietary and cannot be replaced by an open source equivalent."*

*"the only RAM that the ROM code has access to is the small amount of static RAM (SRAM) found in most SoC designs. The size of the SRAM varies from as little as 4 KiB up to a few hundred KiB"*

*"In SoCs where the SRAM is not large enough to load a full bootloader like U-Boot, there has to be an intermediate loader called the secondary program loader, or SPL"*

*"At the end of this phase, the next stage bootloader is present in on-chip memory and the ROM code jumps to the beginning of that code."*


### Phase 2: SPL

*"SPL must set up the memory controller and other essential parts of the system preparatory to loading the **third stage program loader (TPL)** into main memory, the DRAM"*

*"The SPL may be open source [...] but it is quite common for it to contain proprietary code"*


### Phase 3: TPL

*"At last, we are running a full bootloader like U-Boot or Barebox."*

*"At the end of the third phase, there is a kernel in memory"*

*"Embedded bootloaders usually disappear from memory once the kernel is running"*


## Booting with UEFI firmware

See also: [Universal Extensible Firmware Interface (UEFI)](http://www.uefi.org)

### Phase 1:

*"The processor loads the UEFI boot manager firmware from flash memory. In some designs, it is loaded directly from NOR flash memory, in others there is ROM code on-chip which loads the boot manager from SPI flash memory. The boot manager is roughly equivalent to the SPL, but may allow user interaction through a text-based or graphical interface."*

### Phase 2:

*"The boot manager loads the boot firmware from the **EFI System Partition (ESP)** or a hard disk or SSD, or from a network server via PXE boot."*

*"[...] the EXP is identified by a well-known GUID value of **C12A7328-F81F-11D2-BA4B-00A0C93EC93B**."*

Partition: FAT32

Third stage bootloader file: `<efi_system_partition>/boot/boot<machine_type_short_name>.efi`

### Phase 3:

*"The TPL in this case has to be a bootloader that is capable of loading a Linux kernel and an optional RAM disk into memory. Common choices are:*

- *GRUB 2*
- *gummiboot"*


## Moving from bootloader to kernel

*"When the bootloader passes control to the kernel it has to pass some basic information to the kernel:*

- *a number unique to the type of the SoC*
- *Basic details of the hardware detected so far, [...] size and location of the physical RAM, and the CPU clock speed*
- *The kernel command line (plain ASCII string)*
- *Optionally, the location and size of a device tree binary*
- *Optionally, the location and size of an initial RAM disk"*

*"It is common to provide the root filesystem as a RAM disk, in which case it is the responsibility of the bootloader to load the RAM disk image into memory."*

*"There is a good description of the format of the kernel source in `Documentation/arm/Booting`"*


## Introducing device trees

See also: [www.devicetree.org](https://www.devicetree.org/)

*"A device tree is a flexible way to define the hardware components of a computer system. Usually, the device tree is loaded by the bootloader and passed to the kernel, although it is possible to bundle the device tree with the kernel image itself [...] for bootloaders that are not capable of handling them separately."*

*"The format is derived from a Sun Microsystems bootloader known as OpenBoot"*

*"[It] has been adapted on a large scale by the many ARM Linux implementations"*


### Device tree basics

There are a large number of device tree source files:

- Linux kernel: `arch/$ARCH/boot/dts`
- U-boot: `arch/$ARCH/dts`

*"The device tree represents a computer system as a collection of components joined together in a hierarchy [...] begins with a root node, represented by a [...] `/`, which contains subsequent nodes representing the hardware of the system. Each node has a name and contains a number of properties in the form `name = "value"`"*


### Phandles and interrupts

Phandels are used to connect devices in a way that doesn't correspond to the main tree structure.

*"As well as the obvious data connection between a component and other parts of the system, it might also be connected to an interrupt controller, to a clock source and to a voltage regulator. To express these connections, we have phandles."*

*"[The] bindings can be found in the Linux kernel source, in directory `Documentation/devicetree/bindings/`."*

### Compiling a device tree

*"The bootloader and kernel require a binary representation of the device tree, so it has to be compiled using the device tree compiler, `dtc`. The result is a file ending with `.dtb`, which is referred to as a device tree binary or a device tree blob."*

*"`dtc` does not give helpful error messages and it makes no checks other than on the basic syntax of the language"*


## U-Boot

### Building U-Boot

*"[...] the way U-Boot is configured has undergone a lot of changes since the 2014.10 release. Double-check that the instructions you are following are appropriate."*

    :::bash
    CROSS_COMPILE=arm-cortex_a8-linux-gnueabihf- am335x_boneblack_defconfig
    make CROSS_COMPILE=arm-cortex_a8-linux-gnueabihf-

*"The results of the compilation are:*

- *`u-boot`: This is U-Boot in ELF object format, suitable for use with a debugger*
- *`u-boot.map`: This is the symbol table*
- *`u-boot.bin`: This is U-Boot in raw binary format, suitable for running on your device*
- *`u-boot.img`: This is `u-boot.bin` with a U-Boot header added, suitable for uploading to a running copy of U-Boot*
- *`u-boot.srec`: This is U-Boot in Motorola `srec` format, suitable for transferring over a serial connection"*

*"a Secondary Program Loader (SPL) [...] is built at the same time and is named `MLO`"*

### Installing U-Boot

*"[With] JTAG, it is usually possible to load a copy of U-Boot directly into RAM and set it running. From that point, you can use U-Boot commands to copy it into flash memory."*

*"Some SoC designs have a boot ROM built in which can be used to read boot code from various external sources such as SD cards, serial interfaces, or USBs"*

For BeagleBone Black:

*"two partitions: the first is 64 MiB, formatted as FAT32 [(bootable)], and will contain the bootloader, and the second is 1 GiB, formatted as ext4"*


List block devices with: [lsblk](http://man7.org/linux/man-pages/man8/lsblk.8.html)

*"copy U-Boot and the SPL to [first partition of SD card]:"*

    :::bash
    cp MLO u-boot.img /media/$USER/boot


### Boot image format

*"Prepare files [(like the Linux kernel)] for U-Boot using the `mkimage` command."*

Example:

    :::bash
    mkimage -A arm -O linux -T kernel -C gzip -a 0x80008000 \
    -e 0x80008000 -n 'Linux' -d zImage uImage


# Chapter 4. Configuring and Building the Kernel

## What does the kernel do?

*"The system call interface uses an architecture-specific method, such as a trap or a software interrupt, to switch the CPU from low privilege user mode to high privilege kernel mode, which allows access to all memory addresses and CPU registers."*

*"Interrupts can only be handled in a device driver, never by a user space application."*

## Choosing a kernel

### Stable and long term support releases

*"[...] stable releases and long term releases. After the release of a mainline kernel (maintained by Linus Torvalds) it is moved to the stable tree (maintained by Greg Kroah-Hartman)."*


*"some kernels are labeled **long term** and maintained for two or more years. There is at least one long term kernel release each year."*

[https://www.kernel.org/](www.kernel.org)

[http://kernelnewbies.org/LinuxVersions](kernelnewbies.org)


### Vendor support

*"You may find support for your board or SoC from independent open source projects, Linaro or the Yocto Project, for example, or from companies providing third party support for embedded Linux, but in many cases you will be obliged to look to the vendor of your SoC or board for a working kernel."*

### Licensing

*"The Linux source code is licensed under GPL v2"*

*"it is now accepted practice that the GPL does not **necessarily** apply to kernel modules. This is codified by the kernel `MODULE_LICENSE` macro, which may take the value `Proprietary` to indicate that it is not released under the GPL."*

*"[...] an oft-quoted e-mail thread titled "Linux GPL and binary module exception clause?" which is archived at [http://yarchive.net/comp/linux/gpl_modules.html](http://yarchive.net)

## Building the kernel

### Getting the source

*"The main directories of interest are:*

- `arch`: *architecture-specific files, one subdirectory per architecture.*
- `Documentation`: *kernel documentation. Always look here first *
- `drivers`: *device drivers, a subdirectory for each type of driver.*
- `fs`: *filesystem code.*
- `include`: *kernel header files, including those required when building the toolchain.*
- `init`: *the kernel start-up code.*
- `kernel`: *core functions, including scheduling, locking, timers, power management, and debug/trace code.*
- `mm`: *memory management.*
- `net`: *network protocols.*
- `scripts`: *many useful scripts, including the device tree compiler, DTC.*
- `tools`: *many useful tools."*


### Understanding kernel configuration - Kconfig

*"The value you put into `ARCH` is one of the subdirectories you find in directory arch, with the oddity that `ARCH=i386` and `ARCH=x86_64` both source `arch/x86/Kconfig`.

*"[search function] in `menuconfig` by pressing the forward slash key, `/`".

*"There are a set of known working configuration files in `arch/$ARCH/configs`, each containing suitable configuration values for a single SoC or a group of SoCs."*

*"[There is a] target named `oldconfig`. This takes an existing `.config` file and asks you to supply configuration values for any options that don't have them. You would use it when moving a configuration to a newer kernel version; copy `.config` from the old kernel to the new source directory and run the `make ARCH=arm oldconfig` command to bring it up to date. It can also be used to validate a `.config` file that you have edited manually"*

### Using LOCALVERSION to identify your kernel


    :::bash
    make ARCH=arm kernelversion

*"If you change the configuration from the default, it is advisable to append your own version information, which you can configure by setting `CONFIG_LOCALVERSION`"*

### Kernel modules


*"[A] few cases where kernel modules are a good idea in embedded systems:*


- *proprietary modules*
- *reduce boot time by deferring the loading of non-essential drivers*
- *[it] would take up too much memory to compile [all drivers] statically*

## Compiling - Kbuild

### Finding out which kernel target to build

*"To build a kernel image, you need to know what your bootloader expects.*

- **U-Boot**: *Traditionally, U-Boot has required `uImage`, but newer versions can load a `zImage` file using the `bootz` command*
- **x86 targets**: *Requires a `bzImage `file*
- **Most other bootloaders**: *Require a `zImage` file"*

*"There is a small issue with building a uImage file for ARM with multi-platform support [...]. It allows a single kernel binary to run on multiple platforms and is a step on the road toward having a small number of kernels for all ARM devices. The kernel selects the correct platform by reading the machine number or the device tree passed to it by the bootloader.
The problem occurs because the location of physical memory might be different for each platform, and so the relocation address for the kernel (usually `0x8000` bytes from the start of physical RAM) might also be different."*

*"The `uImage` format is not compatible with multi-platform images."*

*"You can still create a uImage binary from a multi-platform build, so long as you give the `LOADADDR` of the particular SoC you are hoping to boot this kernel on. You can find the load address by looking in `mach -[your SoC]/Makefile.boot` and noting the value of `zreladdr-y`:"*

    ::bash
    CROSS_COMPILE=arm-cortex_a8-linux-gnueabihf- LOADADDR=0x80008000 uImage

### Build artifacts

*"If you have compiled your kernel with debug enabled (`CONFIG_DEBUG_INFO=y`), it will contain debug symbols which can be used with debuggers like `kgdb`"*

*"`System.map` contains the symbol table in a human readable form."*

*"Most bootloaders cannot handle ELF code directly. There is a further stage of processing which takes vmlinux and places those binaries in `arch/$ARCH/boot that are suitable for the various bootloaders:*


- `Image`: *`vmlinux` converted to raw binary format.*
- `zImage`: *For the PowerPC architecture, this is just a compressed version of `Image` [...] the bootloader must do the decompression. For all other architectures, [`Image` contains] a stub of code that decompresses and relocates it.*
- `uImage`: *`zImage` plus a 64-byte U-Boot header.*"


### Compiling device trees

*"The `dtbs` target builds device trees according to the rules in `arch/$ARCH/boot/dts/Makefile`"* , using the device tree source files in that directory."*

    :::bash
    make ARCH=arm dtbs

*"The compiled `.dtb` files are generated in the same directory as the sources."*

### Compiling modules

*"Build [modules] separately using the `modules` target:"*

    :::bash
    make -j 4 ARCH=arm CROSS_COMPILE=arm-cortex_a8-linux-gnueabihf- modules


*"The compiled modules have a `.ko` suffix and are generated in the same directory as the source code"*

*"Use the `modules_install` `make` target to install them in the right place."*

*"To install them into the staging area of your root filesystem [...], provide the path using `INSTALL_MOD_PATH`:"*

    :::bash
    CROSS_COMPILE=arm-cortex_a8-linux-gnueabihf- INSTALL_MOD_PATH=$HOME/rootfs modules_install


### Cleaning kernel sources

Make targets:

- "`clean`: *Removes object files and most intermediates.*
- `mrproper`: *Removes all intermediate files, including the `.config` file. [Return] the source tree to the state it was in immediately after cloning*
- `distclean`: *This is the same as `mrproper`, but also deletes editor backup files, patch files, and other artifacts of software development.*"


## Booting the kernel

### Early user space

*"In order to transition from kernel initialization to user space, the kernel has to mount a root filesystem and execute a program in that root filesystem. This can be achieved via a ramdisk or by mounting a real filesystem on a block device."*

*"The code for all of this is in `init/main.c`, starting with the function `rest_init()`, which creates the first thread with PID 1 and runs the code in `kernel_init()`."*

*"If there is a ramdisk, it will try to execute the program `/init` [...]. If fails to find and run `/init`, it tries to mount a filesystem by calling the function `prepare_namespace()` in `init/do_mounts.c`. This requires a `root=` command line to give the name of the block device to use for mounting, usually in the form:"*

    :::bash
    root=/dev/<disk name><partition number>

*"Or, for SD cards and eMMC:"*

    :::bash
    root=/dev/<disk name>p<partition number>

*"If the mount succeeds, it will try to execute `/sbin/init`, followed by `/etc/init`, `/bin/init`, and then `/bin/sh`, stopping at the first one that works."*


### Kernel messages


| Level        | Value | Meaning                           |
|--------------|-------|-----------------------------------|
| KERN_EMERG   |   0   | The system is unusable            |
| KERN_ALERT   |   1   | Action must be taken immediately  |
| KERN_CRIT    |   2   | Critical conditions               |
| KERN_ERR     |   3   | Error conditions                  |
| KERN_WARNING |   4   | Warning conditions                |
| KERN_NOTICE  |   5   | Normal but significant conditions |
| KERN_INFO    |   6   | Informational                     |
| KERN_DEBUG   |   7   | Debug-level messages              |


*"They are first written to a buffer, `__log_buf`, the size of which is two to the power of `CONFIG_LOG_BUF_SHIFT`."*

*"You can dump the entire buffer using the command `dmesg`."*

*"The default console log level is `7`, meaning that messages of level `6` and lower are displayed"*


### Kernel command line

*"[The kernel command line string can be set] via the `bootargs` variable in the case of U-Boot; it can also be defined in the device tree, or set as part of the kernel configuration in `CONFIG_CMDLINE`."*

*"There is a complete list in `Documentation/kernel-parameters.txt`"*

- `debug`: Sets the console log level to the highest level `8`
- `init=`: The init program to run from a mounted root filesystem (default: `/sbin/init`)
- `lpj=`: Sets `loops_per_jiffy` to a given constant
- `panic=` when the kernel panics: if the value is greater than zero, it gives the number of seconds before rebooting; if it is zero, it waits forever (default); or if it is less than zero, it reboots without any delay.
- `quiet` suppressing all but emergency messages
- `rdinit=`: The init program to run from a ramdisk (defaults: `/init`)
- `ro`: Mounts the root device as read-only (no effect on a ramdisk)
- `root=`: Device to mount the root filesystem
- `rootdelay=`: The number of seconds to wait before trying to mount the root device (default: zero)

- `rootfstype=`: The filesystem type for the root device. In many cases, it is auto-detected (required for `jffs2` filesystems)
- `rootwait`: Waits indefinitely for the root device to be detected. Usually necessary with mmc devices.
- `rw`: Mounts the root device as read-write (default).


*"During initialization, the kernel loops for approximately 250 ms to calibrate a delay loop. The value is stored in the variable `loops_per_jiffy`"*


*"If the kernel always runs on the same hardware, it will always calculate the same value. You can shave 250 ms off the boot time by adding `lpj=<value_reported_to_console>` to the command line."*


## Porting Linux to a new board

*"The organization of architecture-specific code in `arch/$ARCH` differs from one system to another."*


*"The x86 architecture is pretty clean because most hardware details are detected at runtime. [...]. The ARM architecture, on the other hand, is quite messy, in part because there is a lot of variability between the many ARM-based SoCs. Platform-dependent code is put in directories named `mach-\*` , approximately one per SoC. There are other directories named `plat-\*` which contain code common to several versions of an SoC. In the case of the BeagleBone Black, the relevant directory is `arch/arm/mach-omap2`. [...] it contains support for OMAP2, 3, and 4 chips, as well as the AM33xx family of chips that the BeagleBone uses."*


## Summary

*"The customization of the kernel for a particular target may consist of changes to the core kernel code, additional drivers for devices that are not in mainline Linux, a default kernel configuration file, and a device tree source file."*

*"One of the things you should consider [...] is whether the kernel features and drivers should be compiled as modules or built-in."*

*"Building the kernel produces a compressed kernel image file, named `zImage`, `bzImage`, or `uImage`, depending on the bootloader you will be using and the target architecture. A kernel build will also generate any kernel modules (as `.ko` files) that you have configured, and device tree binaries (as `.dtb` files) if your target requires them."*

*"The root filesystem can be a ramdisk or a filesystem accessed via a block device,"*


# Chapter 5. Building a Root Filesystem

## What should be in the root filesystem?

*"The kernel will get a root filesystem, either an `initramfs`, passed as a pointer from the bootloader, or by mounting the block device given on the kernel command line by the `root=` parameter. Once it has a root filesystem, the kernel will execute the first program, by default named `init`"*


*"To make a minimal root filesystem, you need these components:*

- *`init`: This is the program that starts everything off, usually by running a series of scripts.*
- *Shell: You need a shell to give you a command prompt but, more importantly, also to run the shell scripts called by init and other programs.*
- *Daemons: A daemon is a background program that provides a service to others.*
- *Shared libraries: Most programs are linked with shared libraries, and so they must be present in the root filesystem.*
- *Configuration files: The configuration for `init` and other daemons is stored in a series of text files, usually in the `/etc` directory.*
- *Device nodes: These are the special files that give access to various device drivers.*
- *`/proc` and `/sys`: These two pseudo filesystems represent kernel data structures as a hierarchy of directories and files. Many programs and library functions depend on proc and sys.*
- *Kernel modules: If you have configured some parts of your kernel to be modules, they need to be installed in the root filesystem, usually in `/lib/modules/[kernel version]`"*


### The directory layout

*"The Linux kernel does not care about the layout of files and directories beyond the existence of the program named by `init=` or `rdinit=`"*

*"However, many programs expect certain files to be in certain places"*

*"The basic layout of a Linux system is defined in the [Filesystem Hierarchy Standard (FHS)](http://refspecs.linuxfoundation.org/fhs.shtml)"*


*"Embedded devices tend to use a subset based on their needs, but it usually includes the following:*

- `/bin`: *Programs essential for all users*
- `/dev`: *Device nodes and other special files*
- `/etc`: *System configuration files*
- `/lib`: *Essential shared libraries* [i.e. the C-library]
- `/proc`: *The `proc` filesystem*
- `/sbin`: *Programs essential to the system administrator*
- `/sys`: *The `sysfs` filesystem*
- `/tmp`: *A place to put temporary or volatile files*
- `/usr`: *Additional programs, libraries, and system administrator utilities, in the directories `/usr/bin`, `/usr/lib` and `/usr/sbin`, respectively*
- `/var`: *A hierarchy of files and directories that may be modified at runtime, for example, log messages, some of which must be retained after boot*"



*"The difference between `/bin` and `/sbin` is simply that the latter need not be included in the search path for non-root users."*

*"The significance of `/usr` is that it maybe in a separate partition from the root filesystem, so it cannot contain anything that is needed to boot the system up."*


### POSIX file access permissions

$$\begin{matrix}
\left.\begin{matrix}
400 & r & - & - & - & - & - & - & - & -\\ 
200 & - & w & - & - & - & - & - & - & -\\ 
100 & - & - & x & - & - & - & - & - & -
\end{matrix}\right\} \text{Owner permissions}\\ 
\left.\begin{matrix}
040 & - & - & - & r & - & - & - & - & -\\ 
020 & - & - & - & - & w & - & - & - & -\\ 
010 & - & - & - & - & - & x & - & - & -
\end{matrix}\right\} \text{Group permissions}\\ 
\left.\begin{matrix}
004 & - & - & - & - & - & - & r & - & -\\ 
002 & - & - & - & - & - & - & - & w & -\\ 
001 & - & - & - & - & - & - & - & - & x
\end{matrix}\right\} \text{World permissions}
\end{matrix}$$

*"There is a further group of three bits that have special meanings:*

- *SUID (4): If the file is executable, it changes the effective UID of the process to that of the owner of the file when the program is run.*
- *SGID (2): Similar to SUID, this changes the effective GID of the process to that of the group of the file.*
- *Sticky (1): In a directory, this restricts deletion so that one user cannot delete files that are owned by another user. This is usually set on `/tmp` and `/var/tmp`."*


*"The SUID bit is probably used most often. It gives non-root users a temporary privilege escalation to superuser to perform a task. [...] for normal users to use `ping`, [which] is owned by user `root` and has the SUID bit set so that when you run `ping`, it executes with UID 0 regardless of your UID."*

### Programs for the root filesystem

#### BusyBox to the rescue!

*"BusyBox tools implement a subset of the functions of the desktop equivalents, but they do enough of it to be useful in the majority of cases. Another trick BusyBox employs is to combine all the tools together into a single binary"*

*"BusyBox has over three hundred applets including an init program, several shells of varying levels of complexity, and utilities for most admin tasks. There is even a simple version of the vi editor, so you can change text files on your device."*


#### ToyBox - an alternative to BusyBox

*"ToyBox has the same aim as BusyBox, but with more emphasis on complying with standards, especially POSIX-2008 and LSB 4.1"*

*"it implements fewer applets [than BusyBox]"*

*"[The] main difference is the license, which is BSD rather than GPL v2."*

### Libraries for the root filesystem

#### Reducing the size by stripping

    :::bash
    arm-cortex_a8-linux-gnueabihf-strip rootfs/lib/libc-2.22.so

> Be careful about stripping kernel modules. Some symbols are required by the module loader to relocate the module code, and so the module will fail to load if they are stripped out. Use this command to remove debug symbols while keeping those used for relocation: strip `--strip-unneeded <module name>`.


### Device nodes

*"[...] Unix philosophy that everything is a file (except network interfaces, which are sockets)."*

*"Block devices are mass storage devices, such as SD cards or hard drives. A character device is pretty much anything else, once again with the exception of network interfaces."*

*"Device nodes are created using the program named `mknod` (short for make node):*"

    :::bash
    mknod <name> <type> <major> <minor>


*"The parameters to `mknod` are as follows:*

- *`name` is the name of the device node that you want to create.*
- *`type` is either `c` for character devices or `b` for a block.* 
- *`major` and `minor` are a pair of numbers, which are used by the kernel to route file requests to the appropriate device driver code. There is a list of standard major and minor numbers in the kernel source in the file `Documentation/devices.txt`."*


*"In a really minimal root filesystem, you need just two nodes to boot with BusyBox: `console` and `null`."*


*"The `console` only needs to be accessible to `root`, the owner of the device node, so the access permissions are `600`. The `null` device should be readable and writable by everyone, so the mode is `666`. You can use the `-m` option for `mknod` to set the mode when creating the node. You need to be `root` to create device nodes, as shown here:"*

    :::bash
    sudo mknod -m 666 dev/null c 1 3
    sudo mknod -m 600 dev/console c 5 1


*"You can delete device nodes using the standard `rm` command: there is no `rmnod` command because, once created, they are just files."*


### The proc and sysfs filesystems

*"`proc` and `sysfs` are two pseudo filesystems"*

*"when you read one of the files [in `proc` or `sysfs`], the contents you see do not come from disk storage; it has been formatted on-the-fly by a function in the kernel. Some files are also writable, meaning that a kernel function is called with the new data you have written and, if it is of the correct format and you have sufficient permissions, it will modify the value stored in the kernel's memory. In other words, `proc` and `sysfs` provide another way to interact with device drivers and other kernel code."*


*"The `proc` and `sysfs` filesystems should be mounted on the directories called `/proc` and `/sys`:*"

    :::bash
    mount -t proc proc /proc
    mount -t sysfs sysfs /sys

*"[The] purpose [of `proc`] was to expose information about processes to user space"*

*"there is a directory for each process named `/proc/<PID>`, which contains information about its state."*

*"there are files that give information about other parts of the kernel, for example, `/proc/cpuinfo` tells you about the CPU, `/proc/interrupts` has information about interrupts"*

*"in `/proc/sys`, there are files that display and control the state and behavior of kernel subsystems, especially scheduling, memory management, and networking."*

[man 5 proc](http://man7.org/linux/man-pages/man5/proc.5.html)

*"the role of `sysfs` is to present the kernel driver model to user space. It exports a hierarchy of files relating to devices and device drivers and the way they are connected to each other."*


#### Mounting filesystems

*"The `mount` command allows us to attach one filesystem to a directory within another, forming a hierarchy of filesystems."*

*"The format of the mount command is as follows:"*

    :::bash
    mount [-t vfstype] [-o options] device directory

[man 8 mount](http://man7.org/linux/man-pages/man8/mount.8.html)

*"Looking at the example of mounting the `proc` filesystem, there is something odd: there is no device node, such as `/dev/proc`, since it is a pseudo filesystem and not a real one. But the `mount` command requires a device parameter. Consequently, we have to give a string where `device` should go, but it does not matter much what that string is."*


### Kernel modules

*"Kernel modules [...] need to be installed into the root filesystem, using the kernel make target `modules_install`"*

*"This will copy them into the directory called `/lib/modules/<kernel version>` together with the configuration files needed by the `modprobe` command."*


## Transferring the root filesystem to the target

Multiple posibilities:

- *"initramfs: Also known as a ramdisk, [...] a filesystem image that is loaded into RAM by the bootloader. Ramdisks are easy to create and have no dependencies on mass storage drivers. They can be used in fallback maintenance mode when the main root filesystem needs updating. They can even be used as the main root filesystem in small embedded devices, and they are commonly used as the early user space in mainstream Linux distributions. [...] the contents of the root filesystem are volatile, and any changes [...] will be lost when the system next boots."*
- *"Disk image: This is a copy of the root filesystem formatted and ready to be loaded onto a mass storage device on the target. [...] Creating a disk image is probably the most common option."*
- *"Network filesystem: The staging directory can be exported to the network via an NFS server and mounted by the target at boot time. This is often done during the development phase"*


## Creating a boot initramfs

*"`initramfs` is a compressed `cpio` archive."*

*"You need to configure your kernel with `CONFIG_BLK_DEV_INITRD` to support `initramfs`."*

*"there are three different ways to create a boot ramdisk: as a standalone `cpio` archive, as a `cpio` archive embedded in the kernel image, and as a device table which the kernel build system processes as part of the build."*


### Booting with QEMU

*"QEMU has the option called `-initrd` to load `initramfs` into memory."*

    :::bash
    QEMU_AUDIO_DRV=none \
    qemu-system-arm -m 256M -nographic -M versatilepb \
    -kernel zImage -append "console=ttyAMA0 rdinit=/bin/sh" \
    -dtb versatile-pb.dtb -initrd initramfs.cpio.gz


### Building an initramfs into the kernel image

*"Linux can be configured to incorporate `initramfs` into the kernel image. To do this [...] set `CONFIG_INITRAMFS_SOURCE` to the full path of the `cpio` archive. [...] Note that it has to be the uncompressed `cpio` file ending in `.cpio`, not the gzipped version. [...] Booting is the same as before, except that there is no ramdisk file."*

For QEMU:

    :::bash
    QEMU_AUDIO_DRV=none qemu-system-arm -m 256M \
    -nographic -M versatilepb -kernel zImage \
    -append "console=ttyAMA0 rdinit=/bin/sh" \
    -dtb versatile-pb.dtb


For BeagleBone Black (U-Boot):

    :::bash
    fatload mmc 0:1 0x80200000 zImage
    fatload mmc 0:1 0x80f00000 am335x-boneblack.dtb setenv bootargs console=ttyO0,115200 rdinit=/bin/sh bootz 0x80200000 – 0x80f00000


### Building an initramfs using a device table

*"A device table is a text file that lists the files, directories, device nodes, and links that go into an archive or filesystem image. The overwhelming advantage is that it allows you to create entries in the archive file that are owned by the `root` user, or any other UID, without having root privileges yourself."*

*"It is only when it is expanded by Linux at boot time that real files and directories get created, using the attributes you have specified."*

*"You write the device table file, and then point `CONFIG_INITRAMFS_SOURCE` at it. Then, when you build the kernel, it creates the `cpio` archive from the instructions in the device table. At no point do you need root access."*

*"Creating an `initramfs` device table from scratch is made easier by a script in the kernel source code in `scripts/gen_initramfs_list.sh`, which creates a device table from a given directory."*


### The old initrd format

*"There is an older format for a Linux ramdisk, known as `initrd`. It was the only format available before Linux 2.6 and is still needed if you are using the mmu-less variant of Linux, uClinux. It is pretty obscure [...]. There is more information in the kernel source in `Documentation/initrd.txt`"*

## The init program

*"The init program [of BusyBox] begins by reading the configuration file, `/etc/inittab`."*

### Adding user accounts to the root filesystem

*"Add to your staging directory the files `etc/passwd`, `etc/shadow`, and `etc/group` [...]. Make sure that the permissions of `shadow` are `0600`. Next, you need to initiate the login procedure by starting a program called `getty`."*


## A better way of managing device nodes

*"There are other ways to create device nodes automatically on demand:*

- `devtmpfs`: *This is a pseudo filesystem that you mount over `/dev` at boot time. The kernel populates it with device nodes for all the devices that the kernel currently knows about [...]. Take a look at the Linux source file: `drivers/char/mem.c` and see how `struct memdev` is initialized.*
- `mdev`: *This is a BusyBox applet that is used to populate a directory with device nodes and to create new nodes as needed. There is a configuration file, `/etc/mdev.conf`, which contains rules for ownership and the mode of the nodes.*
- `udev`: This is the mainstream equivalent of `mdev`. You will find it on desktop Linux and in some embedded devices. [...] It is now part of `systemd`."*

### An example using devtmpfs

*"Support for the `devtmpfs` filesystem is controlled by kernel configuration variable: `CONFIG_DEVTMPFS`."*

*"If you enable `CONFIG_DEVTMPFS_MOUNT` in your kernel configuration, the kernel will automatically mount `devtmpfs` just after mounting the root filesystem. However, this option has no effect when booting `initramfs`"*

### An example using mdev

*"While `mdev` is a bit more complex to set up, it does allow you to modify the permissions of device nodes as they are created. You begin by running `mdev` with the `-s` option, which causes it to scan the `/sys` directory looking for information about current devices. From this information, it populates the `/dev` directory with the corresponding nodes. If you want to keep track of new devices coming online and create nodes for them as well, you need to make `mdev` a hot plug client by writing to `/proc/sys/kernel/hotplug."*

*"[It] is documented in the BusyBox source code in `docs/mdev.txt`"*


## Additional reading

- [Filesystem Hierarchy Standard, Version 3.0](http://refspecs.linuxfoundation.org/fhs.shtml)
- *ramfs*, *rootfs* and *initramfs*, Rob Landley, October 17, 2005, which is part of the Linux source in `Documentation/filesystems/ramfs-rootfs-initramfs.txt`


# Chapter 7. Creating a Storage Strategy

## Storage options

*"There have been several generations of flash memory in that time,
progressing from NOR to NAND to managed flash such as eMMC."*

- NOR flash:
    - expensive
    - reliable
    - can be mapped into CPU address space
    - allows to execute code directly from flash
    - low capacity (ranging from a few megabytes to a few gigabyte)
- NAND flash:
    - much cheaper than NOR
    - available in higher capacities(range of tens of megabytes to tens of gigabytes)
    - needs a lot of hardware and software support
- Managed flash memory
    - consists of one or more NAND flash chips with a controller
    - hardware interface similar as hard disk


### NOR flash

*"The memory cells in NOR flash chips are arranged into erase blocks of,
for example, 128 KiB.
Erasing a block sets all the bits to 1. It can be programmed one word at
a time. Each erase cycle damages the memory cells slightly, and after a
number of cycles, the erase block becomes unreliable and cannot be
used anymore. [see data sheet for number of erase cycles, usually in the
range of 100K to 1M]. The data can be read word by word. The chip is
usually mapped into the CPU address space, which means that you can
execute code directly from NOR flash. This makes it a convenient place
to put the bootloader code"*


*"There is a standard register-level interface for NOR flash chips called the Common Flash Interface or CFI,
which all modern chips support."*

[The CFI is described in standard JESD68](https://www.jedec.org/)

### NAND flash

Different genrations:

- single-level cell (SLC, one bit per cell)
- multi-level cell (MLC, two bits per cell)
- tri-level cell (TLC, three bits per cell)

*"Where reliability is a concern, you should make sure you are using SLC NAND flash chips."*

*"NAND flash is organized into erase blocks ranging in size from 16 KiB to 512 KiB [...] erasing a block sets
all the bits to 1."*

*"The number of erase cycles before the block becomes unreliable is [...] typically as few as 1K cycles for TLC chips
and up to 100K for SLC."*

*"NAND flash can only be read and written in pages, usually of 2 or 4 KiB."*

*"They cannot be mapped into the address space and so code and data have to be copied into RAM
before they can be accessed."*

*"Data transfers to and from the chip are prone to bit flips, which can be detected and corrected using
error-correction codes (ECCs)."*

*"There is an extra area of memory per page known as the out-of-band (OOB) area, or the spare area."*

*"Many parts of the system are interested in the layout of the OOB area: the SoC ROM boot code, the bootloader,
the kernel MTD driver, the filesystem code, and the tools to create filesystem images."*

*"It is up to you to make sure that they all agree."*

*"There is a standard register-level interface for NAND flash chips known as the Open NAND Flash Interface or ONFi , which most modern chips adhere to. See http://www.onfi.org/"*

### Managed flash

*"The most important types of chips for embedded systems are Secure Digital (SD)
cards and the embedded variant known as eMMC."*


#### MultiMediaCard and Secure Digital cards

*"Newer versions of the SD specification allow smaller packaging (mini SD and microSD, which is often written as uSD)
and larger capacities: high capacity SDHC up to 32 GB and extended capacity
SDXC up to 2TB."*

*"The hardware interface for MMC and SD cards is very similar, and it is
possible to use full-sized MMC cards in full-sized SD card slots (but not the other
way round)."*

*"There is a command set for reading and writing memory in sectors of 512 bytes."*

## Accessing flash memory from the bootloader

### U-Boot and NOR flash

*"U-Boot has drivers for NOR CFI chips in `drivers/mtd`"*

### U-Boot and NAND flash

*"For NAND flash, you need a driver for the NAND flash controller on your
SoC, which you can find in the U-Boot source code in the directory
`drivers/mtd/nand`."*

*"U-Boot can also read files stored in the JFFS2 , YAFFS2 , and UBIFS filesystems."*

### U-Boot and MMC, SD, and eMMC

*"U-Boot has drivers for several MMC controllers in `drivers/mmc`."*

*"U-boot can also read files from the FAT32 and ext4 filesystems on MMC storage."*


## Accessing flash memory from Linux

*"NOR and NAND flash memory is handled by the **Memory Technology Device** subsystem, or **MTD**."*

*"In the case of NAND flash, there are also functions to handle the OOB area and to identify bad blocks."*

*"MMC/SD cards and eMMC use the `mmcblk` driver; CompactFlash and hard drives use the SCSI disk driver, `sd`.
USB flash drives use the `usb_storage` driver together with the `sd` driver."*

### Memory technology devices

*"MTD consists of three layers: a core set of functions, a set of drivers
for various types of chips, and user-level drivers that present the flash
memory as a character device or a block device."*

*"Only a small number of drivers are needed for NOR flash chips, enough to cover the CFI standard and
variations plus a few non-compliant chips."*


*"For NAND flash, you will need a driver for the NAND flash controller you are using; this is usually supplied
as part of the board support package."*

*"There are drivers [...] in the directory `drivers/mtd/nand`."*


#### MTD partitions

*"You can see a summary of the configuration at runtime by reading `/proc/mtd`:"*

    :::bash
    cat /proc/mtd

*"There is more detailed information for each partition in `/sys/class/mtd`,
[that] is nicely summarized using `mtdinfo`:"*

    :::bash
    mtdinfo /dev/mtd0

#### MTD device drivers

*"The upper level of the MTD subsystem is a pair of device drivers:*

- *A character device, with a major number of 90. There are two device nodes per MTD partition number, `N`: `/dev/mtdN` [...] and `/dev/mtdNro` [...]. The latter is just a read-only version of the former.*
- *A block device, with a major number of 31 and a minor number of `N`. The device nodes are in the form `/dev/mtdblockN`."*

#### The MTD character device, mtd

*"The character devices are the most important: they allow you to access the underlying flash memory as an array of bytes so that you can read and write (program)
the flash. It also implements a number of `ioctl` functions that allow you to erase blocks and to manage the OOB area on NAND chips.
[See for a list of `ioctl`s]: `include/uapi/mtd/mtd-abi.h` [and the book]."*

*"There is a set of utility programs known as `mtd-utils` for manipulating flash memory."*

*"You must always erase flash memory before writing new contents to it."*

*"To program NOR flash, you simply copy bytes to the MTD device node using a file copy command such as `cp`.
Unfortunately, this doesn't work with NAND memory as the copy will fail at the first bad block. Instead,
use `nandwrite`, which skips over any bad blocks. To read back NAND memory, you should use `nanddump`,
which also skips bad blocks."*

#### Logging kernel oops to MTD

*"A kernel error, or oops, is normally logged via the klogd and syslogd daemons to a circular memory buffer or a file."*

*"A more reliable method is to write oops and kernel panics to an MTD partition as a circular log buffer.
You enable it with `CONFIG_MTD_OOPS` and add `console=ttyMTDN` to the kernel command line,
`N` being the MTD device number to write the messages to."*

#### Simulating NAND memory

*"The NAND simulator emulates a NAND chip using system RAM."*

*"In particular, the ability to simulate bad blocks, bit flips, and other errors allows you to test code paths that are difficult to exercise using real flash memory."*

*"The code is in `drivers/mtd/nand/nandsim.c`. Enable it with the kernel configuration `CONFIG_MTD_NAND_NANDSIM`."*

### The MMC block driver

*"MMC/SD cards and eMMC chips are accessed using the mmcblk block driver."*

*"The drivers are located in the Linux source code in `drivers/mmc/host`."*


## Filesystems for flash memory

*"There are several challenges when making efficient use of flash memory for mass storage:
the mismatch between the size of an erase block and a disk sector, the limited number of erase
cycles per erase block, and the need for bad block handling on NAND chips. These differences
are resolved by a **Flash translation layer**, or **FTL**."*


## Filesystems for NOR and NAND flash memory

- **JFFS2 (Journaling Flash File System 2)**:
    - first available flash filesystem for Linux
    - still in use
    - works for NOR and NAND memory
    - slow during mount
- **YAFFS2 (Yet Another Flash File System 2)"":
    - similar to JFFS2
    - specifically for NAND flash memory
- **UBIFS (Unsorted Block Image File System)**:
    - works in conjunction with the UBI block driver
    - reliable flash filesystem
    - works with NOR and NAND memory
    - better performance than JFFS2 or YAFFS2
    - should be the preferred solution for new designs!

All of these use MTD as the common interface to flash memory.


### JFFS2

*"[Journaling Flash File System] is a log-structured filesystem that uses MTD to
access flash memory."*

#### Creating a JFFS2 filesystem

*"Creating an empty JFFS2 filesystem [:] erasing an MTD partition with clean markers
and then mounting it. There is no formatting step because a blank JFFS2 filesystem
consists entirely of free blocks. [see book for examples]"*


### YAFFS2

*"YAFFS is also a log-structured filesystem following the same design principles as JFFS2."*

*"it has a faster mount-time scan, simpler and faster garbage collection, and has no compression."*

*"YAFFS is not limited to Linux; it has been ported to a wide range of operating systems."*

*""YAFFS code has never been merged into mainline Linux, so you will have to patch your kernel.*

#### Creating a YAFFS2 filesystem

*"As with JFFS2, to create a YAFFS2 filesystem at runtime, you only need to erase the partition and mount it [see book for examples]."*


### UBI and UBIFS

Unsorted Block Image (UBI) driver and and corresponding filesystem (UBIFS).

#### UBI

*"UBI provides an idealized, reliable view of a flash chip by mapping **physical erase blocks** (**PEB**)
to **logical erase blocks** (**LEB**). Bad blocks are not mapped to LEBs and so are never used. If a block
cannot be erased, it is marked as bad and dropped from the mapping."*

*"UBI accesses the flash memory through the MTD layer."*

*"`ubiformat` needs to know the minimum unit of I/O, which for most NAND flash chips is the page size,
but some chips allow reading and writing in sub pages that are a half or a quarter of the page size.
Consult the chip data sheet for details and, if in doubt, use the page size."*

*"The first time you attach to an MTD partition after a `ubiformat`, there will be no volumes.
You can create volumes using `ubimkvol`."*

There is a tool `ubinfo`:

    :::bash
    ubinfo -a /dev/ubi0


#### UBIFS

*"UBIFS uses a UBI volume to create a robust filesystem. It adds sub-allocation and garbage collection to create a complete
flash translation layer."*

*"UBIFS has a journal for fast recovery in the event of power down."*

*"Creating a filesystem image for UBIFS is a two-stage process: first you create a UBIFS image using
`mkfs.ubifs`, and then embed it into a UBI volume using `ubinize`."*

## Filesystems for managed flash

### Flashbench

*"To make optimum use of the underlying flash memory, you need to know the erase block size and page size.
Manufacturers do not publish these numbers as a rule, but it is possible to deduce them by observing the
behavior of the chip or card [using flashbench, see book for more details]."*

### Ext4

*"**ext4** is very stable and well tested and has a journal that makes recovery from an unscheduled shutdown fast
and mostly painless. It is a good choice for managed flash devices"*

## Read-only compressed filesystems

### squashfs

*"The resulting filesystem is read-only, so there is no mechanism to modify any of the files at runtime. The only
way to update a `squashfs` filesystem is to erase the whole partition and program in a new image. `squashfs` is not
bad-block aware and so must be used with reliable flash memory such as NOR flash. However, it can be used on NAND
flash as long as you use UBI to create an emulated, reliable MTD."*


## Temporary filesystems

*"You can create a temporary RAM-based filesystem by simply mounting `tmpfs`:"*

*"As with `procfs` and `sysfs`, there is no device node associated with `tmpfs`, so you have to supply a place-keeper
string."*

*"It would be a disaster if `tmpfs` grew to be that large, so it is a very good idea to cap it with a `-o size` parameter."*

    :::bash
    mount -t tmpfs -o size=1m tmp_files /tmp

*"In addition to `/tmp`, some subdirectories of `/var` contain volatile data"*

*"In the Yocto Project, `/run` and `/var/volatile` are `tmpfs` mounts."*


## Making the root filesystem read-only

*"You need to make your target device able to survive unexpected events, including file corruption, and still be able to boot
and achieve at least a minimum level of function. Making the root filesystem read-only is a key part of achieving this ambition
because it eliminates accidental overwrites. Making it read-only is easy: replace `rw` with `ro` on the kernel command line or
use an inherently read-only filesystem such as `squashfs`.
However, you will find that there are a few files and directories that are traditionally writable
[see book for more details]."*


*"If you are using the Yocto Project, you can create a read-only root filesystem by adding `IMAGE_FEATURES = "read-only-rootfs"`
to `conf/local.conf` or to your image recipe."*


# Chapter 8. Updating Software in the Field

## What to update?

### Bootloader

*"Updating the bootloader is risky: what happens if the system powers down midway? Consequently, most update solutions leave the bootloader alone. This is not a big problem, because the bootloader only runs for a short time at power-on and is not normally a great source of run- time bugs."*

## Kernel

*"There are several parts to the kernel [that need to be updated]:*

- *A binary image loaded by the bootloader, often stored in the root filesystem.*
- *Many devices also have a Device Tree Binary (DTB) [...]. The DTB is usually stored alongside the kernel binary.*
- *There may be kernel modules in the root filesystem."*


### Root filesystem

*"The root filesystem contains the essential system libraries, utilities, and scripts needed to make the system work. It is very desirable to be able to replace and upgrade all of these. The mechanism depends on the implementation."*

### System applications

*"[The system applications] may be bundled with the root filesystem, but it is also common for them to be placed in a separate filesystem to make updating easier and to maintain separation between the system files, which are usually open source, and the application files, which are often proprietary."*

### Device-specific data

*"[Files that comntain] settings, logs, user-supplied data, and the like. It is not often that they need to be updated, but they do need to be preserved during an update"*

## The basics of software update

### Making updates robust

*"The update as a whole must be atomic: there should be no stage at which part of the system is updated but not other parts. There must be a single, uninterruptible change to the system that switches to the new version of software."*

### Making updates fail-safe

*"[It's possible to configure] the kernel to reboot a number of seconds after a panic. You can do this either when you build the kernel by setting `CONFIG_PANIC_TIMEOUT` or by setting the kernel command line to panic [e.g `panic=5` for reboot after 5 seconds]."*

*"To enable panic on Oops in the kernel configuration, set `CONFIG_PANIC_ON_OOPS=y` or, on the kernel command line, `oops=panic`."*

*"If you are using systemd, you can use the inbuilt watchdog function"*

*"[Otherwise] you may want to enable the watchdog support built into Linux, as described in the kernel source code in `Documentation/watchdog`."*

### Making updates secure

*"Remote update [...] need a secure transfer channel, such as HTTPS."*

*"[...] secure boot protocol in the bootloader. If the kernel image is signed at the factory with a digital key, the bootloader can check the key before it loads the kernel and refuse to load it if the keys do not match"*

*"U-Boot implements such a mechanism, which is described in the U-Boot source code in `doc/uImage.FIT/verified-boot.txt`."*


## Types of update mechanism

### Symmetric image update

*"There are several open source projects that implement symmetric image update. One is the **Mender** client operating in standalone mode [...]. Another is **SWUpdate** [...]. A third example is **RAUC**, the **Robust Auto-Update Controller**"*

*"There are some drawbacks with this scheme. One is that by updating an entire filesystem image, the size of the update package is large."*

*"A second drawback is the need to keep storage space for a redundant copy of the root filesystem and other components."*

### Asymmetric image update

*"You can reduce storage requirements by keeping a minimal recovery operating system purely for updating the main one"*

*"Once the Recovery OS is running, it can stream updates to the main operating system image."*

*"The Recovery OS is usually a lot smaller than the main operating system, maybe only a few megabytes."*

*"For open source implementations of asymmetric image update, you could consider **SWUpdate** or **RAUC**"*

### Atomic file updates

*"Another approach is to have redundant copies of a root filesystem present in multiple directories of a single filesystem and then use the `chroot(8)` command to choose one of them at boot time."*

*"The OSTree project, now renamed libOSTree, is the most popular implementation of this idea"*

*"It is one of the update methods available in **Automotive Grade Linux (AGL)**, and it is available in the Yocto Project through the meta-update layer, which is supported by **Advanced Telematic Systems (ATS)**."*


## OTA updates

*"Two examples of open source projects [...] for OTA update:*

- *Mender in managed mode*
- *The hawkBit in conjunction with an updater client such as **SWUpdate** or **RAUC**"*

## Summary

*"The approach used most often, and also the one with most real-world testing, is the symmetric image (**A/B**) update, or its cousin the asymmetric (recovery) image update. Here, you have the choice of SWUpdate, RAUC, and Mender."*


# Chapter 9. Interfacing with Device Drivers

*"In many cases, you will find that there are device drivers provided for you, and you can achieve everything you want without writing any kernel code. For example, you can manipulate GPIO pins and LEDs using files in **sysfs**, and there are libraries to access serial buses, including **SPI (Serial Peripheral Interface)** and **I2C (Inter-Integrated Circuit)**."*

## The role of device drivers

*"One driver may control multiple devices of the same kind."*

*"Kernel device driver code runs at a high privilege level, as does the rest of the kernel. It has full access to the processor address space and hardware registers. It can handle interrupts and DMA transfers."*

*"Device drivers should be as simple as possible by just providing information to applications where the real decisions are made."*

*"In Linux, there are three main types of device driver:*

- *Character: This is for an unbuffered I/O with a rich range of functions and a thin layer between the application code and the driver. It is the first choice when implementing custom device drivers.*
- *Block: This has an interface tailored for block I/O to and from mass storage devices. There is a thick layer of buffering designed to make disk reads and writes as fast as possible, which makes it unsuitable for anything else.*
- *Network: This is similar to a block device but is used for transmitting and receiving network packets rather than disk blocks."*

*"There is also a fourth type that presents itself as a group of files in one of the pseudo file systems. For example, you might access the GPIO driver through a group of files in `/sys/class/gpio`"*


## Character devices

*"Character devices are identified in user space by a special file called a **device node**. This file name is mapped to a device driver using the major and minor numbers associated with it. Broadly speaking, the **major number** maps the device node to a particular device driver, and the **minor number** tells the driver which interface is being accessed."*

*"The list of standard major and minor numbers can be found in the kernel documentation in `Documentation/devices.txt`. The list does not get updated very often."*

*"When you open a character device node, the kernel checks to see whether the major and minor numbers fall into a range registered by a character device driver. If so, it passes the call to the driver, otherwise the open call fails. The device driver can extract the minor number to find out which hardware interface to use."*


*"[One could use] the stream I/O functions, `fopen(3)`, `fread(3)`, and `fclose(3)` instead [of `open(2)`, `read(2)`, and `close(2)`], but the buffering implicit in these functions often causes unexpected behavior."*


## Block devices

*"Although character and block devices are identified using major and minor numbers, they are in different namespaces. A character driver with a major number 4 is in no way related to a block driver with a major number 4."*

*"With block devices, the major number is used to identify the device driver and the minor number is used to identify the partition."*

*"Both the MMC and SCSI block drivers expect to find a partiton table at the start of the disk. The partition table is created using utilities such as `fdisk`, `sfidsk`, or `parted`."*

*"Both the MMC and SCSI block drivers expect to find a partiton table at the start of the disk. The partition table is created using utilities such as fdisk, sfidsk, or parted."*


## Network devices

*"Network devices are not accessed through device nodes, and they do not have major and minor numbers. Instead, a network device is allocated a name by the kernel, based on a string and an instance number."*

*"[User space programs] interact with the network driver indirectly by opening sockets"*

*"It is possible to access network devices directly from user space by creating a socket and using the ioctl commands listed in `include/linux/sockios.h`"*


## Finding out about drivers at runtime

*"You can find out a lot by reading the files in `/proc` and `/sys`."*

    :::bash
    cat /proc/devices

*"For each driver, you can see the major number and the base name."*

*"network devices do not appear in this list, because they do not have device nodes."*

    :::bash
    ip link show


### Getting information from `sysfs`

*"`sysfs` [is a] representation of kernel objects, attributes, and relationships. A kernel object is a directory, an attribute is a file, and a relationship is a symbolic link from one object to another"*

*"You can see the kernel's view of the system laid out before you by looking in `/sys`."*

#### The devices: `/sys/devices`

*"There are three directories that are present on all systems:*

- *`system/`: This contains devices at the heart of the system, including CPUs and clocks.*
- *`virtual/`: This contains devices that are memory-based. You will find the memory devices that appear as `/dev/null`, `/dev/random`, and `/dev/zero` in `virtual/mem`. You will find the loopback device, `lo`, in `virtual/net`.*
- *`platform/`: This is a catch-all for devices that are not connected via a conventional hardware bus. This maybe almost everything on an embedded device.*"

*"The other devices appear in directories that correspond to actual system buses."*


*"Navigating this hierarchy is quite hard, because it requires some knowledge of the topology of your system, and the path-names become quite long and hard to remember. To make life easier, `/sys/class` and `/sys/block` offer two different views of the devices."*

#### The drivers: `/sys/class`

*"This is a view of the device drivers presented by their type. In other words, it is a software view rather than a hardware view."*

##### The block drivers: `/sys/block`

*"There is a subdirectory for each block device."*

*"The conclusion, then, is that you can learn a lot about the devices (the hardware) and the drivers (the software) that are present on a system by reading `sysfs`."*

## Finding the right device driver

*"Where do you start to look for device drivers to support all of these peripherals?"*

*"There maybe support in your kernel already: there are many thousands of drivers in mainline Linux and there are many vendor-specific drivers in the vendor kernels. Begin by running `make menuconfig` (or `xconfig`) and search for the product name or number."*

*"Next, try searching through the code in the drivers directory"*

## Device drivers in user space

*"There are generic device drivers for many common types of device that allow you to interact with hardware directly from user space without having to write a line of kernel code. User space code is certainly easier to write and debug. It is also not covered by the GPL."*

*"These drivers fall into two broad categories: those that you control through files in `sysfs`, including GPIO and LEDs, and serial buses that expose a generic interface through a device node, such as $I^2C$."*


### GPIO

*"Each [pin] can be in one of two states: either high or low. In most cases you can configure the GPIO pin to be either an input or an output. You can even use a group of GPIO pins to create higher level interfaces such as $I^2C$ or SPI by manipulating each bit in software, a technique that is called **bit banging**."*

*"Generally speaking, it is hard to achieve timer accuracy better than a millisecond unless you configure a real-time kernel."*

*"More common use cases for GPIO are for reading push buttons and digital sensors and controlling LEDs, motors, and relays."*

*"All this diversity is handled by a kernel subsystem known as `gpiolib`, which is not actually a library but the infrastructure GPIO drivers use to expose I/O in a consistent way. There are details about the implementation of gpiolib in the kernel source in `Documentation/gpio` and the code for the drivers themselves is in `drivers/gpio`."*

*"Applications can interact with gpiolib through files in the `/sys/class/gpio` directory."*

*"The file named `base` contains the number of the first GPIO pin in the register and `ngpio` contains the number of bits in the register."*

*"To control a GPIO bit from user space, you first have to export it from kernel space, which you do by writing the GPIO number to `/sys/class/gpio/export`."*

*"You can remove a GPIO from user space control by writing the GPIO number to `/sys/class/gpio/unexport`."*

#### Handling interrupts from GPIO

*"If the GPIO bit can generate interrupts, the file called `edge`    exists. Initially, it has the value called `none`, meaning that it does not generate interrupts. To enable interrupts, you can set it to one of these values:*

- *`rising`: Interrupt on rising edge*
- *`falling`: Interrupt on falling edge*
- *`both`: Interrupt on both rising and falling edges*
- *`none`: No interrupts (default)"*


### LEDs

*"LEDs are often controlled though a GPIO pin, but there is another kernel subsystem that offers more specialized control specific to the purpose. The `leds` kernel subsystem adds the ability to set brightness, should the LED have that ability, and it can handle LEDs connected in other ways than a simple GPIO pin."*

*"You will have to configure your kernel with the option, `CONFIG_LEDS_CLASS`, and with the LED trigger actions that are appropriate to you. There is more information on `Documentation/leds/`, and the drivers are in `drivers/leds/`."*

*"LEDs are controlled through an interface in `sysfs` in the directory `/sys/class/leds`."*


### $I^2C$

*"There is a related standard known as **system management bus** (**SMBus**) that is found on PCs, which is used to access temperature and voltage sensors. SMBus is a subset of I2C."*

*"$I^2C$ is a master-slave protocol with the master being one or more host controllers on the SoC. Slaves have a 7-bit address assigned by the manufacturer (read the data sheet)."*

*"The master may initiate a read or write transactions with one of the slaves. Frequently, the first byte is used to specify a register on the slave, and the remaining bytes are the data read from or written to that register."*

*"There is one device node for each host controller"*

    :::bash
    ls -l /dev/i2c*

*"The device interface provides a series of `ioctl` commands that query the host controller and send the `read` and `write` commands to $I^2C$ slaves. There is a package named i2c-tools."*

*"The `i2c-tools` package is available in Buildroot and the Yocto Project as well as most mainstream distributions."*


### Serial Peripheral Interface (SPI)

*"The SPI bus is similar to I2C, but is a lot faster, up to tens of MHz."*

*"There is a generic SPI device driver, which you can enable through the kernel configuration `CONFIG_SPI_SPIDEV`."*

*"The device nodes are named `spidev[bus].[chip select]`"*

    :::bash
    ls -l /dev/spi*

*"[There is] example code in `Documentation/spi`."*


## Writing a kernel device driver

*"Character drivers are the most flexible and should cover 90% of all your needs."*

### Designing a character driver interface

*"There are other ways to communicate with device drivers than just `read` and `write` [check the book for more details]:*

- *`ioctl`: The kernel maintainers dislike `ioctl` because it makes kernel code and application code too interdependent*
- *`sysfs`: This is the preferred way now*
- *`mmap`: You can get direct access to kernel buffers and hardware registers by mapping kernel memory into user space, bypassing the kernel.*
- *`debugfs`: This is another pseudo filesystem. [...] There is a good description of `debugfs` in the kernel documentation, `Documentation/filesystems/debugfs.txt`.*
- *`netlink`: creates a socket that links kernel space to user space.*"


### Compiling kernel modules

*"Kernel modules are not binary compatible between kernel releases and configurations: the module will only load on the kernel it was compiled with."*


### Loading kernel modules

*"You can load, unload, and list modules using the simple `insmod`, `lsmod`, and `rmmod` commands"*

*"If the module is placed in a subdirectory in `/lib/modules/<kernel release>`, you can create a **modules dependency database** using the command, `depmod -a`"*

## Discovering the hardware configuration

*"Devices on a discoverable bus such as PCI or USB have a query mode, which returns resource requirements and a unique identifier."*

*"Most of the hardware blocks on an embedded board do not have such identifiers. You have to provide the information yourself in the form of a **device tree** or as C structures known as **platform data**."*

### Linking hardware with device drivers

*"For most drivers, specific bindings are documented in `Documentation/devicetree/bindings`."*

## Summary

*"Character driver interface is the most flexible and therefore, the most common. Linux drivers fit into a framework known as the driver model, which is exposed through `sysfs`. Pretty much the entire state of the devices and drivers is visible in `/sys`."*


# Chapter 10. Starting Up - The init Program

*"There are many possible implementations of `init`."*

*"The three main ones [are]: BusyBox `init`, System V `init`, and `systemd`."*

## After the kernel has booted

*"The `init` program has `root` privilege, and since it is the first process to run, it has a process ID (`PID`) of `1`."*

*"The tasks it has to perform are as follows:*

- *At boot, it starts daemon programs and configures system parameters and [...] get the system into a working state.
Optionally, it launches a login daemon, such as `getty`, on Terminals that allow a
login shell.*
- *It adopts processes that become orphaned as a result of their immediate parent terminating and there being no other processes in the thread group.*
- *It responds to any of the `init`'s immediate children terminating by catching the signal `SIGCHLD` and collecting the return value to prevent them becoming zombie processes.*
- *Optionally, it restarts those daemons that have terminated.*
- *It handles the system shutdown."*

*"[`systemd` also handles] other runtime events, such as a new hardware and the loading and unloading of modules."*

## BusyBox init

*"`init` begins by reading `/etc/inittab`. This contains a list of programs to run, one per line."*

Check the book for details about the format of `/etc/inittab` for BusyBox.

## System V init

*"Compared to the BusyBox `init`, System V `init` has two advantages. Firstly, the boot scripts are written in a well-known,
modular format, making it easy to add new packages at build time or runtime. Secondly, it has the concept of **runlevels**, which allow a
collection of programs to be started or stopped in one go when switching from one runlevel to another."*

*"There are 8 runlevels numbered from 0 to 6, plus S:*

- *`S`: Runs startup tasks*
- *`0`: Halts the system*
- *`1` to `5`: Available for general use*
- *`6`: Reboots the system"*

*"Levels 1 to 5 can be used as you please. On the desktop Linux distributions, they are conventionally assigned as follows:*

- *`1`: Single user*
- *`2`: Multi-user with no network configuration*
- *`3`: Multi-user with network configuration*
- *`4`: Not used*
- *`5`: Multi-user with graphical login"*

*"The `init` program starts the default `runlevel` given by the `initdefault` line in `/etc/inittab`.
You can change the runlevel at runtime using the command `telinit [runlevel]`, which sends a message to `init`.
You can find the current runlevel and the previous one using the `runlevel` command."*

*"The `halt` and `reboot` commands switch to runlevels called `0` and `6` respectively."*

*"Runlevels are not used that much in embedded Linux: most devices simply 
boot to the default runlevel and stay there."*

> Runlevels are a simple and convenient way to switch between modes, for
example, from production to maintenance mode.

### inittab

*"The `init` program begins by reading `/etc/inttab`, which contains entries that define what happens at each runlevel."*

Check the book for details about the format of `/etc/inittab` for System V `init`.

### The init.d scripts

*"Each component that needs to respond to a runlevel change has a script in `/etc/init.d` to perform the change.
The script should expect two parameters: `start` and `stop`."*

### Starting and stopping services

*"You can interact with the scripts in `/etc/init.d` by calling them directly."*

*"All scripts implement `start` and `stop`, and they should also implement `help`.
Some implement `status` as well, which will tell you whether the service is running or not.
Mainstream distributions that still use System V `init` have a command named `service` to start and stop services, which hide the details of calling the scripts directly."*


## systemd

*"[`systemd` is a] set of tools for managing a Linux system based around an `init` daemon. It also includes device management (`udev`) and logging,
among other things. `systemd? is state of the art and is still evolving rapidly."*

*"how is it better than System V `init` for embedded systems?*

- *The configuration is simpler and more logical (once you understand it). Rather than the sometimes convoluted shell scripts of System V `init`, `systemd` has unit configuration files, which are written in a well-defined format.*
- *There are explicit dependencies between services rather than a two digit code that merely sets the sequence in which the scripts are run.*
- *It is easy to set the permissions and resource limits for each service, which is important for the security.*
- *It can monitor services and restart them if needed.*
- *There are watchdogs for each service and for `systemd` itself.*
- *Services are started in parallel, potentially reducing boot time."*


### Introducing targets, services, and units

*"[There are] three key concepts:*

- ***Unit**, which is a configuration file that describes a target, a service, and several other things. Units are text files that contain properties and values.*
- ***Service**, which is a daemon that can be started and stopped, very much like a System V `init` service.*
- ***Target**, which is a group of services, similar to, but more general than, a System V `init` runlevel. There is a default target which is the group of services that are started at boot time."*

*"You can change states and find out what is going on using the `systemctl` command."*

#### Units

*"The basic item of configuration is the unit file. Unit files are found in three different places:*
- `/etc/systemd/system`: *Local configuration*
- `/run/systemd/system`: *Runtime configuration*
- `/lib/systemd/system`: *Distribution-wide configuration"*


*"When looking for a unit, `systemd` searches the directories in that order, stopping as soon as
it finds a match, and allowing you to override the behavior of a distribution-wide unit by
placing a unit of the same name in `/etc/systemd/system`. You can disable a unit
completely by creating a local file that is empty or linked to `/dev/null`."*

*"Dependencies in the Unit section are expressed though the keywords `Requires`, `Wants`,
and `Conflicts`:*

- `Requires`: This is a list of units that this unit depends on, which are started when this unit is started*
- `Wants`: This is a weaker form of `Requires`; the units listed are started but the current unit is not stopped if any of them fail*
- `Conflicts`: This is a negative dependency; the units listed are stopped when this one is started and, conversely, if one of them is started, this one is stopped"*

*"These three keywords define **outgoing dependencies**. They are used mostly to create dependencies between targets. There is another sort of dependency called an
**incoming dependency**, which is used to create a link between a service and a target. In other words, outgoing dependencies are used to create the list of targets
that need to be started as the system goes from one state to another, and incoming dependencies are used to determine the services that should be started or stopped
in any particular state. Incoming dependencies are created by the `WantedBy` keyword."*


*"Processing the dependencies produces a list of units that should be started or stopped. The keywords `Before` and `After determine the order in which they
are started. The order of stopping is just the reverse of the start order:*

- *`Before`: This unit should be started before the units listed*
- *`After`: This unit should be started after the units listed"*

#### Services

*"A service is a daemon that can be started and stopped, equivalent to a System V `init` service."*

*"Refer to the manual page for `systemd.service(5)` [and to the book for more information]."*

#### Targets

*"A target is another type of unit, which groups services (or other types of unit). It is a type of unit that only has dependencies."*

*"A target is a desired state, which performs the same role as System V `init` runlevels."*

### How systemd boots the system

*"[...] how `systemd` implements the bootstrap. `systemd` is run by the kernel as a result of `/sbin/init` being symbolically linked to `/lib/systemd/systemd`.
It runs the default target, `default.target`, which is always a link to a desired target."*

*"You can also list all the services and their current state using:"*

    :::bash
    systemctl list-units --type service

*"And the same for targets using:"*

    :::bash
    systemctl list-units --type target

### Adding a watchdog

*"On most embedded SoCs,
there is a hardware watchdog, which can be accessed via the `/dev/watchdog` device node."*

*"The interface with the watchdog driver is described in the kernel source 
in `Documentation/watchdog` and the code for the drivers is in `drivers/watchdog`."*

*"`systemd` has a useful feature that distributes the watchdog between multiple services."*

*"`systemd` can be configured to expect a regular keepalive call from a service and take action if it is not received,
creating a per-service software watchdog. For this to work, you have to add code to the daemon to send the `keepalive` messages."*

*"There are examples in the `systemd` source code."*

*"If `systemd` itself fails, the kernel crashes, or the hardware locks up.
In those cases, we need to tell `systemd` to use the watchdog driver"*

## Summary

*"In terms of reducing boot time, `systemd` is faster than System V `init`
for a similar workload. However, if you are looking for a very fast boot,
nothing can beat a simple BusyBox `init` with minimal boot scripts."*


# Chapter 11. Managing Power

*"Even for devices running on mains power, reducing power usage has
benefits in reducing the need for cooling and energy costs."*

## Measuring power usage

*"Measuring power externally, from outside the system, we just need an
ammeter to measure the current and a voltmeter to measure the voltage, and
then multiply the two together in order to get the wattage."*

*"[There are] monitoring systems that are built into Linux. You will find
that plenty of information is reported to you via `sysfs`.
There is also a very useful program called **PowerTOP**, which gathers
information together from various sources and presents it in a single place."*

    :::bash
    cat /sys/power/state


## Scaling the clock frequency

*"Reducing the frequency may actually increase the power budget because it
takes longer for the CPU to enter an idle state. So, in these conditions, 
it is best to use the highest frequency possible so that the CPU can go
back to idle quickly. This is called the **race to idle**."*

*"There is another motivation to reduce frequency: **thermal management**.
It may become necessary to operate at a lower frequency just to keep the
temperature of the package within bounds."*

*"Therefore, if we want to save power, we have to be able to change the
voltage that the CPU core operates at. But for any given voltage, there
is a maximum frequency beyond which the switching of the gates become 
unreliable."*


*"Many SoCs implement such a feature: it is called
**Dynamic Voltage and Frequency Scaling**, or **DVFS**. Manufacturers
calculate optimum combinations of core frequency and voltage. Each
combination is called **Operating Performance Point**, or **OPP**.
The ACPI specification refers to them as P-states, with `P0` being
the OPP with the highest frequency. Although an OPP is a combination
of a frequency and a voltage, they are most often referred to by the
frequency component alone."*


### The CPUFreq driver

*"Linux has a component named `CPUFreq` that manages the transitions
between OPPs. It is part of the board support for the package for each
SoC. `CPUFreq` consists of drivers in `drivers/cpufreq`"*

*"It is controlled per-CPU via the `/sys/devices/system/cpu/cpuN/cpufreq`
directory, with `N` being the CPU number."*

## Selecting the best idle state

*"Most CPUs have multiple idle states that use varying amounts of power.
Usually, there is a trade-off between the power usage and the latency, or
the length of time, it takes to exit the state. In the ACPI specification,
they are called **C-states**."*

*"The key to selecting the right idle state is to have a good idea of how 
long the CPU is going to be quiescent."*

*"[Monitor] the current CPU load: if it is high now, it is likely to
continue to be so in the immediate future, so a deep sleep would not be
beneficial. Even if the load is low, it is worth looking to see whether 
there is a timer event that expires soon. If there is no load and
no timer, then a deeper idle state is justified."*

*"The part of Linux that selects the best idle state is the CPUIdle 
driver. There is a good deal of information about it in the kernel source
code in the `Documentation/cpuidle` directory."*

### The CPUIdle driver

*"CPUIdle exposes information about each of the idle states in the
`/sys/devices/system/cpu/cpu0/cpuidle` directory, in which there is a
subdirectory for each of the sleep states, named `state0` to `stateN`.
`state0` is the **lightest** sleep and `stateN` the deepest. Note that
the numbering does not match that of the C-states and that
CPUIdle does not have a state equivalent to `C0` (running)"*

### Tickless operation

*"A related topic is the tickles, or `NOHZ`, option. If the system is
truly idle, the most likely source of interruptions will be the system
timer, which is programmed to generate a regular time tick at a rate of
`HZ` per second, where `HZ` is typically 100. Historically, Linux uses the
timer tick as the main time base for measuring time-outs."*

*"And yet it is plainly wasteful to wake the CPU up to process a timer 
interruption if no timer events are registered for that particular moment.
The dynamic tick kernel configuration option, `CONFIG_NO_HZ`, looks at the
timer queue at the end of the timer processing routine
and schedules the next interruption at the time of the next event"*

*"In any power-sensitive application, the kernel should be configured
with this option enabled."*

## Powering down peripherals

*"This is managed by the **runtime power management** system, or
**runtime pm** for short. It works with drivers that support runtime pm,
shutting down those that are not in use and waking them again when they
are next needed. It is dynamic and should be transparent to user space."*

*"The runtime power management is exposed via a `sysfs` interface. Each
device has a subdirectory named `power`, in which you will find 
[different] files."*

Check the book for more information about the files.

*"For more information on runtime pm, look in the kernel source code at
`Documentation/power/runtime_pm.txt`."*


## Putting the system to sleep

*"In the Linux kernel, this is known as **system sleep**. It is usually
user-initiated"*

*"There are usually two options: suspend or hibernate. The first,
also known as **suspend to RAM**, shuts everything down except the
system memory, so the machine is still consuming a little power."*

*"If I select the **hibernate** option, the contents of memory are saved
to the hard drive. The system consumes no power at all, and so it can stay
in this state indefinitely, but on wake-up, it takes some time to restore
the memory from disk. Hibernate is very seldom used in embedded systems"*

*"For more information, look at the kernel source code in the `Documentation/power` directory."*

### Power states

*"In the ACPI specification, the sleep states are called **S-states**. Linux supports four sleep states."*

See the book for more details.

*"Not all systems have support for all states. You can find out which are available by reading the `/sys/power/state` file"*

*"To enter one of the system sleep states, you just have to write the 
desired state to `/sys/power/state`."*

    :::bash
    echo mem > /sys/power/state

### Wakeup events

*"Before you suspend a device, you must have a method of waking it again."*

*"Some parts of the system have to remain powered on even during the
deepest sleep. This usually involves the **Power Management IC** 
(**PMIC**), the **real-time clock** (**RTC**), and may additionally 
include interfaces such as GPIO, UART, and Ethernet."*

*"Wakeup events are controlled through `sysfs`. Each device in
`/sys/device` has a subdirectory power containing a `wakeup` file"*

See the book for more information.

*"To get a list of devices that can generate wakeups, we can search for
all devices where wakeup contains either `enabled` or `disabled`:"*

    :::bash
    find /sys/devices -name wakeup | xargs grep “abled”

### Timed wakeups from the real-time clock

*"Most systems have an RTC that can generate alarm interruptions up to
24 hours in the future. If so, the directory `/sys/class/rtc/rtc0` will
exist. It should contain the `wakealarm` file. Writing a number to
`wakealarm` will cause it to generate an alarm that number of seconds
later. If you also enable wake up events from `rtc`, it will resume a
suspended device."*

## Summary

*"The majority of the power management is done for you by the BSP."*

# Chapter 12. Learning About Processes and Threads

## Processes

*"A process holds the environment in which threads can run: it holds the memory mappings, the file descriptors, the user and group IDs, and more."*

*"Creating a new process The POSIX function to create a process is 
`fork(2)`. It is an odd function because for each successful call,
there are two returns: one in the process that made the call,
known as the `Parent`, and one in the newly created process, known
as the `Child`."*

*"Immediately after the call, the child is an exact copy of the
parent: it has the same stack, the same heap, the same file
descriptors, and it executes the same line of code, the one
following `fork`. The only way the programmer can tell them apart 
is by looking at the return value of `fork`: it is zero for the 
child and greater than zero for the parent. Actually, the value 
returned to the parent is the PID of the newly created child 
process. There is a third possibility, which is that the return 
value is negative, which means that the fork call failed and there
is still only one process."*

*"Although the two processes are initially identical, they are in 
separate address spaces."*


### Terminating a process

*"[A process can be stopped by] calling the `exit(3)` function or,
involuntarily, by receiving a signal that is not handled. One
signal, in particular, `SIGKILL`, cannot be handled and so will
always kill a process."*

*"[When a process is terminated] the system sends a signal, 
`SIGCHLD`, to the parent so that it knows this has happened."*

*"Processes have a return value that is composed of either the 
argument to `exit`, if it terminated normally, or the signal 
number if it was killed."*

*"The child process inherits most of the attributes of the parent, 
including the user and group IDs, all open file descriptors, 
signal handling, and scheduling characteristics."*

### Running a different program

*"The `fork` function creates a copy of a running program, but it 
does not run a different program. For that, you need one of the 
`exec` functions."*

*"If the function [`exec\*`] succeeds, the kernel discards all the 
resources of the current process, including memory and file 
descriptors, and allocates memory to the new program being loaded. 
When the thread that called `exec\*` returns, it returns not to 
the line of code after the call but to the `main()` function of 
the new program."*

*"It is common for a `fork` to be followed almost immediately by 
one of the `exec` functions."*

### Inter-process communication

*"Message-based protocols are usually easier to program and debug 
than shared memory but are slow if the messages are large or many."*

#### Summary of message-based IPC

*"Unix sockets are used most often because they offer all that is 
needed, except perhaps message priority."*

*"There are also higher-level abstractions, in particular, D-Bus, 
which are moving from mainstream Linux to embedded devices. D-Bus 
uses Unix sockets and shared memory under the surface."*

#### Shared memory-based IPC

*"Sharing memory removes the need for copying data between address
spaces, but introduces the problem of synchronizing accesses to
it. Synchronization between processes is commonly achieved using
semaphores."*


## Threads

### Creating a new thread

*"[When running `ps`] LWP stands for **Light Weight Process**,
which, in this context, is another name for a thread."*

### Terminating a thread

*"Note that if a multithreaded program calls `fork`, only the thread 
that made the call will exist in the new child process. Fork does 
not replicate all threads."*

### Compiling a program with threads

*"When building a threaded program, you must add the `-pthread`
switch in the compile and link stages."*

### Changing conditions

*"Cooperating threads need a method of alerting one another that
something has changed and needs attention. That thing is called a
condition and the alert is sent through a **condition variable**."*

*"A condition is just something that you can test to give a `true`
or `false` result."*

*"The only complexity [of condition variables] is that the
condition is, by definition, a shared resource and so has to be
protected by a mutex."*


## Scheduling

*"The Linux scheduler has a queue of threads that are ready to
run, and its job is to schedule them on CPUs as they become
available. Each thread has a scheduling policy that may be
time-shared or real-time. The time-shared threads have a niceness
value that increases or reduces their entitlement to CPU time. The
real-time threads have a priority such that a higher prior"*

*"The scheduler runs when:*

- *A thread is blocked by calling `sleep()` or another blocking system call*
- *A time-shared thread exhausts its time slice*
- *An interruption causes a thread to be unblocked, for example, because of I/O completing"*


### Fairness versus determinism

*"If you have a real-time program, fairness is not helpful.
Instead, you then want a policy that is deterministic, which will
give you at least minimal guarantees that your real-time threads
will be scheduled at the right time so that they don't miss their
deadlines. This means that a real-time thread must preempt
time-shared threads. Real-time threads also have a static priority
that the scheduler can use to choose between them "*

*"Both types of thread can coexist. Those requiring deterministic
scheduling are scheduled first and the time remaining is divided
between the time-shared threads."*

### Time-shared policies

*"The scheduler used has been **Completely Fair Scheduler**
(**CFS**). It does not use timeslices in the normal sense of the
word. Instead, it calculates a running tally of the length of time
a thread would be entitled to run if it had its fair share of CPU
time, and it balances that with the actual amount of time it has
run for. If it exceeds its entitlement and there are other
time-shared threads waiting to run, the scheduler will suspend the
thread and run a waiting thread instead."*

*"The time-shared policies are as follows:*

- *`SCHED_NORMAL` (also known as `SCHED_OTHER`): This is the default policy. The vast majority of Linux threads use this policy.*
- *`SCHED_BATCH`: This is similar to `SCHED_NORMAL` except that threads are scheduled with a larger granularity [...]. The intention is to reduce the number of context switches for background processing (batch jobs) and reduce the amount of CPU cache churn.*
- *`SCHED_IDLE`: These threads are run only when there are no threads of any other policy ready to run. It is the lowest possible priority."*

#### Niceness

*"A thread becomes `nice` by reducing its load on the system, or moves in the opposite direction by increasing it. The range of values is from `19`, which is really nice, to `-20`, which is really not nice. The default value is `0`."*

*"The nice value can be changed for `SCHED_NORMAL` and `SCHED_BATCH` threads."*

*"You can use a TID in place of a PID to change the `nice` value of an individual thread. "*

###  Real-time policies

*"Real-time policies are intended for determinism. The real-time
scheduler will always run the highest priority real-time thread
that is ready to run. Real-time threads always preempt timeshare
threads. In essence, by selecting a real-time policy over a
timeshare policy, you are saying that you have inside knowledge of
the expected scheduling of this thread and wish to override the
scheduler's built-in assumptions.*"


*"There are two real-time policies:*

- *`SCHED_FIFO`: This is a run to completion algorithm, which means that once the thread starts to run, it will continue until it is preempted by a higher priority real-time thread, it is blocked in a system call, or until it terminates (completes).*
- *`SCHED_RR`: This a round robin algorithm that will cycle between threads of the same priority if they exceed their time slice, which is 100 ms by default. [It is] possible to control the timeslice value through /proc/sys/kernel/sched_rr_timeslice_ms. Apart from this, it behaves in the same way as SCHED_FIFO."*

*"Each real-time thread has a priority in the range 1 to 99, with 99 being the highest."*


*"The scheduler has, by default, reserved 5% of CPU time for non- real-time threads so that even a runaway real-time thread cannot completely halt the system. It is configured via two kernel controls:*

- *`/proc/sys/kernel/sched_rt_period_us`*
- *`/proc/sys/kernel/sched_rt_runtime_u`"*

*"[Another] option is to use a watchdog, either hardware or software, to monitor the execution of key threads."*

### Choosing a real-time priority

*"The most widely used procedure for choosing priorities is known 
as **Rate Monotonic Analysis** (**RMA**)."*

*"The goal is to balance the load so that all threads can complete their execution phase before the next period."*


# Chapter 13. Managing Memory

## Virtual memory basics

*"Linux divides this virtual address space into an area for applications, called **user space**, and an area for the kernel, called **kernel space**. The split between the two is set by a kernel configuration parameter named `PAGE_OFFSET`."*

*"The user address space is allocated per process so that each process runs in a sandbox, separated from the others. The kernel address space is the same for all processes: there is only one kernel."*

*"Each page of virtual memory may be:*

- *Unmapped, so that trying to access these addresses will result in a `SIGSEGV`*
- *Mapped to a page of physical memory that is private to the process*
- *Mapped to a page of physical memory that is shared with other processes*
- *Mapped and shared with a copy on write (CoW) flag set: a write is trapped in the kernel, which makes a copy of the page and maps it to the process in place of the original page before allowing the write to take place*
- *Mapped to a page of physical memory that is used by the kernel"*

*"The kernel may additionally map pages to reserved memory regions, for example, to access registers and memory buffers in device drivers."*

*"The default allocation strategy is to over-commit, which leads to tricky out-of-memory situations."*

*"The delays introduced by the memory management code in handling exceptions - page faults - make the system less deterministic, which is important for real-time programs."*

## Kernel space memory layout

*"Kernel memory [...] is not demand-paged, which means that for every allocation using `kmalloc()` or a similar function, there is real physical memory. Kernel memory is never discarded or paged out."*

### How much memory does the kernel use?

*"You can see the memory taken up by the kernel code and data in the kernel log [...] or you can use the `size` command, as follows:"*

    :::bash
    arm-poky-linux-gnueabi-size vmlinux


*"There is an ongoing effort to allow small kernels to be built: [...] [Linux Kernel Tinification](https://tiny.wiki.kernel.org)."*

*"You can get more information about memory usage by reading `/proc/meminfo`."*

*"There is a description of each of [the] fields on the manual page `proc(5)`. "*

*"With modules, you can use `lsmod` to find out the memory space taken up"*

## User space memory layout

*"Linux employs a lazy allocation strategy for user space, only mapping physical pages of memory when the program accesses it."*

*"For example, allocating a buffer [...] using `malloc(3)` returns a pointer to a block of memory addresses but no actual physical memory. A flag is set in the page 
table entries such that any read or write access is trapped by the kernel. This is known as a **page fault**. Only at this point does the kernel attempt to find a page 
of physical memory and add it to the page table mapping for the process."*

*"There are two kinds of page faults: **minor** and **major**. With a minor fault, the kernel just has to find a page of physical memory and map it to the process 
address space [...]. A major page fault occurs when the virtual memory is mapped to a file, for example, using `mmap(2)`"*

*"Major faults are much more expensive in time and system resources."*

## The process memory map

*"You can see the memory map for a process through the `proc` filesystem."*

*"The maximum size of [the heap and stack] is controlled by the process's ulimit:*

- *Heap: `ulimit -d`, default unlimited*
- *Stack: `ulimit -s`, default 8 MiB"*

*"Allocations that exceed the limit are rejected by `SIGSEGV`."*

## Swapping

*"On a system that has too little real memory for the workload it is carrying and so swapping becomes the main activity. This is sometimes known as
**disk thrashing**."*

*"Swap is seldom used on embedded devices because it does not work well with flash storage, where constant writing would wear it out quickly. However, you may want to 
consider swapping to compressed RAM (zram)."*
​
## Mapping memory with mmap

*"A process can also manipulate its memory map in an explicit way
using `mmap(2)`"*

### Using mmap to access device memory

*"One example is the Linux framebuffer, `/dev/fb0`. The interface is
defined in `/usr/include/linux/fb.h`, including an `ioctl` function to get
the size of the display and the bits per pixel. You can then use `mmap` to
ask the video driver to share the framebuffer with the application and
read and write pixels."*

## How much memory does my application use?

*"Linux believes that free memory is wasted memory and the kernel uses
free memory for buffers and caches with the knowledge that they can be
shrunk when the need arises."*

## Per-process memory usage

*"The ps and top commands [show]:*

- *Vss [virtual set size]: Called VSZ in the `ps` command and VIRT in `top`, this is the total amount of memory mapped by a process. It is the sum of all the regions shown in `/proc/<PID>/map`. This number is of limited interest since only part of the virtual memory is committed to physical memory at any time.*
- *Rss [resident memory size]: Called RSS in `ps` and RES in `top`, this is the sum of memory that is mapped to physical pages of memory. This gets closer to the actual memory budget of the process, but there is a problem: if you add the Rss of all the processes, you will get an overestimate of the memory in use because some pages will be shared."*

### Using smem

*"[There are 2 more metrics]: **unique set size**, or **Uss**, and **proportional set size**, or **Pss**"*

Check the book for more information.

*"Information about Pss is available in `/proc/<PID>/smaps`"*

*"There is a tool named **smem** that collates information from the smaps files and presents it in various ways"*

## Identifying memory leaks

### mtrace

*"**mtrace** is a component of glibc that traces calls to malloc , free , and related functions."*

## Running out of memory

*"There is a tuning parameter for kernel allocations in `/proc/sys/vm/overcommit_memory`"*

*"There is another important variable in `/proc/meminfo:Committed_AS`. This is the total
amount of memory that is needed to fulfill all the allocations made so far."*

*"The final defense is `oom-killer`. It uses a heuristic method to calculate a badness score between 0 and 1,000 for each process,
and then terminates those with the highest score until there is enough free memory."*

*"You can influence the badness score for a process by writing an adjustment value to
`/proc/<PID>/oom_score_adj`."*


# Chapter 14. Debugging with GDB

## Preparing to debug

*"In most cases, `-g` suffices: reserve `-g3` or `-ggdb3` for if you are having problems stepping through code, especially if it contains macros."*

*"You will most likely need to compile without optimization, leaving out the `-O` compile switch, or using `-Og`, which enables optimizations that do not interfere with debugging."*

*"On some architectures, GCC will not generate stack-frame pointers with the higher levels of optimization (`-O2` and above). If you find yourself in the situation that you really have to compile with `-O2` but still want backtraces, you can override the default behavior with `-fno-omit-frame-pointer`."*

## Debugging applications

### Remote debugging using gdbserver

*"`gdbserver` connects to a copy of GDB running on the host machine via a network connection or a serial interface."*

*"Debugging through `gdbserver` is almost, but not quite, the same as debugging natively. The differences are mostly centered around the fact that there are two computers involved and they have to be in the right state for debugging to take place. Here are some things to look out for [check the book for more details]:*

- *GDB, running on the host, needs to be told where to look for debug symbols and source code, especially for shared libraries.*
- *The GDB `run` command does not work as expected.*
- *You need debug symbols and source code for the binaries you want to debug on the host, but not on the target. Often, there is not enough storage space for them on the target, and they will need to be stripped before deploying to the target*
- *The GDB/gdbserver combination does not support all the features of natively running GDB: for example, gdbserver cannot follow the child process after a `fork`, whereas native GDB can."*

*"For applications and shared libraries, `--strip-all` (the default) is fine, but when it comes to kernel modules, you will find that it will stop the module from loading. Use `--strip-unneeded` instead. "*

## Starting to debug

### Connecting GDB and gdbserver

*" In the case of a network connection, you launch `gdbserver` with the TCP port number to listen on and, optionally, an IP address to accept connections from. In most cases, you don't care which IP address is going to connect, so you can just provide the port number. In this example, `gdbserver` waits for a connection on port 10000 from any host:"*

    :::bash
    gdbserver :10000 ./hello-world

*"Next, start the copy of GDB from your toolchain, pointing it at an unstripped copy of the program so that GDB can load the symbol table:"*

    :::bash
    arm-poky-linux-gnueabi-gdb hello-world

*"In GDB, use the command `target remote` to make the connection to `gdbserver`, giving it the IP address or hostname of the target and the port it is waiting on:"*

    :::bash
    (gdb) target remote 192.168.1.101:10000

*"The procedure is similar for a serial connection. On the target, you tell gdbserver which serial port to use:"*

    :::bash
    gdbserver /dev/ttyO0 ./hello-world

*"You may need to configure the port baud rate beforehand using `stty(1)` or a similar program"*

*"The port must not be being used for anything else. For example, you can't use a port that is being used as the system console.
"*

*"On the host, you make the connection to gdbserver using `target remote` plus the serial device at the host end of the cable. In most cases, you will want to set the baud rate of the host serial port first, using the GDB command `set serial baud`:"*

    :::bash
    (gdb) set serial baud 115200
    (gdb) target remote /dev/ttyUSB0

### Setting the sysroot

*GDB needs to know where to find debug information and source code for the program and shared libraries you are debugging. When debugging natively, the paths are well known and built in to GDB, but when using a cross toolchain, GDB has no way to guess where the root of the target filesystem is. You have to give it this information."*

    :::bash
     (gdb) set sysroot /opt/poky/2.2.1/sysroots/cortexa8hf-neon-poky-linux-gnueabi

*"GDB also needs to find the source code for the files you are debugging. GDB has a search path for source files, which you can see using the command `show directories`."*


*"`$cwd` is the current working directory of the GDB instance running on the host; `$cdir` is the directory where the source was compiled. The latter is encoded into the object files with the tag `DW_AT_comp_dir`. You can see these tags using `objdump --dwarf`."*

*"You may have additional shared libraries that are stored outside the `sysroot`. In that case, you can use `set solib-search-path`, which can contain a colon-separated list of directories to search for shared libraries."*

*"[Another] way of telling GDB where to look for source code, for both libraries and programs, is using the `directory` command. [...] Paths added in this way take precedence because they are searched before those from `sysroot` or `solib-search-path`."*

## Just-in-time debugging

*"In the case of remote debugging, you need to find the PID of the process to be debugged and pass it to `gdbserver` with the `--attach` option."*

    :::bash
    gdbserver --attach :10000 109

*"When you are done, you can detach, allowing the program to continue running without the debugger:"*

    :::bash
    (gdb) detach

## Debugging forks and threads

*"Does the debug session follow the parent process or the child? This behavior is controlled by `follow-fork-mode`, which may be `parent` or `child`, with `parent` being the default. Unfortunately, current versions of `gdbserver` do not support this option, so it only works for native debugging."*

*"There is a way to modify the way in which GDB handles stopped threads, through a parameter called `scheduler-locking`. Normally it is `off`, but if you set it to `on`, only the thread that was stopped at the breakpoint is resumed and the others remain stopped, giving you a chance to see what the thread alone does without interference. This continues to be the case until you turn `scheduler-locking off`. Gdbserver supports this feature."*

## Core files

*"Core files are not created by default, but only when the core file resource limit for the process is non-zero. You can change it for the current shell using `ulimit -c`."*

*"There are two files that control the naming and placement of core files. The first is `/proc/sys/kernel/core_uses_pid`. Writing a `1` to it causes the PID number of the dying process to be appended to the filename. [...] Much more useful is `/proc/sys/kernel/core_pattern`, which gives you a lot more control over core files."*

*"You can also use a pattern that begins with an absolute directory name so that all core files are gathered together in one place."*

### Using GDB to look at core files

*"Here is a sample GDB session looking at a core file:"*

    :::bash
    arm-poky-linux-gnueabi-gdb sort-debug /tmp/corefiles/core.sort-debug.1431425613

[Then use following commands]

    :::bash
    (gdb) list
    ...
    ...
    (gdb) bt
    ...

## Debugging kernel code

### Debugging kernel code with kgdb

*"The kernel is a complex system, with real-time behaviors. Don't expect debugging to be as easy as it is for applications. Stepping through code that changes the memory mapping or switches context is likely to produce odd results."*

*"`kgdb` is the name given to the kernel GDB stubs that have been part of mainline Linux for many years now. There is a user manual in the kernel DocBook, and you can find an online version at https://www.kernel.org/doc/htmldocs/kgdb/index.html."*

*"In addition to the `zImage` or `uImage` compressed kernel image, you will need the kernel image in ELF object format so that GDB can load the symbols into memory. This is the file called `vmlinux` that is generated in the directory where Linux is built."*

### Debugging modules

*"The relocation addresses for each section of the module are stored in `/sys/module/<module name>/sections` [see also for hidden files, i.e .text]."*

### Debugging kernel code with kdb

*"Although `kdb` does not have the features of `kgdb` and GDB, it does have its uses, and being self-hosted, there are no external dependencies to worry about. kdb has a simple command-line interface that you can use on a serial console. You can use it to inspect memory, registers, process lists, and `dmesg` and even set breakpoints to stop at a certain location."*

*"`kdb` is not a source-level debugger, so you can't see the source code or single-step. However, you can display a backtrace using the `bt` command"*

### Looking at an Oops

*"When the kernel performs an invalid memory access or executes an illegal instruction, a kernel Oops message is written to the kernel log."*

*"[One] can use the GDB command disassemble with the `/s` modifier so that it shows source and assembler code together."*

    :::bash
    arm-poky-linux-gnueabi-gdb mbx.ko

    :::bash
    (gdb) disassemble /s mbx_write

> The offsets are displayed in decimal, not hex!

