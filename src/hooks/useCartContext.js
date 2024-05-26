import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw Error("useSearchContext must be inside a SearchContextProvider");
  }

  return context;
};

export default useCartContext;
