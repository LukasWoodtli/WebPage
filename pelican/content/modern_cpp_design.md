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


Policies and Policy Classes
~~~~~~~~~~~~~~~~~~~~~~~~~~~

*"A **policy** defines a class interface or a class template interface. The interface consists of one or all of the following: inner type definitions, member functions, and member variables."*

*"Policies have much in common with **traits** but differ in that they put less emphasis on type and more emphasis on behavior. Also, policies are reminiscent of the **Strategy design pattern**, with the twist that policies are bound at compilation time."*

*"For a given policy, there can be an unlimited number of implementations. The implementations of a policy are called **policy classes**"*

*"Policy classes are not intended for stand-alone use [...]"*

*"Policies are syntax oriented, not signature oriented."*

*"[A] policy does not specify that [a member function] must be static or virtual—the only requirement is that the class template define a [coresponding (with the expected signature)] member function."*

*"The classes that use one or more policies are called **hosts** or **host classes**"*


Implementing Policy Classes with Template Template Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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


Destructors of Policy Classes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

*"Defining a virtual destructor for a policy [...] works against its static nature and hurts performance."*

*"The lightweight, effective solution that policies should use is to define a **nonvirtual protected destructor**"*


Optional Functionality Through Incomplete Instantiation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

*"If a member function of a class template is never used, it is not even instantiated - the compiler does not look at it at all, except perhaps for syntax checking. This gives the host class a chance to specify and use optional features of a policy class."*


Combining Policy Classes
~~~~~~~~~~~~~~~~~~~~~~~~

*"The greatest usefulness of policies is apparent when you combine them. Typically, a highly configurable class uses several policies for various aspects of its workings. Then the library user selects the desired high-level behavior by combining several policy classes."*


Decomposing a Class into Policies
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

*"[To] decompose the functionality of a class in policies. The rule of thumb is to identify and name the design decisions that take part in a class's behavior. Anything that can be done in more than one way should be identified and migrated from the class to a policy. Don't forget: Design constraints buried in a class's design are as bad as magic constants buried in code."*



*"When you decompose a class in policies, it is very important to find an orthogonal decomposition. An orthogonal decomposition yields policies that are completely independent of each other. You can easily spot a nonorthogonal decomposition when various policies need to know about each other."*


Summary
~~~~~~~

*"The mechanics of policies consist of a combination of templates with multiple inheritance. A class that uses policies - a host class - is a template with many template parameters (often, template template parameters), each parameter being a policy. The host class “indirects” parts of its functionality through its policies and acts as a receptacle that combines several policies in a coherent aggregate."*

*"Policy-based classes support flexibility when it comes to conversions. If you use policy-by-policy copying, each policy can control which other policies it accepts, or converts to, by providing the appropriate conversion constructors, conversion operators, or both."*


*"wo important guidelines."*

1. *"One is to localize, name, and isolate design decisions in your class - things that are subject to a trade-off or could be sensibly implemented in various ways."*
2. *"The other guideline is to look for orthogonal policies, that is, policies that don’t need to interact with each other and that can be changed independently."*
