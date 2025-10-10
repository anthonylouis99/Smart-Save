import { useEffect, useState } from "react";
import { useDashboardRoutes } from "../DashBoardRoutes/useDashboardRoutes";
// import { Link } from "react-router";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { UseSwitch } from "../../../context/switchContext";
import { useWindowSizeCategory } from "../../../lib/util";
import LogOutModal from "../../../Pages/modules/auth/logOut";
import { NavLink } from "react-router-dom";



export const AsideNav = () => {
  const { navigation } = useDashboardRoutes();
 const WindowSize=useWindowSizeCategory()
  const {sideBarOpen,setSidebarOpen}=UseSwitch()
    const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);



useEffect(()=>{
  if(WindowSize!=='large' ){
setSidebarOpen(false)

  }else{
    setSidebarOpen(true)
  }


},[WindowSize])


  return (
    <motion.aside
     className= {`bg-white flex flex-col h-full rounded-xl ${!sideBarOpen&&'items-center'}   shadow-md`}
     initial={{opacity:0}}
      animate={{ width:sideBarOpen?'var(--aside-width)' :"var(--sidebar-close)" ,opacity:1}}
      transition={{ duration: 0.3, ease: "easeInOut" }}>

      
   
      <div className="flex items-center p-4 border-b">
        <img src="/logo.png" alt="logo" className="h-8 w-10 object-contain" />
        { sideBarOpen&&
        < motion.small 
        animate={{opacity:1}}
        initial={{opacity:0}}
        transition={{duration:0.3, ease:'easeInOut', delay:0.2}}
        className="font-bold text-lg text-gray-800">Smart Save
        </motion.small>}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col gap-2 p-3 overflow-y-auto">
        {sideBarOpen&&< motion.p 
         animate={{opacity:1}}
        initial={{opacity:0}}
        transition={{duration:0.3, ease:'easeInOut', delay:0.2}}
        className="text-xs font-semibold text-gray-500 uppercase px-2 mb-2">
          Main Menu
        </ motion.p >}
      



  {navigation.map((item, index) =>
  item.show ? (
    <NavLink
      to={item.href}
      key={index}
      className={({ isActive }) =>
      `relative flex items-center gap-3 px-3 py-2  rounded-md cursor-pointer text-sm font-medium ${
          isActive ? "text-gray-900" : "text-gray-600 hover:bg-gray-200 scale"
        }`
      }
    >
      {({ isActive }) => (
        <motion.div
          // whileHover={{ scale: 1.03, backgroundColor: "rgba(0,0,0,0.05)" }}
          transition={{ duration: 0.2 }}
          className=" flex items-center gap-3 w-full"
        >
          {item.icon}

          {sideBarOpen && (
            <motion.span
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
              className="relative z-20"
            >
              {item.name}
            </motion.span>
          )}

          {isActive && (
             <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-gray-200 rounded-md z-10"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
          )}
        </motion.div>
      )}
    </NavLink>
  ) : null
)}

      </nav>

    
      <div className="border-t p-3">
        {sideBarOpen&&< motion.p 
          animate={{opacity:1}}
        initial={{opacity:0}}
        transition={{duration:0.3, ease:'easeInOut', delay:0.2}}
        className="text-xs font-semibold text-gray-500 uppercase px-2 mb-2">
          System
        </ motion.p >}
        <div  onClick={() => setIsLogOutModalOpen(true)} className="flex items-center gap-3 px-3 py-2 text-red-600 rounded-md hover:bg-red-100 cursor-pointer transition-colors">
          <LogOut
          
          className="w-5 h-5" />
          {sideBarOpen&&< motion.p 
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
</motion.aside>
  );
};





  