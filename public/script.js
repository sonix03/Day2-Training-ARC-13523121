document.addEventListener("DOMContentLoaded", () => {
    const loadButton = document.getElementById("loadProducts");
    const productContainer = document.getElementById("productContainer");

    loadButton.addEventListener("click", async () => {
        try {
            const response = await fetch("https://dummyjson.com/products");
            const data = await response.json();
            displayProducts(data.products);
        } catch (error) {
            console.error("Error fetching products:", error);
            productContainer.innerHTML = "<p>Failed to load products.</p>";
        }
    });

    function displayProducts(products) {
        productContainer.innerHTML = "";
        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("card");

            productCard.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
            `;

            productContainer.appendChild(productCard);
        });
    }
});
