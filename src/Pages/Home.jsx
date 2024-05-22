import React, { useEffect, useState } from "react";
import Banner from "../Components/Home/shared/banner.jsx";
import Categories from "../Components/Home/Categories.jsx";
import HomeGiftCardsSection from "../Components/Home/HomeGiftCardsSection.jsx";
import Choose from "../Components/Home/shared/Choose.jsx";
import Testimonial from "../Components/Home/shared/Testimonial.jsx";
import Newsletter from "../Components/Home/shared/Newsletter.jsx";
import PartnerLogoSlider from "../Components/Home/shared/PartnerLogoSlider.jsx";
import api from "../Components/Interceptor/api.js";

const Home = () => {
  const [searchCategory, setSearchCategory] = useState("");
  const [collections, setCollections]= useState()
  useEffect(() => {
    const getCollection = async() => {
      try {
        const {data} = await api.get("/getCollection")
        setCollections(data.data)
      } catch(e) {
       console.log(e,"error"); 
      }
    }
    getCollection()
  }, [])
  
  function camelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }

  return (
    <>
      <main>
        <Banner setSearchCategory={setSearchCategory} />
        <Categories searchCategory={searchCategory} />
        {/* <HomeGiftCardsSection title="Trending Gift Cards" collection="" /> */}
        {/* <HomeGiftCardsSection title="Featured" collection="featured" />
        <HomeGiftCardsSection title="New Arrivals" collection="newArrival" />
        <HomeGiftCardsSection title="Best Selling" collection="bestSelling" />
        <HomeGiftCardsSection title="Offers" collection="offers" /> */}
        <div className="collection-wise-gifts">
        {collections?.map((item, index) => (
            <div key={index}>
            <HomeGiftCardsSection title={item.name} collection={camelCase(item.name)} id={item._id} />
              {/* {console.log(item.name, "===", camelCase(item.name))} */}
            </div>
          ))}
        </div>
        <Choose />
        <Testimonial />
        <Newsletter />
        <PartnerLogoSlider />
      </main>
    </>
  );
};

export default Home;
