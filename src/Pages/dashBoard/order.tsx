import Button from "../../components/common/Button/Button";
import Input from "../../components/Input/Input";
// import { Plus } from "lucide-react";
import {useMemo}from 'react'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { addDoc } from "firebase/firestore";
// import { docsGetter } from "../../FireBase";
import { savingPlans } from "../../assets/Images/imagesUrl";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCreateCard } from "../../components/hooks/fireBaseFunctions/createFile";
import { DashboardHeader } from "../../components/Headers/dashBoardHeader";
import { useGetItems } from "../../components/hooks/fireBaseFunctions/getFile";

const cardItems = z.object({
  item: z.string().min(1, "Product type is required"),
  allocation: z.string().min(1, "Description is required"),
  Target: z.string().min(1, "Product name is required"),
});

export type FormData = z.infer<typeof cardItems>;

export function Orders() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(cardItems),
  });
const navigate = useNavigate();


const{CreateCard,isLoading}=useCreateCard({createItem:'SmallCardsItems'})
const{items}=useGetItems({itemGetter:"SmallCardsItems"})

 const allocatedPercentage=useMemo(() => (
      items.reduce((acc, item) => acc + Number(item.allocation), 0)

    ), [items])


  const onSubmit = async (data:FormData) => { 
    if (Number(data.allocation) +allocatedPercentage> 100  )return(
      toast.error(`can't allocate more that ${100-allocatedPercentage} %`)
    )

  try {
      await CreateCard({
        allocation:data?.allocation,
        item: data?.item,
        target: data?.Target,
      });
toast.success("Plan started successfully");
  navigate("/dashboard", { replace: true });
  

} catch (error) {
   console.log(error);
toast.error("Failed to add Plan. Please try again.");
    
}
  }
  

  const handelreset =()=>{
    reset({
        item:'',
        Target:'',
        allocation:'',
      
  })
  }

  return (
     <div className="flex justify-center items-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6">
      <DashboardHeader title="Start A Plan" highlight="Create a saving plan"/>

      <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Image Upload */}

        <div className="relative w-full">
          <select
            {...register("item")}
            defaultValue=""
            className="w-full appearance-none px-4 py-2 border border-gray-300 rounded-md shadow-sm pr-10 text-[var(--card-text)] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled className="text-[var(--card-text)]">
            What are you saving For?
            </option>
            {
                savingPlans.map((savingPlans,idx)=>(<option key={idx}className="text-gray-400">
            {savingPlans.name}
            </option>))
            }
            
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {errors.item && <p className="text-red-500 text-sm">{errors.item.message}</p>}


        <Input
          {...register("Target")}
          type="text"
          placeholder="Target"
        />
        {errors.Target && <p className="text-red-500 text-sm">{errors.Target.message}</p>}

        {/* Currency Dropdown */}
        <div className="relative w-full">
          <select
            {...register("allocation")}
            defaultValue=""
            className="w-full appearance-none px-4 py-2 border border-gray-300 rounded-md shadow-sm pr-10 text-[var(--card-text)] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled className="text-[var(--card-text)]">
              Allocation
            </option>
            <option value="10"> % (10)</option>
            <option value="20"> % (20)</option>
            <option value="30"> % (30)</option>
            <option value="40"> % (40)</option>
            <option value="50">% (50)</option>
            <option value="60">% (60)</option>
            <option value="70">% (70)</option>
            <option value="80">% (80)</option>
            <option value="90">% (90)</option>
            <option value="100">% (100)</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {errors.allocation && <p className="text-red-500 text-sm">{errors.allocation.message}</p>}



        <div className="flex gap-2">
          <Button disabled={isLoading} type="submit" className="mt-2">Save</Button>
          <Button  disabled={isLoading} type="button" variant="neutral" className="mt-2 border-1 " onClick={handelreset}>Cancel</Button>
        </div>
      </form>
    </div>
    </div>
  );
}
