export class GetAnimalsFailure {
  public static invalid() {
    return new GetAnimalsFailure("You have entered invalid data");
  }

  public static notFound() {
    return new GetAnimalsFailure("Animals not found");
  }

  constructor(readonly cause: string) {
    this.cause = cause;
  }

  reason(): string {
    return this.cause;
  }
}