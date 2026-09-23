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

# Building Kernel Modules

The kernel build system `kbuild` is used to build kernel modules. It supports also out-of-tree build of modules.

See [documentation](https://git.kernel.org/pub/scm/linux/kernel/git/stable/linux.git/tree/Documentation/kbuild/modules.rst).

# Useful Kernel Config Settings

`CONFIG_DEBUG_INFO`: Add debug symbols (for `gdb`, `addr2line`, and `objdump`).
`CONFIG_KASAN`: Enable Kernel Address Sanitizer (detect out-of-bounds, use-after-free, and other memory errors).
`CONFIG_LOCKDEP`: Enable lock dependency checker (detect potential deadlocks).
`CONFIG_DEBUG_ATOMIC_SLEEP`: Flags attempts to sleep in atomic context (catches the most common spinlock misuse).
`CONFIG_MODULE_FORCE_UNLOAD`: Allows `rmmod -f` as a last resort during development.

# Dynamic Debug Logs

- Compile kernel with `CONFIG_DYNAMIC_DEBUG`: `pr_debug()` calls are compiled but disabled.
- Enable logs: `echo "module <my-module> +p" > /sys/kernel/debug/dynamic_debug/control`.

See [documentation](https://git.kernel.org/pub/scm/linux/kernel/git/stable/linux.git/tree/Documentation/admin-guide/dynamic-debug-howto.rst).

# Resources

[The Linux Kernel Module Programming Guide](https://sysprog21.github.io/lkmpg/)
