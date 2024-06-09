import { SessionData } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { SessionOptions } from "iron-session";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// utils.ts
export const handleError = (message: string, error: unknown) => {
  console.error(message, error);
  throw new Error(typeof error === "string" ? error : JSON.stringify(error));
};

/* session */
export const defaultSession: SessionData = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET_KEY!,
  cookieName: "session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};

export const convertDocToObj = (doc: any) => {
  doc._id = doc?._id.toString();
  doc.createdAt = doc?.createdAt.toString();
  doc.updatedAt = doc?.updatedAt.toString();

  return doc;
};
