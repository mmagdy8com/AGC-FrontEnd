import { useEffect, useState } from "react";

const useIsInWishlist = (gifts, wishlist) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!gifts?.length || !wishlist || !Array.isArray(wishlist))
      return setData(gifts);

    const updatedGifts = gifts.map((gift) => {
      const isMatched = wishlist?.find(
        (item) => item?.productDetails?._id === gift?._id
      );

      if (isMatched) {
        return { ...gift, isInWishlist: true };
      } else {
        return { ...gift, isInWishlist: false };
      }
    });

    setData(updatedGifts);
  }, [wishlist, gifts]);

  return { data };
};

export default useIsInWishlist;
