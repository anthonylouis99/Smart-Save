import { useMutation } from "@tanstack/react-query";
import { db } from "../../../FireBase";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "../../../context/AuthProvider/auth";

    
export const useCreateCard = ({ createItem }: { createItem: string }) => {
  const { user } = useAuth();

     const createCardFn = async (data: CardData) => {
    if (!user?.uid) throw new Error("No user logged in");

    const dashboardRef = collection(db, `users/${user.uid}/dashboard/${createItem}`);

    const docRef = await addDoc(dashboardRef, {
      ...data,
      createdAt: new Date().toISOString(),
    });

    console.log("Document written with ID:", docRef.id);
    return docRef;
  };


  const {
    mutateAsync: CreateCard,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: createCardFn,
  });

  return { CreateCard, isLoading, error };
};
