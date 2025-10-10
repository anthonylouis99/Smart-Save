
import { type ReactNode } from "react";
import { AsideNav } from "./AsideNav/AsideNav";
import { NavBar } from "./NavBar/nav";
// import { UseSwitch } from "../../context/switchContext";

type Props = {
  children?: ReactNode;
  selectedItems?: ReactNode;
};

export const DashBoardLayout = ({ children }: Props) => {
  // const { sideBarWidth } = UseSwitch();

 

  return (
    <div className="flex h-screen w-screen bg-gray-200">

      <div className="w-full h-full gap-1 flex">
        <aside>
          <AsideNav />
        </aside>

        <main className="flex-1 relative bg-white rounded-xl overflow-hidden flex flex-col">

              <NavBar />
          
          <div className="p-8 flex-1 overflow-y-auto max-w-[1400px] mt-4 w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

