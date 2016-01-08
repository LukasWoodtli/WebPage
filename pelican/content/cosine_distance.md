Title: Cosine Distance
Category: Mathematics
Tags: Data Minig, ETH
Date: 2016-01-08
Modified: 2016-01-08

- useful in spaces that have dimensions
    - Euclidian spaces
    - Discrete euclidian spaces (i.e vectors of integers, vector of bools)
    - ...
- Points are thought as *directions*
- No distinction between a vector and a multiple of it

> The Cosine Distance between two points is the *angle* that the vectors to these points make

- The angle will be between $0^{\circ}$ and $180^{\circ}$ regardless of *how many dimensions* the space has

$$d_{cos}(\vec a, \vec b) = arcos  \left ( \frac{\vec a \cdot \vec b}{\| \vec a \|_2 \cdot \| \vec b \|_2}  \right )  = arcos  \left ( \frac{\sum_{i=1}^na_i \cdot b_i}{\| \vec a \|_2 \cdot \| \vec b \|_2} \right )$$


