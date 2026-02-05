"use client";

import { useState } from "react";
import { Input, Select, Form } from "antd";
import { Button } from "@utilities";
import { currentUserProfile } from "@constants";
import { HiOutlineUser, HiOutlineEnvelope, HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { MdCheckCircle, MdCancel } from "react-icons/md";

const { TextArea } = Input;

type UsernameStatus = "idle" | "checking" | "available" | "taken";
type PhoneVerifiedStatus = "verified" | "unverified";

export default function EditProfileForm() {
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>("idle");
  const [usernameValue, setUsernameValue] = useState(currentUserProfile.username);
  const [phoneVerified, setPhoneVerified] = useState<PhoneVerifiedStatus>(
    currentUserProfile.phoneVerified ? "verified" : "unverified"
  );
  const [form] = Form.useForm();

  const handleUsernameBlur = () => {
    if (!usernameValue.trim()) return;
    setUsernameStatus("checking");
    // Simulate availability check
    setTimeout(() => {
      setUsernameStatus(usernameValue === "musoveni" ? "available" : "taken");
    }, 400);
  };

  const usernameHelp =
    usernameStatus === "taken" ? (
      <span className="text-red-500 text-sm inline-flex items-center gap-1">
        <MdCancel /> Username is taken
      </span>
    ) : usernameStatus === "available" ? (
      <span className="text-green-600 text-sm inline-flex items-center gap-1">
        <MdCheckCircle /> Username is available
      </span>
    ) : null;

  const countryOptions = [
    { value: "England", label: "England" },
    { value: "Netherlands", label: "Netherlands" },
    { value: "Nigeria", label: "Nigeria" },
  ];

  return (
    <Form
      form={form}
      layout="vertical"
      className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4"
      initialValues={{
        displayName: currentUserProfile.displayName,
        username: currentUserProfile.username,
        email: currentUserProfile.email,
        phone: "801 234 5678",
        countryCode: "+39",
        bio: currentUserProfile.bio,
        country: currentUserProfile.country,
      }}
      onFinish={(values) => console.log("Save", values)}
    >
      <Form.Item name="displayName" label="Display Name">
        <Input suffix={<HiOutlineUser className="w-5 h-5 text-tertiary/50" />} placeholder="John Wayne" />
      </Form.Item>

      <Form.Item
        name="username"
        label={
          <span className="inline-flex items-center gap-1">
            Username
            <span className="text-tertiary/50 text-xs font-normal">(unique handle)</span>
          </span>
        }
        help={usernameHelp}
        validateStatus={usernameStatus === "taken" ? "error" : usernameStatus === "available" ? "success" : undefined}
      >
        <Input
          suffix={<span className="text-tertiary/50">@</span>}
          value={usernameValue}
          onChange={(e) => {
            setUsernameValue(e.target.value);
            setUsernameStatus("idle");
          }}
          onBlur={handleUsernameBlur}
          placeholder="musoveni"
        />
      </Form.Item>

      <Form.Item name="email" label="Email Address">
        <Input
          suffix={<HiOutlineEnvelope className="w-5 h-5 text-tertiary/50" />}
          placeholder="johndoe@gmail.com"
          readOnly
        />
      </Form.Item>
      <button type="button" className="text-primary text-sm font-medium mb-4 -mt-2 hover:underline">
        Change email
      </button>

      <Form.Item label="Phone No.">
        <div className="flex gap-2">
          <Form.Item name="countryCode" noStyle>
            <Select
              style={{ width: 100 }}
              options={[{ value: "+39", label: "🇮🇹 +39" }]}
            />
          </Form.Item>
          <Form.Item name="phone" noStyle className="flex-1">
            <Input
              suffix={<HiOutlineDevicePhoneMobile className="w-5 h-5 text-tertiary/50" />}
              placeholder="801 234 5678"
              className="flex-1"
            />
          </Form.Item>
        </div>
      </Form.Item>
      {phoneVerified === "unverified" ? (
        <>
          <p className="text-red-500 text-sm inline-flex items-center gap-1 mb-2">
            <MdCancel /> Phone no. not verified
          </p>
          <button
            type="button"
            className="text-primary text-sm font-medium mb-4 hover:underline"
            onClick={() => setPhoneVerified("verified")}
          >
            Verify phone no.
          </button>
        </>
      ) : (
        <>
          <p className="text-green-600 text-sm inline-flex items-center gap-1 mb-2">
            <MdCheckCircle /> Phone no. verified
          </p>
          <button
            type="button"
            className="text-primary text-sm font-medium mb-4 hover:underline"
            onClick={() => setPhoneVerified("unverified")}
          >
            Change phone no.
          </button>
        </>
      )}

      <Form.Item
        name="bio"
        label="Bio"
        extra="160 characters max."
      >
        <TextArea
          rows={4}
          maxLength={160}
          showCount
          placeholder="Tell us about yourself..."
          className="resize-none"
        />
      </Form.Item>

      <Form.Item name="country" label="Country">
        <Select
          placeholder="Select country"
          options={countryOptions}
          suffixIcon={<span className="text-tertiary/50">⌄</span>}
        />
      </Form.Item>

      <Form.Item className="mb-0">
        <Button type="primary" htmlType="submit" block className="rounded-xl">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}
