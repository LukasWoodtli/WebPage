---
title: Complex Numbers
category: Mathematics
---

# Imaginary Unit

The imaginary number $j$ is defined:

$$j^2 = -1$$

- it is often named $i$ instead of $j$. But this can be confused with the electrical current.

# Complex Numbers

Extend the real number system $\mathbb {R}$ to the complex number system $\mathbb {C}$ by introducing complex numbers in the form:

$$z = a + bj$$

where:

- $z \in \mathbb{C}$: complex number
- $a \in \mathbb{R}$: real part
- $b \in \mathbb{R}$: imaginary part
- $j$: imaginary unit such that $j^2 = -1$

The real numbers are a subset of the complex numbers: $\mathbb{R} \subset \mathbb{C}$

The set of all complex numbers is defined as:

$$\mathbb{C} = \{z = a + bj | a,b \in \mathbb{R}\}$$


## Matrix Representation

### Complex Number

$$Z = \begin{pmatrix}a&-b\\b&\;\;a\end{pmatrix}$$

### Imaginary Unit

$$J = \begin{pmatrix}0&-1\\1&\;\;0\end{pmatrix}$$

With

- $J^2 = \begin{pmatrix}0&-1\\1&\;\;0\end{pmatrix} \begin{pmatrix}0&-1\\1&\;\;0\end{pmatrix} = \begin{pmatrix}-1&\;\;0\\\;\;0&-1\end{pmatrix} = -I$
- $\operatorname {Re} (Z)=a={\frac {1}{2}}\operatorname {tr} (Z)$
- $\operatorname {Im}(Z)=b$
- $\operatorname{abs}(Z) = \sqrt{a^2 + b^2} = \sqrt{\det Z}$
- ${\displaystyle {\overline {Z}}={\begin{pmatrix}\;\;a&b\\-b&a\end{pmatrix}}=Z^T}$

## Polar Form

$$z=r\,(\cos \varphi + j \sin \varphi )$$

### Euler's Form

$$z=r\;e^{j \varphi}$$

Relations:

- $cos(\varphi) = \frac{e^{j\varphi} + e^{-j\varphi}}{2}$
- $sin(\varphi) = \frac{e^{j\varphi} - e^{-j\varphi}}{2}$

### Conversions

- $a$: real part of a complex number $z$
- $b$: imaginary part of a complex number $z$
- $r$: absolute value of a complex number $z$
- $\varphi$: argument of a complex number $z$

#### From Algebraic form to Polar form

- $r = |z| = \sqrt{a^2 + b^2}=\sqrt{z \cdot \overline z}$
- $\varphi =\arg(z)= \operatorname {arctan2} (a,b) = {\begin{cases}\;\;\;\arccos {\frac {a}{r}}&{\text{für }}b\geq 0\\-\arccos {\frac {a}{r}}&{\text{für }}b<0\end{cases}}$

#### From Polar form to Algebraic form

- $a=\operatorname {Re} (z)=r\cdot \cos \varphi$
- $b=\operatorname {Im} (z)=r\cdot \sin \varphi$

### Polar form in Matrix representation

With $z=r\,(\cos \varphi + j \sin \varphi )$

$$Z = \begin{pmatrix}a&-b\\b&\;\;a\end{pmatrix} = \begin{pmatrix}r\;\cos \varphi&-r\;\sin \varphi\\r\;\sin \varphi&\;\;\;r\;\cos \varphi\end{pmatrix}= r\begin{pmatrix}\;\cos \varphi&-\sin \varphi\\\;\sin \varphi&\;\;\;\;\cos \varphi\end{pmatrix}$$


# Operations

## Absolute value

Also called modulus or magnitude.

$$|z|=\sqrt {a^{2}+b^{2}}$$


## Complex Conjugate

Given:

- $z=a+bj$

$$\overline{z} = a -bj$$


Properties:
- $z \cdot \overline{z} = |z|^2$
- $z^{-1} = \frac{1}{|z|^2} \cdot \overline{z}, z \neq 0$
- $\overline{z_1 + z_2} = \overline{z_1} + \overline{z_2}$
- $\overline{z_1 \cdot z_2} = \overline{z_1} \cdot \overline{z_2}$
- $\overline{\overline{z}} = z$
- $\operatorname {Re} (z) = \frac{z + \overline{z}}{2}$
- $\operatorname {Im} (z) = \frac{z - \overline{z}}{2j}$


### Complex Conjugate in Euler form

