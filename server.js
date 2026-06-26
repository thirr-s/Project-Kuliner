const mime = {
  ".html": "text/html; charset=utf-8",
  ".css":  "text/css",
  ".js":   "text/javascript",
  ".json": "application/json",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png":  "image/png",
  ".gif":  "image/gif",
  ".webp": "image/webp",
  ".svg":  "image/svg+xml",
  ".ico":  "image/x-icon",
  ".woff": "font/woff",
  ".woff2":"font/woff2",
};

Bun.serve({
  port: 3000,
  hostname: "0.0.0.0",
  fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname === "/" ? "/index.html" : url.pathname;

    const file = Bun.file("." + path);
    const ext = path.substring(path.lastIndexOf(".")).toLowerCase();
    const contentType = mime[ext] || "application/octet-stream";

    return new Response(file, {
      headers: { "Content-Type": contentType },
    });
  },
});

console.log("Server running at http://localhost:3000");
