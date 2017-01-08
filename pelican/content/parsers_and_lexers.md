Title: Parsers and Lexers
Category: Software Development
Date: 2017-01-08
Modified: 2017-01-08
Status: draft

> Most material on this page is from [Udacity: Programming Languages](https://de.udacity.com/course/programming-languages--cs262/)


Source --[Lexer (break up in words)]--> Tokens --[Parser (understand the structure)]--> AST --[Find meaning]-> ...

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
