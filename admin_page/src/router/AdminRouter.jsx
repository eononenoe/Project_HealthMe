import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import Dashboard from "../pages/Dashboard";
import ProductPage from "../pages/ProductPage";
import Transcation from "../pages/TransactionPage";

export default function AdminRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/transactions" element={<Transcation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
