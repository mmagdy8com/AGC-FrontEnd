// UnifonicService.js
import axios from "axios";

const AppSid = "ADn8R0WHr7sMdZ1k8QfxRp2wVJn47K"; // Replace with your actual API key
const API_BASE_URL = "https://el.cloud.unifonic.com/rest/SMS/messages";

const sendSMS = async (to, message) => {
  try {
    let Recipient = to;
    let Body = message;
    const requestData = {
      AppSid,
      Recipient,
      Body,
    };

    const response = await axios.post(API_BASE_URL, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { sendSMS };
