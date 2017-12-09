Title: Modern C++ Design 
Date: 2017-02-03
Category: Programming
Tags: C++

Part I. Techniques
==================

Policy-Based Class Design
-------------------------

### The Benefit of Templates
*"Templates are a good candidate for coping with combinatorial behaviors because they generate code at compile time based on the types (and/or constant values) provided by the user.
Class templates are customizable in ways not supported by regular classes."*

*"Furthermore, for class templates you can use partial template specialization [...]. Partial template specialization gives you the ability to specialize a class template for only some of its arguments."*

*"[...] several problems that are not self-evident:*

1. *You cannot specialize structure. Using templates alone, you cannot specialize the structure of a class (its data members). You can only specialize functions.*
2. *Partial specialization of member functions does not scale. You can specialize any member function of a class template with one template parameter, but you cannot specialize individual member functions for templates with multiple template parameters.*
3. *"The library writer cannot provide multiple default values. At best, a class template implementer can provide a single default implementation for each member function. You cannot provide several defaults for a template member function."*


Member functions can be only fully specialized:

    :::cpp
    template <class T> 
    class Widget { 
        void Fun() { .. generic implementation ... }
    };
    
    // ok: specialization allowed
    template <>
    void Widget<char>::Fun() { ... specialized implementation ... }

Partial specialization is not allowed:

    :::cpp
    template <class T, class U>
    class Gadget {
        void Fun() { .. generic implementation ... } 
    };
    
    // error: member functions can't be specialized partially
    template <class U>
    void Gadget<char, U>::Fun() { ... specialized implementation ... }


### Policies and Policy Classes

*"A **policy** defines a class interface or a class template interface. The interface consists of one or all of the following: inner type definitions, member functions, and member variables."*

*"Policies have much in common with **traits** but differ in that they put less emphasis on type and more emphasis on behavior. Also, policies are reminiscent of the **Strategy design pattern**, with the twist that policies are bound at compilation time."*

*"For a given policy, there can be an unlimited number of implementations. The implementations of a policy are called **policy classes**"*

*"Policy classes are not intended for stand-alone use [...]"*

*"Policies are syntax oriented, not signature oriented."*

*"[A] policy does not specify that [a member function] must be static or virtual—the only requirement is that the class template define a [coresponding (with the expected signature)] member function."*

*"The classes that use one or more policies are called **hosts** or **host classes**"*


### Implementing Policy Classes with Template Template Parameters

*"Library code can use template template parameters for specifying policies"*

    :::cpp
    template <template <class Created>
    class CreationPolicy> class WidgetManager : public CreationPolicy<Widget> { 
        // ...
    };

*"The `Created` symbol does not contribute to the definition of `WidgetManager`. You cannot use `Created` inside `WidgetManager` - it is a formal argument for `CreationPolicy` (not `WidgetManager`) and can be simply omitted."*

*"First, you can change policies **from the outside** as easily as changing a template argument [...]. Second, you can provide your own policies that are specific to your concrete application."*

*"[The author might] provide a default template argument for the policy that’s most commonly used:"*

    :::cpp
    template <template <class> class CreationPolicy = OpNewCreator> class WidgetManager ...

*"Policies are quite different from mere virtual functions. [...] policies come with [...] static binding."*

*"policies' features also make them **unsuitable** for **dynamic binding** and **binary interfaces**, so in essence policies and classic interfaces do not compete."*


### Destructors of Policy Classes

*"Defining a virtual destructor for a policy [...] works against its static nature and hurts performance."*

*"The lightweight, effective solution that policies should use is to define a **nonvirtual protected destructor**"*


### Optional Functionality Through Incomplete Instantiation

*"If a member function of a class template is never used, it is not even instantiated - the compiler does not look at it at all, except perhaps for syntax checking. This gives the host class a chance to specify and use optional features of a policy class."*


### Combining Policy Classes

*"The greatest usefulness of policies is apparent when you combine them. Typically, a highly configurable class uses several policies for various aspects of its workings. Then the library user selects the desired high-level behavior by combining several policy classes."*


### Decomposing a Class into Policies

*"[To] decompose the functionality of a class in policies. The rule of thumb is to identify and name the design decisions that take part in a class's behavior. Anything that can be done in more than one way should be identified and migrated from the class to a policy. Don't forget: Design constraints buried in a class's design are as bad as magic constants buried in code."*


*"When you decompose a class in policies, it is very important to find an orthogonal decomposition. An orthogonal decomposition yields policies that are completely independent of each other. You can easily spot a nonorthogonal decomposition when various policies need to know about each other."*


