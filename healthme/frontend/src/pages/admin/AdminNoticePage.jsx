import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Paper,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// ───────── 모달 컴포넌트 ─────────
function NoticeModal({ open, onClose, onSave, init }) {
  const [form, setForm] = useState(init);

  // init 값이 바뀌면 폼 초기화
  useEffect(() => setForm(init), [init]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{form.id ? "공지 수정" : "새 공지 등록"}</DialogTitle>
      <DialogContent dividers>
        <TextField
          select
          label="분류"
          name="category"
          fullWidth
          value={form.category}
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          {["공지사항", "이벤트공지", "FAQ"].map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="제목"
          name="title"
          fullWidth
          value={form.title}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="내용"
          name="content"
          multiline
          rows={8}
          fullWidth
          value={form.content}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {form.id ? "수정" : "등록"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ───────── 메인 페이지 ─────────
export default function AdminNoticePage() {
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);

  // 모달 제어
  const empty = { category: "공지사항", title: "", content: "" };
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // null → 신규, obj → 수정

  // ── CRUD helpers ──
  const fetchRows = () =>
    axios.get("/api/notices").then((r) => setRows(r.data));

  const createRow = (dto) =>
    axios.post("/api/admin/notices", dto).then(fetchRows);

  const updateRow = (dto) =>
    axios.put(`/api/admin/notices/${dto.id}`, dto).then(fetchRows);

  const deleteRows = async () => {
    await Promise.all(
      selected.map((id) => axios.delete(`/api/admin/notices/${id}`))
    );
    setSelected([]);
    fetchRows();
  };

  // ── side-effect: 최초 조회 ──
  useEffect(fetchRows, []);

  // ── render ──
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" mb={2}>
        공지 관리
      </Typography>

      {/* 상단 버튼 */}
      <Button
        variant="contained"
        sx={{ mr: 2 }}
        onClick={() => {
          setEditing(null);
          setModalOpen(true);
        }}
      >
        + 새 공지
      </Button>
      <IconButton
        disabled={!selected.length}
        onClick={deleteRows}
        color="error"
      >
        <DeleteIcon />
      </IconButton>

      {/* 목록 */}
      <Table size="small" sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>번호</TableCell>
            <TableCell>분류</TableCell>
            <TableCell>제목</TableCell>
            <TableCell>작성일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => {
            const checked = selected.includes(row.id);
            const toggle = () =>
              setSelected((prev) =>
                checked ? prev.filter((v) => v !== row.id) : [...prev, row.id]
              );

            return (
              <TableRow
                key={row.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={(e) => {
                  // 체크박스 클릭은 수정 모달 열지 않음
                  if (e.target.type === "checkbox") return;
                  setEditing(row);
                  setModalOpen(true);
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={checked} onChange={toggle} />
                </TableCell>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.createdDate.slice(0, 10)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* 등록/수정 모달 */}
      <NoticeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={editing ? updateRow : createRow}
        init={editing || empty}
      />
    </Paper>
  );
}
