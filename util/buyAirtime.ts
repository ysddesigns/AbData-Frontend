import axios from "axios";

export const buyAirtime = async (amount, phone, network) => {
  try {
    const response = await axios.post(
      "https://abdata-backend.onrender.com/api/buy-airtime",
      {
        amount,
        phone,
        network,
      }
    );

    return response.data;
  } catch (error) {
    console.error((error as any).response.data);
    return { error: "Transaction failed" };
  }
};
