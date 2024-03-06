export type CarExtraInfo = {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
};

export type User = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  imgUrl?: string;
  refreshTokens?: string[];
  likedPosts?: string[];
};

export type UserCredentials = {
  email: string;
  password: string;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthorizedUser = {
  user: User;
  tokens: Tokens;
};
