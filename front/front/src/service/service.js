// src/api.js
import { http } from './http'; // Import the custom Axios instance

// Get all tabs
export const getTabs = async () => {
    const response = await http.get('/tabs');
    return response.data; // Returns the data
};

// Get a single tab by ID
export const getTabById = async (id) => {
    const response = await http.get(`/tabs/${id}`);
    return response.data;
};

// Create a new tab
export const createTab = async (tab) => {
    const response = await http.post('/tabs', tab);
    return response.data;
};

// Update an existing tab
export const updateTab = async (id, updatedTab) => {
    const response = await http.patch(`/tabs/${id}`, updatedTab);
    return response.data;
};

// Delete a tab
export const deleteTab = async (id) => {
    const response = await http.delete(`/tabs/${id}`);
    return response.data;
};
