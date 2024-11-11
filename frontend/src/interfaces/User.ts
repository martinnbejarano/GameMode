export interface User {
  _id?: string;
  email?: string;
  username?: string;
  birthday?: Date;
  profilePicture?: string | null;
  games?: string[];
  wishlist?: string[];
  cart?: string[];
  type?: "user" | "company";
}
