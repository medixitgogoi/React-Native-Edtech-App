import axios from "axios";

export const fetchSubjects = async (id) => {
    try {
        const response = await axios.post(`/user/subject/details`,
            {
                subject_id: id,
            },
        );

        // console.log('Subject response: ', response);
        return response?.data?.data;
    } catch (error) {
        // console.log("Error", error.message); // Add a title to the alert
        return null; // Return null in case of error
    }
};