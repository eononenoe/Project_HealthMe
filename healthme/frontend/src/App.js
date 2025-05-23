import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Header from 'components/header';
import Footer from 'components/footer';
import ResultPage from 'pages/Result/ResultPage';
import JoinPage from 'pages/login/JoinPage';
import LoginPage from 'pages/login/LoginPage';

// 관리자 페이지
import Layout from "pages/admin/Layout";
import Dashboard from "pages/admin/Dashboard";
import ProductPage from "pages/admin/ProductPage";
import Transaction from "pages/admin/TransactionPage";

function AppRoutes() {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPage && <Header />}

      <Routes>
        {/* 사용자용 */}
        <Route path="/result" element={<ResultPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/login" element={<LoginPage />} />

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