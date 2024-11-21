import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import GuestNavigator from "./GuestNavigator";
import { StatusBar } from 'react-native';
import { background } from '../utils/colors';
import { useSelector } from "react-redux";

// axios.defaults.baseURL = 'https://admin.skercart.com/api/';

const StackNavigation = () => {

    const isUserLoggedIn = useSelector(state => state.login.isUserLoggedIn);

    return (
        <>
            {/* Global StatusBar Configuration */}
            <StatusBar
                barStyle="light-content" // Light text for the status bar
                backgroundColor={background} // Replace with your app's primary color
            />

            <NavigationContainer>
                {isUserLoggedIn ? (
                    <GuestNavigator />
                ) : (
                    <AuthNavigator />
                )}
            </NavigationContainer>
        </>
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