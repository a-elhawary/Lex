"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Cases", href: "/cases" },
    { label: "Tasks", href: "/tasks" },
    { label: "Clients", href: "/clients" },
    { label: "Teams", href: "/teams" },
    { label: "Calendar", href: "/calendar" },
    { label: "Documents", href: "/documents" },
    { label: "Billing", href: "/billing" },
  ];

  const NavContent = () => (
    <nav className="space-y-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link 
            key={item.href}
            href={item.href}
            className={`block p-3 rounded-lg text-sm font-medium transition-colors ${
              isActive 
                ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            }`}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-sidebar border-b border-sidebar-border p-4 flex items-center justify-between z-50">
        <h1 className="text-xl font-bold text-sidebar-foreground">Legal Practice</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-sidebar-accent"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-sidebar z-40 pt-16">
          <div className="p-4">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-sidebar-foreground">Legal Practice</h1>
              <p className="text-sm text-sidebar-foreground/70">Management System</p>
            </div>
            <NavContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-sidebar border-r border-sidebar-border p-4 min-h-screen">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-sidebar-foreground">Legal Practice</h1>
          <p className="text-sm text-sidebar-foreground/70">Management System</p>
        </div>
        <NavContent />
      </aside>
    </>
  );
};

export default Sidebar;
