import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// import { SmoothNav } from "../../../../smoothNav/smoothnavcomp";
type DropdownItem = {
  name: string;
  href: string;
  icon?: React.ReactNode;
};

type Props = {
  propArray?: Array<DropdownItem>;
  showDropDown?: boolean;
  setShowDropDown?: React.Dispatch<React.SetStateAction<boolean>>; 
};

export const Dropdown = ({ propArray = [], showDropDown, setShowDropDown }: Props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropDown?.(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowDropDown]);

  return (
    <div ref={dropdownRef} className=" z-60 top-20 absolute w-max">
      <div
        className={`flex flex-col bg-white shadow-lg rounded-md  transition-all duration-300 ${
          showDropDown ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {propArray.map((item, index) => (
          <div
          onClick={() => setShowDropDown?.(false)}
            key={index}
            className={`${
              showDropDown ? "slide-in-left" : ""
            } px-4 py-2 transition-all duration-300 whitespace-nowrap`}
          >
            <Link
              to={item.href}
              className="flex items-center text-gray-700 gap-2"
            >
             {item.icon}
              {item.name}
            </Link>


            
          </div>
        ))}
        
      </div>

     
    </div>
  );
};
