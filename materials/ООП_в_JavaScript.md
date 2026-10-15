# Основы ООП в JavaScript: классы, экземпляры и наследование

Объекты мы уже использовали как удобный способ объединить связанные данные и методы. Следующий шаг - научиться описывать **тип однотипных объектов**, чтобы не создавать каждый объект вручную.

На этом занятии основная цель не в том, чтобы выучить всю объектную модель JavaScript. Важно понять базовую цепочку:

**объект -> класс -> экземпляр -> конструктор -> метод -> наследование**.

Отдельно разберём важную особенность JavaScript: синтаксис `class` появился позже самой объектной модели языка. JavaScript остаётся прототипно-ориентированным языком, а классы дают более удобный синтаксис для работы поверх прототипов.

## 1. Зачем нужны классы

Представим, что нужно хранить одного пользователя:

```js
const user = {
  name: "Alex",
  age: 20,

  getInfo() {
    return `${this.name}, ${this.age}`;
  }
};
```

Для одного объекта этого достаточно. Но если пользователей десятки, одинаковая структура начинает повторяться:

```js
const user1 = { name: "Alex", age: 20 };
const user2 = { name: "Ivan", age: 19 };
const user3 = { name: "Maria", age: 21 };
```

Нам нужен общий шаблон, который описывает, какие данные и какое поведение должны иметь такие объекты.

## 2. Объявление класса

Класс объявляется с помощью ключевого слова `class`:

```js
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getInfo() {
    return `${this.name}, ${this.age}`;
  }
}
```

Сам класс ещё не является конкретным пользователем. Это описание того, как создавать объекты определённого типа.

## 3. Экземпляр и оператор `new`

Объект, созданный на основе класса, называют **экземпляром класса**:

```js
const user1 = new User("Alex", 20);
const user2 = new User("Ivan", 19);
```

Теперь `user1` и `user2` - разные объекты:

```js
console.log(user1.name); // Alex
console.log(user2.name); // Ivan
```

И у каждого есть доступ к методам класса:

```js
console.log(user1.getInfo());
console.log(user2.getInfo());
```

### Что делает `new`

Для базового понимания можно представить работу `new` так:

1. создаётся новый пустой объект;
2. объект связывается с прототипом конструктора;
3. `this` внутри конструктора указывает на этот новый объект;
4. выполняется код конструктора;
5. полученный объект возвращается как результат.

На практике эти шаги вручную писать не нужно - для этого и используется `new`.

## 4. `constructor`

`constructor` - специальный метод класса, который автоматически вызывается при создании объекта через `new`:

```js
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

const keyboard = new Product("Keyboard", 12000);
```

Аргументы после `new Product(...)` передаются в `constructor`.

Если явно не написать `constructor`, JavaScript создаст пустой конструктор автоматически.

## 5. Свойства экземпляра

Обычно данные конкретного объекта создаются внутри конструктора:

```js
class Product {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}
```

Каждый экземпляр получает собственные значения:

```js
const mouse = new Product("Mouse", 5000, 2);
const monitor = new Product("Monitor", 85000, 1);

console.log(mouse.price);   // 5000
console.log(monitor.price); // 85000
```

Изменение одного экземпляра не меняет другой:

```js
mouse.quantity = 5;

console.log(mouse.quantity);   // 5
console.log(monitor.quantity); // 1
```

## 6. Методы класса

Методы записываются внутри тела класса без слова `function`:

```js
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
```

Использование:

```js
const product = new Product("Keyboard", 12000, 2);

console.log(product.getTotal()); // 24000
```

Метод использует **текущее состояние** объекта. Если изменить количество, результат тоже изменится:

```js
product.quantity = 3;
console.log(product.getTotal()); // 36000
```

## 7. `this` в классе

В обычном вызове метода экземпляра `this` указывает на объект, через который этот метод вызван:

```js
class Counter {
  constructor(value) {
    this.value = value;
  }

  increment() {
    this.value++;
  }
}

const counter = new Counter(10);
counter.increment();

console.log(counter.value); // 11
```

На этом этапе достаточно правила:

> В методе класса `this` используется для обращения к данным текущего экземпляра.

У `this` в JavaScript есть дополнительные правила. `call()`, `apply()`, `bind()` и потерю контекста мы пока не делаем центральной темой.

