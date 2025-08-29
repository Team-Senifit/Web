export class AuthError extends Error {
  constructor(public redirectTo = "/login") {
    super("AUTH_REQUIRED");
  }
}
export const isAuthError = (e: unknown): e is AuthError =>
  e instanceof AuthError;
