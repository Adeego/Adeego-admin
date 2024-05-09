import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { HiMiniUsers } from "react-icons/hi2";
import { MdDeliveryDining } from "react-icons/md";
import logo from "../../Assets/icon.png";

// Icons
import { UserRound, LogOut, Bell, PanelLeft } from "lucide-react";

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
import MobileSidebar from "./comps/MobileSidebar";

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
        <div className="relative">
          <MobileSidebar />
        </div>
        <div></div>
        <div className="relative">
          <ProfileMenu />
        </div>
      </nav>

      {/* Sidebar */}
      <div className="p-2 h-screen bg-LightGrey fixed top-0 left-0 hidden">
        <div className="p-2 flex flex-col items-center h-full w-32 bg-white shadow-lg rounded-2xl ">
          <div className="h-36 bg-white">
            <img
              src={logo}
              alt="Adeego"
              className="w-28 h-28 text-DeepGreen bg-DeepGreen rounded-2xl"
            />
          </div>
          <div className="flex flex-col bg-white text-sm font-extrabold mb-7">
            <Link
              className={`p-2 no-underline flex flex-row items-center mb-3
                    ${
                      pathname === "/"
                        ? "bg-DeepGreen text-LightGrey rounded-lg h-6"
                        : "text-DarkGrey h-6 hover:bg-LightGrey rounded-lg"
                    }`}
              to={"/"}
            >
              <AiFillHome className="" />
              <h3 className=" ml-1">Home</h3>
            </Link>
            <Link
              className={`p-2 no-underline flex flex-row items-center mb-3
                    ${
                      pathname === "/products"
                        ? "bg-DeepGreen text-LightGrey rounded-lg h-6"
                        : "text-DarkGrey h-6 hover:bg-LightGrey rounded-lg"
                    }`}
              to={"/products"}
            >
              <RiShoppingBag2Fill />
              <h3 className=" ml-1">Products</h3>
            </Link>
            <Link
              className={`p-2 no-underline flex flex-row items-center mb-3
                    ${
                      pathname === "/orders"
                        ? "bg-DeepGreen text-LightGrey rounded-lg h-6"
                        : "text-DarkGrey h-6 hover:bg-LightGrey rounded-lg"
                    }`}
              to={"/orders"}
            >
              <MdDeliveryDining />
              <h3 className=" ml-1">Orders</h3>
            </Link>
            <Link
              className={`p-2 no-underline flex flex-row items-center mb-80
                    ${
                      pathname === "/customers"
                        ? "bg-DeepGreen text-LightGrey rounded-lg h-6"
                        : "text-DarkGrey h-6 hover:bg-LightGrey rounded-lg"
                    }`}
              to={"/customers"}
            >
              <HiMiniUsers />
              <h3 className=" ml-1">Customers</h3>
            </Link>
            <Link
              className={`p-2 no-underline flex flex-row items-center
                    ${
                      pathname === "/logout"
                        ? "bg-DeepGreen text-LightGrey rounded-lg h-6"
                        : "text-DarkGrey h-6 hover:bg-LightGrey rounded-lg"
                    }`}
              to={"/logout"}
            >
              <HiMiniUsers />
              <h3 className=" ml-1">Logout</h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
