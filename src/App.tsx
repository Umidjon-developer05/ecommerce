import { Route, Routes } from "react-router-dom";
import { ECommerceNavbar } from "./components/e-ecommerce-navbar";
import Login from "./components/e-ecommerce-login";
import Home from "./components/e-ecommerce-home";
import ProductId from "./components/e-ecommerce-product-id";


const App = () => {
  return (
    <div className="px-2">
      <div>
        <ECommerceNavbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductId />} />
      </Routes>
    </div>
  );
};

export default App;
