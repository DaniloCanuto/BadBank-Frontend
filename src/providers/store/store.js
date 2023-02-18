import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DBaccounts } from "../../mocks/DB";
import { toUSD } from "../../helpers/currency";

export const StoreContext = createContext({});

export function StoreProvider({ children }) {
  const [accounts, setAccounts] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const addAccount = (payload) => {
    const nextIndex = !accounts.length
      ? 1
      : Math.max(...accounts.map((account) => account.id)) + 1;
    const newAccount = { id: nextIndex, ...payload, balance: 100 };
    setAccounts([...accounts, newAccount]);
  };

  const login = (payload) => {
    const { email, password } = payload;

    const account = accounts.find((item) => item.email === email);

    if (!account) {
      toast.error("This account doesn't exist");
      return;
    }

    if (account.email !== email || account.password !== password) {
      toast.error("Wrong email or password");
      return;
    }

    navigate("/deposit");
    toast.success(`Welcome ${account.name}`);
    setUser(account);
  };

  const updateBalance = (type, amount, userId) => {
    const maskedAmount = toUSD(amount);
    const updatedAccounts = [...accounts];
    const userIndex = accounts.findIndex((item) => item.id === userId);

    let newAmount;
    if (type === "deposit") {
      newAmount = updatedAccounts[userIndex].balance + amount;
      toast.success(`You deposited ${maskedAmount} to your account`);
    } else {
      newAmount = updatedAccounts[userIndex].balance - amount;
      toast.success(`You withdrew ${maskedAmount} from your account`);
    }
    updatedAccounts[userIndex].balance = newAmount;
    setAccounts(updatedAccounts);
    setUser({ ...user, balance: newAmount });
  };

  const addAmount = (payload, successCallback) => {
    const { userId, amount } = payload;
    const amountToNumber = Number(amount);
    if (amountToNumber < 0) {
      toast.error(`You cannot deposit a negative amount`);
      return;
    }
    if (Number.isNaN(+amount)) {
      toast.error(`You can only type numbers`);
      return;
    }
    updateBalance("deposit", amountToNumber, userId);
    successCallback();
  };

  const removeAmount = (payload, successCallback) => {
    const { userId, amount } = payload;
    let amountToNumber = Number(amount);

    if (amountToNumber < 0) {
      amountToNumber *= -1;
    }
    if (user.balance < amountToNumber) {
      toast.error("Insuficient funds");
      return;
    }
    if (Number.isNaN(+amount)) {
      toast.error("You can only type numbers");
      return;
    }
    updateBalance("withdraw", amountToNumber, userId);
    successCallback();
  };

  return (
    <StoreContext.Provider
      value={{ accounts, addAccount, login, user, addAmount, removeAmount }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
