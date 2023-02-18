import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/home";
import { useRef } from "react";
import { CreateAccount } from "../pages/create-account/create-account";
import { Login } from "../pages/login/login";
import { Deposit } from "../pages/deposit/deposit";
import { Withdraw } from "../pages/withdraw/withdraw";
import { AllData } from "../pages/allData/allData";
import { useStore } from "../providers/store/store";

function Router() {
  const { user } = useStore();

  const protect = (component) => {
    if (user.id) {
      return component;
    }
    return <Navigate to="/login" />;
  };
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="create-account" element={<CreateAccount />} />
      <Route path="login" element={<Login />} />
      <Route path="deposit" element={protect(<Deposit />)} />
      <Route path="withdraw" element={protect(<Withdraw />)} />
      <Route path="alldata" element={protect(<AllData />)} />
    </Routes>
  );
}

export default Router;
