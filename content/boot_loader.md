---
title: Bootloaders for Embedded Linux
category: Programming
tags: [Computer Science, OS]
---

# Boot Sequence

## 1. ROM Code

- Runs directly after power up
- Provided by chip manufacturer
- Can usually only access SRAM (no DRAM)
- Capable of loading code (of limited size) from several predefined locations into SRAM:
    - NAND flash
    - SPI
    - MMC (eMMC or SD card)
    - from file called `MLO` located on first partition of MMC device
    - Ethernet, USB, UART
    - ...

## 2. Secondary Program Loader (SPL)

- Used if bootloader too big to be loaded by ROM code
- Setup memory controller to be able to load Tertiary Program Loader (TPL)
- Other peripherals might need setup at that stage
- Might have support to read files from filesystems (e.g. `u-boot.img`)
- Often proprietary binary blobs provided by manufacturer

## 3. Tertiary Program Loader (TPL)

- Full bootloader (i.e. U-Boot)
- Usually has simple user interface (command-line)
- Used to load kernel into DRAM
- TPL is often removed from memory after kernel boot

## 4. Loading Kernel

Bootloader passes basic information to kernel:

- Machine number: on PPC and Arm without device tree support
- Hardware information detected so far:
    - location and size of RAM
    - CPU clock speed
- Kernel command line
- Location and size of device tree binary (if supported)
- Location and size of initramfs (optional)
