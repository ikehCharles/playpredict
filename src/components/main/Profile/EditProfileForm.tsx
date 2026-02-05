"use client";

import { useState, useMemo } from "react";
import { Input, TextArea, Select, Button, Form, Tooltip, PhoneInput, isValidPhoneNumber, getCountries, phoneLocaleEn } from "@utilities";
import { currentUserProfile } from "@constants";
import { HiOutlineUser, HiOutlineEnvelope } from "react-icons/hi2";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import { IoInformationCircleOutline } from "react-icons/io5";
import type { Country } from "react-phone-number-input";

type UsernameStatus = "idle" | "checking" | "available" | "taken";
type PhoneVerifiedStatus = "verified" | "unverified";

export default function EditProfileForm() {
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>("idle");
  const [usernameValue, setUsernameValue] = useState(currentUserProfile.username);
  const [phoneVerified, setPhoneVerified] = useState<PhoneVerifiedStatus>(
    currentUserProfile.phoneVerified ? "verified" : "unverified"
  );
  const [phoneValue, setPhoneValue] = useState<string | undefined>();
  const [selectedCountry, setSelectedCountry] = useState<Country>("GB");
  const [form] = Form.useForm();

  const isPhoneValid = phoneValue ? isValidPhoneNumber(phoneValue) : false;

  // Generate country options from react-phone-number-input
  const countryOptions = useMemo(() => {
    return getCountries().map((code) => ({
      value: code,
      label: `${phoneLocaleEn[code] || code}`,
    })).sort((a, b) => a.label.localeCompare(b.label));
  }, []);

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


  return (
    <div className="max-w-7xl px-4 sm:px-6 md:px-8 pt-4 pb-1 my-4 mx-2 md:mx-auto bg-secondary rounded-xl">

    
    <Form
      form={form}
      layout="vertical"
      className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4"
      initialValues={{
        displayName: currentUserProfile.displayName,
        username: currentUserProfile.username,
        email: currentUserProfile.email,
        bio: currentUserProfile.bio,
        country: "GB",
      }}
      onFinish={(values) => console.log("Save", values)}
    >
      <Form.Item name="displayName" label="Display Name">
        <Input suffix={<HiOutlineUser className="w-5 h-5 " />} placeholder="John Wayne" />
      </Form.Item>

      <Form.Item
        name="username"
        label={
          <span className="inline-flex items-center gap-1">
            Username
            <Tooltip title="Must be unique">
              <IoInformationCircleOutline  />
            </Tooltip>
          </span>
        }
        help={usernameHelp}
        validateStatus={usernameStatus === "taken" ? "error" : usernameStatus === "available" ? "success" : undefined}
      >
        <Input
          suffix={<span className="">@</span>}
          value={usernameValue}
          onChange={(e) => {
            setUsernameValue(e.target.value);
            setUsernameStatus("idle");
          }}
          onBlur={handleUsernameBlur}
          placeholder="musoveni"
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email Address"
        
        extra={
          <div className="flex justify-end mt-1 ">
            <span className="text-primary text-xs underline">
              Change email
            </span>
          </div>
        }
      >
        <Input
        disabled
          suffix={<HiOutlineEnvelope className="w-5 h-5" />}
          placeholder="johndoe@gmail.com"
          readOnly
        />
      </Form.Item>

      <Form.Item name="country" label="Country">
        <Select
          showSearch
          placeholder="Select country"
          options={countryOptions}
          onChange={(val: Country) => {
            setSelectedCountry(val);
            setPhoneValue(undefined);
          }}
        />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone No."
        extra={
          isPhoneValid ? (
            <div className="flex items-center justify-between mt-2">
              {phoneVerified === "unverified" ? (
                <span className="text-red-500 text-xs inline-flex items-center gap-1">
                  <MdCancel /> Phone no. not verified
                </span>
              ) : (
                <span className="text-green-600 text-xs inline-flex items-center gap-1">
                  <MdCheckCircle /> Phone no. verified
                </span>
              )}
              <button
                type="button"
                className="text-primary text-xs underline"
                onClick={() => setPhoneVerified(phoneVerified === "verified" ? "unverified" : "verified")}
              >
                {phoneVerified === "unverified" ? "Verify phone no." : "Change phone no."}
              </button>
            </div>
          ) : null
        }
      >
        <PhoneInput
          key={selectedCountry}
          defaultCountry={selectedCountry}
          placeholder="Enter phone number"
          value={phoneValue}
          onChange={(val) => setPhoneValue(val)}
        />
      </Form.Item>

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

      <Form.Item className="mb-0">
        <Button type="primary" htmlType="submit" block className="rounded-xl">
          Save
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
}
