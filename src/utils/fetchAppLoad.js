import axios from "axios";
import { Alert } from "react-native";

export const fetchAppLoad = async () => {
    try {
        const response = await axios.get('/user/profile/fetch/');
        console.log('response app load: ', response);

        // return response?.data?.data?.boards; // Return data inside the try block after receiving the response
    } catch (error) {
        Alert.alert("Error", error?.message); // Add a title to the alert
        return null; // Return null in case of error
    }
};