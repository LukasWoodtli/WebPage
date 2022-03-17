---
title: Unix Device Files
category: Programming
tags: [Computer Science, OS, Linux, Unix]
date: 2017-03-05
---
Device files provide access to drivers through files.

They are listed under `/dev`.
 There are two kinds of device drivers (as shown with `ls -l`)
`c`: character device
`b`: block device

- Character devices provide a stream of bytes (e. g. serial ports, USB, system consoles ...)
- Block devices allow random access of blocks of information (e. g. HD, SSD ...).

The device files have a major and a minor number. The same major number means that the same device
driver is responsible for the file/device. The minor number is used to distinguish different devices
of the same type that use the same device driver.

# Functions

A file descriptor for a device file can be aquired by the common `open()` function. Afer use it can be
closed with `close()`. Reading and writing to the file is donne with `read()` and `write()`.

Contol of device drivers is acomplished with the `ioctl()` function.

Man page: `man ioctl` and `man ioctl_list` (only Linux).


# Special Device Files

- `/dev/null`: used to redirect unused streams to 'nowhere'
- `/dev/zero`: 'infinite' sized file filled with `0` (s.a. `mmap()`)
- `/dev/pts/`: virtual consoles (s.a. [stackexchange](http://unix.stackexchange.com/questions/93531/what-is-stored-in-dev-pts-files-and-can-we-open-them/93640#93640))
- `/dev/random` and `/dev/urandom`: provide random numbers (`/dev/random` might block (high entropy), `/dev/urandom` doesn't block)
- `/dev/full`: can be used to simulate writing to a file when the disk is full (sets `errno` to `ENOSPC`)
