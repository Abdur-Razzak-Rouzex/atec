import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./button";
import { ArrowRightIcon } from "@radix-ui/react-icons";

type LinkButtonPropTypes = {
  title: string;
  size?: "default" | "sm" | "lg" | "icon";
  link?: string;
  icon?: JSX.Element;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "navbarIcon"
    | "user";
};

const LinkButton = ({
  title,
  size = "lg",
  link = "/register",
  icon = <ArrowRightIcon className="ml-3" />,
  variant = "default",
}: LinkButtonPropTypes) => {
  return (
    <div className="animate-fade-up">
      <Link
        href={link}
        className={cn(
          buttonVariants({ size: size, variant: variant }),
          "transition-all duration-1000 ease-out md:hover:-translate-y-2"
        )}
      >
        {title}
        {icon}
      </Link>
    </div>
  );
};

export default LinkButton;
