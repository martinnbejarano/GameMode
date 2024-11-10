export interface Review {
  _id: string;
  user: {
    _id: string;
    username: string;
    profilePicture?: string;
  };
  game: string;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}
