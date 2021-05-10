SOLID Design Principles


# The Single Responsibility Principle (SRP)

- A class (function, module...) should have only one reason to change.
- A responsibility is “a reason for change”.
- Violation of Single Responsibility Principle leads to rigidity:
    - This rigidity forces the recompilation and redeployment of software parts more often than necessary.
- Just apply Single Responsibility Principle if there is a need for it.

# The Open-Closed Principle (OCP)

- “Software Entities (Classes, Modules, Functions, Etc.) should be open for extension, but closed for modification.”
- Modules should be designed to never change.
- When the requirements change the behavior of modules is extended by adding new code, not by changing old code that already works.
- Abstraction (interfaces):
    - A module can be closed for modification since it depends on an abstraction.
    - The behavior of that module can be extended by creating new derivatives of the abstraction.
- Strategic Closure: closure can not be complete. The designer needs to decide to which kind of change the design needs to be closed.

# The Liskov Substitution Principle (LSP)

*"What is wanted here is something like the following substitution property: If for each object `o1` of type `S` there is an object `o2` of type `T` such that for all programs `P` defined in terms of `T`, the behavior of `P` is unchanged when `o1` is substituted for `o2` then `S` is a subtype of `T`."* - Barbara Liskov

- Functions that use references to base classes must be able to use references to objects of derived classes without knowing it.
- In languages like C++ and Java, the key mechanisms that supports abstraction and polymorphism is inheritance.
- When the creation of a derived class causes us to make changes to the base class, it's a sign of bad design. It violates the Open-Closed principle.
- When considering whether a particular design is appropriate or not, one must not simply view the solution in isolation. One must view it in terms of the reasonable assumptions that will be made by the users of that design.
- The LSP makes clear that in OOD the *IS-A* relationship pertains to behavior. Not private implementation behavior, but public behavior that clients depend upon.
- In order for the LSP to hold, and with it the Open-Closed principle, all derivatives must conform to the behavior that clients expect of the base classes that they use.

## Design by Contract 

There is a strong relationship between the LSP and the concept of Design by Contract :

*„...when redefining a routine [in a derivative], you may only replace its precondition by a weaker one, and its postcondition by a stronger one.“* - Bertrand Meyer

- When using an object through its base class interface, the user knows only the pre- and postconditions of the base class.
  - Preconditions: Derived objects must not expect the users to obey stronger preconditions. They must accept anything that the base class could accept.
  - Postconditions: Derived classes must conform to all the postconditions of the base. Users of the base class must not be confused by the output of the derived class. 
- Overridden virtual methods of derived classes:
    - Must not expect more than the method of the parent class (Contravariant).
    - Should promise no less than the method of the parent class (Covariant).


# The Interface Segregation Principle (ISP)

*"Clients should not be forced to depend upon interfaces that they do not use."*

- Interface Pollution: interface or class has been polluted with an interface that it does not require.
- Introducing interfaces in base classes that are not needed by all derivatives violates the Liskov Substitution Principle (LSP).
- Separate Clients mean Separate Interfaces.
- We normally think about how changes to interfaces will affect their users:
    - However, there is a force that operates in the other direction. That is, sometimes it is the user that forces a change to the interface.
- Clients of an object do not need to access it through the interface of the object. Rather, they can access it through delegation, or through a base class of the object. 
- Use multiple inheritance to implement different interfaces


# The Dependency Inversion Principle (DIP)

*"A. High level modules should not depend upon low level modules. Both should depend upon abstractions.*
*B. Abstractions should not depend upon details. Details should depend upon abstractions."*

- A single change to heavily interdependent software begins a cascade of changes in dependent modules.
- High level modules simply should not depend upon low level modules in any way. 
- It is the high level modules that should take precedence over the lower level modules (regarding changes).
- It is high level modules that we want to be able to reuse.
- We are already quite good at reusing low level modules in the form of subroutine libraries. 
- Dependency is transitive.
- We must isolate this abstraction from the details of the problem. Then we must direct the dependencies of the design such that the details depend upon the abstractions. 