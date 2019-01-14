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
