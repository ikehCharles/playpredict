import { IoHome, IoTrophy, IoBookmark, IoPerson } from "react-icons/io5";
import { IconType } from "react-icons";

export interface NavItem {
  name: string;
  href: string;
  icon: IconType;
}

export const navItems: NavItem[] = [
  {
    name: "Home",
    href: "/",
    icon: IoHome,
  },
  {
    name: "Rankings",
    href: "/rankings",
    icon: IoTrophy,
  },
  {
    name: "Saved",
    href: "/saved",
    icon: IoBookmark,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: IoPerson,
  },
];
