// SearchContext.tsx
import { createContext, useContext, useState } from "react";

const SearchContext = createContext<unknown>(null);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

export const UseSearch = () => useContext(SearchContext);
