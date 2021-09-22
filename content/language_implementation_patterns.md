Title: Language Implementation Patterns
Category: Programming
Tags: Computer Science, Parsing, Design Patterns


This page collects notes and citations from the book:

[Language Implementation Patterns by Terence Parr](https://pragprog.com/book/tpdsl/language-implementation-patterns)

Some of my examples can be found [here](https://github.com/LukasWoodtli/LanguageImplementationPatterns)


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

*"Abstract syntax tree (AST) [...] hold the key tokens from the input
stream and record grammatical relationships discovered during the parse."*

*"ASTs are the **lingua franca** spoken by the various stages in a 
language application. Each stage performs a computation, rewrites 
the tree, or creates another data structure before passing the tree 
along to the next stage."*

*"The four most common IR tree patterns:"*

- *"**Parse trees** record how a parser recognizes an input sentence. The interior nodes are rule names, and the leaves are tokens. Although parse trees are less suitable than ASTs for most language applications, parsers can create them automatically."*
- *"**Homogeneous AST** [...]: If all the nodes have the same type, we say that they are homogeneous. With a single node type, there can be no specialty fields to reference child subtrees. Nodes track children with lists of child pointers."*
- *"**Normalized Heterogeneous AST** [...]: Trees with a multitude of node types are called heterogeneous trees. Normalized het erogeneous trees use a normalized list of children like homogeneous trees."*
- *"**Irregular Heterogeneous AST** [...]: When we refer to an AST as heterogeneous, we also assume that the nodes have irregular children. Instead of a normalized child list, the nodes have named fields, one per child."*


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

*"To avoid creating improperly structured ASTs, we can co-opt the implementation
language’s static type system to enforce structure."*

*"The best way to create ASTs and to verify their structure is with a formal mechanism."*

### Constructing ASTs with ANTLR Grammars

*" The key is that we are declaring what the AST should look like, not how to build it.
It is analogous to using a grammar to specify syntax rather than building a parser."*

*"We looked at two different ways to structure intermediate representations (parse trees and ASTs)
and three different ways to implement ASTs."*

- *"Pattern 8, Parse Tree [...]:*
    - *Pros: Parser generators can automatically build these for us.*
    - *Cons: Parse trees are full of noise (unnecessary nodes). They are sensitive to changes in the grammar unrelated to syntax. If a parser generator generates heterogeneous node types, there can be literally hundreds of class definitions.*"
- *"Pattern 9, Homogeneous AST [...]:*
    - *Pros: Homogeneous trees are very simple.*
    - *Cons: It’s cumbersome to annotate AST nodes because the single node type has the union of all needed fields. There is no way to add methods specific to a particular kind of node."*
- *"Pattern 10, Normalized Heterogeneous AST [...]:*
    - *Pros: It’s easy to add operator or operand-specific data and methods.*
    - *Cons: Large grammars like Java’s need about 200 class definitions to be fully heterogeneous. That’s a lot of files to read and write."*
- *"Pattern 11, Irregular Heterogeneous AST [...].*
    - *Pros: It’s easy to add operator- or operand-specific data and methods. Sometimes code operating on nodes is more readable because the children (operands) have names rather than positions like `children[0]`. Building tree-walking methods for a small set of heterogeneous nodes is quick and easy.*
    - *Cons: As with Pattern 10, Normalized Heterogeneous AST [...], there are lots of AST classes to read and write. Having irregular children makes building external visitors difficult. Most of the time we have to build tree walkers by hand using Pattern 12, Embedded Heterogeneous Tree Walker [...]"*

*"If you're in doubt about which is best in your situation, choosing Pattern 10, Normalized Heterogeneous AST [...]
is a safe bet."*


### Pattern 8: Parse Tree

#### Purpose

*"A parse tree describes how a parser recognized an input sentence.
A parse tree is sometimes called a syntax tree (as opposed to an abstract
syntax tree). Despite not being that useful for building interpreters and
translators [they] are heavily used
by development environments and text rewriting systems."*

#### Discussion

*"Parse trees record the sequence of rules a parser applies as well as the tokens
it matches. Interior parse tree nodes represent rule applications, and leaf
nodes represent token matches."*

*"Parse trees are really easy to build by hand and are so regular that tools like
ANTLR can automate the process for us."*

*"Parse
trees are full of noise because of all the interior rule nodes. They are also very
sensitive to changes in the grammar."*

*"An AST captures just the essential information from the input: all of the input
tokens and the appropriate structure. The interior nodes are operators or
operations rather than rule names."*

*"Parse trees mirror the function call graphs of a recursive-descent parser"*

### Pattern 9: Homogeneous AST

#### Purpose

*"A homogeneous tree implements an abstract syntax tree (AST) using a single
node data type and a normalized child list representation."*

#### Discussion

*"The key idea behind an AST is the operator-operand tree structure, not the
node data type."*

*"We don't need to use the type system of our implementation language to distinguish
between nodes."*

*"In fact, homogeneous ASTs are the only
convenient choice for non-object-oriented languages like C."*

*"Homogeneous ASTs necessarily use a normalized child representation:
`List<AST>`. This makes it particularly easy to build external visitors."*

### Pattern 10: Normalized Heterogeneous AST

#### Purpose

*"This pattern implements an abstract syntax tree (AST) using more than a single
node data type but with a normalized child list representation."*

#### Discussion

*"This pattern makes the most sense when we need to store node-specific data"*

*"The normalized child list makes it much easier to build external visitors."*

### Pattern 11: Irregular Heterogeneous AST

#### Purpose

*"This pattern implements an abstract syntax tree (AST) using more than a single
node data type and with an irregular child list representation."*

#### Discussion

*"Instead of a uniform list of children, each node data type has specific
(named) child fields. In this sense, the child pointers are irregular.
In some cases, named fields lead to more readable code."*

*"It's very natural to name the fields of a class, in this case naming the children of
a node. The big downside to using nodes with irregular children is that it's
much less convenient to build tree walkers"*


## Walking and Rewriting Trees

*"Tree walking is one of the key processes going on in a large language application."*

*"In real applications, though, tree walking gets surprisingly complicat- ed. There are a number of different variations, sometimes even within the same application."*


*"The variation we choose depends on whether we have the source code for our tree nodes, whether the trees have normalized children, whether the trees are homogeneous or heterogeneous, whether we need to rewrite trees while walking, and even in which order we need to walk the nodes."*


### Walking Trees and Visitation Order

- *"Preorder traversal or top-down traversal: $+ 1 2$. Visit a (parent) node before visiting its children.*
- *Inorder traversal: $1 + 2$. Visit a node in between visiting children.*
- *Postorder traversal or bottom-up traversal: $1 2 +$. Visit a node after visiting its children."*


### Pattern 12: Embedded Heterogeneous Tree Walker

#### Purpose

*"This pattern walks heterogeneous ASTs using a set of recursive methods defined within the node class definitions."*

#### Discussion

*"This is the easiest tree-walking pattern to understand, but, ultimately, this approach doesn’t scale well. Because it distributes tree-walking code across all node definitions, it works best when there are only a few node definitions."*


### Pattern 13: External Tree Visitor

#### Purpose

*"This pattern encapsulates all tree-walking code associated with a particular task into a single visitor class.
Visitors combine tree walking and action execution code outside the AST node definitions. Consequently, we can change the functionality of the tree walker without having to change the AST class definitions and can even switch visitors on the fly. An external visitor can walk either heterogeneous or homogeneous AST nodes."*

#### Discussion

*"The visitor pattern is the workhorse of choice for tree walking in most language applications. Ultimately you might get tired of manually building visitors, though"*


#### Implementation

*"There are two ways to implement this pattern. The first is more traditional and relies on the node types themselves. The second relies on the node’s token type instead."*


##### Visitor Switching on Node Type

*"The traditional implementation of the visitor pattern originally specified in
'Design Patterns: Elements of Reusable Object-Oriented Software'
relies on a 'double-dispatch' method within each AST node. The double-dispatch method redirects `visit()`
 calls on a node to an appropriate method in a visitor servicing that node type. The visitor is like a set of callback methods."*


##### Switching on the Token Type to Build Independent Visitors

*"For language applications, we build trees from tokens. Since we can distinguish between tokens using the token type, we can also 
distinguish between AST nodes using the token type. By switching on the token type rather than the AST node type, we can avoid
the `visit()` method in each AST node. In its place, we use just one dispatch method inside the visitor."*


### Pattern 14: Tree Grammar

#### Purpose

*"Tree grammars are a terse and formal way of building an external visitor."*

#### Discussion

*"Tree grammars look just like conventional parser grammars except that we can match subtree patterns as well.
As with parser grammars, we can embed actions to extract information or reorganize the input (a tree, in this case)."*

*"ANTLR generates tree walkers from tree grammars that literally act like parsers."*

*"Tree grammars do not care about the implementation language classes used to represent AST nodes (they work with both homogeneous and heterogeneous AST nodes)."*


### Pattern 15: Tree Pattern Matcher

#### Purpose

*"This pattern walks trees, triggering actions or tree rewrites as it encounters tree patterns of interest.
The process of matching and rewriting trees is formally called term rewriting."*

#### Discussion

*"Using a tree pattern matcher differs from using a tree grammar in two important ways:*

- *We have to specify patterns only for the subtrees we care about.*
- *We don’t need to direct the tree walk."*

*"A tree pattern matcher is analogous to text rewriting tools such as `awk`, `sed`, and `perl`."*



## Chapter 6 Tracking and Identifying Program Symbols


### Collecting Information About Program Entities

*"what we need to know for each symbol"*

- *Name*
- *Category*: class, method, variable, label...
- *Type*


### Grouping Symbols into Scopes

- *Static vs. dynamic scoping*
- *Nesting*
- *Contents*: declarations, statements or both
- *Visibility*

### Resolving Symbols

*"to resolve a symbol reference, we look for it in its semantic context, starting with the current scope. If `resolve()` doesn't find the symbol in the current scope, it asks the enclosing scope if it can find the symbol. `resolve()` recursively walks toward the root of the scope tree until it finds the symbol or runs out of scopes."*

## Chapter 7 Managing Symbol Tables for Data Aggregates

### Building Scope Trees for Structs

*"We also have to resolve symbols within struct scopes from the outside. In other words, a language application might have to figure out which field `«expr».x` refers to."*

*"The general (recursive) rule for resolving `«expr».x` is to determine the type of `«expr»` and then look up `x` in that scope."*

*"we need two different resolve methods: one for looking up isolated symbols like `d` and another for resolving member access expressions like `d.i`."*


### Building Scope Trees for Classes

*"Per the usual object-oriented language conventions, [...] we want to look up the inheritance chain before looking in the global scope."*

*"To handle [...] forward references [...]. We can make two passes over the input, one to define symbols and another to resolve them"*


## Chapter 8 Enforcing Static Typing Rules


*"Sometimes, though, we write code that make no sense even if the syntax is correct. Such programs violate a language’s semantic rules."*

*"Languages typically have lots and lots of semantic rules. Some rules are run-time constraints (dynamic semantics), and some are compile-time constraints (static semantics)."*

*"Some languages enforce the same rule statically and then again dynamically to guard against hostile programs. For example, Java does type checking at compile-time as well as at run-time."*


# Building Interpreters

## Chapter 9 Building High-Level Interpreters

*"High-level interpreters directly execute source code instructions or the AST equivalent. (Low-level interpreters execute instructions called bytecodes that are close to CPU machine instructions.)"*

*"An interpreter simulates an idealized computer in software. Such “computers” have a processor, code memory, data memory, and (usually) a stack. The processor pulls instructions from the code memory, decodes them, and exe- cutes them. An instruction can read or write to the data memory or onto the stack. Function calls save return addresses so they can return to the instruction following the function call."*

*"There are three things to consider when building an interpreter: how to store data, how and when to track symbols, and how to execute instructions."*


### Designing High-Level Interpreter Memory Systems

*"High-level interpreters store values according to variable names, not memory addresses (like low-level interpreters and CPUs do). That means we’ve got to represent memory with a dictionary mapping names to values. There are three kinds of memory spaces to worry about for most programming languages: global memory, function spaces (for parameters and locals), and data aggregate instances (structs or objects)."*

### Processing Instructions

*"fetch-decode-execute cycle: First, we load an instruction from code memory. Then, we decode the instruction to find the operation and operands. Finally, we execute the operation. Rinse and repeat."*


## Chapter 10 Building Bytecode Interpreters

### Bytecode Machine Architecture

*"A bytecode interpreter simulates a computer with the following components:"*

- *Code memory*: the assembled bytecode (instructions and operands)
- *ip register*: pointing at the next instruction to be executed
- *Global memory*: space for variables
- *CPU*: executes instructions
- *Constant pool*: holds the constants (known at assembly time)
- *Function call stack*: for parameters, local variables and return values
- *fp register*: points to the top of the function call stack

In addition a Stack-Based interpreter has:

- *Operand stack*: for temporary values (instead of registers)
- *sp register*: points to the top of the operand stack

A Register-Based interpreter has (instead of a operand stack):

- *infinite register set per function call*: parameters, local variables and return values


# Translating and Generating Languages

## Translating Computer Languages

*"Translation involves fully understanding each input phrase, picking
an appropriate output construct, and filling it with elements from
the input model."*

*"We usually have to create an input model like an AST because we
can't always do semantic analysis properly as we parse."*


*"According to the needs of the task at hand, we compute everything we
need to know about the input and then make a decision about mapping an
input phrase to an output phrase."*

### Rule-Based Translation

*"Rule-based systems are particularly good at legacy code conversions
because we want the translated code to be natural."*

*"These rule engines let us say what to do, not how to do it.
They are powerful, implementation-language independent, expressive,
formal, and beautiful."*

*"These systems tend to be complex beasts. With a large number of
translation rules, translations can be slow."*

*"The rule engines themselves are black boxes, which can
make it hard to understand what's gone wrong in a translation.
Some of these systems were also designed to be the center of the
universe, making them tricky to integrate into applications."*

### Model-Driven Translation

*"In a model-driven translator, everything centers around an input
model created by the parser."*

*"From the AST input model, we're going to learn how to derive an
appropriate output model instead of immediately generating output."*

*"As we walk the input model, we'll match subtrees and create
output objects to represent translated phrases"*

*"Using a hierarchy of output objects to represent the output makes
sense because it's equivalent to a syntax tree."*

### Decoupling Input Model Traversal from Output Order

*"There are two ways to solve input-output ordering mismatches. First,
we can walk the tree [multiple times]."*

*"This works but is inefficient because we have to walk the
(potentially very large) tree [multiple times]. This is an
output-driven approach because it 'pulls' information
from the input model according to the output order."*

*"The second choice is to walk the input model a single time,
collecting the declarations and definitions in lists instead of
directly emitting text"*

*"This input-driven approach lets us decouple the input and output
order, albeit at the cost of buffering up the various output pieces.
It's totally worth it, though."*

*"We know that the translation process is about creating an input
model, enriching it with semantic information, and then creating an
appropriate output model. Target-specific generator classes
are familiar and well-structured, but building them is a lot of work,
and they're often a hassle to use. Visitors that generate text directly
are much more convenient. Unfortunately, print statements lock the
order of the output elements to the input model traversal order.
Besides, computing output strings in a general-purpose programming
language ain't exactly pretty."*

### Organizing Translated Phrases into a Nested Model

*"In general, translators need to track a few locations
in the output model. These locations are typically things such as
the current file object, the current class object, or the current method
object."*

### Pattern 29: Syntax-Directed Translator

#### Purpose

*"This pattern generates text using a grammar, or equivalent hand-built parser,
embedded with actions."*

#### Discussion

*"Syntax-directed translators are little more than grammars salted with actions
(code snippets). They don't build internal models and then walk them to
generate output.
Putting actions directly in a grammar sometimes makes the grammar difficult
to read. It also locks the grammar into a single bit of translator functionality."*

### Pattern 30: Rule-Based Translator

#### Purpose

*"A rule-based translator expresses a translation with a set of 'x becomes y'
rules, written in the DSL of a pattern-matching engine."*

#### Discussion

*"To use a rule-based system, we have to feed it two things: a grammar that
describes input sentences and a set of translation rules."*

*"Although it looks like we're doing text-to-text transformations,
the underlying engine is actually doing tree rewrites.
For complicated translators, we need to build a lot of ancillary data structures
beyond trees such as symbol tables and control-flow graphs."*


### Pattern 31: Target-Specific Generator Classes

#### Purpose

*"This pattern describes a class library whose sole purpose is to represent and
generate output constructs in a particular language."*

#### Discussion

*"Rather than use print statements to generate programs or data, generator
classes let us insulate application code from the exact syntax of an output
language. [...] we're defining a special class for each output element."*
