import http.server
import socketserver
import os
import argparse

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, base_path=None, **kwargs):
        self.base_path = base_path or "."  # Default to current directory
        super().__init__(*args, **kwargs)

    def translate_path(self, path):
        # Remove the specified base path from the URL
        if self.base_path and path.startswith("/" + self.base_path):
            path = path[len("/" + self.base_path):]
            if not path:
                path = "/" # Ensure we still have a path
        elif self.base_path:
            return None # 404 if base path not used in URL
        return super().translate_path(path)


def run_server(port, base_path):
    Handler = lambda *args, **kwargs: MyHandler(*args, base_path=base_path, **kwargs)
    with socketserver.TCPServer(("", port), Handler) as httpd:
        print(f"Serving at port {port} with base path /{base_path or ''}")
        httpd.serve_forever()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Simple HTTP Server with Base Path")
    parser.add_argument("-p", "--port", type=int, default=3000, help="Port to listen on")
    parser.add_argument("-b", "--base", type=str, default="", help="Base path for URL")
    args = parser.parse_args()

    run_server(args.port, args.base)