Title: Intro to SQL
Date: 2015-04-13
Modified: 2016-06-26
Category: Programming
Tags: SQL

Most notes taken here are from the [Udacity SQL course](https://www.udacity.com/course/ud197)

Aggregations
============

Aggregation functions work on the values of a column.

They return a single value.

| Function | Description      |
|----------|------------------|
| FIRST()  | First value      |
| LAST()   | Last value       |
| COUNT()  | Number of rows   |
| MAX()    | Largest value    |
| MIN()    | Smallest value   |
| SUM()    | Sum of column    |
| AVG()    | Average value    |


Not all functions work on all kinds of columns.


Joins
=====

JOIN clause is used to combine rows from several tables.
The combination is based on a common field between them.


There are different JOIN operaions in SQL:

- INNER JOIN: Returns rows when at least one match in *both* tables
- LEFT JOIN: Return *all* rows from left table and *matched* rows from right table
- RIGHT JOIN: the other way round
- FULL JOIN: Return all rows when a match in *one* table

Example:

- 2 Tables:
    - Animals in Zoo (`animals`)
        - `name`
        - `species`
        - `birthdate`
    - Diet of Animals (`diet`)
        - `species`
        - `food`


Example: Which animals eat fisch?

    :::sql
    SELECT
      animals.name,
      animals.species,
      diet.food
    FROM animals JOIN diet
    ON animal.species = diet.species
    WHERE food = 'fish';

Unique Keys
===========

- Primary keys used to identify an entry (row) in a table
- Most [RDBMS](https://en.wikipedia.org/wiki/Relational_database_management_system) can generate unique queues
- Sometimes a table already has a field that can be used as unique primary key

Select Clauses
==============

- LIMIT count [OFFSET skip]
    - count: how many rows to return
    - skip: how far into the result to start

- ORDER BY columns [DESC]
    - columns: which columns to sort by, seperated by comas
    - DESC: sort in reverse order (descending)

- GROUP BY columns
    - used only with aggregations (e.g. count, sum)
    - which columns to use for aggregation

Select example:
    :::sql
    SELECT name, birthday FROM animals WHERE species = 'gorilla' AND name = 'Max';

- `SELECT`: selects *colums*
- `FROM`: table to select from
- `WHERE`: row restriction
