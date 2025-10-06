import { useQuery } from "@tanstack/react-query";
import { db } from "../../../FireBase";
import { collection, getDocs, type DocumentData } from "firebase/firestore";
import { useAuth } from "../../../context/AuthProvider/auth";

export const useGetItems = <T extends DocumentData>({
  itemGetter,
}: {
  itemGetter: string;
}) => {
  const { user } = useAuth();

  const fetchItems = async (): Promise<T[]> => {
    if (!user) throw new Error("User not authenticated");

    const dashboardRef = collection(db, "users", user.uid, itemGetter);
    const querySnapshot = await getDocs(dashboardRef);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as T),
    }));
  };

  const {
    data: items = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["items", user?.uid, itemGetter],
    queryFn: fetchItems,
    enabled: !!user, 
  });

  return { items, isLoading, error, refetch };
};
