const plusBtn = document.querySelector('.plus');
const minusBtn = document.querySelector('.minus');
const countSpan = document.querySelector('.count');
const orderAmount = document.getElementById('order-amount');
const finalAmount = document.getElementById('final-amount');
const deleteBtn = document.querySelector('.delete');
const cartItem = document.querySelector('.cart-item');
const checkbox = document.querySelector('.item-checkbox');

let pricePerItem = 10000;
let quantity = 1;

function updatePrice() {
  const total = checkbox.checked ? pricePerItem * quantity : 0;
  orderAmount.textContent = `${total.toLocaleString()}원`;
  finalAmount.textContent = `${total.toLocaleString()}원`;
}

plusBtn.addEventListener('click', () => {
  quantity++;
  countSpan.textContent = quantity;
  updatePrice();
});

minusBtn.addEventListener('click', () => {
  if (quantity > 1) {
    quantity--;
    countSpan.textContent = quantity;
    updatePrice();
  }
});

checkbox.addEventListener('change', updatePrice);

deleteBtn.addEventListener('click', () => {
  cartItem.remove();
  updatePrice();
});
