// src/components/ProductRegisterDialog.jsx
import React, { useState } from "react";
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

export default function ProductRegisterDialog({ open, onClose, onSubmit }) {
  const [registCategory, setregistCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [detailImage, setDetailImage] = useState("");

  const token = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // 등록 버튼 이벤트
  const AddProduct = async () => {
    // 등록버튼 눌렀을때 실행되는 이벤트
    const foamData = new FormData();
    foamData.append("category", registCategory);
    foamData.append("productName", productName);
    foamData.append("productPrice", Number(price));
    foamData.append("amount", Number(amount));
    foamData.append("description", description);
    foamData.append("thumbnailUrl", thumbnail);
    foamData.append("detailUrl", detailImage);

    // HTML 폼 데이터를 key-value 쌍으로 저장하고 서버로 전송할 수 있게 해주는 특수한 객체이다(브라우저가 제공하는 객체이다).
    try {
      await axios.post("/product/insert/data", foamData, config);
      // post의 3번째 매개변수에 headers: {
      // "Content-Type": "multipart/form-data" 넣어주면 좋긴한데 axios 사용하면 안 넣어도 된다.

      // setUpdate((prev) => {
      //   return !prev;
      // }); // 트리거로 인해서 useEffect가 의존성배열 때문에 다시 실행되고 바뀐 db의 데이터를 가져온다.
      onSubmit(); // 등록했을때 첫페이지로 이동한다.
      onClose();
      // 초기화
      setregistCategory("");
      setProductName("");
      setPrice(0);
      setAmount(0);
      setDescription("");
      setThumbnail("");
      setDetailImage("");
    } catch (error) {
      window.alert("등록되지 않았습니다.", error);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>상품 등록</DialogTitle>
      <DialogContent dividers>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            select
            label="카테고리"
            required
            fullWidth
            value={registCategory}
            onChange={(e) => {
              console.log(e);
              setregistCategory(e.target.value);
            }}
          >
            <MenuItem value="리빙">리빙</MenuItem>
            <MenuItem value="가전">가전</MenuItem>
          </TextField>
          <TextField
            label="제품명"
            required
            fullWidth
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextField
            label="가격"
            type="number"
            required
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            label="수량"
            type="number"
            required
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            label="제품 상세 설명"
            multiline
            rows={4}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          취소
        </Button>
        <Button onClick={AddProduct} variant="contained" color="primary">
          등록
        </Button>
      </DialogActions>
    </Dialog>
  );
}
