export class InputFailure {
  public static invalidAnimalType() {
    return new InputFailure("InputError: You have entered invalid animal type (available: wolf, bunny, pig, monkey)");
  }

  public static invalidAnimalColor() {
    return new InputFailure("InputError: You have entered invalid animal color (available: black, white)");
  }

  public static invalidAnimalCount() {
    return new InputFailure("InputError: You have entered invalid animal count.");
  }

  constructor(readonly cause: string) {
    this.cause = cause;
  }

  reason(): string {
    return this.cause;
  }
}