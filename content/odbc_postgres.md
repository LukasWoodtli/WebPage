---
title: ODBC and PostgreSQL
category: Programming
tags: [SQL]
---
This page collects just some random, incomplete information about ODBC and PostgreSQL on Linux.


# Tools

- `psql`: Command line tool to access the Postgres server and databases
- `isql`: Tool to manage ODBC
  - Run it like `isql -v <driver> <user> <password>`) (e.g. `isql -v PostgreSQL postgres postgres`)
- `odbcinst`: Information about ODBC installation
- `odbc_config`: Information about the ODBC configuration


# Files

- `pg_hba.conf`: Users and authentication for PostgreSQL
  - find location: `psql -t -P format=unaligned -c 'show hba_file';`
- `/etc/odbcinst.ini`: Driver setup
- `/etc/odbc.ini`: DB/connection setup
