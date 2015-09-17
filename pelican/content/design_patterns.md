Title: List of Design Patterns
Date: 2015-09-17
Modified: 2015-09-17
Category: Programming
Tags: C++, Python, OOP

> Work in Progress!


| Erzeugende Muster                  | |Strukturelle Muster       | |Verhaltensmuster                             | |Weitere Muster                            | |
|------------------------------------|-|--------------------------|-|---------------------------------------------|-|------------------------------------------|-|
| Abstract Factory (Abstrakte Fabrik)|2|Adapter[^2]               |2|Chain of Responsibility (Zuständigkeitskette)| |Business Delegate                         | |
| Builder (Erbauer)                  | |Composite (Kompositum)[^2]|2|Command (Kommando)[^2]                       |2|Data Access Object                        | |
| Factory Method (Fabrikmethode)[^2] |2|Bridge (Brücke)           | |Interpreter                                  | |Data Transfer Object (Datentransferobjekt)| |
| Prototype (Prototyp)               | |Decorator (Dekorierer)[^2]|2|Iterator[^2]                                 |2|Dependency Injection                      | |
| Singleton (Einzelstück)[^2]        |2|Facade (Fassade)          |2|Mediator (Vermittler)                        | |Inversion of Control                      | |
|                                    | |Flyweight (Fliegengewicht)| |Memento                                      | |Model View Controller[^2]                 |2|
|                                    | |Proxy (Stellvertreter)[^2]|2|Null Object (Nullobjekt)                     | |Model View Presenter                      | |
|                                    | |                          | |Observer (Beobachter)[^2]                    |2|Plugin                                    | |
|                                    | |                          | |State (Zustand)[^2]                          |2|Fluent Interface                          | |
|                                    | |                          | |Strategy (Strategie)[^2]                     |2|                                          | |
|                                    | |                          | |Template Method (Schablonenmethode)[^2]      |2|                                          | |
|                                    | |                          | |Visitor (Besucher)                           | |                                          | |


1: GoF
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
