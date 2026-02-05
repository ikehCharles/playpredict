"use client";

import { Form } from "antd";
import { Input, Button } from "@utilities";
import { IoLockClosedOutline } from "react-icons/io5";
import * as yup from "yup";
import { FaArrowLeftLong } from "react-icons/fa6";

interface VerifyEmailProps {
  email: string;
  onBack?: () => void;
  onVerify?: (otp: string) => void;
}

// Yup validation schema
const otpSchema = yup.object().shape({
  otp: yup
    .string()
    .required("OTP is required")
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .matches(/^\d+$/, "OTP must contain only numbers"),
});

const VerifyEmail: React.FC<VerifyEmailProps> = ({ email: _email, onBack, onVerify }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: { otp: string }) => {
    try {
      await otpSchema.validate(values, { abortEarly: false });
      onVerify?.(values.otp);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path] = err.message;
          }
        });
        form.setFields(
          Object.keys(errors).map((key) => ({
            name: key,
            errors: [errors[key]],
          }))
        );
      }
    }
  };

  return (
    <div className="w-full">
      {/* Back Button */}
      {onBack && (
        
        
<FaArrowLeftLong onClick={onBack} className="text-primary/80 text-xl mb-4 p-0 h-auto" />
      )}

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-tertiary mb-3">
        Verify Your Email Address
      </h1>

      {/* Instructions */}
      <p className="text-tertiary/70 text-base mb-6">
        Enter the one-time code we sent you, or use the sign-in link in your email.
      </p>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        {/* OTP Input */}
        <Form.Item
          label={<span className="text-tertiary font-medium">Enter OTP</span>}
          name="otp"
          rules={[
            { required: true, message: "OTP is required" },
            { pattern: /^\d{6}$/, message: "OTP must be 6 digits" },
          ]}
        >
          <Input
            placeholder="Enter OTP"
            maxLength={6}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            suffix={<IoLockClosedOutline className="text-tertiary/40" />}
          />
        </Form.Item>

        {/* Verify Code Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full" block>
            Verify Code
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VerifyEmail;
