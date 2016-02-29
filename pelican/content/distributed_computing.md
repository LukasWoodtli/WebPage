Title: Principles of Distributed Computing
Category: Computer Science
Tags: ETH
Date: 2016-02-28
Modified: 2016-02-28


# Vertex Coloring

- Application: Allocate frequencies to nodes
- Model system as a graph

Task:
Color the nodes of the graph such that *no* two neighbors share the same color.

- Symmetry breaking problem
- Each node can communicate with its neighbors
- Initially nodes have ID's: $\log n$ bits

Definitions:

- $n$: Number of nodes
- $m$: Number of edges
- $\delta$: Degree, number of edges for a node
- $\Delta$: max $\delta$
- $\chi (G)$: Chromatic number, min number of colors needed to color the graph


## Synchronous Model

1. send message to neighbors (messages should be small $\approx \log n$ bits)
2. receive message from neighbors
3. compute! (reasonable computation)

- Begin again at 1.

Speed is everything!

> Time complexity: number of rounds


## Tree Coloring

Tree: Graph with no cycles

Root trees: one 'starting' node

> $\chi (G) = 2$
