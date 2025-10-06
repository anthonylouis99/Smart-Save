import Button from "../../components/common/Button/Button";
// import { useCart } from "../../context/switchContext";
// import toast from 'react-hot-toast';
import { LucidePiggyBank, } from "lucide-react";
import { type ReactNode } from "react";
import clsx from 'clsx';



export const SmallCards = ({icon,item,color,className,Target }:{balance?:string,icon?:ReactNode,item:string,color?:string, className?:string,Target:string}) => {
  return (
  <div className={clsx("h-full p-3 w-full flex flex-col justify-between rounded-lg shadow",className)}
     style={{
    backgroundColor: color ? color : "rgba(85, 71, 207, 0.2)",
  }}
>
  {/* Top Right Icon */}
  <div className="flex justify-between">
       <small className="text-gray-200 truncate">
        {item ? item : "vacation"}
      </small>
    <div
      className="rounded-full flex justify-center items-center h-10 w-10 shrink-0"
      style={{
        backgroundColor: color ? color : "rgba(85, 71, 207, 0.8)",
      }}
    >
      {!icon ? <LucidePiggyBank className="text-white" /> : icon}
    </div>
  </div>

  {/* Bottom Section */}
  <div className="flex items-end justify-between gap-2 mt-4 w-full">
    {/* Text */}
    <div className="flex flex-col min-w-0">
      <small className="text-gray-200 truncate">
         Target
      </small>
      <div>
         <p className="font-semibold whitespace-nowrap">
        ₦ {Target?Number(Target).toLocaleString("en-US"):"00.00"}
      </p>
      
      </div>
     
    </div>
  </div>
</div>
  );
};



export const TopCard = ({
  Title,
  balance,
  underText,
  precentage,
  className,
  buttonText,
  onclick,
  currency,
  icon
}: {
  Title?: string;
  icon?:ReactNode;
  balance?: string|number;
  underText?: string;
  precentage?: string;
  className?: string;
  buttonText?:string;
  currency?:boolean
  onclick?:()=>void
}) => {
  return (
    <div
      className={clsx(
        "h-full p-2 w-full flex",
        className 
      )}
    >
      <div className="flex flex-col justify-between w-full gap-4 text-[var(--card-text)]">
        {buttonText&&
        <div className="w-full flex justify-end ">
          <Button leftIcon={icon} onClick={onclick} className="flex items-center justify-center">
          {buttonText}
          </Button>
             
        </div>
        }
     
       
        <div className=" mt-auto">
          <small>{Title ? Title : "Total Balance"}</small>
          <p className="font-bold text-xl">{currency&& "₦"} {balance?.toLocaleString() || "00.00"}</p>
          <small>
            <span>{precentage}</span> {underText ? underText : ""}
          </small>
        </div>
      </div>
    </div>
  );
};




