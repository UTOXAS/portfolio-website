import shutil
import os
import tkinter as tk
from tkinter import filedialog


def copy_and_rename_file(source_file, num_copies, new_base_name):
    """
    Copies a file multiple times with renamed filenames, including extension changes.

    Args:
        source_file: The path to the source file.
        num_copies: The number of copies to create.
        new_base_name: The base name for the new files (including the desired extension).
    """

    try:
        if not os.path.exists(source_file):
            raise FileNotFoundError(f"Source file '{source_file}' not found.")

        source_dir = os.path.dirname(source_file)

        new_base_name_only, new_file_extension = os.path.splitext(new_base_name)

        for i in range(1, num_copies + 1):
            new_file_name = f"{new_base_name_only}{i}{new_file_extension}"
            new_file_path = os.path.join(source_dir, new_file_name)

            shutil.copy2(source_file, new_file_path)
            print(f"File '{source_file}' copied to '{new_file_path}'")

    except FileNotFoundError as e:
        print(f"Error: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    while True:
        source_file = input("Enter the path to the source file: ")
        if os.path.exists(source_file):
            break
        else:
            print("File not found. Please enter a valid path.")

    while True:
        try:
            num_copies = int(input("Enter the number of copies to create: "))
            if num_copies > 0:
                break
            else:
                print("Number of copies must be greater than zero.")
        except ValueError:
            print("Invalid input. Please enter a number.")

    new_base_name = input(
        "Enter the base name for the new files (including the extension, e.g., project.png: )"
    )

    copy_and_rename_file(source_file, num_copies, new_base_name)
