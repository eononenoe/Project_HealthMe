import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Layout() {
  return (
    <>
      <Topbar />
      <Box sx={{ display: "flex", mt: "64px" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* 실제로는 <main> 태그로 렌더링 : 시멘틱하게 문서 구조를 구분하기 위해*/}
          <Outlet />{" "}
          {/* 선택된 페이지 컴포넌트 표시  == 레이아웃 안에서 동적으로 바뀌는 페이지 내용을 꽂아넣는 자리*/}
        </Box>
      </Box>
    </>
  );
}
