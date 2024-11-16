import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { blue1, blue2, blue3 } from '../utils/colors';

const Login = () => {

    const navigation = useNavigation();

    const [password, setPassword] = useState('');
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const [mobile, setMobile] = useState('');
    const [isMobileFocused, setIsMobileFocused] = useState(false);

    const [show, setShow] = useState(true);

    const [loading, setLoading] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: '#000', paddingHorizontal: 10, justifyContent: 'center' }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={'padding'}
            >
                {/* Back Button */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 8, width: responsiveWidth(9.5), aspectRatio: 1 / 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <AntDesign name="arrowleft" style={{ color: '#fff' }} size={22} />
                </TouchableOpacity>

                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 40, paddingHorizontal: 5 }}>
                    <Image source={require('../assets/login2.png')} style={{ width: 250, height: 220, marginBottom: 15, alignSelf: 'center' }} />

                    {/* Title */}
                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(3), fontWeight: '600', marginBottom: 40, textAlign: 'center' }}>
                        Log in to Gyano
                    </Text>

                    {/* Mobile Input */}
                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.8), marginBottom: 5 }}>Mobile Number</Text>
                    <TextInput
                        placeholder="Your mobile number"
                        placeholderTextColor="#666"
                        value={mobile}
                        onChangeText={setMobile}
                        keyboardType='number-pad'
                        style={{
                            backgroundColor: '#1c1c1c',
                            paddingVertical: 6,
                            paddingHorizontal: 15,
                            color: '#fff',
                            borderRadius: 8,
                            fontSize: responsiveFontSize(1.8),
                            marginBottom: 20,
                            borderColor: isMobileFocused ? blue1 : '',
                            borderWidth: isMobileFocused ? 1 : 0,
                        }}
                        onFocus={() => setIsMobileFocused(true)}
                        onBlur={() => setIsMobileFocused(false)}
                    />

                    {/* Password Input */}
                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.8), marginBottom: 5 }}>Password</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#1c1c1c', borderRadius: 8, borderColor: isPasswordFocused ? blue1 : '', borderWidth: isPasswordFocused ? 1 : 0, paddingHorizontal: 10, marginBottom: 5 }}>
                        <TextInput
                            placeholder="Your password"
                            placeholderTextColor="#666"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={show}
                            style={{
                                flex: 1,
                                paddingVertical: 6,
                                paddingHorizontal: 5,
                                color: '#fff',
                                fontSize: responsiveFontSize(1.8),

                            }}
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)}
                        />

                        <View style={{ position: 'absolute', right: 5, top: 12 }}>
                            <Feather
                                name={show ? 'eye-off' : 'eye'}
                                onPress={() => setShow(!show)}
                                style={{
                                    color: '#fff',
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
                    <TouchableOpacity
                        onPress={() => navigation.navigate('OtpVerification', { to: 'forgotPassword' })}
                        // onPress={() => navigation.navigate('ForgotPassword')}
                    >
                        <Text style={{ color: blue1, textAlign: 'right', marginBottom: 30, fontSize: responsiveFontSize(1.5), fontWeight: '600' }}>Forgot Password?</Text>
                    </TouchableOpacity>

                    {/* Login Button */}
                    <LinearGradient
                        colors={[blue1, blue3]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ borderRadius: 10, elevation: 2, marginTop: 10, width: '100%', marginBottom: 10 }}
                    >
                        <TouchableOpacity
                            // onPress={handleSendOtpPress}
                            style={{ gap: 5, height: 47, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}
                        >
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600', textAlign: 'center', textTransform: 'uppercase' }}>Login</Text>
                            <MaterialIcons name="login" style={{ color: '#fff' }} size={22} />
                        </TouchableOpacity>
                    </LinearGradient>

                    {/* Already Have an Account Statement */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20, alignItems: 'flex-end' }}>
                        <Text style={{ color: '#a2a2a2', fontSize: responsiveFontSize(1.6) }}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('OtpVerification', { to: 'signup' })}>
                            <Text style={{ color: blue1, fontSize: responsiveFontSize(1.7), fontWeight: '600' }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default Login;