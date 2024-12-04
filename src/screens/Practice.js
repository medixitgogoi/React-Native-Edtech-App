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