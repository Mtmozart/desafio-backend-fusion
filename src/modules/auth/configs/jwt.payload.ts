export interface JwtPayload {
  email: string;
  sub: string;
  roles: string[];
  iat: number;
  exp: number;
}