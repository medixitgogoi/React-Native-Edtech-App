import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, Image, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import Icon2 from 'react-native-vector-icons/dist/FontAwesome';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { background, darkBlue, lightBlue } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import { fetchAppLoad } from '../utils/fetchAppLoad';

const EditProfile = ({ route }) => {

    const { data } = route.params;

    const userDetails = useSelector(state => state.user);
    // console.log('userDetails', userDetails);

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [isNameFocused, setIsNameFocused] = useState(false);

    const [email, setEmail] = useState('');
    const [isEmailFocused, setIsEmailFocused] = useState(false);

    const [gender, setGender] = useState('M');
    const [isGenderFocused, setIsGenderFocused] = useState(false);

    const [schoolName, setSchoolName] = useState('Sai Vikash School');
    const [isSchoolFocused, setIsSchoolFocused] = useState(false);

    const [city, setCity] = useState('Guwahati');
    const [isCityFocused, setIsCityFocused] = useState(false);

    const [state, setState] = useState('Assam');
    const [isStateFocused, setIsStateFocused] = useState(false);

    const [loading, setLoading] = useState(false);

    const [appLoad, setAppLoad] = useState(null);

    const [error, setError] = useState(false);

    const [dob, setDob] = useState('2000-10-10');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isDobFocused, setIsDobFocused] = useState(false);

    // fetch app load
    useEffect(() => {
        if (userDetails) {
            const fetchData = async () => {
                try {
                    const data = await fetchAppLoad(userDetails);
                    setAppLoad(data); // Update state

                    setName(data?.user?.name); // Use 'data' directly to set the name
                    setEmail(data?.user?.email); // Use 'data' directly to set the email
                } catch (error) {
                    console.error('Error fetching appLoad: ', error);
                }
            };

            fetchData();
        }
    }, [userDetails]);

    // useEffect for setting the user details
    // useEffect(() => {
    //     setName(appLoad?.user?.name);
    //     setEmail(appLoad?.user?.email);
    //     if (userDetails?.[0]?.gender) {
    //         setGender(userDetails?.[0]?.gender);
    //     }
    // }, []);

    // // updateHandler
    // const updateHandler = async () => {
    //     // Check if any of the fields are empty
    //     if (!name || !email || !gender) {
    //         // setError(true);

    //         // Display error Toast
    //         Toast.show({
    //             type: 'error',
    //             text1: 'Please fill all the details',
    //             text2: 'All fields are required to proceed.',
    //             position: 'top',
    //             topOffset: 10,
    //         });

    //         return; // Exit the function if validation fails
    //     }

    //     try {
    //         setLoading(true);

    //         // Data object as per the API requirement
    //         const data = {
    //             name: name,
    //             email: email,
    //             gender: gender,
    //         };

    //         // API Call using axios
    //         const response = await axios.post(`/user/profile/update`, data, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });

    //         console.log('editProfile', response);

    //         // Handle success response
    //         if (response?.data?.status) {
    //             Toast.show({
    //                 type: 'success',
    //                 text1: 'User Details updated successfully',
    //                 text2: `Profile updated for ${response?.data?.data?.name}.`,
    //                 position: 'top',
    //                 topOffset: 10,
    //             });

    //             navigation.navigate('Profile');

    //             setIsEmailFocused(false);
    //             setIsNameFocused(false);
    //             setIsGenderFocused(false);

    //             const userInfo = {
    //                 password: password,
    //                 accessToken: accessToken,
    //                 name: response?.data?.data?.name,
    //                 email: response?.data?.data?.email,
    //                 gender: response?.data?.data?.gender,
    //                 mobileNumber: mobileNumber,
    //             };

    //             dispatch(addUser(userInfo));
    //             await AsyncStorage.setItem('userDetails', JSON.stringify(userInfo));
    //         } else {
    //             Toast.show({
    //                 type: 'error',
    //                 text1: 'Update failed',
    //                 text2: response?.data?.message || 'Something went wrong.',
    //                 position: 'top',
    //                 topOffset: 10,
    //             });
    //         }
    //     } catch (error) {
    //         // Handle error response
    //         if (error.response) {
    //             Toast.show({
    //                 type: 'error',
    //                 text1: 'Something went wrong.',
    //                 text2: error.response.data?.message || 'Please try again.',
    //                 position: 'top',
    //                 topOffset: 10,
    //             });
    //         } else {
    //             Toast.show({
    //                 type: 'error',
    //                 text1: 'Network error',
    //                 text2: 'Please check your internet connection and try again.',
    //                 position: 'top',
    //                 topOffset: 10,
    //             });
    //         }
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // // Reset error when input fields are modified
    // useEffect(() => {
    //     if (name && email && gender) {
    //         setError(false); // Clear error when all fields are filled
    //     }
    // }, [name, email, gender]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                animated={true}
                backgroundColor={'#fff'}
                barStyle="dark-content"
            />

            {/* Linear Gradient Background */}
            <LinearGradient
                colors={['#fff', '#e2f3ff']}
                style={{ flex: 1 }}
            >
                {/* Header */}
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 4 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
                        <Icon4 name="arrowleft" size={22} color={'#000'} />
                    </TouchableOpacity>

                    <View style={{ position: 'absolute', left: 0, right: 0, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2.4), fontWeight: '500' }}>Edit Profile</Text>
                    </View>
                </View>

                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 100}
                >
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Avatar */}
                        <View style={{ width: 120, height: 120, alignSelf: 'center', borderRadius: 100, overflow: 'hidden', marginTop: 20, marginBottom: 15, backgroundColor: lightBlue, borderColor: darkBlue, borderWidth: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../assets/person.png')} style={{ height: '65%', width: '65%', resizeMode: 'contain', margin: 2 }} />
                        </View>

                        {/* Details */}
                        <View style={{ borderRadius: 17, paddingVertical: 20, width: '100%', borderColor: darkBlue }}>
                            {/* Mobile Input */}
                            <View style={{ width: '100%', flexDirection: 'column', paddingHorizontal: 15, gap: 3, }}>
                                <Text style={{ color: '#888888', zIndex: 1, fontWeight: '500', fontStyle: 'italic', fontSize: responsiveFontSize(1.9) }}>Mobile</Text>
                                <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', height: 38, backgroundColor: '#efefef', borderRadius: 9, elevation: 1, justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#6f6f6f', fontWeight: '500', fontStyle: 'italic' }}>+91 {appLoad?.user?.mobile}</Text>
                                    <Icon name="block" size={20} color={'red'} />
                                </View>
                            </View>

                            {/* Board Input */}
                            <View style={{ width: '100%', flexDirection: 'column', paddingHorizontal: 15, gap: 3, marginTop: 20 }}>
                                <Text style={{ color: '#888888', zIndex: 1, fontWeight: '500', fontStyle: 'italic', fontSize: responsiveFontSize(1.9) }}>Board</Text>
                                <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', height: 38, backgroundColor: '#efefef', borderRadius: 9, elevation: 1, justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#6f6f6f', fontWeight: '500', fontStyle: 'italic' }}>{appLoad?.user?.board}</Text>
                                    <Icon name="block" size={20} color={'red'} />
                                </View>
                            </View>

                            {/* Class Input */}
                            <View style={{ width: '100%', flexDirection: 'column', paddingHorizontal: 15, gap: 3, marginTop: 20 }}>
                                <Text style={{ color: '#888888', zIndex: 1, fontWeight: '500', fontStyle: 'italic', fontSize: responsiveFontSize(1.9) }}>Class</Text>
                                <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', height: 38, backgroundColor: '#efefef', borderRadius: 9, elevation: 1, justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#6f6f6f', fontWeight: '500', fontStyle: 'italic' }}>{appLoad?.user?.class}</Text>
                                    <Icon name="block" size={20} color={'red'} />
                                </View>
                            </View>

                            {/* Name Input */}
                            <View style={{ width: '100%', flexDirection: 'column', paddingHorizontal: 15, gap: 3, marginTop: 20 }}>
                                <Text style={{ color: isNameFocused ? darkBlue : '#000', fontWeight: '500', fontSize: responsiveFontSize(1.9) }}>Enter Your Name</Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <TextInput
                                        style={{ height: 38, color: '#000', fontWeight: '500', borderColor: isNameFocused ? darkBlue : '#ccc', borderWidth: 1, width: '100%', borderRadius: 9, paddingLeft: 10, backgroundColor: 'white' }}
                                        value={name}
                                        onChangeText={setName}
                                        onFocus={() => setIsNameFocused(true)}
                                        onBlur={() => setIsNameFocused(false)}
                                    />
                                </View>
                            </View>

                            {/* Email Input */}
                            <View style={{ width: '100%', flexDirection: 'column', paddingHorizontal: 15, gap: 3, marginTop: 20 }}>
                                <Text style={{ color: isEmailFocused ? darkBlue : '#000', fontWeight: '500', fontSize: responsiveFontSize(1.9) }}>Enter Your Email</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <TextInput
                                        style={{ height: 38, color: '#000', fontWeight: '500', borderColor: isEmailFocused ? darkBlue : '#ccc', borderWidth: 1, width: '100%', borderRadius: 9, paddingLeft: 10, backgroundColor: 'white' }}
                                        value={email}
                                        onChangeText={setEmail}
                                        onFocus={() => setIsEmailFocused(true)}
                                        onBlur={() => setIsEmailFocused(false)}
                                    />
                                </View>
                            </View>

                            {/* Gender Input */}
                            <View style={{ width: '100%', flexDirection: 'column', paddingHorizontal: 15, gap: 3, marginTop: 20 }}>
                                <Text style={{ color: isGenderFocused ? darkBlue : '#000', zIndex: 1, fontWeight: '500', fontSize: responsiveFontSize(1.9) }}>Gender</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <TextInput
                                        style={{ height: 38, color: '#000', fontWeight: '500', borderColor: isGenderFocused ? darkBlue : '#ccc', borderWidth: 1, width: '100%', borderRadius: 9, paddingLeft: 10, backgroundColor: 'white' }}
                                        value={gender}
                                        onChangeText={setGender}
                                        onFocus={() => setIsGenderFocused(true)}
                                        onBlur={() => setIsGenderFocused(false)}
                                        placeholder='M or F'
                                    />
                                </View>
                            </View>

                            {/* DOB Input */}
                            <View style={{ width: '100%', flexDirection: 'column', paddingHorizontal: 15, gap: 3, marginTop: 20 }}>
                                <Text style={{ color: isDobFocused ? darkBlue : '#000', fontWeight: '500', fontSize: responsiveFontSize(1.9) }}>Select Your Date of Birth</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity
                                        style={{
                                            height: 38,
                                            color: '#000',
                                            fontWeight: '500',
                                            borderColor: isDobFocused ? darkBlue : '#ccc',
                                            borderWidth: 1,
                                            width: '100%',
                                            borderRadius: 9,
                                            paddingLeft: 10,
                                            justifyContent: 'center',
                                            backgroundColor: 'white',
                                        }}
                                        onPress={() => setShowDatePicker(true)}
                                    >
                                        <Text style={{ color: dob ? '#000' : '#aaa', fontWeight: '500' }}>
                                            {dob || 'Select Date'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Date Picker */}
                                {showDatePicker && (
                                    <DateTimePicker
                                        value={dob ? new Date(dob) : new Date()}
                                        mode="date"
                                        display="calendar"
                                        onChange={(event, selectedDate) => {
                                            setShowDatePicker(false);
                                            if (selectedDate) {
                                                setDob(selectedDate.toISOString().split('T')[0]); // Format date as YYYY-MM-DD
                                            }
                                        }}
                                    />
                                )}
                            </View>

                            {/* School Name Input */}
                            <View style={{ width: '100%', flexDirection: 'column', paddingHorizontal: 15, gap: 3, marginTop: 20 }}>
                                <Text style={{ color: isSchoolFocused ? darkBlue : '#000', fontWeight: '500', fontSize: responsiveFontSize(1.9) }}>Enter Your School Name</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <TextInput
                                        style={{
                                            height: 38,
                                            color: '#000',
                                            fontWeight: '500',
                                            borderColor: isSchoolFocused ? darkBlue : '#ccc',
                                            borderWidth: 1,
                                            width: '100%',
                                            borderRadius: 9,
                                            paddingLeft: 10,
                                            backgroundColor: 'white',
                                        }}
                                        value={schoolName}
                                        onChangeText={setSchoolName}
                                        onFocus={() => setIsSchoolFocused(true)}
                                        onBlur={() => setIsSchoolFocused(false)}
                                    />
                                </View>
                            </View>

                            {/* City Input */}
                            <View style={{ width: '100%', flexDirection: 'column', paddingHorizontal: 15, gap: 3, marginTop: 20 }}>
                                <Text style={{ color: isCityFocused ? darkBlue : '#000', fontWeight: '500', fontSize: responsiveFontSize(1.9) }}>Enter Your City</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <TextInput
                                        style={{
                                            height: 38,
                                            color: '#000',
                                            fontWeight: '500',
                                            borderColor: isCityFocused ? darkBlue : '#ccc',
                                            borderWidth: 1,
                                            width: '100%',
                                            borderRadius: 9,
                                            paddingLeft: 10,
                                            backgroundColor: 'white',
                                        }}
                                        value={city}
                                        onChangeText={setCity}
                                        onFocus={() => setIsCityFocused(true)}
                                        onBlur={() => setIsCityFocused(false)}
                                    />
                                </View>
                            </View>

                            {/* State Input */}
                            <View style={{ width: '100%', flexDirection: 'column', paddingHorizontal: 15, gap: 3, marginTop: 20, marginBottom: 50 }}>
                                <Text style={{ color: isStateFocused ? darkBlue : '#000', fontWeight: '500', fontSize: responsiveFontSize(1.9) }}>Enter Your State</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <TextInput
                                        style={{
                                            height: 38,
                                            color: '#000',
                                            fontWeight: '500',
                                            borderColor: isStateFocused ? darkBlue : '#ccc',
                                            borderWidth: 1,
                                            width: '100%',
                                            borderRadius: 9,
                                            paddingLeft: 10,
                                            backgroundColor: 'white',
                                        }}
                                        value={state}
                                        onChangeText={setState}
                                        onFocus={() => setIsStateFocused(true)}
                                        onBlur={() => setIsStateFocused(false)}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

                {/* Update Profile */}
                <TouchableOpacity style={{ position: 'absolute', bottom: 8, alignSelf: 'center', width: '95%', height: 50, overflow: 'hidden', borderRadius: 12 }}>
                    <LinearGradient
                        colors={[darkBlue, '#5badff']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 5 }}
                    >
                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.2), fontWeight: '600' }}>Update Profile</Text>
                        <Feather name="edit" size={18} color={'#fff'} />
                    </LinearGradient>
                </TouchableOpacity>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default EditProfile;