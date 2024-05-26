import {
  COMPANY_EMAIL_ADDRESS,
  COMPANY_LOCATION,
  COMPANY_PHONE_NUMBER,
  COMPANY_REGISTRATION_NUMBER,
  COMPANY_VAT_NUMBER,
} from "../../utils/constants";
import "./Design/privacy.css";

const CookiePolicy = () => {
  return (
    <>
      <div className="cookie-container">
        <div className="container">
          <div className="row">
            <div className="col-xxl-7 col-lg-7 col-md-8 col-12">
              <h2 className="cookie-heading">Cookie Policy</h2>
              <h3 className="sub-heading">Who are we?</h3>
              <p className="description">
                This website www.arabgiftcard.com and its subdomains (“Our Site”) uses Cookies and similar technologies in order to distinguish you from other users. By using Cookies, we are able to provide you with a better experience and to improve Our Site by better understanding how you use it.
              </p>
              <p className="description">
                Please read this Cookie Policy carefully and ensure that you understand it. Your acceptance of Our Cookie Policy is deemed to occur if you continue using Our Site OR when you press the ‘’ accept ‘’ button on Our Cookie OR when you have selected your preferred Cookie options in Our Cookie. If you do not agree to Our Cookie Policy, please stop using Our Site immediately.
              </p>
              <div className="cokkie-content-section">
                <h4 className="sub-heading">Definitions and Interpretation</h4>
                <p className="description">
                  In this Cookie Policy, unless the context otherwise requires, the following expressions have the following meanings:
                </p>
                <table className="table-container">
                  <tr>
                    <td>Cookie</td>
                    <td>
                      Means a small file placed on your computer or device by Our Site when you visit certain parts of Our Site and/or when you use certain features of Our Site.
                    </td>
                  </tr>
                  <tr>
                    <td>Cookie Law</td>
                    <td>
                      Means the relevant parts of the Privacy and Electronic Communications (EC Directive) Regulations [and, where applicable, the Saudi Arabia PDPL].
                    </td>
                  </tr>
                  <tr>
                    <td>Personal Data</td>
                    <td>
                      Means all data that relates to an identifiable person who can be directly or indirectly identified from that data, as defined by the Saudi Arabia PDPL.
                    </td>
                  </tr>
                  <tr>
                    <td>We/Us/Our </td>
                    <td>
                      Means Arab Gift Card, a limited company registered in Saudi
                      Arabia under company number <span>{COMPANY_REGISTRATION_NUMBER}</span>.
                    </td>
                  </tr>
                </table>
              </div>
              <div className="cokkie-content-section">
                <h4 className="sub-heading">Information About Us</h4>
                <p className="description d-flex justify-content-between align-items-center">
                  <span className="dis-number">1</span><span className="discrption-inner">
                    Our Site is owned and operated by Arab Gift Card, a limited company registered in
                    {COMPANY_LOCATION}.
                  </span>
                </p>
                <p className="description d-flex justify-content-between align-items-center"><span className="dis-number">2</span><span className="discrption-inner">Our VAT number is {COMPANY_VAT_NUMBER}.</span></p>
                <p className="description d-flex justify-content-between align-items-center">
                  <span className="dis-number">3</span> <span className="discrption-inner">Our Data Protection Officers are the internal Operation Team
                    and can be contacted by email at support@arabgiftcard.com, or at info@arabgiftcard.com, or by telephone on {COMPANY_PHONE_NUMBER}.</span>
                </p>
              </div>
            </div>
            <div className="col-12">
              <div className="cokkie-content-section">
                <h4 className="sub-heading">How Does Our Site Use Cookies?</h4>
                <p className="description d-flex justify-content-between align-items-center">
                  <span className="dis-number">1</span>
                  <span className="discrption-inner">
                    Our Site may place and access certain first party Cookies on your computer or device. First party Cookies are those placed directly by Us and are used only by Us. We use Cookies to facilitate and improve your experience of Our Site and to provide and improve Our products AND/OR We have carefully chosen these Cookies and have taken steps to ensure that your privacy and personal data is protected and respected at all times.
                  </span>
                </p>
                <p className="description d-flex justify-content-between align-items-center">
                  <span className="dis-number">2</span>
                  <span className="discrption-inner">
                    By using Our Site, you may also receive certain third-party Cookies on your computer or device. Third party Cookies are those placed by websites, services, and/or parties other than Us. Third party Cookies may be set by advertising platforms for analytics purposes only. For more details, please refer to section 4 below.
                  </span>
                </p>
                <p className="description d-flex justify-content-between align-items-center">
                  <span className="dis-number">3</span>
                  <span className="discrption-inner">
                    All Cookies used by and on Our Site are used in accordance with current Cookie Law. We may use some or all of the following types of Cookies:
                  </span>
                </p>
                <p className="sub-sub-heading">Strictly Necessary Cookies</p>
                <p className="description">
                  A Cookie falls into this category if it is essential to the operation of Our Site, supporting functions such as logging in, your shopping basket, and payment transactions.
                </p>
                <p className="sub-sub-heading">Analytics Cookies</p>
                <p className="description">
                  It is important for Us to understand how you use Our Site, for example, how efficiently you are able to navigate around it, and what features you use. Analytics Cookies enable us to gather this information, helping Us to improve Our Site and your experience of it.
                </p>
                <p className="sub-sub-heading">Functionality Cookies</p>
                <p className="description">
                  Functionality Cookies enable Us to provide additional functions to you on Our Site such as personalisation and remembering your saved preferences. Some functionality Cookies may also be strictly necessary Cookies, but not all necessarily fall into that category.
                </p>
                <p className="sub-sub-heading">Targeting Cookies</p>
                <p className="description">
                  It is important for Us to know when and how often you visit Our Site, and which parts of it you have used (including which pages you have visited and which links you have visited). As with analytics Cookies, this information helps us to better understand you and, in turn, to make Our Site and advertising more relevant to your interests. Some information gathered by targeting Cookies may also be shared with third parties.
                </p>
                <p className="sub-sub-heading">Third Party Cookies</p>
                <p className="description">
                  Third party Cookies are not placed by Us; instead, they are placed by third parties that provide services to Us and/or to you. Third party Cookies may be used by advertising services to serve up tailored advertising to you on Our Site, or by third parties providing analytics services to Us (these Cookies will work in the same way as analytics Cookies described above).
                </p>
                <p className="sub-sub-heading">Persistent Cookies</p>
                <p className="description">
                  Any of the above types of Cookies may be a persistent Cookie. Persistent Cookies are those which remain on your computer or device for a predetermined period and are activated each time you visit Our Site.
                </p>
                <p className="sub-sub-heading">Session Cookies</p>
                <p className="description">
                  Any of the above types of Cookies may be a session, Cookie. Session Cookies are temporary and only remain on your computer or device from the point at which you visit Our Site until you close your browser. Session Cookies are deleted when you close your browser.
                </p>
                <p className="description d-flex justify-content-between align-items-center">
                  <span className="dis-number">4</span>
                  <span className="discrption-inner">
                    Cookies on Our Site are not permanent and will expire as indicated in the table below.
                  </span>
                </p>
                <p className="description d-flex justify-content-between align-items-center">
                  <span className="dis-number">5</span>
                  <span className="discrption-inner">
                    For more details of the personal data that We collect and use, the measures we have in place to protect personal data, your legal rights, and our legal obligations, please refer to our Privacy Policy https://arabgiftcard.com/privacy
                  </span>
                </p>
                {/* <p>
                  3.6. For more specific details of the Cookies that We use, please
                  refer to the table below.
                </p> */}
              </div>
              <div className="cokkie-content-section">
                <h4 className="sub-heading">Consent and Control</h4>
                <p className="description d-flex justify-content-between align-items-center">
                  <span className="dis-number">1</span>
                  <span className="discrption-inner">
                    Before Cookies are placed on your computer or device, you will be shown a pop up, requesting your consent to set those Cookies. By giving your consent to the placing of Cookies you are enabling Us to provide the best possible experience and service to you. You may, if you wish, deny consent to the placing of Cookies unless those Cookies are strictly necessary; however certain features of Our Site may not function fully or as intended. You will be given the opportunity to allow and/or deny different categories of Cookie that We use. You can return to your Cookie preferences to review and/or change them at any time you want.
                  </span>
                </p>
                <p className="description d-flex justify-content-between align-items-center">
                  <span className="dis-number">2</span>
                  <span className="discrption-inner">
                    In addition to the controls that We provide, you can choose to enable or disable Cookies in your internet browser. Most internet browsers also enable you to choose whether you wish to disable all Cookies or only third-party Cookies. By default, most internet browsers accept Cookies, but this can be changed. For further details, please consult the help menu in your internet browser or the documentation that came with your device.
                  </span>
                </p>
              </div>
              <div className="cokkie-content-section">
                <h4 className="sub-heading">Changes to this Cookie Policy</h4>
                <p className="description d-flex justify-content-between align-items-center">
                  <span className="dis-number">1</span>
                  <span className="discrption-inner">
                    We may alter this Cookie Policy at any time. If We do so, details of the changes will be highlighted at the top of this page.  Any such changes will become binding on you on your first use of Our Site after the changes have been made. You are therefore advised to check this page from time to time.
                  </span>
                </p>
                <p className="description d-flex justify-content-between align-items-center">
                  <span className="dis-number">2</span>
                  <span className="discrption-inner">
                    In the event of any conflict between the current version of this Cookie Policy and any previous version(s), the provisions current and in effect shall prevail unless it is expressly stated otherwise.
                  </span>
                </p>
              </div>
              <div className="cokkie-content-section">
                <h4 className="sub-heading">Further Information</h4>
                <p className="description">
                  If you would like to know more about how We use Cookies, please contact Us at support@arabgiftcard.com , or at info@arabgiftcard.com by telephone on {COMPANY_PHONE_NUMBER}.
                </p>
              </div>
              <h4 className="sub-heading">Contacting Us</h4>
              <p className="description">
                If you have any questions about your privacy, please contact us using the following details:
              </p>
              <ul className="cokkie-content-us">
                <li><p><img src="/assets/Cookie-policy/user.svg" alt="" />Full name</p> <span>Arab Gift Card</span></li>
                <li><p><img src="/assets/Cookie-policy/email.svg" alt="" />Email address</p> <span>{COMPANY_EMAIL_ADDRESS}</span></li>
                <li><p><img src="/assets/Cookie-policy/location.svg" alt="" />Postal address</p> <span>{COMPANY_LOCATION}d</span></li>
                <li><p><img src="/assets/Cookie-policy/call.svg" alt="" />Telephone number</p> <span>{COMPANY_PHONE_NUMBER}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiePolicy;
