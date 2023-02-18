function Input({ placeholder, error, value, onChange, ...rest }) {
  return (
    <input
      style={{
        border: `1px solid ${error ? "var(--error)" : "var(--border)"}`,
        padding: "5px 10px",
        borderRadius: "5px",
      }}
      autoComplete="off"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
}

export default Input;
