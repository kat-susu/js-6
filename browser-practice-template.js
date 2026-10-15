"use strict";

// Дополнительная практика для браузера.
// Этот файл не участвует в автоматических тестах.
//
// Задача:
// 1. Получите через prompt() название товара, цену и количество.
// 2. Создайте класс Product.
// 3. В constructor сохраните name, price и quantity.
// 4. Добавьте метод getTotal(), использующий this.
// 5. Создайте экземпляр и выведите описание товара и итоговую стоимость.

class Product {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  getTotal() {
    return this.price * this.quantity;
  }
}

const name = prompt("Введите название товара:");
const price = Number(prompt("Введите цену:"));
const quantity = Number(prompt("Введите количество:"));

const product = new Product(name, price, quantity);

console.log(product);
alert(`Название товара: ${product.name}\nЦена: ${product.price}\nКоличество: ${product.quantity}\n\nОбщая сумма: ${product.getTotal()}`);
