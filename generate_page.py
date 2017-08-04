import sys
import os
import shutil
import subprocess
from git import Repo
from os.path import expanduser
 
REPO_DIRECTORY = os.path.realpath(__file__)
REPO_DIRECTORY = os.path.split(REPO_DIRECTORY)[0]
HOME = expanduser("~")

GITHUB_USERPAGE_REPO = "https://github.com/LukasWoodtli/LukasWoodtli.github.io"
try:
    GIT_HUB_TOKEN =  os.environ['DEPLOY_KEY']
    GITHUB_USERPAGE_REPO = "https://{}github.com/LukasWoodtli/LukasWoodtli.github.io".format(GIT_HUB_TOKEN + "@")
except:
    pass

REPOSITORIES = [("https://github.com/LukasWoodtli/pelican-chameleon",           "pelican-chameleon"),  # Pelican chameleon theme
                ("https://github.com/ingwinlu/pelican-bootstrapify",  "pelican-bootstrapify"), # Pelican bootstrapify plug-in
                ("https://github.com/getpelican/pelican-plugins", "pelican-plugins"),
                (GITHUB_USERPAGE_REPO, "github-userpage")] # github repo for publishing


def remove_local_repository(local_path):
    print "Removing: ", local_path
    shutil.rmtree(local_path, ignore_errors=True)

def clone_repository(repo, local_path):
    remove_local_repository(local_path)
    print "Cloning repo to ", local_path
    Repo.clone_from(repo, local_path, depth=1)
   

def clone_needed_repositories():
    for repo in REPOSITORIES:
        local_path = os.path.join(HOME, repo[1]) 
        clone_repository(repo[0], local_path)    
 
def remove_working_copies_of_repositories():
    for repo in REPOSITORIES:
        local_path = os.path.join(HOME, repo[1])
        remove_local_repository(local_path)

def build_web_page():
    # installinc pelican-chameleon theme
    pelican_chameleon_path = os.path.join(HOME, "pelican-chameleon")
    print "Installing pelican-chameleon theme from path: ", pelican_chameleon_path
    print pelican_chameleon_path
    subprocess.call(["pelican-themes", "-i", pelican_chameleon_path])

    # make web page
    working_dir = os.path.join(REPO_DIRECTORY, "pelican")
    os.chdir(working_dir)
    print "make html in path: ", working_dir
    subprocess.call(["make", "html"])

    # copy output to user page repo
    root_src_dir = os.path.join(working_dir, "output")
    root_dest_dir = os.path.join(HOME, "github-userpage")

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
     repo = Repo(userpage_local_repo)
     repo.index.add("*")
     repo.index.commit("Update Github page automated.")
     repo.remotes.origin.push(repo.head)
     

if __name__ == "__main__":
    assert len(sys.argv) < 2
    clone_needed_repositories()
    build_web_page()
    publish_web_page()
    remove_working_copies_of_repositories()



    
    