### Summary

*"The mechanics of policies consist of a combination of templates with multiple inheritance. A class that uses policies - a host class - is a template with many template parameters (often, template template parameters), each parameter being a policy. The host class “indirects” parts of its functionality through its policies and acts as a receptacle that combines several policies in a coherent aggregate."*

*"Policy-based classes support flexibility when it comes to conversions. If you use policy-by-policy copying, each policy can control which other policies it accepts, or converts to, by providing the appropriate conversion constructors, conversion operators, or both."*


*"Two important guidelines."*

1. *"One is to localize, name, and isolate design decisions in your class - things that are subject to a trade-off or could be sensibly implemented in various ways."*
2. *"The other guideline is to look for orthogonal policies, that is, policies that don’t need to interact with each other and that can be changed independently."*


Techniques
----------

### Partial Template Specialization

*"In a partial specialization of a class template, you specify only some of the template arguments and leave the other ones generic."*

*"When you instantiate a template, the compiler does a pattern matching of existing partial and total specializations to find the best candidate; this gives you enormous flexibility."*

*"Unfortunately, partial template specialization does not apply to functions - be they member or nonmember - which somewhat reduces the flexibility and the granularity of what you can do."*

- *"Although you can totally specialize member functions of a class template, you **cannot partially specialize member functions**."*
- *"You cannot partially specialize namespace-level (nonmember) template functions. The closest thing to partial specialization for namespace-level template functions is overloading. For practical purposes, this means that you have fine-grained specialization abilities only for the **function parameters** - **not** for the **return value** or for internally used types."*


Overloading is the closest to partial specialization for functions:

    :::cpp
    // primary template
    template <class T, class U>
    T Fun(U obj);
    
    // illegal partial specialization
    template <class U> 
    void Fun<void, U>(U obj);
    
    // specialization legal (overloading)
    template <class T>
    T Fun (Window obj);


### Local Classes

Local (nested) classes can be used (defined) inside of template functions:

*"What makes local classes truly interesting is that you can use them in template functions. Local classes defined inside template functions can use the template parameters of the enclosing function."*

*"Local classes do have a unique feature, though: They are **final**. Outside users cannot derive from a class hidden in a function."*

### Detecting Convertibility and Inheritance at Compile Time

