import axios from 'axios';

const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

export const getUsers = async (page) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/users?page=${page}&count=6`);
    return data.users;
  } catch (error) {
    throw error.message;
  }
};

export const getToken = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/token`);

    return data.token;
  } catch (error) {
    throw error.message;
  }
};

export const postUser = async (formData, token) => {
  const config = {
    headers: {
      Token: token,
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    const data = await axios.post(`${BASE_URL}/users`, formData, config);
    console.log("success");

    return data;
  } catch (err) {
    throw err.response.data;
  }
};

export const getPositions = async () => {
  try {
      const { data } = await axios.get(`${BASE_URL}/positions`);
      return data.positions;
  } catch (error) {
      throw error.message;
  }
};