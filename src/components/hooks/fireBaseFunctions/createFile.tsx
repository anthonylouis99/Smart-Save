import { useMutation } from "@tanstack/react-query";
import { db } from "../../../FireBase";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "../../../context/AuthProvider/auth";

// CREATE card
export const useCreateCard = ({ createItem }: { createItem: string }) => {
  const { user } = useAuth();

  // Mutation function
  const createCardFn = async (data: { allocation: string; item: string; target: string }) => {
    if (!user?.uid) throw new Error("No user logged in");

    const dashboardRef = collection(db, "users", user.uid, createItem);
    const docRef = await addDoc(dashboardRef, data);

    console.log("Document written with ID:", docRef.id);
    return docRef;
  };

  // Mutation hook from TanStack Query
  const {
    mutateAsync: CreateCard, // same name as before
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: createCardFn,
  });

  return { CreateCard, isLoading, error };
};
