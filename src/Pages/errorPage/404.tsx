import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import { Home } from "lucide-react";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 px-6">
      <div className="text-center">
        <h1 className="text-[100px] font-extrabold text-[var(--primary)] leading-none">
          404
        </h1>
        <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-gray-500 mt-2 max-w-md mx-auto">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-8">
          <Button
            onClick={() => navigate("/dashboard")}
            leftIcon={ <Home size={18} />}
          >
           
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
