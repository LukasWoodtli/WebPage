Title: Parsers and Lexers
Category: Programming
Tags: Parsing, Computer Science
Date: 2017-01-08
Modified: 2018-01-09

> Most material on this page is from [Udacity: Programming Languages](https://de.udacity.com/course/programming-languages--cs262/)


`Source --[Lexer (break up in words)]--> Tokens --[Parser (understand the structure)]--> AST --[Find meaning]-> ...`

- Lexical Analysis (Lexing): String -> Token List
- Syntatical Analysis (Parsing): Token List -> Valid in Grammar?

# Grammars

- Terminals
- Non-terminals
- Rewrite rule / derivations

Recursion (recursive rewrite rules) in a context-free grammar can allow an *infinite* number of valid sentences in the language.

# Grammars and Regular Expressions

- Grammars are more powerful than Regular Expressions
- *Regular Expressions* describe *Regular Languages*
- *Grammars* describe *Context Free Languages*

*"A language **L** is a **context-free language** if there exists a context-free grammar **G** such that the set of strings accepted by **G** is exactly **L**. Context-free languages are strictly more powerful than regular languages. (i.e., context-free grammars are strictly more powerful than regular expressions.)"*


Programming Languages Analogy
=============================

- Expressions := Noun Prases
- Operators := Verbs
- Statements := Setences

Formal Grammar Concepts
=======================

If a language 'L' is *regular*, then that language 'L' is also *context free*.

Language: a set of strings

- Regular language: represented by FSM or Regexp
- Context-free language: represented by context-free Grammar


Using Rewrite Rules
===================

- Closure
- Shift
- Reduce


Function calls:
1. Create a new environment. It's *parent* is the current environment.
2. Create storage places in the new environment for each *formal parameter*.
3. Fill these placeswith the values of the *actual arguments*
3. Evaluate the *function body* in the new environment.


Comparison of LL- and LR-Parsers
================================

This overview is assembled mostly from
[LL and LR Parsing Demystified](http://blog.reverberate.org/2013/07/ll-and-lr-parsing-demystified.html)


|             | LL Parser                     | LR Parser                     |
|-------------|-------------------------------|-------------------------------|
| traversal   | pre-order  (visit the parent node before the children)    | post-order (visit the parent node after the children) |
| derivations | leftmost derivation           | reversed rightmost derivation |
| direction   | top-down                      | bottom-up                     |
| alternative description | predictive parser | shift-reduce parser           |

