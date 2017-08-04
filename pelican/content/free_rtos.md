Title: FreeRTOS
Category: Programming
Tags: Computer Science, OS, FreeRTOS
Date: 2017-06-16

This page contains some random notes for FreeRTOS.

See also: [FreeRtosExamples](https://github.com/LukasWoodtli/FreeRtosExamples)
and: [FreeRtos](http://www.freertos.org/)


# Configuration

The configuration of the kernel is set in `FreeRTOSConfig.h`

- `configTOTAL_HEAP_SIZE`: This must be enough space to allocate all tasks. If the kernel does't start it could be that the heap is too small.
