Title: List of Design Patterns
Date: 2015-09-17
Modified: 2015-09-18
Category: Programming
Tags: C++, Python, OOP


Overview of Design Patterns
---------------------------


| Creational Patterns        | Structural Patterns | Behavioral Patterns          | Other Patterns             |
|----------------------------|---------------------|------------------------------|----------------------------|
| Abstract Factory[^1] [^2]  | Adapter[^1] [^2]    | Chain of Responsibility[^1]  | Business Delegate          |
| Builder[^1]                | Composite[^1] [^2]  | Command[^1] [^2]             | Data Access Object         |
| Factory Method[^1] [^2]    | Bridge[^1]          | Interpreter[^1]              | Data Transfer Object       |
| Prototype[^1]              | Decorator[^1] [^2]  | Iterator[^1] [^2]            | Dependency Injection       |
| Singleton[^1] [^2]         | Facade[^1] [^2]     | Mediator[^1]                 | Inversion of Control       |
|                            | Flyweight[^1]       | Memento[^1]                  | Model View Controller[^2]  |
|                            | Proxy[^1] [^2]      | Null Object                  | Model View Presenter       |
|                            |                     | Observer[^1] [^2]            | Plugin                     |
|                            |                     | State[^1] [^2]               | Fluent Interface           |
|                            |                     | Strategy[^1] [^2]            | Functor                    |
|                            |                     | Template Method[^1] [^2]     | Filter-Pipe                |
|                            |                     | Visitor[^1]                  |                            |

[^1]: [Design Patterns (GoF)](https://en.m.wikipedia.org/wiki/Design_Patterns_(book))
[^2]: [Head First Design Patterns](http://www.headfirstlabs.com/books/hfdp/)

///Footnotes Go Here///


OO-Principles
-------------

- [Encapsulate](https://en.wikipedia.org/wiki/Encapsulation_%28computer_programming%29) what varies ([Encapsulation Is Not Information Hiding](http://c2.com/cgi/wiki?EncapsulationIsNotInformationHiding))
- [Prefer Composition to inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance)
- Program to Interface, not Implementation: [Liskov substitution principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle)
- [Cohesion](https://en.wikipedia.org/wiki/Cohesion_%28computer_science%29): Objects should only interact with 'friends' (objects in their neighborhood)
- Ineracting Objects should aim for [loose coupling](https://en.wikipedia.org/wiki/Loose_coupling)
- [Open-Closed principle](https://en.wikipedia.org/wiki/Open/closed_principle): Classes should be open for extension, but closed for modification
- [Tell don't ask](http://martinfowler.com/bliki/TellDontAsk.html): Tell Objects what to do with their data, don't ask for the data to operate on it
- [Single-Responibility-Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle): A class should have only one responsibility (one reason to change)
