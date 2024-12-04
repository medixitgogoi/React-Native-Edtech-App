import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { addUser } from "../redux/UserSlice";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { darkBlue } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { Text } from 'react-native';
import VideoPlayer from '../screens/VideoPlayer';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import EnrolledCourses from '../screens/EnrolledCourses';
import CourseDetails from '../screens/CourseDetails';
import Home from '../screens/Home';
import Notifications from '../screens/Notifications';
import Courses from '../screens/Courses';
import Purchases from '../screens/Purchases';
import Notes from '../screens/Notes';
import ViewPdf from '../screens/ViewPdf';
import MyCourses from '../screens/MyCourses';
import Store from '../screens/Store';
import PurchaseDetails from '../screens/PurchaseDetails';
import About from '../screens/About';
import Faq from '../screens/Faq';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import Terms from '../screens/Terms';
import Cancellation from '../screens/Cancellation';
import Refund from '../screens/Refund';
import Contact from '../screens/Contact';
import Disclaimer from '../screens/Disclaimer';
import Chapters from '../screens/Chapters';

import Login from '../auth/Login';
import OtpVerification from '../auth/OtpVerification';
import ForgotPassword from '../auth/ForgotPassword';
import Signup from '../auth/Signup';
import SplashScreen from '../auth/SplashScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'MyCourses') {
                        iconName = focused ? 'book' : 'book-outline';
                    } else if (route.name === 'Store') {
                        iconName = focused ? 'storefront' : 'storefront-outline';
                    }

                    return <Icon name={iconName} size={20} color={color} />;
                },
                tabBarActiveTintColor: darkBlue,
                tabBarInactiveTintColor: '#000',
                headerShown: false,
                tabBarStyle: {
                    height: 45, // Set the height of the tab bar
                    paddingBottom: 10, // Adjust padding for label/icon alignment
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16
                },
                tabBarLabel: ({ focused }) => (
                    <Text
                        style={{
                            marginTop: -2, // Adjust gap between icon and label
                            fontSize: responsiveFontSize(1.4), // Label font size
                            fontWeight: focused ? '600' : '400', // Font weight on focus
                            color: focused ? darkBlue : '#000',
                        }}
                    >
                        {route.name}
                    </Text>
                ),
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="MyCourses" component={MyCourses} />
            <Tab.Screen name="Store" component={Store} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

axios.defaults.baseURL = 'https://admin.gyaano.com/api/';

const StackNavigation = () => {

    const dispatch = useDispatch();

    // const userDetails = useSelector(state => state.user);

    // const isUserLoggedIn = userDetails?.length > 0 && userDetails?.some(item => item.accessToken);

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

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setIsLoading(false);
    //     }, 0);

    //     return () => clearTimeout(timer);
    // }, []);

    // if (isLoading) {
    //     return (
    //         <NavigationContainer>
    //             <AuthNavigator initialRoute="SplashScreen" />
    //         </NavigationContainer>
    //     );
    // };

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }} initialRouteName={"SplashScreen"}>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="Main" component={BottomTabs} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
                <Stack.Screen name="Notifications" component={Notifications} />
                <Stack.Screen name="EnrolledCourses" component={EnrolledCourses} />
                <Stack.Screen name="CourseDetails" component={CourseDetails} />
                <Stack.Screen name="Notes" component={Notes} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Contact" component={Contact} />
                <Stack.Screen name="Courses" component={Courses} />
                <Stack.Screen name="Refund" component={Refund} />
                <Stack.Screen name="Disclaimer" component={Disclaimer} />
                <Stack.Screen name="Cancellation" component={Cancellation} />
                <Stack.Screen name="Purchases" component={Purchases} />
                <Stack.Screen name="ViewPdf" component={ViewPdf} />
                <Stack.Screen name="PurchaseDetails" component={PurchaseDetails} />
                <Stack.Screen name="About" component={About} />
                <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
                <Stack.Screen name="Faq" component={Faq} />
                <Stack.Screen name="Terms" component={Terms} />
                <Stack.Screen name="Chapters" component={Chapters} />

                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="OtpVerification" component={OtpVerification} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigation;