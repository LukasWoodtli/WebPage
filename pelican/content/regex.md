Title: Regular Expressions
Date: 2016-10-07
Modified: 2016-10-07
Category: Programming
tags: Computer Science


Most notes are from [Mastering Python Regular Expressions](https://www.packtpub.com/application-development/mastering-python-regular-expressions)

My Repository on [GitHub](https://github.com/LukasWoodtli/MasteringPythonRegularExpressions)


Metacharacters
==============

Twelve Metacharacters:

- Backslash `\`
- Caret `^`
- Dollar `$`
- Dot `.`
- Pipe `|`
- Question mark `?`
- Asterisk `*`
- Plus `+`
- Opening and closing parenthesis `(` and `)`


Character Classes
=================

- Also known as character sets
- Grouped in `[` and `]`
- Example: Hex number `[0-9a-fA-F]`
- Invert character set with `^`

Predefined Character Classes
----------------------------

Available in Python

| Element | Description                                                     |
|---------|-----------------------------------------------------------------|
| `.`     | Any character except newline `\n`                               |
| `\d`    | Decimal digit, equivalent to `[0-9]`                            |
| `\D`    | Any non-digit character, equivalent to `[^0-9]`                 |
| `\s`    | Any whitespace character, equivalent to `[ \t\n\r\f\v]`         |
| `\S`    | Any non-whitespace character, equivalent to `[^ \t\n\r\f\v]`    |
| `\w`    | Any alphanumeric character, equivalent to `[a-zA-Z0-9_]`        |
| `\W`    | Any non-alphanumeric character, equivalent to `[^a-zA-Z0-9_]`   |


POSIX Character Classes
-----------------------

- POSIX defines some classes: [Wikibooks](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX_Basic_Regular_Expressions#Character_classes>)
- not available in Python


Alternation
===========

- Alternation (or) is marked with `|`

Quantifiers
===========

Quantifiers can be applied to characters, character sets, and to groups

- Optional (0 or 1 repetition): `?`
- Zero (0) or more times: `*`
- One (1) or more times: `+`
- Exact repetition and ranges: `{}`
    - Exactly `n` times: `{n}`
    - Between `n` and `m` times (both inclusive): `{n,m}`
    - At least `n` times: `{n,}`
    - At most `n` times: `{,n}`

Greedy and Reluctant Quantifiers
--------------------------------

- greedy quantifiers will try to match as much as possible
    - default behavior
    - biggest possible result
- reluctant (non-greedy, lazy) will try to have smalles match possible
    - extra `?` to quantifier: `??`, `*?` and `+?`

Boundary Matchers
=================

| Identifiers | Match           |
|------|------------------------|
| `^`  | Beginning of a line    |
| `$`  | End of a line          |
| `\b` | At word boundary       |
| `\B` | Anything that is not word boundary (opposite of `\b`) |
| `\A` | Beginning of the input |
| `\Z` | End of the input       |


Python Regex Functions
======================

- `RegexObject` class in `re` module
- wrapper functions in `re` module
- `match` tries to match at beginning of string
    - **pos** and slicing can have different results
- `search` is like *match* in most languages (e.g Perl)
    - tries to match at any position in string
- [Compilation Flags](https://docs.python.org/2/library/re.html#re.compile)


Grouping
========

Used for different purposes

- Creating subexpressions for applying *quantifiers*


