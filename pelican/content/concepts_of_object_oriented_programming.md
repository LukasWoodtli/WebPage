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

> Substitution principle: Objects of subtypes can be used wherever
objects of supertypes are expected 


### Polymorphism

#### Subtype Polymorphism

- Direct consequence of substitution principle
- Run-time (dynamic) Polymorphism

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
    
