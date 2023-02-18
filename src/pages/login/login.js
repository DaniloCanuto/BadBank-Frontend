import Card from "../../components/card/card";
import Input from "../../components/input/input";
import { useState } from "react";
import Button from "../../components/button/button";
import { useStore } from "../../providers/store/store";
import { toast } from "react-toastify";
import StyledLogin from "./styles";

export function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState([
    {
      name: "password",
      message: "Your password must have more than 8 characters",
      status: false,
    },
    {
      name: "email",
      message: "The field email is required",
      status: false,
    },
  ]);
  const { login } = useStore([]);
  const MIN_PASSWORD_LENGTH = 8;

  const isAllEmpty = !password && !email;

  const changeErrorStatus = (field, condition) => {
    const newError = [...error];
    const fieldErrorIndex = error.findIndex((item) => item.name === field);
    if (condition) {
      newError[fieldErrorIndex].status = "";
    }
    setError(newError);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    changeErrorStatus("password", e.target.value.length >= MIN_PASSWORD_LENGTH);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    changeErrorStatus("email", e.target.value);
  };

  const handleSubmit = () => {
    const newError = [...error];

    if (password.length < MIN_PASSWORD_LENGTH) {
      newError[0].status = true;
    }
    if (!email) {
      newError[1].status = true;
    }

    setError(newError);
    newError
      .filter((item) => item.status)
      .forEach((item) => {
        toast.error(item.message);
      });

    const errors = newError.filter((item) => item.status);

    if (errors.length) {
      return;
    }

    login({ password, email });
  };

  const body = (
    <StyledLogin>
      <Input
        placeholder="Email"
        value={email}
        onChange={handleEmail}
        error={error[1].status ? error[1].message : ""}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={handlePassword}
        error={error[0].status ? error[0].message : ""}
      />
      <Button
        variant="dark"
        text={"Login"}
        onClick={handleSubmit}
        disabled={isAllEmpty}
      />
    </StyledLogin>
  );

  return (
    <>
      <h2>Login</h2>
      <Card body={body} />
    </>
  );
}
