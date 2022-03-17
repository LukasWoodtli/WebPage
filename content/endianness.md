---
title: Endianness
date: 2015-06-17
modified: 2015-06-17
category: Programming
tags: [C, C++]
---


The endianness means the representation of a variable (if it is bigger than one byte) in the memory.

> Big-Endian: Most Significant Byte (MSB) is first (bigger end is first)

> Little Endian: Least Significant Byte (LSB) is first (little end is first)

![Big-Endian and Little-Endian](/images/endianness.png)



# CPU's

## Big-Endian:

- Motorola-6800
- Motorola-68k
- Coldfire
- System-z
- Sun-SPARC
- PowerPC (some models can be switched to little-endian)
- Atmel AVR32
- TMS9900


## Little-Endian:

- 6502
- NEC-V800
- PICmicro
- Intel-x86
- Alpha
- Altera Nios
- Atmel AVR
- SH3/SH4 (some)
- VAX


## Configurable:

- PowerPC (some models)
- IA-64 (Hewlett-Packard and Intel)
- ARM (and XScale, little-endian as default)


# Uses

## Technical

IP and Ethernet Network Byte Order: Big-Endian


## Real-Life use

### Big-Endian:

- written arabic numbers: 1234 (thousend-two-hundert-thirty-four)
- Time: 18:34

### Little-Endian:

- European Date (dd. MM YYYY): 17. June 2015