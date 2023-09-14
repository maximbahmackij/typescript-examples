import { createInterface } from "readline";

import { AnimalsType, AnimalColor } from "./const/animals.js";
import findAnimals from "./services/find-animals-service.js";
import questionAnimalType from "./services/get-animal-type-input-service.js";
import questionAnimalColor from "./services/get-color-type-input-service.js";
import questionAnimalCount from "./services/get-animal-count-input-service.js";
import InputController from "./controllers/input-controller.js";

interface Options {
  [key: string]: any;
  type?: AnimalsType;
  color?: AnimalColor;
  count?: number;
}

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});



const main = async () => {
  const inputController = new InputController(rl);

  const animalType = await inputController.handler(questionAnimalType);
  const animalColor = await inputController.handler(questionAnimalColor);
  const animalCount = await inputController.handler(questionAnimalCount);

  const options: Options = {
    type: animalType,
    color: animalColor,
    count: animalCount,
  };

  console.log("==OPTIONS==", options);
  console.log("Animal type:", options.type);
  console.log("Animal color:", options.color);
  console.log("Animal count:", options.count);

  findAnimals(options).doOn((left) => {
    console.log("==ERROR==");
    console.log(left?.reason() ?? "error");
    return left;
  },
    (right) => {
      console.log("==RESULT==");
      console.log(right);
      console.log("========")
      return right;
    });

  rl.close();
}

main();