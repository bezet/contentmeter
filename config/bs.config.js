module.exports = {
  server: {
    baseDir: "docs",
    index: "index.html",
    middleware: (req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
    }
  },
  files: [
    "docs/**/*"
  ],
  notify: false
};
