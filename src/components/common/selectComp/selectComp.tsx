type SelectComponentProps<T extends string | number> = {
  optionArry: T[];
  label?: string;
  register?: Record<string, unknown>; 
};

export const SelectComponent = <T extends string | number>({
  optionArry,
  label,
  register,
}: SelectComponentProps<T>) => {
  return (
    <div>
      {label && <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>}
      <select
        {...register}  
        defaultValue=""
        className="w-full appearance-none px-4 py-2 border border-gray-300 rounded-md shadow-sm pr-10 text-[var(--card-text)] focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          Select source
        </option>
        {optionArry.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
