import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../auth/Login';
import OtpVerification from '../auth/OtpVerification';
import ForgotPassword from '../auth/ForgotPassword';
import Signup from '../auth/Signup';
import SplashScreen from '../auth/SplashScreen';

const AuthNavigator = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName={"SplashScreen"}
            screenOptions={{
                headerShown: false,
                animation: 'fade_from_bottom'
            }}
        >
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="OtpVerification" component={OtpVerification} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
    );
}

export default AuthNavigator;

const styles = StyleSheet.create({});