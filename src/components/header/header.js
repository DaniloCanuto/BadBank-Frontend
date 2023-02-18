import StyledHeader from "./styles";
import { useState, useEffect } from "react";
import { useStore } from "../../providers/store/store.js";
import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const { user } = useStore();

  const options = [
    { id: 1, text: "Home", path: "/", description: "Return home" },
    {
      id: 2,
      text: "Create Account",
      path: "/create-account",
      description: "Create a BadBank account",
    },
    {
      id: 3,
      text: "Login",
      path: "/login",
      description: "Access your Account",
    },
    {
      id: 4,
      text: "Deposit",
      path: "/deposit",
      protect: !user.id,
      description: user.id
        ? "Add money to your account"
        : "You must login to access",
    },
    {
      id: 5,
      text: "Withdraw",
      path: "/withdraw",
      protect: !user.id,
      description: user.id
        ? "Withdraw money from your account"
        : "You must login to access",
    },
    {
      id: 6,
      text: "AllData",
      path: "/alldata",
      protect: !user.id,
      description: user.id ? "Display all account" : "You must login to access",
    },
  ];

  const setPath =
    options.find((item) => item.path === location.pathname).id ?? "/";

  const [selected, setSelected] = useState(setPath);
  const [hovered, setHovered] = useState(0);

  const handleClick = (id) => {
    setSelected(id);
  };

  const handleHover = (id) => {
    setHovered(id);
  };

  useEffect(() => {
    setSelected(setPath);
  }, [location.pathname, setPath]);

  return (
    <StyledHeader>
      <Nav>
        <Link to="/" onClick={() => handleClick(1)}>
          BadBank
        </Link>
        <div className="links">
          {options.map((option) => (
            <Nav.Item key={option.id}>
              <div
                className={`link ${selected === option.id ? "selected" : ""}`}
                onMouseOver={() => handleHover(option.id)}
                onMouseLeave={() => handleHover(0)}
              >
                <Link to={option.path} onClick={() => handleClick(option.id)}>
                  {option.text}
                </Link>
                {hovered === option.id && (
                  <div
                    className={`hovered ${option.protect ? "protected" : ""}`}
                  >
                    {option.description}
                  </div>
                )}
              </div>
            </Nav.Item>
          ))}
        </div>
      </Nav>
    </StyledHeader>
  );
}

export default Header;
