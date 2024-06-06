export interface NavItemFooter {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

export interface EventType {
  id: string;
  title: string;
  date: Date;
  time: string;
  description: string;
  location: string;
  image: string;
}
export interface ExecutiveType {
  id: string;
  name: string;
  position: string;
  ccr: string;
  session: string;
  image: string;
}

export interface GalleryType {
  title: string;
  image: string;
}

export interface ImageType {
  title: string;
  image: string;
}

export interface SessionData {
  userId?: string;
  username?: string;
  email?: string;
  image?: string;
  isLoggedIn: boolean;
}

export interface SideNavItem {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
}

export type SideNavItemGroup = {
  title: string;
  menuList: SideNavItem[];
};

export interface InputType {
  email?: string;
}

export interface CollegeType {
  title: string;
  value: string;
}

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};




