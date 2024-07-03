import Sidenav from "@/components/layout/sidenav";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { pb } from "@/pb/main";
import { Navigate, Outlet, redirect } from "react-router-dom";
import "../index.css"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Layout() {

  const [theme, setTheme] = useState("orange")

  useEffect(() => {
    // import(`../themes/${theme}.css`)
  }, [theme])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme-tauri" >
      <CommandPalette />
      <Toaster />
      {pb.authStore.isValid ? (
        <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
          <Sidenav />
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-[10%]">
            <Outlet />
          </div>
        </div>) : (<Navigate to={"/auth"} />)}
    </ThemeProvider>
  );
}

