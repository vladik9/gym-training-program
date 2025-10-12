"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dumbbell, Home, Apple, TrendingUp, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: null },
    { href: "/gym-training", label: "Gym Training", icon: Dumbbell },
    { href: "/home-training", label: "Home Training", icon: Home },
    { href: "/nutrition", label: "Nutrition", icon: Apple },
    { href: "/progress", label: "Progress", icon: TrendingUp },
    { href: "/exercises", label: "Exercises", icon: Dumbbell },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Dumbbell className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-black text-xl tracking-tight">Gym App</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Button
                  key={item.href}
                  asChild
                  variant={isActive ? "default" : "ghost"}
                  className={cn("gap-2", isActive && "bg-primary text-primary-foreground")}
                >
                  <Link href={item.href}>
                    {Icon && <Icon className="h-4 w-4" />}
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Button
                  key={item.href}
                  asChild
                  variant={isActive ? "default" : "ghost"}
                  className={cn("w-full justify-start gap-2", isActive && "bg-primary text-primary-foreground")}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href={item.href}>
                    {Icon && <Icon className="h-4 w-4" />}
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
