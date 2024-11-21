/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdDashboard } from "react-icons/md";
import { Building2, Sidebar } from "lucide-react";
import { RxHamburgerMenu } from "react-icons/rx";
import Img from "../assets/GrantGenie Logo.svg";
import { MdLogout } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

import { ComponentClass, ComponentProps, FunctionComponent } from "react";
import { ConfirmAlert } from "@/components/layouts/ConfirmAlert";
import { IconType } from "react-icons/lib";
import { useMediaQuery } from "usehooks-ts";
import { useUser } from "@/store/authSlice";

type sideBarProps = {
  show: boolean;
  setShow: (value: boolean) => void;
};

type NavigationItem = {
  icon: IconType;
  title: string;
  to: string;
  active: boolean;
  isImage?: boolean;
};

export const SideBar = ({ setShow, show }: sideBarProps) => {
  const user = useUser();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const navigation: NavigationItem[] = [
    {
      icon: MdDashboard,
      title: "Dashboard",
      to: "/dashboard/home",
      active: location.pathname === "/dashboard/home",
    },
    // {
    //   icon: MdDashboard,
    //   title: "",
    //   to: "",
    //   active: location.pathname === "/dashboard/home",
    // },
  ];

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

  const mobileSidebarCss = show
    ? "translate-x-0 absolute h-full z-50 w-80"
    : "-translate-x-full h-full absolute z-50";

  const sidebarCss = show ? "translate-x-0 min-w-[18rem]" : "-translate-x-80 ";

  return (
    <aside
      className={`bg-transparent transition ease-in-out duration-500 px-5 ${
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

      <div className="overflow-auto h-[30rem]">
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

        <Link
          to="/agencies"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
            false
              ? "bg-sidebar-active text-white"
              : "text-gray-600 hover:bg-sidebar-hover"
          }`}
        >
          <Building2 size={20} />
          <span>Agencies</span>
        </Link>

        <ConfirmAlert
          text="Are you sure you want to log out?"
          title="Log Out"
          logout
          url=""
          trigger={
            <div className={`flex items-center gap-3 px-3 py-2 mb-2 mt-5 `}>
              <SidebarItemIcon icon={MdLogout} />
              <h6 className="font-medium text-sm text-white">Logout</h6>
            </div>
          }
        />
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
  icon: ComponentProps<FunctionComponent<any> | ComponentClass<any, any>>;
};

const SidebarItem = (props: SidebarItemProps) => {
  const Icon = props.icon;
  return (
    <Link
      to={props.to}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
        props.active
          ? "bg-sidebar-active text-white"
          : "text-gray-600 hover:bg-sidebar-hover"
      } ${props.className ?? ""}`}
    >
      <SidebarItemIcon icon={Icon} isImage={props.isImage} />
      <h6 className="font-medium text-sm text-white">{props.title}</h6>
    </Link>
  );
};

type SidebarItemIconProps = {
  isImage?: boolean;
  icon: ComponentProps<FunctionComponent<any> | ComponentClass<any, any>>;
};

const SidebarItemIcon = (props: SidebarItemIconProps) => {
  const Icon = props.icon;
  return (
    <div className=" rounded-md grid place-items-center">
      {props?.isImage ? (
        <img src={props.icon} className="h-5 w-5 text-primary" />
      ) : (
        <Icon className="h-5 w-5 text-primary" />
      )}
    </div>
  );
};
