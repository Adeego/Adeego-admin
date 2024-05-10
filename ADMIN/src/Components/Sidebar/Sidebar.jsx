import React from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "../../Assets/icon.png";

// Icons
import {
  UserRound,
  LogOut,
  Bell,
  PanelLeft,
  Home,
  ShoppingBag,
  ShoppingCart,
  UsersRound,
} from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import MobileSidebar from "./comps/MobileSidebar";

const links = [
  {
    label: "Dashboard",
    icon: <Home className="md:h-4 md:w-4 lg:h-3 lg:w-3" strokeWidth={2} />,
    pageLink: "/dashboard",
  },
  {
    label: "Products",
    icon: (
      <ShoppingBag className="md:h-4 md:w-4 lg:h-3 lg:w-3" strokeWidth={2} />
    ),
    pageLink: "/products",
  },
  {
    label: "Orders",
    icon: (
      <ShoppingCart className="md:h-4 md:w-4 lg:h-3 lg:w-3" strokeWidth={2} />
    ),
    pageLink: "/orders",
  },
  {
    label: "Agents",
    icon: (
      <UsersRound className="md:h-4 md:w-4 lg:h-3 lg:w-3" strokeWidth={2} />
    ),
    pageLink: "/agents",
  },
];

// Profile Menu;
const ProfileMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-neutral-100 text-neutral-500"
        >
          <UserRound size={15} />
        </Button>{" "}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white !right-0 mr-2 rounded-[0.5rem] w-44 p-2">
        <DropdownMenuLabel>Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="gap-2 text-neutral-700 flex justify-between">
          <small className="text-sm">User Account</small>
          <UserRound size={14} />
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2 text-neutral-700 flex justify-between">
          <small className="text-sm">Notifications</small>
          <Bell size={14} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 text-neutral-700 flex justify-between">
          <small className="text-sm">Logout</small>
          <LogOut size={14} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Sidebar = () => {
  const { pathname } = useLocation(); // Get the current pathname

  if (pathname === "/login") {
    return <div></div>;
  }

  return (
    <>
      {/* Navbar */}
      <nav className="w-full h-14 border border-neutral-100 flex items-center justify-between p-2 fixed top-0 left-0">
        <div className="relative md:hidden">
          <MobileSidebar />
        </div>
        <div></div>
        <div className="relative">
          <ProfileMenu />
        </div>
      </nav>

      <div className="w-14 h-screen b-black shrink-0 relative z-20 hidden md:flex md:flex-col items-center border-r border-neutral-200 p-3  gap-10">
        {/* logo */}
        <div>
          <div className="rounded-[0.3rem] overflow-hidden h-9 aspect-square">
            <img src={logo} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:gap-2">
          {links.map((link, i) => {
            return (
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link className="!cursor-pointer" to={link.pageLink}>
                      <div className="h-10 md:h-9 aspect-square grid place-items-center ">
                        <div
                          className={`${
                            pathname === link.pageLink
                              ? "text-black"
                              : "text-neutral-400"
                          } hover:text-neutral-700`}
                        >
                          {link.icon}
                        </div>
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="bg-white rounded-[0.3rem] text-xs"
                  >
                    <p>{link.label}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
