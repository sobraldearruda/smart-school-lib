export class DuplicateRegistrationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DuplicateRegistrationException";
  }
}
