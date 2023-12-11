// Parameter decorators
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// step-01
// function CheckEmails(target: any, name: string, position: number) {
//   console.log("target", target);
//   console.log("name", name);
//   console.log("position", position);
// }
// class Person {
//   setEmail(@CheckEmails email: string) {
//     console.log(email);
//   }
// }
// step-02
function CheckEmail(target, methodName, position) {
    if (!target[methodName].validation) {
        target[methodName].validation = {};
    }
    Object.assign(target[methodName].validation, {
        [position]: (value) => {
            if (value.includes("@")) {
                return value;
            }
            throw new Error("No valid field");
        },
    });
}
function Validation(_, _2, description) {
    const method = description.value;
    description.value = function (...arguments) {
        if (method.validation) {
            arguments.forEach((item, index) => {
                if (method.validation[index]) {
                    arguments[index] = method.validation[index](item);
                }
            });
        }
        return method.apply(this, arguments);
    };
}
class Person {
    setEmail(email) {
        console.log(email);
    }
}
__decorate([
    Validation,
    __param(0, CheckEmail),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Person.prototype, "setEmail", null);
const person = new Person();
person.setEmail("test@gmail.com"); // Ok
person.setEmail("testgmail.com"); // No valid field
//# sourceMappingURL=parameters.js.map