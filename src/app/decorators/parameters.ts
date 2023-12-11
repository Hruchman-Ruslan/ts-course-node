// Parameter decorators

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

function CheckEmail(target: any, methodName: string, position: number) {
  if (!target[methodName].validation) {
    target[methodName].validation = {};
  }
  Object.assign(target[methodName].validation, {
    [position]: (value: string) => {
      if (value.includes("@")) {
        return value;
      }

      throw new Error("No valid field");
    },
  });
}

function Validation(_: any, _2: string, description: PropertyDescriptor) {
  const method = description.value;

  description.value = function (...arguments: any[]) {
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
  @Validation
  setEmail(@CheckEmail email: string) {
    console.log(email);
  }
}

const person = new Person();

person.setEmail("test@gmail.com"); // Ok
person.setEmail("testgmail.com"); // No valid field
