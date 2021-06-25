import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";

import apiRoutes from "./routes/api";
import coreRoutes from "./routes/core";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(morgan("dev"));

const serve = async () => {
  app.use("/api", apiRoutes);
  app.use("/core", coreRoutes);

  app.use(express.static(path.join(path.join(__dirname, "public"))));

  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  app.listen(3000, () => {
    console.log(`Server is running on 3000`);
  });
};

serve();
