import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";

const app = express();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use(morgan("dev"));

const serve = async () => {
  app.use(express.static(path.join(path.join(__dirname, "public"))));

  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  app.get("/api", function (req, res) {
    res.send("hello world");
  });

  app.listen(3000, () => {
    console.log(`Server is running on 3000`);
  });
};

serve();
