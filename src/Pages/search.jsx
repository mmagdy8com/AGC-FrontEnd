import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import useCartContext from "../hooks/useCartContext";
import useWishlistContext from "../hooks/useWishlistContext";
import useIsInWishlist from "../hooks/useIsInWishlist";
import useApi from "../hooks/useApi";
import Loader from "../Components/Ui/Loader";
import InfoMessage from "../Components/Ui/InfoMessage";
import GiftCard from "../Components/Home/shared/GiftCard";
import { convertToRouteString } from "../utils/helper";
import { useEffect, useState } from "react";
import Select from "react-select";
import api from "../Components/Interceptor/api";

const Search = () => {
  const navigate = useNavigate();
  // const [category, setCategory] = useState()
  // const [collection, setCollection]= useState()
  const [searchParams] = useSearchParams();
  const [categoryId, setCategoryId] = useState(null)
  const [subCategoryId, setSubCateforyId] = useState(null)
  const [collectionsId, setCollectionsId] = useState(null)
  const [loading, setLoading] = useState(true)
   const [currentSort, setCurrentSort] = useState(null);

  const q = searchParams.get("q");  
  const {
    data: category,
    isPending: areCategoriesPending,
    error: categoriesError,
  } = useApi("/getCategory");
  const {
    data: collection,
  } = useApi("/getCollection");

  const sortOptions = [
  { value: "-createdAt", label: "Newest" },
  { value: "createdAt", label: "Oldest" },
  { value: "price", label: "Price low to high" },
  { value: "-price", label: "Price high to low" },
];
  
  useEffect(() => {

    // const getCollection = async() => {
    //   try {
    //     const { data } = await api.get("/getCollection")

    //     setCollection(data.data)
    //   } catch(e) {
    //    console.log(e,"error"); 
    //   }
    // }
    // getCollection()

    // const getCatagories = async() => {
    //   try {
    //     const { data } = await api.get("/getCategory")
    //     console.log(data, "dataa===")
    //     setCollection(data.data)
    //   } catch(e) {
    //    console.log(e,"error"); 
    //   }
    // }
    // getCatagories()
      // catrgories::::::::::::
    if(category && collection && q !== null) {
      // setCategory(category)
      const categoryMatch = category.find(cat => cat?.name?.toLowerCase()===q.toLowerCase());
      if(categoryMatch) {
        setCategoryId(categoryMatch?._id);
      
      }
      // subcat::::::::::
      const subCategoryMatch = category.find(cat => cat.subCategories?.find(subCat => subCat?.subCategoryName?.toLowerCase()===q.toLowerCase()))
    
      if(subCategoryMatch) {
        setCategoryId(subCategoryMatch._id)
        const matchedSubCategory = subCategoryMatch.subCategories.find(subCat =>
            subCat?.subCategoryName?.toLowerCase()===q.toLowerCase()
        );
        
        if (matchedSubCategory) {
            const subCategoryId = matchedSubCategory.id;
         
          setSubCateforyId(subCategoryId)
        }
      }
      // collectionMatch::::::::::::::::

      const collectionMatch = collection?.find(col => col?.name?.toLowerCase().includes(q.toLowerCase()));
      if(collectionMatch) {
        setCollectionsId(collectionMatch._id)
      }
     
      setLoading(false)
    }
    if(q == "") {
      setLoading(false)
    }
  }, [category, collection])
    
  // console.log(categoryId, 'cat-id//////')
  // console.log(subCategoryId, 'subcat-id//////')
  // console.log(collectionsId,'collection-id//////')

  // const url =
  //   q.toLowerCase() === "binance"
  //     ? "/getBinanceAdvanced"
  //     : `/getSearchProducts/?searchText=${q}`;
  let url
  if(!loading) {
    if(q == "") {
      url= `/getSearchProducts`
      }
    else if(categoryId && !subCategoryId) {
      url = `/getSearchProducts/?categoryId=${categoryId}`
    }
    else if(categoryId && subCategoryId) {
      url = `/getSearchProducts/?categoryId=${categoryId}&subCategoryId=${subCategoryId}`
    }
    else if(collectionsId) {
      url = `/getSearchProducts/?collectionId=${collectionsId}`
    }
    else {
      url = `/getSearchProducts/?searchText=${q}`
    }
  }
  const { addToCart } = useCartContext();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistContext();

  const {
    data: gifts,
    isPending: areGiftsPending,
    error: giftsError,
  } = useApi(url);

  const { data: searchedGifts } = useIsInWishlist(gifts, wishlist);
  return (
    <>
      <section className="sub-banner-link">
        <div className="container d-md-flex justify-content-between">
          <div className="row align-items-center">
            <p className="category_path_title m-0">
              <NavLink to="/" className="homeLink">
                Home{" "}
              </NavLink>
              {`>`} <span>Search</span>
            </p>
          </div>
                   <div className="row d-md-flex justify-md-content-end">
          <Select
            className="categories__select"
            placeholder="Select sort by option"
            options={sortOptions}
            value={currentSort}
            onChange={(val) => setCurrentSort(val)}
            name="filter"
          />
        </div>
        </div>
      </section>
      <div className="profile wishlist-item wish-container">
        <div className="container">
          <div className="row justify-content-between item-list">
            <div
              className="account-heading d-flex align-items-center"
              data-aos="fade-up"
              data-aos-delay="2500"
              data-aos-duration="1000"
            >
              <h5 className="mb-5">{q}</h5>
            </div>
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 wishlist-card">
              <div className="row justify-content-center">
                {areGiftsPending ? (
                  <Loader />
                ) : giftsError ? (
                  <InfoMessage text={giftsError} />
                ) : !searchedGifts?.length ? (
                  <InfoMessage text="No gift cards found. Please try searching some different gift cards." />
                ) : (
                  <div className="row justify-content-center">
                          {searchedGifts?.map((data) => {
                            if(data?.minQty > 0) {
                              return (
                                <GiftCard
                                  key={data?._id}
                                  image={data?.image}
                                  inbuildImage={data?.productDetails?.image}
                                  title={data?.productDetails?.nameEn || data?.title}
                                  category={data?.productDetails?.categoryNameEn}
                                  price={data?.priceInSAR?.toFixed(2)}
                                  onClick={() =>
                                    navigate(
                                      `/gifts/${data?.productTag?.toLowerCase() === "binance"
                                        ? "binance"
                                        : "bitaqty"
                                      }/${convertToRouteString(
                                        data?.productDetails?.nameEn || data?.title
                                      )}/${data?._id}`
                                    )
                                  }
                                  addToCart={() => {
                                    if(data?.productTag?.toLowerCase() === "binance") {
                                      addToCart(data?._id, false, "binance");
                                    } else {
                                      addToCart(data?._id);
                                    }
                                  }}
                                  addToWishlist={() => {
                                    if(data?.productTag?.toLowerCase() === "binance") {
                                      addToWishlist(data._id, "binance");
                                    } else {
                                      addToWishlist(data._id);
                                    }
                                  }}
                                  removeFromWishlist={() =>
                                    removeFromWishlist(data._id)
                                  }
                                  isInWishlist={data?.isInWishlist}
                                  binanceGrid={true}
                                />
                              );
                            }
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
