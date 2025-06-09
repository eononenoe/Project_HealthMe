// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "components/header";
import Footer from "components/footer";
import ResultPage from "pages/Result/ResultPage";
import JoinPage from "pages/login/JoinPage";
import LoginPage from "pages/login/LoginPage";
import OAuth2RedirectHandler from "pages/login/OAuth2RedirectHandler";

// ───── 관리자 영역 ─────
import Layout from "pages/admin/Layout";
import Dashboard from "pages/admin/Dashboard";
import ProductPage from "pages/admin/ProductPage";
import TransactionPage from "pages/admin/TransactionPage";
import AdminNoticePage from "pages/admin/AdminNoticePage";

// ───── 마이페이지 영역 ─────
import MypageLayout from "pages/mypage/MypageLayout";
import UserEdit from "pages/mypage/UserEdit";
import OrderHistoryPage from "pages/mypage/OrderHistoryPage";
import AddressEditPage from "pages/mypage/AddressEditPage";

//공지사항
import Announcement from "pages/Announcement/Announcement";

function AppRoutes() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Header />}

      <Routes>
        {/* ── 일반 사용자 영역 ── */}
        <Route path="/result" element={<ResultPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

        {/* ── 관리자 영역 ── */}
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="transactions" element={<TransactionPage />} />
          <Route path="announcements" element={<AdminNoticePage />} />
        </Route>

        {/* ── 마이페이지 영역 ── */}
        <Route path="/mypage" element={<MypageLayout />}>
          <Route index element={<UserEdit />} />
          <Route path="user_edit" element={<UserEdit />} />
          <Route path="purchase_history" element={<OrderHistoryPage />} />
          <Route path="address_edit" element={<AddressEditPage />} />
        </Route>

        {/* ── 고객센터 공지 목록(사용자용) ── */}
        <Route path="/announce" element={<Announcement />} />
      </Routes>

      {!isAdmin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
