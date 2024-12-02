import axios from "axios";
import { Alert } from "react-native";

export const fetchClasses = async (id) => {
    try {
        const response = await axios.post(
            '/class/',
            { board_id: id },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        
        console.log('class response: ', response);

        return response; // Return data inside the try block after receiving the response
    } catch (error) {
        Alert.alert("Error", error.message); // Add a title to the alert
        return null; // Return null in case of error
    }
};