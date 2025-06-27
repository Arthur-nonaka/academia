import axios from "axios";
// const API_URL = "https://super-duper-fiesta-55vr6w797x734qrw-3001.app.github.dev/api/";
const API_URL = "http://localhost:3001/api/";

export const getStudents = async (filters?: any) => {
  try {
    const response = await axios.get(API_URL + "student", {
      headers: {
        "Content-Type": "application/json",
      },
      params: filters,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const getStudentById = async (id: string) => {
  try {
    const response = await axios.get(API_URL + `student/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching student:", error);
    throw error;
  }
};

export const createStudent = async (studentData: any) => {
  try {
    const response = await axios.post(API_URL + "student", studentData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};

export const updateStudent = async (id: string, studentData: any) => {
  try {
    const response = await axios.put(API_URL + `student/${id}`, studentData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

export const deleteStudent = async (id: string) => {
  try {
    const response = await axios.delete(API_URL + `student/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};
