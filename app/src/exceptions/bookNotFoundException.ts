export class BookNotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BookNotFoundException";
  }
}
