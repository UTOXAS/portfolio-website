import os
import tkinter as tk
from tkinter import ttk, filedialog, messagebox


class FileSelectorApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Folder and File Selector")
        self.root.geometry("600x500")

        self.file_states = {}

        self.tree = ttk.Treeview(root, columns=("Path", "Checked"), show="tree")
        self.tree.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        current_directory = os.getcwd()
        self.populate_tree(current_directory, "")

        y_scroll = ttk.Scrollbar(root, orient="vertical", command=self.tree.yview)
        y_scroll.pack(side=tk.RIGHT, fill=tk.Y)
        self.tree.configure(yscrollcommand=y_scroll.set)

        x_scroll = ttk.Scrollbar(root, orient="horizontal", command=self.tree.xview)
        x_scroll.pack(side=tk.BOTTOM, fill=tk.X)
        self.tree.configure(xscrollcommand=x_scroll.set)

        btn_frame = ttk.Frame(root)
        btn_frame.pack(fill=tk.X, pady=5)

        ttk.Button(btn_frame, text="Load Directory", command=self.load_directory).pack(
            side=tk.LEFT, padx=5
        )
        ttk.Button(
            btn_frame, text="Combine Selected Files", command=self.combine_files
        ).pack(side=tk.LEFT, padx=5)

        ttk.Button(
            btn_frame, text="Export Directory Tree", command=self.export_selected_tree
        ).pack(side=tk.RIGHT, padx=5)

        self.tree.bind("<ButtonRelease-1>", self.toggle_selection)

    def load_directory(self):
        folder = filedialog.askdirectory()
        if not folder:
            return

        self.tree.delete(*self.tree.get_children())
        self.file_states.clear()
        self.populate_tree(folder, "")

    def populate_tree(self, parent_dir, parent_node):
        for item in sorted(os.listdir(parent_dir)):
            path = os.path.join(parent_dir, item)
            is_folder = os.path.isdir(path)

            node = self.tree.insert(
                parent_node, "end", text=f"⬜ {item}", values=(path,)
            )
            self.file_states[node] = False

            if is_folder:
                self.populate_tree(path, node)

    def toggle_selection(self, event):
        item = self.tree.identify_row(event.y)
        if not item:
            return

        current_text = self.tree.item(item, "text")
        checked = self.file_states[item]

        if checked:
            new_text = f"⬜ {current_text[2:]}"
        else:
            new_text = f"✔ {current_text[2:]}"

        self.tree.item(item, text=new_text)
        self.file_states[item] = not checked

        self.toggle_children(item, not checked)

    def toggle_children(self, parent, state):
        for child in self.tree.get_children(parent):
            current_text = self.tree.item(child, "text")
            new_text = f"✔ {current_text[2:]}" if state else f"⬜ {current_text[2:]}"
            self.tree.item(child, text=new_text)
            self.file_states[child] = state
            self.toggle_children(child, state)

    def get_selected_files(self):
        selected_files = []
        for item, checked in self.file_states.items():
            if checked:
                file_path = self.tree.item(item, "values")[0]
                if os.path.isfile(file_path):
                    selected_files.append(file_path)
        return selected_files

    def combine_files(self):
        selected_files = self.get_selected_files()

        if not selected_files:
            messagebox.showwarning(
                "No Files Selected", "Please select files to combine."
            )
            return

        output_file = "combined_code.txt"
        with open(output_file, "w", encoding="utf-8") as outfile:
            for file_path in selected_files:
                outfile.write(f"--- {file_path} ---\n")
                with open(file_path, "r", encoding="utf-8") as infile:
                    outfile.write(infile.read() + "\n\n")

        messagebox.showinfo("Success", f"Filed combined into {output_file}")

    def export_selected_tree(self):
        selected_items = self.get_selected_files()
        if not selected_items:
            messagebox.showwarning("No Selection", "Please select files/folders")
            return

        root_folder = os.path.commonpath(selected_items)
        tree_structure = self.generate_selected_tree(root_folder, selected_items)

        # folder = os.getcwd()

        # tree_structure = self.generate_directory_tree(folder)
        outout_file = "directory_tree.txt"
        with open(outout_file, "w", encoding="utf-8") as file:
            file.write(tree_structure)

        messagebox.showinfo("success", f"Directory tree saved to {outout_file}")

    def generate_selected_tree(self, root_folder, selected_items, prefix=""):
        """
        Generates a hierarchical tree structure only for selected files and folders.
        """
        tree_dict = {}

        for path in selected_items:
            relative_path = os.path.relpath(path, root_folder)
            parts = relative_path.split(os.sep)
            current_dict = tree_dict

            for part in parts:
                if part not in current_dict:
                    current_dict[part] = {}
                current_dict = current_dict[part]

        def format_tree(directory, prefix=""):
            """Recursively formats the tree dictionary into a string"""

            # tree_string = f"{prefix}{os.path.basename(root_folder)}/\n"
            tree_string = ""

            items = sorted(directory.keys())

            for index, item in enumerate(items):
                is_last = index == len(items) - 1
                # path = os.path.join(root_folder, item)
                # relative_path = os.path.relpath(item, root_folder)
                # parts = relative_path.split(os.sep)
                # is_folder = os.path.isdir(relative_path)
                # connector = "│   " if index < len(items) - 1 else "    "
                branch = "└── " if is_last else "├── "

                tree_string += f"{prefix}{branch}{item}\n"

                if directory[item]:
                    new_prefix = prefix + ("    " if is_last else "│   ")
                    tree_string += format_tree(directory[item], new_prefix)
                # if is_folder:
                # tree_string += f"{prefix}{branch}{item}/\n"
                # tree_string += self.generate_selected_tree(relative_path, prefix + connector)
                # else:
                # tree_string += f"{prefix}{branch}{item}\n"

            return tree_string

        return f"{os.path.basename(root_folder)}/\n" + format_tree(tree_dict)


if __name__ == "__main__":
    root = tk.Tk()
    app = FileSelectorApp(root)
    root.mainloop()
