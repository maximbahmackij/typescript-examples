import { createInterface, Interface } from "readline";

import { Either } from "../utils/either.js";
import { InputFailure } from "../failures/input-failure.js";

class InputController {
  private readonly rl: Interface;

  constructor(rl: Interface) {
    this.rl = rl;
  }

  async handler<T>(func: (rl: Interface) => Promise<Either<InputFailure, T>>): Promise<T> {
    let result: T | null = null;

    while (!result) {
      const either = await func(this.rl);
      result = await (new Promise((resolve) => {
        either.doOn(
          (left) => {
            console.log(left?.reason() ?? "error");
            resolve(null);
            return left;
          },
          (right) => {
            resolve(right);
            return right;
          });
      }));
    }

    return result;
  }
}

export default InputController;