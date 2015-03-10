__author__ = 'Boot'

import os
import csv
from collections import OrderedDict



THIS_FILES_PATH = os.path.realpath(__file__)
THIS_FILES_FOLDER_PATH = os.path.split(THIS_FILES_PATH)[0]

COLUMN_WIDTH = 50

def create_md_row(name, authors, publisher):
    str = "| "
    str += name + " "*(COLUMN_WIDTH-len(name)) +"| "
    str += authors + " "*(COLUMN_WIDTH-len(authors)) +"| "
    str += publisher + " "*(COLUMN_WIDTH-len(publisher)) +"|\n"
    return str

def get_books(file):
    csv_file  = open(file)
    return csv.DictReader(csv_file, ["name", "category", "authors", "publisher"], delimiter=';')

def main():
    booksList = get_books(os.path.join(THIS_FILES_FOLDER_PATH, "bookshelf.csv"))
    booksList = list(booksList)
    categories = []
    for book in booksList:
        categories.append(book["category"])
    categories = list(OrderedDict.fromkeys(categories))

    with open(os.path.join(THIS_FILES_FOLDER_PATH, "bookshelf.md"), 'w') as out_file:
        out_file.write("Title: Books\n")
        for category in categories:
            out_file.write("\n#" + category + "\n")
            out_file.write(create_md_row("Name", "Authors", "Publisher"))
            separator = "-"*COLUMN_WIDTH
            out_file.write(create_md_row(separator, separator, separator))
            for book in booksList:
                if book["category"] == category:
                    out_file.write(create_md_row(book["name"], book["authors"], book["publisher"]))


if __name__ == "__main__":
    main()