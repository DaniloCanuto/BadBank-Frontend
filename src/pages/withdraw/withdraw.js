import StyledWithdraw from "./styles";
import { useState } from "react";
import { useStore } from "../../providers/store/store";
import Card from "../../components/card/card";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import { toUSD } from "../../helpers/currency";

export function Withdraw() {
  const { user, removeAmount } = useStore();
  const [amount, setAmount] = useState(0);

  const title = (
    <div className="withdraw-title">
      BALANCE <span>{toUSD(user.balance)}</span>
    </div>
  );

  const resetAmount = () => {
    setAmount(0);
  };

  const handleClick = () => {
    removeAmount({ userId: user.id, amount }, resetAmount);
  };

  const handleChange = (e) => {
    setAmount(e.target.value);
  };
  const isAmountZero = amount === 0;

  const body = (
    <div className="withdraw-body">
      <h4>WITHDRAW AMOUNT</h4>
      <Input placeholder="amount" value={amount} onChange={handleChange} />
      <Button
        text="WITHDRAW"
        variant="dark"
        onClick={handleClick}
        disabled={isAmountZero}
      />
    </div>
  );
  return (
    <StyledWithdraw>
      <h2>Withdraw</h2>
      <Card title={title} body={body} />
    </StyledWithdraw>
  );
}
