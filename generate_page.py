#!/usr/bin/env python

import sys
import os
import shutil
import sh
import subprocess
from os.path import expanduser
 
REPO_DIRECTORY = os.path.realpath(__file__)
REPO_DIRECTORY = os.path.split(REPO_DIRECTORY)[0]
HOME = expanduser("~")
print "HOME: ", HOME

GITHUB_USERPAGE_REPO = "https://github.com/LukasWoodtli/LukasWoodtli.github.io"
try:
    GIT_HUB_TOKEN =  os.environ['DEPLOY_KEY']
    GITHUB_USERPAGE_REPO = "https://{}github.com/LukasWoodtli/LukasWoodtli.github.io".format(GIT_HUB_TOKEN + "@")
except:
    pass

REPOSITORIES = [("https://github.com/LukasWoodtli/pelican-elegant",           "pelican-elegant"),  # Pelican theme
                ("https://github.com/ingwinlu/pelican-bootstrapify",  "pelican-bootstrapify"), # Pelican bootstrapify plug-in
                ("https://github.com/getpelican/pelican-plugins", "pelican-plugins"),
                (GITHUB_USERPAGE_REPO, "github-userpage")] # github repo for publishing


def remove_local_repository(local_path):
    print "Removing: ", local_path
    shutil.rmtree(local_path, ignore_errors=True)

def clone_repository(repo, local_path):
    remove_local_repository(local_path)
    print "Cloning repo to ", local_path
    sh.git.clone(["--depth=1", "--recursive", repo, local_path])
   

def clone_needed_repositories():
    for repo in REPOSITORIES:
        local_path = os.path.join(HOME, repo[1]) 
        clone_repository(repo[0], local_path)    
 
def remove_working_copies_of_repositories():
    for repo in REPOSITORIES:
        local_path = os.path.join(HOME, repo[1])
        remove_local_repository(local_path)

def build_web_page():
    pelican_chameleon_path = os.path.join(HOME, "pelican-elegant")
    print "Installing pelican-elegant theme from path: ", pelican_chameleon_path
    subprocess.call(["pelican-themes", "--remove", "pelican-elegant", "--verbose"])
    subprocess.call(["pelican-themes", "-i", pelican_chameleon_path, "--verbose"])

    # make web page
    working_dir = os.path.join(REPO_DIRECTORY, "pelican")
    os.chdir(working_dir)
    print "Create html in path: ", working_dir
    ret = subprocess.call(["pelican", "./content", "-o", "./output", "-s", "./pelicanconf.py"])
    if ret != 0:
      print("Error while running main")
      exit(1)

    # copy output to user page repo
    root_src_dir = os.path.join(working_dir, "output")
    root_dest_dir = os.path.join(HOME, "github-userpage")

    # clean up repository
    gitRepo = sh.git.bake(_cwd=root_dest_dir)
    gitRepo.rm("-rf", "*")

    # from http://stackoverflow.com/a/7420617
    for src_dir, dirs, files in os.walk(root_src_dir):
        dst_dir = src_dir.replace(root_src_dir, root_dest_dir)
        if not os.path.exists(dst_dir):
            os.mkdir(dst_dir)
        for file_ in files:
            src_file = os.path.join(src_dir, file_)
            dst_file = os.path.join(dst_dir, file_)
            if os.path.exists(dst_file):
                os.remove(dst_file)
            print " Moving file ", src_file, " to ", dst_dir
            shutil.move(src_file, dst_dir)

def publish_web_page():
     userpage_local_repo = os.path.join(HOME, "github-userpage")
     repo = sh.git.bake(_cwd=userpage_local_repo)
     repo.add("*")
     repo.commit(["-m", "Update Github page automated."])
     repo.push(["origin"])


if __name__ == "__main__":
    assert len(sys.argv) < 2
    clone_needed_repositories()
    build_web_page()
    publish_web_page()
    remove_working_copies_of_repositories()

