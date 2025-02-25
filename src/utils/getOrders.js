import axios from "axios";

export const getOrders = async (userDetails) => {
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${userDetails[0]?.accessToken}`;
        const response = await axios.get('/user/order/list');

        // console.log('fetch orders: ', response);
        return response?.data;
    } catch (error) {
        // console.log("Error", error?.message);
        return null;
    }
};