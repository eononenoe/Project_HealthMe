// URL에서 id 값을 읽어오기
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// 상품 정보 가져오기
const product = getProductById(productId);

// 상세 내용 렌더링
if (product) {
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-image").src = product.image;
  document.getElementById("product-price").textContent =
    product.discountPrice.toLocaleString() + "원";
  document.getElementById("product-description").textContent =
    product.description;
} else {
  document.querySelector(".product-detail").innerHTML =
    "<p>상품을 찾을 수 없습니다.</p>";
}
