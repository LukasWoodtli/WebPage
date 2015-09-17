Title: List of Design Patterns
Date: 2015-09-17
Modified: 2015-09-17
Category: Programming
Tags: C++, Python, OOP

> Work in Progress!


| Erzeugende Muster                  | Strukturelle Muster   | Verhaltensmuster             | Weitere Muster             |
|------------------------------------|-----------------------|------------------------------|----------------------------|
| Abstract Factory[^1][^2]           | Adapter[^1][^2]       | Chain of Responsibility[^1]  | Business Delegate          |
| Builder[^1]                        | Composite[^1][^2]     | Command[^1][^2]              | Data Access Object         |
| Factory Method [^1][^2]            | Bridge[^1]            | Interpreter[^1]              | Data Transfer Object       |
| Prototype[^1]                      | Decorator[^1][^2]     | Iterator[^1][^2]             | Dependency Injection       |
| Singleton[^1][^2]                  | Facade[^1]            | Mediator[^1]                 | Inversion of Control       |
|                                    | Flyweight[^1]         | Memento[^1]                  | Model View Controller[^2]  |
|                                    | Proxy[^1][^2]         | Null Object (Nullobjekt)     | Model View Presenter       |
|                                    |                       | Observer[^1][^2]             | Plugin                     |
|                                    |                       | State[^1][^2]                | Fluent Interface           |
|                                    |                       | Strategy[^1][^2]             |                            |
|                                    |                       | Template Method[^1][^2]      |                            |
|                                    |                       | Visitor[^1]                  |                            |


[^1]: GoF
[^2]: Entwurfsmuster von Kopf bis Fuss (Head First)

OO-Prinzipien:

- Kapseln, was variiert.
- Komposition der Verebung vorziehen.
- Auf Schnittstelle anstatt auf Implementierung programmieren.
- Bei Objekten, die interagieren nach lockerer Bindung streben.
- Klassen sollten für Erweiterungen offen, aber für Veränderungen geschlossen sein.
- Auf Abstraktionen Stützen anstelle auf konkrete Klassen.
- Objekte sollten nur mit 'Freunden' (Objekte in ihrer Umgebung) kommunizieren.
- Versuchen Sie nicht, uns anzurufen, wir rufen Sie an!
- Eine Klasse sollte nur einen Grund haben, sich zu ändern.
