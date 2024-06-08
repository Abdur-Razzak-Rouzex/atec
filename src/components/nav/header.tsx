import { getSession } from "@/actions/auth.actions";
import { Icons } from "@/components/icons";
import { Navigation } from "@/components/nav/navigation";
import { NavigationMobile } from "@/components/nav/navigation-mobile";
import ThemeToggle from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import LogoutForm from "./logout-form";
import { siteConfig } from "@/data/site";

export async function Header(): Promise<JSX.Element> {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-40 flex h-20 w-full bg-transparent">
      <div className="container flex items-center justify-between p-10">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 text-lg font-bold tracking-wide transition-all duration-300 ease-in-out"
        >
          <Image
            src="/images/atec-logo.png"
            width={120}
            height={100}
            alt="atec logo"
            className="ml-4 mt-4 mb-4 "
          />
        </Link>
        <Navigation isLoggedIn={session?.isLoggedIn} />
        <div className="flex items-center justify-center">
          <ThemeToggle />
          <NavigationMobile navItems={siteConfig.navItems} />

          <nav className="space-x-1">
            {session?.isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className={cn(
                    buttonVariants({ variant: "user", size: "icon" }),
                    "transition-all duration-300 ease-in-out hover:opacity-70"
                  )}
                >
                  <Avatar className="size-9 cursor-pointer">
                    {session?.image ? (
                      <AvatarImage
                        src={session?.image}
                        alt={session?.username ?? "user's profile picture"}
                        className="size-7 rounded-full"
                      />
                    ) : (
                      <AvatarFallback className="size-9 cursor-pointer p-1.5 text-xs capitalize">
                        <Icons.user className="size-5 rounded-full" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session?.username}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/dashboard/account">
                        <Icons.avatar
                          className="mr-2 size-4"
                          aria-hidden="true"
                        />
                        Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/dashboard/settings">
                        <Icons.settings
                          className="mr-2 size-4"
                          aria-hidden="true"
                        />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <LogoutForm />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                aria-label="Get started"
                href="/login"
                className={cn(buttonVariants({ size: "sm" }), "ml-2")}
              >
                Get Started
                <span className="sr-only">Get Started</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
