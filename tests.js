"use strict";

const assert = require("node:assert/strict");
const student = require("./student-template.js");

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (error) {
    console.error(`✗ ${name}`);
    console.error(`  ${error.message}`);
    process.exitCode = 1;
  }
}

test("1. Класс Rectangle", () => {
  const rectangle = new student.Rectangle(5, 4);

  assert.equal(rectangle.width, 5);
  assert.equal(rectangle.height, 4);
  assert.equal(rectangle.getArea(), 20);
  assert.equal(rectangle.getPerimeter(), 18);

  rectangle.width = 10;
  assert.equal(rectangle.getArea(), 40);
  assert.equal(rectangle.getPerimeter(), 28);
});

test("2. Класс Product", () => {
  const product = new student.Product("Keyboard", 12000, 2);

  assert.equal(product.name, "Keyboard");
  assert.equal(product.price, 12000);
  assert.equal(product.quantity, 2);
  assert.equal(product.getTotal(), 24000);

  assert.equal(product.add(3), 5);
  assert.equal(product.quantity, 5);
  assert.equal(product.getTotal(), 60000);

  assert.equal(product.add(0), 5);
  assert.equal(product.add(-10), 5);
});

test("3. Класс Student", () => {
  const learner = new student.Student("Иван", [5, 4, 3, 4]);

  assert.equal(learner.name, "Иван");
  assert.deepEqual(learner.grades, [5, 4, 3, 4]);
  assert.equal(learner.getAverage(), 4);
  assert.equal(learner.addGrade(5), 5);
  assert.equal(learner.getAverage(), 4.2);

  const empty = new student.Student("Анна", []);
  assert.equal(empty.getAverage(), 0);
});

test("4. Класс BankAccount", () => {
  const account = new student.BankAccount("Alex", 1000);

  assert.equal(account.owner, "Alex");
  assert.equal(account.balance, 1000);
  assert.equal(account.deposit(500), 1500);
  assert.equal(account.deposit(-100), 1500);
  assert.equal(account.withdraw(300), 1200);
  assert.equal(account.withdraw(5000), 1200);
  assert.equal(account.withdraw(0), 1200);

  const empty = new student.BankAccount("Maria");
  assert.equal(empty.balance, 0);
});

test("5. Наследование Person -> StudentProfile", () => {
  const person = new student.Person("Alex", 20);
  assert.equal(person.getInfo(), "Alex, 20");

  const learner = new student.StudentProfile("Иван", 19, "ПВ-221");
  assert.equal(learner.name, "Иван");
  assert.equal(learner.age, 19);
  assert.equal(learner.group, "ПВ-221");
  assert.equal(learner.getInfo(), "Иван, 19, группа ПВ-221");
  assert.equal(learner instanceof student.StudentProfile, true);
  assert.equal(learner instanceof student.Person, true);
});

test("6. Функция-конструктор и prototype", () => {
  const legacy = new student.LegacyUser("Maria", 21);

  assert.equal(legacy.name, "Maria");
  assert.equal(legacy.age, 21);
  assert.equal(legacy.getInfo(), "Maria, 21");
  assert.equal(legacy instanceof student.LegacyUser, true);
  assert.equal(Object.hasOwn(legacy, "name"), true);
  assert.equal(Object.hasOwn(legacy, "age"), true);
  assert.equal(Object.hasOwn(legacy, "getInfo"), false);
  assert.equal(legacy.getInfo, student.LegacyUser.prototype.getInfo);
});

if (!process.exitCode) {
  console.log("\nВсе тесты пройдены.");
}
