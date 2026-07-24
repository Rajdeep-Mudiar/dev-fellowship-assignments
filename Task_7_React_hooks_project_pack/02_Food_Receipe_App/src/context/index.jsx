import { createContext, useState } from "react";

export const GlobalState = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState(null);
  return (
    <GlobalState.Provider value={{ searchParam, setSearchParam }}>
      {children}
    </GlobalState.Provider>
  );
}
