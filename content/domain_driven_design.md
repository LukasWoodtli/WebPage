Title: Domain Driven Design
Category: Programming
Tags: Agile, Scrum, XP, Software Development Methodology

[TOC]


# Introduction

Domain Driven Design (DDD) is a set of methodologies, tools and patterns that help to develop complex software systems.

The design techniques are divided into two major groups: strategical and tactical.

## Strategical

These ideas include the cooperation of a lot of different people participating in a project. This are mainly the business analysts (domain experts) and the developers.

## Tactical

The tactical ideas contain mostly design- and architecture-patterns. As well as common best practices regarding software engineering.


# Domain Model

When starting to develop a complex software it helps to have a good model of the domain where the product will be used.

The model is an abstraction of that domain. It is the internal representation of the domain for the software.

The model can be described with various techniques including: diagrams, text documents, use cases and scenarios (BDD).

Usually the model is not fully defined from the beginning. It is refined and improved while developing the software.

## Cooperation of Business Experts and Developers

To define a useful and solid model it is necessary that the software engineers (developers, architects, testers) that build the software collaborate with the business experts (analysts, users...) and figure out the essential concepts and the functionality that the software will implement.

This is an iterative process where the model is constantly refined, extended and cleaned up. Also the Ubiquitous Language is evolved and refined in this process.

The communication is bidirectional and defining the model is a combined effort. The resulting model needs to be understood by all participants. If a business expert doesn’t understand a part of the model then there is probably something wrong with it.

The discussions are a time consuming process. But it’s important to have a good model and a common language.


## Ubiquitous Language

While defining the model, a common language between business experts and developers emerges. This language should be improved to be distinct and unambiguous. It is called *Ubiquitous Language* and has to be used throughout the project including:

- Source Code
- DB Schema
- Documentation

The ubiquitous language helps to overcome the problem that software engineers and business experts use different communication styles and languages. It connects all parts of the design.

To form the ubiquitous language it might be helpful to experiment with alternative expressions to refine and improve the current model. Then the code (and database) need to be refactored and renamed to conform the new model.

The model and the ubiquitous language are strongly connected to each other.

Usually the nouns of the ubiquitous language become names of classes. Behavior of these classes (the methods) are often named with verbs of the ubiquitous language.
This is a simple naming scheme that should be only used as a rule of thumb.

Some behaviour (verbs) needs interaction of multiple objects and classes. This is implemented in services.


## Model Driven Development

The transformation of the model into code is an difficult process. The developers that write this code should know the model very well and are responsible for its integrity. A change in the code needs to be immediately reflected in the model.

The classes and methods of the software are a direct mapping of the model and ubiquitous Language to code. If this mapping is made obvious it makes the code very readable.

Anybody that works on the code needs to know how to express the model in code. It is necessary that all developers are involved into the discussions about the model with the domain experts.

If the design of the system or of central components don’t reflect the model, the correctness of the software is in danger.


# Building Blocks and Patterns

The original patterns of DDD are based on object oriented programming. But they can also be applied (in modified form) to other languages.


## Architecture

The classical DDD system uses a layered architecture. But other architecture styles may be applied. Important concepts of an architecture is to allow decoupling in a kind of packages and to forbid cyclic dependencies.

### Layers

This is a list of traditional layers in an n-tier application:

- UI: Represent information to the user and allow interaction.
- Application Layer: Coordination of application logic. It contains no business logic.
- Domain Layer: Business logic and objects.
- Infrastructure Layer: Persistency, Networking, I/O

### Building Blocks

#### Entities

Business objects that have an identity. The identity is usually a field or a combination of fields which is unique. Two objects with the same identity are considered as the same object. Special care needs to be taken to guarantee that distinct objects don’t get the same identity.

#### Value Objects

Value objects are domain objects that don’t have an identity. Looking at a single object, it doesn’t matter which object it is but what properties it has. Two objects with the same properties are considered to be the same value object.

Value objects should be preferred over entities when designing the system.

Value objects shall be immutable. If an value object needs to be updated a new object is created with the new properties. Immutability makes easy to share value objects.

Value objects can contain other value objects and even constant references to entitles.


#### Services

Behavior that is important for a domain but doesn’t belong to only one class should be put into a service.
Services work on multiple objects, possibly from different classes.
They are stateless and provide simply functionality (a concept) for the domain.

They should not be used to replace functionality that belong to individual classes. Instead they act as a connection point for multiple objects.

Business processes should be implemented as services.

Services can not only be used in the domain layer but also in the application or infrastructure layer. Domain and application services usually act on domain entities and value objects. It needs to be reassured that the layers are kept isolated from each other.

#### Modules

Large and complex models are split into modules.

Modules should have low coupling between each other and high cohesion inside them. Together with well defined interfaces this allows for good testing.

Module names become part of the ubiquitous language.

#### Aggregates

