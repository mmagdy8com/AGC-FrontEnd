import {
  COMPANY_EMAIL_ADDRESS,
  COMPANY_LOCATION,
  COMPANY_PHONE_NUMBER,
} from "../../utils/constants";
import "./Design/privacy.css";

const AboutUs = () => {
  return (
    <>
      <div className="about-container">
        <div className=" container">
          <div className="row">
            <div className="col-xxl-7 col-lg-7 col-md-8 col-12">
              <div className="about-us">
                <h2 className="about-us-heading">About Us</h2>
                <h3 className="sub-heading">Who are we?</h3>
                <p className="description">
                  Arab Gift Card offers a meticulously curated selection of digital gift cards spanning gaming, cryptocurrency, music and audio services, along with a diverse range of gifts and toys. Rooted in Saudi Arabia, we take pride in serving the vibrant MENA region.
                </p>
                <p className="description">
                  At Arab Gift Card, we're more than just a platform. We're your gateway to a world of gifting solutions that are designed for the diverse interests that define us all. Rest assured, because we've handpicked an extensive assortment of digital gift cards, each one a testament to our commitment to understanding your unique preferences and desires.
                </p>

                <h3 className="sub-heading">Our Mission</h3>

                <p className="description">
                  In a world where digital goods are becoming increasingly prevalent, we believe that there is a need for a one-stop shop for purchasing and gifting digital codes. Our mission is to provide users with a convenient, secure, and enjoyable way to:
                </p>
                <ul className="bullet-points">
                  <li>
                    Purchase digital codes for games, shopping, and <span>cryptocurrency.
                    </span></li>
                  <li>Gift digital codes to friends and family.</li>
                  <li>Manage their digital code portfolio.</li>
                </ul>
              </div>
            </div>
            <div className="col-12">
              <p className="description">
                We believe that our platform will make it easier for people to find and purchase the digital codes they need and that our gifting features will make it easier for people to show their appreciation for others. We are also committed to providing a secure and user-friendly experience so that our customers can be confident that their transactions are safe and that they can easily find the information they need.
              </p>
              <div className="col-xxl-7 col-lg-7 col-md-8 col-12">
                <h3 className="sub-heading">Our Values</h3>

                <h4 className="sub-sub-heading">24/7 Customer Support</h4>

                <p className="description mb">
                  At Arab Gift Card, your satisfaction is our utmost priority. This is why we're dedicated to ensuring that every interaction and transaction revolves around your needs and preferences.
                </p>

                <h4 className="sub-sub-heading">Innovation</h4>
                <p className="description mb">
                  Our team is committed to staying ahead of the curve, constantly exploring and integrating the latest trends and technologies.
                </p>

                <h4 className="sub-sub-heading">Reliability</h4>
                <p className="description mb">
                  Arab Gift Card stands as a pillar of trust, ensuring that every interaction is not only efficient but also entirely secure.
                </p>

                <h4 className="sub-sub-heading">Community Support</h4>
                <p className="description mb">
                  We believe in giving back to the communities that have supported us. Hence, we're committed to making a positive impact and supporting the regions we serve.
                </p>
              </div>

              <h2 className="sub-heading">Convenience and Affordability!</h2>

              <p className="description">
                It's time to embrace the convenience of choice with an Arab Gift Card. We've very carefully curated an extensive collection of digital gift cards. Each one of them is a testament to our commitment to understanding your unique needs and interests. So whether you're immersed in the gaming realm, love exploring the depths of music and audio services, or even delving into the complexities of Crypto and blockchain, or seeking joy in the world of Gifts, Toys and games – we've got you covered.
              </p>

              <p className="description">
                Moreover, at Arab Gift Card, we truly believe that exceptional gifting experiences should be accessible to all. That's why we've made affordability a cornerstone of our platform. We bring you a collection of digital gift cards designed to cater to a wide range of budgets, ensuring that everyone can find the perfect gift, no matter their means.
              </p>

              <h4 className="sub-heading">Where Can You Find Us?</h4>
              <h5 className="sub-sub-heading sub-heading-color">Extending to Saudia Arabia and Beyond!</h5>
              <p className="description">
                We are rooted in the heart of Saudi Arabia, and our commitment to serving the vibrant communities of the MENA region is unwavering. That's because we believe in the power of connection, and we are dedicated to bridging the gap between people and the things they love. Hence, our goal is to make it easy for you to find the perfect gift for any occasion, and we take pride in offering a wide range of options to suit every taste and budget.
              </p>

              <h5 className="sub-heading">Discover the Perfect Gift Card</h5>

              <p className="description">
                Explore our curated selection, including popular options like the Binance gift card for crypto enthusiasts and Game gift cards for gaming aficionados. With options that cater to various interests, you're sure to find the ideal gift for your loved ones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
