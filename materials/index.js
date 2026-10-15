"use strict";

function section(title) {
  console.log(`\n=== ${title} ===`);
}

section("1. От объекта к классу");

const plainUser = {
  name: "Alex",
  age: 20,
  getInfo() {
    return `${this.name}, ${this.age}`;
  },
};

console.log(plainUser.getInfo());

section("2. Первый class");

class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getInfo() {
    return `${this.name}, ${this.age}`;
  }
}

const user1 = new User("Alex", 20);
const user2 = new User("Ivan", 19);

console.log(user1);
console.log(user2);
console.log(user1.getInfo());
console.log(user2.getInfo());

section("3. Независимое состояние экземпляров");

user1.age = 21;
console.log("user1:", user1.getInfo());
console.log("user2:", user2.getInfo());

section("4. Метод, использующий текущее состояние");

class Product {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  getTotal() {
    return this.price * this.quantity;
  }

  add(amount) {
    if (amount > 0) {
      this.quantity += amount;
    }

    return this.quantity;
  }
}

const keyboard = new Product("Keyboard", 12000, 2);
console.log(keyboard.getTotal());
keyboard.add(1);
console.log(keyboard.getTotal());

section("5. Класс до синтаксиса class: функция-конструктор");

function LegacyUser(name, age) {
  this.name = name;
  this.age = age;
}

LegacyUser.prototype.getInfo = function () {
  return `${this.name}, ${this.age}`;
};

const oldUser = new LegacyUser("Maria", 21);
console.log(oldUser.getInfo());

section("6. Где находится метод");

console.log("Собственное name:", Object.hasOwn(user1, "name"));
console.log("Собственный getInfo:", Object.hasOwn(user1, "getInfo"));
console.log(
  "Прототип экземпляра === User.prototype:",
  Object.getPrototypeOf(user1) === User.prototype
);
console.log("Метод находится в prototype:", user1.getInfo === User.prototype.getInfo);

section("6.1. Прототип простыми словами: Object.create");

const animal = {
  eat() {
    return "Ем";
  },
};

const dog = Object.create(animal);
dog.name = "Шарик";

console.log("Собственное имя:", dog.name);
console.log("Метод найден через прототип:", dog.eat());
console.log("dog имеет собственный eat:", Object.hasOwn(dog, "eat"));
console.log("Прототип dog === animal:", Object.getPrototypeOf(dog) === animal);

section("6.2. Цепочка прототипов");

console.log("dog ->", Object.getPrototypeOf(dog) === animal);
console.log(
  "animal -> Object.prototype:",
  Object.getPrototypeOf(animal) === Object.prototype
);
console.log(
  "Object.prototype -> null:",
  Object.getPrototypeOf(Object.prototype) === null
);

// Если свойства нет в dog, поиск продолжается в animal,
// затем в Object.prototype и заканчивается на null.
console.log("toString найден выше по цепочке:", typeof dog.toString);

section("6.3. [[Prototype]], __proto__ и prototype");

// [[Prototype]] - внутренняя ссылка конкретного объекта.
// Object.getPrototypeOf() - современный способ её посмотреть.
// __proto__ встречается в старом коде, но использовать его в новом коде не нужно.
// Constructor.prototype - объект, который становится прототипом экземпляров,
// созданных через new Constructor().

console.log(
  "Object.getPrototypeOf(user1) === User.prototype:",
  Object.getPrototypeOf(user1) === User.prototype
);
console.log(
  "user1.__proto__ === User.prototype:",
  user1.__proto__ === User.prototype
);

section("6.4. Общее поведение хранится в prototype");

const anotherUser = new User("Anna", 22);

console.log("user1 имеет собственный getInfo:", Object.hasOwn(user1, "getInfo"));
console.log(
  "Оба экземпляра используют одну функцию:",
  user1.getInfo === anotherUser.getInfo
);
console.log(
  "Эта функция находится в User.prototype:",
  user1.getInfo === User.prototype.getInfo
);

section("6.5. Прототип можно изменить после создания объекта");

animal.sleep = function () {
  return "Сплю";
};

// dog создан раньше, но новый метод уже доступен через тот же прототип.
console.log(dog.sleep());

section("7. Сравнение class и constructor function");

console.log(user1 instanceof User);
console.log(oldUser instanceof LegacyUser);
console.log(typeof User);       // function - одна из характерных особенностей JS
console.log(typeof LegacyUser); // function

section("8. Состояние: банковский счёт");

class BankAccount {
  constructor(owner, balance = 0) {
    this.owner = owner;
    this.balance = balance;
  }

  deposit(amount) {
    if (amount > 0) {
      this.balance += amount;
    }

    return this.balance;
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
    }

    return this.balance;
  }
}

const account = new BankAccount("Alex", 1000);
console.log(account.deposit(500));
console.log(account.withdraw(300));
console.log(account.withdraw(5000));

section("9. Наследование: extends");

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getInfo() {
    return `${this.name}, ${this.age}`;
  }
}

class Student extends Person {
  constructor(name, age, group) {
    super(name, age);
    this.group = group;
  }

  getInfo() {
    return `${super.getInfo()}, группа ${this.group}`;
  }
}

const student = new Student("Иван", 19, "ПВ-221");
console.log(student.getInfo());

console.log(
  "student -> Student.prototype:",
  Object.getPrototypeOf(student) === Student.prototype
);
console.log(
  "Student.prototype -> Person.prototype:",
  Object.getPrototypeOf(Student.prototype) === Person.prototype
);
console.log(
  "Person.prototype -> Object.prototype:",
  Object.getPrototypeOf(Person.prototype) === Object.prototype
);

section("10. instanceof и наследование");

console.log(student instanceof Student);
console.log(student instanceof Person);
console.log(student instanceof Object);

section("11. Как наследование выглядело через функции");

function OldPerson(name, age) {
  this.name = name;
  this.age = age;
}

OldPerson.prototype.getInfo = function () {
  return `${this.name}, ${this.age}`;
};

function OldStudent(name, age, group) {
  OldPerson.call(this, name, age);
  this.group = group;
}

OldStudent.prototype = Object.create(OldPerson.prototype);
OldStudent.prototype.constructor = OldStudent;

OldStudent.prototype.getInfo = function () {
  return `${OldPerson.prototype.getInfo.call(this)}, группа ${this.group}`;
};

const oldStudent = new OldStudent("Пётр", 20, "ПВ-222");
console.log(oldStudent.getInfo());
console.log(oldStudent instanceof OldStudent);
console.log(oldStudent instanceof OldPerson);

section("12. Массив экземпляров");

const products = [
  new Product("Mouse", 5000, 1),
  new Product("Keyboard", 12000, 1),
  new Product("Monitor", 85000, 1),
];

console.log(products.map((product) => product.name));
console.log(products.filter((product) => product.price >= 10000));

section("13. Дополнительно: static");

class NumberHelper {
  static isPositive(value) {
    return value > 0;
  }
}

console.log(NumberHelper.isPositive(10));
console.log(NumberHelper.isPositive(-5));

section("14. Дополнительно: getter");

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.width * this.height;
  }
}

const rectangle = new Rectangle(5, 4);
console.log(rectangle.area);
