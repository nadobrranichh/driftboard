import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import boardsRouter from "./routes/board.routes.js";
import columnsRouter from "./routes/column.routes.js";
import tasksRouter from "./routes/task.routes.js";
import usersRouter from "./routes/users.routes.js";
import { authenticateSocketConnection } from "./middleware/auth.middleware.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is running!");
});

app.use("/auth", authRouter);
app.use(boardsRouter);
app.use(columnsRouter);
app.use(tasksRouter);
app.use(usersRouter);

const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

io.use(authenticateSocketConnection);

io.on("connection", (socket) => {
  console.log("client connected", socket.id);
  socket.join(socket.data.user.id.toString());

  socket.on("open-board", ({ boardId }: { boardId: number }) => {
    console.log(`BOARD ${boardId} OPENED BY`, socket.data.user.id);
    socket.join(`board-${boardId}`);
  });
  socket.on("close-board", ({ boardId }: { boardId: number }) => {
    console.log(`BOARD ${boardId} CLOSED BY`, socket.data.user.id);
    socket.leave(`board-${boardId}`);
  });

  socket.on("disconnect", () => {
    console.log("client disconnected", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
