---
title: Flash Storage Technologies
category: Programming
tags: [Embedded Systems, OS]
---

There are multiple flash storage options for embedded devices.

# NOR Flash

- can be mapped directly int address space
- code can be directly executed from NOR flash
- expensive
- reliable
- arranged into erase blocks (i.e. 128 KiB)
- erasing block: set all bits to 1
- erase cycle damages block slightly: wear leveling
- programming and reading one word at a time
- standard register-level interface: Common Flash Interface (CFI)
- [CFI is described in standard JESD68](https://www.jedec.org/)

# NAND Flash

- cheaper and available in higher capacities (than NOR flash)
- needs more complex hardware and software
- cannot be mapped to address space
- code and data need to be copied to RAM
- organized into erase blocks (16 KiB - 512 KiB)
- can be only read and written in pages (~2 or 4 KiB)
- erasing block: set all bits to 1
- erase cycle damages block slightly: wear leveling
- extra area per page: out-of-band (OOB) area
- standard register-level interface: [Open NAND Flash Interface (ONFi)](http://www.onfi.org/)

# Managed Flash

- SD-Card and eMMC
- NAND chips with a controller
- similar interface to hard drive
