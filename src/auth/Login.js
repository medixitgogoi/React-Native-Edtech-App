import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { lightBlue, darkBlue, background } from '../utils/colors';
import { login } from '../redux/LoginSlice';
import { useDispatch } from 'react-redux';

const Login = () => {

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const [password, setPassword] = useState('');
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const [mobile, setMobile] = useState('');
    const [isMobileFocused, setIsMobileFocused] = useState(false);

    const [show, setShow] = useState(true);

    const [loading, setLoading] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: background, paddingHorizontal: 10, justifyContent: 'center', paddingTop: 5 }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={'padding'}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 40, paddingHorizontal: 5 }} keyboardShouldPersistTaps="handled">
                    <Image source={require('../assets/login5.png')} style={{ width: 250, height: 220, marginBottom: 15, alignSelf: 'center' }} />

                    {/* Title */}
                    <Text style={{ color: darkBlue, fontSize: responsiveFontSize(2.8), fontWeight: '600', marginBottom: 8, textAlign: 'center' }}>
                        Log in to Gyaano
                    </Text>

                    {/* Subheadline */}
                    <Text style={{ color: '#858585', fontSize: responsiveFontSize(1.8), fontWeight: '500', marginBottom: 40, textAlign: 'center', width: '85%', alignSelf: 'center' }}>
                        Empowering your learning journey with seamless access to resources and knowledge.
                    </Text>

                    {/* Mobile Input */}
                    <Text style={{ color: darkBlue, fontSize: responsiveFontSize(2), fontWeight: '500', marginBottom: 5 }}>Mobile Number</Text>
                    <TextInput
                        placeholder="Your mobile number"
                        placeholderTextColor="#8b8b8b"
                        value={mobile}
                        selectionColor={darkBlue}  // Sets the cursor color to black
                        onChangeText={setMobile}
                        keyboardType='number-pad'
                        maxLength={10}
                        style={{
                            backgroundColor: lightBlue,
                            paddingVertical: 6,
                            paddingHorizontal: 15,
                            color: '#000',
                            borderRadius: 8,
                            fontSize: responsiveFontSize(1.8),
                            marginBottom: 20,
                            borderColor: isMobileFocused ? '#000' : '',
                            borderWidth: isMobileFocused ? 1 : 0,
                            elevation: 1,
                            fontWeight: '500'
                        }}
                        onFocus={() => setIsMobileFocused(true)}
                        onBlur={() => setIsMobileFocused(false)}
                    />

                    {/* Password Input */}
                    <Text style={{ color: darkBlue, fontSize: responsiveFontSize(2), fontWeight: '500', marginBottom: 5 }}>Password</Text>
                    
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: lightBlue, borderRadius: 8, borderColor: isPasswordFocused ? '#000' : '', borderWidth: isPasswordFocused ? 1 : 0, paddingHorizontal: 10, marginBottom: 5, elevation: 1 }}>
                        <TextInput
                            placeholder="Your password"
                            placeholderTextColor="#8b8b8b"
                            value={password}
                            onChangeText={setPassword}
                            selectionColor={darkBlue}  // Sets the cursor color to black
                            secureTextEntry={show}
                            style={{
                                flex: 1,
                                paddingVertical: 6,
                                paddingHorizontal: 5,
                                color: '#000',
                                fontSize: responsiveFontSize(1.8),
                                fontWeight: '500'
                            }}
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)}
                        />

                        <View style={{ position: 'absolute', right: 5, top: 12 }}>
                            <Feather
                                name={show ? 'eye-off' : 'eye'}
                                onPress={() => setShow(!show)}
                                style={{
                                    color: darkBlue,
                                    fontSize: responsiveFontSize(1.9),
                                    width: 28,
                                    height: 28,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            />
                        </View>
                    </View>

                    {/* Forgot Password */}
                    <TouchableOpacity onPress={() => navigation.navigate('OtpVerification', { to: 'forgotPassword' })}>
                        <Text style={{ color: darkBlue, textAlign: 'right', marginBottom: 30, fontSize: responsiveFontSize(1.5), fontWeight: '600' }}>Forgot Password?</Text>
                    </TouchableOpacity>

                    {/* Login Button */}
                    <LinearGradient
                        colors={[darkBlue, '#5badff']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ borderRadius: 10, elevation: 2, marginTop: 10, width: '100%', marginBottom: 10 }}
                    >
                        <TouchableOpacity
                            onPress={() => dispatch(login())}
                            // onPress={handleSendOtpPress}
                            style={{ gap: 5, height: 47, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}
                        >
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600', textAlign: 'center', textTransform: 'uppercase' }}>Login</Text>
                            <MaterialIcons name="login" style={{ color: '#fff' }} size={22} />
                        </TouchableOpacity>
                    </LinearGradient>

                    {/* Already Have an Account Statement */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20, alignItems: 'flex-end', gap: 3 }}>
                        <Text style={{ color: '#333', fontSize: responsiveFontSize(1.6) }}>Don't have an account?</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('OtpVerification', { to: 'signup' })}
                        // onPress={() => navigation.navigate('SignUp')}
                        >
                            <Text style={{ color: darkBlue, fontSize: responsiveFontSize(1.7), fontWeight: '600' }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default Login;