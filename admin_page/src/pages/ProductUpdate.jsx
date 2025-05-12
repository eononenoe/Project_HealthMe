import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";

export default function ProductUpdate({
  open,
  onClose,
  product,
  updatesucess,
}) {
  const [form, setForm] = useState({
    category: "",
    productName: "",
    productPrice: 0,
    amount: 0,
    description: "",
  });

  useEffect(() => {
    // 수정할 product값을 form에 넣어두기 위해서.(초기에 한번 실행된다.)
    if (product) {
      setForm(product);
    }
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((preData) => ({
      ...preData,
      [name]: value,
      // 객체에서 key자리에 변수를 사용할려면 []
    }));
  };

  const handleSubmit = async () => {
    await axios.put(`/products/${product.no}`, form);
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
        <Button variant="contained" onClick={handleSubmit}>
          수정
        </Button>
      </DialogContent>
    </Dialog>
  );
}
