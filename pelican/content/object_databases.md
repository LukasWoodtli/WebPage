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
    - Transfering data from persistence storage to memory
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
