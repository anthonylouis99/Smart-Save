import { useQuery } from "@tanstack/react-query";
import { db } from "../../../FireBase";
import { collection, getDocs, type DocumentData } from "firebase/firestore";
import { useAuth } from "../../../context/AuthProvider/auth";


export const useGetItems = <T extends DocumentData>({
  itemGetter,
  id
}: {
  itemGetter: string;
  id?:string;
}) => {
  const { user } = useAuth();

  // console.log('uid' ,user?.uid,'g6w5PYWZ5vfdZp8A0LbiyBu4g1d2');
  

  const fetchItems = async (): Promise<T[]> => {
    if (!user) throw new Error("User not authenticated");

    const dashboardRef = collection(db, "users", user.uid, itemGetter,id?id:'');
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
