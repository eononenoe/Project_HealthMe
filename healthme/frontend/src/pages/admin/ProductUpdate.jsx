import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";

export default function ProductUpdate({
  // 정의된 컴포넌트 이름
  open, // 앞에서 넘긴 props를 받는다(객체의 구조 분해 할당)
  onClose,
  product,
  updatesucess,
}) {
  const [form, setForm] = useState({
    // 수정될 폼
    category: "",
    productName: "",
    productPrice: 0,
    amount: 0,
    description: "",
  });

  const [thumbnail, setThumbnail] = useState();
  const [detailImage, setDetailImage] = useState();

  useEffect(() => {
    // 수정할 product값을 form에 넣어두기 위해서.
    if (product) {
      setForm(product);
    }
  }, [product]); // 의존성 배열 추가 안하면 컴포넌트가 리렌더링될 때마다 setForm(product)가 계속 실행되면서, 사용자가 입력한 값이 매번 product 값으로 덮어씌워짐

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prevform) => ({
      // prevform은 가장 최신의 상태값이다.
      ...prevform,
      [name]: value, //form을 수정한 내용으로 변경.
      // 객체에서 key자리에 변수를 사용할려면 []
    }));
  };

  //useEffect(() => {
  //  setForm(dataform);
  //}, [saveform]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("category", form.category);
    formData.append("productName", form.productName);
    formData.append("productPrice", form.productPrice);
    formData.append("amount", form.amount);
    formData.append("description", form.description);

    if (thumbnail) {
      formData.append("thumbnailUrl", thumbnail);
    }

    if (detailImage) {
      formData.append("detailUrl", detailImage);
    }

    try {
      await axios.put(`/product/${form.no}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onClose();
      updatesucess(); // 부모 컴포넌트에게 성공 알림
    } catch (err) {
      console.error("수정 실패", err);
      window.alert("수정 실패!");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>상품 수정</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
      >
        <TextField
          label="카테고리"
          name="category"
          value={form.category}
          onChange={handleChange}
        />
        <TextField
          label="상품명"
          name="productName"
          value={form.productName}
          onChange={handleChange}
        />
        <TextField
          label="가격"
          name="productPrice"
          value={form.productPrice}
          onChange={handleChange}
          type="number"
        />
        <TextField
          label="수량"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          type="number"
        />
        <TextField
          label="제품 상세 설명"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <Button variant="contained" component="label">
          썸네일 이미지 업로드
          <input
            type="file"
            hidden
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
        </Button>

        <Button variant="contained" component="label">
          상세 이미지 업로드
          <input
            type="file"
            hidden
            onChange={(e) => setDetailImage(e.target.files[0])}
          />
        </Button>
        <Button variant="outlined" onClick={onClose}>
          취소
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          수정
        </Button>
      </DialogContent>
    </Dialog>
  );
}
