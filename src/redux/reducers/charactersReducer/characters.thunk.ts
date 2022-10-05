import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_ENDPOINTS } from '../../../constants';
import { instance } from '../../../services/apiService';
import { reducerName } from "./characters.initialState";

export const fetchCharacters = createAsyncThunk(
    `${reducerName}/getCharacters`,
    async () => {
        const response = await instance.get(API_ENDPOINTS.characters);
        console.log(response.data)
        return response.data;
    },
);