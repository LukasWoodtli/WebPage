---
title: Object Oriented Design Principles
date: 2018-05-31
modified: 2018-05-31
category: Programming
tags: [C++, Python, OOP]
---
[TOC]


# General

- Use [Coding conventions](https://en.wikipedia.org/wiki/Coding_conventions)
- [Keep it simple, stupid (KISS)](https://en.wikipedia.org/wiki/KISS_principle)
- Boy Scout Rule: "Always leave the campground cleaner than you found it" - Robert C. Martin
- [Broken Window Theory](https://pragprog.com/the-pragmatic-programmer/extracts/software-entropy): Don't Live with Broken Windows
- Fix root cause (root cause analysis, no workaraounds): otherwise it will get you again
- [You aren't gonna need it (YAGNI)](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it): implement things when you need them


# Class Design

## SOLID

- *S*: Single responsibility principle (only one reason to change)
- *O*: Open/closed principle (open for extension, closed for modification)
- *L*: Liskov substitution principle
- *I*: Interface segregation principle
- *D*: Dependency inversion principle (dependency injection can be used)

See [SOLID](https://en.wikipedia.org/wiki/SOLID) and [SOLID Design Principles]({filename}/solid.md).


# Package Design

See [Package principles](https://en.wikipedia.org/wiki/Package_principles)

## Package Cohesion

### Reuse-release Equivalence Principle (REP)

- A package must contain reusable classes
- All of the classes inside the package are reusable (or none of them are)
- The classes must be of the same family

### Common-Reuse Principle (CRP)

Classes that are reused together belong in the same package

### Common-Closure Principle (CCP)
    
- A package should not have more than one reason to change
- Changes to an application shall occur only in one package
- If classes are tightly coupled, they belong to the same package


## Package Coupling

### Acyclic Dependencies Principle (ADP)

- No cycles are allowed in the dependency structure
- Dependencies form a tree (or DAG)

## Stable-Dependencies Principle (SDP)

- Packages that are changed frequently shall not depend on packages that are difficult to change

## Stable-Abstractions Principle (SAP)

- Stable packages should be abstract, so that it can be easier extended
- Unstable packages should be concrete, it's easier to change


# Development Environment and Infrastructure

- Building the software needs to be possible with just one command
- Running a single test needs to be possible with just one command
- Running all tests needs to be possible with just one command
- Integrate unit tests into build
- Source control (e.g. git) for everything: source, docs, reference data, tools...
- Use static and dynamic analysis tools
- Set highest warning level of compilers, use multiple different compilers
- Write documentation: Wiki, Doxygen, Markdown...
- Apply CI/CD, pipeline as code


# References

- [97 Things Every Programmer Should Know](https://97-things-every-x-should-know.gitbooks.io/97-things-every-programmer-should-know/content/en/index.html)
- [Encapsulate](https://en.wikipedia.org/wiki/Encapsulation_%28computer_programming%29) what varies ([Encapsulation Is Not Information Hiding](http://c2.com/cgi/wiki?EncapsulationIsNotInformationHiding))
- [Prefer Composition to inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance)
- Program to Interface, not Implementation: [Liskov substitution principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle)
- [Cohesion](https://en.wikipedia.org/wiki/Cohesion_%28computer_science%29): Objects should only interact with 'friends' (objects in their neighborhood)
- Ineracting Objects should aim for [loose coupling](https://en.wikipedia.org/wiki/Loose_coupling)
- [Tell don't ask](http://martinfowler.com/bliki/TellDontAsk.html): Tell Objects what to do with their data, don't ask for the data to operate on it
- [List of Design Patterns]({filename}/design_patterns.md)

