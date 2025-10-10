/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import PopOverModal from "../../components/common/Modal/modal";
import Input from "../../components/Input/Input";
import { useUpdateCard } from "../../components/hooks/fireBaseFunctions/updateFile";
import { useAuth } from "../../context/AuthProvider/auth";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetItems } from "../../components/hooks/fireBaseFunctions/getFile";


export const EditCardModal=({isOpen,onclose,id,isloading,singleItem}:{onclose:()=>void,isOpen:boolean,id:string,isloading:boolean,singleItem:any })=>{
  const{items,refetch}=useGetItems({itemGetter:"dashboard/Plans/items"})
    // const{items:item}=useGetItems({itemGetter:`dashboard/Plans/items/${id}`})

const fundSchema = z.object({
  Name: z.string() .min(1, "Name is required"),
  Target: z.string().min(1, "Source is required"),
  Percentage: z .string() .min(1, "Percentage is required")
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num >= 1 && num <= 100;
      },
      { message: "Percentage must be between 1 and 100" })
});

 const allocatedPercentage=useMemo(() => (
      items.reduce((acc, item) => acc + Number(item.allocation), 0)

    ), [items])
const { updateCard, isLoading, error } = useUpdateCard({
    itemGetter:  `dashboard/Plans/items/${id}`,
  });
  const {user}=useAuth()
type FundFormData = z.infer<typeof fundSchema>;

const MainsingleItem = singleItem.find((item: { id: string; }) => item.id === id);
const singleItemAllocation=MainsingleItem?.allocation
// console.log("This is Main",);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FundFormData>({
    resolver: zodResolver(fundSchema),
  });

  const handelUpdate=(async (data:FundFormData) =>{
    const updateAllocation=Number(data.Percentage) 
   
     if (!user?.uid) {toast.error("User not authenticated.");return}
 if (allocatedPercentage===100 && updateAllocation>singleItemAllocation)return(
          toast.error("You have used 100% allocation")
       )

        if( updateAllocation>singleItemAllocation && updateAllocation-singleItemAllocation+allocatedPercentage>100)return(
        toast.error(`You can't allocate more than ${100-allocatedPercentage} % more`)
       )
       
      
     

    try {
      await updateCard(
{
      userId: user?.uid,
        field: "allocation",
        amount: Number(data.Percentage),
        extras: { target:data.Target,item:data.Name  },
        operation: "set"
      });  
      toast.success("Card updated successfully!");
      reset()
      onclose()
      refetch()
    } catch (err: unknown) {
      console.error(err);
      toast.error(error?.message || "Failed to update card.");
      onclose()
    }
  })

    return(
        <>
 <div>
<PopOverModal isOpen={isOpen} title={"Edit Plan"} isLoading={isLoading || isloading} onAccept={handleSubmit(handelUpdate)} onClose={onclose} acceptLabel="create" declineLabel="cancel">
<form>
      <div>
           
            <Input
            label="Name"
              type="text"
              placeholder="Name"
              {...register("Name")}
            />
            {errors.Name && (
              <p className="text-red-500 text-sm">{errors.Name.message}</p>
            )}
          </div>
          <div>
           
            <Input
            label="Target"
              type="text"
              placeholder="Target"
              {...register("Target")}
            />
            {errors.Target && (
              <p className="text-red-500 text-sm">{errors.Target.message}</p>
            )}
          </div>
          <div>
           
            <Input
            label="Percentage"
              type="number"
              placeholder={singleItemAllocation}
              {...register("Percentage")}
            />
            {errors.Percentage && (
              <p className="text-red-500 text-sm">{errors.Percentage.message}</p>
            )}
          </div>

      </form>
</PopOverModal>

</div>
     </>
    )

}


