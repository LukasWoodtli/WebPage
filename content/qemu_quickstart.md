---
title: QEMU Quickstart
category: Programming
tags: [Embedded Systems, OS]
date: 2018-03-06
---
This shows a basic use for QEMU.

See also [QEMU Documentation](https://www.qemu.org/docs/master/system/index.html)


QEMU can emulate different processor architectures:

- `qemu-system-arm`: ARM
- `qemu-system-mips`: MIPS 
- `qemu-system-ppc`: PowerPC 
- `qemu-system-x86`: x86 and x86_64

QEMU emulates lot of hardware for each architecture which can be shown with the option `-machine help`.

Example use:

`qemu-system-arm -machine vexpress-a9 -m 256M -drive file=rootfs.ext4,sd -net nic -net use -kernel zImage -dtb vexpress-v2p-ca9.dtb -append "console=ttyAMA0,115200 root=/dev/mmcblk0" -serial stdio -net nic,model=lan9118 -net tap,ifname=tap0`


The most important options are:

- `-machine vexpress-a9`: emulation of ARM Versatile Express development board (with Cortex A-9 processor)
- `-m 256M`: 256 MiB RAM
- `-drive file=rootfs.ext4,sd`: connect the sd interface to the file `rootfs.ext4` (filesystem image)
- `-kernel zImage`: loads the Linux kernel from the file `zImage`
- `-dtb vexpress-v2p-ca9.dtb`: loads the device tree from the file `vexpress-v2p-ca9.dtb`
- `-append "..."`: supplies this string as the kernel command line
- `-serial stdio`: connects the serial port to the terminal that launched QEMU, so you can log via the serial console
- `-net nic,model=lan9118`: creates a network interface
- `-net tap,ifname=tap0`: connects the network interface to the virtual network interface `tap0`


For configuring the network interface the command `tunctl` is used:

`sudo tunctl -u $(whoami) -t tap0`

This creates a network interface named `tap0` which is connected to the network controller in the emulated QEMU machine.

The `tunctl` command is available from the *User Mode Linux (UML)* project (uml-utilites).
