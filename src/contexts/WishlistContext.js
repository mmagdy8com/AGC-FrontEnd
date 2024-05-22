import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import useCartContext from "../hooks/useCartContext";

export const WishlistContext = createContext();

export const WishlistContextProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(null);
  const [isWishlistPending, setIsWishlistPending] = useState(false);
  const [wishlistError, setWishlistError] = useState(null);

  const { currentUserId } = useCartContext();
  useEffect(() => {
    if (!currentUserId) return;

    async function fetch() {
      try {
        setWishlistError(null);
        setIsWishlistPending(true);

        const res = await api.get(
          `${process.env.REACT_APP_BACKEND_URL}/getWishlist/${currentUserId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        setWishlist(res.data.data);
        setIsWishlistPending(false);
      } catch (error) {
        console.error("Error while fetching wishlist: ", error);

        let errorMessage;
        if (error.response) {
          errorMessage = error.response.statusText;
        } else {
          errorMessage = error.message;
        }

        setWishlistError(errorMessage);
        setIsWishlistPending(false);
      }
    }

    fetch();
  }, [currentUserId]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    async function fetch() {
      try {
        setWishlistError(null);
        setIsWishlistPending(true);

        const res = await api.get(
          `${process.env.REACT_APP_BACKEND_URL}/getWishlist/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        setWishlist(res.data.data);
        setIsWishlistPending(false);
      } catch (error) {
        console.error("Error while fetching wishlist: ", error);

        let errorMessage;
        if (error.response) {
          errorMessage = error.response.statusText;
        } else {
          errorMessage = error.message;
        }

        setWishlistError(errorMessage);
        setIsWishlistPending(false);
      }
    }

    fetch();
  }, []);

  const addToWishlist = async (id, productType = "bitaqty") => {
    try {
      const info = {
        id: localStorage.getItem("userId"),
        productId: id,
        productType,
      };

      const res = await api.post(
        `${process.env.REACT_APP_BACKEND_URL}/addToWishlist`,
        info,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setWishlist(res.data.data);

      toast.success(res.data.message);
    } catch (error) {
      console.error("Error while adding to wishlist: ", error);

      if (error.response?.data === "Unauthorized") {
        localStorage.clear();
        window.location.replace("/signin");
      }
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      const info = {
        userId: localStorage.getItem("userId"),
        productId: id,
      };

      const res = await api.post(
        `${process.env.REACT_APP_BACKEND_URL}/removeFromWishlist`,
        info,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setWishlist(res.data.data);

      toast.success(res.data.message);
    } catch (error) {
      console.error("Error while removing from wishlist: ", error);

      if (error.response?.data === "Unauthorized") {
        localStorage.clear();
        window.location.replace("/signin");
      }
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isWishlistPending,
        wishlistError,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
