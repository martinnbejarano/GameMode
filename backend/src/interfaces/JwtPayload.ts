export default interface JwtPayload {
  id: string;
  role: "user" | "company";
}
