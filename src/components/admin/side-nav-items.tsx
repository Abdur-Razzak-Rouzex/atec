import { SideNavItemGroup } from "@/types";
import {
  BsEnvelope,
  BsGear,
  BsHouseDoor,
  BsKanban,
  BsListUl,
  BsQuestionCircle,
} from "react-icons/bs";

export const SIDENAV_ITEMS: SideNavItemGroup[] = [
  {
    title: "Dashboard",
    menuList: [
      {
        title: "Overview",
        path: "/dashboard",
        icon: <BsHouseDoor size={20} />,
      },
    ],
  },
  {
    title: "Manage",
    menuList: [
      {
        title: "Device",
        path: "/dashboard/device",
        icon: <BsKanban size={20} />,
        submenu: true,
        subMenuItems: [
          { title: "All", path: "/dashboard/products" },
          { title: "New", path: "/dashboard/products/new" },
        ],
      },
      {
        title: "Certificate",
        path: "/dashboard/certificates",
        icon: <BsListUl size={20} />,
      },
      {
        title: "OTA",
        path: "/dashboard/ota",
        icon: <BsEnvelope size={20} />,
      },
    ],
  },
  {
    title: "Others",
    menuList: [
      {
        title: "Account",
        path: "/dashboard/account",
        icon: <BsGear size={20} />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <BsQuestionCircle size={20} />,
      },
      {
        title: "Posts",
        path: "/dashboard/post",
        icon: <BsQuestionCircle size={20} />,
      },

      {
        title: "Users",
        path: "/dashboard/user",
        icon: <BsQuestionCircle size={20} />,
      },
    ],
  },
];
