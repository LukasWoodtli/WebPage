title: Projects

[TOC]


# Work Experience


## Profidata AG
Currently I'm working as a senior software developer at Profidata.
My main task there is the development, improvement and maintenance of the Xentis investment platform. Xentis is a large scale, highly scalable and parallelized C++ Server application with a broad ecosystem. 
Besides learning a lot about financial markets, investment and fintech I'm improving my C++ knowledge towards  a modern and generic style. I also became an expert in development on Linux.
In past projects I connected external functionality such as a price service with REST interfaces and am currently working on providing Xentis functionality as REST services to be used outside of our core application.
As quality is always an important part of software development I'm also involved in maintaining our build environment and continuous integration infrastructure (CMake, Jenkins, pipeline), integration of static and dynamic analysis tools (sanitizers, clang static analyzer ...) as well as regression- and unit-tests.


## Kaba:
### Portable Configuration and Programming Device (PD1460)
At first I was responsible for the development of the firmware for a programming device. The programmer consists of a lot of peripheral devices including a LCD display, a keypad, NFC, USB, RS-232 and SD card. It runs on an ARM controller. The firmware was developed in C.

### Electronic Locks
Later I was involved in the embedded software development of electronic locks that were based on different micro controller architectures as ARM Cortex, Atmel (ATmega, AVR) and Coldfire. There were also a Windows simulation of the access control devices (software and hardware) for simplifying development, testing and bug fixing. The simulation had to be extended and maintained.

### C++ and Software Architect
After a decision to do a big rewrite and refactoring of the firmware I took the role of a software architect. In the process we changed from C to C++ (even on 8 Bit controllers). This was an opportunity for me to act as main software architect and drive the development of an modular, object oriented design. It was optimized for usability, testability, extensibility and reuse.
Because quality and security were important unit tests and system tests were implemented. A good part of the software was written with a Test Driven Development approach.
I was also supporting my colleagues with using C++ in an deeply embedded environment with low resources (battery driven, small memory, slow processor, bare metal).

### Other Tasks
Besides programming I defined functional requirements, specifications and maintained and extended a lot of documentation. I did some maintenance of existing products and did some project management for developing a customer specific device.


## CodeCheck AG
As a small project at CodeCheck I developed a
complete mobile app for Symbian with Qt and C++. Learned a lot about development for mobile platforms and REST services. Improved my C++ and Qt skills. In the process of developing the app I also ported a barcode scanner from Objective-C to C++.


## Schiller AG
After my studies as electronic engineer I worked as an intern at Schiller.
There I created an application for the configuration and combination of filters for electrocardiograph devices (ECG). 
The software reads the configuration from a XML file and shows it graphically as connected boxes which represent the filters. The configuration can be stored again in a XML file. For creating and editing configurations the filters are placed on a workspace via drag and drop and they can be connected with mouse clicks.
The application was developed in C++ with Qt, Boost and Xerces for Windows and Linux.
Beside improving my C++ skills I also learned a lot of general programming tools and techniques as Design Patterns, OOA/OOD, UML, XML (SAX/DOM), Doxygen.
I not only learned a lot of technical stuff but also about medical engineering.
As side projects I set up automated integration testing for the GUI of an ECG application and evaluated installer tools for Windows and Linux.


## AIM Industrielle Montage AG

After my apprenticeship I worked at AIM as mechanical engineer.
There I assembled mechanical devices and fabricated small series and individual mechanical parts. I also made some improvements on existing parts.
An other task was to manage the warehouse of mechanical parts and devices (logistics).


# Educational Projects

## Bachelor Thesis

[Disney Copter](http://www.reely.ethz.ch/) (2008-2009)

The task of our bachelor thesis was to construct a flying device that entertains visitors at Disneyland. We created a quadcopter in the shape of a film reel.

The project was part of the 'Focusprojects' at ETH Zürich. The team consisted of seven students working on the project over the course of two semesters. A fellow student and I were responsible for creating the controlling algorithm for the embedded hardware. Our task was to read the data from the sensors and calculate the rotation speed for every one of the four propellers.

The embedded hardware comprises of various technological systems. There are two microprocessors. One of them is responsible for the sensors, the other one is used for the controlling algorithm and to drive the propellers. 

There are also many different sensors on the hardware board. We used:

- Gyroscopes
- A compass
- A pressure sensor
- Ultrasonic sensors
- Acceleration sensors

To read all the sensor data we had to work with different interfaces such as:

- UART
- Bluetooth
- ZigBee
- SPI 
- I2C
- ADC

There is also a GPS module connected to the hardware so we can always determine the position of the quadro copter.

The bachelor thesis was rewarded with a grade of **5.5** (of 6).

More information on the project can be found on the homepage: [www.reely.ethz.ch](http://www.reely.ethz.ch)

# Private Projects

## Design by Contract for C++

This small [library](https://github.com/LukasWoodtli/DesignByContractPlusPlus) allows to define contracts in C++ that are checked at specific points (for example at scope exit). It can help to improve the quality of code and is a good addition to unit tests.


## Markdown Generator for Python

I started to develop [this library](https://github.com/LukasWoodtli/MarkdownGen) for personal use. The aim was to generate some Markdown files for my homepage. I used just a part of the library for my home page.
But I keep working on the project anyway. It is also a good exercise for me doing a complete Python project from start to end.

