Regular Expressions
###################

:date: 2016-10-07
:modified: 2016-10-07
:category: Programming
:tags: Computer Science


Most notes are from `Mastering Python Regular Expressions <https://www.packtpub.com/application-development/mastering-python-regular-expressions>`_

My Repository on `GitHub <https://github.com/LukasWoodtli/MasteringPythonRegularExpressions>`_


Metacharacters
==============

Twelve Metacharacters:

- Backslash :code:`\`
- Caret ``^``
- Dollar ``$``
- Dot ``.``
- Pipe ``|``
- Question mark ``?``
- Asterisk ``*``
- Plus ``+``
- Opening and closing parenthesis ``(`` and ``)``


Character Classes
=================

- Also known as character sets
- Grouped in ``[`` and ``]``
- Example: Hex number ``[0-9a-fA-F]``
- Invert character set with ``^``

Predefined Character Classes
----------------------------

Available in Python

+---------+-----------------------------------------------------------------+
| Element | Description                                                     |
+=========+=================================================================+
| ``.``   | Any character except newline ``\n``                             |
+---------+-----------------------------------------------------------------+
| ``\d``  | Decimal digit, equivalent to ``[0-9]``                          |
+---------+-----------------------------------------------------------------+
| ``\D``  | Any non-digit character, equivalent to ``[^0-9]``               |
+---------+-----------------------------------------------------------------+
| ``\s``  | Any whitespace character, equivalent to ``[ \t\n\r\f\v]``       |
+---------+-----------------------------------------------------------------+
| ``\S``  | Any non-whitespace character, equivalent to ``[^ \t\n\r\f\v]``  |
+---------+-----------------------------------------------------------------+
| ``\w``  | Any alphanumeric character, equivalent to ``[a-zA-Z0-9_]``      |
+---------+-----------------------------------------------------------------+
| ``\W``  | Any non-alphanumeric character, equivalent to ``[^a-zA-Z0-9_]`` |
+---------+-----------------------------------------------------------------+


POSIX Character Classes
-----------------------

- POSIX defines some classes: `Wikibooks <https://en.wikibooks.org/wiki/Regular_Expressions/POSIX_Basic_Regular_Expressions#Character_classes>`_
- not available in Python


