---
title: Undo Committed Changes with SVN
date: 2015-05-29
modified: 2015-06-01
category: Programming
tags: [SVN, Version Control]
---
To undo changes that are already committed in Subversion a back-merge can be applied:

```bash
svn merge -r [current_version]:[previous_version] [repo_url]
```
