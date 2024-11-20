import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import OtpVerification from '../auth/OtpVerification';
import ForgotPassword from '../auth/ForgotPassword';

const AuthNavigator = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName={"Login"}
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={Signup} />
            <Stack.Screen name="OtpVerification" component={OtpVerification} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
    );
}

export default AuthNavigator;

const styles = StyleSheet.create({});