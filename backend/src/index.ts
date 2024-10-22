import express from "express";
import cookieParser from "cookie-parser";
import indexRoutes from "./routes/index.routes.js";
import { envConfig } from "./utils/env.config.js";
import { connectToMongoDB } from "./DB/dbConnection.js";

const app = express();
const PORT = envConfig.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", indexRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
