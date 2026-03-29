import { IoHome, IoTrophy, IoBookmark, IoPerson } from "react-icons/io5";
import { IconType } from "react-icons";

export interface NavItem {
  name: string;
  href: string;
  icon: string;
  activeIcon: string;
  srcHost?: "font" | "local";
}

export const navItems: NavItem[] = [
  {
    name: "Home",
    href: "/",
    icon: "fi fi-rr-home",
    activeIcon: "fi fi-sr-home",
  },
  {
    name: "Rankings",
    href: "/rankings",
    icon: "fi fi-rr-trophy",
    activeIcon: "fi fi-sr-trophy",
  },
  {
    name: "Saved",
    href: "/saved",
    icon: "/icons/bookmarkOutline.svg",
    activeIcon: "/icons/bookmarkFill.svg",
    srcHost: "local",
  },
  {
    name: "Profile",
    href: "/profile",
     icon: "fi fi-rs-user",
    activeIcon: "fi fi-ss-user",
  },
];
