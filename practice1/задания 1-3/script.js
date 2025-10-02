// Задание 1
const name = "Максим Михайлов", favcolor = "Бирюзовый", age = 22;
let num = 322;
 
console.log(`${name} ${favcolor} ${age} ${num}`);
num = num-14
console.log(num);

// Задание 2(1) 
const a = 8, b = 12;
let S = a * b; 
console.log("Площадь прямоугольника равна:", (S));

// Задание 2(2) 
const ItemCount = 5, PricePerItem = 250, TotalPrice = ItemCount * PricePerItem;
console.log("Стоимость товаров равна:", TotalPrice);

// Задание 2(3) 
const Celsium = 28, Fahrenheit = ((Celsium * 1.8)+32);
console.log ("Температура по Фаренгейту равна:",Fahrenheit);


// Задание 3(1)
let number = 0;
do {number = parseInt(prompt("Введите число для проверки на четность:", ))} while (Number.isNaN(number));
console.log("Число четное", number %2 == 0);

// Задание 3(2)
let range = 0;
do {range = parseInt(prompt("Введите число для проверки на вход в диапазон:", ))} while (Number.isNaN(range));
console.log("Число попадает в диапазон", range >= 25 && range <= 75);

// Задание 3(3)
let rating = 0;
do {rating = parseInt(prompt("Введите средний балл:", ))} while (Number.isNaN(rating));
console.log("Получена ли студенческая скидка", rating >= 80);