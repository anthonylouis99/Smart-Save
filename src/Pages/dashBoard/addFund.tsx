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

const fundSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    }),
  // source: z.string().min(1, "Source is required"),
  note: z.string().optional(),
});


  const crumPages = [
    {
      name: 'dashBoard',
      href:`/dashboard`,
      current: false,
    },
    {
      name: 'AddFund',
      href:  `/addFund`,
      current: false,
    },
  
  ];

type FundFormData = z.infer<typeof fundSchema>;

const AddFund: React.FC = () => {
  const { user } = useAuth(); 
   const { updateCard, isLoading, error } = useUpdateCard({itemGetter: "dashboard/MainBalance" });

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
    if (!user) return;
try {
   await updateCard(

{

      userId: user?.uid,
        field: "amount",
        amount: Number(data.amount),
        extras: { note:  data.note  },
        operation: "add"
      });


toast.success("Fund added successfully");
  navigate("/dashboard", { replace: true });
} catch (error) {
  console.log(error);
  toast.error("Failed to fund balance. Please try again.");
}
   

    reset();
  };

  return (
    <div className="flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6">
      <BreadCrumbs className={'self-start mb-4'} page={crumPages}/>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Funds</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <Input
              type="number"
              placeholder="Enter amount"
              {...register("amount")}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount.message}</p>
            )}
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Note (optional)
            </label>
            <Input type="text" placeholder="Add a note" {...register("note")} />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error.message}</p>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Updating..." : "Add Fund"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddFund;
