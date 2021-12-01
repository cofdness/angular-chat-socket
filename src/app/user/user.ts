export interface User {
  name: string;
  email: string;
  picture: string;
  accessToken?: Token;
}
export interface Token {
  token: string;
}

export interface UserInput {
  email: string;
  password: string;
  name?: string;
}

export interface UserCompact {
  id: string;
  name: string;
  picture: string;
}

export interface Users {
  users: UserCompact[];
}
