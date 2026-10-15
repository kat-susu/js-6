"use strict";

// Практическая работа №6
// Тема: основы ООП в JavaScript.
// Заполните только участки TODO.
// Имена классов, функций, методов и module.exports не изменяйте.

// 1. Класс Rectangle
// Конструктор получает width и height.
// getArea() возвращает площадь.
// getPerimeter() возвращает периметр.
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }

  getPerimeter() {
    return (this.width + this.height) * 2;
  }
}

// 2. Класс Product
// Конструктор: name, price, quantity.
// getTotal() возвращает price * quantity.
// add(amount) увеличивает quantity только если amount > 0
// и в любом случае возвращает текущее quantity.
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
    if (amount > 0)
      this.quantity += amount;

    return this.quantity;
  }
}

// 3. Класс Student
// Конструктор: name и grades (массив оценок).
// getAverage() возвращает среднее арифметическое; для пустого массива - 0.
// addGrade(grade) добавляет оценку в массив и возвращает новую длину массива.
class Student {
  constructor(name, grades) {
    this.name = name;
    this.grades = grades;
  }

  getAverage() {
    if (this.grades.length === 0) {
      return 0;
    } 

    let sum = 0;

    for (let i = 0; i < this.grades.length; i++) {
      sum += this.grades[i];
    } 

    return sum / this.grades.length;
  }

  addGrade(grade) {
      this.grades.push(grade);

      return this.grades.length;
  }
}

// 4. Класс BankAccount
// Конструктор: owner и balance = 0.
// deposit(amount): если amount > 0, увеличить balance; вернуть текущий balance.
// withdraw(amount): списать сумму только если amount > 0 и amount <= balance;
// вернуть текущий balance независимо от того, удалось списание или нет.
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

// 5. Наследование
// Person: name, age и метод getInfo() -> "Имя, возраст".
// StudentProfile наследуется от Person, добавляет group.
// Его getInfo() должен использовать super.getInfo()
// и вернуть "Имя, возраст, группа GROUP".
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getInfo() {
    return `${this.name}, ${this.age}`;
  }
}

class StudentProfile extends Person {
  constructor(name, age, group) {
    super(name, age);
    this.group = group;
  }

  getInfo() {
    return `${super.getInfo()}, группа ${this.group}`;
  }
}

// 6. "Класс" без синтаксиса class
// Реализуйте функцию-конструктор LegacyUser(name, age).
// Свойства name и age должны быть собственными свойствами экземпляра.
// Метод getInfo() добавьте в LegacyUser.prototype.
function LegacyUser(name, age) {
  this.name = name;
  this.age = age;
}

LegacyUser.prototype.getInfo = function () {
  return `${this.name}, ${this.age}`;
};

module.exports = {
  Rectangle,
  Product,
  Student,
  BankAccount,
  Person,
  StudentProfile,
  LegacyUser,
};
