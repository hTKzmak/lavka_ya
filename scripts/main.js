// main.js - файл для работы с Drag and drop

// Находим все продукты 
const productElements = document.querySelectorAll(`.product`);

// находим список выбранных продуктов
const cartProdList = document.querySelector('.products');

// Находим caty-element
const cartElement = document.querySelector('.cart-element');




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

// Перебираем все элементы списка продуктов и присваиваем нужные события
for (const prodEl of productElements) {
    prodEl.draggable = true;

    // событие добавления класса selected
    prodEl.addEventListener('dragstart', addSelect)

    // событие удаления класса selected
    prodEl.addEventListener('dragend', removeSelect)


    // по событию "click" происходит добавление продукта в корзину
    if (window.innerWidth < 768) {
        prodEl.addEventListener('click', () => {
            addingToCart(prodEl)
        })
    }
    
    // по событию "keydown" происходит добавление продукта в корзину
    // нужно это для доступности использования сайтом, выбирая продукты и переходя по ссылке через Tab и Enter
    prodEl.addEventListener('keydown', (evt) => {
        if (evt.key === 'Enter') {
            addingToCart(prodEl)
        }
    })
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
}

// Фукнкция по добавлению товара в корзину
function addingToCart(product) {

    console.log(cartProdList.childElementCount < 3, cartProdList.childElementCount)

    // продукты будут перемещаться в корзину, пока список продуктов меньше 3
    if (cartProdList.childElementCount < 3) {
        // воспроизведение анимации
        dropToCartAnim(product)

        const choosenProd = product;

        // клонируем выбранный продукт в список покупок
        cartProdList.appendChild(choosenProd.cloneNode(true));

        // делаем продукт в корзине невидимым (это нужно для эффекта добавления продукта в корзину)
        document.querySelectorAll(`.product#${product.id}`)[1].style.opacity = '0';

        // делаем продукт в корзине видимым
        setTimeout(() => {
            document.querySelectorAll(`.product#${product.id}`)[1].style.opacity = '1';
        }, 1000)
    }

    // отображаем кнопку через некоторое время после добавления 3-х продуктов
    setTimeout(() => {
        document.querySelector('.button-link').style.bottom = cartProdList.childElementCount > 2 ? '20px' : '-100vh';
        document.querySelector('.button-link').tabIndex = cartProdList.childElementCount > 2 ? '0' : '-1';
    }, 800)
}

// функция для воспроизведения анимации по перемещению выбранного продукта в корзину
function dropToCartAnim(product) {
    console.log(cartProdList.childElementCount)

    // даём время на отслеживание изменений, чтобы убрать продукт с лавки
    setTimeout(() => {
        document.querySelectorAll(`.product#${product.id}`)[0].style = `
                    opacity: 0;
                    pointer-events: none;
                    `
    }, 0)

    // animProd - выбранный продукт, который будет перемещаться в корзину
    const animProd = product.cloneNode(true);
    animProd.style = `
        position: absolute;
        top: ${document.querySelectorAll(`.product#${product.id}`)[0].getBoundingClientRect().y}px;
        left: ${document.querySelectorAll(`.product#${product.id}`)[0].getBoundingClientRect().x}px;
        animation: toCart 0.9s forwards;
    `

    document.body.appendChild(animProd)

    // через некоторое время удаляем, так как сам продукт будет в корзине
    setTimeout(() => {
        animProd.remove();
    }, 1000)

}

// Устанавливаем события для .cart-element
cartElement.addEventListener('dragover', handleDragOver);
cartElement.addEventListener('drop', handleDrop);