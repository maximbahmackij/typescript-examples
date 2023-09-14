import { Either } from "../utils/either.js";
import { GetAnimalsFailure } from "../failures/get-animals-failure.js";
import animals, { AnimalsType, AnimalColor, Animal } from "../const/animals.js";

interface Options {
  [key: string]: any;
  type?: AnimalsType;
  color?: AnimalColor;
  count?: number;
}

const findAnimals = (options: Options): Either<GetAnimalsFailure, Animal[]> => {

  if (!Object.keys(options).length || (options?.count !== undefined && options?.count < 0)
  ) {
    return Either.Left(GetAnimalsFailure.invalid());
  }

  const foundAnimals = animals.filter((animal: { [key: string]: any }) => {
    for (const [key, value] of Object.entries<typeof options>(options)) {
      if (animal[key] !== value) {
        return false;
      }
    }
    return true;
  });

  if (!foundAnimals.length) {
    return Either.Left(GetAnimalsFailure.notFound());
  }

  return Either.Right(foundAnimals);
}

export default findAnimals;