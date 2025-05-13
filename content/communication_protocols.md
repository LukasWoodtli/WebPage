---
title: Communication Protocols in Embedded Systems
category: Programming
tags: [Embedded Systems]
---

# Serial Peripheral Interface (SPI)

* serial
* full-duplex
* master-slave (one master, multiple slaves)
* 4 wires:
  * SCLK: Serial Clock (output from master)
  * MOSI: Master Out Slave In (data output from master)
  * MISO: Master In Slave Out (data output from slave)
  * CS /SS: Chip/Slave Select (often active-low, output from master to activate communication on device)
* Clock frequency: typically few MHz
* Word size usually 8 bit

* Topology:
  * independent slaves (parallel)
  * daisy chain

* Throughput:
  * depending on clock speed and electrical characteristics of the connecting wires
  * up to 60 Mbps (in some cases, over short distances)
  * usually less than 10 Mbps

* Pros/Cons:
  * Pro:
    * Full duplex communication 
    * Higher throughput than I2C
    * Slaves don’t need own clock oscillator
    * No unique addresses needed
  * Cons:
    * More pins/wires than I2C
    * No control flow, acknowledge of received messages and error checking
    * Only for relative short distances (compared to RS-232, RS-485, or CAN-bus)
    * variations between vendors can lead to difficulties

* Uses:
  * temperature and pressure sensors, touchscreen, LCD
  * ADC/DAC, digital potentiometers
  * Communications devices: Ethernet, WiFi, USB, UART, CAN, ZigBee
  * flash and EEPROM
  * Real-time clocks
  * SD and MMC cards

# I2C (Inter-Integrated Circuit)

* serial
* half-duplex
* SMBus is a subset of I2C.

* 2 wires:
  * data (`SDA`)
  * clock (`SCL`)
* 10 bit addresses
* Bitrate:
  * 0.1-5.0 Mbit/s
