Title: Undo Committed Changes with SVN
Date: 2015-05-29
Modified: 2015-06-01
Category: Programming
Tags: SVN, Version Control

To undo changes that are already committed in Subversion a back-merge can be applied:

    :::
    svn merge -r [current_version]:[previous_version] [repo_url]
