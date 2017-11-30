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

Priority can be changed after the scheduler has started but are never changed by the scheduler itself.

### Selecting Task Priority

Rule of thumb:

Tasks for hard real-time functionalities are assigned priorities above tasks for soft real-time functionalities.

#### Rate Monotonic Scheduling (RMS)

See [Wikipedia:Rate-monotonic scheduling](https://en.wikipedia.org/wiki/Rate-monotonic_scheduling)

Each task is assiged a unique static priority. The priorities are assigned according to the cycle duration of the task.

- Task with the highest execution frequency (shorter cycle) is assigned highest priority is assigned 
- Task with the lowest execution frequency is assigned lowest priority is assigned 

RMS maximizes the *schedulability* of an application.


## Blocking a Task

- A task can be blocked if it currently has nothing to do
- `vTaskDelay()` is usually called for a task to enter the blocked state
- `vTaskDelayUntil()` should be used when a *fixed* execution period is required (e.g. DSP)


## Idle Task Hook

It's possible to add a callback to the idle task.
It is called automatically once per iteration by the idle task loop.

Following rules must be followed:

- The hook function must never block or suspend itself
- If the application make use of `vTaskDelete()` the hook function needs to return to its caller within reasonable time

The idle task is responsible to clean up resources after a task has been deleted.

# Scheduler

The scheduler is executed after each time slice to select the next task.
A periodic (tick) interrupt is used for switching.

The tick interrupt frequency is set by `configTICK_RATE_HZ`.

To convert the number of ticks into milliseconds the constant
`portTICK_RATE_MS` can be used.


## Scheduling Algorithm

FreeRTOS uses a *fixed priority pre-emptive scheduling* algorithm. But it can be configured to use a
cooperative scheduling algorithm.

- Each task has a priority assigned
- Each task has a state
- Only one task is in running state
- The scheduler selects always the highest priority task (in *ready* state) to enter *running* state


# Synchronization

Tasks or ISRs send information to a queue or to a semaphore.
These synchronization events are used to signal asynchronous
activity.

- Semaphores: communicate events
- Queues: communicate events and data

## Queues

- Fixed number and size of data items
- FIFO
- Writing and reading: byte-for-byte copy
- Accessible from multiple tasks
    - multiple writers is common
    - multiple readers is not used often

## Semaphores

Handles to all types of semaphores are stored in variables
of type `xSemaphoreHandle`.

### Binary Semaphores

See [Wikipedia:Semaphore](https://en.wikipedia.org/wiki/Semaphore_(programming))

- Unblock a task each time an IRQ occurs
- Synchronization of tasks with interrupts
- Deferring processing to handler task

Terminology:

- $P()$ operation: 'taking' a semaphore
- $V()$ operation: 'giving' a semaphore


API function `xSemaphoreGiveFromISR(..)`:

- All types of semapores *except recursive semaphores* can be
'given' with `xSemaphoreGiveFromISR()`.
- Output argument `pxHigherPriorityTaskWoken`:
    - if set to pdTRUE a context switch should be performed before ISR exits
    - this context switch needs to be done manually in ISR code
    - the scheduler will switch to the highes prioriy task (in ready state)

    
### Counting Semaphores

Use cases:

1. Counting events
    - Count value: difference between number of occured events and number of processed events
    - Created with an initial count value of zero
2. Resource management
    - Count value: indicates number of available resources
    - Created with an initial count value equal to number of available resources

# IRQs

Event processing:

1. Detect event
    - IRQs
    - polling
2. IRQs
    - how much processing in ISR
    - how much in main code
3. Communication of IRS to main code

> Only API functions and macros ending in `FromISR` or `FROM_ISR`
> are allowed to be called from interrupt service routines.

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


