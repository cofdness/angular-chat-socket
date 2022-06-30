export interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  accessToken?: Token;
  friends?: UserCompact[];
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
