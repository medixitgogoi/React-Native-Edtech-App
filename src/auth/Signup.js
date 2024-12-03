import { useEffect, useRef, useState } from 'react';
import { Alert, StatusBar, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Animated, Dimensions, SectionList } from 'react-native';
import { background, lightBlue, darkBlue } from '../utils/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/dist/Feather';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/LoginSlice';
import Toast from 'react-native-toast-message';
import { fetchBoards } from '../utils/fetchBoards';
import { fetchClasses } from '../utils/fetchClasses';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addUser } from '../redux/UserSlice';

const { width: screenWidth } = Dimensions.get('window');

const Signup = ({ route }) => {

  // const userDetails = useSelector(state => state.user);
  // console.log('userDetails', userDetails);

  const navigation = useNavigation();

  const slideAnim = useRef(new Animated.Value(0)).current;

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [mobile, setMobile] = useState(null);

  const [otp, setOtp] = useState(null);

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

  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);

  // set mobile and otp
  useEffect(() => {
    setMobile(route?.params?.mobile);
    setOtp(route?.params?.otp);
  }, []);

  // get boards
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBoards();
        setBoards(data);
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    };

    fetchData();
  }, []);

  const registerUser = async () => {

    if (!selectedClassId) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Select a class to continue',
        position: 'top',
        topOffset: 5,
      });

      return;
    }

    try {
      setLoading(true);
      // Data object as per the API requirement
      const data = {
        mobile: mobile,
        otp: otp,
        name: name,
        email: email,
        password: password,
        confirm_password: confirmPassword,
        board_id: selectedBoardId,
        class_id: selectedClassId
      };

      // API Call using axios
      const response = await axios.post(`/user/registration/detail/update`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('signup', response);

      // Handle success response
      if (response.data.status) {

        const userInfo = {
          name: response?.data?.data?.name,
          email: response?.data?.data?.email,
          mobileNumber: response?.data?.data?.mobile,
          accessToken: response?.data?.access_token,
        };

        dispatch(addUser(userInfo));
        await AsyncStorage.setItem('userDetails', JSON.stringify(userInfo));

        setName('');
        setPassword('');
        setConfirmPassword('');
        setEmail('');
        setSelectedBoardId(null);
        setSelectedClassId(null);


      } else {
        Toast.show({
          type: 'error',
          text1: response?.data?.message || 'Something went wrong.',
          text2: 'Please try again.',
          position: 'top',
          topOffset: 50,
        });
      }

      setLoading(false);

    } catch (error) {
      // Handle error response
      if (error.response) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.response.data.message || "Something went wrong. Please try again.",
          position: 'top',
          topOffset: 5,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: "Network error. Please check your internet connection and try again.",
          position: 'top',
          topOffset: 5,
        });
      }
    }
  };

  const nextHandler = () => {
    if (!name || !email || !password || !confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'All fields are necessary!',
        position: 'top',
        topOffset: 5,
      });

      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Passwords do not match!',
        position: 'top',
        topOffset: 5,
      });

      return;
    }

    // Proceed with slide animation if validation passes
    Animated.timing(slideAnim, {
      toValue: slideAnim._value - screenWidth, // Move the slide animation to the next section
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // board selection handler
  const boardSelectionHandler = async () => {
    if (!selectedBoardId) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Select a board to continue',
        position: 'top',
        topOffset: 5,
      });
      return;
    }

    try {
      // Call fetchClasses and handle the response
      const classes = await fetchClasses(selectedBoardId);

      setClasses(classes); // Update state with the fetched classes

      // Proceed with slide animation if validation and fetch succeed
      Animated.timing(slideAnim, {
        toValue: slideAnim._value - screenWidth, // Move the slide animation to the next section
        duration: 300,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
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
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="always">
            {/* Back button */}
            <TouchableOpacity style={{ borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: darkBlue, marginLeft: 10, marginTop: 5 }} onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" style={{ color: '#fff' }} size={15} />
            </TouchableOpacity>

            {/* Content */}
            <View style={{ flex: 1, flexDirection: 'column', gap: 30, paddingVertical: 50 }}>
              {/* Heading */}
              <View style={{ marginBottom: 40, marginLeft: 15 }}>
                <Text style={{ fontSize: responsiveFontSize(3.5), fontWeight: '700', color: '#000', marginBottom: 6 }}>Create Your Gyano Account</Text>
                <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '400', color: '#333', fontWeight: '500' }}>Unlock your potential and start learning today!</Text>
              </View>

              {/* Slidable sections */}
              <Animated.View
                style={{
                  flexDirection: 'row',
                  width: screenWidth * 3, // The total width (3 sections)
                  transform: [{ translateX: slideAnim }], // Apply the sliding animation
                }}
              >
                {/* Slide 1 - Basic details section */}
                <View style={{ width: screenWidth, paddingHorizontal: 15, flexDirection: 'column' }}>
                  {/* Heading */}
                  <View style={{ marginBottom: 20, flexDirection: 'row', gap: 8, alignItems: 'center', }}>
                    <View style={{ borderRadius: 8, justifyContent: 'center', flexDirection: 'row', gap: 8, alignItems: 'center', width: 25, height: 25, backgroundColor: darkBlue, }}>
                      <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.6), fontWeight: '600' }}>1</Text>
                    </View>

                    <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '500', color: '#000', }}>Let's begin by adding your basic information</Text>
                  </View>

                  {/* Text Inputs */}
                  <View>
                    {/* Name */}
                    <TextInput
                      style={{ height: 45, borderColor: isNameFocused ? '#000' : '#ccc', fontWeight: "500", borderWidth: 1.4, borderRadius: 8, paddingHorizontal: 15, fontSize: responsiveFontSize(2), color: '#000' }}
                      placeholder="Enter Your Name"
                      value={name}
                      onChangeText={setName}
                      selectionColor={darkBlue}
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
                      selectionColor={darkBlue}
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
                        selectionColor={darkBlue}
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
                        selectionColor={darkBlue}
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

                  {/* Next button */}
                  <LinearGradient
                    colors={[darkBlue, '#5badff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ marginTop: 40, borderRadius: 12, elevation: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <TouchableOpacity onPress={nextHandler} style={{ gap: 5, height: 47, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                      <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '600', }}>Next</Text>
                      <Icon4 name="arrowright" size={23} color='#fff' />
                    </TouchableOpacity>
                  </LinearGradient>
                </View>

                {/* Slide 2 - Board selection */}
                <View style={{ flexDirection: 'column', width: screenWidth, paddingHorizontal: 15 }}>
                  {/* Heading */}
                  <View style={{ marginBottom: 20, flexDirection: 'row', gap: 8, alignItems: 'center', }}>
                    <View style={{ borderRadius: 8, justifyContent: 'center', flexDirection: 'row', gap: 8, alignItems: 'center', width: 25, height: 25, backgroundColor: darkBlue, }}>
                      <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.6), fontWeight: '600' }}>2</Text>
                    </View>

                    <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '500', color: '#000', }}>Select the board you are stuying in</Text>
                  </View>

                  {/* Boards */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    {boards?.map(item => (
                      <TouchableOpacity onPress={() => setSelectedBoardId(item.id)} key={item.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 5, elevation: 1, backgroundColor: selectedBoardId === item.id ? darkBlue : '#fff', paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8, borderColor: darkBlue, borderWidth: 1, alignSelf: 'flex-start' }}>
                        {selectedBoardId === item.id && <AntDesign name="check" style={{ color: '#fff' }} size={15} />}
                        <Text style={{ color: selectedBoardId === item.id ? '#fff' : darkBlue, fontWeight: '600', fontSize: responsiveFontSize(1.8) }}>{item.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Next button */}
                  <LinearGradient
                    colors={[darkBlue, '#5badff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ borderRadius: 12, elevation: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 40 }}
                  >
                    <TouchableOpacity onPress={boardSelectionHandler} style={{ gap: 5, height: 47, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                      <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '600', }}>Next</Text>
                      <Icon4 name="arrowright" size={23} color='#fff' />
                    </TouchableOpacity>
                  </LinearGradient>
                </View>

                {/* Slide 3 - Class selection */}
                <View style={{ flexDirection: 'column', width: screenWidth, paddingHorizontal: 15 }}>
                  {/* Heading */}
                  <View style={{ marginBottom: 20, flexDirection: 'row', gap: 8, alignItems: 'center', }}>
                    <View style={{ borderRadius: 8, justifyContent: 'center', flexDirection: 'row', gap: 8, alignItems: 'center', width: 25, height: 25, backgroundColor: darkBlue, }}>
                      <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.6), fontWeight: '600' }}>3</Text>
                    </View>

                    <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '500', color: '#000', }}>Select the class you are stuying in</Text>
                  </View>

                  {/* Classes */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    {classes?.map(item => (
                      <TouchableOpacity onPress={() => setSelectedClassId(item.id)} key={item.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 5, elevation: 1, backgroundColor: selectedClassId === item.id ? darkBlue : '#fff', paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8, borderColor: darkBlue, borderWidth: 1, alignSelf: 'flex-start' }}>
                        {selectedClassId === item.id && <AntDesign name="check" style={{ color: '#fff' }} size={15} />}
                        <Text style={{ color: selectedClassId === item.id ? '#fff' : darkBlue, fontWeight: '600', fontSize: responsiveFontSize(1.8) }}>{item.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Buttons */}
                  <View style={{ marginTop: 40, }}>
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
              </Animated.View>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Signup;