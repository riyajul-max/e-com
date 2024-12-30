// Function to display the product on the page
function displayProduct() {
    const productData = localStorage.getItem('selectedProduct');
    if (!productData) {
        document.body.innerHTML = '<p>No product selected.</p>';
        return;
    }

    const product = JSON.parse(productData);

    // Dynamically populate the product page
    document.body.innerHTML = `
    <div id="navbar"></div>
    <section class="product">
        <div class="product-box">
            <div class="p-main-image">
                <img id="main-img" src="${product.image}" alt="${product.title}">
                <div class="s-img-group">
                    <div class="s-img-col"><img class="small-img" src="${product.image}" alt="${product.title}"></div>
                    <div class="s-img-col"><img class="small-img" src="${product.image}" alt="${product.title}"></div>
                    <div class="s-img-col"><img class="small-img" src="${product.image}" alt="${product.title}"></div>
                    <div class="s-img-col"><img class="small-img" src="${product.image}" alt="${product.title}"></div>
                </div>
            </div>
            <div class="p-info">
                <div class="p-ratings">
                    <h4 id="rating">Rating: ${product.rating.rate}</h4>
                    <h4 id="count">Reviews: ${product.rating.count}</h4>
                </div>
                <h4 id="title">${product.title}</h4>
                <h2 id="price">$${product.price}</h2>
                <div class="p-size">
                    <h5>Select Size</h5>
                    <div class="sizes">
                        <p>S</p><p>M</p><p>L</p><p>XL</p><p>XXL</p>
                    </div>
                </div>
                <div class="buttons">
                    <input id="quantity" type="number" value="1" min="1">
                    <button id="addToCart">ADD TO CART</button>
                </div>
                <h4 id="p-d">Product Details</h4>
                <span>${product.description}</span>
            </div>
        </div>
    </section>
        <section class="footer">
        <div class="container">
            <div class="footer-box">
                <div>
                    <h2>Get to Know Us</h2>
                    <a href="#">About Us</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms & Conditions</a>
                </div>
                <div>
                    <h2>Follow Us</h2>
                    <a href="#">Facebook</a>
                    <a href="#">Twitter</a>
                    <a href="#">Instagram</a>
                </div>
                <div>
                    <h2>Contact</h2>
                    <p><span>Address:</span>562 Wellington Road, Street 32,1<br>
                        San Francisco</p>
                    <p><span>Phone:</span> +01 2222 365 /(+91) 01 2345 6589</p>
                    <p><span>Hours:</span> 10:00-18:00, Mon - Sat</p>
                </div>
            </div>
        </div>
    </section>

    <section class="footer-bottom">
        <p>Copyright &copy; 2024 Trendy Treasures</p>
    </section>`;

    // Add to Cart button logic
    const addToCartButton = document.getElementById('addToCart');
    addToCartButton.addEventListener('click', () => {
        const quantity = parseInt(document.getElementById('quantity').value, 10);
        addToCart(product, quantity);
    });
}

// Function to add product to the cart
function addToCart(product, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
        // If the product already exists in the cart, update the quantity
        cart[existingProductIndex].quantity += quantity;
    } else {
        // If the product is new, add it to the cart
        cart.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}

// Display the product when the page loads
displayProduct();
