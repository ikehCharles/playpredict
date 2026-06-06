"use client";

import { Form } from "antd";
import { Input, Button } from "@playpredict/ui";
import { IoLockClosedOutline } from "react-icons/io5";
import * as yup from "yup";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ApiError, useVerifyOtp, authApi } from "@api";
import { useAuthStore } from "@stores";

interface VerifyEmailProps {
  email: string;
  onBack?: () => void;
  onVerify?: () => void;
}

const otpSchema = yup.object().shape({
  otp: yup
    .string()
    .required("OTP is required")
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .matches(/^\d+$/, "OTP must contain only numbers"),
});

const VerifyEmail: React.FC<VerifyEmailProps> = ({ email, onBack, onVerify }) => {
  const [form] = Form.useForm();
  const verifyOtp = useVerifyOtp();
  const setAuth = useAuthStore((s) => s.setAuth);

  const handleSubmit = async (values: { otp: string }) => {
    try {
      await otpSchema.validate(values, { abortEarly: false });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) errors[err.path] = err.message;
        });
        form.setFields(
          Object.keys(errors).map((key) => ({
            name: key,
            errors: [errors[key]],
          })),
        );
      }
      return;
    }

    verifyOtp.mutate(
      { email, code: values.otp },
      {
        onSuccess: async (result) => {
          const token = result.accessToken ?? result.token;
          if (!token) {
            form.setFields([
              { name: "otp", errors: ["No access token returned by server"] },
            ]);
            return;
          }
          setAuth({ token, user: result.user ?? null });

          if (!result.user) {
            try {
              const profile = await authApi.getMyProfile();
              useAuthStore.getState().setUser(profile);
            } catch {
              // Non-fatal; user is still authenticated.
            }
          }

          onVerify?.();
        },
        onError: () => {
          
          onVerify?.()
        }
      },
    );
  };

  const submitError =
    verifyOtp.error instanceof ApiError ? verifyOtp.error.message : null;

  return (
    <div className="w-full">
      {onBack && (
        <FaArrowLeftLong
          onClick={onBack}
          className="text-primary/80 text-xl mb-4 p-0 h-auto cursor-pointer"
        />
      )}

      <h1 className="text-2xl md:text-3xl font-bold text-tertiary mb-3">
        Verify Your Email Address
      </h1>

      <p className="text-tertiary/70 text-base mb-6">
        Enter the one-time code we sent to{" "}
        <span className="font-medium text-tertiary">{email}</span>, or use the sign-in link in your email.
      </p>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
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

        {submitError && (
          <div className="mb-4 rounded-lg bg-error/10 border border-error/20 px-3 py-2 text-sm text-error">
            {submitError}
          </div>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            block
            loading={verifyOtp.isPending}
          >
            Verify Code
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VerifyEmail;
