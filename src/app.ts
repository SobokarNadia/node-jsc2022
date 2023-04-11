import express, { Application, NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";
import fileUploader from "express-fileupload";
import { Server, Socket } from "socket.io";
import * as http from "http";

import { configs } from "./configs";
import { authRouter, carRouter, userRouter } from "./routers";
import { IError } from "./types";
import { cronRunner } from "./crons";

const app: Application = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  console.log(socket.id);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUploader());

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/car", carRouter);

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;

  return res.status(status).json({
    message: err.message,
    status,
  });
});

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  cronRunner();
  console.log(`Server run on ${configs.PORT}`);
});
