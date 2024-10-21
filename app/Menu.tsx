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
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex flex-nowrap justify-between sm:justify-center items-center">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-white px-2 sm:px-12 py-2 sm:py-4 rounded-md text-xs sm:text-base font-medium sm:m-1 whitespace-nowrap ${
                pathname === item.path
                  ? "bg-red-900"
                  : "bg-gray-600 hover:bg-yellow-500"
              }`}
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