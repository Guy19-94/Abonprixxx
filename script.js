
// Initial product list
let products = JSON.parse(localStorage.getItem("products")) || [
    { id: 1, name: "Laptop", category: "electronics", price: 1200, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Headphones", category: "accessories", price: 200, image: "https://via.placeholder.com/150" },
    {
        id: 3,
        name: "Biogance Complément Alimentaire pour Chien",
        category: "Animaux",
        price: 15.99,
        image: "https://m.media-amazon.com/images/I/71S+eVKxXrL._AC_SL1500_.jpg",
        description: "Complément alimentaire spécialement conçu pour aider les chiens en surpoids à retrouver une bonne condition physique."
    }
];

// Function to display products
function displayProducts(filteredProducts = products) {
    const productList = document.getElementById("productList");
    productList.innerHTML = ""; // Clear previous products
    filteredProducts.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Category: ${product.category}</p>
            <p>Price: €${product.price}</p>
            ${product.description ? `<p class="description">${product.description}</p>` : ""}
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Filter products by category
function filterByCategory(category) {
    if (category === "all") {
        displayProducts();
    } else {
        const filtered = products.filter(product => product.category === category);
        displayProducts(filtered);
    }
}

// Filter products by search term
function filterProducts() {
    const searchTerm = document.getElementById("searchBar").value.toLowerCase();
    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    displayProducts(filtered);
}

// Add a product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} has been added to your cart.`);
    }
}

// Handle the admin form submission
const addProductForm = document.getElementById("addProductForm");
addProductForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("productName").value;
    const category = document.getElementById("productCategory").value;
    const price = parseFloat(document.getElementById("productPrice").value);
    const image = document.getElementById("productImage").value;
    const description = document.getElementById("productDescription").value;

    const newProduct = {
        id: products.length + 1,
        name,
        category,
        price,
        image,
        description
    };

    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
    alert("Product added successfully!");

    addProductForm.reset();
});

// Initialize product display
window.onload = () => displayProducts();
