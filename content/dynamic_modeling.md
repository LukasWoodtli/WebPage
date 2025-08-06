---
title: Dynamic Modeling
category: Robotics
tags: [Control Systems]
---

Creating a dynamic model of a system involves multiple steps.

1. Identify objective for simulation
   - what do we want to accomplish
   - define which inputs should be related to which outputs
2. Draw a schematic diagram, labeling process variables
    - label relevant process variables
3. List all assumptions
   - used also to simplify model
4. Determine spatial dependence
   - Yes: Partial Differential Equation (PDE)
   - No: Ordinary Differential Equation (ODE) 
5. Write dynamic balances for conserved quantities 
   - energy
   - mass
   - momentum (Impuls)
   - electric charge
   - species (chemistry)
6. Add other relations
   - geometry
   - thermodynamics
   - reactions
   - ...
7. Degrees of freedom: number of equations = number of unknown variables?
8. Classify inputs as 
   - Fixed constants
   - Disturbances (cannot be controlled, might or might not be measurable)
   - Manipulated variables (manually or by solver/controller)
9. Classify predicted variables (e.g. outputs)
   - States
   - Controlled variables (set point, optimization objective) 
10. Simplify balance equations based on assumptions
11. Simulate steady state conditions (if possible)
12. Simulate the output with an input step: dynamic response 
