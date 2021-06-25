import express from "express";

const router = express.Router();

router.get("/", function (req, res) {
  return res.send("hello world");
});

// resource
router.get("/resource", function (req, res) {
  return res.send("get resource");
});

router.post("/resource", function (req, res) {
  return res.send("post resource");
});

router.put("/resource", function (req, res) {
  return res.send("put resource");
});

router.delete("/resource", function (req, res) {
  return res.send("delete resource");
});

export default router;
