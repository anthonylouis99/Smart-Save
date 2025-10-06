import React from "react";
// import { CiLogout } from "react-icons/ci";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { app } from "../../../FireBase";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import PopOverModal from "../../common/Modal/modal";
// import { useState } from 'react';
interface LogOutProps {
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const LogOutModal: React.FC<LogOutProps> = ({ isOpen, onClose }) => {
  // const[isLogOutModalOpen,setIsLogOutModalOpen]=useState(false)
  const auth = getAuth(app);
 
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate("/signIn");
    } catch (error) {
      console.error(error);
      prompt(String(error));
    }
  };

  return (
    <>
      <PopOverModal
        isOpen={isOpen}
        title={"Log Out"}
        onClose={onClose}
        onAccept={handleLogOut}
      />
    </>
  );
};

export default LogOutModal;
