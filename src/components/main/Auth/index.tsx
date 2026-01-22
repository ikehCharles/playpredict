"use client";

import { useState } from "react";
import { Button } from "@utilities";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { IoArrowBack } from "react-icons/io5";

interface AuthProps {
  defaultTab?: "signin" | "signup";
  onClose?: () => void;
  onSuccess?: () => void;
}

const Auth: React.FC<AuthProps> = ({ 
  defaultTab = "signin", 
  onClose,
  onSuccess 
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* White Background Wrapper */}
      <div className="bg-secondary rounded-3xl shadow-xl p-6">
        {/* Back Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="mb-4 p-2 rounded-full hover:bg-tertiary/5 transition-colors"
            aria-label="Go back"
          >
            <IoArrowBack className="w-6 h-6 text-tertiary" />
          </button>
        )}

        {/* Sign In / Sign Up Buttons */}
        <div className="flex gap-3 mb-6">
          <Button
            type={activeTab === "signin" ? "primary" : "default"}
            onClick={() => setActiveTab("signin")}
            className="flex-1"
            
          >
            Sign In
          </Button>
          <Button
            type={activeTab === "signup" ? "primary" : "default"}
            onClick={() => setActiveTab("signup")}
            className="flex-1"
           
          >
            Sign Up
          </Button>
        </div>

        {/* Form Content */}
        <div className="">
          {activeTab === "signin" ? (
            <SignIn onSuccess={onSuccess} />
          ) : (
            <SignUp onSuccess={onSuccess} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
