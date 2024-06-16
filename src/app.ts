import express, { Application } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use("/api", router);

app.use(globalErrorHandler);
app.use(notFound);
app.get("/", (req, res) => {
  res.send("App is Running");
});

export default app;
