// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Input from "../../components/Input/Input";
// import { useUpdateCard } from "../../components/hooks/fireBaseFunctions/updateFile";
// import { useAuth } from "../../context/AuthProvider/auth"; 
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
import PopOverModal from "../../components/common/Modal/modal";
// import { SelectComponent } from "../../components/common/selectComp/selectComp";
// import { useGetItems } from "../../components/hooks/fireBaseFunctions/getFile";
import { type InvestmentOption } from "../dashBoard/dashBoard";

// const fundSchema = z.object({
//   amount: z
//     .string()
//     .min(1, "Amount is required")
//     .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
//       message: "Amount must be a positive number",
//     }),
//   source: z.string().min(1, "Source is required"),
//   note: z.string().optional(),
// });

// type FundFormData = z.infer<typeof fundSchema>;

export const AddInvestmentModal = ({isOpen,onClose, data, }:{onClose:()=>void,isOpen:boolean,isloading:boolean,id?:string, data?:InvestmentOption}) => {
  // const { user } = useAuth(); 
  //  const {refetch}=useGetItems({itemGetter:'SmallCardsItems'})
  // const {items}=useGetItems({itemGetter:'DashboardData'})
  //  const { updateCard, isLoading, error } = useUpdateCard({
  //   itemGetter: "SmallCardsItems",
  //   docId: id, 
  // });

  //  const { updateCard:mainBalance, isLoading:LoadingMainBal, error:MainBalErr } = useUpdateCard({
  //   itemGetter: "DashboardData",
  //   docId: "bwt4qc3UF3IzKlfWRv0E", 
  // });

  
 
   

// const navigate=useNavigate()

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm<FundFormData>({
  //   resolver: zodResolver(fundSchema),
  // });
  // const balance = items.length > 0 ? items[0]["Main-balance"] : 0;


//  const onSubmit = async (data: FundFormData) => {
//   if (!user) return;

//   const amount = Number(data.amount);
//   const source = data.source;
//   const note = data.note;
// if (source === "Balance" && balance > Number(savingBalance)) (toast.error("Insufficient wallet Balance"))
  
//   try {

//        await mainBalance({
//         userId: user.uid,
//         field: "Main-balance",
//        amount,
//         extras: { note },
//         operation: "subtract",
//       });
//       await updateCard({
//         userId: user.uid,
//         field: "SmallCardsItems",
//         amount,
//         extras: { note },
//         operation: "add",
//       });

     

//     navigate("/dashboard", { replace: true });
//     refetch?.();
//     reset();
//   } catch (err: unknown) {
//     console.error("Error funding balance:", err);
//     toast.error('insuficent wallet Balance')
//     toast.error(error?.message||MainBalErr?.message || "Failed to fund balance. Please try again.");
//   } finally {
//     reset();
//   }




// };

// const onSubmitFromSavings = async (data: FundFormData) => {
//   if (!user) return;

//   const amount = Number(data.amount);
//   const source = data.source;
//   const note = data.note;
// if (source === "Balance" && balance > Number(savingBalance)) (toast.error("Insufficient wallet Balance"))
  
//   try {

//        await mainBalance({
//         userId: user.uid,
//         field: "Savings",
//        amount,
//         extras: { note },
//         operation: "subtract",
//       });
//       await updateCard({
//         userId: user.uid,
//         field: "SmallCardsItems",
//         amount,
//         extras: { note },
//         operation: "add",
//       });

     

//     navigate("/dashboard", { replace: true });
//     refetch?.();
//     reset();
//   } catch (err: unknown) {
//     console.error("Error funding balance:", err);
//     toast.error('insuficent wallet Balance')
//     toast.error(error?.message||MainBalErr?.message || "Failed to fund balance. Please try again.");
//   } finally {
//     reset();
//   }


//   await updateCard({
//         userId: user.uid,
//         field: "SmallCardsItems",
//          amount : Number(data.amount),
//         extras: { note },
//         operation: "add",
//       });


// tyy using This intead

// const onSubmit = async (data: FundFormData) => {
// //   console.log(data.source);
  
//     setisLoading(true)
//   if (!user) return;
//   const amountToSave = Number(data.amount);

//   try {


    
//     await runTransaction(db, async (transaction) => {
//       const mainBalanceRef = doc( db,"users", user.uid,"dashboard/MainBalance" );
//       const investmentRef = doc( db,"users", user.uid,"dashboard/InvestmentBalance");


//       const [mainSnap, savingsSnap] = await Promise.all([
//         transaction.get(mainBalanceRef),
//         transaction.get(investmentRef),
//       ]);

//       if (!mainSnap.exists()) {
//          setisLoading(false)
//         throw new Error("Main balance not found");
//       }

//       const currentBalance = mainSnap.data().amount?? 0;
//       const currentSavings = savingsSnap.exists()
//         ? savingsSnap.data().amount ?? 0
//         : 0;


//       if (amountToSave > currentBalance) {
//         setisLoading(false)
//         throw new Error("Insufficient balance");
        
//       }


//       transaction.update(mainBalanceRef, {
//        amount: currentBalance - amountToSave,
//       });

//       transaction.set(
//         investmentRef,
//         {
//           amount: currentSavings + amountToSave,
//           note: data.bank+' '+data.bankAccount,
//         },
//         { merge: true }
//       );
//     });

//     toast.success("Fund added successfully");
//     navigate("/dashboard", { replace: true });
//     reset();
//       setisLoading(false)
// } catch (err: unknown) {
//   if (err instanceof Error) {
//     console.error(err);
//     toast.error(err.message);
//   } else {
//     console.error("Unexpected error:", err);
//     toast.error("Failed to update balances.");
//   }
// }

// };


  return (
   
        <PopOverModal isOpen={isOpen} title={"Invest"}  onClose={onClose} 
        //  onAccept={handleSubmit((data:FundFormData)=>{
          // if (data.source==='Balance') {
            // return onSubmit
          // }else{
            // return onSubmitFromSavings
          // }
        // })} isLoading={isLoading||isloading||LoadingMainBal} onClose={onClose}
         >
            <div className=" flex flex-col items-start">

            <p className="font-bold">
              Company:<span className="text-gray-400">{data?.name}</span>
            </p>
       <p className="font-bold">
            Your about to Invest: <span className="text-gray-400">{data?.price ?.toLocaleString("en-ng")}</span> 
           </p>

         <p className="font-bold">
          This Investment Has a time period of : <span className="text-gray-400"> {data?.timeFrame} </span>
           </p>
    
    <p className="font-bold">
       intrest Rate is: <span className="text-gray-400">{data?.interestRate}% </span>
      </p>

             
            </div>

     
        </PopOverModal>
    
  );
}