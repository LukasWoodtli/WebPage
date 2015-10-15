Title: Concepts of Object Oriented Programming
Category: Programming
Tags: C++, Python, OOP
Date: 2015-07-27
Modified: 2015-07-27

[TOC]


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

Type systems can be analyzed in three dimensions:

1. Weak and Strong Type Systems
2. Nominal and Structural Types
3. Static and Dynamic Type Checking

### Weak and Strong Type Systems

How strongly or weakly typed a language is concerns casting (implicit and explicit).
It's mainly used to compare languages to each other about the possible castings, type safety and information loss.

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


### Type Checking

#### Static Type Checking

- Types of variables and methods are declared explicitly or inferred
- Types of expressions can be derived from the types of their constituents
- Type rules are used at compile time to check whether a program is correctly typed

> A programming language is called type-safe if its design prevents type errors

#### Dynamic Type Checking

- Variables, methods, and expressions of a program are typically not typed
- Every object and value has a type
- Run-time system checks that operations are applied to expected arguments
- Static languages need to performe some checks dynamically at run-time (i.e type-casting)

### Overview of Type Systems in OO-Languages

|            | Static                              | Dynamic                                        |
|------------|-------------------------------------|------------------------------------------------|
| Nominal    | C++, Java, Eiffel, Scala, C#        | certain features of statically-typed languages |
| Structural | Research languages: O'Caml, Moby... | Python, JavaScript, Ruby, Smalltalk            |

Dynamic and Structural is often called "duck typing".

## Subtyping

> Substitution  principle Objects of subtypes can be used wherever objects of supertypes are expected

- Syntactic classification: Subtypes understand *at least the messages* of their supertypes.

- Semantic classification: Subtypes provide *at least the behaviour* of their supertypes.

### Variance (Covariance, Contravariance and Invariance)

Based on substitution principle.

#### Covariance

Ordering of types from more specific to more generic (in direction of inheritance hierarchy)

![Covariance](/images/covariance.svg)

#### Contravariance

Ordering of types from more generic to more specific (in oposite direction of inheritance hierarchy)

![Contravariance](/images/contravariance.svg)


#### Variance for OOP

[Coursera:Scala](https://class.coursera.org/progfun-005/lecture/83)


|                                                        | Variance      |
|--------------------------------------------------------|---------------|
| Input Arguments                                        | Contravariant |
| Return Values and Exceptions                           | Covariant     |
| In- and Output Arguments (Mutable Reference Arguments) | Nonvariant    |

    :::cpp
    SuperReturnType Super::foo(SubParamType p); // |         ^ contra-
    //  ..                        ^             // |         | variant
    //   v                        ..            // | co-     |
    SubReturnType   Sub::foo(SuperParamType p); // v variant |

*Super* is more **general** than *Sub*.

*Sub* is more **specific** than *Super*.



| Programming Language    | Argument Type  | Return Type  |
|-------------------------|----------------|--------------|
| C++, Java, Scala, D...  | Invariant      | Covariant    |
| Eiffel                  | Covariant      | Covariant    |
| C#                      | Invariant      | Invariant    |


In Java and C# arrays are covariant!


### Behavioral Subtyping (Contracts)

What are the *properties* shared by the values of a type?

*Properties* should also include the behavior of the object.
This is expressed as interface specifications (contracts)

- Precondition: Have to hold before the method is executed
- Postcondition: Have to hold after the method has terminated
- Old-expressons: Can be used to refer to prestate values from the postcondition
- Invariant: Have to hold in al states in which an object can be accessed by other objects

#### Subtyping and Contracs

- Subtypes must fulfill contracts of supertypes
- Overriding method of subtypes may have *weaker preconditions* than the supertype method
- Overriding method of subtypes may have *stronger postconditions* than the supertype method
- Subtypes may have *stronger invariants* than supertypes
- Subtypes may have *stronger history constrains* than supertype



### Types as Contracts

Types can be seen as a kind of contracts.

Overriding Methods must:

| Behavioral Subtyping (contracts) | Nominal/Structural Subtyping (variance) |
|----------------------------------|-----------------------------------------|
| Weaker Preconditions             | Covariant Parameters                    |
| Stronger Postconditions          | Covariant Results                       |
| Stronger Invariants              | Nonvariant fields                       |

This doesn't apply exactly to:

- Invariants/Fields
- History constraints

## Inheritance

### Difference between inheritance and subtyping

Inheritance allows to reuse the code (specialization) inside a class
(member variables and method definitions).

Subtyping supports reuse externally. It's used for polymorphism
in form of the substitution principle.

Subtyping expresses classification.

Subtypeing depends only on the interface of objects and not on their
implementations.

In most existing OOP languages inheritance also is subtyping.
C++ allows private (or protected) inheritance which does not result
in subtyping.
With interfaces (Java, C++...) it's possible to create subtypes
without inheritance (no reuse of code from parent class).
Usually the term "inherit from an interface" is used even if it's
not correct.

> Subclassing = Subtyping + Inheritance

Inheritance is *not* a core concept of OOP.

OOP can do without inheritance, but not without subtyping!


## Aggregation vs. Private Inheritance (C++)

- Both solutions allow code reuse without establishing a subtype relation
- No subtype polymorphism
- No behavioral subtyping  equirements

Aggregation causes more overhead

- Two objects at run-time
- Boilerplate code for delegation
- Access methods for protected fields

Private inheritance may lead to unnecessary multiple inheritance


## Static and Dynamic Method Binding

- Static binding: Methods are selected based on the *static type* of the
receiver *at compile time*
- Dynamic binding: Methods are selected based on the *dynamic type* of the
receiver object *at run time*


Dynamic method binding enables specialization and subtype polymorphism

Drawbacks

- Performance: Overhead of method look-up at run-time
- Versioning: Dynamic binding makes it harder to evolve code
 without breaking subclasses

Defaults

- Dynamic binding: Eiffel, Java, Scala, dynamically-typed languages
- Static  binding: C++, C#

### Static Method binding in Java

Java binds methods statically in 3 cases:

1. Static Methods
2. Private Methods
3. Method calls on `super`


## Rules for proper Subclassing

- Use subclassing only if there is an *'is-a'* relation
    - Syntactic and behavioral subtypes
- Do not rely on implementation details
- Use precise documentation (*contracts* where possible)
- When evolving superclasses, *do not mess around with dynamically-bound methods*
- Do not add or remove calls, or change order of calls
- Do not specialize superclasses that are expected to change often


# Binary Methods

Binary methods take one explicit argument and receiver (this)

Often behavior should be specialized depending on the dynamic types
of *both* arguments.

Recall that covariant parameter types are not statically type-safe! (?)

- Dynamic binding for specialization based on dynamic type of *receiver*
- How to specialize on the dynamic type of the *explicit argument*?
- Visitor Pattern: tedious to write, requires modification of superclass

Some Languages Support Multiple Dispatch:

Method calls are bound on dynamic types of several arguments.

- Performance overhead
- Extra requirements are needed to ensure there is a “unique best method” for every call


# Multiple Inheritance

All OOP languages support multiple subtyping:

- One type can have several supertypes
- Subtype relation forms a DAG

Some languages support multiple inheritance.

## Problems with multiple inheritance


Ambiguities:

- Superclasses may contain fields and methods with identical names and signatures
- Which version should be available in the subclass?

Repeated inheritance (diamonds):

- A class may inherit from a superclass more than once
- How many copies of the superclass members are there?
- How are the superclass fields initialized?


# Mixins and Traits
