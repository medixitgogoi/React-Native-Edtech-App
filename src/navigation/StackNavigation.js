import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import GuestNavigator from "./GuestNavigator";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { addUser } from "../redux/UserSlice";
import { fetchAppLoad } from "../utils/fetchAppLoad";

axios.defaults.baseURL = 'https://admin.gyaano.com/api/';

const StackNavigation = () => {

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.user);

    const isUserLoggedIn = userDetails?.length > 0 && userDetails?.some(item => item.accessToken);

    const [isLoading, setIsLoading] = useState(true);

    // Load login details from AsyncStorage
    useEffect(() => {
        const loadLoginDetails = async () => {
            try {
                const storedLoginDetails = await AsyncStorage.getItem('userDetails');
                if (storedLoginDetails) {
                    dispatch(addUser(JSON.parse(storedLoginDetails)));
                }
            } catch (error) {
                Alert.alert(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadLoginDetails();
    }, [dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <NavigationContainer>
                <AuthNavigator initialRoute="SplashScreen" />
            </NavigationContainer>
        );
    };

    return (
        <NavigationContainer>
            {isUserLoggedIn ? (
                <GuestNavigator />
            ) : (
                <AuthNavigator />
            )}
        </NavigationContainer>
    );
};

export default StackNavigation;


















// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Toast from 'react-native-toast-message';
// import VideoPlayer from '../screens/VideoPlayer';
// import Profile from '../screens/Profile';
// import EditProfile from '../screens/EditProfile';
// import Transactions from '../screens/Transactions';
// import EnrolledCourses from '../screens/EnrolledCourses';
// import CourseDetails from '../screens/CourseDetails';
// import DownloadPDF from '../screens/DownloadPDF';
// import Home from '../screens/Home';
// import Login from '../auth/Login';
// import OtpVerification from '../auth/OtpVerification';
// import Signup from '../auth/Signup';
// import ForgotPassword from '../auth/ForgotPassword';
// import Notifications from '../screens/Notifications';
// import Courses from '../screens/Courses';

// const Stack = createNativeStackNavigator();

// const StackNavigation = () => {
//     return (
//         <>
//             <NavigationContainer>
//                 <Stack.Navigator
//                     screenOptions={{
//                         headerShown: false,
//                         animation: 'slide_from_right',
//                     }}
//                 >
//                     <Stack.Screen name="Home" component={Home} />
//                     <Stack.Screen name="Profile" component={Profile} />
//                     <Stack.Screen name="EditProfile" component={EditProfile} />
//                     <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
//                     <Stack.Screen name="Transactions" component={Transactions} />
//                     <Stack.Screen name="EnrolledCourses" component={EnrolledCourses} />
//                     <Stack.Screen name="CourseDetails" component={CourseDetails} />
//                     <Stack.Screen name="DownloadPDF" component={DownloadPDF} />
//                     <Stack.Screen name="Login" component={Login} />
//                     <Stack.Screen name="Signup" component={Signup} />
//                     <Stack.Screen name="OtpVerification" component={OtpVerification} />
//                     <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
//                     <Stack.Screen name="Courses" component={Courses} />
//                     <Stack.Screen name="Notifications" component={Notifications} />
//                 </Stack.Navigator>
//             </NavigationContainer>
//             <Toast />
//         </>
//     );
// }

// export default StackNavigation;