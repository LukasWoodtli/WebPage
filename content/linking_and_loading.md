Title: Linking and Loading
Date: 2015-08-11
Category: Programming
Tags: Computer Science, OS, Linux, Unix

The different forms of Linking

There are two major forms of linking: static and dynamic. But there are some subtle details in each form of linking.

This explanations are mainly for Linux. On other OS’s the same concepts apply but with some minor differences.

See also: [Executable Loader]({filename}/executable_loader.md)


# Static Linking

- Combine object files and archives to binaries (executables and shared libraries)
- Usually a step in the build process (after compiling)
- Not very flexible
- Not very suitable for libraries
    - Libraries should be linked dynamically to executables
    - Libraries are usually created by statically linking object files together
- Order of symbol resolution can be tricky (e. g. same symbol in multiple object files)

# Dynamic Linking

Shared libraries (so, dll, dylib) are loaded at runtime.

## Loading

- Often just called: dynamic linking
- Shared libraries are passed to linker in build process (like with static linking)
- Dynamic loader loads library to process address space when executable is started (or can be lazy loaded)
- Mostly used for libraries that are available at build time

## Manual loading (dlopen)

- Same mechanism as dynamic linking
- But linking happens manually (programmatically)
- ‘dlopen’ on Linux/UNIX
- Can load library at run time
- Used for plug-in mechanism

## Preloading

- The dynamic linker looks for libraries in ‘LD_PATH’
- Possible to hook into loading process with ‘LD_PRELOAD’
- Libraries provided in ‘LD_PRELOAD’ are loaded instead of libraries in ‘LD_PATH’
- Can be used for overwriting or extending system functions (e. g. allocators: ‘malloc’, ‘free’, ‘realloc’ ...)
- Special checks (security) are performed before library is preloaded


