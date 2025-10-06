import PopOverModal from "../../components/common/Modal/modal";
import { useDeleteItem } from "../../components/hooks/fireBaseFunctions/deleteFile";
import toast from "react-hot-toast";
// import { useState } from 'react';
import { useAuth } from "../../context/AuthProvider/auth";
import { useGetItems } from "../../components/hooks/fireBaseFunctions/getFile";



interface LogOutProps {
  isOpen: boolean;
  onClose: () => void;
  id:string
  isloading:boolean
}

export const DeletePlanModal: React.FC<LogOutProps> = ({ isOpen, onClose,id,isloading }) => {
const {user}=useAuth()
const {isDeleting,deleteItem,error}=useDeleteItem()
const {refetch}=useGetItems({itemGetter:'SmallCardsItems'})


const handleDelete = async () => {
   if (!user?.uid) {
      toast.error("User not authenticated.");
      return;}
  try {
        await deleteItem({userId:user?.uid, id});
        toast.success("Plan deleted successfully!");
        onClose()
        refetch()
  } catch (err:unknown) {
    console.log(err);
     toast.error(error?.message||'a problem occured');
  }

   
  };
  return (
    <>
      <PopOverModal
        isOpen={isOpen}
        title={"Delete Plan"}
        onClose={onClose}
        onAccept={handleDelete}
        isLoading={isDeleting || isloading}
      />
    </>
  );
};


