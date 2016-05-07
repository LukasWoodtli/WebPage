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

# CRUD and ACID

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
| Peristence Depth                      | persistence by reachability                      |              |         |              |
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

# Object-Oriented Databases: Object Database Manifesto

- Avoid impedance mismatch
- Provide uniform datamodel
- Combine features of
    - OOP
    - Database Management Systems

- The object-oriented database manifesto
    - 13 mandatory features
    - 5 optional characteristics
    - 4 open choices
    - several important topics not addressed

- Object-oriented systems
    - 1\. Complex objects
    - 2\. Object identity
    - 3\. Encapsulation
    - 4\. Types and classes
    - 5\. Type and class hierarchies
    - 6\. Overriding, overloading and late binding 7. Computational completeness
    - 8\. Extensibility

- Database management systems
    - 9\. Persistence
    - 10\. Efficiency
    - 11\. Concurrency
    - 12\. Reliability
    - 13\. Declarative query language

## Objects

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
- Tuples: entities and their attributes
- Sets: collections of entities
- Lists: order

- Constructor orthogonality
    - supports arbitrary nesting such as
        - sets of sets
        - set of records
        - records containing records
        - ...
    - In contrast, relational databases only support
        - sets of records (relation with tuples) and
        - tuples containing atomic values
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
    - query optimisation


- Orthogonality
    - Persistance applicable to all objects of any type
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
    - possibility for query optimisation
    - Application independent
    - work on any possible database
    - no need for additional methods on user-defined types

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
    - operations are executed transactional
    - transaction is started when object container is opened
    - after commit/rollback next transaction is started automatically
- Manages link between stored and instantiated objects
    - object indentities
    - loading, updating, unloading

## Storing Objects

- Store objects with method `ObjectContainer.store(...)`
- Arbitrary complex objects can be stored
- Persistance by reachability

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
        - query API based on query grah
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
    - complex object implementation becomes *db4o dependant*

## Transparent Persistence

- Persistance should be transparent to application logic
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
    - filed values (objects) are loaded in memory to a certain depth when query retrieves objects
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
    - optimise query evaluation
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
    - decreased storage, update und delete performance
- Set by configuration or annotation (`@indexed`)

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
    - disable instantiation tests of persistance classes at start-up
- Query evaluation
    - set field indexes on most used objects to improve searches
    - optimise native queries

## Distribution and Replication

- Embedded mode
    - DB accessed by clients in same *JVM*
    - direct file acces: 1 user and 1 thread at a time
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
            - Changes synchronised after transaction
            - operation based
            - changes replicated immediately
            - Single object replication with `ReplicationSession`
        - Merge Replication
            - Changes from clients merged to central server
            - Other clients updated to reflect changes
            - Transactionally of on a periodic basis
            - Typically if subscribers are occasionaly offline
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
        - `ReplicationSession.replicate(object)` newer object transfered to DB
        - Object granularity

<!-- 07-0-db4o-part-2.pdf p. 20
  ## Callbakcs -->




