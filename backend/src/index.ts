import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import boardsRouter from "./routes/board.routes.js";
import columnsRouter from "./routes/column.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is running!");
});

app.use("/auth", authRouter);
app.use(boardsRouter);
app.use(columnsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