## 8. Состояние объекта и методы, которые его изменяют

Методы могут не только возвращать вычисленное значение, но и изменять объект:

```js
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
}
```

```js
const account = new BankAccount("Alex", 1000);

account.deposit(500);
console.log(account.balance); // 1500
```

Такой объект хранит **состояние**, а его методы управляют этим состоянием.

## 9. Класс и обычная функция-конструктор

Это важная часть JavaScript.

До появления синтаксиса `class` однотипные объекты часто создавали через обычные функции-конструкторы.

### Вариант через функцию

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

User.prototype.getInfo = function () {
  return `${this.name}, ${this.age}`;
};

const user = new User("Alex", 20);
console.log(user.getInfo());
```

Здесь `User` - обычная функция, но она вызывается с `new`.

Свойства `name` и `age` создаются у самого экземпляра, а метод `getInfo` помещается в `User.prototype`.

### То же самое через `class`

```js
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getInfo() {
    return `${this.name}, ${this.age}`;
  }
}
```

Для повседневного кода второй вариант проще читать и поддерживать.

## 10. Почему классы называют синтаксическим сахаром

До появления `class` в JavaScript уже существовали объекты, функции-конструкторы и прототипное наследование. Синтаксис классов не заменил эту модель, а сделал работу с ней привычнее и понятнее.

Современная запись:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, ${this.name}`;
  }
}
```

До `class` похожая модель записывалась так:

```js
function User(name) {
  this.name = name;
}

User.prototype.sayHello = function () {
  return `Hello, ${this.name}`;
};
```

В обоих случаях экземпляры получают собственные данные (`name`), а общий метод доступен через прототип.

Поэтому корректная учебная формулировка такая:

> `class` и `extends` - это удобный современный синтаксис поверх прототипной модели JavaScript. Они не отменяют прототипы и цепочку прототипов.

При этом `class` не является буквально полной копией обычной функции: конструктор класса нельзя вызвать без `new`, тело класса работает в strict mode и есть другие технические различия.

## 11. Прототипы: что это и зачем они нужны

### 11.1. Прототип простыми словами

**Прототип объекта - это другой объект, к которому JavaScript обращается, если не нашёл нужное свойство или метод в самом объекте.**

Самый наглядный пример:

```js
const animal = {
  eat() {
    return "Ем";
  }
};

const dog = Object.create(animal);
dog.name = "Шарик";

console.log(dog.name);  // собственное свойство dog
console.log(dog.eat()); // метода eat в dog нет, он найден в animal
```

Связь выглядит так:

```text
dog
 │
 │ [[Prototype]]
 ▼
animal
```

Когда выполняется `dog.eat()`, JavaScript сначала ищет `eat` в `dog`. Если его там нет, поиск продолжается в прототипе - объекте `animal`.

Именно поэтому прототипы являются основой **наследования в JavaScript**: один объект может использовать поведение другого объекта, не копируя его себе.

### 11.2. Что такое цепочка прототипов

Прототип тоже является объектом и может иметь собственный прототип. Поэтому поиск может идти дальше:

```text
dog
 ↓
animal
 ↓
Object.prototype
 ↓
null
```

Это и называется **цепочкой прототипов (prototype chain)**.

Алгоритм поиска свойства можно представить так:

1. посмотреть в самом объекте;
2. если свойства нет - посмотреть в его прототипе;
3. затем в прототипе прототипа;
4. продолжать до `null`;
5. если свойство нигде не найдено, результатом будет `undefined`.

### 11.3. `[[Prototype]]`, `__proto__` и `prototype` - это не одно и то же

У конкретного объекта есть внутренняя ссылка на прототип. В спецификации она называется `[[Prototype]]`.

Посмотреть её можно так:

```js
console.log(Object.getPrototypeOf(dog) === animal); // true
```

В старом коде можно встретить:

```js
console.log(dog.__proto__ === animal); // true
```

`__proto__` - исторический способ доступа к прототипу объекта. В новом коде для чтения прототипа предпочтительнее `Object.getPrototypeOf()`.

А `prototype` без подчёркиваний - это другое понятие. Это свойство функции-конструктора или класса:

```js
function User(name) {
  this.name = name;
}

const user = new User("Alex");

