import axios from "axios";

export const fetchAppLoad = async (userDetails) => {
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${userDetails[0]?.accessToken}`;
        const response = await axios.get('/user/app/load/');

        return response?.data?.data;
    } catch (error) {
        console.log("Error", error?.message);
        return null;
    }
};