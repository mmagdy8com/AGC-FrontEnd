import React, { useEffect, useState } from "react";

import "./Design/privacy.css";
import api from "../Interceptor/api";
import Loader from "../Ui/Loader";

const Faq = () => {
  const [faqData, setFaqData] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchFaqData = async () => {
    try {
      setLoading(true);
      let result = await api.get(`/faqs/getFaqs`);

      if (result?.data?.data[0]?.faqs.length > 0) {
        setFaqData(result.data.data[0].faqs);
      } else {
        setFaqData([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setFaqData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqData();
  }, []);

  const getFaqNumber = (index) => {
    let number = "";
    if (index < 9) {
      number = `0${index + 1}`;
    } else {
      number = `${index + 1}`;
    }

    return number;
  };

  if (loading) {
    return <Loader />;
  }

  if (faqData?.length == 0) {
    return <div className="unable-to-load-faq">Unable to load FAQ</div>;
  }

  return (
    <>
      <div className="about-us-container">
        <h2 className="about-us-heading">FAQs</h2>
        <div
          className="accordion"
          id="accordionExample"
          style={{ marginTop: "30px" }}
        >
          {faqData?.map((data, i) => (
            <div
              key={i}
              className="accordion-item"
              style={{ marginBottom: "50px" }}
            >
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#faq${i}`}
                  aria-expanded="false"
                  aria-controls={i}
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  <span
                    style={{
                      fontSize: "25px",
                      marginRight: "20px",
                      color: "#008CAB",
                    }}
                  >
                    {getFaqNumber(i)}
                  </span>
                  {data.question}
                </button>
              </h2>
              <div
                id={`faq${i}`}
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body" style={{ paddingLeft: "75px" }}>
                  {data.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Faq;
