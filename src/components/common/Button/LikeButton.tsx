// import { CiHeart } from "react-icons/ci";
import { Heart } from "lucide-react";
// import { HeartPulse } from "lucide-react";
import { useState } from "react";

export const LikeButton = () => {
const [liked,setLiked]=useState(false)

const handelLike=()=>{
setLiked((prv)=>(!prv))
}

  return (
    <div className="transition-colors duration-300">
      <div onClick={handelLike}  className="flex items-center bg-[var(--heart)]  justify-center w-8 h-8 rounded-full hover:bg-gray-300 transition-colors">
       {liked?    <span className="">❤️</span> : <Heart className={`text-[var(--heart-outLine)]`} size={18} />
   }
      </div>
    </div>
  );
};
