import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/common/Button/Button";
import Input from "../../components/Input/Input";
import { useUpdateCard } from "../../components/hooks/fireBaseFunctions/updateFile";
import { useAuth } from "../../context/AuthProvider/auth"; 
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BreadCrumbs } from "../../components/common/BreadCrums";
import { SelectComponent } from "../../components/common/selectComp/selectComp";
import { Banks } from "../../mockData/Banks";
import { DashboardHeader } from "../../components/Headers/dashBoardHeader";
import { useGetItems } from "../../components/hooks/fireBaseFunctions/getFile";

const fundSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    }),
  bank: z.string()  .min(1, "Select a bank"),
 bankAccount: z
  .string()
  .min(10, "Account number must be 10 digits")
  .max(10, "Account number must be 10 digits"),
  

});


  const crumPages = [
    {
      name: 'dashBoard',
      href:`/dashboard`,
      current: false,
    },
    {
      name: 'withdrawal',
      href:  `/withdraw`,
      current: false,
    },
  
  ];

type FundFormData = z.infer<typeof fundSchema>;

const Withdrawal: React.FC = () => {
  const { user } = useAuth(); 
   const { updateCard, isLoading, error } = useUpdateCard({itemGetter: "dashboard/MainBalance" });
   const{items:dashboardItems,isLoading:gettingBalance,}=useGetItems({itemGetter:'dashboard'})
   const mainBalance = dashboardItems.find(item => item.id === "MainBalance");

const navigate=useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FundFormData>({
    resolver: zodResolver(fundSchema),
  });

  const onSubmit = async (data: FundFormData) => {
     console.log('i was submited');
    if (!user) return;
    if(Number(data.amount)> Number(mainBalance?.amount)){
       return toast.error('insufficent balance')
    }

 
try {
   await updateCard(

{

      userId: user?.uid,
        field: "amount",
        amount: Number(data.amount),
        extras: { note:  data.bank},
        operation: "subtract"
      });


toast.success("Withdrawal successfully");
  navigate("/dashboard", { replace: true });
} catch (error) {
  console.log(error);
  toast.error("Withdrawal Failed. Please try again.");
}
   

    reset();
  };

  return (
    <div className="flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6">
      <BreadCrumbs className={'self-start mb-4'} page={crumPages}/>
        <DashboardHeader title="Withdraw Funds" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <Input
              type="number"
              placeholder="Enter amount"
              {...register("amount")}
              error={errors.amount?.message}
            />
           
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Number 
            </label>
            <Input type="number" placeholder="Account Number" error={errors.bankAccount?.message} {...register("bankAccount")} />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bank Name
            </label>
            <SelectComponent optionArry={Banks} register={register("bank")} />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error.message}</p>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading||gettingBalance ? "Updating..." : "Withdraw"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Withdrawal;
