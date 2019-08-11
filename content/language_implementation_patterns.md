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

*"we'd end up with a function that immediately called itself"*

    :::java
    void r() { r(); match(X); }

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
        break;
      case <token1-predicting-alt2>:
      case <token2-predicting-alt2>:
        <match-alt2>
        break;
      case <token1-predicting-altN>:
      case <token2-predicting-altN>:
        <match-altN>
        break;
      default:
        <throw-exception>
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
    elements : element ( ',' element)* ;
    element : NAME '=' NAME
            | NAME
            | list
            ;

*"`element` [is] non-LL(1) since the first two alternatives start with the same `NAME` token."*


*"The lookahead depth **k** in LL(k) is really a maximum not the exact, fixed amount of lookahead each parsing decision uses."*


## Enhanced Parsing Patterns

### Parsing with Arbitrary Lookahead

*"[Some] language constructs [...] only differ on the right side. For example, C++ function definitions and declarations are identical until the parser sees `;` or `{` :"*

    :::cpp
    void bar() {...} // a function definition
    void bar(); // a function declaration

*"function headers can be arbitrarily long, the distinguishing token does not appear at a fixed lookahead position from the left side of the statement."*

*"The parser can speculatively parse as far ahead as it needs."*

*"Speculatively matching the alternatives of a rule effectively orders them. The first alternative that matches wins. This is great because we can use ordering to specify precedence."*

*"With ordered alternatives, there is no ambiguity because the parser consistently chooses the first of two ambiguous alternatives. By having the parser pay attention to the order of alternatives"*

*"Though speculative parsing has a lot of advantages, there are two drawbacks. First, it can make debugging more difficult. When the parser speculatively parses ahead, it's easy to get lost with all of the scanning ahead and rewinding. Second, backtracking can be extremely slow. Fortunately, we can fix the efficiency issue."*


### Parsing like a Pack Rat

*"Almost by definition, we use backtracking parsers only when we need to distinguish between similar language constructs. If the constructs are similar, the associated grammar likely contains repeated references to the same rule."*

### Directing the Parse with Semantic Information

*"The parsers we're working with in this book recognize **context-free languages**. A context-free language is a language whose constructs don't depend on the presence of other constructs.
Unfortunately, some programming languages have context-sensitive phrases. To handle context-sensitive phrases with a context-free parser, we have to predicate alternatives. In effect, a predicate is just a run-time boolean test that says when it's OK to match an alternative. The predicates gate the associated alternatives in and out."*


*"In C++, the expression `T(6)` is either a function call or a constructor-style typecast depending on whether `T` is a function or type name. A C++ parser literally does not know how to interpret `T(6)` without seeing the definition of `T`. Such a construct is **context sensitive** and, in this case, ambiguous from a purely syntactic point of view."*

*"Ambiguous grammars lead to **nondeterministic parsers**"*


### Pattern 5 Backtracking Parser

*"This pattern adds speculative parsing support (arbitrary lookahead) to any recursive-descent recognizer."*

*"[...] we can't map all grammars to recursive-descent parsers. Only **non-left-recursive grammars** work (no rule can directly or indirectly invoke itself without consuming a token)."*

*"[...] we can't always get properly functioning (deterministic) parsers even from non-left-recursive grammars. The problem is that fixed lookahead LL parsers need the lookahead sets predicting alternatives to be disjoint."*

*"This pattern overcomes this lookahead issue by allowing arbitrary lookahead [...]. To look arbitrarily ahead, we need infrastructure to support backtracking. Backtracking also gives us a way to specify the precedence of ambiguous rule alternatives (alternatives that can match the same input). Backtracking parsers, by definition, try the alternatives in order."*

*"Syntactic predicates are grammar fragments that specify the lookahead language predicting an alternative."*

*"ANTLR's notion of grammars plus syntactic predicates [are called] Parsing Expression Grammars (PEGs)"*

*"In the functional language world, syntactic predicates are called **parser combinators**"*


*"Syntactic predicates and speculative parsing are extremely useful when parsing phrases that look the same from the left edge. Distinguishing between C++ function definitions and declarations is a prime example"*

#### Dealing with Actions While Backtracking

*"Either we disallow actions or disallow actions with side effects, or we parse winning alternatives twice."*

*"During speculation, all actions are off. Once the parser knows an alternative will match, however, it can match the alternative again "with feeling" to do the actions."*


### Pattern 6 Memoizing Parser

*"This pattern records partial parsing results during backtracking to guarantee linear parsing performance, at the cost of a small amount of memory."*

*"Memoizing is a form of dynamic programming"*

*"Another name for **memoizing recursive-descent parser** is **packrat parser**"*

*"Memoization only helps us, though, if we invoke the same rule at the same input position more than once."*

