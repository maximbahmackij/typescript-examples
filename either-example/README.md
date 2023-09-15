# TypeScript Either example

This is a simple project to search for values in an array based on entered parameters, with an implementation of type `Either`

**Either** - is a data type often used in functional programming to handle results that can have two possible states: `Left` and `Right`. It contains some value in the `Left` property or some value in the Right property, but never both at once. Most of the time, we store a possible error value in `Left` and the data value in `Right`.

####Simple Either class example
```typescript
// Define the Either class
class Either<Left, Right> {
	private leftValue: Left | null = null;
	private rightValue: Right | null = null;

	private constructor(left: Left | null, right: Right | null) {
		this.leftValue = left;
		this.rightValue = right;
	}

	// Create an instance of Either with a left value (error)
	static Left<Left, Right>(left: Left): Either<Left, Right> {
		return new Either<Left, Right>(left, null);
	}

  // Create an instance of Either with the right value (success)
	static Right<Left, Right>(right: Right): Either<Left, Right> {
		return new Either<Left, Right>(null, right);
	}

	// Get the value from Either
	get value(): Left | Right {
		if (this.leftValue !== null) {
			return this.leftValue;
		} else if (this.rightValue !== null) {
			return this.rightValue;
		} else {
			throw new Error("Either has no value.");
		}
	}

	// Check if Either is an error (left value)
	isLeft(): boolean {
		return this.leftValue !== null;
	}

	// Check if Either is a success (right value)
	isRight(): boolean {
		return this.rightValue !== null;
	}

  // Apply the function to the value if it is a success (right value)
	map<U>(fn: (value: Right) => T): this | Either<Left, T> {
		if (this.isRight()) {
			return Either.Right(fn(this.rightValue));
		} else {
			return this;
		}
	}
}
```

#### Usage example
```typescript
function divide(a: number, b: number): Either<string, number> {
	if (b === 0) {
		return Either.Left('Division by zero');
	} else {
    	return Either.Right(a / b);
	}
}

const result = divide(5, 3);

if (result.isRight()) {
	console.log(`Result: ${result.value}`);
} else {
	console.error(`Error: ${result.value}`);
}
```

In the example above, we created a simple `Either` class, which we then used in the `divide` function. With the `Either` type we can determine exactly what result we got using the `isLeft` and `isRight` methods, and we also know what data we will get (because we specified it in the `Either<string, number>` type) and we can handle it correctly in all cases.

In this project for the `Either` type are also implemented the `getOrElse` and `doOn` methods
**getOrElse()** - Allows you to get the right value, and if it is not present, return the default value passed to this function.
**doOn()** - Allows to process both right and left values at once. 
```typescript
either.getOrElse(()=>defaultValue); //return Right or defaultValue

either.doOn(
	(left)=>return left,
	(right)=>return right
); //return Left or Right
```

### Setup

```shell
git clone
cd either-example
npm install
npm run dev
```

### Use
In the console, answer all the questions, and if a match is found you will receive a result, otherwise an error.

## Resources

- [NodeJs](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [ts-node](https://www.npmjs.com/package/ts-node)