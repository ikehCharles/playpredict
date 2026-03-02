"use client";

import { IoMdClose } from "react-icons/io";

interface RightDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function RightDrawer({
  isOpen,
  onClose,
  title,
  children,
}: RightDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-80 bg-tertiary/35 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="fixed top-0 right-0 bottom-0 z-90 w-full max-w-md bg-background shadow-2xl animate-slide-in-right overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-tertiary/10 px-5 py-4 sticky top-0 bg-secondary z-10">
          <h3 className="text-lg font-bold text-tertiary">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-sm text-error rounded-full px-3 py-1.5 hover:bg-error/5 transition-colors"
          >
            <IoMdClose className="h-5 w-5" />
            Close
          </button>
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </>
  );
}
