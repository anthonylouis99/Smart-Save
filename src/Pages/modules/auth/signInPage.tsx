/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Button from "../../../components/common/Button/Button";
import Input from "../../../components/Input/Input";
import { Eye,EyeClosed } from "lucide-react";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"; 
// Update the import path below to the correct location of your firebase config file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { app, googleProvider } from "../../../FireBase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import TickComponent from "../../../components/common/TickComp/tickComponent";
import toast from 'react-hot-toast';
// import { useDarkMode } from "../../hooks/darkMode/darkMode";
//  import { FirebaseError } from "firebase/app";
const auth = getAuth(app);

const AuthPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "TestUser@gmail.com", password: "TestUser@gmail.com123" });
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const[isLoading,setIsLoading]=useState(false)
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSignInWithGoogle = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
    setIsLoading(true); // set before starting the request
    await signInWithPopup(auth, googleProvider);

    toast.success("Log in successful");
    navigate("/dashboard");
  } catch (err: any) {
    let message = "Something went wrong. Please try again.";

    if (err?.error?.message) {
      message = err.error.message;
    } else if (err?.message) {
      message = err.message;
    }

    toast.error(message);
    setIsLoading(false); // reset only on error
  }
  };



const handleSignInWithEmailAndPassword = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    setIsLoading(true)
    await signInWithEmailAndPassword(auth, form.email, form.password);
    
    navigate("/dashboard");
    toast.success("Log in successful");
  } catch (err:any) {
    let message = "Something went wrong. Please try again.";
 
    if (err?.error?.message) {
      message = err.error.message;
    } else if (err?.message) {
      message = err.message;
    }
    toast.error(message);
     setIsLoading(false)

  }
};

// const { theme } = useDarkMode();


return (
  <div className="text-[var(--card-text)] lg:w-[500px]   min-w-screen min-h-screen">
    <div className=" bg-[var(--background)] min-h-screen  flex justify-center items-center px-4">
     <div className='responsive-card'> 
        
         <div className=" w-full flex justify-center transition-all duration-300 text-2xl">
         <img  className="h-[80px] w-[120px] md:h-[160px] md:w-[160px] lg:h-[200px] lg:w-[200px]" src="/logo.png" alt=" Logo" />   
         </div>

        <h2 className="text-center text-gray-600 text-xl text-[var(--card-text)]  md:text-2xl font-semibold">
         Smart Save
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSignInWithEmailAndPassword}
          className="mt-2 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[var(--card-text)] font-medium">Email</label>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="border rounded-md px-3 py-2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm  text-[var(--card-text)] font-medium">Password</label>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="border rounded-md px-3 py-2"
              rightIcon={
                <div
                  onClick={() => setShowPassword((prv) => !prv)}
                  className="cursor-pointer"
                >
                  {showPassword ? (
                    <Eye className="w-4 h-4" />             
                  ) : (
                    <EyeClosed className="w-4 h-4" />
                  )}
                </div>
              }
            />
          </div>

          {form.password &&   <TickComponent password={form.password} onValidityChange={setIsPasswordValid} />}

          <Button type="submit"
           disabled={!isPasswordValid||isLoading}
            className="w-full">
       {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Extra buttons */}
        <div className="flex text-[var(--card-text)] flex-col gap-4">
          <p className="text-sm text-center">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signUp")}
              className="font-medium cursor-pointer"
            >
              Sign Up
            </span>
          </p>

          <Button
            variant="secondary"
            onClick={handleSignInWithGoogle}
            className=" text-white w-full"
            disabled={isLoading}
          >
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  </div>
);
}

export default AuthPage;
