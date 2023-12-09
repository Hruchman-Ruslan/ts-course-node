// Decorators

// step-01

function Logger(constructor: Function) {
  console.log("Logging...");
  console.log(constructor);
}

@Logger
class Controller {
  public id = 1;
}

// step-02

function addProperty(constructor: Function) {
  constructor.prototype.myProperty = "Hello";
}

@addProperty
class MyClass {}

const myInstance = new MyClass();
console.log((myInstance as any).myProperty); // Outputs "Hello"

// factories of decorators

function FactoriesLogger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
  };
}

// step-01

// Now we can pass parameters to the decorator.
// @FactoriesLogger("LOGGING - CONTROLLER")
// class ControllerFactories {
//   public id = 1;
// }

// step-02

function AddProperty() {
  return function <T extends { new (...args: any[]): {} }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      modify = true;
    };
  };
}

@FactoriesLogger("LOGGING - CONTROLLER")
@AddProperty()
class ControllerFactories {
  public id = 1;
  public modify?: boolean;
}

const controller = new ControllerFactories();
console.log("Modified classes", controller.modify);
