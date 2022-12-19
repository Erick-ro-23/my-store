export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  // edad?: number;
}
export interface CreateUsertoDTO extends Omit<User, 'id'> {}
// -------------------------------

export interface UserLogin {
  email: string;
  password: string;
}
