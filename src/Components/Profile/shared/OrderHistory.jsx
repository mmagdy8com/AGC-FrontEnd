import useApi from "../../../hooks/useApi";
import Loader from "../../Ui/Loader";
import InfoMessage from "../../Ui/InfoMessage";
import { formatDate, manageorderData } from "../../../utils/helper";

const OrderHistoryComponent = () => {
  const {
    data: orders,
    isPending: areOrdersPending,
    error: ordersError,
  } = useApi("/getOrders");

  const filterOrdersByStatus = orders?.filter((order) => order.isPaymentSuccess !== false)
  const modifiedOrders = manageorderData(filterOrdersByStatus);
  // console.log(!modifiedOrders?.length , 'modified', !orders?.length)
  
  return (
    <>
      <div
        className="account-heading d-flex align-items-center"
        data-aos="fade-up"
        data-aos-delay="2500"
        data-aos-duration="1000"
      >
        <h5 className="mb-5">Order History</h5>
      </div>

      <div className="col-xxl-9 col-xl-8 col-lg-8 col-md-12">
        {areOrdersPending ? (
          <Loader />
        ) : ordersError ? (
          <InfoMessage text={ordersError} />
        ) : !modifiedOrders.length? (
          <InfoMessage text="No order history to show" />
        ) : (
                modifiedOrders?.toReversed().map((order) => (
            <div
              className="row justify-content-center"
              style={{ marginBottom: "100px" }}
            >            
              <div>
                {order?.products?.map((cart) => (
                  <div className="col-12 mb-3">
                    <div
                      className="history-inner d-flex align-items-center position-relative"
                      data-aos="fade-up"
                      data-aos-delay="2500"
                      data-aos-duration="1000"
                    >
                      <div className="history-img">
                        <img
                          src={
                            cart?.productInnerImage
                              ? cart?.productInnerImage
                              : cart?.productOuterImage
                              ? `${process.env.REACT_APP_IMAGE_URL}/${cart?.productOuterImage}`
                              : "/assets/Giftcard/default-gift-card.jpg"
                          }
                          alt="cart"
                          onError={(e) => {
                            e.target.src =
                              "/assets/Giftcard/default-gift-card.jpg";
                          }}
                        />
                      </div>
                      <div className="w-100 history-text d-flex flex-column">
                        <ul className="d-flex justify-content-between p-0">
                          <li>
                            {cart?.productName}
                            <span>x{cart?.productQty}</span>
                          </li>
                          <h5>
                            Total: {cart?.productTotalAmount.toFixed(2)} SAR{" "}
                          </h5>
                        </ul>
                        <span>{cart.productCategory}</span>
                        <p>{cart?.productPrice?.toFixed(2)} SAR</p>
                        <p>{formatDate(order?.createdAt?.toString())}</p>
                      </div>
                      {/* <a
                      href="checkout.html"
                      type="submit"
                      className="btn btn-primary position-absolute orderHistoryBuyBtn"
                    >
                      buy Again
                    </a> */}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <h5>Order Total: {order?.grandTotal} SAR</h5>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default OrderHistoryComponent;
