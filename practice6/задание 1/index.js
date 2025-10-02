const items = [
    {
        name: 'apple',
        image: 'images/items/apple.png',
        price: 1.99,
        numberInCart: 0
    },
    {
        name: 'banana',
        image: 'images/items/banana.png',
        price: 0.99,
        numberInCart: 0
    },
    {
        name: 'pineapple',
        image: 'images/items/pineapple.png',
        price: 2.99,
        numberInCart: 0
    }
];

// 1. selectedItem
let selectedItem = items[0];

// 2. totalPrice
let totalPrice = 0;

// 3. displayItemDetails
function displayItemDetails() {
    document.getElementById("item-name").textContent = selectedItem.name;
    
    const itemImage = document.getElementById("item-image");
    itemImage.src = selectedItem.image;
    itemImage.alt = selectedItem.name;
    
    document.getElementById("item-price").textContent = selectedItem.price;
    document.getElementById("item-number-in-cart").textContent = selectedItem.numberInCart;
}

// 5. addCartItemMessageToList(item)
function addCartItemMessageToList(item) {
    const li = document.createElement("li");
    li.className = "cart-item-message item";
    li.textContent = `${item.numberInCart} ${item.name}(я), цена $${item.price} за штуку`;
    document.getElementById("cart-list").appendChild(li);
    
    totalPrice += item.price * item.numberInCart;
}

// 4. addToCart
function addToCart() {
    selectedItem.numberInCart++;

    document.getElementById("item-number-in-cart").textContent = selectedItem.numberInCart;

    totalPrice = 0;

    document.getElementById("cart-message").textContent = "Следующие товары находятся в вашей корзине:";
    
    const cartList = document.getElementById("cart-list");
    cartList.innerHTML = "";

    items.forEach(item => {
        if (item.numberInCart > 0) {
            addCartItemMessageToList(item);
        }
    });

    document.getElementById("total-price-message").textContent = "Общая стоимость составит $" + totalPrice.toFixed(2);
}

// 6. Вызов displayItemDetails сразу
displayItemDetails();

// 8. Слушатель для кнопки "Add To Cart"
document.getElementById("add-to-cart").addEventListener("click", addToCart);

// 11. Слушатель для select (изменение выбранного товара)
document.getElementById("item-select").addEventListener("change", (event) => {
    const selectedName = event.target.value;
    selectedItem = items.find(item => item.name === selectedName);
    displayItemDetails();
});
