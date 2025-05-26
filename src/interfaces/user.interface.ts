export interface User {
  id: string;
  name: string;
  image?: string | null;
  email: string;
  emailVerified?: Date | null;
  password: string;
  role: string;
}