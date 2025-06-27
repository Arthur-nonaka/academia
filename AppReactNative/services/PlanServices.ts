import axios from "axios";
// const API_URL = "https://super-duper-fiesta-55vr6w797x734qrw-3001.app.github.dev/api/";
const API_URL = "http://localhost:3001/api/";

export const getPlans = async (filters?: any) => {
  try {
    const response = await axios.get(API_URL + "plan", {
      headers: {
        "Content-Type": "application/json",
      },
      params: filters,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw error;
  }
};

export const getPlanById = async (id: string) => {
  try {
    const response = await axios.get(API_URL + `plan/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching plan:", error);
    throw error;
  }
};

export const createPlan = async (studentData: any) => {
  try {
    const response = await axios.post(API_URL + "plan", studentData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating plan:", error);
    throw error;
  }
};

export const updatePlan = async (id: string, studentData: any) => {
  try {
    const response = await axios.put(API_URL + `plan/${id}`, studentData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating plan:", error);
    throw error;
  }
};

export const deletePlan = async (id: string) => {
  try {
    const response = await axios.delete(API_URL + `plan/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting plan:", error);
    throw error;
  }
};
