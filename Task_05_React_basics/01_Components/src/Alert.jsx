export const Alert = ({ children, type = "success" }) => {
  const backgroundColor = type === "error" ? "#ef4444" : "#10b981";
  const color = "black";

  return (
    <div
      style={{
        backgroundColor,
        color,
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "16px",
      }}
    >
      {children}
    </div>
  );
};
