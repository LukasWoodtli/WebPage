Title: Understanding Computation
Category: Programming
Tags: Computer Science
Date: 2016-09-12

This page collects notes and citations from the book:

[Understanding Computation by Tom Stuart](http://computationbook.com/)



# I. Programs and Machines

*"To create an environment where* [...] *computation can occur, we need three basic ingredients:“

- *"A **machine** capable of performing the computation"*
- *"A **language** for writing instructions that the machine can understand"*
- *"A **program** written in that language, describing the exact computation that the machine should perform"* - page 18

*"But computer programming isn’t really about **programs**, it’s about **ideas**"* - page 20

*"semantics is the study of the connection between words and their meanings"* - page 21


Expression and Statements:

*"The purpose of an expression is to be evaluated to produce another expression; a statement, on the other hand, is evaluated to make some change to the state of the abstract machine."* - page 35

*"difference between expressions and statements. For expressions, we pass an environment into #reduce and get a reduced expression back; no new environment is returned"* - page 37

*"[SIMPLE's] expressions are pure and its statements are impure"* - page 37


*"conditional statements like `« if (x) { y = 1 } else { y = 2 } »`, which contain an expression called the condition (`« x »`), and two statements that we’ll call the consequence (`« y = 1 »`) and the alternative (`« y = 2 »`)"* - page 39

*"the latest R6RS standard for the Scheme programming language uses small-step semantics to describe its execution"* - page 45

*"small-step semantics has a mostly iterative flavor, requiring the abstract machine to repeatedly perform reduction steps"* - page 45

*"recursive rather than an iterative process"* - page 46

- Small-step semantics: iterative
- Big-step semantics: recursive



*"operational semantics is about explaining a language’s meaning by designing an interpreter for it. By contrast, the language-to-language translation of denotational semantics is like a compiler"* - page 60

*"[It's] possible to compare two programs written in different languages, if a denotational semantics exists to translate both languages into some shared representation"* - page 62

*"Small-step semantics is also known as structural operational semantics and transition semantics"* - page 63

*"big-step semantics is more often called natural semantics or relational semantics"* - page 63

*"denotational semantics is also called fixed-point semantics or mathematical semantics"* - page 63

*"One alternative is axiomatic semantics"* - page 64

- Design by Contract (pre-/post-conditions)


*"Reducing an expression and an environment gives us a new expression, and we may reuse the old environment next time; reducing a statement and an environment gives us a new statement and a new environment."* - page 70

*"alternative style of operational semantics, called reduction semantics , which explicitly separates these “what do we reduce next?” and “how do we reduce it?” phases by introducing so-called reduction contexts"* - page 71


*"each finite automaton has a hardcoded collection of rules that determine how it should move from one state to another in response to input"* - page 73


*"finite automata also have a rudimentary way of producing output"* - page 74


*"[Deterministric finite automaton:] it’s always absolutely certain which state it will end up in"* - page 75


*"a string is accepted if there’s some way for the **NFA** to end up in an accept state by following some of its rules—that is, if finishing in an accept state is possible , even if it’s not inevitable."* - page 81


*"The collection of strings that are accepted by a particular machine is called a language : we say that the machine recognizes that language."* - page 82


*"those languages that can be recognized by finite automata are called regular languages"* - page 82




*"[...] introducing another machine feature called free moves. These are rules that the machine may spontaneously follow without reading any input"* - page 88


*"The characters read by finite automata are usually called **symbols**, the rules for moving between states are called **transitions**, and the collection of rules making up a machine is called a **transition function** (or sometimes transition relation for NFAs)"* - page 91


*"NFA with free moves is known as an NFA-ε, and free moves themselves are usually called ε-transitions."* - page 91


*"it’s possible to convert any regular expression into an equivalent NFA—every string matched by the regular expression is accepted by the NFA, and vice versa — and then match a string by feeding it to a simulation of that NFA to see whether it gets accepted."* - page 92


*"here are two kinds of extremely simple regular expression that are not built out of anything simpler:*

- *An empty regular expression. This matches the empty string and nothing else.*
- *A regular expression containing a single, literal character. For example, `a` and `b` are regular expressions that match only the strings '`a`' and '`b`' respectively."* - page 92


*"combine them to build more complex expressions:*

- *Concatenate two patterns. We can concatenate the regular expressions `a` and `b` to get the regular expression `ab` , which only matches the string '`ab`'.*
- *Choose between two patterns, written by joining them with the `|` operator. We can join the regular expressions `a` or `b` to get the regular expression `a|b` , which matches the strings '`a`' and '`b`'.*
- *Repeat a pattern zero or more times, written by suffixing it with the `*` operator. We can suffix the regular expression a to get `a*` , which matches the strings '`a`' , '`aa`' , '`aaa`' , and so on, as well as the empty string '' (i.e., zero repetitions)."* - page 92

*"the `*` operator to bind more tightly than **concatenation**, which in turn binds more tightly than the `|` operator."* - page 94


*"Any two NFAs can be concatenated by turning every accept state from the first NFA into a nonaccept state and connecting it to the start state of the second NFA with a free move"* - page 97


- *"The start state of the first NFA"*
- *"The accept states of the second NFA"*
- *"All the rules from both NFAs"*
- *"Some extra free moves to connect each of the first NFA’s old accept states to the second NFA’s old start state"* - page 98


*"We can use a similar strategy to convert a Choose expression into an NFA."* - page 98

- *"A new start state"*
- *"All the accept states from both NFAs"*
- *"All the rules from both NFAs"*
- *"Two extra free moves to connect the new start state to each of the NFA’s old start states"* - page 100



*"This time we need:*

- *A new start state, which is also an accept state*
- *All the accept states from the old NFA*
- *All the rules from the old NFA*
- *Some extra free moves to connect each of the old NFA’s accept states to its old start state*
- *Another extra free move to connect the new start state to the old start state* - page 101


*"Free moves are useful for this conversion because they provide an unobtrusive way to glue together smaller machines into larger ones without affecting the behavior of any of the components."* - page 102


*"Nondeterminism and free moves make it easier to design finite state machines to perform specific jobs"* - page 105

*"it’s possible to convert any nondeterministic finite automaton into a deterministic one that accepts exactly the same strings"* - page 105


*"A finite state machine with a built-in stack is called a pushdown automaton (PDA), and when that machine’s rules are deterministic, we call it a deterministic pushdown automaton (DPDA)."* - page 122

*"[...] a PDA rule into five parts:*
- *The current state of the machine*
- *The character that must be read from the input (optional)*
- *The next state of the machine*
- *The character that must be popped off the stack*
- *The sequence of characters to push onto the stack after the top character has been popped off"* - page 123


*"The assumption is that a PDA will always pop the top character off the stack, and then push some other characters onto the stack, every time it follows a rule. Each rule declares which character it wants to pop, and the rule will only apply when that character is on the top of the stack; if the rule wants that character to stay on the stack instead of getting popped, it can include it in the sequence of characters that get pushed back on afterward."* - page 123


*"[...] bottom of the stack—the dollar sign, `$` , is a popular choice"* - page 124


*"there are two important things to know about a pushdown automaton at each step of its computation: what its current state is, and what the current contents of its stack are. If we use the word **configuration** to refer to this combination of a state and a stack, we can talk about a pushdown automaton moving from one configuration to another as it reads input characters"* - page 126


*"there isn’t an NPDA-to-DPDA algorithm."* - page 139


*"Lexical analysis*

*Read a raw string of characters and turn it into a sequence of tokens. Each token represents an individual building block of program syntax, like “variable name,” “opening bracket,” or “ while keyword.” A lexical analyzer uses a language-specific set of rules called a lexical grammar to decide which sequences of characters should produce which tokens. This stage deals with messy character-level details like variable-naming rules, comments, and whitespace, leaving a clean sequence of tokens for the next stage to consume."* - page 139



*"Syntactic analysis*

*Read a sequence of tokens and decide whether they represent a valid program according to the syntactic grammar of the language being parsed. If the program is valid, the syntactic analyzer may produce additional information about its structure (e.g., a parse tree)."* - page 140

*"context-free grammar (CFG)*

*Each rule has a symbol on the lefthand side and one or more sequences of symbols and tokens on the right"* - page 143


*"The technique for converting a CFG into a PDA works like this:*

1. *Pick a character to represent each symbol from the grammar*
2. *Use the PDA’s stack to store characters that represent grammar symbols and tokens. When the PDA starts, have it immediately push a symbol onto the stack to represent the structure it’s trying to recognize.*
3. *Translate the grammar rules into PDA rules that expand symbols on the top of the stack without reading any input. Each grammar rule describes how to expand a single symbol into a sequence of other symbols and tokens*
4. *Give every token character a PDA rule that reads that character from the input and pops it off the stack*

*These token rules work in opposition to the symbol rules. The symbol rules tend to make the stack larger, sometimes pushing several characters to replace the one that’s been popped; the token rules always make the stack smaller, consuming input as they go.*

5\. *Finally, make a PDA rule that will allow the machine to enter an accept state if the stack becomes empty* - pages 143-145


*"the symbol rules repeatedly expand the symbol on the top of the stack until it gets replaced by a token, then the token rules consume the stack (and the input) until they hit a symbol. This back and forth eventually results in an empty stack as long as the input string can be generated by the grammar rules."*

*"This algorithm is called **LL** parsin . The first L stands for “left-to-right,” because the input string is read in that direction, and the second L stands for “left derivation,” because it’s always the leftmost (i.e., uppermost) symbol on the stack that gets expanded."* - page 146


*"The unlimited storage provided by a stack lets a PDA remember arbitrary amounts of information during a computation and refer back to it later."* - page 148


*"There’s a feedback loop between the rules and the stack—the contents of the stack affect which rules the machine can follow, and following a rule will affect the stack contents—which allows a PDA to store away information on the stack that will influence its future execution."* - page 148


*"[...] unified rule format has five parts:*

- *The current state of the machine*
- *The character that must appear at the tape head’s current position*
- *The next state of the machine*
- *The character to write at the tape head’s current position*
- *The direction (left or right) in which to move the head after writing to the tape"* - page 156


*"we don’t have to worry about free moves, because Turing machines don’t have them."* - pages 160


*"A Turing machine’s next action is chosen according to its current state and the character currently underneath its tape head, so a deterministic machine can only have one rule for each combination of state and character—the “no contradictions” rule—in order to prevent any ambiguity over what its next action will be."* - page 160


*"there's an implicit stuck state that the machine can go into when no rule applies*" - page 160


*"does adding nondeterminism make a Turing machine more powerful? In this case the answer is no: a nondeterministic Turing machine can’t do any more than a deterministic one. Pushdown automata are the exception here, because both DFAs and DTMs have enough power to simulate their nondeterministic counterparts. A single state of a finite automaton can be used to represent a combination of many states, and a single Turing machine tape can be used to store the contents of many tapes, but a single pushdown automaton stack can’t represent many possible stacks at once."* - page 166


*"can we design a single machine that can read a program from its input and then do whatever job the program specifies? Perhaps unsurprisingly, a Turing machine is powerful enough to read the description of a simple machine from its tape - a deterministic finite automaton, say - and then run a simulation of that machine to find out what it does."* - page 176


*"we are able to design a machine that can simulate any other DTM by reading its rules, accept states, and initial configuration from the tape and stepping through its execution, essentially acting as a Turing machine rulebook interpreter. A machine that does this is called a **universal Turing machine** (UTM)."* - page 177

*"We can write software - an encoded description of a Turing machine - onto a tape, feed that tape to the UTM, and have our software executed to produce the behavior we want."* - page 177


*"One challenge is that every Turing machine has a finite number of states and a finite number of different characters it can store on its tape, with both of these numbers being fixed in advance by its rulebook, and a UTM is no exception.*" - page 178


# II. Computation and Computability

*"As programmers we work with languages and machines that are designed to fit our mental models of the world, and we expect them to come equipped with features that make it easy to translate our ideas into implementations. These human-centered designs are motivated by convenience rather than necessity"* - page 182

*"[...] hard theoretical constraints: certain problems just can’t be solved by any computer, no matter how fast and efficient it is."* - page 182


Chruch numerals:

*"Each number corresponds to a unique way of repeating an action: the number one corresponds to just performing the action; the number two corresponds to performing it and then performing it again; and so on. The number zero, unsurprisingly, corresponds to not performing the action at all."* - page 189

*"[...] Church encoding after Alonzo Church, the inventor of the lambda calculus"* - page 190


*"[Church numeral to integer] conversion:*

    :::ruby
    def to_integer(proc)
        proc[-> n { n + 1 }][0]
    end

*This method takes a proc that represents a number and calls it with another proc (which just increments its argument) and the native Ruby number 0.*" - page 191


Church to boolean:

    :::ruby
    def to_boolean(proc)
        proc[true][false]
    end

*"This works by taking a proc that represents a Boolean and calling it with `true` as its first argument and `false` as its second. `TRUE` just returns its first argument, so `to_boolean(TRUE)` will return `true`, and likewise for `FALSE` [...]"* - 193




*"In languages like Ruby, the `if`-`else` statement is nonstrict (or **lazy**): we give it a condition and two blocks, and it evaluates the condition to decide which of the two blocks to evaluate and return — it never evaluates both."* - page 200


*"Ruby [...] evaluates both arguments before IF gets a chance to decide which one to return."* - page 200


*"we can easily implement lists that calculate their contents on the fly, also known as **streams**. In fact, there’s no reason why streams even need to be finite, because the calculation only has to generate the list contents as they’re consumed"* - page 215


*"defining a data structure in terms of itself might seem weird and unusual; in this setting, they’re exactly the same thing, and the Z combinator makes both completely legitimate."* - page 216


*"Function calls are the only thing that actually **happens** when a lambda calculus program is evaluated"* - page 225


*"function calls are the only kind of syntax that can be reduced."* - page 225



*"You might protest that `3 - 5 = 0` isn’t called "subtraction" where you come from, and you’d be right: the technical name for this operation is  "monus", because the nonnegative integers under addition form a commutative monoid instead of a proper abelian group." - page 229



# Universality Is Everywhere

*"Even though any individual Turing machine has a hardcoded rulebook, the universal Turing machine demonstrates that it’s possible to design a device that can adapt to arbitrary tasks by reading instructions from a tape. These instructions are effectively a piece of software that controls the operation of the machine’s hardware, just like in the general-purpose programmable computers we use every day."* - page 231


*"a Turing machine can act as an interpreter for the lambda calculus by storing a representation of a lambda calculus expression on the tape and repeatedly updating it according to a set of reduction rules"* - page 234


*"Since every Turing machine can be simulated by a lambda calculus program, and every lambda calculus program can be simulated by a Turing machine, the two systems are exactly equivalent in power."* - page 234


## Partial Recursive Functions


*"partial recursive functions are programs that are constructed from four fundamental building blocks in different combinations.*

*[...]* 

*The first two building blocks are called **zero** and **increment***

*[...]* 

*third building block, **recurse** [...]*

***recurse** is just a template for defining a certain kind of recursive function.*

*The programs that we can assemble out of **zero**, **increment**, and **recurse** are called the **primitive** recursive functions.*

*All primitive recursive functions are **total**: regardless of their inputs, they always halt and return an answer. This is because **recurse** is the only legitimate way to define a recursive method, and **recurse** always halts: each recursive call makes the last argument closer to zero, and when it inevitably reaches zero, the recursion will stop.*

*However, we can’t simulate the full execution of an arbitrary Turing machine with primitive recursive functions, because some Turing machines loop forever, so primitive recursive functions aren’t universal.*

*To get a truly universal system we have to add a fourth fundamental operation, **minimize**:*

***minimize** takes a block and calls it repeatedly with a single numeric argument. For the first call, it provides 0 as the argument, then 1, then 2, and keeps calling the block with larger and larger numbers until it returns zero.*

*By adding **minimize** to **zero**, **increment**, and **recurse**, we can build many more functions—all the **partial** recursive functions—including ones that don’t always halt.*

*With **minimize**, it’s possible to fully simulate a Turing machine by repeatedly calling the primitive recursive function that performs a single simulation step. The simulation will continue until the machine halts - and if that never happens, it’ll run forever.* - pages 235 - 238


<!-- TODO continue here

## SKI Combinator Calculus

The SKI calculus is even simpler, with only two kinds of expression—calls and alphabetic symbols —and much easier rules. All of its power comes from the three special symbols S , K , and I (called combinators ), each of which has its own reduction rule: Reduce S[ a ][ b ][ c ] to a [ c ][ b [ c ]] , where a , b , and c can be any SKI calculus expressions. Reduce K[ a ][ b ] to a . Reduce I[ a ] to a .

August 29, 2016
239


The SKI calculus can produce surprisingly complex behavior with its three simple rules—so complex, in fact, that it turns out to be universal.

August 31, 2016
243


Although the SKI calculus has three combinators, the I combinator is actually redundant. There are many expressions containing only S and K that do the same thing as I

September 2, 2016
245


S[K][K] has the same behavior as I , and in fact, that’s true for any SKI expression of the form S[K][ whatever ] . The I combinator is syntactic sugar that we can live without; just the two combinators S and K are enough for universality.

September 2, 2016
246


iota ( ɩ ) is an extra combinator that can be added to the SKI calculus. Here is its reduction rule: Reduce ɩ[ a ] to a [S][K] .

September 2, 2016
246

a language called Iota whose programs only use the ɩ combinator. Although it only has one combinator, Iota is a universal language,

September 2, 2016
246

We can convert an SKI expression to Iota by applying these substitution rules: Replace S with ɩ[ɩ[ɩ[ɩ[ɩ]]]] . Replace K with ɩ[ɩ[ɩ[ɩ]]] . Replace I with ɩ[ɩ] .

September 2, 2016
246


a tag system operates on a string by repeatedly adding new characters to the end of the string and removing them from the beginning.

September 2, 2016
248


A tag system’s description has two parts: first, a collection of rules, where each rule specifies some characters to append to the string when a particular character appears at the beginning—“when

September 2, 2016
249


instance; and second, a number, called the deletion number , which specifies how many characters to delete from the beginning of the string after a rule has been followed.

September 2, 2016
249





Having a deletion number greater than 1 is essential for making this tag system work. Because every second character triggers a rule, we can influence the system’s behavior by arranging for certain characters to appear (or not appear) in these trigger positions.

September 2, 2016
254





Building a Turing machine simulation on top of something as simple as a tag system involves a lot of detail,

September 2, 2016
255





Cyclic tag systems are extremely limited—they have inflexible rules, only two characters, and the lowest possible deletion number—but surprisingly, it’s still possible to use them to simulate any tag system.

September 2, 2016
260





The term Turing complete is often used to describe a system or programming language that can simulate any Turing machine.

August 25, 2016
271





The practical purpose of a computing machine is to perform algorithms . An algorithm is a list of instructions describing some process for turning an input value into an output value, as long as those instructions fulfill certain criteria:

September 3, 2016
274





Finiteness There are a finite number of instructions.

September 3, 2016
274





Simplicity Each instruction is simple enough that it can be performed by a person with a pencil and paper without using any ingenuity.

September 3, 2016
274





Termination A person following the instructions will finish within a finite number of steps for any input.

September 3, 2016
274





Correctness A person following the instructions will produce the right answer for any input.

September 3, 2016
274





can any algorithm be turned into instructions suitable for execution by a machine?

September 3, 2016
276





there’s a real difference between the abstract, intuitive idea of an algorithm and the concrete, logical implementation of that algorithm within a computational system. Could there ever be an algorithm so large, complex, and unusual that its essence can’t be captured by an unthinking mechanical process?

September 3, 2016
276





the question is philosophical rather than scientific

September 3, 2016
276





The idea that any algorithm can be performed by a machine—specifically a deterministic Turing machine—is called the Church–Turing thesis , and although it’s just a conjecture rather than a proven fact, it has enough evidence in its favor to be generally accepted as true.

September 3, 2016
277





programs can be represented as data so that they can be used as input to other programs; it’s the unification of code and data that makes software possible in the first place.

September 3, 2016
279





any system that’s powerful enough to be universal will inevitably allow us to construct computations that loop forever without halting.

September 3, 2016
281





So why must every universal system bring nontermination along for the ride?

September 3, 2016
283





it’s impossible to remove features (e.g., while loops) from a programming language in a way that prevents us from writing nonhalting programs while keeping the language powerful enough to be universal.

September 3, 2016
287





Languages that have been carefully designed to ensure that their programs must always halt are called total programming languages , as opposed to the more conventional partial programming languages whose programs sometimes halt with an answer and sometimes don’t. Total programming languages are still very powerful and capable of expressing many useful computations, but one thing they can’t do is interpret themselves.

September 3, 2016
287





a fundamental mathematical result called Kleene’s second recursion theorem , which guarantees that any program can be converted into an equivalent one that is able to calculate its own source code.

September 3, 2016
288





A decision problem is any question with a yes or no answer

September 4, 2016
293





A decision problem is decidable (or computable ) if there’s an algorithm that’s guaranteed to solve it in a finite amount of time for any possible input. The Church–Turing thesis claims that every algorithm can be performed by a Turing machine, so for a problem to be decidable, we have to be able to design a Turing machine that always produces the correct answer and always halts if we let it run for long enough.

September 4, 2016
293





There are many decision problems— infinitely many—and it turns out that a lot of them are undecidable: there is no guaranteed-to-halt algorithm for solving them. Each of these problems is undecidable not because we just haven’t found the right algorithm for it yet, but because the problem itself is fundamentally impossible to solve for some inputs, and we can even prove that no suitable algorithm will ever be found.

September 4, 2016
294





the halting problem, is the task of deciding whether the execution of a particular Turing machine with a particular initial tape will ever halt.

September 5, 2016
295





This is Rice’s theorem : any nontrivial property of program behavior is undecidable, because the halting problem can always be reduced to the problem of deciding whether that property is true; if we could invent an algorithm for deciding that property, we’d be able to use it to build another algorithm that decides the halting problem, and that’s impossible.

September 5, 2016
304





Any system with enough power to be self-referential can’t correctly answer every question about itself. [ 83 ]

September 6, 2016
308





every pushdown automaton has an equivalent context-free grammar and vice versa; any CFG can be rewritten in Chomsky normal form ; and any CFG in that form must take exactly 2 n − 1 steps to generate a string of length n .

September 4, 2016
312





The main idea of abstract interpretation is to use an abstraction , a model of the real problem that discards enough detail to make it manageable—perhaps by making it smaller, simpler, or by eliminating unknowns—but that also retains enough detail to make its solution relevant to the original problem.

September 6, 2016
315





A lot of the time, it’s fine for a result to be imprecise, but for an abstraction to be useful, it’s important that this imprecision is safe . Safety means that the abstraction always tells the truth: the result of an abstract computation must agree with the result of its concrete counterpart. If not, the abstraction is giving us unreliable information and is probably worse than useless.

September 7, 2016
321





dynamic semantics of programming languages, a way of specifying the meaning of code when it’s executed; a language’s static semantics tells us about properties of programs that we can investigate without executing them. The classic example of static semantics is a type system

September 8, 2016
327





From the perspective of someone designing the static semantics, it’s also more difficult to handle a language where variables can change their types.

September 8, 2016
334





Fundamentally, there is a tension between the restrictiveness of a type system and the expressiveness of the programs we can write within it.

September 8, 2016
334





A good type system finds an acceptable compromise between restrictiveness and expressiveness, ruling out enough problems to be worthwhile without getting in the way, while being simple enough for programmers to understand.

September 8, 2016
334





September 9, 2016
338





Any information we get from the type system has to be taken with a pinch of salt, and we have to pay attention to its limitations when deciding how much faith to put in it. A successful execution of a program’s static semantics doesn’t mean “this program will definitely work,” only “this program definitely won’t fail in a particular way.” It would be great to have an automated system that can tell us that a program is free of any conceivable kind of bug or error, but as we saw in Chapter 8 , the universe just isn’t that convenient.

September 9, 2016
338





Formally, abstract interpretation is a mathematical technique where different semantics for the same language are connected together by functions that convert collections of concrete values into abstract ones and vice versa, allowing the results and properties of abstract programs to be understood in terms of concrete ones.

September 9, 2016
338





Java has a type and effect system that tracks not only the types of methods’ arguments and return values but also which checked exceptions can be thrown by the body of the method (throwing an exception is an effect ), which is used to ensure that all possible exceptions are either handled or explicitly propagated.

September 9, 2016
339




A. Afterword



Every computer program is a mathematical object. Syntactically a program is just a large number; semantically it can represent a mathematical function, or a hierarchical structure which can be manipulated by formal reduction rules. This means that many techniques and results from mathematics, like Kleene’s recursion theorem or Gödel’s incompleteness theorem, can equally be applied to programs.

September 9, 2016
341





Computation, which we initially described as just “what a computer does,” has turned out to be something of a force of nature. It’s tempting to think of computation as a sophisticated human invention that can only be performed by specially-designed systems with many complicated parts, but it also shows up in systems that don’t seem complex enough to support it. So computation isn’t a sterile, artificial process that only happens inside a microprocessor, but rather a pervasive phenomenon that crops up in many different places and in many different ways.

September 9, 2016
341





Computation is not all-or-nothing. Different machines have different amounts of computational power, giving us a continuum of usefulness: DFAs and NFAs have limited capabilities, DPDAs are more powerful, NPDAs more powerful still, and Turing machines are the most powerful we know of.

September 9, 2016
341


-->
