// // mobile.js - файл для работы над добавлением товара по клику

// // Находим изображение корзины
// const cartEl = document.querySelector('#cart')

// // Перебираем все элементы списка продуктов
// for (const prodEl of productElements) {

//     // по событию "click" происходит добавление продукта в корзину
//     if (window.innerWidth < 768) {
//         prodEl.addEventListener('click', () => {
//             addingToCart(prodEl)
//         })
//     }

//     prodEl.addEventListener('keydown', (evt) => {
//         if (evt.key === 'Enter') {
//             addingToCart(prodEl)
//         }
//     })
// }