---
title: Projects
---

# Gardena Digital Hub

I work in the IoT platform team of the GARDENA smart system.
The system controls connected irrigation devices and robotic lawn mowers.

I write services in Rust, C and Python on the GARDENA smart Gateway.
The gateway runs a custom embedded Linux distribution based on Yocto, which I also maintain and extend.
I also write embedded firmware in C for the edge devices, which run on Zephyr RTOS.

I implement and maintain the IoT communication protocols CoAP, LwM2M and MQTT on the devices and on the gateway.
These protocols are the basis for the communication between the devices and the AWS IoT cloud.

To find and fix issues, I use distributed observability (remote logging and metrics), protocol and signal analyzers, and debuggers.

To keep the product quality high, I build and extend the test automation.
This includes unit tests, integration tests and hardware jig tests for the IoT platform.
In addition, I maintain and improve the continuous integration that automates our builds and tests.

Recently, I adopted an agentic workflow for design, development and troubleshooting.

[www.gardena.com](https://www.gardena.com/)

# Zephyr OS - EFM32TG-STK3300 Board Support

I added support for the Silicon Labs EFM32TG-STK3300 starter kit to the Zephyr open-source real-time operating system (RTOS).
The board contains an EFM32TG microcontroller, from a chip family that Zephyr did not yet support.
So I added SoC-level support for the EFM32TG first. The SoC is an ARM Cortex-M3 microcontroller with low-power modes for battery-powered designs.
With that in place, I added the board itself: its devicetree description, Kconfig options, and documentation.
These changes were accepted into the main Zephyr tree.

[EFM32 Tiny Gecko (EFM32TG-STK3300)](https://docs.zephyrproject.org/latest/boards/silabs/starter_kits/efm32tg_stk3300/doc/index.html)

# Profidata AG

At Profidata I worked as a senior software developer on Xentis, a highly scalable and parallelized server application.
My main task was to extend Xentis with REST services. These services let other systems use the functionality of Xentis outside of the core application.
I also implemented functional modules, such as investment performance and price services.

Another task was to ensure the software quality of Xentis.
I implemented system tests for our REST APIs, as well as integration tests and unit tests.
In the large legacy codebase, characterization tests helped to capture the current behavior and to improve the code quality step by step.
With my experience in software design and testing techniques, I supported other developers with testing and refactoring.

Development was done in modern, generic C++ and Java on Linux. Part of the test infrastructure was written in Python.

I was also responsible for the maintenance of our build environment and continuous integration infrastructure (CMake, Jenkins pipeline, Gerrit), and for the integration of static and dynamic analysis tools (sanitizers, Clang Static Analyzer) and of regression and unit tests.
I also became an expert in development on Linux.

[www.profidata.com](https://www.profidata.com/)

# Kaba

## Portable Programming Device

First, I was responsible for the firmware of a programming device. The device has many peripherals, including an LCD display, a keypad, NFC, USB, RS-232 and an SD card. It runs on an ARM controller. The firmware was written in C.

## Electronic Locks

Later, I worked on the embedded software for electronic locks based on different microcontroller architectures, such as ARM Cortex, ATmega and ColdFire. I extended and maintained the firmware, which was written in C. Later, the team decided to rewrite the embedded software in C++.

Besides my role as a programmer, I was the main software architect on this project and drove the development of a modular, object-oriented design. It was designed for usability, testability, extensibility and reuse. To enforce quality and security, we implemented system and unit tests with a test-driven development approach. I also mentored and supported my colleagues in using C++ in an embedded, battery-powered environment with limited resources.

All these devices contained different peripherals, such as NFC readers, EEPROM, ZigBee, USB and motors, which were connected through common digital communication interfaces. My team also extended and maintained PC simulations of all devices (firmware and hardware) to simplify development, testing and bug fixing.

## Other Tasks

Besides programming, I defined functional requirements and specifications and maintained the documentation. I was also the project manager for the development of a customer-specific device.


[www.dormakaba.com](https://www.dormakaba.com)


# CodeCheck AG
In a small project at CodeCheck, I developed a complete mobile app for Symbian with Qt and C++.
I learned a lot about development for mobile platforms and about REST services, and I improved my C++ and Qt skills. As part of the app, I also ported a barcode scanner from Objective-C to C++.

# Schiller AG

After my studies in electrical engineering, I worked as an intern at Schiller.
There I created an application to configure and combine filters for electrocardiograph (ECG) devices.

The software reads the configuration from an XML file and shows it graphically as connected boxes that represent the filters. The configuration can be saved back to an XML file. To create and edit configurations, you place the filters on a workspace with drag and drop and connect them with mouse clicks.

The application was developed in C++ with Qt, Boost and Xerces for Windows and Linux.
Besides improving my C++ skills, I learned many general programming tools and techniques, such as design patterns, OOA/OOD, UML, XML (SAX/DOM) and Doxygen.
I learned not only a lot of technical things but also a lot about medical engineering.
As side projects, I set up automated integration tests for the GUI of an ECG application and evaluated installer tools for Windows and Linux.

# Bachelor Thesis

The task of my Bachelor's thesis was to develop and build a quadcopter in the shape of a film reel to entertain visitors at Disneyland.

The project was a cooperation between the Autonomous Systems Lab at the ETH and the ZHAW, where I obtained my degree in Electrical Engineering.
We were an interdisciplinary team of electrical and mechanical engineers.

My task was to develop the firmware and the control algorithm for the embedded hardware. The hardware was based on two microcontrollers and had many different peripherals, such as gyroscopes, a compass, pressure, ultrasonic and acceleration sensors, and the motors that drive the propellers. The peripherals communicated through different interfaces, such as UART, SPI, I2C, ADC and ZigBee.

The Bachelor's thesis received a grade of **5.5** (out of 6).

# AIM Industrielle Montage

After my apprenticeship, I worked at AIM as a mechanic.
There I assembled mechanical devices and made small series and single mechanical parts. I also made some improvements to existing parts.
Another task was to manage the warehouse for mechanical parts and devices (logistics).
