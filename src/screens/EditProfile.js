import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, Image, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import Icon2 from 'react-native-vector-icons/dist/FontAwesome';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { background, darkBlue, lightBlue } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import { fetchAppLoad } from '../utils/fetchAppLoad';
import axios from 'axios';
import { fetchProfileData } from '../utils/fetchProfileData';

const EditProfile = () => {

    const userDetails = useSelector(state => state.user);
    // console.log('userDetails: ', userDetails);

    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [isNameFocused, setIsNameFocused] = useState(false);

    const [email, setEmail] = useState('');
    const [isEmailFocused, setIsEmailFocused] = useState(false);

    const [gender, setGender] = useState('');
    const [isGenderFocused, setIsGenderFocused] = useState(false);

    const [appLoad, setAppLoad] = useState(null);

    const [loading, setLoading] = useState(false);

    const [dob, setDob] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isDobFocused, setIsDobFocused] = useState(false);

    // get profile data
    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const data = await fetchProfileData(userDetails);
                    console.log('profile: ', data);

                    // setData(data);

                    setName(data?.name); // Use 'data' directly to set the name
                    setEmail(data?.email); // Use 'data' directly to set the email

                    if (data?.gender) {
                        setGender(data?.gender);
                    }

                    if (data?.dob) {
                        setDob(data?.dob);
                    }
                } catch (error) {
                    console.error('Error fetching boards: ', error);
                }
            };

            fetchData();
        }, [userDetails])
    );

    // fetch app load
    useFocusEffect(
        useCallback(() => {
            if (userDetails) {
                const fetchData = async () => {
                    try {
                        const data = await fetchAppLoad(userDetails);
                        setAppLoad(data); // Update state
                    } catch (error) {
                        console.error('Error fetching appLoad: ', error);
                    }
                };

                fetchData();
            }
        }, [userDetails]) // Dependencies go here
    );

    // updateHandler
    const updateHandler = async () => {
        // Check if any of the fields are empty
        if (!name || !email || !gender || !dob) {
            // setError(true);

            // Display error Toast
            Toast.show({
                type: 'error',
                text1: 'Please fill all the details',
                text2: 'All the fields are required to proceed.',
                position: 'top',
                topOffset: 2,
            });

            return; // Exit the function if validation fails
        }

        try {
            setLoading(true);

            // Data object as per the API requirement
            const data = {
                name: name,
                email: email,
                gender: gender,
                dob: dob
            };

            // API Call using axios
            const response = await axios.post(`/user/profile/details/update`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('editProfile: ', response);

            // Handle success response
            if (response?.data?.status) {
                Toast.show({
                    type: 'success',
                    text1: 'User Details updated successfully',
                    text2: `Profile updated for ${response?.data?.data?.name}.`,
                    position: 'top',
                    topOffset: 10,
                });

                setIsEmailFocused(false);
                setIsNameFocused(false);
                setIsGenderFocused(false);
                setIsDobFocused(false);

            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Update failed',
                    text2: response?.data?.message || 'Something went wrong.',
                    position: 'top',
                    topOffset: 10,
                });
            }
        } catch (error) {
            // Handle error response
            if (error.response) {
                Toast.show({
                    type: 'error',
                    text1: 'Something went wrong.',
                    text2: error.response.data?.message || 'Please try again.',
                    position: 'top',
                    topOffset: 10,
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Network error',
                    text2: 'Please check your internet connection and try again.',
                    position: 'top',
                    topOffset: 10,
                });
            }
        } finally {
            setLoading(false);
        }
    };

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
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 50}
                >
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Avatar */}
                        {/* <View style={{ width: 120, height: 120, alignSelf: 'center', borderRadius: 100, overflow: 'hidden', marginTop: 20, marginBottom: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            {gender === 'F' ? (
                                <Image source={require('../assets/fem.png')} style={{ height: '100%', width: '100%', resizeMode: 'contain', margin: 2 }} />
                            ) : (
                                <Image source={require('../assets/mal.png')} style={{ height: '100%', width: '100%', resizeMode: 'contain', margin: 2 }} />
                            )}
                        </View> */}

                        {/* Details */}
                        <View style={{ borderRadius: 17, paddingTop: 20, width: '100%', borderColor: darkBlue }}>
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
                                        placeholderTextColor={'#aaa'}
                                    />
                                </View>
                            </View>

                            {/* DOB Input */}
                            <View style={{ width: '100%', flexDirection: 'column', paddingHorizontal: 15, gap: 3, marginTop: 20, marginBottom: 70 }}>
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
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

                {/* Update Profile */}
                <LinearGradient
                    colors={[darkBlue, '#5badff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ borderRadius: 12, paddingVertical: 13, paddingHorizontal: 24, elevation: 5, marginTop: 30, width: '95%', alignSelf: 'center', position: 'absolute', bottom: 10 }}
                >
                    <TouchableOpacity onPress={updateHandler} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                        {loading ? (
                            <ActivityIndicator size="small" color={'#fff'} />
                        ) : (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.2), fontWeight: '600' }}>Update Profile</Text>
                                <Feather name="edit" size={18} color={'#fff'} />
                            </View>
                        )}
                    </TouchableOpacity>
                </LinearGradient>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default EditProfile;