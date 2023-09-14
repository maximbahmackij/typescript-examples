export class Either<Left, Right = undefined> {

  static Left = <Left, Right>(value: Left) => {
    return new Either<Left, Right>(value);
  }

  static Right = <Left, Right>(value: Right | undefined) => {
    return new Either<Left, Right>(undefined, value);
  }

  private readonly leftValue?: Left;
  private readonly rightValue?: Right;
  constructor(leftValue?: Left, rightValue?: Right | undefined) {
    this.leftValue = leftValue;
    this.rightValue = rightValue;
  }

  isLeft(): boolean {
    return this.leftValue !== undefined;
  }

  isRight(): boolean {
    return this.rightValue !== undefined;
  }

  map<T>(func: (value: Right) => T): this | Either<Left, T> {
    return this.rightValue ? Either.Right(func(this.rightValue)) : this;
  }

  getOrElse<T>(fucn: () => T): Right | T {
    if (this.rightValue) {
      return this.rightValue;
    }
    return fucn();
  }

  doOn(left: (value: Left | undefined) => Left | undefined, right: (value: Right) => Right) {
    if (this.rightValue) {
      return right(this.rightValue);
    } else {
      return left(this.leftValue);
    }
  }
}