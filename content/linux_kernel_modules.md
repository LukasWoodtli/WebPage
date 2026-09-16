---
title: Linux Kernel Modules
category: Programming
tags: [Assembler, Computer Science, OS, Linux]
---

A Linux Kernel Module is loadable at runtime. This keeps the kernel itself smaller and
removes the need to recompile the whole kernel when functionality is added.

A notable use of Kernel Modules are Device Drivers.

# Main Tools and Commands

Install necessary tools:

```sh
sudo apt-get install build-essential kmod
```

To list modules that are currently loaded in th kernel use `lsmod` or `cat /proc/modules`.

# Useful Kernel Config Settings



`CONFIG_DEBUG_INFO`: Add debug symbols (for `gdb`, `addr2line`, and `objdump`).
`CONFIG_KASAN`: Enable Kernel Address Sanitizer (detect out-of-bounds, use-after-free, and other memory errors).
`CONFIG_LOCKDEP`: Enable lock dependency checker (detect potential deadlocks).
`CONFIG_DEBUG_ATOMIC_SLEEP`: Flags attempts to sleep in atomic context (catches the most common spinlock misuse).
`CONFIG_MODULE_FORCE_UNLOAD`: Allows `rmmod -f` as a last resort during development.


# Resources

[The Linux Kernel Module Programming Guide](https://sysprog21.github.io/lkmpg/)
