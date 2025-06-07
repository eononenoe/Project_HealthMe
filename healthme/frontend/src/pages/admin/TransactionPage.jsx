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

/**
 * 관리자 > 거래 내역 페이지 (DTO 기반 2025.06)
 */
export default function TransactionPage() {
  /* --------------------------- 상태 --------------------------- */
  const [orders, setOrders] = useState([]); // 목록
  const [page, setPage] = useState(1); // 현재 페이지 (1-base)
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [needRefresh, setNeedRefresh] = useState(false); // 새로고침 트리거

  // 검색
  const [keyword, setKeyword] = useState("");
  const [searchMode, setSearchMode] = useState(false);

  // 환불·반품 다이얼로그
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  /* --------------------------- 공통 --------------------------- */
  const toggleRefresh = () => setNeedRefresh((prev) => !prev);

  /* --------------------------- 목록 조회 --------------------------- */
  useEffect(() => {
    const fetchData = async () => {
      const base = searchMode
        ? `/transactions/search/data?searchText=${keyword}&page=${
            page - 1
          }&size=10`
        : `/trans/selectAll?page=${page - 1}&size=10`;
      try {
        const { data } = await axios.get(base, { withCredentials: true });
        setOrders(data.content);
        setTotalPages(data.totalPages);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [page, needRefresh, searchMode, keyword]);

  /* --------------------------- 상태 변경 --------------------------- */
  const updateStatus = async (payload) => {
    try {
      await axios.post("/transactions/status", payload, {
        withCredentials: true,
      });
    } catch (e) {
      alert("작업에 실패했습니다.");
      throw e;
    }
  };

  const handleComplete = async (orderId) => {
    if (!window.confirm("거래를 완료하시겠습니까?")) return;
    await updateStatus({ orderId, canceled: false, completed: true });
    toggleRefresh();
  };

  const handleCancel = async (orderId) => {
    if (!window.confirm("거래를 취소하시겠습니까?")) return;
    await updateStatus({ orderId, canceled: true, completed: false });
    toggleRefresh();
  };

  /* --------------------------- 환불 / 반품 --------------------------- */
  const requestRefundOrReturn = async (type) => {
    const payload =
      type === "환불"
        ? { orderId: selectedOrderId, refundRequested: true }
        : { orderId: selectedOrderId, returnRequested: true };
    try {
      await axios.post(`/transactions/refundReturn?type=${type}`, payload, {
        withCredentials: true,
      });
      setDialogOpen(false);
      toggleRefresh();
    } catch (e) {
      alert(`${type} 요청에 실패했습니다.`);
    }
  };

  /* --------------------------- 렌더 --------------------------- */
  const renderItemNames = (items = []) =>
    items.map((i) => i.productName).join(", ");

  return (
    <Box>
      {/* 헤더 & 검색 */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          거래 내역 관리 페이지입니다.
        </Typography>
        <TextField
          placeholder="거래자를 입력하세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          size="small"
          sx={{ width: 220 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                <SearchIcon
                  onClick={() => {
                    setPage(1);
                    setSearchMode(keyword.trim() !== "");
                  }}
                />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* 테이블 */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>상품명</TableCell>
              <TableCell>가격</TableCell>
              <TableCell>거래자</TableCell>
              <TableCell>결제수단</TableCell>
              <TableCell>거래일시</TableCell>
              <TableCell>취소여부</TableCell>
              <TableCell>완료여부</TableCell>
              <TableCell align="center" width={220}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{renderItemNames(order.items)}</TableCell>
                <TableCell>{order.totalPrice.toLocaleString()}원</TableCell>
                <TableCell>{order.userid}</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>{order.orderDate.replace("T", " ")}</TableCell>
                <TableCell>{order.canceled ? "Y" : "N"}</TableCell>
                <TableCell>{order.completed ? "Y" : "N"}</TableCell>
                <TableCell>
                  {!order.canceled && !order.completed ? (
                    <>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => handleComplete(order.orderId)}
                      >
                        거래 완료
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => handleCancel(order.orderId)}
                      >
                        거래 취소
                      </Button>
                    </>
                  ) : order.completed ? (
                    order.refundRequested ? (
                      <Typography sx={{ color: "#999", fontStyle: "italic" }}>
                        환불 완료
                      </Typography>
                    ) : order.returnRequested ? (
                      <Typography sx={{ color: "#999", fontStyle: "italic" }}>
                        반품 완료
                      </Typography>
                    ) : (
                      <Button
                        variant="outlined"
                        size="small"
                        color="secondary"
                        onClick={() => {
                          setSelectedOrderId(order.orderId);
                          setDialogOpen(true);
                        }}
                      >
                        환불 / 반품 요청
                      </Button>
                    )
                  ) : (
                    <Typography sx={{ color: "#999", fontStyle: "italic" }}>
                      취소 완료
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 페이지네이션 */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, v) => setPage(v)}
          color="primary"
          shape="rounded"
        />
      </Box>

      {/* 환불 / 반품 다이얼로그 */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>요청 선택</DialogTitle>
        <DialogContent>
          <DialogContentText>
            해당 거래에 대해 어떤 요청을 하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={() => requestRefundOrReturn("환불")}
          >
            환불 요청
          </Button>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => requestRefundOrReturn("반품")}
          >
            반품 요청
          </Button>
          <Button onClick={() => setDialogOpen(false)}>닫기</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
