export default interface JwtPayload {
  _id: string;
  role: "user" | "company";
}
