export type AnimalsType = "wolf" | "bunny" | "pig" | "monkey";
export type AnimalColor = "black" | "white";

export interface Animal {
  type: AnimalsType;
  color: AnimalColor;
  count: number;
}

export default [
  {
    type: "wolf",
    color: "black",
    count: 25,
  },
  {
    type: "wolf",
    color: "white",
    count: 13,
  },
  {
    type: "pig",
    color: "black",
    count: 23,
  },
  {
    type: "monkey",
    color: "black",
    count: 3,
  },
  {
    type: "bunny",
    color: "white",
    count: 7,
  },
  {
    type: "bunny",
    color: "black",
    count: 17,
  }
] as Animal[];