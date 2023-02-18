import StyledAllData from "./styles";
import { useStore } from "../../providers/store/store";
import Card from "../../components/card/card";
import { toUSD } from "../../helpers/currency";

export function AllData() {
  const { accounts } = useStore();

  const body = (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>email</th>
          <th>name</th>
          <th>password</th>
          <th>balance</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.email}</td>
            <td>{item.name}</td>
            <td>{item.password}</td>
            <td>{toUSD(item.balance)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <StyledAllData>
      <h2>AllData</h2>
      <Card body={body} width="60vw" minHeight="300px" />
    </StyledAllData>
  );
}
