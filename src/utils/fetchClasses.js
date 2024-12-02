import axios from "axios";
import { Alert } from "react-native";

export const fetchClasses = async (id) => {
    try {
        const response = await axios.post(`/class`,
            {
                board_id: id
            }
        );

        // console.log('class response: ', response);
        return response?.data?.data?.classes;
    } catch (error) {
        Alert.alert("Error", error.message); // Add a title to the alert
        return null; // Return null in case of error
    }
};