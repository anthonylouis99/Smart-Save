// // components/cart/CartModal.tsx
// import { useCart } from "../../../context/switchContext";
// import { X } from "lucide-react";
// import toast from "react-hot-toast";
// import Button from "../Button/Button";
// import { Trash } from "lucide-react";

// export const CartModal = ({ onClose }: { onClose: () => void }) => {
//   const { cart, removeFromCart,clearCart } = useCart();

//   const handelPlaceorder=()=>{
// clearCart()
// onClose();
//  toast.success('Order placed succesfully');

//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//       <div className="bg-white p-4 rounded-lg w-[400px] max-h-[80vh] overflow-auto relative">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-black"
//         >
//           <X size={20} />
//         </button>

//         <h2 className="text-lg font-bold mb-4">Your Cart</h2>

//         {cart.length === 0 && <p className="text-gray-500">Your cart is empty.</p>}

//         {cart.map((item) => (
//           <div
//             key={item.id}
//             className="flex items-center justify-between mb-3 border-b pb-2"
//           >
//             <div className="flex items-center gap-2">
//               <img
//                 src={item.itemImgsrc}
//                 alt={item.ItemName}
//                 className="w-12 h-12 object-cover rounded"
//               />
//               <div>
//                 <p className="font-medium">{item.ItemName}</p>
//                 <p className="text-sm text-gray-600">
//                   {item.currency} {item.newPrice}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={() => removeFromCart(item.id)}
//               className="text-red-500 text-sm hover:underline"
//             >
//               Remove
//             </button>
//           </div>
//         ))}

//         {cart.length > 0 && (
//           <div className=" flex items-center justify-center gap-2 ">
//         <Button
//             onClick={handelPlaceorder}
//             className="mt-4 w-[80%] bg-[var(--primary)] bg-red-200 text-[var(--card-text)] py-2 rounded hover:bg-primary-dark transition"
//             variant="primary"
//           >
//             Place Order
//           </Button>

//              <span
//             onClick={clearCart}
//             className="text-xs flex items-center justify-center flex-col text-red-500"
//           >
//           <Trash className="h-4 w-4"/> Empty cart
//           </span>

//           </div>
       
//         )}
//       </div>
//     </div>
//   );
// };
