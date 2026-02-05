"use client";

import { useState } from "react";
import { Button, Switch } from "@utilities";
import Link from "next/link";
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
import { IoReturnUpBack } from "react-icons/io5";

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

export default function SettingsList() {
  const [darkMode, setDarkMode] = useState(false);

  return (
      <div className="text-sm max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 space-y-6">
        {/* Settings & Preferences */}
        <section>
          <h2 className="text-sm font-semibold text-tertiary/70  tracking-wide mb-3 flex items-center gap-4">
            Settings & Preferences
          </h2>
          <div className="space-y-2">
            {settingsPreferencesRows.map((row) => (
              <Link
                key={row.key}
                href="#"
                className="flex items-center gap-3 p-2 rounded-xl bg-secondary hover:bg-tertiary/10 transition-colors"
              >
                {(() => {
                  const Icon = iconMap[row.icon];
                  return Icon ? (
                    <Button
                      size="small"
                      type="default"
                      icon={<Icon />}
                      // onClick={onNotificationClick}
                      aria-label={row.label}
                    />
                    
                  ) : null;
                })()}
                <span className="flex-1 text-tertiary font-medium">{row.label}</span>
                {row.value && <span className="text-sm text-tertiary/60">{row.value}</span>}
                {row.flag && <span className="text-lg">{row.flag}</span>}
                <HiOutlineChevronRight className="w-5 h-5 text-tertiary/40" />
              </Link>
            ))}
            {/* Dark mode row with toggle */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary">
              
              <Button
                      size="small"
                      type="default"
                      icon={<HiOutlineMoon />}
                      // onClick={onNotificationClick}
                      aria-label={"Dark mode"}
                    />
              <span className="flex-1 text-tertiary font-medium">Dark mode</span>
              <Switch size="small" checked={darkMode} onChange={setDarkMode} />
            </div>
          </div>
        </section>

        {/* Support */}
        <section>
          <h2 className="font-semibold text-tertiary/70  tracking-wide mb-3">Support</h2>
          <div className="space-y-2">
            {supportRows.map((row) => (
              <Link
                key={row.key}
                href="#"
                className="flex items-center gap-3 p-3 rounded-xl bg-secondary hover:bg-tertiary/10 transition-colors"
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
          className="flex items-center gap-3 p-3 rounded-xl bg-secondary hover:bg-tertiary/10 transition-colors text-red-500"
        >
          <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
          <span className="flex-1 font-medium">Log Out</span>
          <HiOutlineChevronRight className="w-5 h-5 text-tertiary/40" />
        </Link>

        {/* Delete Account */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-error font-semibold hover:bg-error/90 transition-colors"
        >
          <HiOutlineTrash className="w-5 h-5" />
          Delete Account
        </button>
      </div>
  );
}
