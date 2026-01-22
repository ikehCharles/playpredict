"use client";

import { Form } from "antd";
import { Input, InputPassword, Button } from "@utilities";
import { IoPersonOutline } from "react-icons/io5";
import * as yup from "yup";

interface SignInFormValues {
  emailOrUsername: string;
  password: string;
}

interface SignInProps {
  onSuccess?: () => void;
}

// Yup validation schema
const signInSchema = yup.object().shape({
  emailOrUsername: yup
    .string()
    .required("Email or username is required")
    .min(3, "Must be at least 3 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const SignIn: React.FC<SignInProps> = ({ onSuccess }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: SignInFormValues) => {
    try {
      // Validate with yup
      await signInSchema.validate(values, { abortEarly: false });
      
      console.log("Sign in values:", values);
      // TODO: Implement actual sign in logic
      
      onSuccess?.();
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
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        {/* Email or Username */}
        <Form.Item
          label={<span className="text-tertiary font-medium">Email or Username</span>}
          name="emailOrUsername"
          rules={[{ required: true, message: "Email or username is required" }]}
        >
          <Input
            placeholder="Enter your email or username"
            suffix={<IoPersonOutline className="text-tertiary/40" />}
          />
        </Form.Item>

        {/* Password */}
        <Form.Item
          label={<span className="text-tertiary font-medium">Password</span>}
          name="password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <InputPassword placeholder="Enter your password" />
        </Form.Item>

        {/* Forgot Password Link */}
        <div className="text-right mb-6">
          <a href="/forgot-password" className=" text-sm hover:opacity-80">
            <span className="text-primary">
            Forgot Password?
            </span>
          </a>
        </div>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full" block>
            Login
          </Button>
        </Form.Item>
      </Form>

      {/* Sign Up Link */}
      <div className="text-center mt-4">
        <span className="text-tertiary/70 text-sm">
          Not yet registered?{" "}
          <a href="/signup" className="text-primary hover:opacity-80">
            Sign Up
          </a>
        </span>
      </div>
    </div>
  );
};

export default SignIn;
