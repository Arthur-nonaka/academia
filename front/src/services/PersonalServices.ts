import axios from "axios";
const API_URL = "https://super-duper-fiesta-55vr6w797x734qrw-3001.app.github.dev/api/";

export const getPersonals = async (filters?: any) => {
    try {
      const response = await axios.get(API_URL + "personal", {
        headers: {
          "Content-Type": "application/json",
        },
        params: filters,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching personals:", error);
      throw error;
    }
  };
  
  export const getPersonalById = async (id: string) => {
    try {
      const response = await axios.get(API_URL + `personal/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching personal:", error);
      throw error;
    }
  };
  
  export const createPersonal = async (studentData: any) => {
    try {
      const response = await axios.post(API_URL + "personal", studentData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating personal:", error);
      throw error;
    }
  };
  
  export const updatePersonal = async (id: string, studentData: any) => {
    try {
      const response = await axios.put(API_URL + `personal/${id}`, studentData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating personal:", error);
      throw error;
    }
  };
  
  export const deletePersonal = async (id: string) => {
    try {
      const response = await axios.delete(API_URL + `personal/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting personal:", error);
      throw error;
    }
  };
  