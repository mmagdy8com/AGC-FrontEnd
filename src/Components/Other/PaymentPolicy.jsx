import {
  COMPANY_EMAIL_ADDRESS,
  COMPANY_LOCATION,
  COMPANY_PHONE_NUMBER,
  COMPANY_REGISTRATION_NUMBER,
  COMPANY_VAT_NUMBER,
} from "../../utils/constants";
import "./Design/privacy.css";

const PaymentPolicy = () => {
  return (
    <>
      <div className="cookie-container">
        <div className="container">
          <div className="row">
            <div className="col-xxl-7 col-lg-7 col-md-8 col-12">
              <h2 className="cookie-heading">Payment Policy</h2>
              <h3 className="sub-heading">Overview</h3>
              <p className="description">
                Arab Gift Card has two secure payment methods through the site
                payment gateway and the agreements that we do with the best
                Saudi Arabia banks.   
              </p>

              <p className="description">
                The payment gateway on the site is completely secured through
                specialized security programs and through banks and the payment
                gateway. So, you do not need to worry, and you can shop with us
                safely.     
              </p>

              <p className="description">
                During the payment process, you are dealing directly with the
                bank and the payment gateway. We cannot know your bank details;
                all your data is encrypted and we cannot save it on our
                website.     
              </p>

              <p className="description">
                We have a powerful fraud analysis and detection system to
                protect you and the Arab Gift Card, so you can shop with us
                safely.   
              </p>

              <h3 className="sub-heading">Payment Methods </h3>

              <p className="description">
                Arab Gift Card offers two payment methods, which are fast, easy,
                and secure making the whole shopping experience seamless. With
                the advanced encryption technology, Arab Gift Card ensures that
                it does not keep your payment information and the purchasing
                process is always safe and secure for your peace of mind. 
              </p>

              <p className="description">
                You can pay for your purchases using one of the following
                methods: 
              </p>

              <p style={{ marginLeft: "30px" }}>
                • Authorized Credit/Debit Card 
              </p>
              <p style={{ marginLeft: "30px", color: "red" }}>
                • Cryptocurrency   
              </p>

              <h3 className="sub-heading">Contacting Us </h3>

              <p className="description">
                If you have any questions about this payment policy, the
                practices of this website, or your dealings with this website,
                please contact us using the following details: 
              </p>
            </div>
            <div className="col-12">
              <h4 className="sub-heading">Contacting Us</h4>
              <p className="description">
                If you have any questions about your privacy, please contact us
                using the following details:
              </p>
              <ul className="cokkie-content-us">
                <li>
                  <p>
                    <img src="/assets/Cookie-policy/user.svg" alt="" />
                    Full name
                  </p>{" "}
                  <span>Arab Gift Card</span>
                </li>
                <li>
                  <p>
                    <img src="/assets/Cookie-policy/email.svg" alt="" />
                    Email address
                  </p>{" "}
                  <span>{COMPANY_EMAIL_ADDRESS}</span>
                </li>
                <li>
                  <p>
                    <img src="/assets/Cookie-policy/location.svg" alt="" />
                    Postal address
                  </p>{" "}
                  <span>{COMPANY_LOCATION}d</span>
                </li>
                <li>
                  <p>
                    <img src="/assets/Cookie-policy/call.svg" alt="" />
                    Telephone number
                  </p>{" "}
                  <span>{COMPANY_PHONE_NUMBER}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPolicy;
