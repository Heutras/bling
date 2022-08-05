import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/'})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
    }
  
    return req;
});

export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/comment`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);


export const signIn = async (formData) => await API.post('/user/signin', formData);
export const signUp = async (formData) => await API.post('/user/signup', formData);