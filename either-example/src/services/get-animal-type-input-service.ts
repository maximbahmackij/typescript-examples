import { Interface } from "readline";

import { Either } from "../utils/either.js";
import { InputFailure } from "../failures/input-failure.js";
import { AnimalsType } from "../const/animals.js";

function isAnimalsType(input: string): input is AnimalsType {
  return input === "wolf"
    || input === "bunny"
    || input === "monkey"
    || input === "pig";
};

const questionAnimalType = (rl: Interface): Promise<Either<InputFailure, AnimalsType>> => {
  return new Promise((resolve) => {
    rl.question("Enter animal type (wolf, bunny, pig, monkey): ", (answer) => {
      if (isAnimalsType(answer)) {
        resolve(Either.Right(answer));
      } else {
        resolve(Either.Left(InputFailure.invalidAnimalType()));
      }
    })
  })
};

export default questionAnimalType;