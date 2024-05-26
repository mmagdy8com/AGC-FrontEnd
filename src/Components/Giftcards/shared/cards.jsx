import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import Cardjsondata from "../data/cards.json";
import "../Design/index.css";
import api from "../../Interceptor/api";
import { useCart } from "../../../context/createContext";
import toast from "react-hot-toast";

const Cards = ({ sharedValue }) => {
  const [show, setShow] = useState(false);
  const params = useParams();

  const { cartData, setCartData } = useCart();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(3);

  const [totalPage, setTotalPage] = useState(0);

  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setlastIndex] = useState(0);
  const [nPage, setNPage] = useState(0);

  const [page, setPage] = useState([]);

  const [pageshow, setPageShow] = useState([]);

  useEffect(() => {
    search();
  }, [sharedValue]);

  const [giftCardList, setGiftCardList] = useState([]);
  const [WishlistItem, setWishlistItem] = useState([]);
  const [itemsWishList, setItemsWishList] = useState(false);

  const [val, setVal] = useState(false);

  console.log("backend", process.env.REACT_APP_BACKEND_URL);
  console.log("image", process.env.REACT_APP_IMAGE_URL);

  useEffect(() => {
    if (itemsWishList == true) {
      getWishlist();
      // getGiftCardList();
      setItemsWishList(false);
    }
    getGiftCardList();
  }, [itemsWishList]);
  useEffect(() => {
    getWishlist(currentPage);
    getCartList();
  }, []);
  const getGiftCardList = (wish, pageNumbers) => {
    let offset;
    if (pageshow.length === 0) {
      offset = perPage * (currentPage - 1);
    } else {
      offset = pageNumbers - 1;
    }
    const token = localStorage.getItem("accessToken");
    api
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/getGifts/${params.companyId}/${params.categoryId}?offset=${offset}&limit=${perPage}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("getgiftcard", res.data);

        const allProduct = res.data.data.map((item) => {
          const matchingItem = wish?.find(
            (wishlistItem) => wishlistItem._id === item._id
          );
          if (matchingItem) {
            return { ...item, isWishlist: true };
          } else {
            return { ...item, isWishlist: false };
          }
        });

        setGiftCardList(allProduct);
        setTotalPage(res.data.totalPages);
        const pageNumbers = Array.from(
          { length: res.data.totalPages },
          (_, index) => index + 1
        );

        setPage(pageNumbers);
        // if (pageshow.length === 0) {
        //   const x = pageNumbers.slice(0, 2);
        //   setPageShow(x);
        // }
        if (pageshow.length === 0) {
          const lasstIndex = currentPage * perPage;
          const firstIndex = lasstIndex - perPage;
          setFirstIndex(firstIndex);
          setlastIndex(lasstIndex);
          const records = pageNumbers.slice(firstIndex, lasstIndex);
          const nPages = Math.ceil(pageNumbers.length / perPage);
          console.log("nPages", nPages);
          setNPage(nPages);
          // const numbers = [...Array(nPages + 1).keys()].slice(1);
          // console.log("numbers", numbers);
          // const x = numbers.slice(0, 2);
          // Get the first 2 elements from the 'numbers' array
          const numbers = pageNumbers.slice(0, 2);
          console.log("numbers ", numbers);
          setPageShow(numbers);

          // console.log("pageNumbers", pageNumbers);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showData = () => {
    setShow(!show);
  };

  const addItemToWishlist = (giftId) => {
    const info = {
      id: localStorage.getItem("userId"),
      productId: giftId,
    };
    api
      .post(`${process.env.REACT_APP_BACKEND_URL}/addToWishlist`, info, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setItemsWishList(true);
        toast.success(res.data.message);
        // console.log("addWishlistItem", res.data.data);
        // console.log("giftCardList========", giftCardList);
        // const allProduct = giftCardList.findIndex((item) => {
        //   if (item._id === giftId) {
        //     return item;
        //   }
        // });
        // console.log("allProduct", allProduct);
        // giftCardList[allProduct].isWishlist = true;
        // console.log("giftCardList11111111111111111111111", giftCardList);

        // setGiftCardList(giftCardList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getWishlist = (pageNumber) => {
    api
      .get(
        `${
          process.env.REACT_APP_BACKEND_URL
        }/getWishlist/${localStorage.getItem("userId")}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        console.log("WishlistItem", res.data.data);
        console.log("wishlistcurrentpagenumber", currentPage);
        setWishlistItem(res.data.data);
        getGiftCardList(res.data.data, pageNumber);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeItemFromWishlist = (id) => {
    const info = {
      userId: localStorage.getItem("userId"),
      productId: id,
    };
    api
      .post(`${process.env.REACT_APP_BACKEND_URL}/removeFromWishlist`, info, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log("remove wish item", res);
        toast.success(res.data.message);
        getWishlist(currentPage);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addItemToCartList = (itemId) => {
    const cartInfo = {
      id: localStorage.getItem("userId"),
      productId: itemId,
    };

    api
      .post(`${process.env.REACT_APP_BACKEND_URL}/addToCart`, cartInfo, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log("WishlistItem", res.data);
        toast.success(res.data.message);
        getCartList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCartList = () => {
    api
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/getCart/${localStorage.getItem(
          "userId"
        )}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        console.log("getcartlist", res.data);
        setCartData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const search = () => {
    console.log("params", params);
    api
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/searchGifts/${params.companyId}/${params.categoryId}?search=${sharedValue}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        console.log("searchdata", res.data);
        // setCartData(res.data.data);
        setGiftCardList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const nextPage = (e) => {
    console.log("nextPagecurrentPage", currentPage);
    if (currentPage == nPage) {
      e.preventDefault();
      return;
    }
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
      console.log(currentPage, "yo");
      const currentPair = page.slice(currentPage, currentPage + 2);
      console.log("currentPair", currentPair);
      setPageShow(currentPair);
      // setPageShow(currentPair);

      // getWishlist();
    }
  };

  const previousPage = (e) => {
    console.log(currentPage, "YO BRO", page, "page");
    if (currentPage == 1) {
      e.preventDefault();
      return;
    }
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
      const currentPair = page.slice(currentPage - 2, currentPage);
      console.log(currentPair, "YO");
      // console.log("currentPage", currentPage, currentPage - perPage);
      // console.log("currentPairpreviouspair", currentPair);
      setPageShow(currentPair);
      // getWishlist();
    }
  };

  const changeCurrentPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    getWishlist(pageNumber);
  };

  // const getInstantWishItem = (id) => {
  //   console.log("_____________");
  //   const allProduct = giftCardList.findIndex((item) => item._id === id);
  //   console.log("allProduct", allProduct);
  //   // setGiftCardList(allProduct);
  //   giftCardList[allProduct].isWishlist = true;
  //   console.log("giftCardList", giftCardList);
  //   setGiftCardList(giftCardList);
  // };

  return (
    <>
      <section className="pro-page-product">
        <div className="container">
          <div className="row align-items-center padding">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-7 col-12">
              <div
                className="pro-page-product-title d-flex align-items-center"
                data-aos="fade-right"
                data-aos-delay="2500"
                data-aos-duration="1000"
              >
                <img
                  src={`${process.env.REACT_APP_IMAGE_URL}/${giftCardList[0]?.categoryId?.image}`}
                  alt="mega-1"
                  style={{ objectFit: "cover" }}
                />
                <p>{giftCardList[0]?.categoryId?.name}</p>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-5 col-12">
              <div
                className="sort-by position-relative z-1"
                data-aos="fade-left"
                data-aos-delay="2500"
                data-aos-duration="1000"
              >
                <div className="dropdown">
                  <button
                    className="btn btn-secondary position-relative"
                    onClick={() => showData()}
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sort By
                  </button>
                  {show ? (
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink className="dropdown-item">
                          Recently Added
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item">
                          Best Selling
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item">
                          Price Ascending
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item">
                          Price Descending
                        </NavLink>
                      </li>
                    </ul>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              {giftCardList.map((item, index) => {
                return (
                  <div
                    className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-9"
                    key={index}
                  >
                    <NavLink
                      to={`/category/${params.categoryId}/${params.companyId}/${item._id}`}
                    >
                      <div
                        className="gift-card-inner"
                        data-aos="zoom-out"
                        data-aos-delay="1000"
                        data-aos-duration="1000"
                      >
                        <div className="card position-relative">
                          <img
                            src={`${process.env.REACT_APP_IMAGE_URL}/${item.image}`}
                            className="card-img-top"
                            alt="gift"
                            style={{ objectFit: "cover" }}
                          />
                          <NavLink className="like d-flex align-items-center rounded-circle justify-content-center position-absolute likeIcon addItemToWishlist">
                            {console.log(
                              "item.isWishlist",
                              item.isWishlist,
                              index
                            )}
                            {console.log(
                              "index",
                              index,
                              "item.isWishlist",
                              item.isWishlist
                            )}
                            {item.isWishlist === true ? (
                              <>
                                {console.log("1")}
                                <img
                                  src={"/assets/Style/heart.png"}
                                  alt="like"
                                  onClick={() =>
                                    removeItemFromWishlist(item._id)
                                  }
                                  className="liked"
                                />
                              </>
                            ) : (
                              <>
                                {console.log("2")}
                                <img
                                  src={"/assets/Trendinggiftcard/like.svg"}
                                  alt="like"
                                  onClick={() => addItemToWishlist(item._id)}
                                />
                              </>
                            )}
                          </NavLink>
                          <div className="card-body position-relative">
                            <h5 className="card-title">{item?.name}</h5>
                            <span className="card-dip">
                              {item?.categoryId?.name}
                            </span>
                            
                            <p className="card-text">{item?.priceInSAR} SAR</p>
                            <NavLink
                              className="add-top-cart-icon position-absolute d-flex align-items-center"
                              onClick={() => {
                                addItemToCartList(item._id);
                              }}
                            >
                              <img
                                src={
                                  "/assets/Trendinggiftcard/gift-card-icon.svg"
                                }
                                alt="gift-card-icon"
                              />
                              <span>Add</span>
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                );
              })}
            </div>
            <nav
              aria-label="Page navigation example"
              className="page-navigation"
            >
              <ul
                className="pagination justify-content-center"
                data-aos="zoom-out"
                data-aos-delay="100"
                data-aos-duration="1000"
              >
                <li className="page-item">
                  <NavLink
                    to=""
                    className={`page-link btn ${
                      currentPage == 1 ? "disabledbtn" : ""
                    }`}
                    onClick={(e) => previousPage(e)}
                    disabled
                  >
                    <img src={`/assets/Giftcard/right arrow.svg`} alt="" />
                  </NavLink>
                </li>
                {pageshow.map((item, index) => (
                  <li
                    className="page-item active"
                    onClick={() => changeCurrentPage(item)}
                    key={index}
                  >
                    <NavLink to="" className="page-link">
                      {item}
                    </NavLink>
                  </li>
                ))}
                <li className="page-item">
                  <NavLink
                    to=""
                    className={`page-link btn ${
                      currentPage == nPage ? "disabledbtn" : ""
                    }`}
                    onClick={(e) => nextPage(e)}
                  >
                    <img src={`/assets/Giftcard/left arrow.svg`} alt="" />
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cards;
