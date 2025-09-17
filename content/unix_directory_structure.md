---
title: Unix Directory Structure
category: Programming
tags: [Computer Science, OS, Linux, Unix]
date: 2016-09-30
modified: 2016-09-30
---

# Linux

See also the [Filesystem Hierarchy Standard](https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html).

| Directory   | Content                                                     |
|-------------|-------------------------------------------------------------|
| `/bin/`     | Essential commands and programs for all users               |
| `/sbin/`    | System binaries: mainly system administration programs      |
| `/boot/`    | Files for bootloader                                        |
| `/dev/`     | Device files and other special files                        |
| `/usr/`     | System utilities (Unix System Resources)                    |
| `/opt/`     | Optional software: mainly for users                         |
| `/etc/`     | System configuration files                                  |
| `/home/`    | User home directories                                       |
| `/root/`    | Root home directory                                         |
| `/tmp/`     | Temporary files, deleted regurarly (e.g. at reboot)         |
| `/kernel/`  | The operating system                                        |
| `/srv/`     | Data for services                                           |
| `/var/`     | Variable files: logs, configs, settings                     |
| `/usr/lib/` | Precompiled libraries (shared objects)                      |
| `/lib/`     | Precompiled libraries (shared objects)                      |
| `/media/`   | Removable devices are mounted here                          |
| `/mnt/`     | Temporary filesystems are mounted here                      |
| `/proc/`    | Virtual file system with live kernel information (`procfs`) |
| `/sys/`     | Virtual file system with live system information (`sysfs`)  |

Any directory ending with `bin/` contains binary executable files (or links to them).

The `/usr` directory contains additional executables, libraries, and utilities for the system
administrator. It contains the directories `/usr/bin`, `/usr/lib` and `/usr/sbin`.

`/usr` does not need to be on the root filesystem, therefore it cannot contain anything 
that is required for booting the system.

# Procfs

The `/proc` file system is a pseudo filesystem that allows to get informations from the kernel.

The man page can be found with: `man 5 proc`

There are also informations available in the `/sys` file system.



## Processes

Each running process has a subfolder in `/proc` which is named after its PID.

| Directory             | Content                                                                                        |
|-----------------------|------------------------------------------------------------------------------------------------|
| `/proc/$pid/cmdline`  | The command line that was used to start the process.                                           |
| `/proc/$pid/environ`  | The environment of the process.                                                                |
| `/proc/self`          | A link to the current process (can be used prom the process to get information about itself).  |
| `/proc/$pid/fd/`      | A directory that contains references to file descriptors that the process uses.                |
| `/proc/$pid/statm`    | Information about the process memory.                                                          |
| `/proc/$pid/status`   | General formated information: PID, real and effective UID and GID, memory use, bitmasks ...    |
| `/proc/$pid/stat`     | Same as `/proc/$pid/status`. But not formated.                                                 |
| `/proc/$pid/cwd`      | A symbolic link to the current working directory of the process.                               |
| `/proc/$pid/exe`      | A reference to the executable file of the process.                                             |
| `/proc/$pid/root`     | A link to the root directory of the process (s.a. `chroot()`).                                 |
| `/proc/$pid/maps`     | Contains memory mappings to files and libraries used by the process. This file can become very large. |


## Kernel

- The command that was used to run the kernel at boot time can be found with `cat /proc/cmdline`
- More information about kernel parameters can be found with `man bootparam`
- The current locks can be found under `/proc/locks`
- Loaded kernel modules are listed under `/proc/modules`
- Information about filesystems are found under `/proc/filesystems` and `/proc/mounts`


## Hardware

| Directory          | Content                                                              |
|--------------------|----------------------------------------------------------------------|
| `/proc/devices`    | List devices (character- and block-devices), HD's, SSD's, ports ...  |
| `/proc/dma`        | List of used DMA channesl and the driver that uses it.               |
| `/proc/interrupts` | List of used interrupts, type of IRQ, using modules and number of occureces |
| `/proc/ioports`    | List of all used I/O port (HD's, ethernet, USB ...).                 |
| `/proc/iomem`      | Mapped hardware memory regions.                                      |
| `/proc/stat`       | General informations about processorS states (s.a. `procinfo`)       |
| `/proc/uptime`     | Number of seconds that the system is running and idle time of CPU's. |
| `/proc/scsi/`      | Directory with informations about SCSI devices                       |
| `/proc/scsi/scsi`  | List of all SCSI devices.                                            |
| `/proc/net/`       | Directory with information to networks                               |
| `/proc/loadavg`    | Average workload (1 minute, 5 minutes, 15 minutes, active processes / number of processes, last used PID) |
| `/proc/meminfo`    | Information about memory.                                            |
| `/proc/cpuinfo`    | Information about CPU's.                                             |
