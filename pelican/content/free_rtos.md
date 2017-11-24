Title: FreeRTOS
Category: Programming
Tags: Computer Science, OS, FreeRTOS, Embedded Systems
Date: 2017-06-16

This page contains some random notes for FreeRTOS.

See also: [FreeRtosExamples](https://github.com/LukasWoodtli/FreeRtosExamples)
and: [FreeRtos](http://www.freertos.org/)


# Configuration

The configuration of the kernel is set in `FreeRTOSConfig.h`

- `configTOTAL_HEAP_SIZE`: This must be enough space to allocate all tasks. If the kernel does't start it could be that the heap is too small.


# Tasks

- Defined as free functions
    - Return type: `void`
    - Argument: `void *`
- Usally endless loop
- Will never exit (not allowed by kernel)
- A task function can be used to create multiple tasks
- It's possible to create a task from another task


## Task Stack

Each task has its own stack (allocated by the kernel when the task is created)

> The stack size is given in *number of words* and not number of bytes

The stack depth multiplied by the stack width must not be bigger than the maximum value that can be stored in a variable of type size_t.

The stack size of the idle task is defined by `configMINIMAL_STACK_SIZE`.

## Task States

Only the FreeRTOS kernel is allowed to change task state.

- Running
- Not running
    - Suspended
    - Ready
    - Blocked

Events and system calls can influence the scheduler for allowing
different tasks to run.

If more than one task of the same priority is able to run, the scheduler will switch each task in and out of the *Running* state, in turn.

## Task Priorities

Can be assigned a valu form `0` (lowest) to `configMAX_PRIORITIES - 1` (highest).

Priority can be changed after the scheduler has started.

## Scheduler

The scheduler is executed after each time slice to select the next task.
A periodic (tick) interrupt is used for switching.

The tick interrupt frequency is set by `configTICK_RATE_HZ`.

To convert the number of ticks into milliseconds the constant
`portTICK_RATE_MS` can be used.

# Resources

Used interrupts on Cortex-M3:
- SysTick
- PendSV
- SVC

These interrupts are not available for the application.

Memory (typical sizes):
- Flash: 6 kB
- RAM: 300-500 bytes


# General

## Real-Time Requirements

Typically, applications of this type include a mix of both hard and soft real-time requirements


- Soft real-time requirements:
    - time deadline
    - but breaching deadline does not render the system useles
    - i.e. GUI (user interaction)
- Hard real-time:
    - time deadline
    - breaching the deadline: absolute failure of the system
    - i.e. security related code in cars
- Applications typically combine both types of real-time rocessing


# Blocking a Task

- A task can be blocked if it currently has nothing to do
- `vTaskDelay()` is usually called for a task to enter the blocked state
- `vTaskDelayUntil()` should be used when a *fixed* execution period is required (e.g. DSP)
