import { useState, useEffect } from "react";
import { getDocs } from "firebase/firestore";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { docsGetter } from "../FireBase";

export type CardDataType = {
  Image: string;
  New_price: string;
  Product_Name: string;
  id: string;
  Old_price: string;
  currency: string;
  Description: string;
  Product_type:string;
};

export const useCardData = () => {
  const [cardData, setCardData] = useState<CardDataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCardData = async () => {
      try {
        const data = await getDocs(docsGetter);
        const filteredData = data.docs.map((doc) => ({
          ...(doc.data() as CardDataType),
          id: doc.id,
        }));
        setCardData(filteredData);
      } catch (error) {
        console.error("Error fetching card data:", error);
      } finally {
        setLoading(false);
      }
    };

    getCardData();
  }, []);

  return { cardData, loading };
};
