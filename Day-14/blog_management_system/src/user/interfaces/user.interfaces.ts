export interface UserInterface {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  posts: any[];
  createdAt: Date;
  updatedAt: Date;
  refreshToken: string;
  hashPassword?(): Promise<void>;
  isPasswordCorrect?(password: string): Promise<boolean>;
  generateAccessToken?(role: string): Promise<string>;
  generateRefreshToken?(): Promise<string>;
}
