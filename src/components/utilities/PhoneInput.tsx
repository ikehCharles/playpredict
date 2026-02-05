"use client";

import PhoneInputWithCountry from "react-phone-number-input";
import type { Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FiPhone } from "react-icons/fi";

// Re-export useful utilities from react-phone-number-input
export {
  getCountries,
  getCountryCallingCode,
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
export { default as en } from "react-phone-number-input/locale/en";

type E164Number = string;

interface PhoneInputUIProps {
  value?: E164Number;
  onChange?: (value: E164Number | undefined) => void;
  defaultCountry?: Country;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

function PhoneInputUI({
  value,
  onChange,
  defaultCountry = "US",
  placeholder,
  className = "",
  disabled,
}: PhoneInputUIProps) {
    return (
      <>
        <style jsx global>{`
          .PhoneInput {
            display: flex;
            align-items: center;
          }
          .PhoneInputCountry {
            display: flex;
            align-items: center;
            padding: 0 12px;
            height: 45px;
            border: 1px solid rgb(var(--tertiary), 0.2);
            border-right: none;
            border-radius: 12px 0 0 12px;
            background: rgb(var(--secondary));
            cursor: pointer;
            transition: border-color 0.2s;
          }
          .PhoneInputCountry:hover {
            border-color: rgb(var(--primary), 0.6);
          }
          .PhoneInputCountry:focus-within {
            border-color: rgb(var(--primary));
            box-shadow: 0 0 0 2px rgba(var(--primary), 0.1);
          }
          .PhoneInputCountryIcon {
            width: 24px;
            height: 18px;
            border-radius: 2px;
            overflow: hidden;
          }
          .PhoneInputCountryIcon--border {
            box-shadow: none;
            background: transparent;
          }
          .PhoneInputCountrySelectArrow {
            margin-left: 6px;
            width: 8px;
            height: 8px;
            border-color: rgb(var(--tertiary), 0.5);
            opacity: 1;
          }
          .PhoneInputInput {
            flex: 1;
            height: 45px;
            padding: 0 40px 0 16px;
            border: 1px solid rgb(var(--tertiary), 0.2);
            border-radius: 0 12px 12px 0;
            background: rgb(var(--secondary));
            color: rgb(var(--tertiary));
            font-size: 15px;
            outline: none;
            transition: border-color 0.2s, box-shadow 0.2s;
          }
          .PhoneInputWrapper {
            position: relative;
            width: 100%;
          }
          .PhoneInputWrapper .PhoneInput {
            width: 100%;
          }
          .PhoneInputSuffix {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: rgb(var(--tertiary), 0.5);
            pointer-events: none;
            z-index: 1;
          }
          .PhoneInputInput::placeholder {
            color: rgb(var(--tertiary), 0.4);
          }
          .PhoneInputInput:hover {
            border-color: rgb(var(--primary), 0.6);
          }
          .PhoneInputInput:focus {
            border-color: rgb(var(--primary));
            box-shadow: 0 0 0 2px rgba(var(--primary), 0.1);
          }
          .PhoneInputCountrySelect {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
          }
        `}</style>
        <div className="PhoneInputWrapper">
          <PhoneInputWithCountry
            international
            countryCallingCodeEditable={false}
            defaultCountry={defaultCountry}
            value={value}
            onChange={(val) => onChange?.(val)}
            placeholder={placeholder}
            disabled={disabled}
            className={className}
          />
          <span className="PhoneInputSuffix">
            <FiPhone  />
          </span>
        </div>
      </>
    );
}

export default PhoneInputUI;
