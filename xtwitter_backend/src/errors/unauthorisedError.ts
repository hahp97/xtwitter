export class UnauthorisedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorisedError";
    Object.setPrototypeOf(this, UnauthorisedError.prototype);
  }
}
