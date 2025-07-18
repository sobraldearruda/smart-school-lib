export class AuthorNotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthorNotFoundException";
  }
}
