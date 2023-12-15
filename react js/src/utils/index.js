import axios from 'axios';

import { CONFIG } from "../config/index"

export const handleSubmit = async ({ e, password, setPassword, setSavedPasswords, fetchSavedPasswords  , setLoader}) => {
    e.preventDefault();
    try {
        setLoader(true)
        await axios.post(`${CONFIG.SERVICE_URL}/v1/evaluate-password`, { password });
        setPassword('');
        fetchSavedPasswords({ setSavedPasswords , setLoader })
    } catch (error) {
        setLoader(false)
    }
};

export const fetchSavedPasswords = async ({ setSavedPasswords , setLoader }) => {
    try {
        setLoader(true)
        const response = await axios.get(`${CONFIG.SERVICE_URL}/v1/fetchSavedPasswords`, { limit: 10, offset: 0 })
        const { data = [] } = response.data || {};
        setSavedPasswords([...data]);
    } catch (error) {
        setLoader(false)
    }
}