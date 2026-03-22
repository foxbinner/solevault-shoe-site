// ===== PRODUCT DATA =====
const products = [
  {
    id: 1,
    name: "AeroStride Runner",
    price: 89.99,
    description:
      "Lightweight running shoe with breathable mesh upper and responsive cushioning for daily miles.",
    image: "images/shoe-1.jpg",
    badge: "Bestseller",
    oldPrice: 129.99,
    tagline: "Run Faster, Feel Lighter",
  },
  {
    id: 2,
    name: "UrbanFlex Sneaker",
    price: 74.99,
    description:
      "Sleek street-style sneaker with a flexible sole, perfect for all-day city adventures.",
    image: "images/shoe-2.jpg",
    badge: "New",
    oldPrice: 119.99,
    tagline: "Street Style Redefined",
  },
  {
    id: 3,
    name: "TrailBlazer Hiker",
    price: 119.99,
    description:
      "Rugged hiking shoe with waterproof construction and aggressive tread for off-road trails.",
    image: "images/shoe-3.jpg",
    badge: "Popular",
    oldPrice: 179.99,
    tagline: "Conquer Every Trail",
  },
  {
    id: 4,
    name: "CloudWalk Comfort",
    price: 64.99,
    description:
      "Memory-foam cushioned casual shoe designed for ultimate comfort during long walks.",
    image: "images/shoe-4.jpg",
    badge: "Sale",
    oldPrice: 99.99,
    tagline: "Walk on Clouds",
  },
  {
    id: 5,
    name: "VelocityX Racer",
    price: 134.99,
    description:
      "High-performance racing flat with carbon-fiber plate for speed on race day.",
    image: "images/shoe-5.jpg",
    badge: "Pro",
  },
  {
    id: 6,
    name: "NightOwl Reflective",
    price: 99.99,
    description:
      "Reflective running shoe with 360° visibility and plush ride for late-night jogs.",
    image: "images/shoe-6.jpg",
    badge: "Hot",
  },
  {
    id: 7,
    name: "ZenStep Minimalist",
    price: 59.99,
    description:
      "Barefoot-inspired minimalist shoe with zero-drop sole for a natural stride.",
    image: "images/shoe-7.jpg",
    badge: "Trending",
  },
  {
    id: 8,
    name: "SummitPeak Alpine",
    price: 149.99,
    description:
      "Premium mountaineering shoe with insulated lining and reinforced toe cap for harsh terrain.",
    image: "images/shoe-8.jpg",
    badge: "Premium",
  },
  {
    id: 9,
    name: "BreezeLite Slip-On",
    price: 49.99,
    description:
      "Casual slip-on with lightweight knit fabric and cushioned insole — easy on, easy off.",
    image: "images/shoe-9.jpg",
    badge: "Sale",
  },
  {
    id: 10,
    name: "TitanGrip CrossFit",
    price: 109.99,
    description:
      "Cross-training shoe with wide base, rope-grip outsole, and ankle support for intense workouts.",
    image: "images/shoe-10.jpg",
    badge: "New",
  },
];

// First 4 go in the hero slider, remaining 6 go in the product grid
const bannerProducts = products.slice(0, 4);
const gridProducts = products.slice(4);

// ===== CART =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  document.querySelectorAll("#cart-count").forEach((el) => {
    el.textContent = cart.length;
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toast-msg");
  if (!toast || !toastMsg) return;
  toastMsg.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// ===== HERO SLIDER =====
let currentSlide = 0;
let sliderInterval;

const bannerData = [
  {
    tag: "🔥 FLASH SALE — 30% OFF",
    headline: "Run Faster,<br>Feel <span>Lighter</span>",
    cta: "Shop Now →",
  },
  {
    tag: "⚡ NEW ARRIVAL",
    headline: "Street Style<br><span>Redefined</span>",
    cta: "Explore →",
  },
  {
    tag: "🏔️ ADVENTURE READY",
    headline: "Conquer<br>Every <span>Trail</span>",
    cta: "Discover →",
  },
  {
    tag: "☁️ COMFORT FIRST",
    headline: "Walk on<br><span>Clouds</span>",
    cta: "Get Yours →",
  },
];

