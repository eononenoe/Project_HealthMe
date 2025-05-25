import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Pagination,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { Padding } from "@mui/icons-material";

export default function TransactionPage() {
  // DB조회와 상품 등록후 재조회
  const [transproducts, setPrducts] = useState([]); // db에 저장된 등록된 상품

  // 페이지네이션
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [update, setUpdate] = useState(false); // 제품등록 후 다시 db를 가져오기 위한 트리거

  // 검색
  const [searchText, setSearchText] = useState();
  const [searchMode, setSearchMode] = useState(false); // 검색 모드로 분기시키는 트리거

  // 환불/반품
  const [refundReturnOrderid, setRefundReturnOrderid] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);

  const token = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // 로직 함수

  // 페이지 버튼 클릭 이벤트 정의
  const handlePageChange = (event, value) => {
    // event : 클릭 이벤트 객체, value : 사용자가 선택한 페이지 번호(1부터 시작) MUI의 Pagination 컴포넌트가 넘겨주는 매개변수이다.
    console.log(event);
    console.log(value);
    setPage(value);
  };

  // 거래 완료, 취소 이벤트 정의
  const transSuccess = (orderId) => {
    // cancel : N success: Y -> cancel : N success : Y
    const boolean = window.confirm("거래를 완료하시겠습니까?");
    if (boolean) {
      const transArray = {
        isCanceled: "N",
        isCompleted: "Y",
        orderId: orderId,
      };
      transAPI(transArray);
      setUpdate((prev) => !prev);
    } else {
      // 취소를 눌렀을때.
      window.alert("작업을 취소하였습니다.");
    }
  };

  const transCancel = (orderId) => {
    // cancel : N success : Y -> cancel : Y success : N
    const boolean = window.confirm("거래를 취소하시겠습니까?");
    if (boolean) {
      const transArray = {
        isCanceled: "Y",
        isCompleted: "N",
        orderId: orderId,
      };
      transAPI(transArray);
      setUpdate((prev) => !prev);
    } else {
      window.alert("작업을 취소하였습니다.");
    }
  };

  const transAPI = async (transArray) => {
    try {
      await axios.post("/transactions/status", transArray, config);
      window.alert("거래가 성공적으로 완료 처리되었습니다.");
    } catch (error) {
      window.alert("거래 완료에 실패하였습니다.");
    }
  };

  // 검색 핸들러
  const searchChange = (e) => {
    setSearchText(e.target.value);
  };

  const searchClick = () => {
    setPage(1); // 7페이지에서 다른 검색어로 검색했을때 다시 1페이지로 이동하기 위해서
    if (searchText !== "") {
      setSearchMode(true); // 검색 모드로 들어간다.
    } else {
      setSearchMode(false); // 전체 목록 보기
    }
    setUpdate((prev) => !prev); // 1페이지에서 '...'으로 검색했을때 바뀌게하기 위해서
  };

  // 환불/반품 요청 버튼 클릭
  const openDialog = (orderId) => {
    setRefundReturnOrderid(orderId);
    setDialogOpen(true);
  };

  const handleRefundOrReturn = (element) => {
    if (element === "환불") {
      const transArray = {
        refundRequested: "Y",
        orderId: refundReturnOrderid,
      };
      refundReturnAPI(transArray, element);
      setDialogOpen(false);
      setUpdate((prev) => !prev);
    } else if (element === "반품") {
      const transArray = {
        returnRequested: "Y",
        orderId: refundReturnOrderid,
      };
      refundReturnAPI(transArray, element);
      setDialogOpen(false);
      setUpdate((prev) => !prev);
    }
  };

  const refundReturnAPI = async (transArray, element) => {
    try {
      await axios.post(
        `/transactions/refundReturn?type=${element}`,
        transArray,
        config
      );
    } catch (error) {}
  };

  // 페이지네이션
  useEffect(() => {
    const selectMode = async () => {
      if (searchMode) {
        const searchData = await axios.get(
          `/transactions/search/data?searchText=${searchText}&page=${
            page - 1
          }&size=10,`,
          config
        );
        console.log("searchData : ", searchData);
        if (searchData !== null) {
          setPrducts(searchData.data.content); // 리렌더링이 일어난다. -> 화면에 검색결과에 따른 목록이 보인다.
          setTotalPages(searchData.data.totalPages);
        }
      } else {
        const PageContent = await axios.get(
          `/trans/selectAll?page=${page - 1}&size=10`,
          config
        );
        console.log(PageContent);
        if (PageContent !== null) {
          // size는 한페이지에 몇개를 보여줄지 , page-1은 백엔드에서는 0부터 세니까 개발자 편하라고 하는거다.
          setPrducts(PageContent.data.content);
          setTotalPages(PageContent.data.totalPages);
        }
      }
    };
    selectMode();
  }, [page, update, searchMode]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h7" fontWeight="bold">
          거래 내역 관리 페이지입니다.
        </Typography>

        <TextField
          variant="outlined"
          placeholder="거래자를 입력하세요"
          value={searchText}
          onChange={searchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment style={{ cursor: "pointer", position: "end" }}>
                <SearchIcon onClick={searchClick} />
              </InputAdornment>
            ),
          }}
          size="small"
          sx={{ width: 200 }}
        />
      </Box>

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
                <TableCell>{product.orderId}</TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.productPrice}</TableCell>
                <TableCell>{product.transcationPeople}</TableCell>
                <TableCell>{product.transcationBank}</TableCell>
                <TableCell>{product.orderDate}</TableCell>
                <TableCell>{product.isCanceled}</TableCell>
                <TableCell>{product.isCompleted}</TableCell>
                <TableCell>
                  {product.isCanceled === "N" && product.isCompleted === "N" ? (
                    // 거래가 진행중인 경우
                    <>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => transSuccess(product.orderId)}
                        sx={{ mr: 1 }}
                      >
                        거래 완료
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => transCancel(product.orderId)}
                      >
                        거래 취소
                      </Button>
                    </>
                  ) : product.isCanceled === "N" &&
                    product.isCompleted === "Y" ? (
                    product.refundRequested === "Y" ? (
                      <Typography
                        sx={{
                          pl: 1.7,
                          color: "#999",
                          fontSize: "0.875rem",
                          fontStyle: "italic",
                        }}
                      >
                        환불 완료
                      </Typography>
                    ) : product.returnRequested === "Y" ? (
                      <Typography
                        sx={{
                          pl: 1.7,
                          color: "#999",
                          fontSize: "0.875rem",
                          fontStyle: "italic",
                        }}
                      >
                        반품 완료
                      </Typography>
                    ) : (
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={() => openDialog(product.orderId)}
                      >
                        환불 / 반품 요청
                      </Button>
                    )
                  ) : (
                    // product.cancel === "Y" , product.success === "N" 인 경우
                    <Typography
                      sx={{
                        pl: 1.7,
                        color: "#999",
                        fontSize: "0.875rem",
                        fontStyle: "italic",
                      }}
                    >
                      취소 완료
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

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>요청 선택</DialogTitle>
        <DialogContent>
          <DialogContentText>
            해당 거래에 대해 환불 또는 반품 중 어떤 요청을 하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleRefundOrReturn("환불")}
            color="error"
            variant="outlined"
          >
            환불 요청
          </Button>
          <Button
            onClick={() => handleRefundOrReturn("반품")}
            color="warning"
            variant="outlined"
          >
            반품 요청
          </Button>
          <Button onClick={() => setDialogOpen(false)}>닫기</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
