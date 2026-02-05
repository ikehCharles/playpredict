"use client";

import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "@utilities";

interface AuthBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthAction?: () => void; // Called when user selects any auth option
}

const AuthBottomSheet: React.FC<AuthBottomSheetProps> = ({
  isOpen,
  onClose,
  onAuthAction,
}) => {
  const router = useRouter();

  const handleEmailSignup = () => {
    console.log("Continue with Email");
    onClose();
    
    // Check if we're already on auth page (via checking current path)
    if (typeof window !== "undefined" && window.location.pathname === "/account/auth") {
      // Already on auth page, just close the bottom sheet
      return;
    }
    
    // Navigate to auth page
    router.push("/account/auth?from=onboarding");
  };

  const handleGoogleSignup = () => {
    console.log("Continue with Google");
    // Mark onboarding as completed
    onAuthAction?.();
    // TODO: Implement Google OAuth
  };

  const handleTwitterSignup = () => {
    console.log("Continue with X (Twitter)");
    // Mark onboarding as completed
    onAuthAction?.();
    // TODO: Implement Twitter OAuth
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-tertiary/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container - Centered on Desktop, Bottom Sheet on Mobile */}
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
        <div className="bg-secondary rounded-t-3xl md:rounded-3xl shadow-2xl animate-slide-up md:animate-fade-in w-full md:max-w-md mx-auto">
          <div className="px-2 md:px-6 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-tertiary">
                Log in or sign up
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-tertiary/5 transition-colors"
                aria-label="Close"
              >
                <IoMdClose className="w-6 h-6 text-tertiary" />
              </button>
            </div>

            {/* Authentication Options */}
            <div className="space-y-4">
              {/* Continue with Email */}
              <Button
                type="primary"
                onClick={handleEmailSignup}
                icon={<MdEmail className="scale-120" />}
                className="w-full py-4 rounded-xl font-semibold shadow-md"
                
              >
                Continue with Email
              </Button>

              {/* Continue with Google */}
              <Button
                onClick={handleGoogleSignup}
                icon={<FcGoogle className="scale-120" />}
                className="w-full py-4 rounded-xl font-semibold border-tertiary/20"
                
                block
              >
                Continue with Google
              </Button>

              {/* Continue with X (Twitter) */}
              <Button
                type="default"
                onClick={handleTwitterSignup}
                icon={<FaXTwitter className="scale-120" />}
                className="w-full py-4 rounded-xl font-semibold border-tertiary/20"
                block
              >
                Continue with X (Twitter)
              </Button>
            </div>

            {/* Legal Text */}
            <p className="text-sm text-tertiary/70 text-center mt-6 leading-relaxed">
              By signing up, you agree to our{" "}
              <a href="/terms" className="text-primary underline hover:opacity-80">
                Terms of Use
              </a>
              . Learn how we use your data in our{" "}
              <a
                href="/privacy"
                className="text-primary underline hover:opacity-80"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>

          {/* Bottom Indicator (iOS style) - Mobile Only */}
          <div className="h-1 w-12 bg-tertiary/30 rounded-full mx-auto mb-2 md:hidden" />
        </div>
      </div>
    </>
  );
};

export default AuthBottomSheet;
