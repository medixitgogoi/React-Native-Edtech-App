import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../auth/Login';
import Signup from '../auth/Signup';

// import SplashScreen from '../auth/SplashScreen';
// import ForgotPassword from '../auth/ForgotPassword';
// import OtpVerification from '../auth/OtpVerification';
// import TermsAndConditions from '../auth/TermsAndConditions';
// import PrivacyPolicy from '../auth/PrivacyPolicy';

const AuthNavigator = ({ initialRoute }) => {

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
            {/* <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="OtpVerification" component={OtpVerification} />
            <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} /> */}
        </Stack.Navigator>
    );
}

export default AuthNavigator;

const styles = StyleSheet.create({});