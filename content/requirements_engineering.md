Title: Requirements Engineering
Category: Programming
Date: 2016-04-28
Modified: 2018-06-05


> This article is work in progress.


- Conceptual Design => Technical Design => Implementation
- Actors, Personas
- Mock-ups (for non-engineer)
    - Paper Mock-ups
    - Tools for Mock-ups (functional)
- Rapid Prototype
- Architecture
    1. Geographic Architecture: Local, Client-Server, Cloud...
    2. Technological Architecture: SQL, JSON, XML, Programming Language
    3. Logical (Business) Architecture: Semantics, Implementation that satisfies the Requirements
- Functional and Non-Functional Requirements
    - Functional Requirements: What the Software needs to do
    - Non-Functional Requirements: Quality criteria: Security, extensibility, scalibility...
- Logical Architecture
    - Read the Specification: Nouns => Actors/Entities, Verbs => Actions/Functionality/Behavior
    - Entities + Behavior => Data Model
    - Methods: input -> output (table form)
    - Entities: data -> creator
    - Components (Bottom-Top):
        1. Create Data Model
        2. Build Application
- API driven development
- Conceptual data model:
    - first high-level, go in detail later
    - describe reality => Model
        - OOP
        - SQL
        - ...
        - Impedance mismatch
- Relationships (pointers/references in most languages)
    - mostly more complex and with semantics
- Know the Problem! Don't start before you really know the problem!
    - be convinced about solution
- Describe application domain (reality)
- Modeling Language (programming languages...) needed to capture details of reality
    - e.g Java (and other OOP languages) can not properly model relationships
- Impedance mismatch
    - if two connected models are not the same
    - OOP <-> reality
    - OOP <-> relational-dbs (SQL)
- Relational DB:
    - Table: Relation (similar to class)
    - Columns: Relation attributes (similar to class attributes)
    - Keys: Pointers (relationships)
- Start with simple things => improve
    - agile


- List available operations with input and output (e.g use Fitnesse...)

Example:

| Operation  | in                | out             |
|------------|-------------------|-----------------|
| create     | message, location | -               |
| get        | location          | set of messages |

- Sentences (e.g. use cases):
    - Nouns: Objects (classes)
    - Verbs: Methods


- Software objects
    - requirements specifications, designs, documentations, program code, test plans, test cases, user manuals, project plans, ...
    - object identification
    - object granularity (module:declarations and statements, documentation:chapters and sections)
    - object representation (files, graph, ...)
- Relationships
    - composition relationships: tree with root representing product
    - dependency relationships
