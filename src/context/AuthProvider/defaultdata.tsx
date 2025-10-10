import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../FireBase";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DefaultData(user:any) {
  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      email: user.email,
      displayName: user.displayName || "",
      createdAt: new Date(),
    });

    // Initialize default collections
    await setDoc(doc(db, `users/${user.uid}/dashboard/MainBalance`), {
      amount: 0,
    });
    await setDoc(doc(db, `users/${user.uid}/dashboard/SavingsBalance`), {
      amount: 0,
    });
    await setDoc(doc(db, `users/${user.uid}/dashboard/InvestmentBalance`), {
      amount: 0,
    });
    await setDoc(doc(db, `users/${user.uid}/dashboard/CardItems`), {
      items: [],
    });
    await setDoc(doc(db, `users/${user.uid}/dashboard/TableItems`), {
      items: [],
    });
  }
}
