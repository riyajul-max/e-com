
const api = 'https://fakestoreapi.com/products';
const display = document.querySelector('.fe-box');
const input = document.querySelector('#input');

const fetchData = async () => {
    const res = await fetch(api);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
};

let displayUser = async () => {
    let query = input.value;
    const product = await fetchData();

    const dataDisplay = product
        .filter((eventData) => {
            if (query === '') {
                return eventData;
            } else if (eventData.title.toLowerCase().includes(query.toLowerCase())) {
                return eventData;
            }
        })
        .map((obj) => {
            const { id, image, title, price, rating } = obj;

            return `
            <div class="fe-item" data-id="${id}">
                <div class="image">
                    <img src="${image}" alt="${title}">
                </div>
                <div class="item-info">
                    <span>${title}</span>
                    <div class="item-price">
                        <h4>$${price}<h4>
                    </div>
                    <div class="ratings">
                        <p>${rating.rate}</p>
                        <p>${rating.count}</p>
                    </div>
                </div>
            </div>`;
        })
        .join('');

    display.innerHTML = dataDisplay;

    // Add click event listeners to product cards
    const productCards = document.querySelectorAll('.fe-item');
    productCards.forEach((card) => {
        card.addEventListener('click', () => {
            const productId = card.getAttribute('data-id');
            const productData = product.find((item) => item.id == productId);
            localStorage.setItem('selectedProduct', JSON.stringify(productData));
            window.location.href = 'product.html';
        });
    });
};

displayUser();

input.addEventListener('input', () => {
    displayUser();
});




























// fetch('https://fakestoreapi.com/products')
// .then(res => {
//     if (!res.ok) {
//         throw new Error('Network response was not ok');
//     }
//     return res.json();
// })
// .then(data => {
//     data.forEach(item => {
//         const product = `<div class="fe-item">
//                         <div class="image">
//                         <img src="${item.image}" alt="">
//                         </div>
//                         <div class="item-info">
//                             <span>${item.title}</span>
//                         <div class="item-p">
//                             <div class="item-price">
//                                 <div>
//                                     <h4>$${item.price}<h4>
//                                 </div>
//                                 <div class="ratings">
//                                     <p>${item.rating.count}</p>
//                                     <p>${item.rating.rate}</p>
//                                 </div>
//                              </div>
//                         </div>
//                         </div>
//                         </div>`;

//                      document.querySelector('.fe-box').insertAdjacentHTML('beforeend', product);
//     })
// })
