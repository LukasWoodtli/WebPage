---
title: Move actual work to a new Branch
date: 2015-05-29
modified: 2015-06-01
category: Programming
tags: [Git, Version Control]
---
This useful description is taken from: [git: fetch and merge, don't pull](http://longair.net/blog/2009/04/16/git-fetch-and-merge/)

Suppose you're working on the main branch of a project (called 'master')
and realise later that what you've been doing might have been a bad
idea, and you would rather it were on a topic branch. If the commit
graph looks like this:

       last version from another repository
          |
          v
      M---N-----O----P---Q ("master")

Then you separate out your work with the following set of commands
(where the diagrams show how the state has changed after them):

    $ git branch dubious-experiment

      M---N-----O----P---Q ("master" and "dubious-experiment")

    $ git checkout master
      # Be careful with this next command: make sure "git status" is
      # clean, you're definitely on "master" and the
      # "dubious-experiment" branch has the commits you were working
      # on first...

    $ git reset --hard <SHA1sum of commit N>

           ("master")
      M---N-------------O----P---Q ("dubious-experiment")

    $ git pull # Or something that updates "master" from
               # somewhere else...

      M--N----R---S ("master")
          \
           O---P---Q ("dubious-experiment")

