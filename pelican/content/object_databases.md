Title: Object Databases
Category: Programming
Tags: ETH, OOP
Date: 2016-02-20
Modified: 2016-02-20


<!-- Lecture 1 Slides Start -->

# Motivation

- Information Systems Design
    - Conceptual Design -> Technical Design -> Implementation

## Orthogonal Persistance

Data has to outlive the execution of the program

- **Independence** of longelivety of data
- **Data Type Orthogonality** all data objects should be allowed to be persistent (long-lived, transient)
- **Identification**: mechanism for identifying persistent object not related to the type system

## Develop own Database

- Support application development (programming language)
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
    - Relation tuple
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

## DDL, DML and QL in Java

DD, DM supported in Java. Querying is very limited.

### DD

    :::java
    class Person {
        String name;
        String email;
    }

## DM

    :::java
    new Person()
    p.name = "Bill Stinnet"

## Querying

    :::java
    ... = p.name

LINQ is a powerful and compile time safe support for querying.



## Learning Goals

- Motivation for Database technologies (not relational)
    - Design- and runtime
    - Complex application domains
    - Schema and data evolution
- Understanding of object-oriented data model
    - what is oop?
    - ODMG
- New and alternative concepts and applications
- Develop an object database
    - Requirements
    - Challenges
        - integration with application
        - duplicate objects
        - OO-specific indexing
        - ...
- Object database technolologies
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

