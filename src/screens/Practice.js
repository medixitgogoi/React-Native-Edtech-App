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

{/* <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 320, aspectRatio: 1 / 1 }}>
                        <Image
                            source={require('../assets/fallback.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            resizeMode="contain"
                        />
                    </View>

                    <Text style={{ color: '#333', fontWeight: '600', fontSize: responsiveFontSize(2.1), textAlign: 'center', marginBottom: 20 }}>You need to log in to view your profile.</Text>

                    <TouchableOpacity
                        style={{ backgroundColor: darkBlue, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', gap: 5, justifyContent: 'center', paddingHorizontal: 25, borderRadius: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>Log In</Text>
                        <Icon4 name="arrowright" size={18} color={'#fff'} />
                    </TouchableOpacity>
                </View> */}

                <View style={{ width: '100%' }}>
                                   <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 10, paddingHorizontal: 12, alignSelf: 'flex-start' }}>
                                       <Icon4 name="arrowleft" size={23} color={'#000'} />
                                   </TouchableOpacity>
               
                                   <View style={{ width: 300, aspectRatio: 1 / 1, alignSelf: 'center' }}>
                                       <Image
                                           source={require('../assets/fallback.png')}
                                           style={{
                                               width: '100%',
                                               height: '100%',
                                           }}
                                           resizeMode="contain"
                                       />
                    </View>
                    
                    <View style={{ paddingHorizontal: 12 }}>
                                            <View style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', borderRadius: 10, elevation: 3, padding: 15 }}>
                                                <Text style={{ color: '#000', fontSize: responsiveFontSize(2.1), fontWeight: '500', marginBottom: 5 }}>Your Store</Text>
                    
                                                <Text style={{ color: '#000', fontSize: responsiveFontSize(1.6), marginBottom: 20 }}>Login or sign up to view your store and start adding items</Text>
                    
                                                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginBottom: 3, borderColor: darkBlue, borderWidth: 1, borderRadius: 8, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ color: darkBlue, fontWeight: '600', fontSize: responsiveFontSize(2) }}>Continue</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                
                                 
                                </View>