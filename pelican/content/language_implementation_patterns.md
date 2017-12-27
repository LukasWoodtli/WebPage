Title: Language Implementation Patterns
Category: Programming
Tags: Computer Science, Parsing, Design Patterns
Date: 2017-12-14

This page collects notes and citations from the book:

[Language Implementation Patterns by Terence Parr](https://pragprog.com/book/tpdsl/language-implementation-patterns)

Some of my examples can be foudn [here](LukasWoodtli/LanguageImplementationPatterns)


[TOC]

# Getting Started with Parsing

## Basic Parsing Patterns

*"The act of recognizing a phrase by computer is called **parsing**."*

*"You can think of grammars as functional specifications or design documents for parsers."*

*"Grammars are more than designs, though. They are actually executable 'programs' written in a domain-specific language (DSL) specifically designed for expressing language structures."*

### Identifying Phrase Structure

*"Vocabulary symbols (tokens) play different roles like variable and operator. We can even identify the role of token subsequences like expression."*

*"Parse trees are important because they tell us everything we need to know about the syntax (structure) of a phrase."*

*"To parse [is to generate] a two-dimensional parse tree from a flat token sequence."*

### Building Recursive-Descent Parsers

*"A parser checks whether a sentence conforms to the syntax of a language."*

*"A language is just a set of valid sentences."*

*"A top-down parser [...] starts at the top of the parse tree and works its way down to the token leaf nodes."*

*"Recursive-Descent Parser*

- ***Descent** refers to its top-down nature, and*
- ***Recursive** refers to the fact that its functions potentially call themselves."*

*"Nesting in a parse tree begets [(Kind zeugen)] recursion in a recursive-descent parser."*


*"LL(1)*

- *The first **L** means 'read the input from left to right.'*
- *The second **L** means 'descend into parse tree children from left to right.'"*

### Parser Construction Using a Grammar DSL

*"[We can use] a DSL specifically designed for describing languages. 'Programs' in this DSL are called **grammars**. Tools that translate grammars to parsers are called **parser generators**."*


*"Grammars are [...] functional specifications for languages."*

*"Substructures in the parse tree and functions in the parser correspond to **rules** in a grammar."*

*"[Lexer:] combining input characters into vocabulary symbols (tokens)."*

### Tokenizing Sentences

*"Recognizers that feed off character streams are called **tokenizers** or **lexers**"*

*"At the character level, we refer to syntax as the **lexical structure**."*

*"Grammars describe language structures, and so we can also use them for lexical specifications."*

*"Lexical rules start with an uppercase letter"*

*"Lexer and parser design patterns [...] are nearly identical. [...] The only difference lies in the type of their input symbols, characters or tokens."*


### Pattern 1: Mapping Grammars to Recursive-Descent Recognizers

*"Even when building lexers and parsers by hand, the best starting point is a grammar."*

*"**Left recursion** results in an infinite method invocation loop."*

*"The following rule yields a parser that does not terminate:*"

    :::antlr-java
    r : r X ;

*"we’d end up with a function that immediately called itself"*

    :::java
    void ​ r() { r(); match(X); }

*"Besides left-recursive rules, there are other grammar constructs that yield **nondeterministic** recursive-descent recognizers. A nondeterministic recognizer cannot decide which path to take."*

*"A grammar, G, is a set of rules from which we generate a class definition (in any object-oriented programming language) containing a method for each rule"*

*"For each rule, r, defined in a grammar, we build a method of the same name"*

*"Token references for token type `T` become calls to `match(T)`. match is a support method in Parser that consumes a token if `T` is the current lookahead token. If there is a mismatch, match throws an exception."*


#### Alternatives

*"Alternatives become either a switch or an if-then-else sequence"*

![Alternatives](/images/language_implementation_patterns/alternatives.svg)

    :::java
    switch (<lookahead-token>) {
      case <token1-predicting-alt1>:
      case <token2-predicting-alt1>:
        <match-alt1>
        break​;
      case <token1-predicting-alt2>:
      case <token2-predicting-alt2>:
        <match-alt2>
        break​;
      case <token1-predicting-altN>:
      case ​<token2-predicting-altN>:
        <match-altN>
        break​;
      default:
        <throw​-exception>
      }



    
#### Optional subrule `(T)?`

![Option](/images/language_implementation_patterns/option.svg)

    :::java
    if (<lookahead-is-T>) { match(T);} // no error else clause


#### One or more `(...)+` subrules

![One or more](/images/language_implementation_patterns/one_or_more.svg)

    :::java
    do { <code-matching-alternatives> }
    while(<lookahead-predicts-an-alt-of-subrule>);


    
#### Zero or more `(...)*` subrules

![Zero or more](/images/language_implementation_patterns/zero_or_more.svg)


    :::java
    while(<lookahead-predicts-an-alt-of-subrule>) {
      <code-matching-alternatives> }


### Pattern 2: LL(1) Recursive-Descent Lexer

*"Lexers derive a stream of tokens from a character stream by recognizing lexical patterns. Lexers are also called **scanners**, **lexical analyzers**, and **tokenizers**."*

*"This pattern can recognize nested lexical structures such as nested comments"*

*"The goal of the lexer is to emit a sequence of tokens. Each token has two primary attributes: a **token type** (symbol category) and the text associated with it."*


### Pattern 3: LL(1) Recursive-Descent Parser

*"It's the weakest form of recursive-descent parser but the easiest to understand and implement."*

*"To make parsing decisions, the parser tests the current lookahead token against the alternatives' lookahead sets. A lookahead set is the set of tokens that can begin a particular alternative."*

*"Formally, we compute lookahead sets using two computations: FIRST and FOLLOW. In practice, though, it's easier to simply ask ourselves, 'What tokens can possibly start phrases beginning at this alternative?'"*

#### Deterministic Parsing Decisions

*"LL parsing decisions work only when the lookahead sets predicting the alternatives are disjoint"*

*"If the lookahead sets overlap, though, the parser is **nondeterministic**-it cannot determine which alternative to choose."*

*"Building an LL(1) parser is the easiest way to learn about parsers. In practice, though, we really need more than a single token of lookahead."*


### Pattern 4: LL(k) Recursive-Descent Parser

*"The strength of a recursive-descent parser depends entirely on the strength of its lookahead decisions."*

*"Having more lookahead is like being able to see farther down multiple paths emanating from a fork in a maze. The farther we can see ahead, the easier it is to decide which path to take. More powerful parsing decisions make it easier to build parsers."*


*"For example, we want to recognize input such as `[a, b=c, [d,e]]`"*


    :::antlr-java
    list : '[' elements ']' ;
    elements : element (​ ',' ​ element)* ;
    element : NAME '=' NAME
            | NAME
            | list
            ;

*"`element` [is] non-LL(1) since the first two alternatives start with the same `NAME` token."*


*"The lookahead depth **k** in LL(k) is really a maximum not the exact, fixed amount of lookahead each parsing decision uses."*


