import axios from "axios";
import { Alert } from "react-native";

export const fetchBoards = async () => {
    try {
        const response = await axios.get('/board/');
        // console.log('response: ', response);

        return response?.data?.data?.boards; // Return data inside the try block after receiving the response
    } catch (error) {
        // console.log("Error", error.message); // Add a title to the alert
        return null; // Return null in case of error
    }
};