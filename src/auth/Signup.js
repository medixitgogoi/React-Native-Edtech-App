import { background, lightBlue, darkBlue } from '../utils/colors';
import { Alert, StatusBar, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/dist/Feather';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Signup = ({ route }) => {

  // const mobileNumber = route.params.mobile;
  // const otp = route.params.otp;

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [isNameFocused, setIsNameFocused] = useState(false);

  const [password, setPassword] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  const [email, setEmail] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const [show, setShow] = useState(true);
  const [confirmShow, setConfirmShow] = useState(true);

  const registerUser = () => {
    // Handle signup logic here
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Mobile:', mobile);
    console.log('DOB:', dob);
    console.log('Gender:', gender);
    console.log('Address:', address);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        animated={true}
        backgroundColor="#fff"
        barStyle="dark-content"
      />

      {/* Linear Gradient Background */}
      <LinearGradient
        colors={['#fff', '#e4f4ff']}
        style={{ flex: 1 }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={'padding'}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {/* Header */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginVertical: 15, paddingHorizontal: 13 }}>
              <Icon4 name="arrowleft" size={23} color={darkBlue} />
            </TouchableOpacity>

            {/* Content */}
            <View style={{ flex: 1, flexDirection: 'column', paddingHorizontal: 20, gap: 30, paddingVertical: 50 }}>
              {/* Heading */}
              <View style={{ marginBottom: 40 }}>
                <Text style={{ fontSize: responsiveFontSize(3.5), fontWeight: '700', color: '#000', marginBottom: 8 }}>Let's Register Account</Text>
                <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '400', color: '#333', fontWeight: '500' }}>Unlock your potential and start learning today!</Text>
              </View>

              {/* Text Inputs */}
              <View>
                {/* Name */}
                <TextInput
                  style={{ height: 45, borderColor: isNameFocused ? '#000' : '#ccc', fontWeight: "500", borderWidth: 1.4, borderRadius: 8, paddingHorizontal: 15, fontSize: responsiveFontSize(2), color: '#000' }}
                  placeholder="Enter Your Name"
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor={darkBlue}
                  onFocus={() => setIsNameFocused(true)}
                  onBlur={() => setIsNameFocused(false)}
                />

                {/* Email */}
                <TextInput
                  style={{ marginTop: 25, height: 45, borderColor: isEmailFocused ? '#000' : '#ccc', fontWeight: "500", borderWidth: 1.4, borderRadius: 8, paddingHorizontal: 15, fontSize: responsiveFontSize(2), color: '#000' }}
                  placeholder="Enter Your Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType='email-address'
                  placeholderTextColor={darkBlue}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                />

                {/* Password */}
                <View style={{ marginTop: 25 }}>
                  <TextInput
                    style={{ height: 45, borderColor: isPasswordFocused ? '#000' : '#ccc', fontWeight: "500", borderWidth: 1.4, borderRadius: 8, paddingHorizontal: 15, fontSize: responsiveFontSize(2), color: '#000' }}
                    placeholder="Enter Password"
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor={darkBlue}
                    secureTextEntry={show}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                  />
                  <View style={{ position: 'absolute', right: 5, top: 12 }}>
                    <Icon
                      name={show ? 'eye-off' : 'eye'}
                      onPress={() => setShow(!show)}
                      style={{
                        color: '#000',
                        fontSize: responsiveFontSize(2.2),
                        width: 28,
                        height: 28,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    />
                  </View>
                </View>

                {/* Confirm Password */}
                <View style={{ marginTop: 25 }}>
                  <TextInput
                    style={{ height: 45, borderColor: isConfirmPasswordFocused ? '#000' : '#ccc', fontWeight: "500", borderWidth: 1.4, borderRadius: 8, paddingHorizontal: 15, fontSize: responsiveFontSize(2), color: '#000' }}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholderTextColor={darkBlue}
                    secureTextEntry={confirmShow}
                    onFocus={() => setIsConfirmPasswordFocused(true)}
                    onBlur={() => setIsConfirmPasswordFocused(false)}
                  />
                  <View style={{ position: 'absolute', right: 5, top: 12 }}>
                    <Icon
                      name={confirmShow ? 'eye-off' : 'eye'}
                      onPress={() => setConfirmShow(!confirmShow)}
                      style={{
                        color: '#000',
                        fontSize: responsiveFontSize(2.2),
                        width: 28,
                        height: 28,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    />
                  </View>
                </View>
              </View>

              {/* Buttons */}
              <View style={{ marginTop: 20, }}>
                {/* Sign up button */}
                <LinearGradient
                  colors={[darkBlue, '#5badff']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ borderRadius: 12, paddingHorizontal: 24, elevation: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                >
                  <TouchableOpacity onPress={registerUser} disabled={loading} style={{ gap: 5, height: 47, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    {loading ? (
                      <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '600', }}>Signing you up ...</Text>
                    ) : (
                      <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '600', }}>Sign up</Text>
                    )}
                    {!loading && <Icon4 name="arrowright" size={23} color='#fff' />}
                  </TouchableOpacity>
                </LinearGradient>

                {/* Already have an account */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
                  <Text style={{ color: '#333', fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>Already have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{ color: darkBlue, fontSize: responsiveFontSize(1.8), fontWeight: '600' }}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Signup;