import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/common/Button/Button";
import Input from "../../components/Input/Input";
// import { useUpdateCard } from "../../components/hooks/fireBaseFunctions/updateFile";
import { useAuth } from "../../context/AuthProvider/auth"; 
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// import { useGetItems } from "../../components/hooks/fireBaseFunctions/getFile";
import { SelectComponent } from "../../components/common/selectComp/selectComp";
import { db } from "../../FireBase";
import {doc ,runTransaction} from "firebase/firestore";

const fundSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    }),
  source: z.string().optional(),
  note: z.string().optional(),
});

type FundFormData = z.infer<typeof fundSchema>;

const AddSavings: React.FC = () => {
  const { user } = useAuth(); 


  const [isLoading,setisLoading]=useState(false)

const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FundFormData>({
    resolver: zodResolver(fundSchema),
  });



const onSubmit = async (data: FundFormData) => {
  console.log(data.source);
  
    setisLoading(true)
  if (!user) return;
  const amountToSave = Number(data.amount);

  try {
    await runTransaction(db, async (transaction) => {
      const mainBalanceRef = doc(
        db,
        "users",
        user.uid,
        "DashboardData",
        "bwt4qc3UF3IzKlfWRv0E"
      );
      const savingsRef = doc(
        db,
        "users",
        user.uid,
        "Savings",
        "16a9hCWLD3B8HeTjdveH"
      );


      const [mainSnap, savingsSnap] = await Promise.all([
        transaction.get(mainBalanceRef),
        transaction.get(savingsRef),
      ]);

      if (!mainSnap.exists()) {
        throw new Error("Main balance not found");
      }

      const currentBalance = mainSnap.data()["Main-balance"] ?? 0;
      const currentSavings = savingsSnap.exists()
        ? savingsSnap.data()["Savings"] ?? 0
        : 0;


      if (amountToSave > currentBalance) {
        throw new Error("Insufficient balance");
      }


      transaction.update(mainBalanceRef, {
        "Main-balance": currentBalance - amountToSave,
      });

      transaction.set(
        savingsRef,
        {
          Savings: currentSavings + amountToSave,
          note: data.note,
        },
        { merge: true }
      );
    });

    toast.success("Fund added successfully");
    navigate("/dashboard", { replace: true });
    reset();
      setisLoading(false)
} catch (err: unknown) {
  if (err instanceof Error) {
    console.error(err);
    toast.error(err.message);
  } else {
    console.error("Unexpected error:", err);
    toast.error("Failed to update balances.");
  }
}

};






  return (
    <div className="flex justify-center items-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Savings</h2>

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
              source
            </label>
            <SelectComponent
           optionArry={['Balance']}
          register={register("source")}/>
            {errors.source && (
              <p className="text-red-500 text-sm">{errors?.source?.message}</p>
            )}
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Note (optional)
            </label>
            <Input type="text" placeholder="Add a note" {...register("note")} />
          </div>

          {/* {error ||errForRemovingSaved && (
            <p className="text-red-500 text-sm">{error||errForRemovingSaved}</p>
          )} */}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Updating..." : "Add Fund"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddSavings;
