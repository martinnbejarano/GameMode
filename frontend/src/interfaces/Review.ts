export interface Review {
  _id?: string;
  userId: string;
  userName: string;
  userAvatar: string;
  gameId: string;
  rating: number;
  content: string;
  date: string;
}
