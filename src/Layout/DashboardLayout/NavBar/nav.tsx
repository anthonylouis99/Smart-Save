import { Search, BellIcon, User, ListIndentDecrease,ListIndentIncrease,ChevronDown,ChevronLeft } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import Input from "../../../components/Input/Input";
import { UseSwitch } from "../../../context/switchContext";
import { useWindowSizeCategory } from "../../../lib/util";
import { motion,AnimatePresence } from "framer-motion";
import { useAuth } from "../../../context/AuthProvider/auth";
import { Dropdown } from "./dropDownNav";
import { useDashboardRoutes } from "../DashBoardRoutes/useDashboardRoutes";
import LogOutModal from "../../../Pages/modules/auth/logOut";
import { LogOut } from "lucide-react";




export const NavBar = ({ image }: { image?: ReactNode }) => {

  const [searchBarOpen,setSearchBarOpen]=useState(true)
   const [dropDownOpen,setDropDownOpen]=useState(false)
  const { toggleSidebar,sideBarOpen } = UseSwitch();
  const[isLogOutModalOpen,setIsLogOutModalOpen]=useState(false)
    const { navigation } = useDashboardRoutes();
const WindowSize=useWindowSizeCategory()
useEffect(()=>{
if (WindowSize==='small')
setSearchBarOpen(false)
setDropDownOpen(false)

},[WindowSize])
const {user}=useAuth()

  const activePage = navigation.find(item => item.href === location.pathname);
  return (
    <nav className="w-full bg-white shadow-sm text-gray-700 px-4 h-[var(--topNav-hight)] flex items-center relative">
      
      <div className="flex items-center gap-3">

{ WindowSize =='small' ?
  <div onClick={()=>setDropDownOpen(!dropDownOpen)}>
        {
          dropDownOpen? <ChevronDown  className="w-6 h-6 text-[var(--bar-color)]" />: 
          <ChevronLeft  className="w-6 h-6 text-[var(--bar-color)]" />
        }
        </div>
      
      :
   <>
     { sideBarOpen?
          <ListIndentDecrease  onClick={toggleSidebar} className="w-6 h-6 text-[var(--bar-color)]" />

          :<ListIndentIncrease onClick={toggleSidebar} className="w-6 h-6 text-[var(--bar-color)]" />
      }
    </>
  }
     <Dropdown propArray={navigation} showDropDown={dropDownOpen} setShowDropDown={setDropDownOpen} />

        {/* Active Page */}

    <div className="text-lg font-semibold text-gray-800">
      {activePage ? activePage.name : "Page Not Found"}
    </div>

     
       


      </div>


      {/* Center Section: Search */}
      
      <div className="flex w-[80%] items-center justify-end gap-2 ml-auto">

           <AnimatePresence mode="wait">
          {searchBarOpen ? (
            <motion.div
              key="input"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden flex-1 max-w-[300px] bg"
            >
              <Input
                leftIcon={
                  <Search
                    onClick={() => setSearchBarOpen((prev) => !prev)}
                    className="w-5 h-5 cursor-pointer hover:text-red-600 transition-colors"
                  />
                }
                type="search"
                placeholder="Search..."
              />
            </motion.div>
          ) : (
            <motion.div
              key="icon"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Search
                onClick={() => setSearchBarOpen((prev) => !prev)}
                className="w-5 h-5 cursor-pointer hover:text-red-600 transition-colors"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-4 text-[var(--muted)]">
        

          <BellIcon className="w-5 h-5 cursor-pointer hover:text-gray-800 transition-colors" />
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2">
          <div className="border rounded-full bg-gray-200 w-9 h-9 flex items-center justify-center overflow-hidden">
            {image ? (
              <img
                src="/profile.png"
                alt="profile"
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              <User className="w-5 h-5" />
            )}
          </div>
         {WindowSize!=='small' &&<p className=" sm:block text-sm font-medium">{user?.displayName || "Guest"}</p>}
        </div>
        <div  onClick={() => setIsLogOutModalOpen(true)} className="flex items-center gap-3 px-3 py-2 text-red-600 rounded-md hover:bg-red-100 cursor-pointer transition-colors">
          <LogOut
          
          className="w-5 h-5" />
          {WindowSize!=='small'&&< motion.p 
        animate={{opacity:1}}
        initial={{opacity:0}}
        transition={{duration:0.3, ease:'easeInOut', delay:0.2}}
          >Logout</ motion.p >}
        </div>
      </div>
 <LogOutModal
        isOpen={isLogOutModalOpen}
        onClose={() => setIsLogOutModalOpen(false)}
        onLogout={() => setIsLogOutModalOpen(false)}
      />
    </nav>
  );
};
