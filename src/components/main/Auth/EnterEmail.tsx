"use client";

import { Form } from "antd";
import { Input, Button } from "@playpredict/ui";
import { IoMailOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import * as yup from "yup";
import { useRequestOtp, authApi } from "@api";

interface EnterEmailProps {
  onNext?: (email: string) => void;
}

const emailSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address"),
});

const EnterEmail: React.FC<EnterEmailProps> = ({ onNext }) => {
  const [form] = Form.useForm();
  const requestOtp = useRequestOtp();

  const handleSubmit = async (values: { email: string }) => {
    try {
      await emailSchema.validate(values, { abortEarly: false });
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

    requestOtp.mutate(values.email, {
      onSuccess: () => onNext?.(values.email),
      onError: () => onNext?.(values.email), // Proceed to next step even if OTP request fails, allowing user to attempt verification
    });
  };

  const handleGoogleSignup = () => {
    window.location.href = authApi.googleSignInUrl;
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl md:text-3xl font-bold text-tertiary mb-3">
        Enter Your Email Address
      </h1>

      <p className="text-tertiary/70 text-base mb-6">
        A one-time code will be sent to your email alongside a sign-in link as an option.
      </p>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label={<span className="text-tertiary font-medium">Email Address</span>}
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            suffix={<IoMailOutline className="text-tertiary/40" />}
          />
        </Form.Item>

        {requestOtp.isError && (
          <div className="mb-4 rounded-lg bg-error/10 border border-error/20 px-3 py-2 text-sm text-error">
            {requestOtp.error.message}
          </div>
        )}

        <Form.Item className="mb-4">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            block
            loading={requestOtp.isPending}
          >
            Send Verification Code
          </Button>
        </Form.Item>
      </Form>

      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-tertiary/20"></div>
        <span className="text-tertiary/50 text-sm">or</span>
        <div className="flex-1 h-px bg-tertiary/20"></div>
      </div>

      <Button
        onClick={handleGoogleSignup}
        icon={<FcGoogle className="scale-120" />}
        className="w-full border-tertiary/20"
        block
      >
        Google
      </Button>

      <p className="text-sm text-tertiary/70 text-center mt-6 leading-relaxed">
        By signing up, you agree to our{" "}
        <a href="/terms" className="text-primary underline hover:opacity-80">
          Terms of Use
        </a>
        . Learn how we use your data in our{" "}
        <a href="/privacy" className="text-primary underline hover:opacity-80">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
};

export default EnterEmail;
