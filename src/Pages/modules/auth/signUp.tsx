/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Button from "../../../components/common/Button/Button";
import Input from "../../../components/Input/Input";
import { Eye,EyeClosed } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
 // Update the import path below to the correct location of your firebase config file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { app } from "../../../FireBase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile
} from "firebase/auth";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TickComponent from "../../../components/common/TickComp/tickComponent";
import toast from 'react-hot-toast';
// import { useDarkMode } from "../../hooks/darkMode/darkMode";
const auth = getAuth(app);

const SignUp: React.FC = () => {

  const [showPassword, setShowPassword] = useState(false);
  // const [form, setForm] = useState({ email: "", password: "" ,name:"" });
   const [isPasswordValid, setIsPasswordValid] = useState(false);
   const [isLoading,setIsLoading]=useState(false)
  const navigate = useNavigate();



type FormData = z.infer<typeof authSchema>;
const authSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<FormData>({
      resolver: zodResolver(authSchema),
    });


  
const passwordValue = watch("password");

 

  const handleSignUpWithEmailAndPassword = async (data:FormData) => {
  

    try {
      setIsLoading(true)
      const userCredential=await createUserWithEmailAndPassword(auth,  data?.email,data?.password);
        await updateProfile(userCredential.user, {
    displayName: data.name,
  });
       navigate("/signIn");
     toast.success('Sign Up complete');
    }catch (err:any) {
    let message = "Something went wrong. Please try again.";

    if (err?.error?.message) {
      // Directly from Firebase REST-style response
      message = err.error.message;
    } else if (err?.message) {
      // fallback for normal FirebaseError
      message = err.message;
    }

    toast.error(message);
    setIsLoading(false)

  }
  };
// const { theme } = useDarkMode();

  return (
 <div className="bg-[var(--main-background)] text-[var(--card-text)] min-w-screen min-h-screen ">
    <div className="bg-[var(--dashboard-background)] min-h-screen w-full flex justify-center items-center px-4">
      <div className=" bg-[var(--main-background)]  text-gray-600 p-4 sm:p-6 md:p-8 shadow-sm flex flex-col gap-6 w-full sm:w-[80%] md:w-[50%] lg:w-[40%] xl:w-[30%] rounded-lg bg-white max-w-4xl">
          <div
                className="flex items-center gap-2 cursor-pointer text-[var(--card-text)]"
                onClick={() => navigate("/signIn")}
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Sign In</span>
            </div>
        
        <div className=" w-full flex justify-center transition-all duration-300 text-2xl">
         <img  className="h-[120px] w-[120px] md:h-[160px] md:w-[160px] lg:h-[200px] lg:w-[200px]" src="/logo.png" alt=" Logo" />   
         </div>
   
          
    
          <h2 className="text-center text-xl text-[var(--card-text)]  md:text-2xl font-semibold">
            Sign Up
          </h2>

          <form
            onSubmit={handleSubmit(handleSignUpWithEmailAndPassword) }
            className=" mt-2 flex flex-col gap-2 pb-4 "
          >

          <div className="flex text-[var(--card-text)] flex-col gap-2 ">
              <label>Name</label>

              <Input
                {...register("name")}
                type="text"
               required
                className="border rounded-sm"
              />
                {<p className="text-red-500 text-sm">{errors?.name?.message}</p>}
            </div>


            <div className="flex text-[var(--card-text)] flex-col gap-2 ">
              <label>Email</label>

              <Input
              {...register("email")}
                type="email"
                name="email"
                required
                className="border rounded-sm"
              />
                 <p className="text-red-500 text-sm">{errors?.email?.message}</p>
            </div>

            <div className="flex-col text-[var(--card-text)]  flex gap-2 ">
              <label>Password</label>
              <Input
              {...register("password")}
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="border rounded-sm"
                rightIcon={
                  <div onClick={() => setShowPassword((prv) => !prv)}>
                    {showPassword ? ( 
                       <Eye className="w-4 h-4" /> 
                    ) : ( 
                     <EyeClosed className="w-4 h-4" /> 
                  
                     )} 
                  </div>
                }
              />

                { <p className="text-red-500 text-sm">{errors?.password?.message}</p>}
            </div>

            {passwordValue &&   <TickComponent password={passwordValue} onValidityChange={setIsPasswordValid} />}

            <Button className="mt-6" disabled={!isPasswordValid||isLoading}  type="submit">{isLoading?'signing up ...':"Sign Up"}</Button>
          </form>
        
        </div>
      </div>
    </div>
  );
};

export default SignUp;
