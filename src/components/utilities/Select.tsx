import { cssRgbVar } from "@constants";
import { Select, SelectProps, ConfigProvider } from "antd";

// Shared filter logic that safely handles string, number and ReactNode labels/values
const defaultFilterOption: NonNullable<
  Exclude<SelectProps["showSearch"], boolean>
>["filterOption"] = (input, option) => {
  const label = option?.label as unknown;
  const value = option?.value as unknown;
  const inputLower = (input ?? "").toLowerCase();

  // Handle string label directly
  if (typeof label === "string") {
    return label.toLowerCase().includes(inputLower);
  }

  // Fallback to value (string/number/etc.)
  if (value !== undefined && value !== null) {
    const valueStr = String(value).toLowerCase();
    if (valueStr.includes(inputLower)) return true;
  }

  // Last resort: try to stringify label (may be ReactNode)
  if (label !== undefined && label !== null) {
    try {
      const labelStr =
        typeof label === "string" ? label : String(label as unknown as string);
      return labelStr.toLowerCase().includes(inputLower);
    } catch {
      return false;
    }
  }

  return false;
};

const SelectUI: React.FC<SelectProps> = (props) => {
  const { showSearch, ...restProps } = props;

  // Merge caller's showSearch with our default filterOption.
  // - If showSearch is boolean or undefined, we enable search with our filter.
  // - If it's an object, we preserve their settings but inject filterOption when missing.
  let mergedShowSearch: SelectProps["showSearch"];

  if (typeof showSearch === "object" && showSearch !== null) {
    mergedShowSearch = {
      ...showSearch,
      filterOption: showSearch.filterOption ?? defaultFilterOption,
    };
  } else if (showSearch === false) {
    mergedShowSearch = false;
  } else {
    // true or undefined → enable search with our default filter
    mergedShowSearch = {
      filterOption: defaultFilterOption,
    };
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            // Border and colors
            colorBorder: cssRgbVar("tertiary", 0.1),
            colorPrimaryHover: cssRgbVar("primary"),
            colorPrimary: cssRgbVar("primary"),

            // Background
            colorBgContainer: cssRgbVar("secondary"),
            colorBgElevated: cssRgbVar("secondary"),

            // Text
            colorText: cssRgbVar("tertiary"),
            colorTextPlaceholder: cssRgbVar("tertiary", 0.4),

            // Size
            controlHeight: 42,
            borderRadius: 12,

            // Dropdown
            optionActiveBg: cssRgbVar("primary", 0.1),
            optionSelectedBg: cssRgbVar("primary", 0.15),

            // Focus state
            colorPrimaryBorder: cssRgbVar("primary"),
            controlOutline: cssRgbVar("primary", 0.1),
          },
        },
      }}
    >
      <Select {...restProps} showSearch={mergedShowSearch} />
    </ConfigProvider>
  );
};

export default SelectUI;
