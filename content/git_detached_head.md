---
title: Git Detached Head
date: 2015-11-18
modified: 2015-11-18
category: Programming
tags: [Git, Version Control]
---
If a `HEAD` has to be reset to a older version this is a possible workflow.

The solution is from [stackoverflow](http://stackoverflow.com/a/5772882)


First checkout the version that should be the new `HEAD`.

```bash
git checkout <SHA-1 id of commit>
```

Now we create a `temp` branch and check it out.

```bash
git checkout -b temp
```

This is equivalent to `git branch temp` followed by `git checkout temp`.


Now we want `master` (or an other branch) to point to it.

```bash
git checkout -B master temp
```

This is equivalent to `git branch -f master temp`followed by `git checkout master`.


Now we can delete the `temp` branch:

```bash
git branch -d temp
```


Now we can push to a remote (`-f` might be needed):

```bash
git push -f origin master
```
