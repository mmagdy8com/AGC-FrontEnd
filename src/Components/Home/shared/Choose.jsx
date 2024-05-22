const Choose = () => {
  return (
    <>
      <section className="choose">
        <div className="container position-relative">
          <div className="choose-after position-absolute"></div>
          <div className="row">
            <div
              className="title-3"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <h4 className="position-relative">
                Why
                <br />
                Choose
                <br />
                Us?
              </h4>
            </div>
          </div>
          <div className="row justify-content-center justify-content-lg-end">
            <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-6 col-sm-7 col-12">
              <div
                className="choose-inner d-flex flex-column align-items-center"
                data-aos="fade-up"
                data-aos-delay="1000"
                data-aos-duration="1000"
              >
                <img
                  src={"assets/Choose/choose1.svg"}
                  alt="choose"
                  className="img-fluid"
                />
                <h5>Secure Transactions</h5>
                <p>
                  Guaranteed safe and secure
                  <br />
                  cryptocurrency gift card
                  <br />
                  purchases
                </p>
              </div>
            </div>
            <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-6 col-sm-7 col-12">
              <div
                className="choose-inner d-flex flex-column align-items-center"
                data-aos="fade-up"
                data-aos-delay="1200"
                data-aos-duration="1000"
              >
                <img
                  src={"assets/Choose/choose2.svg"}
                  alt="choose"
                  className="img-fluid"
                />
                <h5>Wide Selections</h5>
                <p>
                  Choose from a wide selection
                  <br />
                  of gift cards from popular
                  <br />
                  retailers and brands
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Choose;
