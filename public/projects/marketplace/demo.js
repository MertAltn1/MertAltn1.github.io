/* Bu dosya sadece statik demo icin var. Gercek backend yok.
   Sepet islemlerini fetch() yakalayarak taklit ediyor. */

function demoDisabled(event) {
    event.preventDefault();
    alert("This action needs the real backend (database, sessions, email) — not available in this static demo. See the source code on GitHub for the full implementation.");
    return false;
}

// gercek urunlerle ayni veri, sepet islemleri bunun uzerinde calisiyor
const DEMO_PRODUCTS = {
    1: { title: "Sutas Suzme Peynir 250 G", price: 59.9, image_path: "product-1.jpg", stock: 12 },
    2: { title: "Tahsildaroglu Dilimli Klasik Inek Beyaz Peynir 450 G", price: 79.9, image_path: "product-2.jpg", stock: 5 },
    3: { title: "Migros Suzme Peynir 500 G", price: 99.9, image_path: "product-3.jpg", stock: 8 },
    5: { title: "Oznal Dilimli Klasik Beyaz Peynir 450 G", price: 74.9, image_path: "product-5.jpg", stock: 10 },
    6: { title: "Ekici Beyaz Peynir Kg", price: 149.9, image_path: "product-6.jpg", stock: 6 },
};

// { productId: quantity }
// Kept in sessionStorage, not just memory: these are separate static HTML
// pages, so adding from the dashboard and then opening cart.html is a full
// page load. An in-memory object was emptied on every navigation, which made
// the cart always look empty.
const CART_KEY = "demoCart";

function loadCart() {
    try {
        return JSON.parse(sessionStorage.getItem(CART_KEY)) || {};
    } catch (e) {
        return {};
    }
}

function saveCart() {
    try {
        sessionStorage.setItem(CART_KEY, JSON.stringify(demoCart));
    } catch (e) { /* private mode — the cart just will not survive navigation */ }
}

const demoCart = loadCart();

function readCart() {
    return Object.entries(demoCart).map(([id, quantity]) => ({
        product_id: Number(id),
        quantity,
        title: DEMO_PRODUCTS[id].title,
        price: DEMO_PRODUCTS[id].price,
        image_path: DEMO_PRODUCTS[id].image_path,
    }));
}

const realFetch = window.fetch.bind(window);

window.fetch = async function (url, options = {}) {
    const isCartRoute = (path) => url.toString().endsWith(path);

    if (isCartRoute("/cart/items") && (!options.method || options.method === "GET")) {
        return jsonResponse(readCart());
    }

    if (isCartRoute("/cart/add") && options.method === "POST") {
        const { productId } = JSON.parse(options.body);
        const product = DEMO_PRODUCTS[productId];

        if (!product) return jsonResponse({ success: false, message: "Product not found." });

        const current = demoCart[productId] || 0;
        if (current >= product.stock) {
            return jsonResponse({ success: false, message: "Not enough stock." });
        }

        demoCart[productId] = current + 1;
        saveCart();
        return jsonResponse({ success: true });
    }

    if (isCartRoute("/cart/remove") && options.method === "POST") {
        const { productId } = JSON.parse(options.body);
        if (demoCart[productId] > 1) demoCart[productId] -= 1;
        else delete demoCart[productId];
        saveCart();
        return jsonResponse({ success: true });
    }

    if (isCartRoute("/cart/purchase") && options.method === "POST") {
        if (Object.keys(demoCart).length === 0) {
            return jsonResponse({ success: false, message: "Cart is empty." });
        }
        for (const id of Object.keys(demoCart)) delete demoCart[id];
        saveCart();
        return jsonResponse({ success: true });
    }

    return realFetch(url, options);
};

function jsonResponse(data) {
    return Promise.resolve({
        ok: true,
        json: async () => data,
    });
}

// tuketici panelindeki arama: gercek sunucuya gitmek yerine
// mevcut listeyi tarayicida sudan geciriyor
document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.querySelector(".search-bar form");
    if (!searchForm) return;

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const query = searchForm.querySelector('input[name="search"]').value.toLowerCase();

        document.querySelectorAll(".product").forEach((card) => {
            const title = card.querySelector(".product-info div").textContent.toLowerCase();
            card.style.display = title.includes(query) ? "" : "none";
        });
    });
});
