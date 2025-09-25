"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Menu: React.FC = () => {
  const pathname = usePathname();
  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Me" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-white py-4 rounded-md text-xs sm:xs font-medium 
              text-center m-0.5
              ${pathname === item.path ? "bg-red-900" : "bg-gray-600 hover:bg-yellow-500"}
              w-full sm:w-auto px-4 sm:px-4`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Menu;