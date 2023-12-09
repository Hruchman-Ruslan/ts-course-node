// Decorators
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// step-01
function Logger(constructor) {
    console.log("Logging...");
    console.log(constructor);
}
let Controller = class Controller {
    constructor() {
        this.id = 1;
    }
};
Controller = __decorate([
    Logger
], Controller);
// step-02
function addProperty(constructor) {
    constructor.prototype.myProperty = "Hello";
}
let MyClass = class MyClass {
};
MyClass = __decorate([
    addProperty
], MyClass);
const myInstance = new MyClass();
console.log(myInstance.myProperty); // Outputs "Hello"
// factories of decorators
function FactoriesLogger(logString) {
    return function (constructor) {
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
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor() {
                super(...arguments);
                this.modify = true;
            }
        };
    };
}
let ControllerFactories = class ControllerFactories {
    constructor() {
        this.id = 1;
    }
};
ControllerFactories = __decorate([
    FactoriesLogger("LOGGING - CONTROLLER"),
    AddProperty()
], ControllerFactories);
const controller = new ControllerFactories();
console.log("Modified classes", controller.modify);
//# sourceMappingURL=logger.js.map