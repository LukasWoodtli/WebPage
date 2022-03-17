---
title: Make as multi-paradigm language
date: 2017-11-29
category: Programming
tags: [Build Tools, Computer Science]
---
Make can be seen as a multi-paradigm programming language.

It supports at least three paradigms:

1. Declarative
2. Imperative
3. Functional

# Declarative

Rules in makefiles are written in a declarative way:

    :::make
    %.o: %.c
    	gcc -c $< -o $@


# Imperative

Conditionals can be used as an imperative way to describe alternative actions in makefiles .

    :::make
    ifeq ($(MSG),)
    $(warning "No message provided")
    endif


# Functional

Functions in make are evaluated in a functional way:

Example: Calculate the factorial with help of `bc`

    :::make
    fact=$(if $(filter 0, $(1)), 1, $(shell echo "$(1) * \
    	$(call fact, $(shell echo "$(1) - 1" | bc))" | bc))
    result=$(call fact, 4) # 24
