---
title: Practical C++ Metaprogramming
category: Programming
tags: [C++]
---

Notes taken from:

Practical C++ Metaprogramming
Edouard Alligand and Joel Falcou
O'Reilly Media, Inc.


My repository with examples on [Github](https://github.com/LukasWoodtli/PracticalCppMetaprogramming)

# Chapter 1. Introduction

## The Early History of Metaprogramming

*"LISP macros were able to be used to extend the languages from within."*

*"[In C/C++] An X-macro is, in fact, a header file containing a list of similar macro invocations—often called the components—which can be included multiple times. Each inclusion is prefixed by the redefinition of said macro to generate different code fragments for the same list of components."*


## Enter C++ Templates

*"It was quickly discovered that by supporting partial specialization, compile-time equivalents of recursion or conditional statements were feasible."*

*"We could turn templates into a very crude and syntactically impractical functional language, which [is] Turing-complete."*

*"Applications of C++ template metaprogramming includes the following:*

- *Complex constant computations*
- *Programmatic type constructions*
- *Code fragment generation and replication"*


*"Those applications are usually backed up by some libraries, like Boost.MPL or Boost.Fusion, and a set of patterns including tag dispatching, recursive inheritance, and SFINAE."*


# Chapter 2. C++ Metaprogramming in Practice

## The `std::tuple<>` pattern

*""return a bunch of otherwise unrelated stuff." This is a common pattern in modern C++"*

## Returning auto`

*"In template metaprogramming, there is no iterative construct."*

*"You can, however, use recursion to apply a callable on every member of the tuple."*

*"Whenever you can, you should use the `...` operator to apply a callable to every member of a list. This is faster, it doesn't generate all the unneeded intermediate types, and the code is often more concise."*

`std :: index_sequence`: *"The trick is to create an index sequence - whose sole purpose is to give us an index on which to apply the `...` operator - of the right size. This is done as follows:"*

    :::cpp
    static const std::size_t params_count = sizeof...(Params);
    std::make_index_sequence<params_count>();

*"At compile time, when you need to know how many elements you have in your list, you use sizeof...()."*


# Chapter 3. C++ Metaprogramming and Application Design

# Meta-Axiom #1

*"Types are first-class values inside compile-time programs."*

# Meta-Axiom #2

*"Any template class accepting a variable number of type parameters can be considered a type container."*

