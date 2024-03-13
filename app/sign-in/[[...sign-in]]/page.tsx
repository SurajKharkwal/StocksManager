"use client";
import { SignIn } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export default function Page() {
  const { theme } = useTheme();
  if (theme === "dark")
    return (
      <div className="w-screen h-[100dvh] flex items-center justify-center">
        <SignIn appearance={{ baseTheme: dark }} />
      </div>
    );
  else
    return (
      <div className="w-screen h-[100dvh] flex items-center justify-center">
        <SignIn />
      </div>
    );
}
