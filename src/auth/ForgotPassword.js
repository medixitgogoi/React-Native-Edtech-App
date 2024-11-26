import { Image, StatusBar, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaInsetsContext, SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/dist/Feather';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { background, darkBlue, lightBlue } from '../utils/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';

const ForgotPassword = ({ route }) => {

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
        <View style={{ flex: 1, backgroundColor: background, paddingTop: 5 }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={'padding'}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {/* Back Button */}
                    <TouchableOpacity style={{ borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: darkBlue, marginLeft: 10 }} onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" style={{ color: '#fff' }} size={15} />
                    </TouchableOpacity>

                    {/* Content */}
                    <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 40 }}>
                        {/* Image */}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
                            <Image source={require('../assets/forgotPassword.png')} style={{ width: 280, height: 280, resizeMode: 'contain' }} />
                        </View>

                        {/* Password */}
                        <Text style={{ color: darkBlue, fontSize: responsiveFontSize(2), fontWeight: '500', marginBottom: 5 }}>Password</Text>
                        <TextInput
                            placeholder="Your password"
                            placeholderTextColor="#8b8b8b"
                            value={password}
                            onChangeText={setPassword}
                            selectionColor={darkBlue}
                            style={{
                                backgroundColor: lightBlue,
                                paddingVertical: 6,
                                paddingHorizontal: 15,
                                color: '#000',
                                borderRadius: 8,
                                fontSize: responsiveFontSize(1.8),
                                marginBottom: 25,
                                borderColor: isPasswordFocused ? darkBlue : '',
                                borderWidth: isPasswordFocused ? 1 : 0,
                                elevation: 1,
                                fontWeight: '500'
                            }}
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)}
                        />

                        {/* Confirm Password */}
                        <Text style={{ color: darkBlue, fontSize: responsiveFontSize(2), fontWeight: '500', marginBottom: 5 }}>Confirm Password</Text>
                        <TextInput
                            placeholder="Confirm password"
                            placeholderTextColor="#8b8b8b"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            style={{
                                backgroundColor: lightBlue,
                                paddingVertical: 6,
                                paddingHorizontal: 15,
                                color: '#000',
                                borderRadius: 8,
                                fontSize: responsiveFontSize(1.8),
                                marginBottom: 10,
                                borderColor: isConfirmPasswordFocused ? darkBlue : '',
                                borderWidth: isConfirmPasswordFocused ? 1 : 0,
                                fontWeight: '500',
                                elevation: 1
                            }}
                            onFocus={() => setIsConfirmPasswordFocused(true)}
                            onBlur={() => setIsConfirmPasswordFocused(false)}
                        />

                        {/* Update Password button */}
                        <LinearGradient
                            colors={[darkBlue, '#5badff']}
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
                            <Text style={{ color: '#333', fontSize: responsiveFontSize(1.7), fontWeight: '500' }}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={{ color: darkBlue, fontSize: responsiveFontSize(1.8), fontWeight: '600' }}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default ForgotPassword;