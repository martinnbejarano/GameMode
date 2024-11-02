import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import indexRoutes from "./routes/index.routes.js";
import { envConfig } from "./utils/env.config.js";
import { connectToMongoDB } from "./DB/dbConnection.js";
import path from "path";

const app = express();
const PORT = envConfig.PORT || 3000;

app.use(
  cors({
    origin: envConfig.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", indexRoutes);

app.use(
  "/images",
  express.static(path.join(process.cwd(), "..", "frontend", "public", "images"))
);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
