import Button from "../../components/common/Button/Button";
// import { useCart } from "../../context/switchContext";
// import toast from 'react-hot-toast';
import {  Wallet,Trash,Pencil } from "lucide-react";
import { Target } from "lucide-react";
// import { BsSave } from "react-icons/bs";
import {  useEffect, useMemo, useState, } from "react";
import clsx from 'clsx';
import { useWindowSizeCategory } from "../../lib/util";
import toast from "react-hot-toast";
import { useUpdateCard } from "../hooks/fireBaseFunctions/updateFile";
import { useAuth } from "../../context/AuthProvider/auth";
import { useDeleteItem } from "../hooks/fireBaseFunctions/deleteFile";
import { EditCardModal } from "../../Pages/pageModals/EditPlanModal";
// import { AddFundModal } from "../../Pages/pageModals/addfundModal";
import { DeletePlanModal } from "../../Pages/pageModals/deletePlanMoldal";
import { useGetItems } from "../hooks/fireBaseFunctions/getFile";

type cardProp = {
  id: string;
  target:number;
  Icon?: React.ReactNode;  
  ItemName?: string|number;
  itemProgress?:number
  AmmountSaved:number|null
  className?: string;
  allocatedPercentage?:number
  isGettingData?:boolean
 completed?:string
 remainingBalance?:string|number
};


