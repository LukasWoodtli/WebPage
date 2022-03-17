---
title: Smart Pointers
category: Programming
tags: [C++]
date: 2017-03-20
---
From:
[Smart Pointers to boost your code](http://www.codeproject.com/Articles/8394/Smart-Pointers-to-boost-your-code)

[TOC]

# `unique_ptr`

- unique ownership
- copying prevented
- use `std::move` to transfer ownership
- const prevents transfer
- can't be used as elements in containers
- use as replacement for `auto_ptr`


# `shared_ptr`

- reference counting
- referenced object is destroyed when (and only when) all copies of the `shared_ptr` have been destroyed
- can be used as elements in containers

# `weak_ptr`

- created as copy of `shared_ptr`
- copying/destroying have no effect on ref counting of `shared_ptr`
- after all copies of `shared_ptr` have been destroyed all `weak_ptr` copies become empty


# `scoped_ptr` (Boost)

- use `const unique_ptr` instead (or `unique_ptr` if you have to)


# Other smart pointers (Boost)

- `intrusive_ptr`
- `shared_array`
- `scoped_array`


# Rules for smart pointers

- Assign and keep:
    - Assign a newly constructed instance to a smart pointer immediately
    - Keep the management of the referenced instance in the smart pointer(s).
- The smart pointer(s) own the object.
    - Don't delete the owned instance manually.
    - You can't (shouldn't) take the instance away from the smart pointer.
- `..._ptr<T>` is not a `T*`
    - There are no implicit conversions
    - You can not assign a `T*` to a `..._ptr<T>`
    - You can not write `ptr = NULL` use `ptr.reset()`
    - To retrieve the raw pointer use `ptr.get()`
    - You must not delete it!
    - You must not use this pointer after the smart pointer(s) it comes from is/are destroyed, resetted or reassigned
- Avoid circular references
    - Use `weak_ptr` to break such cycles
- No temporary `shared_ptr`
    - Always construct *named* smart pointer variables.
    - No anonymous (i.e. as param in function call) smart pointer constuction
- Smart pointers are thread safe. But not necessary the pointee objects
