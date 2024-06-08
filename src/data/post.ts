import { Post } from "@/types";

export async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.org/posts");
  const data = await res.json();
  return data;
}
