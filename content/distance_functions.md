---
title: Distance Functions and Metrics
category: Mathematics
tags: [Data Minig]
date: 2015-09-26
modified: 2015-09-26
---

Distant Functions
=================

A distant function works on two elements (i.e. vectors, sets...).

A given distance function $d(s,t)$ needs to fulfill properties:

1. $d(s,t) \geq 0$ (non-negative)
2. $d(s,s) = 0$ (distance to itself is zero)
2. $d(s,t) = d(t,s)$ (symmetric)
3. $d(s,t) + d(t,r) \geq d(s,r)$ ([triangle inequality](https://en.wikipedia.org/wiki/Triangle_inequality))


Metric
======

A metric requires an additional property in addition to the four properties of a distant function:

- $d(x, y) = 0$ if and only if  $x = y$ (coincidence axiom)

> Two given elements with no distance to each other must be the same element


Jaccard Similarity
==================

$Sim(A,B) = \frac{|A \cap B|}{|A \cup B|}$


Jaccard Distance
================

$d(A,B) = 1 - \frac{|A \cap B|}{|A \cup B|}$

