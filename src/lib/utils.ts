import { SessionData } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { SessionOptions } from "iron-session";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (message: string, error: unknown) => {
  console.error(message, error);
  throw new Error(typeof error === "string" ? error : JSON.stringify(error));
};

/* session */
export const defaultSession: SessionData = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET_KEY! || "CXkzxcv568123i6UV5Z/YAuoAsdf3bw1z3eqcdBjlp;[oiuPAC37WjMvmAkWY=",
  cookieName: "session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};