*"For example, upon input `(3+4);`, a backtracking parser derived from the following rule invokes `expr` twice:"*


    :::antlr-java
    s : expr '!' // assume backtracking parser tries this alternative
      | expr ';' // and then this one
      ;
    expr : ... ; // match input such as "(3+4)"

*"Rule `s` invokes `expr` to speculatively match the first alternative. `expr` succeeds, but `s` finds that the next 
input symbol is `;` and not `!`. Rule `s` rewinds the input and tries the second alternative. The parser immediately calls
`expr` again and at the same input position. [...] To avoid reparsing, all we have to do is remember that `expr` succeeded 
the last time we tried it at this position."*

*"Packrat parsers are guaranteed to have linear performance [and also] linear space complexity."*


### Pattern 7 Predicated Parser

*"This pattern augments any top-down parser with arbitrary boolean expressions that help make parsing decisions."*

*"These boolean expressions are called semantic predicates and specify the semantic applicability of an alternative.
Predicates that evaluate to false effectively "turn off" a parser decision path. From a grammar point of view, false
predicates make alternatives invisible."*

*"We need semantic predicates when the parser cannot use syntax alone to make parsing decisions, that is, when the parser
cannot distinguish between alternatives without using run-time information. The most common case is when we need to use symbol
table information to guide the parse."*


*"Predicates are also useful when a parser must recognize multiple versions of an input language. For example, the GCC C
compiler adds a number of extensions beyond C. Java 5.0 introduced the enum keyword to support enumerated types."*


# Analyzing Languages

## Chapter 4 Building Intermediate Form Trees

*"Only the simplest language applications get away with reading 
input and directly generating output. Such applications are called
**syntax-directed** applications"*

*"The key characteristic of syntax-directed applications is that 
they translate input phrase by phrase using a single pass over
the input."*

*"Most language applications, however, need to build an
**intermediate representation** (IR) or intermediate form."*


*"The goal of an application's reader component is to fill an IR 
data structure with elements of interest from the input stream."*

*"to get a computer to understand a nontrivial sentence, we have to 
break it down into a series of operations and operands."*

*"Once we identify the operators and operands among the input 
tokens, we need to build an IR data structure. For most language 
applications, that means building a tree data structure. In 
particular, we’ll build an **abstract syntax tree** (AST)."*

*"ASTs are the **lingua franca** spoken by the various stages in a 
language application. Each stage performs a computation, rewrites 
the tree, or creates another data structure before passing the tree 
along to the next stage."*


### Why We Build Trees

*"Many languages have subphrases and nested structures."*

*"trees are the perfect data structure to represent ordered and
nested structures. There are two general kinds of trees we’re going
to look at: **parse trees** and **abstract syntax trees**."*

*"Parse trees record the sequence of rules a parser applies as well 
as the tokens it matches. Interior parse tree nodes represent rule 
applications, and leaf nodes represent token matches."*

*"a parser execution trace isn’t really the best IR. Certainly we
need to pinpoint the various substructures, but we don’t need to 
name them explicitly."*

### Building Abstract Syntax Trees

*"An IR tree should be the following:*

- ***Dense**: No unnecessary nodes*
- ***Convenient**: Easy to walk*
- ***Meaningful**: Emphasize operators, operands, and the relationship between them rather than artifacts from the grammar"*

*"it should be easy and fast to identify patterns in the tree. 
Language applications that use intermediate trees usually make 
multiple passes over the trees in order to analyze or build other 
data structures. The structure of intermediate trees should be 
brain-dead simple."*

*"the tree structure should be insensitive to changes in the 
grammar"*

*"Computers only care about operators and operands."*

*"By condensing the input to its essential elements, we decouple it 
from the original syntax. So, for example, assignment syntax boils 
down to an assignment operator and two operands. Decoupling does two 
things. First, it gets us closer to the operator-operand model of 
the CPU. Second, we can have different languages share a common 
intermediate form."*

*"The key idea behind AST structure is that tokens representing 
operators or operations become subtree roots. All other tokens 
become operands (children of operator nodes)."*

### Representing Pseudo-operations in ASTs

*"Not all programming language constructs map directly to
executable code."*

*"In some cases, there is no reasonable input token to use as a
subtree root. We must invent an **imaginary token**, a token for 
which there is no corresponding input token. For example, variable
declarations in languages derived from C usually need an imaginary
token."*

### Implementing ASTs in Java

*"technically, we need only one data type: a generic tree node with
a list of children. What we really care about is the tree structure
(relationships between nodes), not necessarily the node
implementation type(s) themselves."*

*"Trees built from a single data type are called
**homogeneous trees**."*

### Enforcing Tree Structure with the Type System

*"To avoid creating improperly structured ASTs, we can co-opt the implementation language’s static type system to enforce structure."*

*"The best way to create ASTs and to verify their structure is with a formal mechanism."*



