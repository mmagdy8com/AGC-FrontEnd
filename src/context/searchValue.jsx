import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const CartProvider = ({ children }) => {
  const [searchVal, setSearchVal] = useState("");

  return (
    <SearchContext.Provider value={{ searchVal, setSearchVal }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useCart = () => {
  return useContext(SearchContext);
};
