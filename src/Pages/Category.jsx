import { NavLink, useNavigate, useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import Loader from "../Components/Ui/Loader";
import InfoMessage from "../Components/Ui/InfoMessage";
import useSearchContext from "../hooks/useSearchContext";

const hyphenateUrlName = (name) => {
  return name.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");
};

const Category = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { searchQuery, setSearchQuery } = useSearchContext();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?q=${searchQuery}`);
    } else {
      setSearchQuery(event.target.value);
    }
  };

  const { categoryId } = params;

  const {
    data: category,
    isPending: isCategoryPending,
    error: categoryError,
  } = useApi(`/categories/${categoryId}`);

  const { name, subCategories } = category || {};

  return (
    <>
      <div className="category_path_container">
        <p className="category_path_title m-0">
          <NavLink to="/" className="homeLink">
            Home{" "}
          </NavLink>
          {`>`} <span>{name}</span>{" "}
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
          style={{
            backgroundImage: `url(${process.env.REACT_APP_IMAGE_URL}/${category?.image})`,
          }}
        ></div>

        <h1 className="position-absolute category_title">{name}</h1>
      </div>

      <div className="container">
        <div className="row justify-content-center py-5">
          {isCategoryPending ? (
            <Loader />
          ) : categoryError ? (
            <InfoMessage text={categoryError} />
          ) : !category ? (
            <InfoMessage text="No sub categories to show" />
          ) : (
            subCategories?.map((subCategory, index) => (
              <div
                className="col-xxl-4 col-xl-4 col-lg-4 col-md-5 col-sm-6 col-12"
                key={index}
              >
               
                <NavLink
                  className="categories__card"
                  to={`/gift-cards/${categoryId}/${hyphenateUrlName(
                    subCategory.subCategoryName
                  )}?categoryName=${hyphenateUrlName(name)}&subCategoryId=${
                    subCategory.id
                  }&subCatImage=${
                    process.env.REACT_APP_IMAGE_URL
                  }/${subCategories[index]?.subCategoryImage}`}
                >
                  <div
                    className={`categories-inner d-flex align-items-center justify-content-center position-relative`}
                    data-aos="fade-up"
                    data-aos-delay="1000"
                    data-aos-duration="1000"
                  >
                    <p className="category_title">
                      {subCategory.subCategoryName}
                    </p>
                    <img
                      className="categories__image"
                      src={
                        `${process.env.REACT_APP_IMAGE_URL}/${subCategory.subCategoryImage}` ||
                        "/assets/Style/new-banner.png"
                      }
                      alt={subCategory.image}
                      onError={(e) => {
                        e.target.src = "/assets/Style/new-banner.png";
                      }}
                    />
                  </div>
                </NavLink>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Category;
