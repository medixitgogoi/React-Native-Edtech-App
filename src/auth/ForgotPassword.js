import { Image, StatusBar, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaInsetsContext, SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/dist/Feather';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { backIconColor, blue1, blue2, blue3, darkGreen, offWhite } from '../utils/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
// import axios from 'axios';

const ForgotPassword = ({ route }) => {

    // const mobileNumber = route.params.mobile;
    // const otp = route?.params?.otp;

    const navigation = useNavigation();

    const [password, setPassword] = useState('');
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

    const [show, setShow] = useState(true);
    const [confirmShow, setConfirmShow] = useState(true);

    const [loading, setLoading] = useState(false);

    // const changePasswordHandler = async () => {
    //     if (!password || !confirmPassword) {
    //         Toast.show({
    //             type: 'error',
    //             text1: 'Incomplete Information',
    //             text2: 'All fields are required.',
    //             position: 'top',
    //             topOffset: 10,
    //         });
    //         return;
    //     } else {
    //         try {
    //             setLoading(true);
    //             // Data object as per the API requirement
    //             const data = {
    //                 mobile: mobileNumber,
    //                 otp: otp,
    //                 password: password,
    //                 confirm_password: confirmPassword
    //             };

    //             // API Call using axios
    //             const response = await axios.post(`/user/change/password/submit`, data, {
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 }
    //             });

    //             console.log('change password', response);

    //             // Handle success response
    //             if (!response.data.status) {
    //                 navigation.navigate('Login');

    //                 Toast.show({
    //                     type: 'success',
    //                     text1: 'Success',
    //                     text2: 'Password changed successfully',
    //                     position: 'top',
    //                     topOffset: 50,
    //                 });

    //                 setPassword('');
    //                 setConfirmPassword('');
    //             } else {
    //                 Alert.alert(response?.data?.message || 'Something went wrong.', 'Please try again.');
    //             }
    //         } catch (error) {
    //             // Handle error response
    //             if (error.response) {
    //                 Alert.alert("Error", error.response.data.message || "Something went wrong. Please try again.");
    //             } else {
    //                 Alert.alert("Error", "Network error. Please check your internet connection and try again.");
    //             }
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    // }

    const temporaryPasswordHandler = () => {
        navigation.navigate('Login');

        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Password changed successfully',
            position: 'top',
            topOffset: 15,
        });

        setPassword('');
        setConfirmPassword('');
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <StatusBar
                animated={true}
                backgroundColor="#000"
                barStyle="light-content"
            />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={'padding'}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {/* Header */}
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginVertical: 15, paddingHorizontal: 13 }}>
                        <Icon4 name="arrowleft" size={23} color={'#fff'} />
                    </TouchableOpacity>

                    {/* Content */}
                    <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 40 }}>
                        {/* Image */}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
                            <Image source={require('../assets/forgotPassword.png')} style={{ width: 280, height: 280, resizeMode: 'contain' }} />
                        </View>

                        {/* Password */}
                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.8), marginBottom: 5 }}>Password</Text>
                        <TextInput
                            placeholder="Your password"
                            placeholderTextColor="#666"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={show}
                            style={{
                                backgroundColor: '#1c1c1c',
                                paddingVertical: 6,
                                paddingHorizontal: 15,
                                color: '#fff',
                                borderRadius: 8,
                                fontSize: responsiveFontSize(1.8),
                                marginBottom: 25,
                                borderColor: isPasswordFocused ? blue1 : '',
                                borderWidth: isPasswordFocused ? 1 : 0,
                            }}
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)}
                        />

                        {/* Confirm Password */}
                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.8), marginBottom: 5 }}>Confirm Password</Text>
                        <TextInput
                            placeholder="Confirm password"
                            placeholderTextColor="#666"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={show}
                            style={{
                                backgroundColor: '#1c1c1c',
                                paddingVertical: 6,
                                paddingHorizontal: 15,
                                color: '#fff',
                                borderRadius: 8,
                                fontSize: responsiveFontSize(1.8),
                                marginBottom: 10,
                                borderColor: isConfirmPasswordFocused ? blue1 : '',
                                borderWidth: isConfirmPasswordFocused ? 1 : 0,
                            }}
                            onFocus={() => setIsConfirmPasswordFocused(true)}
                            onBlur={() => setIsConfirmPasswordFocused(false)}
                        />

                        {/* Update Password button */}
                        <LinearGradient
                            colors={[blue1, blue3]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                                borderRadius: 10,
                                paddingHorizontal: 24,
                                elevation: 2,
                                marginTop: 40,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <TouchableOpacity
                                // onPress={changePasswordHandler}
                                onPress={temporaryPasswordHandler}
                                style={{ gap: 5, height: 47, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '65%' }}
                            >
                                <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '600' }}>Update Password</Text>
                                <MaterialIcons name="lock-reset" size={23} color={'#fff'} />
                            </TouchableOpacity>
                        </LinearGradient>

                        {/* Already have an account */}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'flex-end' }}>
                            <Text style={{ color: '#a2a2a2', fontSize: responsiveFontSize(1.7), fontWeight: '500' }}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={{ color: blue1, fontSize: responsiveFontSize(1.8), fontWeight: '600' }}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default ForgotPassword;