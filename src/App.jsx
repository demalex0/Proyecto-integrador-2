import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import NavbarC from "./components/navbar/NavbarC";
import FooterC from "./components/footer/FooterC";
import ContactoPage from "./pages/ContactoPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProductDetail from "./pages/ProductDetail";
import ErrorPage from "./pages/ErrorPage";
import "./App.css";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminCreateUpdateProduct from "./pages/AdminCreateUpdateProduct";
import UserCartPage from "./pages/UserCartPage";
const App = () => {
  return (
    <>
      <Router>
        <NavbarC />
        <Routes>
          <Route path="/productDetail/:id" element={<ProductDetail />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route
            path="/admin/products/createUpdate"
            element={<AdminCreateUpdateProduct />}
          />
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/cart" element={<UserCartPage />} />
          <Route path="/contact" element={<ContactoPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <FooterC />
      </Router>
    </>
  );
};

export default App;
