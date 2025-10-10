
import { type ReactNode } from "react";
import { useMemo } from "react";
import { AsideNav } from "./AsideNav/AsideNav";
import { NavBar } from "./NavBar/nav";
import { useWindowSizeCategory } from "../../lib/util";

type Props = {
  children?: ReactNode;
  selectedItems?: ReactNode;
};

export const DashBoardLayout = ({ children }: Props) => {
  const Window=useWindowSizeCategory()
  const small=useMemo(()=>(Window < 'small'),[Window])

 

  return (
    <div className="flex h-screen w-screen bg-gray-200">

      <div className="w-full h-full gap-1 flex">
        {small&&<aside>
          <AsideNav />
        </aside>}

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