function buildSlider() {
  const slider = document.getElementById("hero-slider");
  const controls = document.getElementById("slider-controls");
  if (!slider || !controls) return;

  // Build slides
  bannerProducts.forEach((product, i) => {
    const slide = document.createElement("div");
    slide.className = `slide ${i === 0 ? "active" : ""}`;
    const data = bannerData[i];
    const oldPrice = product.oldPrice
      ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>`
      : "";

    slide.innerHTML = `
      <div class="slide-bg"><img src="${product.image}" alt="${product.name}"></div>
      <div class="slide-content">
        <div class="slide-text">
          <div class="slide-tag">${data.tag}</div>
          <h1 class="slide-title">${data.headline}</h1>
          <p class="slide-desc">${product.description}</p>
          <div class="slide-price">
            <span class="new-price">$${product.price.toFixed(2)}</span>
            ${oldPrice}
          </div>
          <a href="product.html?id=${product.id}" class="slide-cta">${data.cta}</a>
        </div>
        <div class="slide-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
      </div>
    `;
    // Insert before the arrows div
    slider.insertBefore(slide, slider.querySelector(".slider-arrows"));
  });

  // Build dots
  bannerProducts.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = `slider-dot ${i === 0 ? "active" : ""}`;
    dot.onclick = () => goToSlide(i);
    controls.appendChild(dot);
  });

  startAutoSlide();
}

function goToSlide(index) {
  const slides = document.querySelectorAll(".hero-slider .slide");
  const dots = document.querySelectorAll(".slider-dot");
  if (!slides.length) return;

  slides[currentSlide].classList.remove("active");
  dots[currentSlide].classList.remove("active");

  currentSlide = index;
  if (currentSlide >= slides.length) currentSlide = 0;
  if (currentSlide < 0) currentSlide = slides.length - 1;

  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

function changeSlide(dir) {
  goToSlide(currentSlide + dir);
  resetAutoSlide();
}

function startAutoSlide() {
  sliderInterval = setInterval(() => goToSlide(currentSlide + 1), 4000);
}

function resetAutoSlide() {
  clearInterval(sliderInterval);
  startAutoSlide();
}

// ===== PRODUCT GRID (6 items) =====
function populateProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  const ratings = ["★★★★★", "★★★★☆", "★★★★★", "★★★★☆", "★★★★★", "★★★★☆"];

  productList.innerHTML = gridProducts
    .map(
      (product, i) => `
      <div class="product-card">
        <span class="card-badge">${product.badge}</span>
        <div class="card-img-wrap">
          <img src="${product.image}" alt="${product.name}">
          <a href="product.html?id=${product.id}" class="card-img-overlay-btn">View Details</a>
        </div>
        <div class="card-info">
          <h3>${product.name}</h3>
          <p class="card-desc">${product.description}</p>
          <div class="card-bottom">
            <span class="card-price">$${product.price.toFixed(2)}</span>
            <span class="card-rating">${ratings[i % ratings.length]}</span>
          </div>
        </div>
      </div>
    `,
    )
    .join("");
}

// ===== PRODUCT DETAIL PAGE =====
function loadProductDetails() {
  const nameEl = document.getElementById("product-name");
  if (!nameEl) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));
  const product = products.find((p) => p.id === productId);

  if (product) {
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-description").textContent =
      product.description;
    document.getElementById("product-price").textContent =
      `$${product.price.toFixed(2)}`;
    document.title = `${product.name} — SoleVault`;
  }
}

function addToCart() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));
  const product = products.find((p) => p.id === productId);

  if (product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showToast(`${product.name} added to cart!`);
  }
}

// ===== CART PAGE =====
function displayCart() {
  const cartItemsEl = document.getElementById("cart-items");
  const cartSubtotal = document.getElementById("cart-subtotal");
  const cartTotal = document.getElementById("cart-total");
  const cartSummary = document.getElementById("cart-summary");
  if (!cartItemsEl) return;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything yet.</p>
        <a href="index.html">Continue Shopping</a>
      </div>
    `;
    if (cartSummary) cartSummary.style.display = "none";
    return;
  }

  cartItemsEl.innerHTML = cart
    .map(
      (item, index) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>${item.description.substring(0, 60)}…</p>
        </div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        <button class="remove-btn" onclick="removeFromCart(${index})" title="Remove">✕</button>
      </div>
    `,
    )
    .join("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  if (cartSubtotal) cartSubtotal.textContent = `$${total.toFixed(2)}`;
  if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
}

// ===== CHECKOUT PAGE =====
function displayCheckout() {
  const checkoutItems = document.getElementById("checkout-items");
  const checkoutTotal = document.getElementById("checkout-total");
  if (!checkoutItems || !checkoutTotal) return;

  checkoutItems.innerHTML = cart
    .map(
      (item) => `
      <div class="checkout-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="checkout-item-info">
          <h5>${item.name}</h5>
          <p>${item.description.substring(0, 50)}…</p>
        </div>
        <div class="checkout-item-price">$${item.price.toFixed(2)}</div>
      </div>
    `,
    )
    .join("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  checkoutTotal.textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(index) {
  const removed = cart[index];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  displayCart();
  showToast(`${removed.name} removed from cart`);
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  buildSlider();
  populateProducts();
  loadProductDetails();
  displayCart();
  displayCheckout();
});
