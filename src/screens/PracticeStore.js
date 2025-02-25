import { View, Text, TouchableOpacity, FlatList, StatusBar, Dimensions, SafeAreaView, ScrollView, Image } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Foundation from 'react-native-vector-icons/dist/Foundation';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { background, darkBlue, lightBlue } from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchAppLoad } from '../utils/fetchAppLoad';

const courses = [
    { id: '1', title: 'React Native for Beginners', image: 'https://example.com/course1.jpg', price: 499, instructor: 'John Doe', time: 120 },
    { id: '2', title: 'Mastering JavaScript', image: 'https://example.com/course2.jpg', price: 799, instructor: 'Jane Smith', time: 180 },
    { id: '3', title: 'Advanced React', image: 'https://example.com/course3.jpg', price: 999, instructor: 'Alice Johnson', time: 150 },
    { id: '4', title: 'Fullstack Development Bootcamp', image: 'https://example.com/course4.jpg', price: 1499, instructor: 'Bob Williams', time: 300 },
    { id: '5', title: 'Intro to TypeScript', image: 'https://example.com/course5.jpg', price: 599, instructor: 'Emma Brown', time: 90 },
    { id: '6', title: 'Node.js for Beginners', image: 'https://example.com/course6.jpg', price: 499, instructor: 'Chris Green', time: 120 },
    { id: '7', title: 'Building APIs with Express', image: 'https://example.com/course7.jpg', price: 699, instructor: 'Olivia White', time: 150 },
    { id: '8', title: 'Understanding Redux', image: 'https://example.com/course8.jpg', price: 799, instructor: 'Sophia Davis', time: 180 },
    { id: '9', title: 'Deploying Apps with Docker', image: 'https://example.com/course9.jpg', price: 999, instructor: 'Liam Martinez', time: 200 },
    { id: '10', title: 'Kubernetes Fundamentals', image: 'https://example.com/course10.jpg', price: 1199, instructor: 'Ethan Taylor', time: 240 },
];

const Store = ({ navigation, route }) => {

    const totalPrice = courses?.reduce((sum, course) => sum + course?.price, 0);

    const userDetails = useSelector(state => state.user);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingHorizontal: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />

            {userDetails.length === 0 ? (
                <View style={{ width: '100%' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 10, paddingHorizontal: 2, alignSelf: 'flex-start' }}>
                        <Icon4 name="arrowleft" size={23} color={'#000'} />
                    </TouchableOpacity>

                    <View style={{ width: 300, aspectRatio: 1 / 1, alignSelf: 'center' }}>
                        <Image
                            source={require('../assets/fall.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={{ paddingHorizontal: 2 }}>
                        <View style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', borderRadius: 10, elevation: 3, padding: 15 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2.1), fontWeight: '500', marginBottom: 5 }}>Your Store</Text>

                            <Text style={{ color: '#000', fontSize: responsiveFontSize(1.6), marginBottom: 20 }}>Login or sign up to view your store and start adding items</Text>

                            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginBottom: 3, borderColor: darkBlue, borderWidth: 1, borderRadius: 8, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: darkBlue, fontWeight: '600', fontSize: responsiveFontSize(2) }}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ) : (
                <FlatList
                    data={courses}
                    keyExtractor={(item) => item.id}
                    renderItem={
                        ({ item }) => (
                            <View style={{ backgroundColor: '#fff', marginBottom: 15, borderRadius: 14, padding: 12, elevation: 1, overflow: 'hidden' }}>
                                {/* Content Wrapper */}
                                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                    <Image source={require('../assets/maths.png')} style={{ width: 80, height: 80, borderRadius: 10, marginRight: 15 }} />

                                    {/* Item Details */}
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: '600', color: darkBlue, marginBottom: 5 }}>{item.title}</Text>
                                        <Text style={{ color: '#a2a2a2', fontSize: responsiveFontSize(1.8), marginBottom: 5, fontWeight: '500' }}>By {item.instructor}</Text>
                                        <Text style={{ color: '#212121', fontSize: responsiveFontSize(1.6), fontWeight: '500', marginBottom: 5 }}>{item.time} mins</Text>
                                        <Text style={{ fontSize: responsiveFontSize(2), color: '#000', fontWeight: '600' }}>₹{item.price}</Text>
                                    </View>
                                </View>

                                {/* Remove Button */}
                                <TouchableOpacity style={{ backgroundColor: '#FF5252', paddingVertical: 12, alignItems: 'center', borderRadius: 12, flexDirection: 'row', gap: 6, justifyContent: 'center' }}>
                                    <Text style={{ color: '#fff', fontWeight: '600', fontSize: responsiveFontSize(2.1) }}>Remove from Cart</Text>

                                    <View style={{ backgroundColor: '#fff', height: 20, width: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                                        <MaterialCommunityIcons name="cart-remove" style={{ color: '#FF5252' }} size={14} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    ListHeaderComponent={
                        < View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, justifyContent: 'space-between', marginBottom: 5 }}>
                            <TouchableOpacity style={{ borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: darkBlue }} onPress={() => navigation.goBack()}>
                                <AntDesign name="arrowleft" style={{ color: '#fff' }} size={15} />
                            </TouchableOpacity>
                            <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>Your Cart</Text>
                            <View style={{ width: 35, height: 35 }} />
                        </View >
                    }
                    ListFooterComponent={
                        < LinearGradient
                            colors={[darkBlue, '#5badff']}
                            style={{ marginTop: 20, padding: 15, borderTopWidth: 1, borderColor: '#E0E0E0', borderRadius: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3, marginBottom: 10 }}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                                <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: '700', color: '#FFF' }}>Total</Text>
                                <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: '700', color: '#FFF' }}>₹{totalPrice}</Text>
                            </View>

                            <TouchableOpacity style={{ backgroundColor: '#fff', borderRadius: 10, paddingVertical: 10, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 3, flexDirection: 'row', gap: 6 }}>
                                <Text style={{ color: darkBlue, fontSize: responsiveFontSize(2.3), fontWeight: 'bold' }}>Proceed to Checkout</Text>
                                <AntDesign name="arrowright" style={{ color: darkBlue }} size={20} />
                            </TouchableOpacity>
                        </LinearGradient >
                    }
                    contentContainerStyle={{ paddingHorizontal: 1 }}
                />
            )}

        </SafeAreaView>
    );
};

export default Store;