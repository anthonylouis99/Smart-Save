import React, { useEffect, useState } from "react";
// import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Check } from "lucide-react";
import { X } from "lucide-react";

type TickComponentProps = {
  password?: string;
  onValidityChange?: (isValid: boolean) => void;
};

const TickComponent: React.FC<TickComponentProps> = ({ password, onValidityChange }) => {
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);
  const [hasCaps, setHasCaps] = useState(false);
  const [has8Characters, setHas8Characters] = useState(false);

  useEffect(() => {
    const numberRegex = /\d/;
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const capsRegex = /[A-Z]/;

    const num = numberRegex.test(password ?? "");
    const sym = symbolRegex.test(password ?? "");
    const cap = capsRegex.test(password ?? "");
    const len = (password ?? "").length >= 8;

    setHasNumber(num);
    setHasSymbol(sym);
    setHasCaps(cap);
    setHas8Characters(len);

    // notify parent if all conditions are met
    onValidityChange?.(num && sym && cap && len);
  }, [password, onValidityChange]);

  return (
    <div>
      <p className="text-sm mb-2">Password should contain:</p>

      <ul className="flex flex-col gap-2 text-sm">
        <li className="flex items-center gap-2">
          <span>At least one number</span>
          {hasNumber ? (
            <Check className="h-4 w-4 p-1 rounded-full bg-green-500 text-white" />
          
          ) : (
            <X className="h-4 w-4 text-red-500" />
         
          )}
        </li>
        <li className="flex items-center gap-2">
          <span>At least one symbol</span>
          {hasSymbol ? (
            <Check className="h-4 w-4 p-1 rounded-full bg-green-500 text-white" />
         
          ) : (
             <X className="h-4 w-4 text-red-500" />
              
          )}
        </li>
        <li className="flex items-center gap-2">
          <span>At least one uppercase letter</span>
          {hasCaps ? (
            <Check className="h-4 w-4 p-1 rounded-full bg-green-500 text-white" />
          
          ) : (
             
           <X className="h-4 w-4 text-red-500" />
          )}
        </li>
        <li className="flex items-center gap-2">
          <span>At least 8 characters</span>
          {has8Characters ? (
            <Check className="h-4 w-4 p-1 rounded-full bg-green-500 text-white" />
          
          ) : (
              
           <X className="h-4 w-4 text-red-500" />
          )}
        </li>
      </ul>
    </div>
  );
};

export default TickComponent;
