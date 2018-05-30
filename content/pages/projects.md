title: Projects

# Markdown Generator for Python
I started to develop [this library](https://github.com/LukasWoodtli/MarkdownGen) for personal use. The aim was to generate some **Markdown** files for my homepage. I used just a part of the library for my home page.
But I keep working on the project anyway. It is also a good exercise for me doing a complete Python project from start to end.

<!-- # FeatureTogglesPlusPlus
[This](https://github.com/LukasWoodtli/FeatureTogglesPlusPlus) is a small personal project to provide lightweight feature toggles in C++. It should have no dependencies (maybe some to STL) and be highly configurable. With writing this library I want to improve my C++ knowledge. Mainly Templates and other **Modern C++** topics.

I haven't been working on the project for a while. It's still in it's beginning and not meant for use yet.
-->

# Bachelor Thesis	
[Disney Copter](http://www.reely.ethz.ch/) (2008-2009)

The task of our bachelor thesis was to construct a flying device that entertains visitors at Disneyland. We created a **quadcopter** in the shape of a film reel.

The project was part of the 'Focusprojects' at ETH Zürich. The team consisted of seven students working on the project over the course of two semesters. A fellow student and I were responsible for creating the controlling algorithm for the embedded hardware. Our task was to read the data from the sensors and calculate the rotation speed for every one of the four propellers.

The embedded hardware comprises of various technological systems. There are two microprocessors. One of them is responsible for the sensors, the other one is used for the controlling algorithm and to drive the propellers. 

There are also many different **sensors** on the hardware board. We used:

- Gyroscopes
- A compass
- A pressure sensor
- Ultrasonic sensors
- Acceleration sensors

To read all the sensor data we had to work with different **interfaces** such as:

- UART
- Bluetooth
- ZigBee
- SPI 
- I2C
- ADC

There is also a **GPS** module connected to the hardware so we can always determine the position of the quadro copter.

The bachelor thesis was rewarded with a grade of **5.5** (of 6).

More information on the project can be found on the homepage: [www.reely.ethz.ch](http://www.reely.ethz.ch)

# Internship at Schiller AG	
The main task during the internship was to create a computer program that reads and writes **XML** files. In these files the configuration of different filters for electrocardiogram devices are stored. The software reads the configuration from the file and shows it graphically as connected boxes which represent the filters. It's also possible to create an XML file. For that the filters can be placed on a workspace via drag and drop. They then can be connected with mouse clicks. The software was programmed in **C++** mainly with **Qt**, **STL**, **Boost** and the **Xerces XML** library.
