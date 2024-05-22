export const manageorderData = (orderData) => {
  if (!orderData) return [];
  let orders = [];
  orderData.map((order) => {
    let newOrder = {
      grandTotal: order?.grandTotal,
      createdAt: new Date(order?.createdAt),
    };

    let orderProducts = [];
    order?.products?.map((product) => {
      orderProducts.push({
        productName:
          product?.productId?.productDetails?.nameEn ||
          product?.productId?.title,
        productCategory: product?.productId?.category?.name,
        productOuterImage: product?.productId?.image,
        productInnerImage: product?.productId?.productDetails?.image,
        productQty: product?.quantity,
        productPrice: product?.productId?.priceInSAR,
        productTotalAmount: product?.quantity * product?.productId?.priceInSAR,
      });
    });

    newOrder.products = orderProducts;
    orders.push(newOrder);
  });

  return orders;
};

export function formatDate(inputDate) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dateObj = new Date(inputDate);

  const month = months[dateObj.getMonth()];
  const day = dateObj.getDate();
  const hours = dateObj.getHours() % 12 || 12;
  const minutes = dateObj.getMinutes();
  const ampm = dateObj.getHours() >= 12 ? "PM" : "AM";

  const formattedDate = `${month} ${day}, ${hours}:${
    (minutes < 10 ? "0" : "") + minutes
  } ${ampm}`;

  return formattedDate;
}

export const separateCMSImages = (imageObjectList, imageType) => {
  let imageUrlList = [];

  imageObjectList?.map((image) => {
    if (image.imageType == imageType) {
      imageUrlList.push(image.imageURL);
    }
  });

  return imageUrlList;
};

export function convertToRouteString(str) {
  const cleanedStr = str
    ?.replace(/[^\w\s]/gi, "")
    ?.replace(/\s+/g, "-")
    .toLowerCase();
  return cleanedStr;
}
