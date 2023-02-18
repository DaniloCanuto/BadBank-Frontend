import Card from "../../components/card/card";
import Input from "../../components/input/input";
import { useState } from "react";
import Button from "../../components/button/button";
import { useStore } from "../../providers/store/store";
import { toast } from "react-toastify";
import StyledCreateAccounts from "./styles";

export function CreateAccount() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
    {
      name: "name",
      message: "The field name is required",
      status: false,
    },
  ]);
  const { accounts, addAccount } = useStore([]);
  const MIN_PASSWORD_LENGTH = 8;

  const hasMoreThanOneAccount = accounts.length > 0;

  const resetForm = () => {
    setPassword("");
    setName("");
    setEmail("");
  };

  const isAllEmpty = !password && !name && !email;

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

  const handleName = (e) => {
    setName(e.target.value);
    changeErrorStatus("name", e.target.value);
  };

  const handleSubmit = () => {
    const newError = [...error];

    if (password.length < MIN_PASSWORD_LENGTH) {
      newError[0].status = true;
    }
    if (!email) {
      newError[1].status = true;
    }
    if (!name) {
      newError[2].status = true;
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

    addAccount({ password, name, email });
    resetForm();
    toast.success("Account successfully created");
  };

  const body = (
    <StyledCreateAccounts>
      <Input
        placeholder="Name"
        value={name}
        onChange={handleName}
        error={error[2].status ? error[2].message : ""}
      />
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
        text={hasMoreThanOneAccount ? "Add Another Account" : "Create Account"}
        onClick={handleSubmit}
        disabled={isAllEmpty}
      />
    </StyledCreateAccounts>
  );

  return (
    <>
      <h2>Create Account</h2>
      <Card body={body} />
    </>
  );
}
