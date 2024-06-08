import { User } from "@/types";

export async function getUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.org/users");
  const data = await res.json();
  return data;
}