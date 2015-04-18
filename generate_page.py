import sys
import os
import shutil
import subprocess
from git import Repo
from os.path import expanduser
 
REPO_DIRECTORY = os.path.realpath(__file__)
REPO_DIRECTORY = os.path.split(REPO_DIRECTORY)[0]
HOME = expanduser("~")


print REPO_DIRECTORY

def remove_local_repository(local_path):
    print "Removing: ", local_path
    shutil.rmtree(local_path, ignore_errors=True)

def clone_repository(repo, local_path):
    remove_local_repository(local_path)
    print "Cloning ", repo, " to ", local_path
    Repo.clone_from(repo, local_path)

    
# Pelican chameleon theme
git_repo = "https://github.com/yuex/pelican-chameleon"
local_path = os.path.join(HOME, "pelican-chameleon") 
clone_repository(git_repo, local_path)

# pelican bootstrapify plug in
git_repo = "https://github.com/ingwinlu/pelican-bootstrapify"
local_path = os.path.join(HOME, "pelican-bootstrapify") 
clone_repository(git_repo, local_path)

# github repo for publishing
git_repo = "https://github.com/LukasWoodtli/LukasWoodtli.github.io"
local_path = os.path.join(HOME, "github-userpage") 
clone_repository(git_repo, local_path)
