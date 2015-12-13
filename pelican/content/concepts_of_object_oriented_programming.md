Title: Concepts of Object Oriented Programming
Category: Programming
Tags: C++, Python, OOP, ETH
Date: 2015-07-27
Modified: 2015-07-27

[TOC]

# Core Requirements to OOP Languages

- Highly dynamic execution model
- Cooperating program parts with well defined interfaces
- Classification (hierarchy) and specialisation (reuse)
- Quality/Correctness

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

> Objects are different form values!

Values don't have the above properties.

## Interfaces and Encapsulation

- Objects have well-defined interfaces
    - Publicly accessible fields
    - Publicly accessible methods
- Implementation is hidden behind interface
    - Encapsulation
    - Information hiding
- Interfaces are the basis for describing behavior


## Classification and Polymorphism

- Classification: Hierarchical structuring of objects ('is-a'-Relation)
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
- C++ Templates, Generics (Java, C#)

#### Method Overloading

- Ad-Hoc Polymorphism
- Overloading: Methods with same name but different arguments 


### Spezialization

- Start from general objects/types
- Extend these objecs (fields and methods)
- Behaviour of specialized objects need to be compliant to more general objects! (Substitution Principle)
- Progam parts that work for the genral objects work also for specialized objects
- Methods can be *overridden*

# Types and Subtyping

## Types

Type systems can be analyzed in three dimensions:

1. Weak and Strong Type Systems
2. Nominal and Structural Types
3. Static and Dynamic Type Checking

Definition:

> A type is a set of values sharing some properties. A value *v* has type *T* if *v* is an element of *T*.

*T* is a set that contains all possible values *v*.

### Weak and Strong Type Systems

How strongly or weakly typed a language is concerns casting (implicit and explicit).
It's mainly used to compare languages to each other about the possible castings, type safety and information loss.

#### Untyped Languages

- Not classifying values into types, just bit patterns
- i.e. Assembler

#### Weakly Typed Languages

- Classifying values into types
- No strict enforcement of restrictions, i.e Multiplying two pointers is possible
- i.e. C, C++

#### Strongly Typed Languages

- Classify values into types
- Enforcing that all operations are applied to values of appropriate type
- Strongly-typed languages prevent certain erroneous or undesirable program behavior
- i.e. Java, Python, Scala, Smalltalk, Eiffel, C#
- Most Dynamic Languages (i.e Python, JavaScript) are Strongly Typed

### Nominal and Structural Types

#### Nominal Types

- Based on type names
- i.e. C++, Java, Eiffel, Scala

#### Structural Types

- Based on available methods and fields
- i.e. Python, Ruby, Smalltals


### Type Checking

Type checking prevents certain errors in programm.

When happens the type checking?

- Static: Compile time
- Dynamic: Run time

#### Static Type Checking

- Types of variables and methods are declared explicitly or inferred
- Types of expressions can be derived from the types of their constituents
- Type rules are used at *compile time* to check whether a program is correctly typed

> A programming language is called type-safe if its design prevents type errors

Pros:

- Static safety
- Readability (type annotations are a good documentation)
- Efficiency

#### Dynamic Type Checking

- Variables, methods, and expressions of a program are typically not typed (types not declared)
- Every object and value has a type
- *Run-time system checks* that operations are applied to expected arguments
- Also static languages need to performe some checks dynamically at run-time (i.e type-casting)
- Dynamic languages are usually more expressive (no type annotations)

Pros:

- Expressiveness
- Low overhead (no type annotations)
- Much simpler

### Overview of Type Systems in OO-Languages

|            | Static                              | Dynamic                                        |
|------------|-------------------------------------|------------------------------------------------|
| Nominal    | C++, Java, Eiffel, Scala, C#        | certain features of statically-typed languages |
| Structural | Research languages: O'Caml, Moby... | Python, JavaScript, Ruby, Smalltalk            |

Dynamic and Structural is often called "duck typing".


## Subtyping

> Substitution principle Objects of subtypes can be used wherever objects of supertypes are expected

- Syntactic classification: Subtypes understand *at least the messages* of their supertypes.
    - Nominal languages: Subtype has a *wider* (or same) interface as supertype
    - Overriding methods must not be less accessible
- Semantic classification: Subtypes provide *at least the behaviour* of their supertypes.

A type is a *set* of values. *Subtype relation* corresponds to *subset relation*.

![Subtyping and Sets](/images/coop_subtyping_and_sets.svg)


- In *nominal* programming languages the *programmer* decides about subtype relation
- In *structural* programming languages the *type checker* decides about subtype relation



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
| C++, Java, Scala, D...  | Nonvariant     | Covariant    |
| Eiffel                  | Covariant      | Covariant    |
| C#                      | Nonvariant     | Nonvariant   |


<!-- End of Notes Week 2 -->

In Java and C# arrays are covariant!


### Behavioral Subtyping (Contracts)

What are the *properties* shared by the values of a type?

*Properties* should also include the behavior of the object.
This is expressed as interface specifications (contracts)

- Precondition: Have to hold before the method is executed
- Postcondition: Have to hold after the method has terminated
- Old-expressons: Can be used to refer to prestate values from the postcondition
- Invariant: Have to hold in all states in which an object can be accessed by other objects

#### Subtyping and Contracs

- Subtypes must fulfill contracts of supertypes
- Overriding method of subtypes may have *weaker preconditions* than the supertype method
- Overriding method of subtypes may have *stronger postconditions* than the supertype method
- Subtypes may have *stronger invariants* than supertypes
- Subtypes may have *stronger history constrains* than supertype

<!-- Beginning of Notes Week 4 -->

#### Specification Inheritance (Inherit Contracts from Subtypes)

- Subtype needs to satisfy the contract of the supertype (inheriting contracts)
- *Invariant* inheritance: Conjunction (AND) of own contract and contracts of all supertypes
- *History* inheritance: same as for *invariants*
- *Precondition* inheritance: Disjunctions (OR) of own contract and contracts of all supertypes

$$PreEff_{S.m} = Pre_{S.m} || Pre_{T.m} || Pre_{T’.m} || ...$$

- *Postcondition* inheritance: Satisfy *each* postcondition for which the corresponding precondition holds
    - Precondition needs to be evaluated with *old* state

$$PostEff_{S.m} = (old(Pre_{S.m}) => Post_{S.m}) \&\& (old(Pre_{T.m}) => Post_{T.m}) \&\& ...$$


### Types as Contracts

Types can be seen as a kind of contracts.

Overriding Methods must:

| Behavioral Subtyping (contracts) | Nominal/Structural Subtyping (variance) |
|----------------------------------|-----------------------------------------|
| Weaker Preconditions             | Covariant Parameters                    |
| Stronger Postconditions          | Covariant Results                       |
| Stronger Invariants              | Invariant fields                        |

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
TODO

...

<!-- Beginning of Slides 4.2 Parametric Polymorphism p. 61 (29) -->
<!-- Beginning of Notes Week 7 p. 8 -->

# Parametric Polymorphism

## Java, C#, ...

- Subtype relation not always desiderable
- Generics (Java, Scala, C#)
- Upper bounds (`extends`): Subtype of upper bound required
    - Guarantees that a specific method can be called
    - Modular check of implementation of Generic code
- Generics (in Java, C#) are non-variant
    - Covariance is unsafe when client **writes** to generic type argument ('input')
        - Mutable fields
        - Method arguments
    - Contravariance is unsafe when client **reads** from generic type argument ('output')
        - Fields
        - Method results
    - Non-variance is sometimes too restrictive
- Scala allows variance-annotation
    - Positive positions ('output', *covariant*): `+`
        - Result type
        - Type of immutable fields
    - Negative positions ('input', *contravariant*): `-`
        - Parameter type
    - C# uses keywords `in` and `out`

<!-- End of Notes Week 7 -->

<!-- Beginning of Notes Week 8 -->


- Methods can also have type arguments (i.e `static <T> void printAll(Collection<T> c) {...}`)

### Wildcards

Wildcards can be seen as an [Existential Type](https://en.wikipedia.org/wiki/Type_system#Existential_types):

    :::java
    static void printAll(Collection<?> c) {
        for (Object e : c) {System.out.println(e);
        }
    }

> There exits a type argument `T` such that `c` has type `collection<T>`

- Wildcards can have a *upper bounds* and *lower bounds* (correspond to *co- and contravariance*)
    - upper bound for *reading* and method invocation: `extends`
    - lower bound *writing*: `super`

- lower bounds are not supported on type parameters (only on wildcards) in Java

Instantiation of wildcards can change over time:

    :::java
    class Wrapper {
        Cell<?> data;
    }

    // client code:
    Wrapper w = new Wrapper();
    w.data = new Cell<String>(); // w.data has type Cell<String>
    w.data = new Call<Object>(); // now w.data has type Cell<Object>!

- Generics with wildcards (and possibly with bounds) have a subtype relation if the type parameters have a relation
    - See [Java documentation](https://docs.oracle.com/javase/tutorial/java/generics/subtyping.html)

- Type Erasure (Java, Scala)
    - For backwards compatibility (in JVM)
    - Generic type information is erased in compiler (not available in bytecode anymore)
        - `C<T>` is translated to `C`
        - `T` is translated to its *upper bound*
        - Casts are added wher nessecary (i.e reading values from generic type)
        - Only one classfile and one class object for all instantiations of a generic class
        - Run-time type information (`instanceof`, `List<String>.class`) is *missing*
        - Arrays of generic types are *not possible* (`new List<String>[10]`)
        - Static fields are shared by all instantiations of a generic class
        - Lower bounds for type parameters would require support in JVM (bytecode verification)
- No Type Erasure in C#
    - Run-type type information is available
    - Arrays of generic types are possible


## C++ Templates

- Classes and Methods (Functions) can be parametrized
- Also value types can be used as templates paramters
- Instantiation generates (internally) a new class
- Type checking is done on of the generated class, not on the template (different to Java, C#, ...)
    - Type check only of the parts of code that are used
    - Type errors are not detectes before instantination
    - No bounds needed
- No subtype releation between instantiations of a template
- No run-time support needed (templates are a compilation concept)
- Templates can be specialized
- Improvement for feature C++ standard (C++17): [Concepts Lite](https://en.wikipedia.org/wiki/Concepts_%28C%2B%2B%29)
    - *Structural* upper bounds (C++ type system is nominal)
- [Template Meta Programming](https://en.wikipedia.org/wiki/Template_metaprogramming)
    - Is touring-complete!

<!-- End of Slides 4.2 -->
<!-- End of Notes Week 8 -->


# Information Hiding and Encapsulation
<!-- Beginning of Slides 5 -->
<!-- Beginning of Notes Week 9 -->

In the literature Information Hiding and Encapsulation are often used synonymously.
But they are distinct but related.

## Information Hiding

> Information hiding is used to reduce dependencies between modules. The client is
> provided only the information needed.

- Concerns static parts of program (code)
- Syntactic and semantic: Contracts are part of the exported interfaces
- Reduce dependencies
    - Classes can be studied in isolation
    - Classes only interact in well-defined ways

### Client Interface of a Class

- Class Name
- Type parameters (Generics) and their bounds
- Super-interfaces
- Signatures of exported methonds and fields
- Client interface of *direct* superclass

### Other Interfaces

- Subclass interface (i.e `protected`)
- Friend interface (`friend` in C++, default access in Java)
- Inner classes
- ...

### Java Access Modifiers

- `public`: client interface
- `protected`: subclass and *friend* interface
- default access: friend interface
- `private`: implementation


| Modifier    | Class | Package | Subclass | World |
|-------------|-------|---------|----------|-------|
| `public`    | Yes   | Yes     | Yes      | Yes   |
| `protected` | Yes   | Yes     | Yes      | No    |
| '*default*' | Yes   | Yes     | No       | No    |
| `private`   | Yes   | No      | No       | No    |

### Safe Changes

- Renaming of hidden elements
- Modification of hidden implementation (functionally needs to be preserved)
- Access modifiers specify what classes might be affected by a change

### Exchanging Implementation

- Behaviour needs to be preserved
- Exported fields limit modification
    - Use getters and setters
    - Uniform access (Eiffel, Scala)
- Modification is critical: Fragile baseclass problem!
- Object structures

### Bug: Method Selection in Java

- Bug was present in JSL1. It's fixed now!

- Compile time:
    1. Determin static declaration (find the method in the receiver class, method can be inherited)
    2. Check accessibility
    3. Determine invocation mode (virtual / non-virtual)
- At run-time:
    4. Compute receiver reference
    5. Locate method to invoke (based on dynamic type of receiver object) that overwrites

- Rules for overriding
    - Access modifier of overriding method must provide at least as much access as the overridden method
    - default access &rarr; `protected` &rarr; `public`
    - `private` methods can't be overridden: Hiding

## Encapsulation

> Encapsulation is used to guarantee that data and structural consistency by capsules with well defined interfaces.

- Data consistency: i.e value is not negatice, ...
- Structural consistency: i.e tree is balanced, list is doubly linked, ...

- Concerns dynamic parts of code (execution)
- Context of a module can be changed but module behaves same

### Levels of Encapsulation

Capsules can be:

- Individual objects
- Object structures: i.e doubly-linked list
- A class (with all its objects): i.e all threads in Java
- All classes of a subtype hierarchy
- A package with all of its classes and their objects)
- Several packages

Internal representation of capsule that needs to be proteced:

- invariant
- or history constraint

Hiding fields are useful for:

- Information Hiding
- Encapsulation

### Achieving Consistency of Objects

1. Apply information hiding wherever possible
2. Make consistency criteria explicit
    - Contracts
    - Informal documentation
3. Check interfaces (also subclass methods, i.e `protected`)
    - Make sure they preserve documented consistency criteria


<!-- End of Slides 5 -->

# Object Structures

<!-- Beginnning of Slides 6 -->

> An object structure is a set of objects that are connected via references.

## Examples

- Array-Based Lists
- Doubly-Linked Lists (`java.util`)

## Aliasing

- A reference to memory location
     - Aliasing occures if more than one variable allows access to the same memory location

- Static/Dynamic Aliases
    - Static alias: all involved variables are in the heap
    - Dynamic aliasing: some involved variables are stack-allocated (others can be in the heap)

### Intended Aliasing

- Efficiency
    - Objects need not to be copied, when passed or modified
- Sharing
    - Share the same object between different places
    - Consequence of objects identity

### Unintended Aliasing

#### Capturing

- Get a reference from outside and store it
    - Often in constructors that take reference arguments

#### Leaking

- Passing a reference to an (internal) data structure to the outside

- More frequent then capturing

#### Problems with Aliasing

- Aliases can be used to by-pass interface
- Interfaces and contracts remains unchanged but observable behaviour can change!

#### Consistency of Object Structures

- Consistency of object structures debend on several fields (not only one)
- Checking invariance on beginning and end of method is not enough
    - State can be changed in between by an alias

#### Other Problems with Aliasing

- Synchronization in concurrent programs
    - Lock protects data structure
    - Locking a reference dosen't lock aliases
- Distributed programming
    - i.e Remote Method Invocation
    - References (intended aliases) are lost
- Optimizations
    - i.e Inlining is not possible for aliased objects

### Alias Control in Java

#### `LinkedList`:

- All fields are `private`
- `Entry` is *private inner class* of `LinkedList`
    - References are not passed out
    - Subclasses cannot manipulate or leak `Entry` objects
- `ListItr` is *private inner class* of `LinkedList`
    - Interface `ListIterator` provides controlled access to `ListItr` objects
    - `ListItr`objects are passed out in a controlled way
    - Subclasses cannot manipulate or lead `ListItr` objects
- Subclassing is restricted!

#### `String`

- All fields are `private`
- References to internal char-array are not passed out
- Subclassing is prohibited (`final`)


<!-- End Notes Week 9 -->

## Readonly Types

<!-- Beginning of Notes Week 10 -->

- Restrict access to shared objects
- Common: grant read-only access
- Cloning can prevent aliasing in some cases (but is inefficient)
- The reference can be marked as readonly
    - The object itself is not readonly

### Requirements for Readonly Access

- Mutable objects
    - Only some clients can mutate object
    - Access restrictions apply to references (not whole objects)
- Prevent field updates, calls of mutating objects
- Transitivity

- Possible solution: wrap objects in readonly objects or use a readonly interface
    - Not practical
    - Not safe: no compiler checks, readwrite alias can still occur, ...

> Readonly access in C++ (`const`) is not transitive

### Pure Methods

Pure methods are side-effect free.

- Must not contain field updates
- Must not invoke non-pure methods
- Must not create objects (on heap)
- Can be only overridden by pure methods
- Stronger constraints than const methods in C++

Pure methods are very restrictive:

1. Not possible to get an iterator (which is created on heap) to iterate over collection
2. Caches can't be implemented
3. Lazy initialization is not possible

### Readwrite and Readonly Types

- Concerns only reference type (object type is always mutable)
- Readwrite type: `T`
- Readonly type: `readonly T`
- Subtype relation: `T` <: `readonly T`
- Not same as relation between mutable and non-mutable types (which have no relation)
- Readonly is transitive

### Transitivity of Readonly Types

The type of

- Field access
- Array access
- Method invocation

is determined by type combinator: &#9658;

| &#9658;| rw T | ro T |
|--------|------|------|
| rw S   | rw T | ro T |
| ro S   | ro T | ro T |


#### Type Rules: Readonly Access

Readonly types can't be receiver of:

- Field update
- Array update
- Invocation of pure method

Readonly types must not be cast to readwrite types.

- Leaking can be prevented
- Capturing can still occure


## Ownership Types

Prevents capturing.

### Object Topologies

Distinguish *internal* references from other references.

#### Roles in Object Structures

- Interface objects: used to access the structure
- Internal representation: must not be exposed to outside (clients)
- *Arguments* of the object structure: must not be modified by the structure (i.e entries in a list)

#### Ownership Model

- Each object has one (or zero) owner
- An object belongs to the internal representation of the owner
- Ownership relation is acyclic (forrest of ownership trees)
- Context: all objects that have the same owner
- Ownership relation is *not* transitive

Type Invariant:
 
> The *static* ownership information (declared in code) reflects the *run-time* ownership of the referenced object


#### Ownership Types

- **peer**: in the same context, same owner as owner of *this*
- **rep**: references to objects owned by *this* (in the context of *this*)
- **any**: in any context (I don't care)
- **lost**: specific owner but not known (I care but don't know)
- **self**: only for the `this` literal (special because ownership relative to `this`)

**lost** and **self** are internal (hidden) type modifiers. No keywords.

Traversing hierarchy:

- **rep**: go down in herarchy
- **peer**: go across on same level in hierarchy
- **any**: jump somewhere, could even be outside of hierarchy


#### Type Safety

- RTTI contains:
    - The class of each object
    - The *owner* of *each object*
- Type invariant:
    - static ownership reflects run-time owner

> *any* and *lost* are extistential types.

    :::java
    any T o;

There exitst an owner such that o ist an istance of T and has that owner.

#### Subtyp Relation between Ownership Types

**rep** types and **peer** types are subtypes of corresponsing **any** types.

- **rep** T <: **any** T
- **peer** T <: **any** T

Casts:

- **any** can be cast to **rep** or **peer** (with runtime checks)

#### Viewpoint Adaption

- Ownership relation is expressed relative to *this*.
- If *this* object (viewpoint) changes, the ownership changes.
- When creating an object the ownership has to be set
    - `new rep Entry()`
    - `new peer Entry()`
    - **any** is not allowed for `new`
    - Ownership can't be changed later

| &#9658; | peer T | rep T  | any T |
|---------|--------|--------|-------|
| peer S  | peer T | lost T | any T |
| rep S   | rep T  | lost T | any T |
| any S   | lost T | lost T | any T |
| lost S  | lost T | lost T | any T |
| self S  | peer T | rep T  | any T |


![Ownership Types Hierarchy](/images/coop_ownership_types_hierarchy.svg)

#### Field Access and Method Invocation (Type Rules)

$\tau(a)$: Type of a

Field **Read** or Method **Parameters**:

    :::java
    v = e.f;

Is correctly typed if:

$$\tau(v) :> \tau(e) \blacktriangleright \tau(f)$$

Field **Write** or Method **Result**:

    :::java
    e.f = v;

$$\tau(e) \blacktriangleright \tau(f) :> \tau(v)$$

And

$$\tau(e) \blacktriangleright \tau(f)$$

is **not lost**.


#### Aliasing

- **rep**: internal representation
    - no unwanted sharing
    - leaking as **rep**: viewpoint-adaptation in client gets **lost**
    - method argument **rep**
    - capturing as **rep**: gets **lost**, can't assign to **lost**

Example:

    :::java
    class Person {
      private rep Address addr; // part of internal representation
      public rep Address getAddr() {
        return addr; // clients get lost-reference
      }
      public void setAddr(rep Address a) {
        addr = a; // cannot be called by clients (lost) only by this bject
      }
      public void setAddr(any Address a) {
        addr = new rep Address(a); // cloning necessary, can't assign any to rep
      }
    }

<!-- End of Notes Week 10 -->


<!-- Beginning of Notes Week 11 -->

## Owner-as-Modifier

- Readonly Typesystem: leaking is safe (only readonly leaking)
- Ownership Typesystem: capturing is safe (declaring internal references as **rep**)
    - leaking can happen only as **any** or **lost**
- Combining both Typesystem

- **any** and **lost**: Readonly

Additional enforced rules:

- Field write `e.f = v;` is valid *only* if $\tau(e)$ is **self**, **peer** or **rep**
- Method call `e.m(...);` is valid *only* if $\tau(e)$ is **self**, **peer** or **rep**, or called method is **pure**

> A method can modify directly at most all the objects that have the same owner as `this`. Everything further down in the hierarchy can only be changed indirectly (via method calls).

- When debugging: if an object changes the changing method is going to be on the call stack
    - Changing methods need to go through all the owners transitively
    - Owner is like a *gate keeper* (interface object)

- Stronger concept for encapsulation than private-protected-public

- leaking only happens as readonly ('something' &#9658; **rep**: **lost**)
- Standard (Java): default modifier would be **peer**, flat datastructures
- 'shared ownership' is not possible. i.e List owns nodes and modifying Iterator would need readwrite access to nodes.
    - List would need
- The system can be combined with Generics: `rep List<peer Address>`
- Also possible: merge *entire contexts* to new owner. i.e concat two lists.

### Achievements

- Encapsulate whole object structures
- Can not be violated
- Subclassing is no restriction
- Invariants of object *o* can depend on:
    - Encapsulated fields of *o* (as usual)
    - Fields of objects transitively owned by *o*

<!-- End of Slides 6 -->

<!-- Beginning of Slides 7 -->

# Initialization and Null-References

- Main Usages of Null-References
    - Terminate recursion, list, ...
    - Initialization (i.e lazy initialization)
    - 'Result not found' as a return value of a function (absence of an object)
- Most (80%) of all variables in an OOP programm are *non-null* after initalization
- Real need for null value is rare
- Theoretical type system:
    - Non-null tye: `T!` (references to `T`-Object)
    - Possibly-null type: `T?` (references to `T`-Object plus **null**)
    - Subtype relations (S <: T)
        - S! <: T!
        - S? <: T?
        - T! <: T?
        - Dereferencing only possible with non-null type (`T!`)
        - Possible casts:
            - Implicit: From non-null to possibly-null (`T! nn = ...; T? pn = nn;`)
            - Downcasts (explicit) are possible but need *run-time* checks (`T? pn = ...; T! nn = (T!)pn;` Shortcut for `(T!)`: `(!)`)
            - Additional type rules (compared to Java): Expressions whose value gets dereferenced need *non-null* type
                - Receiver of: field access, array access, method call
                - Expressions of a `throw` statement
            - Dataflow Analysis
                - Check if a value at a given position in code can or can't be *null*
                - Tracks values of local variables but not of objects on the *heap*
                    - Tracking heap locations is non-moduler
                    - Other threads could modify heap locations

## Object Initialization

- All fields are initialized to null (Java, C#, ...)
- Invariant of non-null types is violated at beginning of constructor (it's initialized to `null` by default)
    - Make sure that all non-null fields are initialized when constructor terminates
        - Similar to *Definite Assignment Rule* that check that local variables are assigned before first use (Java, C#)
        - Needes checks:
            - Dereferces
            - non-null fields have non-null types
            - non-null arguments are passed non-null method parameters
        - Not possible to check for all cases: *escaping the constructor*
            - The simple *Definite Assignement Rule* is only sound if *partly-initialized object do not escape* from constructor
            - Overly restrictive: on *partly-initialzed objects*
                - Dont call methods
                - Don't pass as argument to methods
                - Dont's store in fields or an array
        - Better type-system: track initialization (construction types)
            - Initialization Phases (3 types per class/interface)
                - *free type*: objects under construction (free to violate invariants, free to have null in non-null variables)
                - *committed type*: object construction is completed (type of object is chaged at run-time when object is fully constructed)
                - *unclassified type*: super-type of *free type* and *committed type*

Type Invariant:

> An object is initialized if all fields have non-null values (transitively).

There could also be other invariants that have to hold after object is initialized, but can be broken before the object is fully initialized.

<!-- End Notes Week 11 -->

<!-- Beginning Notes Week 12 -->

## Type Rules

- Most type rules of Java remain unchanged
- Additional requirement: dereferencing needs a non-null type
    - Receiver of field access
    - Receiver of array access
    - Receiver of method call
    - Expression of a `throw` statement
- Dereferencing of a non-null type can be checked statically (compile time)
- Escaping constructor is an issue
- Combining non-null type system with construction types
    - 6 types

|              | non-null  | possibly-null |
|--------------|-----------|---------------|
| comitted     | `T!`      | `T?`          |
| free         | `free T!` | `free T?`     |
| unclassified | `unc T!`  | `unc T?`      |

No downcasts from unclassified to free or committed (no reasonable run-time checks).

## Local Initialization

- An object is locally initialized: all non-null fields have non-null values
- Static type *committed*: locally initialized at run-time

Field access:

    :::java
    e.f

| Field access |  f: `!` | f: `?` |
|--------------|---------|--------|
| e: `commited`|   `!`   |  `?`   |
| e: `free`    |   `?`   |  `?`   |
| e: `unc`     |   `?`   |  `?`   |

## Transitive Initialization

- *Committed* has to be transitive
- An object is *transitively initialized* if all reachable objecs are *localy initialized*
- static type *committed*: transitively initialized at run-time

## Cyclic Structures

- In initialization code (i.e constructor) it's allowed to assign *committed* types to *free* types

## Type Rules

- Field declaration has no consturction-type modifier
    - non-null (`!`) or possibly-null (`?`) modifiers are possible
    - It's determined if it's *free* or *committed* when dereferencing (`e.f`)
    - Field declaration is the only place in a programm that has not construction-type modifier
- *committed* is transitive!
- It's not allowed to have a *committed* and a *free* reference to the same object (no cross-type aliases)
    - The *free* reference could assign a pointer in the object to an uninitialized field
- It's critical when an reference changes from *free* to *committed*

### Field Write

- A field write `a.f = b` is well-typed if
    - `a` and `b` are well-typed
    - `a`'s type is a non-null type (`!`)
    - `b`'s class and non-null type conforms to `a.f`
    - **`a`'s type is *free* or `b`'s type is *committed* **

| type of `a` \ type of `b` | committed | free     | unc      |
|---------------------------|-----------|----------|----------|
| committed                 | &#10003;  | &#10008; | &#10008; |
| free                      | &#10003;  | &#10003; | &#10003; |
| unc                       | &#10003;  | &#10008; | &#10008; |

### Field Read

- A field read `e.f`is well-typed if:
    - `e` is well-typed
    - `e`'s type is a non-null type (`!`)
    - Field (`f`) has no construction-type modifier

The type of `e.f` is:

| type of e \ type of f | `T!`     | `T?`     |
|-----------------------|----------|----------|
| `S!`                  |  `T!`    | `T?`     |
| `free S!`             | `unc T?` | `unc T?` |
| `unc S!`              | `unc T?` | `unc T?` |

### Consturctors

- Constructor signatures: each parameter has declared construction-type (default: *committed*) and null-ness type
- `this` in cunstruction has implicitly: *free non-null*
- Definite assignment check for complete constructor
- Constructors are *free* by default

### Method Calls

- Method signatures: each parameter has declared construction-type (and null-ness type)
- Method signatures can contain construction-type for `this`

Construction-type for `this`:

    :::java
    String! free getId(String! n) {
      return ...;
    }

- Overriding requires usual co- and contravariant rules
    - The receiver (`this`) counts as parameter

### Object Construction

- At the end of a constructor the object is not nessecary fully initialized (i.e constructors of deriving classes are not run yet)
- End of a `new` expression: constructed object might not yet be fully constructed
- `new` expressions can have only references to committed objects outside of the `new` expression
    - committed reference to the `new` expression is not possible
        - `new` not yet finished (not *committed*, *free*)
        - But committed objects can't have pointers to *free*
- Nested `new` expression:
  - if the 'inner' `new` expression is fully (transitively) initialized reference *to* and *from* the outside
  - the 'outer' `new` expression can point to the 'inner' `new` expression

#### `new` Expression

> After 'outer' `new` expression (only committed arguments) finishes all 'inner' `new` expressions have references to locally initialized objects.
> All references inside the 'outer' `new` expression point to transitively initialized objects.

- The type of a `new` expression is *committed* if the static types of all arguments of the constuctor are *committed*
    - Otherwise it's *free*
    - It's not relevant what the declared types of the constructor arguments are! It depends on the `new` expression
- It's almost not possible to create uninitialized objects


### Lazy Initialization

- Access lazy initialized field always through getter method

i.e

    :::java
    class Demo {
      private Vector? data; // possibly-null
      public Vector! getData() { // getter guarantees for non-null
        Vectror? d = data; // needed for data flow analysis
        if (d == null) {
          d = new Vector(); data = d;
        }
        return d;
      }
    }


## Arrays

    :::java
    // Elements
    //    |
    //    v
    Person! []! a; // Non-null array with non-null elements
    Person? []! b; // Non-null array with possibly-null elements
    Person! []? c; // Possibly-null array with non-null elements
    Person? []? d; // Possibly-null array with possibly-null elements (default in Java)
    //        ^
    //        |
    //      Array

- Arrays have no constructors
- Problem: Array initialization is often done with loops
    - Definite assignment cannot be checked by compiler
- Possible solutions:
    - Array initializers (`String! []! s = {"Array", "of", "non-null", "Strings"};`)
    - Eiffel: pre-filling array (default objects not better than `null`)
    - Run time assert provided by programmer (Spec#)
        - `NonNullType.AssertInitialized(arr);` (run time assert function)
        - Only committed elements can be stored in array
        - Data flow analysis knows semantic of run time assert function
        - Run time assert function changes type from **free** to **committed**

## Summary

- Can be combined with Generics
- Invariant: non-nullness
- Avoid calling virtual methods on this in uninitialized objects (constructors, init methods)
- Don't let escape uninitialized objects
- At end of constructor: object might not yet be constructed (i.e subclass constructors)

<!-- End of Notes Week 12 -->

<!-- Beginning of Notes Week 13 -->

<!-- Slides 7.3 p. 194 (~53)
## Initialization of Global Data  -->


