// Задание 6
const productManager = {
  products: [],

  createHitProduct: function(name, price) {
    const hitProduct = {
      name: name,
      price: price,
      isBestseller: true,
      discount: 0.1,
      inStock: true
    };

    this.products.push(hitProduct);
    console.log("Создан хит продаж:", hitProduct);
    return hitProduct;
  },

  convertToObjects: function(names, prices) {
    const products = [];

    for (let i = 0; i < names.length; i++) {
      products.push({
        name: names[i],
        price: prices[i],
        inStock: true
      });
    }

    return products;
  },

  showDiscount: function(item, quantity) {
    let discount = 0;

    if (quantity >= 10) {
      discount = 0.15;
    } else if (quantity >= 5) {
      discount = 0.1;
    } else if (quantity >= 3) {
      discount = 0.05;
    }

    const totalPrice = item.price * quantity;
    const discountAmount = totalPrice * discount;
    const finalPrice = totalPrice - discountAmount;

    console.log(`Товар: ${item.name}`);
    console.log(`Количество: ${quantity}`);
    console.log(`Скидка: ${discount * 100}%`);
    console.log(`Итоговая цена: ${finalPrice.toFixed(2)} руб.`);
  },

  updateAmount: function(itemName, quantity) {
    const product = this.products.find(p => p.name === itemName);

    if (product) {
      if (product.inStock && quantity <= 10) {
        console.log(`Товар "${itemName}" доступен. Остаток: ${quantity} шт.`);
      } else if (!product.inStock) {
        console.log(`Товар "${itemName}" временно отсутствует`);
      } else {
        console.log(`Для товара "${itemName}" доступно только 10 шт.`);
      }
    } else {
      console.log(`Товар "${itemName}" не найден`);
    }
  },

  sortProductsByPrice: function() {
    return [...this.products].sort((a, b) => a.price - b.price);
  },

  findProductsInPriceRange: function(minPrice, maxPrice) {
    return this.products.filter(product =>
      product.price >= minPrice && product.price <= maxPrice
    );
  },

  applyExtraDiscountToBestsellers: function(extraDiscountPercent) {
    const extra = extraDiscountPercent / 100;

    this.products.forEach(product => {
      if (product.isBestseller) {
        product.extraDiscount = extra;
        product.price = +(product.price * (1 - extra)).toFixed(2);
        console.log(`Доп. скидка применена к: ${product.name}, новая цена: ${product.price} руб.`);
      }
    });
  }
};

// Преобразуем обычные товары
const names = ["Фитнес-браслет", "Наушники", "Чехол для телефона"];
const prices = [2500, 4500, 800];
const products = productManager.convertToObjects(names, prices);
productManager.products = products;

// Добавим товары-хиты
productManager.createHitProduct('iPhone 13 Pro', 275000);
productManager.createHitProduct('Samsung Galaxy', 150000);

// Сортировка по цене
console.log("🔽 Отсортированные товары по цене:");
console.log(productManager.sortProductsByPrice());

// Поиск по диапазону цен
console.log("🔍 Товары в диапазоне 1000 - 10000 руб:");
console.log(productManager.findProductsInPriceRange(1000, 10000));

// Применение дополнительной скидки к хитам
console.log("💸 Применяем доп. скидку 5% к хитам продаж:");
productManager.applyExtraDiscountToBestsellers(5);

// Повторная проверка после скидки
console.log("✅ Товары после скидки:");
console.log(productManager.products);
