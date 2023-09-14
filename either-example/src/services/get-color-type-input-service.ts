import { Interface } from "readline";

import { Either } from "../utils/either.js";
import { InputFailure } from "../failures/input-failure.js";
import { AnimalColor } from "../const/animals.js";

function isColorType(input: string): input is AnimalColor {
  return input === "black" || input === "white";
};

const questionAnimalColor = (rl: Interface): Promise<Either<InputFailure, AnimalColor>> => {
  return new Promise((resolve) => {
    rl.question("Enter color type (black, white): ", (answer) => {
      if (isColorType(answer)) {
        resolve(Either.Right(answer));
      } else {
        resolve(Either.Left(InputFailure.invalidAnimalColor()));
      }
    })
  })
};

export default questionAnimalColor;