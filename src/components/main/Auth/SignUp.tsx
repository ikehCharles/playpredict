"use client";

import { useState } from "react";
import { Form } from "antd";
import { Input, InputPassword, Select, Button } from "@utilities";
import { IoPersonOutline, IoAtCircleOutline, IoMailOutline, IoCheckmarkCircle } from "react-icons/io5";
import * as yup from "yup";

interface SignUpFormValues {
  displayName: string;
  username: string;
  email: string;
  password: string;
  retypePassword: string;
  country: string;
}

interface SignUpProps {
  onSuccess?: () => void;
}

// Yup validation schema
const signUpSchema = yup.object().shape({
  displayName: yup
    .string()
    .required("Display name is required")
    .min(3, "Display name must be at least 3 characters"),
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must contain at least 8 characters")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/[a-z]/, "Password must contain a lowercase letter")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain a symbol"),
  retypePassword: yup
    .string()
    .required("Please retype your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
  country: yup.string().required("Please select your country"),
});

// Password requirement checker
const PasswordRequirements: React.FC<{ password: string }> = ({ password }) => {
  const requirements = [
    { text: "Password must contain 8 characters", valid: password.length >= 8 },
    { text: "Password must contain an upper case letter", valid: /[A-Z]/.test(password) },
    { text: "Password must contain a lower case letter", valid: /[a-z]/.test(password) },
    { text: "Password must contain a symbol", valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  return (
    <div className="space-y-2 mt-2">
      {requirements.map((req, index) => (
        <div key={index} className="flex items-center gap-2">
          <IoCheckmarkCircle
            className={`w-4 h-4 ${req.valid ? "text-green-500" : "text-tertiary/20"}`}
          />
          <span
            className={`text-sm ${req.valid ? "text-green-500" : "text-tertiary/70"}`}
          >
            {req.text}
          </span>
        </div>
      ))}
    </div>
  );
};

const SignUp: React.FC<SignUpProps> = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [password, setPassword] = useState("");

  const countries = [
    { label: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", value: "england" },
    { label: "🇺🇸 United States", value: "usa" },
    { label: "🇳🇬 Nigeria", value: "nigeria" },
    { label: "🇬🇭 Ghana", value: "ghana" },
    { label: "🇿🇦 South Africa", value: "south-africa" },
  ];

  const handleSubmit = async (values: SignUpFormValues) => {
    try {
      // Validate with yup
      await signUpSchema.validate(values, { abortEarly: false });
      
      console.log("Sign up values:", values);
      // TODO: Implement actual sign up logic
      
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
        {/* Display Name */}
        <Form.Item
          label={<span className="text-tertiary font-medium">Display Name</span>}
          name="displayName"
          rules={[{ required: true, message: "Display name is required" }]}
        >
          <Input
            placeholder="Enter your display name"
            suffix={<IoPersonOutline className="text-tertiary/40" />}
          />
        </Form.Item>

        {/* Username */}
        <Form.Item
          label={<span className="text-tertiary font-medium">Username</span>}
          name="username"
          rules={[{ required: true, message: "Username is required" }]}
        >
          <Input
            placeholder="Enter your username"
            suffix={<IoAtCircleOutline className="text-tertiary/40" />}
          />
        </Form.Item>

        {/* Email */}
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

        {/* Password */}
        <Form.Item
          label={<span className="text-tertiary font-medium">Password</span>}
          name="password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <InputPassword
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        {/* Password Requirements */}
        {password && <PasswordRequirements password={password} />}

        {/* Retype Password */}
        <Form.Item
          label={<span className="text-tertiary font-medium">Retype Password</span>}
          name="retypePassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please retype your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        >
          <InputPassword placeholder="Retype your password" />
        </Form.Item>

        {/* Country */}
        <Form.Item
          label={<span className="text-tertiary font-medium">Country</span>}
          name="country"
          rules={[{ required: true, message: "Please select your country" }]}
        >
          <Select
            placeholder="Select your country"
            options={countries}
            showSearch
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full" block>
            Continue
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
