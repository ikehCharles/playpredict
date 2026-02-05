"use client";

import { Button } from "@utilities";
import { FaEnvelopeOpenText } from "react-icons/fa6";
import { IoCheckmarkCircle } from "react-icons/io5";

interface EmailVerifiedProps {
  onComplete?: () => void;
}

const EmailVerified: React.FC<EmailVerifiedProps> = ({ onComplete }) => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Verification Icon */}
      <div className="relative mb-6">
        {/* Outer purple ring */}
        <div className="w-30 h-30 border border-primary rounded-full bg-secondary/20 flex items-center justify-center">
          {/* Inner purple circle */}
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
            {/* Envelope with checkmark icon */}
            <FaEnvelopeOpenText className="w-12 h-12 text-primary" />
          </div>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-tertiary mb-3 text-center">
        Email Address Verified
      </h1>

      {/* Confirmation Message */}
      <p className="text-tertiary/70 text-base mb-8 text-center">
        Thanks! Your email has been successfully verified.
      </p>

      {/* Complete Account Setup Button */}
      <Button type="primary" onClick={onComplete} className="w-full" block>
        Complete Account Setup
      </Button>
    </div>
  );
};

export default EmailVerified;
