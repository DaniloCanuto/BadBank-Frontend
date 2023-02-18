import StyledDeposit from "./styles";
import { useState } from "react";
import { useStore } from "../../providers/store/store";
import Card from "../../components/card/card";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import { toUSD } from "../../helpers/currency";

export function Deposit() {
  const { user, addAmount } = useStore();
  const [amount, setAmount] = useState(0);

  const title = (
    <div className="deposit-title">
      BALANCE <span>{toUSD(user.balance)}</span>
    </div>
  );

  const resetAmount = () => {
    setAmount(0);
  };

  const handleClick = () => {
    addAmount({ userId: user.id, amount }, resetAmount);
  };

  const handleChange = (e) => {
    setAmount(e.target.value);
  };
  const isAmountZero = amount === 0;

  const body = (
    <div className="deposit-body">
      <h4>DEPOSIT AMOUNT</h4>
      <Input placeholder="amount" value={amount} onChange={handleChange} />
      <Button
        text="DEPOSIT"
        variant="dark"
        onClick={handleClick}
        disabled={isAmountZero}
      />
    </div>
  );

  return (
    <StyledDeposit>
      <h2>Deposit</h2>
      <Card title={title} body={body} />
    </StyledDeposit>
  );
}
