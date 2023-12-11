// Method decorators

// step-01

function LogMethod(target: any, name: string, description: PropertyDescriptor) {
  console.log(
    `Method "${name}" of class "${target.constructor.name}" is called`
  );
}

class MyClassMethod {
  @LogMethod
  myMethod() {
    console.log("Hello, world!");
  }
}

let obj = new MyClassMethod(); // Method "myMethod" of class "MyClassMethod" is called
obj.myMethod();

// step-02

function validateString() {
  return function (
    target: any,
    propertyName: string,
    description: PropertyDescriptor
  ) {
    const originalMethod = description.value;

    description.value = function (...args: any[]) {
      if (typeof args[0] !== "string") {
        throw new Error("Invalid input. Expected a string.");
      }

      return originalMethod.apply(this, args);
    };
  };
}

class MyClassValidateString {
  @validateString()
  public print(value: string) {
    console.log(`Received value: ${value}`);
  }
}

const instance = new MyClassValidateString();
instance.print("Hello");

// instance.print(123);  // Error: Invalid input. Expected a string.

// step-03

function addTax(taxPercent: number) {
  return (_: any, _2: string, description: PropertyDescriptor) => {
    // We get the original method

    const method = description.value as Function;

    return {
      configurable: true,
      enumerable: false,
      get() {
        return (...args: any[]) => {
          // Call the original method and get its result.
          const result = method.apply(this, args);

          // Add the tax to the result.
          return result * (result / 100) * taxPercent;
        };
      },
    };
  };
}

class Payment {
  @addTax(20)
  pay(money: number): number {
    return money;
  }
}

const payment = new Payment();

console.log("Amount with tax: ", payment.pay(100)); // Amount with tax:120;
