// index 페이지에 있는 상품들

const products = {
  handon: {
    id: "handon",
    name: "[JJH365] 한돈 부위별 대용량 가성비 7종",
    image:
      "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/4c36b050-06f9-4ce1-9597-27bf4c2563fb.jpg",
    originalPrice: 28900,
    discountPrice: 18900,
    discount: 34,
    review: "999+",
    description: "가성비 좋은 한돈 부위별 대용량 세트입니다.",
  },
  egg20: {
    id: "egg20",
    name: "[KIM01] 동물복지 백색 유정란 20구",
    image:
      "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/b5afa0d9-0d39-424a-b4aa-df14e290244e.jpg",
    originalPrice: 10200,
    discountPrice: 8670,
    discount: 15,
    review: "999+",
    description: "동물복지 인증을 받은 신선한 유정란입니다.",
  },
  vegemix600: {
    id: "vegemix600",
    name: "[YSB111] 유기농 채소믹스 600g (냉동)",
    image:
      "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/2806a17d-deba-4bc4-b6ec-d6dc0c96e575.jpg",
    originalPrice: 8990,
    discountPrice: 8490,
    discount: 5,
    review: "999+",
    description: "냉동 상태로 보관이 편리한 유기농 채소믹스입니다.",
  },
  tomato1: {
    id: "tomato1",
    name: "[YSH45] 완숙토마토 1kg",
    image:
      "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/dd55e8f3-621f-4b3b-b775-460c4b6c2435.jpeg",
    originalPrice: 11900,
    discountPrice: 9900,
    discount: 16,
    review: "999+",
    description: "당도 높은 완숙토마토를 1kg 단위로 담았습니다.",
  },
  blueberry125: {
    id: "blueberry125",
    name: "[JJH09] 칠레산 블루베리 125g*3",
    image:
      "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/a78fcd53-dd61-4b5c-afcd-7ee9a583e045.jpg",
    originalPrice: 19900,
    discountPrice: 9900,
    discount: 49,
    review: "999+",
    description: "신선한 칠레산 블루베리를 125g씩 3팩으로 구성했습니다.",
  },
  tomato750: {
    id: "tomato750",
    name: "[JJH30] 대추방울토마토 750g",
    image:
      "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/4436fdec-039d-4683-b8f3-7ebf677ad190.jpg",
    originalPrice: 11900,
    discountPrice: 6990,
    discount: 41,
    review: "999+",
    description: "탱글탱글하고 달콤한 대추방울토마토입니다.",
  },
  vegemix500: {
    id: "vegemix500",
    name: "[JJH05] 채소믹스 500g",
    image:
      "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/8a813917-6a80-4a23-8bf1-074df5875493.jpg",
    originalPrice: 5990,
    discountPrice: 5290,
    discount: 11,
    review: "999+",
    description: "여러 가지 채소가 함께 들어 있어 편리한 믹스채소 세트입니다.",
  },
  beefskirt: {
    id: "beefskirt",
    name: "[JJH21] 호주산 목초육 치마살 구이용 300g",
    image:
      "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/5a551f25-bcc3-4b26-914e-4cedce85dc7e.jpeg?v=0531",
    originalPrice: 16590,
    discountPrice: 11900,
    discount: 27,
    review: "999+",
    description: "육즙 가득한 호주산 치마살, 구이용으로 최적입니다.",
  },
};

function getProductById(id) {
  return products[id];
}

function renderProducts(products, targetSelector) {
  const container = document.querySelector(targetSelector);
  container.innerHTML = ""; // 기존 내용 초기화

  products.forEach((product) => {
    const itemHTML = `
      <li class="item_store">
        <a href="product_detail.html?id=${product.id}">
          <div class="item_img">
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <div class="item_name">
            <span>${product.name}</span>
          </div>
        </a>
        <div class="item_add">
          <i class="fa-solid fa-cart-shopping"></i>
          <span onclick="alert('장바구니에 담겼습니다')">담기</span>
        </div>
        <div class="item_discount_price">
          <del>${product.originalPrice.toLocaleString()}원</del>
        </div>
        <div class="item_price">
          <ul>
            <li class="discount">${product.discount}%</li>
            <li class="price">${product.discountPrice.toLocaleString()}원</li>
          </ul>
        </div>
        <div class="item_review">
          <i class="fa-regular fa-comment-dots"></i>
          <span>${product.review}</span>
        </div>
      </li>
    `;
    container.innerHTML += itemHTML;
  });
}
