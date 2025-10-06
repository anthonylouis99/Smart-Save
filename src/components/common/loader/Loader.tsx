
import clsx from "clsx";
type sizeType = "xs" | "sm" | "lg";
type LoadingSpinnerProps = {
  text?: string;
  className?: string;
  size?: sizeType; 
};

export const LoadingSpinner = ({
  text,
  size = "sm",
  className = "bg-current",
}: LoadingSpinnerProps) => {

  const sizeClasses = {
    xs: "h-4 w-4",
    sm: "h-6 w-6",
    lg: "h-10 w-10",
  };
  return (
    <>
     <div className="flex h-full flex-1 flex-col items-center justify-center gap-2 py-4">
  


      <svg
       viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg"
       fill="none"
     className={
      clsx(
           " text-indigo-600 rounded-full animate-spin",
         sizeClasses[size],className

      )
     }
      >
        <circle cx="140" cy="50" r="40" fill="white" />


      </svg>
      {text && <p className="text-sm text-gray-500">{text}</p>}
    </div>
    </>
  );
};