console.log(Object.getPrototypeOf(user) === User.prototype); // true
```

Главная схема:

```text
User.prototype
      ▲
      │
user.[[Prototype]]
```

То есть `User.prototype` - объект, который становится прототипом экземпляров, созданных через `new User()`.

### 11.4. Почему методы помещают в прототип

Если создавать функцию внутри конструктора, каждый экземпляр получит отдельный объект-функцию:

```js
function User(name) {
  this.name = name;

  this.sayHello = function () {
    return `Hello, ${this.name}`;
  };
}
```

Если метод общий для всех пользователей, удобнее хранить его один раз:

```js
function User(name) {
  this.name = name;
}

User.prototype.sayHello = function () {
  return `Hello, ${this.name}`;
};
```

Теперь:

```js
const user1 = new User("Alex");
const user2 = new User("Ivan");

console.log(user1.sayHello === user2.sayHello); // true
```

Данные `name` принадлежат каждому экземпляру отдельно, а общий метод находится в `User.prototype`.

Удобная модель для запоминания:

> **экземпляр хранит своё состояние, а прототип может хранить общее поведение.**

### 11.5. Класс тоже использует прототип

Методы, записанные в теле класса, также доступны экземплярам через прототип:

```js
class Product {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

const product = new Product("Keyboard");

console.log(Object.hasOwn(product, "name"));    // true
console.log(Object.hasOwn(product, "getName")); // false
console.log(Object.getPrototypeOf(product) === Product.prototype); // true
console.log(product.getName === Product.prototype.getName); // true
```

Поэтому классы не создают отдельный механизм наследования. Они продолжают использовать существующую prototype chain.

### 11.6. Прототипы и наследование

При наследовании классов цепочка становится длиннее:

```js
class Person {
  getRole() {
    return "person";
  }
}

class Student extends Person {
  study() {
    return "study";
  }
}

const student = new Student();
```

Концептуально поиск выглядит так:

```text
student
 ↓
Student.prototype
 ↓
Person.prototype
 ↓
Object.prototype
 ↓
null
```

Поэтому `student.study()` находится в `Student.prototype`, а `student.getRole()` - выше, в `Person.prototype`.

Это и есть связь `extends` с прототипным наследованием: современный синтаксис строит и использует ту же цепочку прототипов.

### 11.7. Пример из уже знакомых массивов

Даже методы массивов работают через прототипы:

```js
const numbers = [1, 2, 3];

console.log(Object.hasOwn(numbers, "map")); // false
console.log(typeof numbers.map);            // function
```

`map`, `filter`, `reduce`, `push` и другие общие методы находятся в `Array.prototype` и доступны конкретным массивам через цепочку:

```text
numbers
 ↓
Array.prototype
 ↓
Object.prototype
 ↓
null
```

Это показывает практическую ценность прототипов: общее поведение можно определить один раз и сделать доступным множеству объектов.

## 12. Наследование: `extends`

Иногда один класс является более специализированной версией другого.

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getInfo() {
    return `${this.name}, ${this.age}`;
  }
}
```

Студент - это человек, у которого дополнительно есть группа:

```js
class Student extends Person {
  constructor(name, age, group) {
    super(name, age);
    this.group = group;
  }
}
```

Теперь экземпляр `Student` получает методы родительского класса:

```js
const student = new Student("Иван", 19, "ПВ-221");

console.log(student.getInfo());
```

## 13. `super()`

В конструкторе дочернего класса перед обращением к `this` нужно вызвать конструктор родителя:

```js
class Student extends Person {
  constructor(name, age, group) {
    super(name, age);
    this.group = group;
  }
}
```

`super(name, age)` вызывает `constructor` класса `Person` и позволяет не дублировать:

```js
this.name = name;
this.age = age;
```

## 14. Переопределение метода

Дочерний класс может определить метод с таким же именем:

```js
class Student extends Person {
  constructor(name, age, group) {
    super(name, age);
    this.group = group;
  }

  getInfo() {
    return `${this.name}, ${this.age}, группа ${this.group}`;
  }
}
```

Если нужно использовать реализацию родителя:

```js
getInfo() {
  return `${super.getInfo()}, группа ${this.group}`;
}
```

## 15. `instanceof`

Оператор `instanceof` помогает проверить, был ли объект создан данным классом или наследуется от него:

```js
const student = new Student("Иван", 19, "ПВ-221");

console.log(student instanceof Student); // true
console.log(student instanceof Person);  // true
console.log(student instanceof Object);  // true
```

## 16. Наследование через функции до `class`

Для понимания устройства JavaScript полезно один раз увидеть старый вариант. Запоминать его как основной способ написания кода не нужно.

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.getInfo = function () {
  return `${this.name}, ${this.age}`;
};

function Student(name, age, group) {
  Person.call(this, name, age);
  this.group = group;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.getGroup = function () {
  return this.group;
};
```

Современный вариант:

```js
class Student extends Person {
  constructor(name, age, group) {
    super(name, age);
    this.group = group;
  }

  getGroup() {
    return this.group;
  }
}
```

Именно поэтому современный синтаксис удобнее: он скрывает много технической работы с прототипами.

## 17. Массив экземпляров

Классы хорошо сочетаются с уже изученными массивами:

```js
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

const products = [
  new Product("Mouse", 5000),
  new Product("Keyboard", 12000),
  new Product("Monitor", 85000)
];
```

Можно использовать знакомые методы:

```js
const expensive = products.filter((product) => product.price >= 10000);
const names = products.map((product) => product.name);
```

То есть ООП не заменяет массивы, функции или циклы. Оно соединяется с уже изученными конструкциями.

## 18. Обычный объект или класс?

Не каждый объект обязан быть экземпляром класса.

Обычный объект удобен, когда нужна одна простая структура:

```js
const config = {
  port: 3000,
  debug: true
};
```

Класс полезен, когда:

- нужно создавать много однотипных объектов;
- у объектов есть общее поведение;
- методы работают с внутренним состоянием;
- нужна понятная модель наследования.

Поэтому `class` - инструмент, а не обязательная замена литералам объектов.

## 19. Дополнительные возможности классов

Следующие конструкции полезно узнавать, но они не являются главной целью этого занятия.

### Статический метод

Статический метод вызывается у самого класса, а не у экземпляра:

```js
class MathHelper {
  static square(value) {
    return value ** 2;
  }
}

console.log(MathHelper.square(5));
```

### Getter

```js
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
```

В практической работе эти возможности не обязательны.

## 20. Типичные ошибки

### Забыли `new`

```js
class User {}

// const user = User(); // TypeError
const user = new User();
```

### Забыли `this`

```js
class Product {
  constructor(price) {
    this.price = price;
  }

  getPrice() {
    // return price;      // ошибка
    return this.price;    // правильно
  }
}
```

### Использовали `this` до `super()` в дочернем классе

```js
class Student extends Person {
  constructor(name, age, group) {
    super(name, age);
    this.group = group;
  }
}
```

### Вызвали метод вместо передачи ссылки на метод

Это станет особенно важно при событиях DOM. Пока достаточно видеть разницу:

```js
const method = user.getInfo;   // ссылка на функцию
const result = user.getInfo(); // результат вызова
```

## 21. Что важно запомнить

- класс описывает структуру и поведение однотипных объектов;
- `new` создаёт новый экземпляр;
- `constructor` инициализирует экземпляр;
- `this` внутри обычного метода обращается к текущему экземпляру;
- разные экземпляры имеют независимое состояние;
- прототип объекта - это другой объект, в котором JavaScript продолжает поиск отсутствующего свойства или метода;
- последовательность таких связей образует цепочку прототипов;
- `[[Prototype]]` конкретного экземпляра и `Constructor.prototype` связаны, но это не одно и то же понятие;
- методы класса доступны экземплярам через прототип класса;
- `class` и `extends` - удобный современный синтаксис поверх прототипной модели JavaScript и не отменяют prototype chain;
- до `class` те же идеи реализовывались через функции-конструкторы и `prototype`;
- `extends` создаёт наследование;
- `super()` вызывает конструктор родителя;
- дочерний класс может переопределять методы;
- `instanceof` проверяет принадлежность объекта классу и цепочке наследования;
- обычные объекты никуда не исчезают: класс нужен тогда, когда действительно есть множество однотипных сущностей.

Следующий крупный блок курса - работа JavaScript в браузере: DOM, изменение страницы и события. Там классы и объекты будут встречаться уже в прикладном контексте.
