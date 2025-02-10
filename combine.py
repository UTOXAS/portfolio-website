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


if __name__ == "__main__":
    root = tk.Tk()
    app = FileSelectorApp(root)
    root.mainloop()
