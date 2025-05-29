import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Header from 'components/header';
import Footer from 'components/footer';
import ResultPage from 'pages/Result/ResultPage';
import JoinPage from 'pages/login/JoinPage';
import LoginPage from 'pages/login/LoginPage';
import OAuth2RedirectHandler from 'pages/login/OAuth2RedirectHandler';

// 메인 페이지
import Index from "pages/index";
// 설문 페이지
import QuestionPage from "pages/Question/QuestionPage";
// 구매 페이지
import PurchasePage from "pages/Purchase/PurchasePage";
// 추천재료 페이지
import NutritionalPage from "pages/Nutritional/NutritionalPage";
// 제품상세 페이지
import DetailsPage from "pages/Details/DetailsPage"

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
        {/* 메인 페이지 */}
        <Route path="/" element={<Index />}></Route>
        {/* 설문 페이지 */}
        <Route path="/question" element={<QuestionPage />}></Route>
        {/* 구매 페이지 */}
        <Route path="/purchase" element={<PurchasePage />}></Route>
        {/* 추천재료 페이지 */}
        <Route path="/nutritional" element={<NutritionalPage />}></Route>
        {/* 제품상세 페이지 */}
        <Route path="/details" element={<DetailsPage />}></Route>
        {/* 사용자용 */}
        <Route path="/result" element={<ResultPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
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