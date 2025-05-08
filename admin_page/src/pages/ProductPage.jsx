import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Button,
  Box,
} from "@mui/material";

const products = [
  {
    id: 1,
    category: "주식",
    name: "코오롱 오조에이씨주&치킨가슴살오조에 80g",
    price: "42,000원",
    amount: "24",
  },
  {
    id: 2,
    category: "의류",
    name: "여자아이 반려 밀리터리 원피스 - 레이어 오렌지",
    price: "60,000원",
    amount: "7",
  },
];

export default function ProductPage() {
  return (
    <Box>
      <Typography variant="h7" fontWeight="bold">
        상품 관리 페이지입니다
      </Typography>
      <TableContainer>
        <Table>
          {/*실제 테이블을 감싸는 컴포넌트 */}
          <TableHead>
            {/* thead 역할을 하는 컴포넌트 */}
            <TableRow>
              {/* tr 역할을 하는 컴포넌트 */}
              <TableCell padding="checkbox">
                {/* th, td 역할( TableHead안에서는 th 역할 TableBody안에서는 td 역할) */}
                <Checkbox></Checkbox>
              </TableCell>
              <TableCell>No</TableCell>
              <TableCell>카테고리</TableCell>
              <TableCell>상품명</TableCell>
              <TableCell>가격</TableCell>
              <TableCell>재고</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/*map()으로 반복 렌더링 */}
            {products.map((product) => (
              <TableRow key={product.id}>
                {/*key는 React가 어떤 항목이 바뀌었는지 정확히 알게 도와주는 고유 식별자입니다. */}
                <TableCell padding="checkbox">
                  <Checkbox></Checkbox>
                </TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* sx : style,  1 : 8px  */}

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 2 }}>
        <Button variant="outlined" color="secondary" sx={{ mt: 2 }}>
          삭제
        </Button>
        <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
          등록
        </Button>
      </Box>
    </Box>
  );
}
