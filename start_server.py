import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import subprocess
import os
import signal


class RestartHandler(FileSystemEventHandler):
    def __init__(self, process):
        self.process = process

    def on_modified(self, event):
        print(f"File changed: {event.src_path}. Restarting server...")
        os.kill(self.process.pid, signal.SIGTERM)
        self.process = subprocess.Popen(["python", "-m", "http.server"])


if __name__ == "__main__":
    process = subprocess.Popen(["python", "-m", "http.server"])
    event_handler = RestartHandler(process)
    observer = Observer()
    observer.schedule(event_handler, path=".", recursive=True)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
