import express, { Application } from "express";
import cors from "cors";
import router from "./app/routes";

const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("App is Running");
});

export default app;
