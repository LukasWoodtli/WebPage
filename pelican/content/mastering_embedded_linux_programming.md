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


