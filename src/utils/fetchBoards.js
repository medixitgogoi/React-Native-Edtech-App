import axios from "axios";
import { Alert } from "react-native";

export const fetchBoards = async () => {
    try {
        const response = await axios.get('/board/');
        console.log('response', response);
        
        return response?.data?.grocery; // Return data inside the try block after receiving the response
    } catch (error) {
        Alert.alert("Error", error.message); // Add a title to the alert
        return null; // Return null in case of error
    }
};