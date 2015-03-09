import os
import csv
from collections import namedtuple

Page = namedtuple('Page', 'FileName Title SectionColumn AllColumns')


SkillsPage = Page("skills.csv", "Skills", "category", ["skill", "category", "rating"])
BooksPage = Page("bookshelf.csv", "Bookshelf", "category", ["name", "category", "authors", "publisher"])


THIS_FILES_PATH = os.path.realpath(__file__)
THIS_FILES_FOLDER_PATH = os.path.split(THIS_FILES_PATH)[0]

OUT_PATH = "/Users/Boot/projects/yoursite/content/pages/"

COLUMN_WIDTH = 60


def get_skills(file, columns):
    csv_file  = open(file)
    return csv.DictReader(csv_file, columns, delimiter=';')

def create_md_row(first_col, second_col):
    return "| " + first_col + " | " + second_col  + " |\n"

def main():

    data = SkillsPage # make loop

    fileName = data.FileName
    title = data.Title
    sectionColumn = data.SectionColumn
    allColumns = data.AllColumns
    categories = {}
    for skill in get_skills(os.path.join(THIS_FILES_FOLDER_PATH, fileName), allColumns):
        category = skill[sectionColumn].strip()
        if category in categories.keys():
            categories[category].append(skill)
        else:
            categories[category] = [skill]

    with open(os.path.join(OUT_PATH, "skills.md"), 'w') as out_file:
        out_file.write("Title: " + title + "\n")
        for category, skills  in categories.iteritems():
            out_file.write("#" + category + "\n")
            out_file.write(create_md_row("what", "knowledge"))
            out_file.write(create_md_row("-"*COLUMN_WIDTH,  "-"*COLUMN_WIDTH))
            for skill in skills:
                out_file.write(create_md_row(skill["skill"].strip(), skill["rating"].strip()))
            out_file.write("\n")


if __name__ == "__main__":
    main()