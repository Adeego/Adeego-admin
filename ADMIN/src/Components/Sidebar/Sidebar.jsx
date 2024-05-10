import React, { Fragment } from "react";
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
  ChevronRight,
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

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import MobileSidebar from "./comps/MobileSidebar";

// COMPONENTS;

const links = [
  {
    label: "Dashboard",
    icon: (
      <Home className="md:h-4 md:w-4 lg:h-[18px] lg:w-[18px]" strokeWidth={2} />
    ),
    pageLink: "/dashboard",
  },
  {
    label: "Products",
    icon: (
      <ShoppingBag
        className="md:h-4 md:w-4 lg:h-[18px] lg:w-[18px]"
        strokeWidth={2}
      />
    ),
    pageLink: "/products",
  },
  {
    label: "Orders",
    icon: (
      <ShoppingCart
        className="md:h-4 md:w-4 lg:h-[18px] lg:w-[18px]"
        strokeWidth={2}
      />
    ),
    pageLink: "/orders",
  },
  {
    label: "Agents",
    icon: (
      <UsersRound className="md:h-4 md:w-4 lg:h-5 lg:w-5" strokeWidth={2} />
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
          className="rounded-full border-neutral-100 md:border-neutral-300/60 text-neutral-500"
        >
          <UserRound className="h-4 w-4 md:h-5 md:w-5" />
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

const BreadcrumbComp = () => {
  const { pathname } = useLocation();
  const pathItems = pathname.split("/").filter((path) => path !== "");
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            className="text-sm text-neutral-600 hover:text-black transition"
            href="/"
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="stroke-neutral-500" size={12} />
        </BreadcrumbSeparator>
        {pathItems.map((pathItem, i) => {
          const isLastItem = i === pathItems.length - 1;
          return (
            <Fragment key={i}>
              <BreadcrumbItem>
                {isLastItem ? (
                  <BreadcrumbPage className="capitalize">
                    {pathItem}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink className="text-sm text-neutral-600 hover:text-black transition capitalize">
                    {pathItem}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLastItem && (
                <BreadcrumbSeparator>
                  <ChevronRight className="stroke-neutral-500" size={12} />
                </BreadcrumbSeparator>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
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
      <nav className="w-full h-14 border border-neutral-200 flex items-center justify-between p-2 fixed top-0 left-0 pl-20 lg:pl-[200px] xl:pl-60 md:border-b bg-white z-20">
        {/* breadcrumbs */}
        <div className="hidden md:block">
          <BreadcrumbComp />
        </div>
        {/* mobile sidebar */}
        <div className="relative md:hidden">
          <MobileSidebar />
        </div>
        <div></div>
        <div className="relative">
          <ProfileMenu />
        </div>
      </nav>

      <div className="w-14 lg:w-44 xl:w-52 h-screen b-black shrink-0 relative z-20 hidden md:flex">
        <div className="md:flex md:flex-col items-center lg:items-start border-r border-neutral-200 p-3   gap-10 bg-white h-screen fixed  w-14 lg:w-44 xl:w-52 top-0 left-0">
          <div>
            <div className="rounded-[0.3rem] overflow-hidden h-9 aspect-square">
              <img src={logo} alt="" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="flex flex-col gap-4 md:gap-2 w-full">
            {links.map((link, i) => {
              return (
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link className="!cursor-pointer" to={link.pageLink}>
                        <div className="h-10 md:h-9 aspect-square lg:aspect-auto grid place-items-center lg:flex items-center gap-2 lg:gap-3 hover:bg-neutral-200/50 w-full px-2 rounded-[0.3rem] transition group/link">
                          <div
                            className={`${
                              pathname === link.pageLink
                                ? "text-black"
                                : "text-neutral-400 lg:text-neutral-500"
                            } group-hover/link:text-neutral-700 transition`}
                          >
                            {link.icon}
                          </div>
                          <div
                            className={`${
                              pathname === link.pageLink
                                ? "text-black"
                                : "text-neutral-400 lg:text-neutral-500"
                            } group-hover/link:text-neutral-700 transition hidden lg:block`}
                          >
                            {link.label}
                          </div>
                        </div>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="bg-white rounded-[0.3rem] text-xs lg:hidden"
                    >
                      <p>{link.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </div>
        {/* logo */}
      </div>
    </>
  );
};

export default Sidebar;
