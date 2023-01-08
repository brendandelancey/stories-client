import axios from "axios";
// import { auth } from "../utils/firebase"

const api = axios.create({
  //   baseURL: "http://localhost:3000/api",
  //   baseURL: "http://127.0.0.1:5001/lac-media/us-central1/app",
  baseURL: "https://us-central1-lac-media.cloudfunctions.net/app",
});

// export const createStory = (prompt) => api.post('/createStory',prompt);
export const createStory = async (prompt, currentUser) => {
  console.log("**************");

  const token = await currentUser.getIdToken();
  return api.post(
    "/createStory",
    { message: prompt },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
};
export const postStory = async (story, viewpoint, title, currentUser) => {
  const token = await currentUser.getIdToken();
  return api.post(
    "/postStory",
    { story: story, viewpoint: viewpoint, title: title },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
};
// export const getArgument = prompt => api.post('/createStory',prompt);
// export const postArgument = id => api.get(`/users/${id}`);

// export const createUser = data => api.post('/users', data);
// export const updateUser = (id, data) => api.put(`/users/${id}`, data);
// export const deleteUser = id => api.delete(`/users/${id}`);

// export const createUser = data => api.post('/users', data);
// export const updateUser = (id, data) => api.put(`/users/${id}`, data);
// export const deleteUser = id => api.delete(`/users/${id}`);

export default {
  createStory,
  postStory,
};
