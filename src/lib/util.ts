// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

type WindowSizeCategory = "small" | "medium" | "large";

export const useWindowSizeCategory = () => {
  const getCategory = (width: number) => {
    if (width < 620) return "small";
    if (width >= 620 && width < 1110) return "medium";
    return "large";
  };

  const [windowSizeCategory, setWindowSizeCategory] =
    useState<WindowSizeCategory>(getCategory(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setWindowSizeCategory(getCategory(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSizeCategory;
};
