import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  Box,
  Pagination,
} from "@mui/material";
import axios from "axios";

export default function TransactionPage() {
  // DB조회와 상품 등록후 재조회
  const [transproducts, setPrducts] = useState([]); // db에 저장된 등록된 상품

  // 페이지네이션
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [update, setUpdate] = useState(false); // 제품등록 후 다시 db를 가져오기 위한 트리거

  // 로직 함수

  // 페이지 버튼 클릭 이벤트 정의
  const handlePageChange = (event, value) => {
    // event : 클릭 이벤트 객체, value : 사용자가 선택한 페이지 번호(1부터 시작) MUI의 Pagination 컴포넌트가 넘겨주는 매개변수이다.
    console.log(event);
    console.log(value);
    setPage(value);
  };

  // 거래 완료, 취소 이벤트 정의
  const transSuccess = (no) => {
    // cancel : N success: Y -> cancel : N success : Y
    const boolean = window.confirm("거래를 완료하시겠습니까?");
    if (boolean) {
      const transArray = {
        cancel: "N",
        success: "Y",
        no: no,
      };
      transAPI(transArray);
      setUpdate((prev) => !prev);
    } else {
      // 취소를 눌렀을때.
      window.alert("작업을 취소하였습니다.");
    }
  };

  const transCancel = (no) => {
    // cancel : N success : Y -> cancel : Y success : N
    const boolean = window.confirm("거래를 취소하시겠습니까?");
    if (boolean) {
      const transArray = {
        cancel: "Y",
        success: "N",
        no: no,
      };
      transAPI(transArray);
      setUpdate((prev) => !prev);
    } else {
      window.alert("작업을 취소하였습니다.");
    }
  };
  const transAPI = async (transArray) => {
    try {
      await axios.post("/transactions/status", transArray);
      window.alert("거래가 성공적으로 완료 처리되었습니다.");
    } catch (error) {
      window.alert("거래 완료에 실패하였습니다.");
    }
  };

  // 페이지네이션
  useEffect(() => {
    const pagemove = async () => {
      const PageContent = await axios.get(
        `/trans/selectAll?page=${page - 1}&size=10`
      );
      console.log(PageContent);
      // size는 한페이지에 몇개를 보여줄지 , page-1은 백엔드에서는 0부터 세니까 개발자 편하라고 하는거다.
      setPrducts(PageContent.data.content);
      setTotalPages(PageContent.data.totalPages);
    };

    pagemove();
  }, [page, update]);

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
              {/* th, td 역할( TableHead안에서는 th 역할 TableBody안에서는 td 역할) */}
              <TableCell>No</TableCell>
              <TableCell>상품명</TableCell>
              <TableCell>가격</TableCell>
              <TableCell>거래자</TableCell>
              <TableCell>거래은행</TableCell>
              <TableCell>거래일시</TableCell>
              <TableCell>취소여부</TableCell>
              <TableCell>완료여부</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/*map()으로 반복 렌더링 */}
            {transproducts.map((product) => (
              <TableRow key={product.id}>
                {/*key는 React가 어떤 항목이 바뀌었는지 정확히 알게 도와주는 고유 식별자입니다. */}
                <TableCell>{product.no}</TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.productPrice}</TableCell>
                <TableCell>{product.transcationPeople}</TableCell>
                <TableCell>{product.transcationBank}</TableCell>
                <TableCell>{product.transcationTime}</TableCell>
                <TableCell>{product.cancel}</TableCell>
                <TableCell>{product.success}</TableCell>
                <TableCell>
                  {product.cancel === "N" && product.success === "N" ? (
                    // 거래가 진행중인 경우
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => transSuccess(product.no)}
                    >
                      거래 완료
                    </Button>
                  ) : product.cancel === "N" && product.success === "Y" ? (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => transCancel(product.no)}
                    >
                      거래 취소
                    </Button>
                  ) : (
                    <Typography
                      sx={{
                        pl: 1.7,
                        color: "#999",
                      }}
                    >
                      취소됨
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* sx : style,  1 : 8px  */}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          size="large"
        />
      </Box>
    </Box>
  );
}
