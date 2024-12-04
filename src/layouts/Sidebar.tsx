/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Building2,
  FileText,
  LayoutDashboard,
  Sidebar,
  Users,
} from "lucide-react";
import Img from "../assets/GrantGenie Logo.svg";
import { MdLogout, MdInfoOutline } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

import { ConfirmAlert } from "@/components/layouts/ConfirmAlert";
import { useMediaQuery } from "usehooks-ts";
import { useUser } from "@/store/authSlice";
import { dashboardPageRoutes } from "@/routes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";

type sideBarProps = {
  show: boolean;
  setShow: (value: boolean) => void;
};

type NavigationItem = {
  icon: any;
  title: string;
  to: string;
  active: boolean;
  isImage?: boolean;
};

const Icons = {
  dashboard: LayoutDashboard,
  home: LayoutDashboard,
  employees: Users,
  agencies: Building2,
  projects: FileText,
};

export const SideBar = ({ setShow, show }: sideBarProps) => {
  const user = useUser();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isActive = (link: string) => {
    // Check if the current location matches the link exactly or starts with it,
    // but not the root dashboard path when deeper routes are active
    if (link === "/dashboard/home") {
      return location.pathname === link;
    }

    if (
      location.pathname.includes("/dashboard/e-portal") &&
      link.includes("e-portal")
    ) {
      return location.pathname.startsWith("/dashboard/e-portal");
    }

    if (
      location.pathname.includes("/teacher/e-portal") &&
      link.includes("e-portal")
    ) {
      return location.pathname.startsWith("/teacher/e-portal");
    }

    return location.pathname.startsWith(link);
  };

  const renderNavigation = () => {
    return dashboardPageRoutes?.slice?.(0, 4)?.map?.((item) => {
      const title = item?.path?.split("/")?.[2] as keyof typeof Icons;
      return {
        icon: Icons?.[title],
        title:
          Object.keys(Icons).find((item) =>
            title === "home" ? "dashboard" : item === title
          ) ?? "",
        to: item?.path,
        active: isActive(item?.path),
      };
    });
  };

  const navigation: NavigationItem[] = renderNavigation();

  const mobileSidebarCss = show
    ? "translate-x-0 absolute h-full z-50 w-80"
    : "-translate-x-full h-full absolute z-50";

  const sidebarCss = show ? "translate-x-0 min-w-[16rem]" : "-translate-x-80 ";

  return (
    <aside
      className={`bg-transparent transition ease-in-out duration-500 px-5 flex flex-col h-full ${
        isMobile ? mobileSidebarCss : sidebarCss
      }`}
    >
      <div className="mt-5 mb-20">
        <div className="flex items-center justify-between px-3 font-sans">
          <div className="h-10 flex items-center gap-1">
            <img src={Img} className="w-full h-full object-contain" />
            <h4 className="font-semibold text-sm">GrantGenie</h4>
          </div>

          <div
            onClick={() => setShow(!show)}
            className="h-8 w-8 rounded-full grid place-items-center cursor-pointer"
          >
            <Sidebar className="" />
          </div>
        </div>
      </div>

      <div className="overflow-auto flex flex-col flex-1 pb-5">
        {navigation.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            title={item.title}
            to={item.to}
            active={item.active}
            isImage={item?.isImage}
          />
        ))}

        <div className="flex-1" />

        <div
          className={`flex items-center gap-3 px-3 py-2 text-gray-600 cursor-pointer`}
        >
          <SidebarItemIcon icon={MdInfoOutline} />
          <h6 className="font-medium text-sm text-gray-600">Help Center</h6>
        </div>

        <ConfirmAlert
          text="Are you sure you want to log out?"
          title="Log Out"
          logout
          url=""
          trigger={
            <div
              className={`flex items-center gap-3 px-3 py-2 mb-2 mt-2 text-gray-600`}
            >
              <SidebarItemIcon icon={MdLogout} />
              <h6 className="font-medium text-sm">Logout</h6>
            </div>
          }
        />

        <div className="flex items-center gap-3 mb-5 pl-1 border-t pt-4">
          <Avatar className="!bg-gray-300 text-primary h-9 w-9">
            <AvatarImage src="" alt="" />
            <AvatarFallback>
              <FaUser className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className=" flex cursor-pointer gap-2 items-center">
            <div>
              <p className="text-sm text-primary text-center">{`${user?.first_name} ${user?.last_name}`}</p>
            </div>
            {/* <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" /> */}
          </div>
        </div>

        <div className="h-40 bg-[#9899AD] rounded-xl shadow-md" />
      </div>
    </aside>
  );
};

type SidebarItemProps = {
  title: string;
  active: boolean;
  className?: string;
  isImage?: boolean;
  to: string;
  icon: any;
};

const SidebarItem = (props: SidebarItemProps) => {
  const Icon = props.icon;
  return (
    <Link
      to={props.to}
      className={`flex items-center gap-3 px-4 py-3 mb-4 rounded-lg transition-all duration-200 ${
        props.active
          ? "bg-[#483F6F] text-white"
          : "text-gray-600 hover:bg-sidebar-hover"
      } ${props.className ?? ""}`}
    >
      <SidebarItemIcon icon={Icon} isImage={props.isImage} />
      <h6 className="font-medium text-sm capitalize">{props.title}</h6>
    </Link>
  );
};

type SidebarItemIconProps = {
  isImage?: boolean;
  icon: any;
};

const SidebarItemIcon = (props: SidebarItemIconProps) => {
  const Icon = props?.icon;
  return (
    <div className=" rounded-md grid place-items-center">
      {props?.isImage ? (
        <img src={props.icon} className="h-5 w-5" />
      ) : (
        <Icon className="h-5 w-5" />
      )}
    </div>
  );
};
