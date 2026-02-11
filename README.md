# 👟 SoleVault — Premium Footwear E-Commerce

A modern, fully-featured e-commerce shoe store with a stunning UI, auto-sliding hero banner, toast notifications, and secure Stripe payment integration.

---

## 🖼️ Screenshots

<table style="width: 100%; border-collapse: collapse;">
  <tr>
    <td align="center" width="50%">
      <img src="https://github.com/user-attachments/assets/fed3081d-ae5b-468b-ad8d-6f0b9b138bd8" alt="Hero Banner" style="width:100%;">
    </td>
    <td align="center" width="50%">
      <img src="https://github.com/user-attachments/assets/1b65940a-0921-4cf5-a241-8cb6a573ff6d" alt="Product Listing" style="width:100%;">
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="https://github.com/user-attachments/assets/a3e78a37-878c-4b06-85ba-d7436500a02d" alt="Cart View" style="width:100%;">
    </td>
    <td align="center" width="50%">
      <img src="https://github.com/user-attachments/assets/d75285d9-f74d-4e76-810f-7dc40c761f2a" alt="Checkout" style="width:100%;">
    </td>
  </tr>
</table>

## ✨ Features

| Feature                    | Description                                                                                         |
| -------------------------- | --------------------------------------------------------------------------------------------------- |
| 🎠 **Hero Banner Slider**  | Auto-sliding full-width banner showcasing 4 featured shoes with sale tags, pricing, and CTA buttons |
| 🛍️ **Product Grid**        | 6 trending shoes displayed in a responsive 3-column grid with hover effects and quick-view overlays |
| 📄 **Product Detail Page** | Side-by-side layout with large image, ratings, description, and add-to-cart button                  |
| 🛒 **Shopping Cart**       | Real-time cart with item images, remove buttons, and a sticky order summary sidebar                 |
| 💳 **Stripe Checkout**     | Secure payment processing via Stripe Elements with encrypted card input                             |
| 🔔 **Toast Notifications** | Elegant slide-in toasts for add/remove actions (replaces alert pop-ups)                             |
| 🔥 **Animated Promo Bar**  | Gradient-shifting top banner advertising sales and discount codes                                   |
| 📱 **Fully Responsive**    | Optimized layout for desktop, tablet, and mobile screens                                            |
| 🎨 **Modern UI**           | Inter font, CSS custom properties, smooth transitions, and glassmorphism accents                    |

---

## 🛠️ Tech Stack

- **Frontend** — HTML5, CSS3 (custom, no framework), Vanilla JavaScript
- **Backend** — Node.js, Express.js
- **Payments** — Stripe API (Payment Intents)
- **Font** — [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (v18+)
- A [Stripe](https://stripe.com) account with test API keys
- Git

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/muzamal478/ecommerce-stripe-website.git
cd ecommerce-stripe-website

# 2. Install dependencies
npm install

# 3. Create a .env file with your Stripe secret key
echo STRIPE_SECRET_KEY=sk_test_your_secret_key > .env
```

### Configuration

- Open `js/stripe.js` and replace the publishable key with your own Stripe **Publishable Key**.
- The **Secret Key** is read from the `.env` file by the server.

### Run

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Test Payment

Use Stripe's test card to simulate a purchase:

| Field       | Value                 |
| ----------- | --------------------- |
| Card Number | `4242 4242 4242 4242` |
| Expiry      | Any future date       |
| CVC         | Any 3 digits          |
| ZIP         | Any 5 digits          |

Verify payments in the [Stripe Test Dashboard](https://dashboard.stripe.com/test/payments).

---

## 📁 Project Structure

```
solevault/
├── css/
│   └── styles.css           # Complete custom CSS (variables, slider, cards, pages)
├── images/
│   ├── shoe-1.jpg … shoe-10.jpg   # Product images
├── js/
│   ├── script.js            # Products data, slider, cart, UI rendering
│   └── stripe.js            # Stripe Elements & payment processing
├── cart.html                # Shopping cart page
├── checkout.html            # Stripe checkout page
├── index.html               # Landing page (hero slider + product grid)
├── product.html             # Product detail page
├── server.js                # Express server + Stripe Payment Intents
├── package.json             # Project metadata & dependencies
├── .env                     # Stripe secret key (not committed)
├── LICENSE                  # MIT License
└── README.md                # This file
```

---

## 🧩 Pages Overview

### 🏠 Landing Page (`index.html`)

- Animated gradient promo bar
- Dark navbar with brand icon and cart badge
- 4-slide auto-rotating hero banner with sale tags and product images
- 6 product cards in a responsive grid with hover zoom and overlay buttons

### 📄 Product Page (`product.html`)

- Large product image with hover zoom
- Product tag, star ratings, description, and price
- Add to Cart and Back to Shop buttons

### 🛒 Cart Page (`cart.html`)

- Item cards with image, name, description, price, and remove button
- Sticky order summary sidebar with subtotal, shipping, discount, and total
- Empty cart state with illustration and CTA

### 💳 Checkout Page (`checkout.html`)

- Order summary with item thumbnails
- Stripe card element with secure payment button
- Encryption notice

---

## 🤝 Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m "Add my feature"`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