Aggregates are used to define ownership and boundaries of domain objects. They help to simplify relationships between objects by restricting them to be only inside the aggregate.

An aggregate is also the root regarding persistence. It has to handle transactions and contract (invariant) checking.

Each aggregate has one root which is the entry point for objects outside of the aggregate and it is the base entity for persistence.

Only the root should be obtainable through queries from the database.

##### Rules for Modeling Aggregates

1. Design small aggregates
2. Protect business invariants inside of aggregates
3. Reference other aggregates only by identity
4. Make a dependecy graph of the aggregates
5. Define acceptable time frame for updates to dependent aggregates (together with domain experts)
    - immediate
    - eventually (`n` seconds)
6. Put all components that need immediate update in the same aggregate
7. The other aggregates will be updated eventually


#### Domain Events

These objects model the events that the users of the system (and the domain experts) are interested in. Usually they are implemented as value objects. 

#### Factories

Construction of complex business objects (like aggregates and entities) should be done by factories (factory method, abstract factory, ...). Usually it is not feasible to build a complete object tree in a constructor of a single class.

The creation process should be atomic and raise an exception if the construction is not possible.

During the construction phase all the invariants need to be enforced.

Recreate persisted objects from a database needs special care. Corrupt data needs to be fixed somehow (see Repositories).

Factories are pure domain objects.


#### Repositories

Repositories encapsulate the recreation objects (aggregates) from a persistent store.

They can access the infrastructure layer. But this access has to be abstracted so that it can be exchanged or replaced. The repository itself is part of the domain model.

Factories are used to create new object trees. Where repositories are needed to store and retrieve already created object trees to and from a persistent store.
Internally they can use factories for creating an object tree and ensure that the invariants are met.


# Refactoring and Model Refinement

The code as well as the domain model need constant refinement and refactoring.

Working on the model and improving it is an continuous effort. Therefore it’s important to keep all the parts of the system aligned and up to date with the model.

The code needs to be flexible to allow to introduce new concepts. If the code is not flexible enough it needs to be refactored and improved.

Rich and useful domain models are developed in an iterative manner by refactoring, improvement and refinement.


# Bounded Context

A Bounded Context is a part of the domain. It is built with one model using its Ubiquitous Language. Each Bounded context has its own model.

Ideally each Bounded Context is developed and maintained by one team.

The boundaries of the Context (and its model) need to be explicit. The model has to be contained completely in the Bounded Context. It's also important to define whant isn't part  of a bounded context.

A Bounded Context contains usually multiple modules.

It‘s important to keep the borders of the bonded contexts consistent. There needs to be a means of communication between them.

All the Bounded Contexts need to be continuously be integrated in the system.

It’s also important to check the correctness of the system with automated tests.

Bounded Contexts have a name that is part of the ubiquitous language.

## Context Map

The contexts and their relationships should be documented with a context map. This is usually done with a diagram.

Everybody working on the system needs to know and understand the context map.

The Context Map can also show problems with badly defined Bounded Contexts. For example if two (or more) contexts share a part of the system.

When getting started with DDD it's a good starting point to draw a context map of the system.


# Common Patterns

## Shared Kernel

If there is a part of the system that is present in two (or more) contexts is it called a Shared Kernel. This is a sign of uncoordinated teams working on closely related parts of the system.

It’s also possible to actively to decide that two teams share a part of the system and maintain this part collectively. This reduces the effort of duplication and has the benefit of a partly common Ubiquitous Language.

The scope of the Shared Kernel has to be clearly defined. And any changes to it needs coordination between the teams that share it.


## Customer-Supplier

If one subsystem depends strongly on another one they are in a Customer-Supplier relationship.

The teams developing these subsystems need to meet regularly. The „customer“ has to specify its requirements. The „supplier“ team has to implement them.

There should be automated acceptance tests that guarantee the proper implementation.

## Anti-Corruption Layer

When connecting with legacy systems or third party software it’s important that the domain model doesn’t get polluted by the other system. The anti-corruption layer sits between the domain model and the external model. It is a natural part of the domain model (with its ubiquitous language) but translates between the two systems.

Usually it is implemented as a service. Internally it uses the Facade and the Adapter patterns. It makes sense to implement even multiple services in the anti-corruption layer.


## Core Domain and Subdomain

As big enterprise applications have huge models it makes sense to split them in separate parts (bounded contexts).

These parts have a focus on different aspects of the domain:

### Core Domain

This contains the main functionality of the application. It is the unique selling point. The best developers should be assigned to work on that part of the domain.
The core should stay as small as possible. It contains a lot of business logic.

### Subdomains

The other parts of the model is implemented in subdomains.

They could be developed by an other company or could even be an generic third party tool that is integrated into the system.

#### Generic Subdomains

They should be generic and do not contain any specialties. Ideally they could be reused for other applications.

#### Supporting Subdomains

They are part of the specific domain of the application. But they don't contain core functionality.
