Title: Object Databases
Category: Programming
Tags: ETH, OOP
Date: 2016-02-20
Modified: 2016-02-20


[TOC]


<!-- Lecture 1 Slides Start -->
<!-- Lecture 1 Notes Start -->

# Motivation

- Information Systems Design
    - Conceptual Design -> Technical Design -> Implementation

## Orthogonal Persistence

Data has to outlive the execution of the program


- **Independence** of longelivety of data
    - How much code needs to be written for persistence
        - None at all would be nice but not realistic (GUI objects usually don't need storing...)
    - Data is stored automatically
- **Data Type Orthogonality** all data objects should be allowed to be persistent (long-lived, transient)
    - The data types do not need to be modified (implicitly or explicitly) to allow persistence
    - e.g Serializable interface in Java does not satisfy this criteria (classes that don't implement the interface can't be stored)
- **Identification**: mechanism for identifying persistent object not related to the type system
    - Transferring data from persistence storage to memory
    - e.g specify which classes/objects should be stored persistence
    - separation of concerns

> No commercial DB system fully satisfies the above criteria

## Impedance Missmatch

- Difference between models
- OOP Languages
    - Difference between attributes and relationships not clear
    - Both are (usually) reference types in a class
- Different models because there are different requirements
- Mapping code between the two models needed
    - A lot of solutions available
    - Affects run-time (and often development)
- Inheritance (OOP) is difficult to model in relational DBs
    - Objects spread over several tables (other approaches possible)

## Relational Databases

- Tables, Rows, Columns...
    - Table: Relation (similar to class)
    - Columns: Relation attributes (correspond to class attributes)
    - Keys: Pointers (relationships)

> It's difficult to match the relational database model to the object oriented model

- [Object-relational mapping](https://en.wikipedia.org/wiki/Object-relational_mapping) can help
    - But it's not a very good approach
    - There are a lot of solutions: Hibernate, [QxOrm](http://www.qxorm.com/qxorm_en/home.html), ...



## Develop own Database

- Support application development (programming language)
    - Clients of the DB system are developers (not end user)
- Support persistent data management
- One data model (OOP)
- One language (Java?)

## SQL

### Data Definition Language (DDL)

Definition of data models

- Concepts
    - Relations
    - Relation attributes and domains
    - Primary and foreign key
- Operations
    - Create tables
    - Declare relation attributes
    - Declare primary and foreign keys
    - Alter tables

### Data Manipulation Language (DML)

Creation and management of data

- Concepts
    - Relation touple
    - Predicate
- Operations
    - Insert
    - Update
    - Delete

### Query Language (QL)

Retrieval of data

- Concepts
    - Query
    - Predicate
    - Query result
- Operations (Relational Algebra)
    - Project
    - Join
    - Select

## DDL, DML and QL in SQL and Java

DD, DM supported in Java. Querying is very limited.

### DD

SQL

    :::SqlLexer
    CREATE TABLE name ...

Java

    :::java
    class Person {
        String name;
        String email;
    }

## DM

SQL

    :::SqlLexer
    UPDATE name ...


Java


    :::java
    new Person()
    p.name = "Bill Stinnet"


## Querying

SQL

    :::SqlLexer
    SELECT col_name ...

Java

    :::java
    ... = p.name


LINQ is a powerful and compile time safe support for querying.



## Learning Goals

- Motivation for Database technologies (not relational)
    - Design- and run-time
    - Complex application domains
    - Schema and data evolution
- Understanding of object-oriented data model
    - what is OOP?
    - ODMG
- New and alternative concepts and applications
- Develop an object database
    - Requirements
    - Challenges
        - integration with application
        - duplicate objects
        - OO-specific indexing
        - ...
- Object database technologies
    - Products
        - db4o
        - Object Store
        - Objectivity
        - Versant
    - General concepts
    - Solutions to the challenges
- Comparison to other database technologies
    - Android SDK
    - Hibernate
    - Django
    - ...



<!-- Lecture 1 Slides End -->
<!-- Lecture 1 Notes End -->


# Object Database Systems

| System                                | db4o | Object Store | Versant | Objectivity  |
|---------------------------------------|------|--------------|---------|--------------|
| Data-type Orthogonality               |      |              |         |              |
| Orthogonal Persistence (independence) |      |              |         |              |
| Programming Languages                 |      |              |         |              |
| OSs                                   |      |              |         |              |


<!-- Lecture 2 Slides Start -->
<!-- Lecture 2 Notes Start -->

# ODMG Standard

- What is an object?
    - Something that can be pointed to?
    - Can be passed on as a reference?
    - Distinct from single values

Examples in Java:

|           | Simple    | Complex  |
|-----------|-----------|----------|
| Reference | `Integer` | `Object` |
| Value     | `int`     |  N/A     |

In some languages (PHP, JavaScript, ...) Objects and Associative Arrays are the same (or similar).

- Some constructs can be extended over time
    - possible with map (add key/value)
    - *not* possible with *class* in Java

- Object Orientation needs a broader definition!
    - not coupled to a specific programming language

- Most database systems often independent of programming languages
    - e.g SQL very different from the language where the DB is used (independent of language)
- Object database systems are more coupled to one (or multiple) programming language


## Object Data Management Group (ODMG)

### Object Model

- Based on [OMG](https://en.wikipedia.org/wiki/Object_Management_Group) object model
- Basic modeling primitives
    - **object**: unique identifier (identity)
    - **literal**: no identifier
- Object state defined by the values (properties)
    - attributes
    - relationships
- Object behavior
    - set of operations (can be executed)

- Objects and literals are categorized by their type
    - A type defines common properties and common behavior

#### Types

- Specification
    - properties
        - attributes
        - relationships
    - operations
    - exceptions
- Implementation
    - language binding
    - a specification can have more than one implementation
- Similar to C++
    - Header-File: Specification
    - Source-File: Implementation

#### Type Specifications
- Interface
    - defines only abstract behavior
    - `interface Employee {...};`
- Class
    - defines both abstract behavior and abstract state
    - `class Person {...};`
- Literal
    - defines abstract state
    - `struct Complex { float real; float imaginary; };`

#### Type Implementation

- Representation
    - data structure
    - derived from type's abstract state by the language binding
    - for each property contained in the abstract state there is an instance variable of an appropriate type defined
- Methods
    - procedure bodies
    - derived from type's abstract behavior by the language binding
    - also private methods with no counterpart in specification

#### Subtyping and Inheritance

- Two types of inheritance relationships
    1. IS-A relationship
        - inheritance of behaviour
        - multiple inheritance, name overloading disallowed
        - `interface Professor : Employee {...};`
    2. **EXTENDS** relationship
        - inheritance of state and behaviour
        - single inheritance
        - `class EmplPers extends Person : Employee {...};`

- Co- and Contravariant rules must hold
    - Input Arguments: Contravariant
    - Return Values (and Exceptions): Covariant

### Object Definition Language (ODL)

...

### Object Query Language (OQL)

Based on ODMG Object Model and SQL-92

    :::SqlLexer
    select  list_of_values
    from    list_of_collections_and_typical_members
    where   condition

<!-- Lecture Notes Week 2 40:00 -->

### Language Bindings

- C++
- Java
- Smalltalk
- ...
