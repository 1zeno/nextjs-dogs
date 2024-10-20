"use client";
import { useUser } from "@/context/UserContext";

export default function Home() {
  const context = useUser()
  console.log("USER:",context.user)
  return (
    <main>
      <h1>Home</h1>
    </main>
  );
}
