import { BsShopWindow } from "react-icons/bs";
import { TbDeviceAirpods } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { Wallet,LayoutDashboard,Settings,ArrowUpDown,Plus,Laptop2,ChartCandlestick } from "lucide-react";
import { BsFillSpeakerFill } from "react-icons/bs";
// import { MdOutlineBorderColor } from "react-icons/md";
import { useMemo,type ReactNode } from "react";


interface DashboardRoute {
  name: string;
  href: string;
  icon: ReactNode;
  show: boolean;
}

interface UseDashboardRoutesResult {
  navigation: DashboardRoute[];
  DropdownNav: DashboardRoute[];
}

export const useDashboardRoutes = (
  // showIcon?: boolean,
): UseDashboardRoutesResult => {
  const navigation: DashboardRoute[] = useMemo(
    () => [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon:<LayoutDashboard className="w-5 h-5 z-20" />,
        show: true,
      },
      {
        name: "Savings items",
        href: "/items",
         icon:<Wallet className="w-5 h-5 z-20" />,
        show: true,
      },
        {
        name: "Investments",
        href: "/invest",
         icon:<ChartCandlestick className="w-5 h-5 z-20" />,
        show: true,
      },
      {
        name: "Transations",
        href: "/transactions",
         icon:<ArrowUpDown className="w-5 h-5 z-20" />,
        show: true,
      },
    
      {
        name: "Analytics",
        href: "/analytics",
        icon:<LayoutDashboard className="w-5 h-5 z-20" />,
        show: true,
      },
      {
        name: "Add Plan",
        href: "/Orders",
          icon:<Plus className="w-5 h-5 z-20" />,
        show: true,
      },
  {
        name: "Settings",
        href: "/settings",
         icon:<Settings className="w-5 h-5 z-20" />,
        show: true,
      },
    
    ],

    [],
  );

  const DropdownNav: DashboardRoute[] = useMemo(
    () => [
      {
        name: "Market Place",
        href: "/dashboard",
        icon: <BsShopWindow className="w-5 h-5" />,
        show: true,
      },
      {
        name: "Airpods",
        href: "/Airpods",
        icon:  <TbDeviceAirpods className="w-5 h-5" />,
        show: true,
      },

       {
        name: "Laptops",
        href: "/laptop",
        icon:<Laptop2 className="w-5 h-5" />,
        show: true,
      },
      {
        name: "Home Appliances",
        href: "/homeAppliances",
        icon: <FaHome className="w-5 h-5" />,
        show: true,
      },
      {
        name: "Speakers",
        href: "/speakers",
        icon: <BsFillSpeakerFill className="w-5 h-5" />,
        show: true,
      },
      {
        name: "Add Product",
        href: "/Orders",
        icon: <Plus className="w-5 h-5" />,
        show: true,
      },
    ],
    [],
  );
  return { navigation, DropdownNav };
};
