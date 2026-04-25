"use client";
import { useEffect } from "react";
import Perkenalan from "@/components/Perkenalan";
import ProjectIT from "@/components/ProjectIT";
import InteractiveCube from "@/components/InteractiveCube";
import FloatingNavbar from "@/components/FloatingNavbar";

export default function Home() {
  useEffect(() => {
    // Check local storage
    const savedTheme = localStorage.getItem("theme");
    // Default to dark mode automatically
    if (savedTheme !== "light") {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  return (
    <main>
      <FloatingNavbar />
      <Perkenalan />
      <ProjectIT />
      <InteractiveCube />
    </main>
  );
}
