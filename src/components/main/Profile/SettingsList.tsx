"use client";

import { useState } from "react";
import Link from "next/link";
import { Switch } from "antd";
import { ConfigProvider } from "antd";
import { GetCSSVariables } from "@constants";
import {
  HiOutlineLanguage,
  HiOutlineLockClosed,
  HiOutlineBell,
  HiOutlineCheckBadge,
  HiOutlineChartBar,
  HiOutlineGlobeAlt,
  HiOutlineCurrencyDollar,
  HiOutlineMoon,
  HiOutlineDocumentText,
  HiOutlineBugAnt,
  HiOutlineChevronRight,
  HiOutlineArrowRightOnRectangle,
  HiOutlineTrash,
} from "react-icons/hi2";
import { settingsPreferencesRows, supportRows } from "@constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  language: HiOutlineLanguage,
  lock: HiOutlineLockClosed,
  bell: HiOutlineBell,
  badge: HiOutlineCheckBadge,
  chart: HiOutlineChartBar,
  globe: HiOutlineGlobeAlt,
  bookies: HiOutlineCurrencyDollar,
  support: HiOutlineDocumentText,
  bug: HiOutlineBugAnt,
};

const DEFAULT_PRIMARY = "94, 23, 235";

export default function SettingsList() {
  const [darkMode, setDarkMode] = useState(false);
  const { primary } = GetCSSVariables();
  const primaryRgb = primary ? `rgb(${primary})` : `rgb(${DEFAULT_PRIMARY})`;

  return (
    <ConfigProvider
      theme={{
        components: {
          Switch: {
            colorPrimary: primaryRgb,
          },
        },
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 space-y-6">
        {/* Settings & Preferences */}
        <section>
          <h2 className="text-sm font-semibold text-tertiary/70 uppercase tracking-wide mb-3">
            Settings & Preferences
          </h2>
          <div className="space-y-2">
            {settingsPreferencesRows.map((row) => (
              <Link
                key={row.key}
                href="#"
                className="flex items-center gap-3 p-3 rounded-xl bg-tertiary/5 hover:bg-tertiary/10 transition-colors"
              >
                {(() => {
                  const Icon = iconMap[row.icon];
                  return Icon ? (
                    <span className="text-primary">
                      <Icon className="w-5 h-5" />
                    </span>
                  ) : null;
                })()}
                <span className="flex-1 text-tertiary font-medium">{row.label}</span>
                {row.value && <span className="text-sm text-tertiary/60">{row.value}</span>}
                {row.flag && <span className="text-lg">{row.flag}</span>}
                <HiOutlineChevronRight className="w-5 h-5 text-tertiary/40" />
              </Link>
            ))}
            {/* Dark mode row with toggle */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-tertiary/5">
              <span className="text-primary">
                <HiOutlineMoon className="w-5 h-5" />
              </span>
              <span className="flex-1 text-tertiary font-medium">Dark mode</span>
              <Switch checked={darkMode} onChange={setDarkMode} />
            </div>
          </div>
        </section>

        {/* Support */}
        <section>
          <h2 className="text-sm font-semibold text-tertiary/70 uppercase tracking-wide mb-3">Support</h2>
          <div className="space-y-2">
            {supportRows.map((row) => (
              <Link
                key={row.key}
                href="#"
                className="flex items-center gap-3 p-3 rounded-xl bg-tertiary/5 hover:bg-tertiary/10 transition-colors"
              >
                {row.icon === "support" ? (
                  <HiOutlineDocumentText className="w-5 h-5 text-primary" />
                ) : row.icon === "bug" ? (
                  <HiOutlineBugAnt className="w-5 h-5 text-primary" />
                ) : (
                  <HiOutlineDocumentText className="w-5 h-5 text-primary" />
                )}
                <span className="flex-1 text-tertiary font-medium">{row.label}</span>
                <HiOutlineChevronRight className="w-5 h-5 text-tertiary/40" />
              </Link>
            ))}
          </div>
        </section>

        {/* Log Out */}
        <Link
          href="/account/auth"
          className="flex items-center gap-3 p-3 rounded-xl bg-tertiary/5 hover:bg-tertiary/10 transition-colors text-red-500"
        >
          <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
          <span className="flex-1 font-medium">Log Out</span>
          <HiOutlineChevronRight className="w-5 h-5 text-tertiary/40" />
        </Link>

        {/* Delete Account */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
        >
          <HiOutlineTrash className="w-5 h-5" />
          Delete Account
        </button>
      </div>
    </ConfigProvider>
  );
}
