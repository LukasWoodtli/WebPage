import os
import csv

THIS_FILES_PATH = os.path.realpath(__file__)
THIS_FILES_FOLDER_PATH = os.path.split(THIS_FILES_PATH)[0]

OUT_PATH = "/Users/Boot/projects/yoursite/content/pages/"

COLUMN_WIDTH = 60

class Skill:
    def __init__(self, skill, category, rating):
        self.skill = skill
        self.category = category
        self.rating = rating

    def __init__(self, cells):
        self.skill = cells[0].strip()
        self.category = cells[1].strip()
        self.rating = cells[2].strip()

    def __repr__(self):
        return self.skill + " | " + self.rating

def get_skills(file):
    csv_file  = open(file)
    return csv.DictReader(csv_file, ["skill", "category", "rating"], delimiter=';')

def create_md_row(first_col, second_col):
    return first_col + " "*(COLUMN_WIDTH-len(first_col)) + "|" + second_col + " "*(COLUMN_WIDTH-len(second_col)) + "\n"

def main():
    categories = {}
    for skill in get_skills(os.path.join(THIS_FILES_FOLDER_PATH, "Skills.csv")):
        category = skill["category"].strip()
        if category in categories.keys():
            categories[category].append(skill)
        else:
            categories[category] = [skill]

    with open(os.path.join(OUT_PATH, "skills.md"), 'w') as out_file:
        out_file.write("Title: Skills" + "\n")
        for category, skills  in categories.iteritems():
            out_file.write("#" + category + "\n")
            out_file.write(create_md_row("what", "knowledge"))
            out_file.write(create_md_row("-"*COLUMN_WIDTH,  "-"*COLUMN_WIDTH))
            for skill in skills:
                out_file.write(create_md_row(skill["skill"].strip(), skill["rating"].strip()))
            out_file.write("\n")


if __name__ == "__main__":
    main()