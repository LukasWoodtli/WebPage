---
title: Intro to SQL
date: 2015-04-13
modified: 2016-06-26
category: Programming
tags: [SQL]
---
Most notes taken here are from the [Udacity SQL course](https://www.udacity.com/course/ud197) and
[PostgreSQL Essentials: Leveling Up Your Data Work by Haki Benita](https://learning.oreilly.com/course/postgresql-essentials-leveling/0790145594945/).

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

```sql
SELECT
  animals.name,
  animals.species,
  diet.food
FROM animals JOIN diet
ON animal.species = diet.species
WHERE food = 'fish';
```

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
```sql
SELECT name, birthday FROM animals WHERE species = 'gorilla' AND name = 'Max';
```

- `SELECT`: selects *colums*
- `FROM`: table to select from
- `WHERE`: row restriction


# PostgreSQL

## Administration

### Create Database
```
CREATE DATABASE <db-name> OWNER <user>;
```

From command-line: `createdb <db-name> -O <user>`

### Connect to a Database

```
\connect <db-name>
```

### List Databases

`\l`

## Tables

### Create Table

```
CREATE TABLE [IF NOT EXISTS] <table-name> (
    <column-name0> <datatype> <additional configuration>,
    <column-name1> <datatype> <additional configuration>,
    ...
);
```

Example:

```
CREATE TABLE person (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT,
    verified BOOLEAN
);
```

### Drop Table

```
DROP TABLE [IF EXISTS] <table-name>;
```

### Change Table Definition

```
ALTER TABLE <table-name> ALTER COLUMN <column-name> [...];
```

### Show Table Schema (describe)

```
\d <table-name>
```

List all lists (can be filtered by pattern with wildcards)
```
\dt [pattern]
```

### Insert Data

```
INSERT INTO <table-name> (<column-name>) VALUES (<data>);
```

## Views

Views can be seen as named queries. Query is executed every time the view is accessed.

Materialized view: store result of view, but not refreshed automatically.


### Create View

```
CREATE VIEW <view-name> AS <sql-query>;
```

## Schema

Schema in Postgres has a different meaning than in other DBMS.

- Print search path: `SHOW search_path;`
- Set search path: `SET search_path TO <entries>;`


| Pattern           | Example                     | Type        |
|-------------------|-----------------------------|-------------|
| *db.schema.table* | `mydb.authentication.users` | qualified   |
| *schema.table*    | `authentication.users`      | qualified   |
| *table*           | `users`                     | unqualified |

Schemas can be use to implement Multi-Tenancy. Use a schema for each tenant.
Shared tables are added to the `public` schema.


## Constraints

- Column types
- Not `NULL`
- Primary key:
  - must be unique
  - must exist (not `NULL`)
  - max one primary key per table
  - can be combined from multiple columns (composite primary key)
- identity column (sequence of unique key)
  - can be generated either always or just as default (if value not provided)
- Unique constraint (automatically creates an index)

### Constraint Validation

- Check constraint (`CHECK`)

### Foreign Keys

Constraint to enforce a 'link' to a column in a table.

Special cases:

- `CASCADE`: If a row with a foreign key is deleted, the row that the key is pointing to is also deleted.
- `RESTRICT`: Don't allow to delete rows that still have a foreign key for an existing row.

> Add constraints from beginning. It's easier to remove unused constraints than to add new ones.

If adding constraints to existing tables, do it in two steps:

1. add constraint without check
2. validate constraints

## Users and Permissions

Permissions can be granted to users and roles.
Roles can be assigned to users.

### Creating Users

```
CREATE USER <user-name> PASSWORD <password>;
```

### Connecting to a Database with a User

```
\connect <db-name> <uer-name>
```

Using `psql`:

```
psql -d <db-name> -U <user-name> -W
```

- `-d`: Name of the database
- `-U`: Name of the user
- `-W`: Ask for password

### Add Permissions

On table:

```
GRANT <operation> ON <db-name> TO <user-name>;
```

Where `<operation>` is (one or multiple of):

- `SELECT`
- `INSERT`
- `UPDATE`
- `DELETE`
- `TRUNCATE`
- ...

On schema:

```
GRANT USAGE ON SCHEMA <schema-name> TO <user-name>;
```

Permissions can also be granted to databases:

- `CONNECT`
- `CREATE`
- ...

### Revoke Permissions

On table:

```
REVOKE <operation> ON <db-name> FROM <user-name>;
```

## Setup Postgres in a container

Create `docker-compose.yml` with the following content:

```yaml
services:
  db:
    image: postgres:18.1-trixie
    restart: always
    # set shared memory limit when using docker compose
    shm_size: 128mb
    environment:
      POSTGRES_USER: adminuser
      POSTGRES_PASSWORD: password

  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
```

### Start DB in container

```
docker compose up -d
```

### Access DB container

```
docker compose exec db bash
```

### Launch `psql`

```
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --db-name "$POSTGRES_DB"
```
