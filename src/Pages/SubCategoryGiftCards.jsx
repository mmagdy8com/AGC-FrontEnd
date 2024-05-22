import { useState } from "react";
import {
  NavLink,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import useCartContext from "../hooks/useCartContext";
import useWishlistContext from "../hooks/useWishlistContext";
import useApi from "../hooks/useApi";
import useIsInWishlist from "../hooks/useIsInWishlist";
import Select from "react-select";
import GiftCard from "../Components/Home/shared/GiftCard";
import Loader from "../Components/Ui/Loader";
import InfoMessage from "../Components/Ui/InfoMessage";
import useSearchContext from "../hooks/useSearchContext";
import { convertToRouteString } from "../utils/helper";

const sortOptions = [
  { value: "-createdAt", label: "Newest" },
  { value: "createdAt", label: "Oldest" },
  { value: "price", label: "Price low to high" },
  { value: "-price", label: "Price high to low" },
];

const parseUrlName = (name) => {
  return name
    .replace(/-/g, " ")
    .replace(/ and /g, "&")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const SubCategoryGiftCards = () => {
  const navigate = useNavigate();

  const { searchQuery, setSearchQuery } = useSearchContext();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?q=${searchQuery}`);
    } else {
      setSearchQuery(event.target.value);
    }
  };

  const params = useParams();
  const [searchParams, ,] = useSearchParams();

  const { addToCart } = useCartContext();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistContext();

  const { categoryId, subCategoryName } = params;
  const categoryName = searchParams.get("categoryName");
  const subCategoryId = searchParams.get("subCategoryId");
  const subCatImage = searchParams.get("subCatImage");

  const [currentSort, setCurrentSort] = useState(null);

  const query = `/getSearchProducts?subCategoryId=${subCategoryId}${
    currentSort ? `&sort=${currentSort.value}` : ""
  }`;
  const {
    data: gifts,
    isPending: areGiftsPending,
    error: giftsError,
  } = useApi(query);

  const { data: giftsWithWishListButton } = useIsInWishlist(gifts, wishlist);

  return (
    <>
      <div className="category_path_container d-flex justify-content-between align-items-center">
        <p className="category_path_title m-0">
          <NavLink to="/" className="homeLink">
            Home{" "}
          </NavLink>
          {`>`}{" "}
          <NavLink
            to={`/categories/${categoryName}/${categoryId}`}
            className="homeLink"
          >
            {parseUrlName(categoryName)}
          </NavLink>{" "}
          {`>`} <span>{parseUrlName(subCategoryName)}</span>
        </p>
        <div className="position-relative form-inner category_search_container ">
          <input
            type="text"
            className="category_search_input"
            placeholder="Search"
            name="searchGiftCard"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <img
            className="position-absolute category_search_icon"
            src="/assets/Banner/search.svg"
            alt="search"
          />
        </div>
      </div>
      <div className="position-relative">
        <div
          className="category_title_container"
          style={{ backgroundImage: `url(${subCatImage})` }}
        ></div>

        <h1 className="position-absolute category_title">
          {parseUrlName(subCategoryName)}
        </h1>
      </div>

      <div className="container">
        <div className="row d-flex justify-content-end border-bottom">
          <Select
            className="categories__select"
            placeholder="Select sort by option"
            options={sortOptions}
            value={currentSort}
            onChange={(val) => setCurrentSort(val)}
            name="filter"
          />
        </div>
        {/* {console.log(giftsWithWishListButton,'cards...')} */}
        <div className="row justify-content-center py-5">
          {areGiftsPending ? (
            <Loader />
          ) : giftsError ? (
            <InfoMessage text={giftsError} />
          ) : !giftsWithWishListButton?.length ? (
            <InfoMessage text="No gifts to show" />
          ) : (
            <div className="row justify-content-center">
                    {giftsWithWishListButton.map((data) => {
                      if(data?.minQty > 0) {
                        return data?.productDetails?.nameEn !== "dtone_aw" &&
                          data?.productDetails?.nameEn !== "150 Crystals" &&
                          data?.productDetails?.nameEn !== "Tamimi GiftCard SAR 25" &&
                          data?.productDetails?.nameEn !== "SHEIN GiftCard SAR 100" &&
                          data?.productDetails?.nameEn !== "service 2" ? (
                          <GiftCard
                            key={data?._id}
                            image={data?.image}
                            inbuildImage={data?.productDetails?.image}
                            title={data?.productDetails?.nameEn || data?.title}
                            category={data?.productDetails?.categoryNameEn}
                            price={`${data?.priceInSAR.toFixed(2)}`}
                            onClick={() =>
                              navigate(
                                `/gifts/${data?.productDetails?.productTag || data?.productTag
                                }/${convertToRouteString(
                                  data?.productDetails?.nameEn || data?.title
                                )}/${data?._id}`
                              )
                            }
                            addToCart={() => addToCart(data._id, false, data?.productDetails?.productTag || data?.productTag)}
                            addToWishlist={() => addToWishlist(data._id, data?.productDetails?.productTag || data?.productTag)}
                            removeFromWishlist={() => removeFromWishlist(data._id)}
                            isInWishlist={data.isInWishlist}
                          />
                        ) : null;
                      }
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SubCategoryGiftCards;
