import axios from "axios";

export const buyData = async (phone, network, plan) => {
  try {
    const response = await axios.post(
      "https://abdata-backend.onrender.com/api/buy-data",
      {
        phone,
        network,
        plan,
      }
    );

    return response.data;
  } catch (error) {
    console.error((error as any).response?.data || "Transaction failed");
    return { error: "Transaction failed" };
  }
};
