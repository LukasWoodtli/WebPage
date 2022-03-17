#!/usr/bin/env python3

import fileinput
import os


def handle_metadata_line(line):
    meta_data = line.split(":")
    meta_key = meta_data[0].strip().lower()
    meta_value = ""
    if len(meta_data) > 1:
        meta_value = meta_data[1].strip()
    if meta_key == "tags":
        print(f"{meta_key}: [{meta_value}]")
    else:
        print(f"{meta_key}: {meta_value}")


for root, dirs, files in os.walk('/Users/lukaswoodtli/Development/WebPage/content/'):
    for file in files:
        if file.endswith(".md"):
            md_file = os.path.join(root, file)

            with fileinput.input(files=(md_file), inplace=True) as f:
                metadata_handled = False
                for i, line in enumerate(f, start=0):
                    if i == 0:
                            print("---")
                            handle_metadata_line(line)
                    elif not metadata_handled:
                        if len(line.strip()) == 0:
                            metadata_handled = True
                            print("---")
                        else:
                            handle_metadata_line(line)

                    elif metadata_handled:
                        print(line, end="")
