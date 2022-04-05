#!/usr/bin/env python3

import sys
import os
import shutil
import subprocess
import sh


REPO_DIRECTORY = os.path.realpath(__file__)
REPO_DIRECTORY = os.path.split(REPO_DIRECTORY)[0]
ROOTDIR_FOR_REPOS = os.path.join(REPO_DIRECTORY, "..")
print("ROOTDIR_FOR_REPOS: ", ROOTDIR_FOR_REPOS)

GITHUB_USERPAGE_REPO = "https://github.com/LukasWoodtli/LukasWoodtli.github.io"
try:
    GIT_HUB_TOKEN =  os.environ['DEPLOY_KEY']
    GITHUB_USERPAGE_REPO =\
        "https://{}github.com/LukasWoodtli/LukasWoodtli.github.io"\
            .format(GIT_HUB_TOKEN + "@")
except:
    pass

PELICAN_THEME = "pelican-elegant" # needs to be set in pelicanconf.py

REPOSITORIES = [("https://github.com/LukasWoodtli/" + PELICAN_THEME,
                 PELICAN_THEME),  # Pelican theme
                ("https://github.com/ingwinlu/pelican-bootstrapify",
                 "pelican-bootstrapify"), # Pelican bootstrapify plug-in
                ("https://github.com/getpelican/pelican-plugins",
                 "pelican-plugins"),
                (GITHUB_USERPAGE_REPO, "github-userpage")] # github repo for publishing


def remove_local_repository(local_path):
    print("Removing: ", local_path)
    shutil.rmtree(local_path, ignore_errors=True)

def clone_repository(repo, local_path):
    remove_local_repository(local_path)
    print("Cloning repo to ", local_path)
    sh.git.clone(["--recursive", repo, local_path])

def clone_needed_repositories():
    for repo in REPOSITORIES:
        local_path = os.path.join(ROOTDIR_FOR_REPOS, repo[1])
        clone_repository(repo[0], local_path)

def remove_working_copies_of_repositories():
    for repo in REPOSITORIES:
        local_path = os.path.join(ROOTDIR_FOR_REPOS, repo[1])
        remove_local_repository(local_path)

def build_web_page():
    pelican_theme_path = os.path.join(ROOTDIR_FOR_REPOS, PELICAN_THEME)
    print("Installing pelican-elegant theme from path: ", pelican_theme_path)
    subprocess.call(["pelican-themes", "--remove", PELICAN_THEME, "--verbose"])
    subprocess.call(["pelican-themes", "-i", pelican_theme_path, "--verbose"])

    # Build web page
    os.chdir(REPO_DIRECTORY)
    print("Create html in path: ", REPO_DIRECTORY)
    ret = subprocess.call(["pelican", "./content", "-o", "./output", "-s", "./pelicanconf.py"])
    if ret != 0:
        print("Error while running main")
        sys.exit(1)

    # copy output to user page repo
    root_src_dir = os.path.join(REPO_DIRECTORY, "output")
    root_dest_dir = os.path.join(ROOTDIR_FOR_REPOS, "github-userpage")

    # clean up repository
    try:
        git_repo = sh.git.bake(_cwd=root_dest_dir)
        git_repo.rm("-rf", "*")
    except sh.ErrorReturnCode:
        pass

    # from http://stackoverflow.com/a/7420617
    for src_dir, _, files in os.walk(root_src_dir):
        dst_dir = src_dir.replace(root_src_dir, root_dest_dir)
        if not os.path.exists(dst_dir):
            os.mkdir(dst_dir)
        for file_ in files:
            src_file = os.path.join(src_dir, file_)
            dst_file = os.path.join(dst_dir, file_)
            if os.path.exists(dst_file):
                os.remove(dst_file)
            print(" Moving file ", src_file, " to ", dst_dir)
            shutil.move(src_file, dst_dir)

def publish_web_page():
    userpage_local_repo = os.path.join(ROOTDIR_FOR_REPOS, "github-userpage")
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
