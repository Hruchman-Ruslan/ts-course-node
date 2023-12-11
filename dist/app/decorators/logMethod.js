// Method decorators
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// step-01
function LogMethod(target, name, description) {
    console.log(`Method "${name}" of class "${target.constructor.name}" is called`);
}
class MyClassMethod {
    myMethod() {
        console.log("Hello, world!");
    }
}
__decorate([
    LogMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MyClassMethod.prototype, "myMethod", null);
let obj = new MyClassMethod(); // Method "myMethod" of class "MyClassMethod" is called
obj.myMethod();
// step-02
function validateString() {
    return function (target, propertyName, description) {
        const originalMethod = description.value;
        description.value = function (...args) {
            if (typeof args[0] !== "string") {
                throw new Error("Invalid input. Expected a string.");
            }
            return originalMethod.apply(this, args);
        };
    };
}
class MyClassValidateString {
    print(value) {
        console.log(`Received value: ${value}`);
    }
}
__decorate([
    validateString(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MyClassValidateString.prototype, "print", null);
const instance = new MyClassValidateString();
instance.print("Hello");
// instance.print(123);  // Error: Invalid input. Expected a string.
// step-03
function addTax(taxPercent) {
    return (_, _2, description) => {
        // We get the original method
        const method = description.value;
        return {
            configurable: true,
            enumerable: false,
            get() {
                return (...args) => {
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
    pay(money) {
        return money;
    }
}
__decorate([
    addTax(20),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Number)
], Payment.prototype, "pay", null);
const payment = new Payment();
console.log("Amount with tax: ", payment.pay(100)); // Amount with tax:120;
//# sourceMappingURL=logMethod.js.map