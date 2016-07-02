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
    - OOP data model is based on object trees
    - [The Relational Model](https://en.wikipedia.org/wiki/Relational_model) is based on tables
- OOP Languages
    - Difference between attributes and relationships not clear
    - Both are (usually) reference types in a class
- Different models because there are different requirements
- Mapping code between the two models needed
    - A lot of solutions available
    - Affects run-time (and often development)
- Inheritance (OOP) is difficult to model in relational DBs
    - Objects spread over several tables (other approaches possible)

An overview of the mismatch is shown on [Tutorialspoint](http://www.tutorialspoint.com/hibernate/orm_overview.htm)

| Mismatch    |                                                                                                         |
|-------------|---------------------------------------------------------------------------------------------------------|
| Granularity | An object model can have more classes than the number of corresponding tables in the DB.                |
| Inheritance | In OOP inheritance is a base concept. The Relational Model doesn't support this directly.              |
| Identity    | The Relational Model defines identity. In OOP there is often a difference between equality and identity. |
| Association | OOP uses references. The Relational Model uses foreign keys.                                            |
| Navigation  | OOP uses following references in object tree. The Relational Model uses queries.                        |


## Relational Databases

- Tables, Rows, Columns...
    - Table: Relation (similar to class)
    - Columns: Relation attributes (correspond to class attributes)
    - Keys: Pointers (relationships)

> It's difficult to match the relational database model to the object oriented model

## Object-relational mapping (ORM)

- [Object-relational mapping](https://en.wikipedia.org/wiki/Object-relational_mapping) can be used against object-relational miss-match
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

# General Topics for DB's

[Prepared Statement]

## CRUD and ACID

- The acronym [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) stands for the basic functions of a database system
    - Create
    - Read
    - Update
    - Delete

- The acronym [ACID](https://en.wikipedia.org/wiki/ACID) stands for the properties that allow for concurrent database transactions
    - Atomicity
    - Consistency
    - Isolation
    - Durability

# Object Database Systems

| System                                | db4o                                             | Object Store | Versant | Objectivity  |
|---------------------------------------|--------------------------------------------------|--------------|---------|--------------|
| Data-type Orthogonality               | No changes to classes to make objects persistent |              |         |              |
| Orthogonal Persistence (independence) |                                                  |              |         |              |
| Programming Languages                 |                                                  |              |         |              |
| Persistence Depth                      | persistence by reachability                      |              |         |              |
| OSs                                   |                                                  |              |         |              |


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
    - Simple coercion
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
    - Duplicates can be created When deserialized
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

- `Configuration`
    - Connection to database (hibernate.properties or hibernate.cfg.xml)
    - Which DBMS? (MySQL, HSQL, ...)
    - Which DB Instance? (Database Name)
    - Mappings between classes and database tables
    - The Configuration object is created at first
        - usually created only once during application initialization
- `SessionFactory`
    - Created by using the configuration object
    - Session objects can be created and supplied with configuration
    - Heavyweight object: create during start up and keep for later use
    - multiple databases require multiple `SessionFactory` objects
- `Session` object
    - Used to get physical connection to the database
    - leightweight
    - desigend to be instatiated each time an interatcion with the DB is needed
    - Persistent objects are *stored* and *retrieved* through `Session` object
    - should not be kept open for al long time
        - usually not thread safe
        - create before use
        - destroy after use
- `Transaction` object
    - represent a unit of work with the DB
    - handled by underlying tansaction manager and transaction (JDBC or JTA)
    - optional object
        - transactions can be managed in own application code
- `Query` object
    - SQL or Hibernate Query Language (HQL)
    - bind query parameters
    - limit number of results
    - execute query
- `Criteria` object
    - used to create and execute *object oriented* criteria queries to retrieve objects

## Configuration

- Hibernate needs to know where to find some informations about class mappings and database
- XML file: *hibernate.cfg.xml* (or Java properties file *hibernate.properties*)

### Properties

| Property          | Description                                       |
|-------------------|---------------------------------------------------|
| hibernate.dialect | The SQL dialect used to generate persistance code |
| hibernate.connection.driver_class | The JDBC driver class             |
| hibernate.connection.url          | The URL to the database instance  |
| hibernate.connection.username     | The username for the database     |
| hibernate.connection.password     | The password for the database     |
| hibernate.connection.pool_size    | The number of connections in the Hibernate database connection pool |
| hibernate.connection.autocommit   | Autocommit mode for the JDBC connection |


There are additional settings for using a database along with an application server and JNDI.

### Persistant Objects

Only Plain Old Java Object (POJO) can be saved in the DB.

Requirements:

- Default constructor
- Class should contain an ID
    - Maps to the primary key column in DB table
- Attributes should be private
    - Public accessor functions (getter, setter) need to be provided
    - JavaBean style accessors: getXYZ, setXYZ
- Persistence class either
    - non-final or
    - implementation of interface that declares all public methods
- Some additional minor restrictions from EJB framework


<!-- TODO Hibernate Tutorial http://www.tutorialspoint.com/hibernate/hibernate_examples.htm  -->

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

## Mapping Associations

- Uni- and bidirectional associations
- Unordered and ordered associations
- Association cardanality types
    - one-to-one
    - many-to-one
    - one-to-many
    - many-to-many
- Join Tables to map complex associations

Example:

    :::SqlLexer
    CREATE TABLE AUTHOR(AUTHOR_ID BIGINT NOT NULL PRIMARY KEY, ...)
    CREATE TABLE AUTHORSPUBLICATIONS(
      AUTHOR_ID BIGINT NOT NULL,
      PUBLICATION_ID BIGINT NOT NULL,
      PRIMARY KEY(AUTHOR_ID, PUBLICATION_ID))
    CREATE TABLE PUBLICATION(PUBLICATION_ID BIGINT NOT NULL PRIMARY KEY, ... )

## Mapping Inheritance

- Multiple strategies
    - One table per class hierarchy
    - One table per subclass
    - One table per concrete class
- Mapping strategies can be mixed
    - Different parts of inheritance hierarchy can have different strategy
- Implicit polymorphism
    - One table per concrete class
    - Common interface *not* mentioned in the mapping
    - Common properties are mapped in *every* table

## Annotations

- Since Java 5
- Java Persistence API (JPA, Enterprise Java Beans 3.0)
- Annotations instead of XML for mapping
- Standardizes ORM
- Hibernate implements JPA

# Google Android

- Linux based OS
- Default applications: Search, Maps, Mail, Calendar, Contacts...
- Java SDK
- Support for persistent data management

## Application component model

- Activity (UI)
- Service (API, Computation)
- Broadcast Receiver (Events)
- Content Provider (Data Management)

- Manifest
    - lists the application components
    - sets activity to be shown at startup
    - components can be made available to other applications
- Intent: request the use of application components
    - showing activities
    - using content provides
    - listening to events
    - starting services
    - ...
- [Application Life-cycle](http://developer.android.com/guide/components/activities.html)
    - States: New Activity, Running, Paused, Stopped, Destroyed
    - Extend `Activity`
    - Application can react to state changes

## Data Management

- Low-level: SQL
- High-level: Content Provider
- Database Instance
    - SQLite
    - **CRUD**
        - **C**reate (Insert)
        - **R**ead (Retrieve, Query)
        - **U**pdate
        - **D**elete
- Cursor
    - Iterator over result
    - Methods `isLast()` and `moveToNext()`
    - Type specific getter methods (e.g `getInt(3)`)
    - Access with index
    - Index can be retrieved `getColumnIndex(String colName)`

- Content Provider
    - Abstract class implemented by application
    - Uses
        - Cursor
        - URI
        - ContentValue


<!-- OODB Manifesto start -->
# Object-Oriented Databases: Object Database Manifesto

- Avoid impedance mismatch
- Provide uniform data model
- Combine features of
    - OOP
    - Database Management Systems

- The object-oriented database manifesto
    - 13 mandatory features
    - 5 optional characteristics
    - 4 open choices
    - several important topics not addressed

- Object-oriented systems (mandatory)
    - 1\. Complex objects
    - 2\. Object identity
    - 3\. Encapsulation
    - 4\. Types and classes
    - 5\. Type and class hierarchies
    - 6\. Overriding, overloading and late binding 7. Computational completeness
    - 8\. Extensibility

- Database management systems (mandatory)
    - 9\. Persistence
    - 10\. Efficiency
    - 11\. Concurrency
    - 12\. Reliability
    - 13\. Declarative query language

## Objects (mandatory)

- Complex objects
    - build from simpler objects (constructor)
    - collections
- Object identity and equality
    - Object ID (OID)
        - unique and immutable
    - sharing of objects (references)
    - *identical* objects have same OID
    - *equal* objects have same state
    - shallow and deep equality
- Touple: entities and their attributes
- Sets: collections of entities
- Lists: order

- Constructor orthogonality
    - supports arbitrary nesting such as
        - sets of sets
        - set of records
        - records containing records
        - ...
    - In contrast, relational databases only support
        - sets of records (relation with touple) and
        - touple containing atomic values
- Complex objects also require
    - transitive retrieval and deletion of objects
    - deep and shallow copying
    - ...
- Encapsulation
    - interface
        - signatures of public methods
    - implementation
        - includes data and methods
    - object state modification only through public methods
    - object data structure may be *exposed* for *declarative queries*!

## Types and Classes

- Data types
    - definition of object properties
    - static part: object structure
    - dynamic part: object behavior
    - separation of interface and implementation
    - Check of correctness at compile time
- Object classes
    - container for objects of the same type
    - objects can be added and removed
    - used to add, remove and iterate over all existing objects
        - to present, manipulate ... them

## Generalization Hierarchies

- Powerful modeling tool
- Reuse (specification and implementation)
- Inheritance
    - Substitution principle
    - Inherited attributes and methods (from super-class)
    - New attributes and methods can be added (in subclass)
- Migration between classes
    - move objects between hierarchy levels
    - object specialization and generalization

## Durability and Efficiency
- Persistence
    - data has to survive the program execution
    - orthogonal persistence
    - implicit persistence
- Secondary storage management
    - index management
    - data clustering
    - data buffering
    - access path selection
    - query optimization


- Orthogonality
    - Persistence applicable to all objects of any type
    - No additional code necessary
    - Moving objects between persistent and memory representation is not needed

- Similar requirements for  secondary storage management
    - As a rule of thumb:
        - a database should work without it, but with it, it should perform better
    - If this requirement is met, a complete separation of the logical and physical level is achieved

## Concurrency Control and Recovery
- Concurrency
    - management of multiple users concurrently interacting
    - atomicity, consistency, isolation and durability
    - serialisability of operations
- Reliability
    - resiliency to user, software and hardware failures
    - transactions can be committed or aborted
    - restore previous coherent state of data
    - redoing and undoing of transactions
    - logging of operations

## Declarative Query Language
- High-level language
    - express non-trivial queries concisely
    - text-based or graphical interface
    - declarative
- Efficient execution
    - possibility for query optimization
    - Application independent
    - work on any possible database
    - no need for additional methods on user-defined types


<!-- OODB Manifesto end -->


<!-- Lecture 5 Start -->

# db4o

- Open Source project
    - Java and .NET
- Features
    - No conversion of mapping needed
    - Classes don't need to be changed to make them persistent
    - One line of code to store (complex) objects
    - local or client/server mode
    - ACID transaction model
    - Automatic management and versioning of database schema
    - Small memory foot-print (single 2Mb library)

## Object Container

- Represents db4o databases
    - local file mode or
    - client connections to db4o server
- Owns one transaction
    - operations are executed transactions
    - transaction is started when object container is opened
    - after commit/rollback next transaction is started automatically
- Manages link between stored and instantiated objects
    - object identities
    - loading, updating, unloading

## Storing Objects

- Store objects with method `ObjectContainer.store(...)`
- Arbitrary complex objects can be stored
- Persistence by reachability

## Retrieving Objects

- 3 Query languages
    1. Query by Example
        - simple
        - based on prototype objects
        - selects *exact* matches only
    2. Native Queries
        - expressed in application programming language
        - type safe
        - transformed to SODA (optimized)
    3. Simple Object Data Access (SODA)
        - query API based on query graph
        - methods for descending graph and applying constraints

### SODA Queries

- Expressed using `Query` objects
    - `descend` adds or traverses a node in the query tree
    - `constrain` adds a constraint to a node in the query tree
    - `sortBy` sorts the result set
    - `orderAscending` and `orderDescending`
    - `execute` executes the query
- Interface Constraint
    - `greater` and `smaller` comparison modes
    - `identity`, `equal` and `like` evaluation modes
    - `and`, `or` and `not` operators
    - `startsWith` and `endsWith` string comparisons
    - `contains` to test collection membership

## Updating Objects

- Update procedure for persistent object
    - retrieve desired object from the database
    - perform the required changes/modifications
    - store object back to the database (calling `store` method)
- db4o uses IDs to connect in-memory objects with stored objects
- IDs are cached

## Deleting Objects

- similar to updating objects
- Method `ObjectContainer.delete(...)` removes objects

## Simple Structured Objects

- New objects are stored using the `store` method
    - Persistence by reachability
        - Object graph is traversed, each referenced object is stored
- Updating objects with `store` method
    - Update depth *1* by default
    - Only primitives and strings are updated
    - No traversal of object graph (performance)
- Deleting objects with `delete` method
    - Not cascaded by default
    - Referenced objects have to be deleted manually
    - Cascading delete can be configured for individual classes

### Updating Simple Structured Objects

- Cascading updates are configured per class with `ObjectClass.cascadeOnUpdate(..)`
- Update depth can be configured
    - `ExtObjectContainer.store(object, depth)` updates referenced objects to given depth
    - `ObjectClass.updateDepth(depth)` defines update depth for a class (and all its objects)
    - `Configuration.updateDepth(depth)` sets global update depth for all objects

### Deleting Simple Structured Objects

- Cascading deletes similar to cascading updates
    - configured per object class
    - `CommonConfiguration.objectClass (...)`
    - `ObjectClass.cascadeOnDelete(..)`
    - What happens if deleted objects referenced elsewhere???
    - Cache and disk can become inconsistent when deleting objects
        - `ExtObjectContainer.refresh(..)` syncs objects

## Object Hierarchies

- Complex object structures are handled automatically
    - hierarchies, composite hierarchies
    - inverse associations
    - inheritance and interfaces
    - multi-valued attributes, arrays and collections
- db4o database-aware collections
    - `ArrayList4` and `ArrayMap4` implement Collections API
    - as part of transparent persistence/activation framework
      - `ActivatableArrayList`, `ActivatableHashMap`, ...
    - complex object implementation becomes *db4o dependent*

## Transparent Persistence

- Persistence should be transparent to application logic
    - Store objects in database *once* (`store` method)
    - avoid multiple calls of `store`
- Logic of transparent persistence framework
    - `Activatable` interface
    - objects are made persistent by `store` method
    - objects bound to transparent persistence framework with `bind`method
    - commit: transparent persistent framework scans for modified objects and invokes `store`

Enabling transparent persistence

    :::java
    config.add(new TransparentPersistenceSupport());

## Activation

- Activation controls depth of loaded fields
    - field values (objects) are loaded in memory to a certain depth when query retrieves objects
    - activation depth: length of reference chain
    - fields beyond activation depth: default value (e.g `null`)
- Activation cases
    - `ObjectSet.next(...)` called on an query result
    - explicit `ObjectContainer.activate(...)`
    - db4o collection element accessed
    - members of Java collections are activated automatically when collection is activated
- Controlling activation
    - default depth: 5
    - `ObjectContainer.activate(..)` and `ObjectContainer.deactivate()`
- per class configuration

Methods for per class configuration of activation depth

    :::java
    ObjectClass#minimumActivationDepth(minDepth)
    ObjectClass#maximumActivationDepth(maxDepth)
    ObjectClass#cascadeOnActivate(bool)
    ObjectClass#objectField(...).cascadeOnActivate(bool)

### Transparent Activation

- Make activation transparent to application logic
    - activate fields automatically when accessed
- Logic of transparent activation framework
    - `Activable` interface
    - at object instantiation db registers itself in object with `bind(..)`

Enabling the transparent activation framework

    :::java
    config.add(new TransparentActivationSupport());

## db4o Transactions

- ACID
- Data transaction journaling
    - no data loss in case of system failure
    - automatic data recovery after system failure
- thread-safe for simultaneous interactions
- all work in `ObjectContainer`is transactional
    - transaction started when container opened
    - current transaction committed when container closed
    - explicit commit and rollback possible
        - `ObjectContainer.commit(...)`
        - `ObjectContainer.rollback(...)`

## Configuration

- Embedded
    - `Db4oEmbedded.newConfiguration()`
- Client/Server
    - `Db4oClientServer.newClientConfiguration()`
    - `Db4oClientServer.newServerConfiguration()`

## External tools
- performance tuning
- database diagnostics
- Indexes
    - optimize query evaluation
- Defragment
    - removes unused fields, classes, management information
    - compacts db file, faster access
    - command line interface or from application
- Statistics
    - queries
    - objects: stored, retrieved, activated, ...
    - I/O, Network, ...
- Logger
    - logs objects in db
    - logs objects of a given class
    - run from command line

## Indexes

- Trade-off between
    - increased query performance
    - decreased storage, update and delete performance
- Set by configuration or annotation (`@Indexed`)
- B-Tree based indexes on single object fields

## Tuning for Speed

- Heuristic to improve performance
    - weak references
    - BTree node size
    - free-space manager
    - locking
    - flushing
    - callbacks
    - caches
    - ...
- Object loading
    - use appropriate activation depth
    - use multiple object or session containers
    - disable weak references if not required
- Database tests
    - disable detection of schema changes
    - disable instantiation tests of persistence classes at start-up
- Query evaluation
    - set field indexes on most used objects to improve searches
    - optimize native queries

## Distribution and Replication

- Embedded mode
    - DB accessed by clients in same *JVM*
    - direct file access: 1 user and 1 thread at a time
    - client session: 1 user and multiple threads
    - Database file opened, locked and accessed directly
        - `Db4oEmbedded.openFile(configuration, name)`
- Client/Server mode
    - Clients in multiple *JVMs*
    - DB access on server
    - Client opens TCP/IP connection to server
        - `Db4oClientServer.openServer(filename, port)`
        - `Db4oClientServer.openClient(host, port, user, pass)`
    - Client sends query, insert, update and delete instructions to server
    - Client receives data from the server
- Replication
    - redundant copies of database on multiple servers
    - changes replicated form *master* to *client* servers
    - several forms of replication supported
        - snapshot replication
        - transactional replication
        - merge replication
    - needs to be coded into application
        - cannot be configured on admin level
        - replication only on demand
        - client/server semantics introduced by developer
        - one interface for all forms of replication
    - Replication Modes
        - Snapshot Replication
            - Snapshots of master replicated to client
            - state-based
            - periodical schedule
            - special SODA query to detect all new and updated objects
        - Transactional Replication
            - Changes synchronized after transaction
            - operation based
            - changes replicated immediately
            - Single object replication with `ReplicationSession`
        - Merge Replication
            - Changes from clients merged to central server
            - Other clients updated to reflect changes
            - Transactionally of on a periodic basis
            - Typically if subscribers are occasionally offline
- Replication System
    - Separated from db4o core
    - uni- or bidirectional replication
    - Replication of relational databases based on Hibernate
    - Supported replication providers
        - db4o &rarr; db4o
        - db4o &rarr; Hibernate
        - Hibernate &rarr; db4o
        - Hibernate &rarr; Hibernate
    - 3 steps required
        1. Generating unique IDs and version numbers
        2. Creating a `ReplicationSession`
        3. Replicating objects
    - Mode dependent on implementation
    - Bidirectional by default
        - Unidirectional can be configured
            - `ReplicationSession.setDirection(from, to)`
        - `ReplicationSession.replicate(object)` newer object transferred to DB
        - Object granularity
    - Conflict handlig has to be done by developer

## Callbacks

- Called in response to events
    - activate
    - deactivate
    - new
    - update
    - delete
- Methods called before and after event
    - `can...` called *before* event
    - `on...` called *after* event
- Interface `ObjectCallbacks`
- Use Cases
    - Recording or preventing updates
        - `canUpdate()` and `onUpdate()`
    - Setting default values after *refactoring*
        - `canNew()`
    - Checking object integrity before storing objects
        - `canNew()` and `canUpdate()`
    - Restoring state when objects activated
        - Update UI, restore network connections, ...


## Object Instantiation

- Three different techniques for instantiation
    1. Constructor
    2. Bypassing Constructor
    3. Translator
- Bypassing Constructor is default (if available)
- Can be configured globally or per class
- Constructors
    - db4o tries first default constructor
    - if not public default constructor available
        - all constructors are tested to create instance
        - default values (e. g `null`) passed as arguments
        - first successfully tested constructor is used
        - if no instance of a class can be created, object can't be stored

Configuration interface:

    :::java
    // global setting (default: depends on environment)
    CommonConfiguration#callConstructors(true)
    // per class setting (default: depends on environment)
    CommonConfiguration#objectClass(...).callConstructors(true)
    // exceptions for debugging (default: true)
    CommonConfiguration#exceptionsOnNotStorable(true)

- Bypassing Constructors
    - Constructors that cannot handle default values or `null` must be bypassed
    - platform specific mechanism
    - Not all environments support this feature
    - Default setting (if supported by environment)
    - Breaks classes that rely on constructors being executed
- Translators
    - needed if neither Constructors nor Bypassing Constructors can be used
    - if constructor needed to populate transient members
    - if constructor fails when called with default values
    - Interfaces `ObjectTranslator` and `ObjectConstructor`
- Type Handles
    - instead of Translators at lower level
    - type handler registered for class that it handles
    - write to and read from byte-arrays


<!-- End Slides/Notes Week 5 ? -->


<!-- Start Slides/Notes Week 10 -->
# Graph Databases

- Domain specific solution
    - for a group of problems
    - a kind of solution for a kind of problems
- Technology models (describe the world):
    1. Key-Value Map
    2. Relational Model
    3. OO Model
- Mapping between models
- There is no generig model for all domains

## Social Network Analysis
- People are connected to each other
- Networks may be represented as graphs
    - Nodes: peoples
    - Edges: relationships
- [Social Network Analysis](http://www.orgnet.com/sna.html) to gather information

## Graphs
- Nodes and Edges may have attributes
    - Often key-value pairs
- Graph algorithms can compute different values
- Connections vary:
    - Uni- / Bidirectional connections
    - Nodes with single / multiple connections
    - Multiple connections with different attribute
    - Explicit / implicit connections
    - Transient / long lasting connections
    - One-time / repeated connections
        - regular / irregular connections

### Graph Metrics

#### Path Lengths

- [Dunbar's number](https://en.wikipedia.org/wiki/Dunbar%27s_number)
- [Erdős number](https://en.wikipedia.org/wiki/Erd%C5%91s_number)
- [Bacon’s number](https://en.wikipedia.org/wiki/Six_Degrees_of_Kevin_Bacon)
- [Small world phenomenon](https://en.wikipedia.org/wiki/Small-world_experiment)

#### Node Properties

- Degree Centrality
    - The number of direct connections a node has
- Betweenness Centrality (Bridge)
    - A node is *between* two important nodes
    - has great influence what flows in the network
- Closeness Centrality
    - A node has the shortest path to all others
    - good position to monitor information flow in network

#### Network Structure Properties

- Network Centralisation
    - Dominated by one or few nodes
    - (single) point of failure
- Density/Cohesion
    - Proposition of direct connections relative to all possible connections
- Distance (Small World)
    - Minimum numbers of edges needed to connect two particular nodes
- Clustering Coefficients
    - Likelyhood that two associates of a node are also associates to each other
    - 'cliquishness'

### General Model

- Common representation
- Uniform graph representation
    - needed to apply algorithms
- Always *2* core *identities* connected by *action*
- e.g.
    - connect 2 authors that worked on same publication
    - or connect publications that have the same autor

## Graph Database Implementations

- API
- Support for CRUD
- High-level operations for graph traversals
- Somtimes graph algorithms part of DB
- ACID
- Scalable
- Examples:
    - Objectivity InfiniteGraph
    - Neo4j
    - OrientDB

### InfiniteGraph (Objectivity)

- Graph library on top of Objectivity/DB
- Distributed graph DB
- Classes for Vertex and Edge are predefined and persistent capable
    - `BaseVertex`
    - `BaseEdge`
- DB API extended with graph methods
- Traversing/Querying the graph: Navigator Engine
    1. Put the current path from here
    2. Follow path from here
    3. if yes: which path to follow
- Interfaces for Navigator Engine
    - Path Guide (path to go next)
    - Path Qualifier (terminate current path?)
    - Result Qualifier (put path in result set?)
    - Result handler is called after navigation on result set
- Properties of the Navigator Engine
    - not declaritive
    - interfaces to implement
    - some predefined queries available

### Neo4j

- [Open Source DB](https://neo4j.com/) for Java
- Distinction between marking transaction and finishing (committing)
- Only generic node class available
    - Generic Node (`GraphDatabaseService.createNode()`)
    - Generic Edge (`Node.createRelationshipTo(...)`)
    - set properties as key-values (`setProperty(...)`)
- Generic nodes can be integrated into Java classes (different use of nodes)
- Graph Traversal
    - using [fluent interface](https://en.wikipedia.org/wiki/Fluent_interface) (chaining method calls)
    - Provides special methods for
        - `breadthFirst()` or `depthFirst()`
        - `evaluator(Evaluator)`
            - Continue from here?
            - Put node/path in result?
        - `relationships(RelationShipType, Direction)`
    - all these methods return a `TraversalDescription` object, supports chaining
    - evaluator looks at a Path object
        - decides if it should be in the result
        - decides if the traverser should continue actual path
        - Method to be implemented: `Evaluation evaluate(Path path)`
        - return value:
            - `EXCLUDE_AND_CONTINUE`
            - `EXCLUDE_AND_PRUNE`
            - `INCLUDE_AND_CONTINUE`
            - `INCLUDE_AND_PRUNE`
    - Iterator over result set
    - Not declarative

- Graph algorithms
    - find all paths between two nodes
    - [Dijktra-based cheapest path](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
    - Paths with given length
    - Shortest paths
- REST API
    - Management (CRUD) of nodes and edges
        - GET/POST
        - JSON in-/output
    - Graph traversals
    - Graph algorithms
- Query language: Cypher
    - Declarative
    - pattern matching
    - supports update operations
    - ASCII art
    - [try it online](http://console.neo4j.org/)



### Comparison InfiniteGraph and Neo4j

| Infinte Graph (Objectivity)                               | Neo4j                                                                      |
|-----------------------------------------------------------|----------------------------------------------------------------------------|
| NO database orthogonality                                 | partly datatype orthogonality (`RelationshipTypes` need to be implemented) |
| independance (persistence orthogonality)                  | (no) independance (persistence orthogonally)                               |
| Extend `BaseVertex` and `BaseEdge`                        | Only generic nodes and edges available                                     |
| Navigation with implementation of interfaces (Qualifiers) | Navigation with fluent interface (chaining)                                |
| Navigation not declarative                                | Navigation not declarative                                                 |
| Part of Objectivity (object database)                     | Some graph algorithms included                                             |
                                                            | REST API: CRUD, JSON, algorithms                                           |
                                                            | Cyper: ASCII Art, declarative query language                               |


<!-- End Slides/Notes Week 10 -->


<!-- Start Slides/Notes Week 12 -->
# Indexing

Make OODBs faster and more performant

- Compare OOP model to Relational model

Main differences bewteen OOP and Relational model:

1. inheritance (is-a)
2. multitype attributes (sets, collections)
    - First normal form in Relational Databases disallows mutlivalued attribues (collections) in a field
3. dereferencing a path of pointers/references (traversing the object graph)

> OODB systems can be faster when using additional information that a RDBMSs doesn't have

Different approaches to:

- Mapping (ORM)
- Physically represent data differently (eg. Objectivity)
- Use additional (meta-) data but keep the representation of the data
    - secundary datastructures
    - index structures
- Group record: pages, clusters ...


## Type Hierarchy Indexing

### Key- vs Type-Grouping

- Key-Grouping
    - build index along the actual attribute value
    - as $B^+$-trees
    - additional information about typing and subtiping in the leafs
- Type-Grouping
    - index built along typing information
    - values are sencondary datastructure


### Extent and Full Extent

- Extent: all objects of a given class (without subclasses)
- Full Extent: all objects of a given class and it's subclasses


### Single Class Index (SC-Index)

- Index construction for attribute of a type *t*
    - incorporate only direct instances of a particular type in index
    - construct search structure for all types in sub-hierarchy of t
    - search data structres (called *SC-Index components*)
    - Evaluator needs to traverse all components referenced by query
- Usually implemented using $B^+$-trees
- Type-Grouping

> Good for querying full extent

### Class Hierarchy Index (CH-Index)

- One search structure for all objects of all types of indexed hierarchy
- One index on the common attribute for all classes of a iheritance graph
- Leaf node consists of
    - key-value
    - key directory
        - contains an entry for each class that has instances with the key-value in the indexed attribute
        - entry for a class consist of class identifier and offset fo list of OIDs in index record
    - number of elements in list of OIDs (for each class in the inheritance graph)
    - list of OIDs
- Evaluator scans through $B^+$-tree once
    - selects OIDs f types referenced by query
    - discards other OIDs
- Point queries perform good
- Range queries depend on number of referenced types
    - good when queries aim at indexed type and all subtypes
    - bad if only few types of indexed hierarchy hit by query
- Key-grouping structure

> Good for querying extent (not full extent)

### H-Tree

- Set of nested $B^+$-trees
- Combining class hierarchy with SC-Index
- Nesting reflects indexed type hierarchy
    - each H-tree component is nested with H-trees of immediate subtypes
    - H-tree index for attribute of inheritance sub-graph is H-tree hierarchy nested according to supertype-subtype relation
- Avoids full scans of each B-tree component when several types queried
- Single type lookup: don't search nested trees
- Type hierarchy lookup: traverse nested trees

- Type-grouping structure

### Class Division Index (CD-Index)

- Compromise between
    - indexing for each type
    - indexing extent for each type
- Specific family of type sets for indexed hierarchy
- Look at all possible combinations of full extends for all types
- Combine parts of subtype hierarchies to use one index structure (like SC-index)
- Each typeset managed with search data structure
- Parameters *q* and *r* give bounds
    - *q*: number of index structures needed to build a type extent
    - *r*: number of times a type set is managed redundantly or replicated
- Multiple index structures need to be accessed for a querry
    - trade-off between:
        - number of index structures to access for a query
        - number of index structures to maintain
- Type-grouping structure

### Multi-Key Type Index (MT-Index)

- Mutli-Dimensional indexing
- Type information as additional attribute available
- Compromise between
    - type grouping
    - key grouping
- Type membership as additional object attribute
    - symmetrical indexing of object types and attributes
    - indexing of more than one attribute with single search structure
- Linearization
- Key-grouping structure (type is handled as an attribute)

### Overview: Type Hierarchy Indexing

- Classes: `Person :> Student`

|                           |         |                               |
|---------------------------|---------|-------------------------------|
| Full-Extent               | Person  | Rel. DBs, SC-Index, (H-Index) |
| Extent                    | Person  | CH-Index, H-Index             |
| Extent                    | Student | CH-Index, H-Index             |
| comb(Extent, Full-Extent) | ...     | MT-Index, CD-Index, (H-Index) |


| Index Structure      |  Extent          | Full Extent       | Combination (Extent, Full Extent) |
|----------------------|------------------|-------------------|-----------------------------------|
| Relational DBs       |     x            |  Person           |   x                               |
| SC-Index             |     x            |  Person           |   x                               |
| CH-Index             |  Person, Student |   x               |   x                               |
| H-Index              |  Person, Student | (Person)          | ('any')                           |
| CD-Index             |     x            |   x               |  'any'                            |
| MT-Index             |     x            |   x               |  'any'                            |

## Aggregation Path Indexing

- Backward queries
    - without full object tree traverses
- Forward queries
    - without retrieving intermedia objects

### Nested Index (NX)

- Direct association between
    - an *ending* object and
    - corresponding starting objects along a path
- Bypassing intermediate objects
- Only allows backwards traversels of full path
- Equivalent to backward traversal in ASR canonical
- A Nested Index *NX(P)* for path *P* with length *1* is equivalent to a Multi-Index *MX(P)* for the same path
- Updating index structure is expensive

![Nested Index](/images/object_databases/nested_index.png)

### Path Index (PX)

- Records all subpaths leading to an ending object
- Predicates can be evaluated on all classes along the path
- Equivalent to backwards traversal of right-complete ASR
- A Path-Index *PX(P)* for path *P* with length *1* is equivalent to Multi-Index *MX(P)* an a Nested Index *NX(P)* for the same path
- Updating index structure better than with *NX*

![Path Index](/images/object_databases/path_index.png)

### Join-Index (JX)

- Originally for optimization of *joins* in Relational DBs
- Consists of a set of binary join indices (Slides p. 33)

### Multi-Index (MX)

- Like Join-Indexes in Relational DBs
- Divide path (of arbritrary length) into sub-paths
    - sub-paths have length *1*
    - index maintained over sub-paths
- Query evaluation
    - concatenating *n* index edges requires *n* index scans
    - supports backward traversals and queries
    - *no* forward traversals and queries
- Each index enty is represented as a pair
    1. A key-value
    2. set of OIDs of objects holding this key-value (for indexed attribute)
- Updates cheap
- Complex queries expensive (hop over nodes)

![Multi Index](/images/object_databases/multi_index.png)

### Access Support Relations (ASR)

- Given a path create *4* index structures that support all desired queries (Nested Index, Path Index, Multi-Index)
    1. Canonical representation
    2. Full representation
    3. Left representation
    4. Right representation
    - Related to Relational DB Joins: canonical is like regular join in SQL
- ASR Compositions Index Graph
    - Queries that do not traverse the path at either endpoint can't be answered efficiently
    - Aggregation path can be split in sub-paths (partitions)
    - Set of partions: decompositions of an ASR

### Overview: Aggregation Path Indexing

- Nested Index and Path Index implemented using
    - trees or
    - hash tables

## Collection Operations

- For: sets, bags, lists, arrays
- new modelling features, enhanced expressiveness
- increased complexity of indexing and query optimisation
- OQL provides constructors and operators for collections

### Signature Files

- Index construction for a multi-valued property of a type
- Query over multi-valued properties
- Compute signatures for attribute values, elements ...
- Use mathematical operation
    - Super-set, sub-set ...
    - 'actual drop': true positive
    - 'false drop': false positive


<!-- End Slides/Notes Week 12 -->



<!-- Start Slides Week 13 -->

# The OM Data Model

- Extended Entity-Relationship model
- for OOP data management
- special features
    - difference between typing and classification
    - objects: attributes and methods
    - multiple inheritance, multiple instantiation, multiple classification
    - collections as first-class concepts
    - binary associations as first-class concepts
    - constraints for integrity, classification and evolution
    - data definition, manipulation and query language (OML)

## Typing and Classification

| Typing                        | Classification               |
|-------------------------------|------------------------------|
| representation of entities    | roles of entities            |
| defines format of data values | defines semantic groupings as collections of values |
| defines operations            | defines constraits among collection |
| defines inheritance properties |                               |

- better understanding of issues
    - important to recognise the two concepts
- Reduces complexity of type graphs
    - no need to introduce subtypes to represent each classification
- Rich classification structures
- Support for relationships between objects
    - accociation over collections instead embedded in objects
- Integration of:
    - Database
    - Programming Languages
- Collections
    - semantic groupings of objects
- Member types of collections
    - constrain membership in a collection
- Object evolution
    - objects can gain/loose roles by being added or deleted form collections
    - type change not always required (???) <!-- slides week 13 p.7 -->


 <!-- TODO slides week 13 p.7 -->
