import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

const getIdandCatList = (products) => {
  let productIds = [];
  let categories = [];
  products?.map((prod) => {
    productIds.push(prod?.id?._id);
    categories.push(prod?.id?.productDetails?.categoryNameEn);
  });

  return {
    productIds,
    categories,
  };
};

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [isCartPending, setIsCartPending] = useState(false);
  const [cartError, setCartError] = useState(null);
  const [matchProduct, setMatchProduct] = useState(null);
  const [currentUsername, setCurrentUserName] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // const userId = localStorage.getItem("userId");

    if (!currentUserId) return;

    (async () => {
      try {
        setCartError(null);
        setIsCartPending(true);

        const res = await api.get(
          `${process.env.REACT_APP_BACKEND_URL}/getCart/${currentUserId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        setCart(res.data.data);
        setIsCartPending(false);
      } catch (error) {
        console.error("Error while fetching cart: ", error);

        let errorMessage;
        if (error.response) {
          errorMessage = error.response.statusText;
        } else {
          errorMessage = error.message;
        }

        setCartError(errorMessage);
        setIsCartPending(false);
      }
    })();

    setCurrentUserName(localStorage.getItem("userName") || "Guest");
  }, [currentUserId]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    (async () => {
      try {
        setCartError(null);
        setIsCartPending(true);

        const res = await api.get(
          `${process.env.REACT_APP_BACKEND_URL}/getCart/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        setCart(res.data.data);
        setIsCartPending(false);
      } catch (error) {
        console.error("Error while fetching cart: ", error);

        let errorMessage;
        if (error.response) {
          errorMessage = error.response.statusText;
        } else {
          errorMessage = error.message;
        }

        setCartError(errorMessage);
        setIsCartPending(false);
      }
    })();

    setCurrentUserName(localStorage.getItem("userName") || "Guest");
  }, []);

  useEffect(() => {
    if (!cart) return;

    (async () => {
      try {
        const { productIds, categories } = getIdandCatList(cart);

        const res = await api.post(
          `${process.env.REACT_APP_BACKEND_URL}/gift-cards/getSimilarCardsForcart`,
          {
            productCategory: categories,
            productIdToAvoid: productIds,
          }
        );

        setMatchProduct(res.data.data);
      } catch (error) {
        console.error("Error while getting similar gift cards: ", error);
      }
    })();
  }, [cart]);

  const updateUserName = (name) => {
    setCurrentUserName(name || "Guest");
  };

  const updateCurrentUserId = (id) => {
    setCurrentUserId(id || null);
  };

  const addToCart = async (
    id,
    isQuantityFn = false,
    productType = "bitaqty"
  ) => {
    if (!localStorage.getItem("accessToken")) {
      return navigate("/signin");
    }
    const findItem = cart?.find((item) => item.id === id);
    if (findItem && findItem.quantity + 1 > findItem.productDetails?.minQty) {
      toast.error("Selected quantity not available");
      return;
    }

    try {
      const cartInfo = {
        id: localStorage.getItem("userId"),
        productId: id,
        // quantity: 1,
        productType,
      };

      const item = await api.post(
        `${process.env.REACT_APP_BACKEND_URL}/addToCart`,
        cartInfo,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      toast.success(item.data.message);

      if (isQuantityFn) return;

      // Push item to cart state
      const updatedCart = item.data.data;
      setCart(updatedCart);
      setCartError(null);
    } catch (error) {
      console.error("Error while adding to cart: ", error);

      if (error.response?.data === "Unauthorized") {
        localStorage.clear();
        window.location.replace("/signin");
      }
    }
  };

  const removeFromCart = async (id, isQuantityFn = false, removeAll = true) => {
    try {
      const cartInfo = {
        userId: localStorage.getItem("userId"),
        productId: id,
      };

      if (removeAll) {
        cartInfo.removeAll = true;
      } else {
        cartInfo.quantity = 1;
      }

      const item = await api.post(
        `${process.env.REACT_APP_BACKEND_URL}/removeFromCart`,
        cartInfo,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      toast.success(item.data.message);

      if (isQuantityFn) return;

      // Remove item to cart state
      const updatedCart = cart.filter((item) => item?.id !== id);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error while adding to cart: ", error);

      if (error.response?.data === "Unauthorized") {
        localStorage.clear();
        window.location.replace("/signin");
      }
    }
  };

  const increaseQuantity = async (id, productType = "bitaqty") => {
    const findItem = cart.find((item) => item.id === id);
    if (findItem.quantity + 1 > findItem.productDetails?.minQty) {
      toast.error("Selected quantity not available");
      return;
    }
    try {
      const updatedCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: (item.quantity || 0) + 1 };
        }

        return item;
      });

      setCart(updatedCart);

      await addToCart(id, true, productType);
    } catch (error) {
      console.error("Error while increasing quantity: ", error);
    }
  };

  const decreaseQuantity = async (id) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === id) {
          const quantity = (item.quantity || 0) - 1;

          if (quantity <= 0) {
            return null;
          }

          return { ...item, quantity };
        }

        return item;
      })
      .filter((item) => item !== null);

    setCart(updatedCart);

    await removeFromCart(id, true, false);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartPending,
        cartError,
        matchProduct,
        currentUsername,
        currentUserId,
        updateCurrentUserId,
        updateUserName,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
