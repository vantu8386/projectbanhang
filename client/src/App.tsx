import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChonSize from "./pages/ChonSize";
import ChinhSachKhachVip from "./pages/ChinhSachKhachVip";
import GioiThieu from "./pages/GioiThieu";
import NotFoundPage from "./pages/NotFoundPage";
import SearchResults from "./pages/SearchResults";
import ProductPages from "./pages/ProductPages";
import Product from "./pages/Product";
import Account from "./pages/Account";
import Purchase from "./pages/Purchase";
import CheckOutPage from "./pages/CheckOutPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Admin from "./admin/Admin";
import AdminPage from "./admin/AdminPage";
import { AuthProvider } from "./checkuser/AuthContext";
import Users from "./admin/Users";
import ProductManagement from "./admin/ProductManagement";
import UploadProduct from "./componentsAdmin/UploadProduct";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="/chon-size" element={<ChonSize />} />
            <Route path="/chinh-sach" element={<ChinhSachKhachVip />} />
            <Route path="/gioi-thieu" element={<GioiThieu />} />
            <Route path="/products/:idCollection" element={<ProductPages />} />
            <Route path="/product/review/:product" element={<Product />} />
            <Route path="/account" element={<Account />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/check-out" element={<CheckOutPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<SearchResults />} />
          </Route>

          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminPage />} />
            <Route path="/admin/user" element={<Users />} />
            <Route path="/admin/product-management" element={<ProductManagement />}>
             
            </Route>
            <Route path="/admin/upload-product" element={<UploadProduct />} />
          </Route>

          <Route path="*" element={<Navigate to="/not-found" />} />
          <Route path="/not-found" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
