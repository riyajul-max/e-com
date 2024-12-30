


// CARAOUSEL

let slideIndex = 1;
showSlides(slideIndex);

// previous/next controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currenSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    
    let slides = document.getElementsByClassName('slider');
    let text = document.getElementsByClassName('main-text');
    
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      text[i].style.display = "none";
    }
  

    slides[slideIndex-1].style.display = "block";
    text[slideIndex-1].style.display = "block";
}



// function filterCategory(category) {
//     function fetchApi(){
//     fetch('https://fakestoreapi.com/products')
//     .then(res => {
//         if (!res.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return res.json();
//     })
//     .then(data => {

//         document.querySelector('.fe-box').innerHTML = "";

//         data.map(item =>{
//             if( item.category === category) {
//                 const markup = `<div class="fe-item">
//                         <div class="image">
//                         <img src="${item.image}" alt="">
//                         </div>
//                         <div class="item-info">
//                             <span>${item.title}</span>
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
//                         </div>`;

//                      document.querySelector('.fe-box').insertAdjacentHTML('beforeend', markup);


//             }
//         })
        
//     })
//  }
//  fo
//  fetchApi();
// }


const api = 'https://fakestoreapi.com/products';

// Fetch product data
async function fetchProducts() {
    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

// Filter and display products based on category
async function filterCategory(category = "men's clothing") {
    const products = await fetchProducts();

    // Clear existing products
    const productContainer = document.querySelector('.fe-box');
    productContainer.innerHTML = '';

    // Filter products by category
    const filteredProducts = products.filter(product => product.category === category);

    // Inject product cards into the DOM
    filteredProducts.forEach(product => {
        const markup = `
            <div class="fe-item" data-id="${product.id}">
                <div class="image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="item-info">
                    <span>${product.title}</span>
                    <div class="item-price">
                        <h4>$${product.price}</h4>
                    </div>
                    <div class="ratings">
                        <p>Rating: ${product.rating.rate}</p>
                        <p>Reviews: ${product.rating.count}</p>
                    </div>
                </div>
            </div>
        `;
        productContainer.insertAdjacentHTML('beforeend', markup);
    });

    // Add click event listeners to product cards
    document.querySelectorAll('.fe-item').forEach(card => {
        card.addEventListener('click', () => {
            const productId = card.dataset.id;
            const selectedProduct = products.find(item => item.id == productId);

            // Store product details in localStorage
            localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));

            // Redirect to product page
            window.location.href = 'product.html';
        });
    });
}

// Highlight active category
function highlightCategory(selectedItem) {
    document.querySelectorAll('.con-item').forEach(item => {
        item.classList.remove('active-category');
    });
    selectedItem.classList.add('active-category');
}

// Set default category on page load
document.addEventListener('DOMContentLoaded', () => {
    const defaultCategoryItem = document.querySelector('.men');
    filterCategory("men's clothing");
    highlightCategory(defaultCategoryItem);

    document.querySelectorAll('.con-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            highlightCategory(item);
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    if (product) {
        document.getElementById('main-img').src = product.image;
        document.getElementById('title').textContent = product.title;
        document.getElementById('price').textContent = `$${product.price}`;
        document.getElementById('rating').textContent = `Rating: ${product.rating.rate}`;
        document.getElementById('count').textContent = `Reviews: ${product.rating.count}`;
    }
});




// let a = fetch('https://fakestoreapi.com/products');
// a.then(res =>{
//     if (!res.ok) {
//         throw new Error('Network response was not ok');
//     }
//     return res.json();
// })
// .then(data => {
//     // document.querySelector('').insertAdjacentHTML('afterbegining', markup);

//     data.map(item => {
//         if(item.category == category) {
//             const markup = `<div class="fe-item">
//                     <div class="image"><img src="${item.image}" alt=""></div>
//                     <div class="item-info">
//                    <span>${item.title}</span>
//                     <p class="description">${item.description}</p>
//                     <div class="item-price">
//                         <div>
//                         <h4>$${item.price}<h4>
//                         </div>
//                         <div class="ratings">
//                                 <p>${item.rating.count}</p>
//                                 <p>${item.rating.rate}</p>
//                         </div>
//                     </div>
//                    <div>
//                     </div>`;

//                     document.querySelector('.fe-box').insertAdjacentHTML('beforeend', markup);
//             console.log(item);
//         }
//         console.log(data)

        
//         // if(item.category=="")

//     });

//     // displayCategory();
// })
// .catch(error => {
//     console.error('There was a problem with the fetch operation:', error);

// });

                     // <h4>${item.price}</h4>
                    // <div class="ratings">
                    //     <p>${prodctus.rating.count}</p>
                    //      <p>${prodctus.rating.rate}</p>
                    // </div>


/* <div class="fe-item">
<img src="images/el.jpg" alt="">
<h4>Title</h4>
<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
</div> */

