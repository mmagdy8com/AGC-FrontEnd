import { useContext } from "react";
import { WishlistContext } from "../contexts/WishlistContext";

const useWishlistContext = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw Error(
      "useWishlistContext must be inside a WishlistContextContextProvider"
    );
  }

  return context;
};

export default useWishlistContext;
