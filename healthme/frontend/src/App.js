import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "components/header";
import Footer from "components/footer";
import ResultPage from "pages/Result/ResultPage";
import JoinPage from "pages/login/JoinPage";
import LoginPage from "pages/login/LoginPage";
// 메인 페이지
import Index from "pages/index";
// 구매 페이지
import PurchasePage from "pages/Purchase/PurchasePage";
// 추천재료 페이지
import NutritionalPage from "pages/Nutritional/NutritionalPage";
// 장바구니 페이지
import ShoppingCart from "pages/shopping cart/shopping_cart";
// 결제 페이지
import ApprovalPage from "pages/Approval/Approval";

// 관리자 페이지
import Layout from "pages/admin/Layout";
import Dashboard from "pages/admin/Dashboard";
import ProductPage from "pages/admin/ProductPage";
import Transaction from "pages/admin/TransactionPage";
import Complete from "pages/Complete/complete";

function AppRoutes() {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Header />}

      <Routes>
        {/* 메인 페이지 */}
        <Route path="/" element={<Index />}></Route>
        {/* 구매 페이지 */}
        <Route path="/purchase" element={<PurchasePage />}></Route>
        {/* 추천재료 페이지 */}
        <Route path="/nutritional" element={<NutritionalPage />}></Route>
        {/* 장바구니 페이지 */}
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        {/* 결제 페이지 */}
        <Route path="/approval" element={<ApprovalPage />} />
        {/* 사용자용 */}
        <Route path="/result" element={<ResultPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/complete" element={<Complete />} />

        {/* 관리자용 */}
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="transactions" element={<Transaction />} />
        </Route>
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
