import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

fs.readdir(path.join(__dirname, "../resources"), (err, list) => {
  if (err) return;

  list.forEach((fp) => {
    const resourceConfig = fs.readFileSync(
      path.join(__dirname, `../resources/${fp}`),
      "utf-8"
    );

    const { name, methods } = JSON.parse(resourceConfig);

    methods.forEach((methodKey) => {
      const method = methodKey.toLowerCase();
      router[method](`/${name}`, (req, res) => {
        return res.send(`${method} ${name}`);
      });
    });
  });
});

router.get("/", function (req, res) {
  return res.send("hello world");
});

export default router;
