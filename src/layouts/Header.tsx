import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { useToastHandlers } from "@/hooks/useToaster";
import { useUser } from "@/store/authSlice";
// import { ApiResponseError } from "@/types";
import { Sidebar } from "lucide-react";
import { FaUser } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

type HeaderProps = {
  title: string
  show: boolean;
  setShow: (value: boolean) => void;
};

export const Header = (props: HeaderProps) => {
  // const isMobile = useMediaQuery("(max-width: 768px)");
  const toggleSidebar = () => {
    props.setShow(!props.show);
  };

  return (
    <header className="py-3 px-5 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {!props.show ? (
          <ToggleButton
            {...{ isSidebarCollapsed: props.show, toggleSidebar }}
          />
        ) : null}
        <h4>{props.title}</h4>
      </div>

      <div className="flex items-center">
        {/* {isMobile ? null : (
          <div className="h-10 w-10 bg-gray-200 rounded-full cursor-pointer grid place-items-center mr-4">
            <FaRegBell className="text-black" />
          </div>
        )} */}
        {/* <div className="h-6 bg-gray-400 w-0.5 rounded-lg" /> */}
        <DropdownMenuDemo />
      </div>
    </header>
  );
};

// const SearchComponent = () => {
//   return (
//     <div className="relative">
//       <div className="rounded-lg w-80 h-9 bg-accent relative">
//         <input className="w-full h-full px-2 bg-transparent" />
//         <div className="h-7 w-7 rounded-full bg-primary grid place-items-center absolute top-1 right-3">
//           <SearchIcon className="text-white h-3 w-3" />
//         </div>
//       </div>
//     </div>
//   );
// };

type ToggleButtonProps = {
  toggleSidebar: () => void;
};

const ToggleButton = ({ toggleSidebar }: ToggleButtonProps) => {
  return (
    <div onClick={toggleSidebar} className={` cursor-pointer`}>
      <Sidebar />
    </div>
  );
};

export function DropdownMenuDemo() {
  const user = useUser();
  // const onResetState = useSetReset();
  // const toastHandler = useToastHandlers();

  // const navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 768px)");

  // const handleLogOut = async () => {
  //   const TOAST_TITTLE = "Account Access";
  //   try {
  //     onResetState();
  //     navigate("/");
  //   } catch (error) {
  //     toastHandler.error(TOAST_TITTLE, error as ApiResponseError);
  //   }
  // };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 pl-4">
          <Avatar className="!bg-gray-300 text-primary h-10 w-10">
            <AvatarImage src="" alt="" />
            <AvatarFallback>
              <FaUser />
            </AvatarFallback>
          </Avatar>
          <div className=" flex cursor-pointer gap-2 items-center">
            {!matches ? null : (
              <div>
                <p className="text-sm text-primary text-center">{`${user?.first_name} ${user?.last_name}`}</p>
              </div>
            )}
            {/* <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" /> */}
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        {/* <DropdownMenuItem>
          <TbUserHexagon className="mr-2 h-4 w-4 text-gray-600" />
          <span className="text-xs">My Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <TbSettings2 className="mr-2 h-4 w-4 text-gray-600" />
          <span className="text-xs">Account Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <GrUserAdmin className="mr-2 h-4 w-4 text-gray-600" />
          <span className="text-xs">Add Admin</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut}>
          <LogOut className="mr-2 h-4 w-4 text-primary" />
          <span className="text-primary text-xs">Log out</span>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
