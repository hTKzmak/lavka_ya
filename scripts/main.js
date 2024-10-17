// main.js - файл для работы с Drag and drop

// Находим все продукты 
const productElements = document.querySelectorAll(`.product`);

// находим список выбранных продуктов
const cartProdList = document.querySelector('.products');

// Находим caty-element
const cartElement = document.querySelector('.cart-element');

// находим картинку тележки
const cartImg = document.getElementById("cart");


// при перетаскивании у выбранного объекта будет класс selected
const addSelect = (evt) => {
    if (evt.target.classList.contains('product')) {
        evt.target.classList.add(`selected`);
    }
}

// когда отпустим элемент, то класс selected исчезнет
const removeSelect = (evt) => {
    if (evt.target.classList.contains('product')) {
        evt.target.classList.remove(`selected`);
    }
}

// Перебираем все элементы списка продуктов и присваиваем нужное значение
for (const prodEl of productElements) {
    prodEl.draggable = true;

    // событие добавления класса selected
    prodEl.addEventListener('dragstart', addSelect)

    // событие удаления класса selected
    prodEl.addEventListener('dragend', removeSelect)
}


// при перетаскивании над корзиной
// он нужен для перемещения на саму корзину
const handleDragOver = (evt) => {
    evt.preventDefault();
}

// сброс элемента в корзину
const handleDrop = (evt) => {
    evt.preventDefault();

    const activeElement = document.querySelector('.selected');

    // добавляем продукт
    addingToCart(activeElement)

    // отображаем кнопку для перехода на Yandex Лавку
    document.querySelector('.button-link').style.bottom = cartProdList.childElementCount > 2 ? '20px' : '-100vh';
}

// Фукнкция по добавлению товара в корзину
function addingToCart(product) {
    if (cartProdList.childElementCount < 3) {
        document.querySelector('.button-link').style.bottom = '-100vh';

        // клонируем выбранный продукт в список покупок
        cartProdList.appendChild(product.cloneNode(true));

        // даём время на отслеживание изменений, чтобы убрать продукт с лавки
        setTimeout(() => {
            document.querySelectorAll(`.product#${product.id}`)[0].style = `
                opacity: 0;
                pointer-events: none;
            `
        }, 0)
    }

    document.querySelector('.button-link').style.bottom = cartProdList.childElementCount > 2 ? '20px' : '-100vh';
    document.querySelector('.button-link').tabIndex = cartProdList.childElementCount > 2 ? '0' : '-1';
}


// Устанавливаем события для корзины (cartElement)
cartElement.addEventListener('dragover', handleDragOver);
cartElement.addEventListener('drop', handleDrop);