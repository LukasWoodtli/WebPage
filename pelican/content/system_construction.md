Title: System Construction
Category: Programming
Tags: 
Date: 2015-11-07
Modified: 2015-11-07


> My Notes for the *System Construction* Course at ETH

[TOC]

# Minos on Raspberry PI 2 (Case Study 1)

## ARM A7

The ARM *Architecture* is not the same thing as the ARM *Processor-Families*

### Documentation

There is a lot of good documentation for the ARM processors available. But it's difficult to
find the right documents.


| Document                                     | Main Content |
|----------------------------------------------|------------|
| ARM Architecture Referense Manual (ARMv7-AR, ARM ARM) | Possibility of implementing the processor. For compilers and tools. Partly used for system programming |
| ARM Technical System Reference (ARM Cortex-A7MPCore Family) | Perticular Implementation. Some endundant information to ARM ARM. |
| System On Chip Implementation Manual (BCM 2835) | How the core is embedded on the chip with periperals. Address map. Peripheral information. |

### 6 Kinds Of Instructions

1. Data Processing
2. Branch Instructions
3. Status Register Transfer
4. Load and Store (RISC)
5. Generic Coprocessor Instructions
6. Exception Generation

- Load-/Store: No memory operands (not as x86)
- Multiple-Data-Transfer commands ('stmdb sp!,{fp,lr}', '!': Write-Back)
- Link Register: 'bl': Branch-and-Link (stores PC in link register)
- PC-Relative Addressing: Loading large constants (that have no soace in instruction encoding) form code

### Execution Modes

- 7 Modes
- for exception handling
- Processor starts in supervisor mode
- System Mode: priviledged but same registers as user mode

### Special Registers

- R15: PC
- R14: LR
- R13: SP
- R12: FP (by convention)
- CPSR (Processor Status Register)
    - Mode Bits
    - IRQ Disable
    - Condition Flags
    - ...

### Typical Procedure Call

- Caller
    - Pushes parmams
    - 'BL #address': Stores PC of next instuction in LR

- Callee
    - Save LR and FP on stack: 'stmdb sp!, {fp, lr}'
    - Set new FP: 'mov fp, sp'
    - Execute procedure content
    - Reset stack pointer: 'mov lr, sp'
    - Restore FP and jump back to caller address: 'ldmia sp!, {fp, pc}'

- Caller
    - Clean up parameters from stack: 'add sp,sp, #n'

### Misc

- FIRQ is about having more stacked registers
- Return Link type: Different sizes because of pipe-line

## Raspberry PI 2

- Quad Core
- 1 GB RAM
- 40 Pin GPIO, ...
- UART, SPI, USB, Ethernet, ...
- Powered from MicroUSB

### Booting

- Kernel is copied to address: '0x8000h' and branches there (instead to '0x00')
- MMU is disabled
- Only one core is running

### MMU

- Memory translation is complicated due to two different MMU's
- ARM's memory mapped registers sart from '0x3f000000', opposed to '0x7e000000' in BMC manual
