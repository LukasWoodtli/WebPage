Title: Concepts of Object Oriented Programming
Category: Programming
Tags: C++, Python
Date: 2015-07-27
Modified: 2015-07-27


# The Object Model

- A software system is a set of cooperating objects
- Objects have state (fields) and processing ability (methods)
- Objects exchange messages (methods)

Objects have:

- State
- Identity
- Lifecycle
- Location
- Behavior

## Interfaces and Encapsulation

- Objects have well-defined interfaces
    - Publicly accessible fields
    - Publicly accessible methods
- Implementation is hidden behind interface
    - Encapsulation
    - Information hiding
- Interfaces are the basis for describing behavior


## Classification and Polymorphism

- Classification: Hierarchical structuring of objects
- Objects belong to different classes simultaneously
- *Substitution principle*: Subtype objects can be used wherever supertype objects are expected

### Classification

- We can classify objects or fields (?)
- Classifications can be *trees* or *DAGs*
- Classifications of objects form “is-a” relation
- Classes can be abstract or concrete

> Substitution Principle: Objects of subtypes can be used wherever
objects of supertypes are expected


### Polymorphism

#### Subtype Polymorphism

- Direct consequence of substitution principle
- Run-time (dynamic) Polymorphism
- Dynamic (late) binding

#### Parametric Polymorphism

- Generic types
- Uses *type parameters*
- One implementation can be used for different types
- Type missmatch detected at compile time
- i.e C++ Templates

#### Method Overloading

- Ad-Hoc Polymorphism
- Methods with same name but different arguments


### Spezialization

- Start from general objects/types
- Extend these objecs (fields and methods)
- Behaviour of specialized objects need to be compliant to more general objects! (Substitution Principle)
- Progam parts that work for the genral objects work also for specialized objects


# Types and Subtyping

## Types

### Weak and Strong Type Systems

#### Untyped Languages

- Not classifying values into types
- i.e. Assembler

#### Weakly Typed Languages

- Classifying values into types
- No strict enforcement of restrictions
- i.e. C, C++

#### Strongly Typed Languages

- Enforcing that all operations are applied to values of appropriate type
- Strongly-typed languages prevent certain erroneous or undesirable program behavior
- i.e. Java, Python, Scala, Smalltalk, Eiffel, C#

### Nominal and Structural Types

#### Nominal Types

- Based on type names
- i.e. C++, Java, Eiffel, Scala

#### Structural Types

- Based on available methods and fields
- i.e. Python, Ruby, Smalltals