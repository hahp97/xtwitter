export class NoResultReturnedError extends Error {
  constructor(message?: string) {
    super(message || "No result was returned from operation");
    this.name = "NoResultReturnedError";
  }
}
