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

