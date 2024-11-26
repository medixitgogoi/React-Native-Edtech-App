import { View, Text, TextInput, TouchableOpacity, FlatList, Image, ScrollView, StatusBar, Dimensions, ImageBackground } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, darkBlue, lightBlue } from '../utils/colors';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { useEffect, useRef, useState } from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { trending } from '../utils/trending';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import Icon5 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { logout } from '../redux/LoginSlice';

const Profile = ({ navigation }) => {

    const dispatch = useDispatch();

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />

            {/* Linear Gradient Background */}
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
                                        <Text style={{ color: '#000', fontSize: responsiveFontSize(7), textTransform: 'uppercase' }}>D</Text>
                                    </View>
                                </View>

                                {/* Name and Email */}
                                <View style={{ flexDirection: 'column', gap: 3, width: '65%' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                        <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '600', color: '#fff', textTransform: 'uppercase' }}>Dixit Gogoi</Text>
                                        <View style={{ width: 20, height: 20, backgroundColor: lightBlue, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                            <Icon2 name="male" size={15} color={'#000'} />
                                        </View>
                                        {/* {userDetails?.[0]?.gender === 'M' && (
                                    )}

                                    {userDetails?.[0]?.gender === 'F' && (
                                        <View style={{ width: 20, height: 20, backgroundColor: lightBlue, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                            <Icon2 name="female" size={15} color={'#000'} />
                                        </View>
                                    )} */}
                                    </View>
                                    <Text style={{ fontSize: responsiveFontSize(1.8), color: '#fff', fontWeight: '400' }}>123@gmail.com</Text>
                                </View>
                            </View>
                        </LinearGradient>

                        {/* Profile */}
                        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 16, backgroundColor: '#FFFFFF', paddingVertical: 9, paddingHorizontal: 10, borderRadius: 12, elevation: 1 }}>
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
                            <TouchableOpacity onPress={() => navigation.navigate('Disclaimer', { data: writeUp?.disclaimer })} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
                                <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightBlue, elevation: 1 }}>
                                    <Icon2 name="alert-circle-outline" size={15} color={'#000'} />
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Disclaimer</Text>
                                <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                            </TouchableOpacity>

                            {/* Divider */}
                            <View style={{ width: '86%', alignSelf: 'flex-end', backgroundColor: '#f0f1f2', height: 1 }}></View>

                            {/* Privacy Policy */}
                            <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy', { data: writeUp?.privacy_policy })} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
                                <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightBlue, elevation: 1 }}>
                                    <Icon2 name="shield-outline" size={15} color={'#000'} />
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Privacy Policy</Text>
                                <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                            </TouchableOpacity>

                            {/* Divider */}
                            <View style={{ width: '86%', alignSelf: 'flex-end', backgroundColor: '#f0f1f2', height: 1 }}></View>

                            {/* T&C */}
                            <TouchableOpacity onPress={() => navigation.navigate('TermsAndConditions', { data: writeUp?.terms_condition })} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
                                <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightBlue, elevation: 1 }}>
                                    <Icon4 name="filetext1" size={15} color={'#000'} />
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Terms and Conditions</Text>
                                <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                            </TouchableOpacity>

                            {/* Divider */}
                            <View style={{ width: '86%', alignSelf: 'flex-end', backgroundColor: '#f0f1f2', height: 1 }}></View>

                            {/* Cancellation */}
                            <TouchableOpacity onPress={() => navigation.navigate('Cancellation', { data: writeUp?.cancellation })} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
                                <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightBlue, elevation: 1 }}>
                                    <Icon5 name="cancel" size={15} color={'#000'} />
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Cancellation</Text>
                                <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                            </TouchableOpacity>

                            {/* Divider */}
                            <View style={{ width: '86%', alignSelf: 'flex-end', backgroundColor: '#f0f1f2', height: 1 }}></View>

                            {/* Refund and Return Policy */}
                            <TouchableOpacity onPress={() => navigation.navigate('RefundAndReturn', { data: writeUp?.return_refund })} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
                                <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightBlue, elevation: 1 }}>
                                    <Icon5 name="cash-refund" size={15} color={'#000'} />
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Refund and Return Policy</Text>
                                <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                            </TouchableOpacity>

                            {/* Divider */}
                            <View style={{ width: '86%', alignSelf: 'flex-end', backgroundColor: '#f0f1f2', height: 1 }}></View>

                            {/* Contact */}
                            <TouchableOpacity onPress={() => navigation.navigate('Contact', { data: writeUp?.contact_no })} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
                                <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightBlue, elevation: 1 }}>
                                    <Icon5 name="phone-outline" size={15} color={'#000'} />
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Contact</Text>
                                <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                            </TouchableOpacity>

                            {/* Divider */}
                            <View style={{ width: '86%', alignSelf: 'flex-end', backgroundColor: '#f0f1f2', height: 1 }}></View>

                            {/* Log out */}
                            <TouchableOpacity onPress={() => dispatch(logout())} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
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

        </View>
    )
}

export default Profile