function Button({ onClick, text, variant = "primary", disabled }) {
  const buttonColor = () => {
    const colors = {
      primary: "var(--primary)",
      secondary: "var(--secondary)",
      dark: "var(--dark)",
    };
    if (disabled) {
      return "var(--disabled)";
    }
    return colors[variant];
  };

  return (
    <button
      style={{
        height: "40px",
        padding: "5px 10px",
        color: "var(--light)",
        backgroundColor: buttonColor(),
        border: "none",
        borderRadius: "8px",
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
