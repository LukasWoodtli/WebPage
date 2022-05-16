---
title: C++ on Embedded Systems
date: 2017-03-31
category: Programming
tags: [Embedded Systems, C++]
---

> This page is still work in progress



- No Exceptions (-fno-exception)
    - What do std functions that throw exeptions What happens with library functions that throw
- No Run Time Type Information (RTTI) (-fno-rtti)
- check size of modules (linker map files)
    - Find weakness (according code size) of compiler and avoid this kind of code
- Use Templates with care (can generate big code, hard to write, but nice to use)
- Use STL only if enough space available, use allocators (memory pools)
- new/delete can be overloaded
- Avoid new/delete, malloc/free: Memory Fragmentation
    - Use Memory Pools instead
    - Allocate at start time
    - Don't use any garbage collector
    - Use smart pointers if possible
- Programm Procedural when OOP is not needed
- Don't use 'Embedded C++', use coding rules and forbid some C++ features
