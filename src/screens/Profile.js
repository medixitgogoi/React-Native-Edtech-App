import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { background, darkBlue, lightBlue } from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import Icon5 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useEffect, useState } from 'react';
import { logoutUser } from '../redux/UserSlice';
import { fetchProfileData } from '../utils/fetchProfileData';
import { Image } from 'react-native-animatable';

const Profile = ({ navigation }) => {

    const userDetails = useSelector(state => state.user);

    const dispatch = useDispatch();

    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const [data, setData] = useState(null);

    // get profile data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProfileData(userDetails);
                setData(data);
            } catch (error) {
                console.error('Error fetching boards: ', error);
            }
        };

        fetchData();
    }, []);

    // Logout Handler
    const logOutHandler = async () => {
        try {
            dispatch(logoutUser());
            await AsyncStorage.removeItem('userDetails');

            navigation.navigate('Login');
        } catch {
            Toast.show({
                type: 'error',
                text1: 'Failed to log out',
                text2: `Error: ${error?.message || 'Please try again'}`, // Show error message
                position: 'top', // Show toast at the top
                topOffset: 5, // Adjust position slightly down from the top
            });
        } finally {
            setIsLoggingOut(false); // Ensure this is called regardless of success or failure
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar
                animated={true}
                backgroundColor={isLoggingOut ? '#adadad' : background}
                barStyle="dark-content"
            />

            {/* Content */}
            {userDetails ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9', paddingHorizontal: 20 }}>
                    <View style={{ width: 300, height: 300 }}>
                        <Image
                            source={require('../assets/fallback.jpeg')}
                            style={{
                                width: '100%',
                                height: '100%',
                                opacity: 0.9
                            }}
                            resizeMode="cover"
                        />
                    </View>

                    <Text style={{ color: '#333', fontWeight: '600', fontSize: responsiveFontSize(2.2), textAlign: 'center', marginBottom: 20 }}>You need to log in to continue.</Text>

                    <TouchableOpacity
                        style={{ backgroundColor: darkBlue, paddingVertical: 10, paddingHorizontal: 25, borderRadius: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={{ color: lightBlue, fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>Log In</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <LinearGradient
                    colors={[background, lightBlue]}
                    style={{ flex: 1 }}
                >
                    {/* Header */}
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 10, paddingHorizontal: 13, alignSelf: 'flex-start' }}>
                        <Icon4 name="arrowleft" size={23} color={'#000'} />
                    </TouchableOpacity>

                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 12 }}>
                            {/* Details */}
                            <LinearGradient
                                colors={[darkBlue, '#6ac0ff']}
                                style={{ flex: 1, borderRadius: 20, marginHorizontal: 10, elevation: 1 }}
                            >
                                <View style={{ paddingVertical: 25, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                                    {/* Initial */}
                                    <View style={{ flexDirection: 'column', alignItems: 'center', }}>
                                        <View style={{ height: 100, width: 100, backgroundColor: lightBlue, borderRadius: 100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: '#000', fontSize: responsiveFontSize(7), textTransform: 'uppercase' }}>{userDetails[0]?.name.slice(0, 1)}</Text>
                                        </View>
                                    </View>

                                    {/* Name and Email */}
                                    <View style={{ flexDirection: 'column', gap: 3, width: '65%' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                            <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '600', color: '#fff', textTransform: 'uppercase' }}>{userDetails[0]?.name}</Text>
                                            {userDetails?.[0]?.gender === 'M' && (
                                                <View style={{ width: 20, height: 20, backgroundColor: lightGreen, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Icon2 name="male" size={15} color={backIconColor} />
                                                </View>
                                            )}

                                            {userDetails?.[0]?.gender === 'F' && (
                                                <View style={{ width: 20, height: 20, backgroundColor: lightGreen, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Icon2 name="female" size={15} color={backIconColor} />
                                                </View>
                                            )}
                                        </View>
                                        <Text style={{ fontSize: responsiveFontSize(1.8), color: '#fff', fontWeight: '400' }}>{userDetails[0]?.email}</Text>
                                    </View>
                                </View>
                            </LinearGradient>

                            {/* Profile */}
                            <TouchableOpacity onPress={() => navigation.navigate('EditProfile', { data: data })} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 16, backgroundColor: '#FFFFFF', paddingVertical: 9, paddingHorizontal: 10, borderRadius: 12, elevation: 1 }}>
                                <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightBlue, elevation: 1 }}>
                                    <Icon name="person-outline" size={15} color={'#000'} style={{}} />
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Your profile</Text>
                                <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                            </TouchableOpacity>

                            {/* Transactions */}
                            <View style={{ elevation: 1, width: '100%', gap: 8, marginTop: 10, backgroundColor: '#FFFFFF', paddingVertical: 12, borderRadius: 12 }}>
                                {/* Headline */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9 }}>
                                    <View style={{ backgroundColor: darkBlue, height: 24, width: 3, borderTopRightRadius: 20, borderBottomRightRadius: 20 }}></View>
                                    <Text style={{ color: darkBlue, fontWeight: '700', fontSize: responsiveFontSize(2.1) }}>Transactions</Text>
                                </View>

                                {/* Purchases */}
                                <TouchableOpacity onPress={() => navigation.navigate('Purchases')} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 5, marginBottom: 2 }}>
                                    <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightBlue, elevation: 1 }}>
                                        <Icon2 name="receipt-outline" size={15} color={'#000'} />
                                    </View>
                                    <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Your Purchases</Text>
                                    <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                                </TouchableOpacity>

                                {/* Divider */}
                                {/* <View style={{ width: '86%', alignSelf: 'flex-end', backgroundColor: '#f0f1f2', height: 1 }}></View> */}

                                {/* Address Book */}
                                {/* <TouchableOpacity onPress={() => navigation.navigate('Addresses')} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
                                <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightBlue, elevation: 1 }}>
                                    <Icon3 name="address-book-o" size={15} color={'#000'} />
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Address Book</Text>
                                <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                            </TouchableOpacity> */}
                            </View>

                            {/* More */}
                            <View style={{ elevation: 1, width: '100%', gap: 8, marginTop: 10, backgroundColor: '#FFFFFF', paddingVertical: 12, borderRadius: 12 }}>
                                {/* Headline */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9 }}>
                                    <View style={{ backgroundColor: darkBlue, height: 24, width: 3, borderTopRightRadius: 20, borderBottomRightRadius: 20 }}></View>
                                    <Text style={{ color: darkBlue, fontWeight: '700', fontSize: responsiveFontSize(2.1) }}>More</Text>
                                </View>

                                {/* About */}
                                <TouchableOpacity onPress={() => navigation.navigate('About')} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 5, marginBottom: 2 }}>
                                    <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightBlue, elevation: 1 }}>
                                        <Icon2 name="information-circle-outline" size={15} color={'#000'} />
                                    </View>
                                    <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>About</Text>
                                    <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                                </TouchableOpacity>

                                {/* Divider */}
                                <View style={{ width: '86%', alignSelf: 'flex-end', backgroundColor: '#f0f1f2', height: 1 }}></View>

                                {/* FAQ */}
                                <TouchableOpacity onPress={() => navigation.navigate('Faq')} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
                                    <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightBlue, elevation: 1 }}>
                                        <Icon name="help-outline" size={15} color={'#000'} />
                                    </View>
                                    <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Frequently Asked Questions</Text>
                                    <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                                </TouchableOpacity>

                                {/* Divider */}
                                <View style={{ width: '86%', alignSelf: 'flex-end', backgroundColor: '#f0f1f2', height: 1 }}></View>

                                {/* Disclaimer */}
                                <TouchableOpacity onPress={() => navigation.navigate('Disclaimer')} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
                                    <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightBlue, elevation: 1 }}>
                                        <Icon2 name="alert-circle-outline" size={15} color={'#000'} />
                                    </View>
                                    <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Disclaimer</Text>
                                    <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                                </TouchableOpacity>

                                {/* Divider */}
                                <View style={{ width: '86%', alignSelf: 'flex-end', backgroundColor: '#f0f1f2', height: 1 }}></View>

                                {/* Privacy Policy */}
                                <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
                                    <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightBlue, elevation: 1 }}>
                                        <Icon2 name="shield-outline" size={15} color={'#000'} />
                                    </View>
                                    <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Privacy Policy</Text>
                                    <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                                </TouchableOpacity>

                                {/* Divider */}
                                <View style={{ width: '86%', alignSelf: 'flex-end', backgroundColor: '#f0f1f2', height: 1 }}></View>

                                {/* T&C */}
                                <TouchableOpacity onPress={() => navigation.navigate('Terms')} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
                                    <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightBlue, elevation: 1 }}>
                                        <Icon4 name="filetext1" size={15} color={'#000'} />
                                    </View>
                                    <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Terms and Conditions</Text>
                                    <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                                </TouchableOpacity>

                                {/* Divider */}
                                <View style={{ width: '86%', alignSelf: 'flex-end', backgroundColor: '#f0f1f2', height: 1 }}></View>

                                {/* Cancellation */}
                                <TouchableOpacity onPress={() => navigation.navigate('Cancellation')} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
                                    <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightBlue, elevation: 1 }}>
                                        <Icon5 name="cancel" size={15} color={'#000'} />
                                    </View>
                                    <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Cancellation</Text>
                                    <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                                </TouchableOpacity>

                                {/* Divider */}
                                <View style={{ width: '86%', alignSelf: 'flex-end', backgroundColor: '#f0f1f2', height: 1 }}></View>

                                {/* Refund and Return Policy */}
                                <TouchableOpacity onPress={() => navigation.navigate('Refund')} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
                                    <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightBlue, elevation: 1 }}>
                                        <Icon5 name="cash-refund" size={15} color={'#000'} />
                                    </View>
                                    <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Refund and Return Policy</Text>
                                    <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                                </TouchableOpacity>

                                {/* Divider */}
                                <View style={{ width: '86%', alignSelf: 'flex-end', backgroundColor: '#f0f1f2', height: 1 }}></View>

                                {/* Contact */}
                                <TouchableOpacity onPress={() => navigation.navigate('Contact')} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
                                    <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightBlue, elevation: 1 }}>
                                        <Icon5 name="phone-outline" size={15} color={'#000'} />
                                    </View>
                                    <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Contact</Text>
                                    <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                                </TouchableOpacity>

                                {/* Divider */}
                                <View style={{ width: '86%', alignSelf: 'flex-end', backgroundColor: '#f0f1f2', height: 1 }}></View>

                                {/* Log out */}
                                <TouchableOpacity onPress={() => setIsLoggingOut(true)} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
                                    <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightBlue, elevation: 1 }}>
                                        <Icon2 name="power" size={15} color={'#000'} />
                                    </View>
                                    <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Log out</Text>
                                    <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </LinearGradient>
            )}

            {/* Log out confirm */}
            {isLoggingOut && (
                <View style={{ position: 'absolute', alignItems: 'center', height: '100%', flexDirection: 'row', justifyContent: 'center', width: '100%', backgroundColor: '#00000050' }}>
                    <View style={{ backgroundColor: '#fff', overflow: 'hidden', paddingTop: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 10, width: '80%' }}>
                        <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.2), marginBottom: 30 }}>Are you sure you want to log out?</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                            {/* Cancel */}
                            <TouchableOpacity onPress={() => setIsLoggingOut(false)} style={{ width: '50%', backgroundColor: lightBlue, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 13, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 5 }}>
                                <Text style={{ color: '#000', fontWeight: '600' }}>No, Thank You</Text>
                            </TouchableOpacity>

                            {/* Confirm */}
                            <TouchableOpacity onPress={logOutHandler} style={{ width: '50%', backgroundColor: '#e6191a', paddingVertical: 13, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 5 }}>
                                <Text style={{ color: '#fff', fontWeight: '600' }}>Yes, See you again!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </View>
    )
}

export default Profile;