/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../../FireBase";

type UpdateCardOptions = {
  itemGetter: string;
  docId: string;
};

type UpdateParams = {
  userId: string;
  field: string;
  amount?: number;
  allocation?:number
  extras?: Record<string, unknown>;
  operation?: "add" | "subtract" | "set";
};

export const useUpdateCard = ({ itemGetter, docId }: UpdateCardOptions) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, UpdateParams>({
    mutationFn: async ({
      userId,
      field,
      amount = 0,
      extras = {},
      operation = "add",
    }) => {
      if (!userId) throw new Error("No user ID provided");

      const ref = doc(db, "users", userId, itemGetter, docId);

      const updateData: any = { ...extras };

      if (operation === "add") {
        updateData[field] = increment(amount);
      } else if (operation === "subtract") {
        updateData[field] = increment(-amount);
      } else if (operation === "set") {
        updateData[field] = amount;
      }


await updateDoc(ref, updateData as any);


      console.log(`Updated ${field} for user ${userId}: ${operation} ${amount}`);
    },
    onSuccess: (_, variables) => {
      // Invalidate queries so related data auto-refetches
      queryClient.invalidateQueries({
        queryKey: ["items", variables.userId, itemGetter],
      });
    },
    onError: (error) => {
      console.error("Error updating card:", error);
    },
  });

  return {
    updateCard: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
