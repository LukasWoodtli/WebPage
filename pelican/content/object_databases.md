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

- DD

SQL

    :::SqlLexer
    CREATE TABLE name ...

Java

    :::java
    class Person {
        String name;
        String email;
    }

- DM

SQL

    :::SqlLexer
    UPDATE name ...


Java


    :::java
    new Person()
    p.name = "Bill Stinnet"

- Querying

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
        - inheritance of behavior
        - multiple inheritance, name overloading disallowed
        - `interface Professor : Employee {...};`
    2. **EXTENDS** relationship
        - inheritance of state and behavior
        - single inheritance
        - `class EmplPers extends Person : Employee {...};`

- Co- and Contravariant rules must hold
    - Input Arguments: Contravariant
    - Return Values (and Exceptions): Covariant

### Object Query Language (OQL)

Based on ODMG Object Model and SQL-92

    :::SqlLexer
    select  list_of_values
    from    list_of_collections_and_typical_members
    where   condition


- `SELECT`: Get attributes
- `FROM`: The base population of potential results to search in
- `WHERE`: Predicates (conditions) that have to be true so that the results are selected as result

Mapping to OOP not obvious.

Table in relational DBs has tow roles:
1. Defining Type
2. Container of all values (of that type)

In OOP 2. is missing. A class just defines a type but is not a container of all instances of that class.

ODMG defines Extents.


#### Difference to SQL

This is illegal as the “dot” operator cannot be applied to a collection of objects:
    :::SqlLexer
    select a.authors.title
    from   Authors a
    where  a.name = "Tilmann Zaeschke"

Correct solution based on *correlated* variables:

    :::SqlLexer
    select p.title
    from Authors a, a.authors p
    where a.name = "Tilmann Zaeschke"

#### Return Types

- Queries return sets, bags or lists

As a default, queries return a *bag*

    :::SqlLexer
    select first: p.authored_by[1], p.title, p.year
    from   Publications p

    :::java
    Bag<Struct { Author first, string title, integer year }>

Queries with `DISTINCT` return a *set*

    :::SqlLexer
    select distinct a.name
    from   Authors a

    :::java
    Set<Struct { string name }>

Queries with `ORDER BY` return a *list*

    :::SqlLexer
    select p.title
    from Publications s order by p.year desc

    :::java
    List<Struct { string name }>


#### Extents

- Extent of a type is the set (collection) of all active instances
    - `class Person`: extent of class Person would be the set of all person objects in the data management system
- Extents can be maintained automatically

### Collections

OMDG supports collections:



 - set: un-ordered, no duplicates
 - bag: un-ordered, duplicates
 - list: ordered, elements can be inserted
 - array: ordered, elements can be replaced
 - dictionary: maps keys to values

|            | Single elements | Duplicates  |
|------------|-----------------|-------------|
| Ordered    | ? (heap)        | list        |
| Un-ordered | set             | bag         |

Support for objects and literals:

- Collection objects: `Set<t>`, `Bag<t>`, `List<t>`, `Array<t>`, `Dictionary<t,v>`
- Collection literals: `set<t>`, `bag<t>`, `list<t>`, `array<t>`, `dictionary<t,v>`

#### Sub-collections

OMDG supports sub-collections

### Relationships

- All relationships are binary
    - many-to-many
    - many-to-one
    - one-to-one
- No support for ternary (or higher) relationships
    - can be simulated by creating classes to represent relationship touple
- System maintains referential integrity!

- Keywords for attributes and relationships
    - `attribute`: for normal class attributes
    - `relationship`: for relationship references (integrity checks can be performed)

### Persistence
- Persistence by reachability
    - not necessary the best option
- Database gives access to global names
    - explicitly named root objects
    - types defined in schema
    - named extents of types


### Other Concepts Supported
- Database operations
- Locking and concurrency control
- Transactions
- Access to meta-data
- Built-in structured literals and objects
    - dates
    - times
    - time-stamps
    - intervals
    - ...

