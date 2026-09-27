import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/react";
import { setAuthToken } from "../services/api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  const [searchParams, setSearchParams] = useState({
    city: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const [userRole, setUserRole] = useState("user");
  const [currency, setCurrency] = useState("$");

  // Synchronize Clerk auth token with Axios headers
  useEffect(() => {
    const syncToken = async () => {
      if (isSignedIn) {
        try {
          const token = await getToken();
          setAuthToken(token);
          // Check role from user metadata or set default
          const role = user?.publicMetadata?.role || "user";
          setUserRole(role);
        } catch (error) {
          console.error("Error fetching Clerk auth token:", error);
          setAuthToken(null);
        }
      } else {
        setAuthToken(null);
        setUserRole("user");
      }
    };

    if (isLoaded) {
      syncToken();
    }
  }, [isSignedIn, isLoaded, getToken, user]);

  const updateSearch = (params) => {
    setSearchParams((prev) => ({ ...prev, ...params }));
  };

  const clearSearch = () => {
    setSearchParams({
      city: "",
      checkIn: "",
      checkOut: "",
      guests: 1,
    });
  };

  return (
    <AppContext.Provider
      value={{
        searchParams,
        updateSearch,
        clearSearch,
        userRole,
        setUserRole,
        currency,
        setCurrency,
        isAdmin: userRole === "admin" || user?.publicMetadata?.role === "admin",
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