See also [SFINAE](http://en.cppreference.com/w/cpp/language/sfinae)

*"How can we write a function that accepts 'anything else'? [...] We need a match that's 'worse' than an automatic conversion - that is, a conversion that kicks in if and only if there's no automatic conversion. A quick look through the conversion rules applied for a function call yields the ellipsis match, which is the worst of all - the bottom of the list"*

*"Passing a C++ object to a function with ellipses has undefined results, but this doesn't matter. Nothing actually calls the function. It's not even implemented. Recall that sizeof does not evaluate its argument.)"*

See also: [stackoverflow](https://stackoverflow.com/questions/3634564/type-safety-by-using-the-ellipsis-notation/3634934#3634934)

*"[...] how much you can do with functions [...], that not only don't do anything but don't even really exist at all [(just declared but not defined)]?"*

*"If template code applies const twice (to a type that's already const), the second const is ignored."*

### Optimized Parameter Types

*"A detail that must be carefully handled is that C++ does not allow references to references. Thus, if `T` is already a reference, you should not add one more reference to it."*

## Typelists

*"templates cannot have a variable number of parameters"*

*"virtual functions cannot be templates"*

### Intermezzo

About "meta functions" (like `Length`) for `Typelist`s that are implemented in a functional way:

*"Couldn't we develop a version of Length that's iterative, instead of recursive? After all, iteration is more natural to C++ than recursion."*

*"template specialization [..] provide the equivalent of if statements at compile time."*

*"All compile-time values are **immutable**. After you've defined an integral constant, say an enumerated value, you cannot change it (that is, assign another value to it)."*

*"Type definitions (`typedef`s) can be seen as introducing named type constants. Again, after definition, they are frozen - you cannot later redefine a `typedef`d symbol to hold another type."*

### Erasing a Type from a Typelist

*"[If] there is no default version of [a] template [...] you can instantiate [it] only with certain types."*


# Components

## Generalized Functors

*"Generalized functors, [are] a powerful abstraction that allows decoupled interobject communication."*

- *"**Encapsulates** any processing invocation"*
- *"Is **typesafe**"*
- *"Is an **object with value semantics**: copying, assignment, and pass by value, does not expose virtual member functions"*
- *"Can store state and invoke member functions"*

*"Two important aspects of the Command pattern:*

- *Interface separation. The invoker is isolated from the receiver.*
- *Time separation. Command stores a ready-to-go processing request that's to be started later.*"

### C++ Callable Entities

*"In addition to simple callbacks [function pointers], C++ defines many more entities that support the function-call operator. Let's enumerate all the things that support `operator()` in C++."*

- *"C-like functions"*
- *"C-like pointers to functions"*
- *"References to functions (which essentially act like const pointers to functions)"*
- *"Functors, that is, objects that define an `operator()`"*
- *"The result of applying `operator.*` or `operator->*` having a pointer to a member function in the right-hand side of the expression"*

*"You can add a pair of parentheses to the right of any of the enumerated items, put an appropriate list of arguments inside, and get some processing done. No other objects in C++ allow this except the ones just listed."* (before C++11)

### The Functor Class Template Skeleton

*"In C++ a bald pointer to a polymorphic type does not strictly have first-class semantics because of the ownership issue."*

*"C++ does not instantiate member functions for templates until they are **actually used**."*

### Handling Functors

    :::cpp
    template <typename R, class TList>
    template <typename Fun> 
    Functor<R, TList>::Functor(const Fun& fun) 
      : spImpl_(new FunctorHandler<Functor, Fun>(fun))
    { }

*"The two template parameter sets are necessary: The `template <typename R, class TList>` stands for the class template `Functor`, and `template <typename Fun>` stands for the parameter that the constructor itself takes. [...] is known as an 'out-of-class member template definition'.”*

### Argument and Return Type Conversions

*"Template processing predates compiling, allowing you to operate at source-code level. In object-oriented programming, in contrast, the power comes from late (after compilation) binding of names to values. Thus, object-oriented programming fosters reuse in the form of binary components, whereas generic programming fosters reuse at the source-code level. [...] The two techniques complement each other."*

*"pointers to member functions and their two related operators - `.*` and `->*` - reveals strange features. There is no C++ type for the result of `geronimo.*pActivity` and `pGeronimo->*pActivity`. Both are binary operators [that] return something to which you can apply the function-call operator immediately, but that 'something' does not have a type."*

*"The standard says, 'If the result of `.*` or `->*` is a function, then that result can be used only as the operand for the function call `operator()`.”*

*"You cannot store the result of `operator.*` or `operator->*` in any way, although there is an entity that holds the fusion between your object and the pointer to a member function"*

*"pointers to member functions and the two related operators are a curiously half-baked concept in C++. And by the way, you cannot have references to member functions (although you can have references to regular functions)."*


## Implementing Singletons

### Addressing the Dead Reference Problem (II): Singletons with Longevity

*"The concept emerging here is that of **longevity control** and is independent of the concept of a singleton: The greater longevity an object has, the later it will be destroyed. It doesn't matter whether the object is a singleton or some global dynamically allocated object."*


### The Double-Checked Locking Pattern

*"Very experienced multithreaded programmers know that even the Double-Checked Locking pattern, although correct on paper, is not always correct in practice. In certain symmetric multiprocessor environments (the ones featuring the so-called relaxed memory model), the writes are committed to the main memory in bursts, rather than one by one. The bursts occur in increasing order of addresses, not in chronological order."*

*"Thus, sadly, the Double-Checked Locking pattern is known to be defective for such systems."*

*"Usually the platform offers alternative, nonportable concurrency-solving primitives, such as memory barriers, which ensure ordered access to memory."*

*"A reasonable compiler should generate correct, nonspeculative code around `volatile` objects."*


## Smart Pointers

*"Smart pointers are C++ objects that simulate simple pointers by implementing `operator->` and the unary `operator*`. In addition to sporting pointer syntax and semantics, smart pointers often perform useful tasks - such as memory management or locking - under the covers, thus freeing the application from carefully managing the lifetime of pointed-to objects."*

### The Deal

*"Smart pointers have value semantics, whereas some simple pointers do not. An object with value semantics is an object that you can **copy** and **assign** to. A plain `int` is the perfect example of a first-class object. You can create, copy, and change integer values freely. A pointer that you use to iterate in a buffer also has value semantics - you initialize it to point to the beginning of the buffer, and you bump it until you reach the end. Along the way, you can copy its value to other variables to hold temporary results. With pointers that hold values allocated with `new`, however, the story is very different. Once you have written*

    :::cpp
    Widget* p = new Widget;

*the variable `p` not only points to, but also **owns**, the memory allocated for the `Widget` object. This is because later you must issue `delete p` to ensure that the `Widget` object is destroyed and its memory is released."*

*"In short, in the smart pointers' world, ownership is an important topic. By providing ownership management, smart pointers are able to support integrity guarantees and full value semantics. Because ownership has much to do with constructing, copying, and destroying smart pointers, it's easy to figure out that these are the most vital functions of a smart pointer."*

### Storage of Smart Pointers

*"Each type that's hardcoded in a piece of generic code decreases the genericity of the code. Hardcoded types are to generic code what magic constants are to regular code."*

*"When you apply `operator->` to a type that's not a built-in pointer, the compiler does an interesting thing. After looking up and applying the user-defined `operator->` to that type, it applies `operator->` again to the result. The compiler keeps doing this recursively until it reaches a native pointer, and only then proceeds with member access. It follows that a smart pointer's `operator->` does not have to return a pointer. It can return an object that in turn implements `operator->`, without changing the use syntax."*

*"If you return an object of type `PointerType` by value from `operator->`, the sequence of execution is as follows:*

1. *Constructor of `PointerType`*
2. *`PointerType::operator->` called; likely returns a pointer to an object of type `PointeeType`*
3. *Member access for `PointeeType` - likely a function call*
4. *Destructor of `PointerType`*

*"In a nutshell, you have a nifty way of implementing locked function calls. This idiom has broad uses with multithreading and locked resource access. You can have `PointerType`'s constructor lock the resource, and then you can access the resource; finally, `PointerType`'s destructor unlocks the resource."*


### Ownership-Handling Strategies

*"A smart pointer is a first-class value that takes care of deleting the pointed-to object under the covers. The client can intervene in the pointee object's lifetime by issuing calls to helper management functions."*

*"self-ownership, smart pointers must carefully track the pointee object, especially during copying, assignment, and destruction."*


### Copy on Write

*"The idea that underlies COW is to clone the pointee object at the first attempt of modification; until then, several pointers can share the same object. Smart pointers, however, are not the best place to implement COW, because smart pointers cannot differentiate between calls to const and non- const member functions of the pointee object."*

*"Function invocations for the pointee object happen somewhere beyond the reach of the smart pointer."*

### Reference Counting

*"You should not keep dumb pointers and smart pointers to the same object."*

*"The actual counter must be shared among smart pointer objects"*

*"Reference management - be it counting or linking - is a victim of the resource leak known as **cyclic reference**."*

### Destructive Copy

*"C++ etiquette calls for the right-hand side of the copy constructor and the assignment operator to be a reference to a `const` object. Classes that foster destructive copy break this convention for obvious reasons. Because etiquette exists for a reason, you should expect negative consequences if you break it."*

*"Because they do not support value semantics, smart pointers with destructive copy cannot be stored in standard containers and in general must be handled with almost as much care as raw pointers."*

*"On the bright side, smart pointers with destructive copy have significant advantages:*

- *They incur almost no overhead.*
- *They are good at enforcing ownership transfer semantics.*
- *They are good as return values from functions.*
- *They are excellent as stack variables in functions that have multiple return paths.*"

### The Address-of Operator

*"There are two reasons why overloading unary `operator&` is not a very good idea. One reason is that exposing the address of the pointed-to object implies giving up any automatic ownership management. [...] The second reason, a more pragmatic one, is that overloading unary `operator&` makes the smart pointer unusable with STL containers. Actually, overloading unary `operator&` for a type pretty much makes generic programming impossible for that type, because the address of an object is too fundamental a property to play with naively. Most generic code assumes that applying `&` to an object of type `T` returns an object of type `T*` [...] address-of is a fundamental concept. If you defy this concept, generic code behaves strangely either at compile time or - worse - at runtime."*

### Putting It All Together

*"A rule for all policies is that they must have value semantics; that is, they must define a proper copy constructor and assignment operator."*


## Object Factories

*"[...] subject to the paradox of 'virtual constructors'. You need virtual constructors when the information about the object to be created is inherently dynamic and cannot be used directly with C++ constructs."*

*"This marks a fundamental difference between creating objects and invoking virtual member functions in C++. Virtual member functions are fluid, dynamic - you can change their behavior without changing the call site. In contrast, each object creation is a stumbling block of statically bound, rigid code."*

### The Need for Object Factories

*"[...] an object factory may be needed. When you save an object to a file, you must save its actual type in the form of a string, an integral value, an identifier of some sort. Thus, although the type information exists, its **form** does not allow you to create C++ objects."*

### Object Factories in C++: Classes and Objects

*"In C++, classes and objects are different beasts. Classes are what the programmer creates, and objects are what the program creates. You cannot create a new class at runtime, and you cannot create an object at compile time. Classes don't have first-class status: You cannot copy a class, store it in a variable, or return it from a function."*

*"In C++ there is a fracture between types and values: A value has a type attribute, but a type cannot exist on its own. If you want to create an object in a totally dynamic way, you need a means to express and pass around a 'pure' type and build a value from it on demand. Because you cannot do this, you somehow must represent types as objects - integers, strings, and so on. Then, you must employ some trick to exchange the value for the right type, and finally to use that type to create an object."*


## Abstract Factory

*"However, the more you reduce dependencies, the more you also reduce type knowledge, and consequently the more you undermine the type safety of your design. This is yet another instance of the classic dilemma of better type safety versus lesser dependencies that often appears in C++"*

*"`Type2Type` is a simple template whose unique purpose is to disambiguate overloaded functions."*

## Visitor

*"Visitor gives you a surprising amount of flexibility in a certain area: You can add virtual functions to a class hierarchy without recompiling them or their existing clients. However, this flexibility comes at the expense of disabling features that designers take for granted: You cannot add a new leaf class to the hierarchy without recompiling the hierarchy and all its clients."*

*"Visitor’s operational area is limited to very stable hierarchies (you seldom add new classes) and heavy processing needs (you often add new virtual functions)."*

*"Visitor goes against programmers' intuition; therefore, a careful implementation and rigorous discipline are essential to using it successfully."*

### Visitor Basics

*"In a nutshell, from a dependency standpoint, new classes are easy to add, and new virtual member functions are difficult to add."*

*"Visitor applies best when operations on objects are distinct and unrelated."*

*"A **type switch** occurs whenever you query a polymorphic object on its concrete type and perform different operations with it depending on what that concrete type is."*

### Back to the "Cyclic" Visitor

*"If you use `dynamic_cast` against some object, the runtime support has quite a few things to do. The RTTI code must figure out whether the conversion to the target type is legal and, if it is, must compute a pointer to that target type."*

*"Let's detail a bit how a compiler writer can achieve this. One reasonable solution is to assign a unique integral identifier to each type in the program. The integral identifier also comes in handy when it comes to exception handling, so it's quite a wise integrating solution. Then in each class's virtual table, the compiler puts (a pointer to) a table of identifiers of all its subtypes. Together with these identifiers, the compiler has to store the offsets of the relative positions of the subobjects within the big object. This would be enough information to perform a dynamic cast correctly."*

*"Details - such as multiple inheritance - render the dynamic cast code even more complicated and slower."*

*"`dynamic_cast` does have a cost, which is unpredictable and can become unacceptable for some particular needs of an application."*

### Summary

*"Essentially, Visitor allows you to add virtual functions to a class hierarchy without modifying the classes in that hierarchy. In some cases, Visitor can lead to a clever, extensible design."*

## Multimethods

*"The C++ virtual function mechanism allows dispatching of a call depending on the dynamic type of one object. The multimethods feature allows dispatching of a function call depending on the types of **multiple** objects. A universally good implementation requires language support, which is the route that languages such as CLOS, ML, Haskell, and Dylan have taken. C++ lacks such support, so its emulation is left to library writers."*

### What Are Multimethods?

*"Two types of polymorphism are implemented in C++:*

- *Compile-time polymorphism, supported by overloading and template functions*
- *Runtime polymorphism, implemented with virtual functions*"

*"Overloading and template functions scale to multiple objects naturally."*

*"Unfortunately, virtual functions - the only mechanism that implements runtime polymorphism in C++ - are tailored for one object only. Even the call syntax - `obj.Fun(arguments)` - gives `obj` a privileged role over `arguments`"*

### The Logarithmic Dispatcher and Casts

*"A template can accept a pointer to a function as a nontype template parameter. [...] A template is allowed to accept pointers to global objects, including functions, as nontype template parameters. The only condition is that the function whose address is used as a template argument must have external linkage."*

*"You can easily transform static functions into functions with external linkage by removing `static` and putting them into unnamed namespaces."*

### Converting Arguments: `static_cast` or `dynamic_cast`?

*"Virtual inheritance provides a means for several derived classes to share the same base class object."*

*"you must use `dynamic_cast` if you have a hierarchy using virtual inheritance."*

*"The `dynamic_cast operator is designed to reach the right object in a class hierarchy, no matter how intricate its structure is."*

*"`dynamic_cast` is much slower than `static_cast`. Its power comes at a cost."*

*"What is double dispatching? You can see it as finding a handler function (or functor) in a two-dimensional space. On one axis are the types of the left-hand operator. On the other axis are the types of the right-hand operator. At the intersection between two types, you find their respective handler function."*
