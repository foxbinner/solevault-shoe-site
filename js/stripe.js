const stripe = Stripe(
  "pk_test_51MwftAHAlVvcy18krt3H5ym1iwQdRQyyQ2ZXiUXgRtFr8jw52JwIlmB7TkAtZsS27aS9spNf4MOpGt02jAlFIZZK00mCsdSw4u",
);
const elements = stripe.elements();
const card = elements.create("card");
card.mount("#card-element");

card.on("change", ({ error }) => {
  const displayError = document.getElementById("card-errors");
  displayError.textContent = error ? error.message : "";
});

document
  .getElementById("submit-payment")
  .addEventListener("click", async () => {
    const errorDiv = document.getElementById("card-errors");
    const submitBtn = document.getElementById("submit-payment");

    try {
      const total = Math.round(
        cart.reduce((sum, item) => sum + item.price, 0) * 100,
      ); // Convert to cents

      if (total <= 0) {
        errorDiv.textContent = "Your cart is empty. Add items before paying.";
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Processing...";

      const response = await fetch("/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server error (${response.status})`);
      }

      const { clientSecret } = await response.json();

      if (!clientSecret) {
        throw new Error("No client secret returned from server.");
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

      if (result.error) {
        errorDiv.textContent = result.error.message;
      } else {
        alert("Payment successful!");
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.href = "index.html";
      }
    } catch (err) {
      console.error("Payment failed:", err);
      errorDiv.textContent = err.message || "Payment failed. Please try again.";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Pay Now";
    }
  });
