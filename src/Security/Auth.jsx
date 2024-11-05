import apiService from "../Apis/CRUDservice";

/*
 * Defines set of API utility functions
 */

// Sends a POST request to log in a user with the provided username and password.
export const login = (username, password) =>
  apiService.post(`/login?username =${username}&password=${password}`);

// Sends a GET request to retrieve information for a specific user by userId.
export const info = (userId) => apiService.get(`/users/${userId}`);

// Sends a POST request to register a new user with the provided data object.
export const register = (data) => apiService.post(`/users`, data);

// Sends a PUT request to update the existing user data with the provided data object.
export const update = (data) => apiService.put(`/users`, data);

// Sends a DELETE request to remove a specific user by userId.
export const remove = (userId) => api.delete(`/users/${userId}`);
