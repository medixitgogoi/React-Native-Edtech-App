import axios from "axios";

export const fetchCoupons = async (userDetails) => {
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${userDetails[0]?.accessToken}`;
        const response = await axios.get('/fetch/coupon');

        return response?.data;
    } catch (error) {
        console.log("Error", error?.message);
        return null;
    }
};