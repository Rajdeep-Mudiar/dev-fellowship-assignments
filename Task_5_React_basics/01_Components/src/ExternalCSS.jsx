import "./ExternalCSS.css";

export const ExternalCSS = ({ children, type = "success" }) => {
  return <div className={`alert ${type}`}>{children}</div>;
};
