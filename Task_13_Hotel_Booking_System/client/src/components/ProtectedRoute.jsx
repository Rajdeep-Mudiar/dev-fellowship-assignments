import React from "react";
import { useUser, useClerk } from "@clerk/react";
import { useApp } from "../context/AppContext";

export const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign in required</h2>
        <p className="text-gray-600 mb-6">Please sign in to view your bookings and manage reservations.</p>
        <button
          onClick={() => openSignIn()}
          className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all font-medium"
        >
          Sign In
        </button>
      </div>
    );
  }

  return children;
};

export const AdminRoute = ({ children }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isAdmin } = useApp();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
        <p className="text-gray-600">You must be signed in with Admin privileges to access the dashboard.</p>
      </div>
    );
  }

  return children;
};
