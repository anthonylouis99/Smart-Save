import { createContext, useState, useContext, useLayoutEffect,  } from "react";

type SwitchContextType = {
  sideBarOpen: boolean;
  toggleSidebar: () => void;
  sideBarWidth: string;
  setSidebarOpen: (value: boolean) => void;
};

const SwitchContext = createContext<SwitchContextType | null>(null);

export const SideBarProvider = ({ children }: { children: React.ReactNode }) => {
  const [sideBarOpen, setSidebarOpen] = useState(true);
  const [sideBarWidth, setSideBarWidth] = useState("var(--sideBar-close)");

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  useLayoutEffect(() => {
    if (sideBarOpen) {
      // document.body.style.overflow = "hidden";
      setSideBarWidth("var(--aside-width)");
    } else {
      // document.body.style.overflow = "auto";
      setSideBarWidth("var(--sideBar-close)");
    }
  }, [sideBarOpen]);



  return (
    <SwitchContext.Provider value={{ sideBarOpen, toggleSidebar, sideBarWidth,setSidebarOpen }}>
      {children}
    </SwitchContext.Provider>
  );
};

export const UseSwitch = () => {
  const context = useContext(SwitchContext);
  if (!context) {
    throw new Error("UseSwitch must be used within a SideBarProvider");
  }
  return context;
};
