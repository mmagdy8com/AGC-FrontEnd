import { NavLink } from "react-router-dom";
import useApi from "../../hooks/useApi";
import Loader from "../Ui/Loader";
import InfoMessage from "../Ui/InfoMessage";
import "./Design/Categories.css";

const Categories = () => {
  const {
    data: categories,
    isPending: areCategoriesPending,
    error: categoriesError,
  } = useApi("/getCategory");

  return (
    <section className="categories position-relative">
      <div className="categories-after position-absolute"></div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div
              className="title"
              data-aos="zoom-out"
              data-aos-delay="2500"
              data-aos-duration="1000"
            >
              <h2>Categories</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {areCategoriesPending ? (
            <Loader />
          ) : categoriesError ? (
            <InfoMessage text={categoriesError} />
          ) : !categories ? (
            <InfoMessage text="No categories to show" />
          ) : (
            categories.map((category) => (
              category.name !== "Binance Gift Card" && category?.name !== "Noun" && category?.name !== "TikTok"? (
                <div
                  className="col-xxl-4 col-xl-4 col-lg-4 col-md-5 col-sm-6 col-12"
                  key={category._id}
                >
                  <NavLink
                    className="categories__card"
                    to={`/categories/${category.name}/${category._id}`}
                  >
                    <div
                      className={`categories-inner d-flex align-items-center justify-content-center position-relative`}
                      data-aos="fade-up"
                      data-aos-delay="1000"
                      data-aos-duration="1000"
                    >
                      <p>{category.name}</p>
                    </div>
                    <img
                      className="categories__image"
                      src={
                        `${process.env.REACT_APP_IMAGE_URL}/${category.image}` ||
                        "/assets/Style/new-banner.png"
                      }
                      alt={category.image}
                      onError={(e) => {
                        e.target.src = "/assets/Style/new-banner.png";
                      }}
                    />
                  </NavLink>
                </div>
              ) : null
            ))
            
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;
