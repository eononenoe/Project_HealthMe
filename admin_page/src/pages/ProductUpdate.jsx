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
  //const [dataform, setDataform] = useState([]);
  const [saveform, setSaveform] = useState(false); //수정된 데이터 저장하게 하는 트리거

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
    // setSaveform(true);
  };

  //useEffect(() => {
  //  setForm(dataform);
  //}, [saveform]);

  const handleSubmit = async () => {
    await axios.put(`/product/${product.no}`, form);
    onClose();
    updatesucess(); // 부모에게 알리는 역할
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
