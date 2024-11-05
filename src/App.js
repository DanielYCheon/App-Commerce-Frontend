import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./Component/Home";
import { Login } from "./Component/Login";
import Navbar from "./Component/Navbar";
import { NewCollection } from "./Component/NewCollection";
import { Register } from "./Component/Register";
import MainUserInfo from "./Component/MainUserInfo";
import WomanSection from "./Component/WomanSection";
import { AdminPage } from "./Component/AdminPage";
import ProductDetail from "./Component/ProductDetail";
import Coordinate from "./Component/Coordinate";

import { AuthContext, AuthProvider } from "./Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import ProtectedRoute from "./Component/ProtectedRoute";
import { CartProvider } from "./Component/CartProvider";
import { Account } from "./Component/UserInfoPage/Account";
import Wishlist from "./Component/UserInfoPage/Wishlist";
import Address from "./Component/UserInfoPage/Address";
import MenSection from "./Component/MenSection";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/mainuserinfo"
            element={
              <ProtectedRoute>
                <MainUserInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="/newcollection" element={<NewCollection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/women" element={<WomanSection />} />
          <Route path="/men" element={<MenSection />} />
          <Route path="/:gender/:productName" element={<ProductDetail />} />
          <Route path="/coordinate" element={<Coordinate />} />

          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/address" element={<Address />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
