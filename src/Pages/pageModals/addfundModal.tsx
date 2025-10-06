// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Input from "../../components/Input/Input";
// import { useUpdateCard } from "../../components/hooks/fireBaseFunctions/updateFile";
// import { useAuth } from "../../context/AuthProvider/auth"; 
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import PopOverModal from "../../components/common/Modal/modal";
// import { SelectComponent } from "../../components/common/selectComp/selectComp";
// import { useGetItems } from "../../components/hooks/fireBaseFunctions/getFile";

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

// export const AddFundModal = ({isOpen,onClose,isloading, savingBalance,id }:{onClose:()=>void,isOpen:boolean,isloading:boolean,savingBalance:string|number,id:string}) => {
//   const { user } = useAuth(); 
//    const {refetch}=useGetItems({itemGetter:'SmallCardsItems'})
//   const {items}=useGetItems({itemGetter:'DashboardData'})
//    const { updateCard, isLoading, error } = useUpdateCard({
//     itemGetter: "SmallCardsItems",
//     docId: id, 
//   });

//    const { updateCard:mainBalance, isLoading:LoadingMainBal, error:MainBalErr } = useUpdateCard({
//     itemGetter: "DashboardData",
//     docId: "bwt4qc3UF3IzKlfWRv0E", 
//   });

  
 
   

// const navigate=useNavigate()

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<FundFormData>({
//     resolver: zodResolver(fundSchema),
//   });
//   const balance = items.length > 0 ? items[0]["Main-balance"] : 0;


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


// //   await updateCard({
// //         userId: user.uid,
// //         field: "SmallCardsItems",
// //          amount : Number(data.amount),
// //         extras: { note },
// //         operation: "add",
// //       });


//   return (
   
//         <PopOverModal isOpen={isOpen} title={"Add Fund"} onAccept={handleSubmit((data:FundFormData)=>{
//           if (data.source==='Balance') {
//             return onSubmit
//           }else{
//             return onSubmitFromSavings
//           }
//         })} isLoading={isLoading||isloading||LoadingMainBal} onClose={onClose} >

//         <form  className="space-y-4">
//           <div>
           
//             <Input
//             label="Amount"
//               type="number"
//               placeholder="Enter amount"
//               {...register("amount")}
//             />
//             {errors.amount && (
//               <p className="text-red-500 text-sm">{errors.amount.message}</p>
//             )}
//           </div>


//             <div>
//             <SelectComponent
//             label="source"
//             optionArry={["Balance","Saving-Balance"]} register={register("source")}            />
//             {errors.source && (
//               <p className="text-red-500 text-sm">{errors.source.message}</p>
//             )}
//           </div>


//           <div>
//             <Input label="Note" type="text" placeholder="Add a note" {...register("note")} />
//           </div>

//           {/* {error && (
//             <p className="text-red-500 text-sm">{error.message}</p>
//           )} */}
//         </form>
//         </PopOverModal>
    
//   );
// }};