import { Interface } from "readline";

import { Either } from "../utils/either.js";
import { InputFailure } from "../failures/input-failure.js";

const questionAnimalCount = (rl: Interface): Promise<Either<InputFailure, number>> => {
  return new Promise((resolve) => {
    rl.question("Enter animal count: ", (answer) => {
      const count = parseFloat(answer);
      if (!isNaN(count)) {
        resolve(Either.Right(count));
      } else {
        resolve(Either.Left(InputFailure.invalidAnimalCount()));
      }
    })
  })
};

export default questionAnimalCount;