//Manages todo items via different methods
import axios from 'axios';
import {authService} from './authService';


const API_URL = 'http://localhost:9090/api'
//authorization header with the Bearer token
const authHeader = () => ({
    Authorization: `Bearer ${authService.getToken()}`
})


export const taskService = {
    // Fetch all todo items
    getAll: async () => {
        const response = await axios.get(`${API_URL}/todo`, {
            headers: authHeader()
        })
        return response.data;
    },
    // Find todo by id
    getById: async (id) => {
        const response = await axios.get(`${API_URL}/todo/${id}`, {
            headers: authHeader()
        })
        return response.data;
    },

    // Make a new Todo, with optional files
    create: async (todoDto, files = []) => {
        const formData = new FormData();
        formData.append('todo', new Blob([JSON.stringify(todoDto)], {type: 'application/json'}));
        files.forEach(file => formData.append('files', file));
        const response = await axios.post(`${API_URL}/todo`, formData, {
            headers: authHeader()
        })
        return response.data;
    },
    // Update a existing todo item by id
    update: async (id, todoDto, files = []) => {
        const formData = new FormData();
        formData.append('todo', new Blob([JSON.stringify(todoDto)], {type: 'application/json'}));
        files.forEach(file => formData.append('files', file));
        const response = await axios.put(`${API_URL}/todo/${id}`, formData, {
            headers: authHeader()
        })
        return response.data;
    },
    //deletes todo items
    delete: async (id) => {
        await axios.delete(`${API_URL}/todo/${id}`, {
            headers: authHeader()
        })

    }
}







