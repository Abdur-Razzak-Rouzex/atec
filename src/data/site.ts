import { type NavItem, type NavItemFooter } from "@/types";

export const siteConfig = {
  /* name: "ATEC-Website", */
  description:
    "Manages the data and events for Association of Tangail Ex-Cadets",
  url: "https://rouzex.com",
  author: "rouzex",
  keywords: [
    "ATEC",
    "atec",
    "Tangail Ex-Cadets",
    "Association of Tangail Ex-Cadets",
    "Tangail Ex-Cadets Association",
  ],
  navItems: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About ATEC",
      href: "/about",
    },
    {
      title: "Gallery",
      href: "/gallery",
    },
    {
      title: "Events",
      href: "/events",
    },
  ] satisfies NavItem[],
};
