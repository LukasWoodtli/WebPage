Title: Visualization of Functions
Date: 2017-04-03
Category: Mathematics
Tags: Calculus

Some notes how to visualize mathematical functions.

[TOC]


## Domain and Range

- Input space: domain
- Output space: range or codomain


## Graphs (single variable functions)

- Showing both 'input space' and 'output space'
- limited in dimension
- used for:
    - single-variable functions
    - multivariable functions with a tow-dimensional input and a one-dimensional output (represent all points of the form $(x, y, f(x, y))$)

![2D Graph](/images/visualization_of_functions/1_2d_graph.png)

![3D Graph](/images/visualization_of_functions/2_3d_graph.png)


## Contour Maps

- Show only the input space
- outputs values represent should be evenly spaced (easier to understand)
- useful for functions with a two-dimensional input and a one-dimensional output

![Contour Map](/images/visualization_of_functions/3_contour_map.png)


## Parametric Curves/Surfaces

- Show only the output space
- used for functions whose output space has more dimensions than the input space
- input information is lost

![Parametric Surfaces](/images/visualization_of_functions/4_parametric_surfaces.png)


## Vector Fields

- Used for functions with same numbers of dimensions in the input space as in the output space
- Associates a vector with each point in space
- The vector lengths are usually not drawn to scale (but proportional to each other)
- Sometimes colours are used to indicate the length of the vectors

![Vector Fields](/images/visualization_of_functions/5_vector_fields.png)


## Transformations

- Watch (or imagine) how each input point moves to its corresponding output space
- have to be represented as animations or a schematic drawing
- useful for gaining conceptual understanding
- impractical for representing functions precisely
- Can be used for functions with any dimensions in the input- and output space


## Plots

The plots were made with Octave with [this script](https://gist.github.com/LukasWoodtli/097074b49ad55c6058fbccc11f8b4848).
