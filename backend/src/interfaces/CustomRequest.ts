import { Request } from "express";
import { IUser } from "./IUser.js";
import { ICompany } from "./ICompany.js";

interface CustomRequest extends Request {
  user?: IUser;
  company?: ICompany;
}

export default CustomRequest;
