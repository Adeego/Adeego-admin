import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import logo from "../../../Assets/icon.png";

const links = [
  {
    label: "Dashboard",
    icon: <Home size={20} strokeWidth={2} />,
    pageLink: "/dashboard",
  },
  {
    label: "Products",
    icon: <ShoppingBag size={20} strokeWidth={2} />,
    pageLink: "/products",
  },
  {
    label: "Orders",
    icon: <ShoppingCart size={20} strokeWidth={2} />,
    pageLink: "/orders",
  },
  {
    label: "Agents",
    icon: <UsersRound size={20} strokeWidth={2} />,
    pageLink: "/agents",
  },
];

import {
  Home,
  PanelLeft,
  ShoppingBag,
  ShoppingCart,
  UsersRound,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MobileSidebar = () => {
  const { pathname } = useLocation();

  return (
    <Sheet>
      <SheetTrigger>
        {" "}
        <Button
          variant="outline"
          size="icon"
          className="rounded-[0.5rem] border-neutral-200 text-neutral-500"
        >
          <PanelLeft size={15} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-white text-left gap-10 flex flex-col w-[80%] max-w-sm"
      >
        <SheetHeader>
          <div className="h-16 bg-white">
            <img
              src={logo}
              alt="Adeego"
              className="h-full text-DeepGreen bg-DeepGreen rounded-2xl"
            />
          </div>
        </SheetHeader>
        <div className="w-full flex flex-col">
          {links.map((link, i) => {
            return (
              <SheetClose asChild>
                <Link to={link.pageLink}>
                  <div
                    className={`flex gap-4 items-center py-3 active:bg-neutral-100 rounded-xl px-2 ${
                      pathname === link.pageLink
                        ? "text-neutral-800"
                        : "text-neutral-500"
                    } `}
                  >
                    <div>{link.icon}</div>
                    <p className="text-lg ">{link.label}</p>
                  </div>
                </Link>
              </SheetClose>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
