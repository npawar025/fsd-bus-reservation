import express from "express";
import connectDB from "./db/connect.js";
import * as dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import busRouter from "./routes/busRoute.js";
import bookingRouter from "./routes/bookingsRoute.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.set("trust proxy", 1);

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use("/api/users", userRouter);
app.use("/api/buses", busRouter);
app.use("/api/bookings", bookingRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
