const cartItems = document.querySelectorAll(".cart-item");

cartItems.forEach((item) => {
  const qtyValue = item.querySelector(".qty-number");
  const decreaseBtn = item.querySelector(".qty-btn:first-child");
  const increaseBtn = item.querySelector(".qty-btn:last-child");

  if (qtyValue && decreaseBtn && increaseBtn) {
    let count = parseInt(qtyValue.textContent);

    decreaseBtn.addEventListener("click", () => {
      if (count > 1) {
        count--;
        qtyValue.textContent = count;
      }
    });

    increaseBtn.addEventListener("click", () => {
      count++;
      qtyValue.textContent = count;
    });
  }
});
