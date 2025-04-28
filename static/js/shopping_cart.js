// 수량 조정 기능
document.querySelectorAll('.increase').forEach(button => {
  button.addEventListener('click', function () {
    let quantitySpan = this.previousElementSibling;
    let quantity = parseInt(quantitySpan.innerText);
    quantitySpan.innerText = quantity + 1;
  });
});

document.querySelectorAll('.decrease').forEach(button => {
  button.addEventListener('click', function () {
    let quantitySpan = this.nextElementSibling;
    let quantity = parseInt(quantitySpan.innerText);
    if (quantity > 1) {
      quantitySpan.innerText = quantity - 1;
    }
  });
});