$$\bar {z}=r\cdot \mathrm {e} ^{-j\varphi}$$

## Inverse

$$z^{-1} = \frac{1}{|z|^2} \cdot \overline{z}, z \neq 0$$

### Inverse in Polar form

$$z^{-1} = \frac{1}{r} \cdot (cos(\varphi) - sin(\varphi)j)$$

## Addition and Subtraction

Given:

- $z_1=a_1+b_1j$
- $z_2=a_2+b_2j$

$$z_1+z_2 = (a_1+a_2)+(b_1+b_2)j$$

$$z_1-z_2 = (a_1-a_2)+(b_1-b_2)j$$

Properties:

- Identity element: $z = 0 + 0j = 0$
- Inverse element: $-z = -a -bj$
- Commutative property: $z_1 + z_2 = z_2 + z_1$
- Associative property: $(z_1 + z_2) + z_3 = z_1 + (z_2 + z_3)$

> It's not possible to perform addition and subtraction directly
> in the polar form. The numbers need to be converted to the algebraic
> form first.

## Multiplication

$$z_1 \cdot z_2 = (a_1a_2-b_1b_2)\cdot(a_1b_2+a_2b_1)j$$


Properties:

- Identity element: $z = 1 + 0j = 1$
- Inverse element (for $\mathbb{C}\setminus \{0\}$): $z^{-1} = \frac{1}{|z|^2}(a -bj)$
- Commutative property: $z_1 \cdot z_2 = z_2 \cdot z_1$
- Associative property: $(z_1 \cdot z_2) \cdot z_3 = z_1 \cdot (z_2 \cdot z_3)$
- Distributive property: $z_1 \cdot (z_2 + z_3) = z_1 \cdot z_2 + z_1 \cdot z_3$

### Multiplication in Euler's Form

Multiplication with real scalar:

$$ z\cdot x=rx\cdot \mathrm {e} ^{\mathrm {j} (\varphi )}$$

Multipying two complex numbers:

$$ z_{1}\cdot z_{2}=r_{1}r_{2}\cdot \mathrm {e} ^{\mathrm {j} (\varphi _{1}+\varphi _{2})}$$


## Division

Division can be calculated with the inverse of a complex number.

$$z = \frac{z_1}{z_2} = z_1 \cdot z_2^{-1} = \frac{1}{|z_2|^2} \overline{z_2} \cdot z_1$$

if $z_2 \neq 0$

### Division in Polar Form

$$z = \frac{z_1}{z_2} = z_1 \cdot z_2^{-1} = \frac{r_1}{r_2} (cos(\varphi_1 -\varphi_2) + sin(\varphi_1 -\varphi_2)j)$$


## n-th Root

$$z^{1/n}={\sqrt[{n}]{r}}\left(\cos \left({\frac {\varphi +2k\pi }{n}}\right)+\sin \left({\frac {\varphi +2k\pi }{n}}\right)j\right)$$

for $ 0 \leq k \leq n-1$

The the $n$ th root is a $n$-valued function of z (multiple solutions).

## Complex Exponential

With: $z = a + bj$

$$e^z = e^{a + bj} = e^a \cdot e^{bj} = e^a \cdot (cos(b) + sin(b)j)$$

Properties:

- $\overline{e^{j \varphi}} = e^{-j \varphi}$
- $\overline{e^z} = e^{\overline{z}}$
- $e^{z_1} \cdot e^{z_2} = e^{z_1 + z_2}$
- $e^{k \cdot 2\pi j} = 1, \;k \in \mathbb{Z}$
- $f(z) = e^z$ is a *periodic* function (period: $p=2\pi j$): $e^{z + k\cdot 2 \pi j} = e^z, \; k \in \mathbb{Z}$

## Complex Logarithm

With: $z = a + bj$

$$ln(z) = ln(|z|) + j \cdot arctan(\frac{b}{a})$$

for $z \neq 0$ and $-\pi \leq arctan(\frac{b}{a}) \lt \pi$ 

# Phasor

A real-valued sinusoid ($A\cos(\omega t+\theta )$) with constant amplitude $A$ can be representes in complex (phasor) form:

$$A\cos(\omega t+\theta )+i\cdot A\sin(\omega t+\theta )=Ae^{i(\omega t+\theta )}=Ae^{i\theta }\cdot e^{i\omega t}$$

This can be written as: 

- Magintude: $A$
- Angle: $\theta$

$$A\angle \theta$$

Phasors simplify linear operations of snusoid funcions.