export const Card = ({
id,
ItemName,
className,
target,
AmmountSaved,
isGettingData,
completed,
// remainingBalance

}: cardProp) => {
const{user}=useAuth()

const {deleteItem,isDeleting,error:deleteError}=useDeleteItem()
const { updateCard, isLoading, error } = useUpdateCard({
    itemGetter: "SmallCardsItems",
    docId: id, 
  });

  const { updateCard:upDateBalance, isLoading:loadingBalance, error:balanceError } = useUpdateCard({
    itemGetter: "DashboardData",
    docId: 'bwt4qc3UF3IzKlfWRv0E', 
  });

  const { updateCard:upDateSavedBalance, isLoading:loadingSavedBalance, error:SavedbalanceError } = useUpdateCard({
    itemGetter: "Savings",
    docId: '16a9hCWLD3B8HeTjdveH', 
  });

  const{refetch}=useGetItems({itemGetter:"SmallCardsItems"})
   

  const [tooltipPos, setTooltipPos] = useState<number | null>(null);
  const [currentSsving,setcurrentSaving]=useState(AmmountSaved)
  const [EditCardModalOpen,setEditCardModalOpen]=useState(false)
//   const [AddFundModalOpen,setAddFundModalOpen]=useState(false)
  const [DeletePlanModalOpen,setDeletePlanModalOpen]=useState(false)

  const progress = useMemo(() => {
  const saved = Number(String(AmmountSaved).replace(/,/g, "")) || 0;
  const goal = Number(String(target).replace(/,/g, "")) || 0;
  return goal > 0 ? Math.min((saved / goal) * 100, 100) : 0;
}, [AmmountSaved, target]);


const isComplete = useMemo(() => {
  const saved = Number(String(AmmountSaved).replace(/,/g, "")) || 0;
  const numTarget = Number(String(target).replace(/,/g, "")) || 0;
  return saved >= numTarget;
}, [AmmountSaved, target]);

const loading=isDeleting||isLoading||loadingBalance||loadingSavedBalance

const handleDelete = async () => {

    if (!user?.uid) {
      toast.error("User not authenticated.");
      return;
    }

  try {
      await upDateBalance({
        userId: user?.uid,
        field: "Main-balance",
        amount: Number(target),
        extras: { note: "Savings added" },
        operation: "add"
      });

      toast.success("Card marked as completed!");
    } catch (err: unknown) {
      console.error(err);
      toast.error(
        typeof SavedbalanceError === "string"
          ? SavedbalanceError
          : SavedbalanceError instanceof Error
          ? SavedbalanceError.message
          : "Failed to update card."
      );
    }


  try {
      await upDateSavedBalance({
       userId: user?.uid,
        field: "Savings",
        amount: Number(target),
        extras: { note: "Savings added" },
        operation: "subtract"              
  });

      toast.success("Card marked as completed!");
    } catch (err: unknown) {
      console.error(err)
      toast.error(
        typeof balanceError === "string"
          ? balanceError
          : balanceError instanceof Error
          ? balanceError.message
          : "Failed to update card."
      );
    }


    await deleteItem({ userId: user?.uid, id });
    if (!error) toast.success("Plan withdrawen successfully!");
    else toast.error(
        typeof deleteError === "string"
          ? deleteError
          : deleteError instanceof Error
          ? deleteError.message
          : "Failed to update card."
      );
  };



useEffect(() => {
  if (!isComplete) return;

  let didRun = false; 

  const handleCompletion = async () => {
     if (!user?.uid) {
      toast.error("User not authenticated.");
      return;}
    if (didRun) return;
    didRun = true;

    try {
      await updateCard(

        {
       userId: user?.uid,
        field: "allocation",
        amount: Number(0),
        extras: { status: "completed" },
        operation: "set"              
  }
      );

      toast.success("Card marked as completed!");
      refetch()
    } catch (err: unknown) {
      console.error(err);
      toast.error(
        typeof error === "string"
          ? error
          : error instanceof Error
          ? error.message
          : "Failed to update card."
      );
    }
  };
setcurrentSaving(target)
  handleCompletion();
}, [isComplete]);



const planComplete=completed==='completed'


const stars="*****"
  const Window=useWindowSizeCategory()
  const medium=useMemo(()=>(Window < 'medium'),[Window])


const handelMouseMove=(e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
  const react=e.currentTarget.getBoundingClientRect();
  const xPos=e.clientX - react.left;
  setTooltipPos(xPos)
 
}

const handelMouseLeave=()=>{
  setTooltipPos(null)
}





return (
<div className={clsx(
"w-full h-full  duration-300 max-w-[700px] py-6 px-4 rounded-xl border border-gray-200 flex flex-col gap-1 overflow-hidden overflow-auto",className)}>

  <div className="flex flex-col gap-4">

    <div className="flex flex-col text-left gap-4">
     <div>
          <div className="flex flex-col  text-xl mt-auto font-bold">
               <p className=" font-medium">{ItemName ? ItemName : "House Rent"}</p>
           </div>
     </div>

      <div className=" overflow-hidden  flex justify-end">
        <div className="w-fit rounded-lg overflow-hidden">
        {/* {!isGettingData && !planComplete&&<Button
        className="border-none rounded-none"
        variant="primary"
        onClick={()=>{setAddFundModalOpen(true)}}
        leftIcon={ <Plus size={15} />}
        >
       
        { medium && <p className="text-xs">Add Fund</p> }
        
       </Button>} */}

       {!isGettingData && !planComplete&& <Button
         className="border-none rounded-none"
        variant="primary"
        leftIcon={ <Pencil size={15} />}
        onClick={()=>{setEditCardModalOpen(true)

          
        }}
        >
       
        {medium && <p className=" text-xs"> edit card </p>}
        
       </Button>}

        <Button
        className="border-none rounded-none"
        variant="danger"
        onClick={()=>{setDeletePlanModalOpen(true)}}
        leftIcon={ <Trash size={15} />}
        >
        {medium && <p className=" text-xs">delete plan</p> }  
       </Button>
         </div>
      </div>
    </div>
     
      <div className="p-2 sm:p-2 flex  justify-between text-[var(--card-text)] ">

         <div className="flex items-center gap-1 ">
           <Target/> 
                <div>
                 <small>
                Target
                  </small>
                    <p className="  font-bold">₦ {isGettingData?stars:Number(target).toLocaleString("en-US")}</p>
               </div>
          </div>
             <div className="flex items-center gap-2 ">
               <Wallet/> 
               <div>
                 <small>
                Saved
                  </small>
                {planComplete?<p>{Number(target)?.toLocaleString("en-NG")}</p>:<p className="font-bold">₦ {isGettingData?stars:Number(currentSsving)?.toLocaleString("en-NG")}</p>}
               </div>
          </div>             
      </div>

    </div>
        <div className="my-auto w-full   text-[var(--card-text)]  mb-4 rounded-sm relative"   
      onMouseMove={handelMouseMove}
      onMouseLeave={handelMouseLeave}>
        <div className="w-full h-[30px]">
          <small>
            Saving progress
          </small>

          <div  className={`w-full rounded-lg h-2 mb-2 bg-gray-100 flex gap-2 rounded-full mt-2  cursor-pointer items-center  overflow-hidden`}
          >
            <div className="h-full bg-[#5547cfcc]" style={{ width:`${planComplete?100:progress}%` }}></div>
             {tooltipPos !== null && (
            <span
              className="absolute -top-8 bg-black text-white text-xs px-2 py-1 rounded-md transition-all duration-150 whitespace-nowrap"
              style={{ left: tooltipPos }}
            >
              {planComplete?'100':progress}% completed
              <p>₦ {planComplete?Number(target)?.toLocaleString("en-NG"):currentSsving?.toLocaleString("en-NG")}</p>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black"></span>
            </span>
          )}
          
          </div>        
        </div>
        
      </div>
        {!isGettingData &&
            planComplete
            &&
            <Button 
            onClick={handleDelete}
            variant="secondary" className="h-8 mt-6"
            disabled={loading}
            >
                
              Withdraw
            </Button>
          }

          <EditCardModal isloading={loading}  id={id} isOpen={EditCardModalOpen}  onclose={()=>setEditCardModalOpen(false)}/>
        <DeletePlanModal isloading={loading} id={id} isOpen={DeletePlanModalOpen} onClose={()=>setDeletePlanModalOpen(false)}/>
       {/* <AddFundModal id={id}  savingBalance={Number(remainingBalance)} isloading={loading}  isOpen={AddFundModalOpen} onClose={()=>setAddFundModalOpen(false)}/> */}
    </div>
  );
};