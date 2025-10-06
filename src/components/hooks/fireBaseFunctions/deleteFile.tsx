import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "../../../FireBase";
import { doc, deleteDoc } from "firebase/firestore";

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  // The actual delete function
  const deleteItemFn = async ({ userId, id }: { userId: string; id: string }) => {
    if (!userId) throw new Error("No user ID provided");

    await deleteDoc(doc(db, "users", userId, "SmallCardsItems", id));
    console.log("Item deleted with id:", id);
  };

  const {
    mutateAsync: deleteItem,
    isPending: isDeleting,  
    error,
  } = useMutation({
    mutationFn: deleteItemFn,
    onSuccess: (_, variables) => {
      const { userId } = variables as { userId: string; id: string };
      queryClient.invalidateQueries({
        queryKey: ["items", userId, "SmallCardsItems"],
      });
    },
  });

  return { deleteItem, isDeleting, error };
};
