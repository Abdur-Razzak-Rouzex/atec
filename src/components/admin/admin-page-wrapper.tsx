"use client";

import useBreakpoint from "@/hooks/use-breakpoints";
import { useSideBarToggle } from "@/hooks/use-sidebar-toogle";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface AdminPageWrapperPropType {
  children: React.ReactNode;
}

const AdminPageWrapper = ({ children }: AdminPageWrapperPropType) => {
  const { toggleCollapse, invokeToggleCollapse } = useSideBarToggle();
  const breakpoints = useBreakpoint();
  const bodyRef = useRef<any>(null);

  const sidebarToggle = () => {
    invokeToggleCollapse();
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        bodyRef.current &&
        !bodyRef.current.contains(event.target) &&
        !toggleCollapse &&
        breakpoints == "small"
      ) {
        sidebarToggle();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [toggleCollapse, breakpoints]);

  return (
    <div
      className={cn(
        "bg-background flex flex-col mt-16 py-4 p-4 h-full overflow-y-auto",
        {
          "sm:pl-[16rem]": !toggleCollapse,
          "sm:pl-[6.4rem]": toggleCollapse,
        }
      )}
      ref={bodyRef}
    >
      {children}
    </div>
  );
};

export default AdminPageWrapper;
