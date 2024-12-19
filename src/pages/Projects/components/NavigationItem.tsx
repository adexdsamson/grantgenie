import * as React from "react";

export interface NavItemProps {
  text: string;
  isActive?: boolean;
}

export interface IconButtonProps {
  iconSrc: any;
  isActive?: boolean;
  alt: string;
}

export interface DividerProps {
  color: string;
}

export interface SidebarNavProps {
  isActive?: boolean;
  lastItem: number;
  iconSrc: any;
  index: number;
  text: string;
}

export const SidebarNav = ({
  iconSrc,
  text,
  isActive,
  index,
  lastItem,
}: SidebarNavProps) => {
  return (
    <div className="flex gap-6 items-center text-sm font-medium leading-6 text-slate-400">
      <NavigationIcon
        alt={text}
        index={index}
        lastItem={lastItem}
        iconSrc={iconSrc}
        isActive={isActive}
      />
      <div className="flex flex-col items-start self-stretch rounded-none w-[229px]">
        <NavigationItem text={text} isActive={isActive} />
      </div>
    </div>
  );
};

interface NavigationIconProps {
  isActive?: boolean;
  lastItem: number;
  iconSrc: string;
  index: number;
  alt: string;
}

const NavigationIcon = ({
  alt,
  iconSrc,
  isActive,
  index,
  lastItem,
}: NavigationIconProps) => {
  return (
    <nav className="flex flex-col rounded-md max-w-[32px]" role="navigation">
      <React.Fragment key={iconSrc}>
        <IconButton iconSrc={iconSrc} isActive={isActive} alt={alt} />
        {index < lastItem && (
          <Divider color={isActive ? "slate-600" : "neutral-200"} />
        )}
      </React.Fragment>
    </nav>
  );
};

export const NavigationItem: React.FC<NavItemProps> = ({ text, isActive }) => {
  return (
    <div
      className={`mt-${isActive ? "3.5" : "6"} text-sm font-medium leading-6 ${
        isActive ? "text-black" : "text-slate-400"
      }`}
    >
      {text}
    </div>
  );
};

const IconButton: React.FC<IconButtonProps> = ({
  iconSrc,
  isActive = false,
}) => {
  const Comp = iconSrc;
  return (
    <div
      className={`flex gap-2 justify-center items-center px-2 w-full h-8 rounded-md border border-solid ${
        isActive ? "bg-slate-600" : "bg-white"
      } border-slate-600 border-opacity-70`}
      role="button"
      tabIndex={0}
    >
      <Comp className="object-contain self-stretch my-auto w-4 aspect-square" />
    </div>
  );
};

const Divider: React.FC<DividerProps> = ({ color }) => {
  return (
    <div
      className={`shrink-0 self-center w-px h-10 border border-solid border-${color}`}
      role="separator"
      aria-hidden="true"
    />
  );
};
