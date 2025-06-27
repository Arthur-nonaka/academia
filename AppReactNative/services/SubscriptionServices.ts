import axios from "axios";
// const API_URL = "https://super-duper-fiesta-55vr6w797x734qrw-3001.app.github.dev/api/";
const API_URL = "http://localhost:3001/api/";

export const getSubscriptions = async (filters?: any) => {
  try {
    const response = await axios.get(API_URL + "subscription", {
      headers: {
        "Content-Type": "application/json",
      },
      params: filters,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    throw error;
  }
};

export const getSubscriptionById = async (id: string) => {
  try {
    const response = await axios.get(API_URL + `subscription/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching subscription:", error);
    throw error;
  }
};

export const createSubscription = async (studentData: any) => {
  try {
    const response = await axios.post(API_URL + "subscription", studentData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating subscription:", error);
    throw error;
  }
};

export const updateSubscription = async (id: string, studentData: any) => {
  try {
    const response = await axios.put(
      API_URL + `subscription/${id}`,
      studentData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating subscription:", error);
    throw error;
  }
};

export const deleteSubscription = async (id: string) => {
  try {
    const response = await axios.delete(API_URL + `subscription/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting subscription:", error);
    throw error;
  }
};
