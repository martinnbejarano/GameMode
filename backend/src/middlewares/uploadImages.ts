import multer from "multer";
import path from "path";
import CustomRequest from "../interfaces/CustomRequest.js";

export const storage = multer.diskStorage({
  destination: (
    req: CustomRequest,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    const frontendPath = path.join(
      process.cwd(),
      "..",
      "frontend",
      "public",
      "images"
    );
    cb(null, frontendPath);
  },
  filename: (
    req: CustomRequest,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
