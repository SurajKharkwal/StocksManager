"use client"
import { SignUp } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export default function Page() {
  const { theme } = useTheme();
  if (theme === "dark") {
    return <SignUp appearance={{ baseTheme: dark }} />;
  } else return <SignUp />;
}