### Object Definition Language (ODL)

- programming language independent, extensible and practical
- compatible to OMG Interface Definition Language (IDL)

ODL Syntax:

    :::java
    class name [ ( extent name, key name ) ] {
      { exception name { { type name } } }
      { attribute type name }
      { relationship type name inverse relationship }
      { type name({ (in|out|inout) type name })[raises ({ exception })] }
    }


- extent and key of a class can be specified optionally
- relationships specify inverse to maintain referential integrity
- method signatures are implemented by language binding


### Collection Expressions
- Aggregate operators
    - `AVG`, `SUM`, `MIN`, `MAX`, and `COUNT` apply to collections that have a compatible member type
- Operations for sets and bags
    - `UNION`, `INTERSECTION` and `EXCEPT`
    - inclusion tests (subset, super-set)
- Special operations for lists
    - Simple coercions
    - a collection of one element can be coerced to that element using the `ELEMENT` operator
- Flattening a collection of collections


### Language Bindings

- C++
- Java
- Smalltalk
- ...

# Hibernate

- Example of a [Object-relational mapping](https://en.wikipedia.org/wiki/Object-relational_mapping) tool
- Challenges
    - Data has to outlive the execution of the program
    - The program is written in an OOP language

![Mappings](/images/object_databases/db_mappings.svg)

- Problems of Object Identity
    - Two object graphs can point to same objects
    - Douplicates can be created When deserialized
    - Programmer must take care to avoid multiplicity!
- Object Identity
    - Multiple models
    - Impedance mismatch
    - Transformation must be implemented (Design Time)
    - Transformation must be carried out (Run Time)
    - Must be implemented for each application
- Possible use of SQL
    - Integrating a relational database at the level of SQL (e.g. JDBC, Google Android, PHP mysqli)
        - OK for simple application domains (e.g. few classes with base type attributes)
        - Not OK for complex application domains (e.g. many classes with reference type attributes, multi-valued attributes, associations, inheritance)

## Object-Relational Mappings

- Map object-oriented domain model to relational database
    - Hibernate
        - Free implementation for Java
        - maps Java types to SQL types
        - transparent persistence for classes meeting certain requirements
        - generates SQL for more than 25 dialects behind the scenes
        - provides data query and retrieval using either HQL or SQL
        - can be used stand-alone with Java SE or in Java EE applications
    - Java Persistence API (JPA)
        - Defines interface (and annotations) to use y other systems
        - Enterprise Java Beans Standard 3.0
        - introduced annotations to define mapping
        - javax.persistence package

## Main Concepts

- Configuration
    - Connection to database (hibernate.properties or hibernate.cfg.xml)
    - Which DBMS? (MySQL, HSQL, ...)
    - Which DB Instance? (Database Name)
    - Mappings
- SessionFactory
    - Using the configuration, a SessionFactory is created
    - Using this SessionFactory, Session objects can be created

Example:

    :::java
    SessionFactory factory = new Configuration().configure().buildSessionFactory();

- Session
    - Connection to a database instance
    - Created when we want to work with a database
    - Using a Session object, we can store and retrieve application data
    - Methods:
        - save
        - createQuery
        - update
        - delete

Example:

    :::java
    Session session = factory.openSession();
    ...
    session.save(person);
    ...
    session.close();

- Transaction
    - Opened with a Session object `beginTransaction()` and closed using `commit()`

Example:

    :::java
    Transaction tx = session.beginTransaction();
    ...
    tx.commit();

- Query
    - Represents a query (e.g. `SELECT * FROM PERSONS`, HQL).
    - Result is a list

Example:

    :::java
    List persons = session.createQuery(“FROM Persons”).list();
    for (Object p: persons)
      { ... }

- Criteria
    - An object-oriented representation of query criteria

<!-- Slides 03 p. 17 -->
