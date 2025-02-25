import { View, Text, StatusBar, TouchableOpacity, Image, ActivityIndicator, ScrollView, Animated } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { background, darkBlue, lightBlue } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { fetchCoupons } from '../utils/fetchCoupons';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import phonepeSDK from 'react-native-phonepe-pg';
import Base64 from 'react-native-base64';
import sha256 from 'sha256';

const Checkout = ({ navigation, route }) => {

    const userDetails = useSelector(state => state.user);
    // console.log('userDetails: ', userDetails);

    const { item } = route?.params;
    const { type } = route?.params;

    console.log('item checkout: ', item);
    // console.log('type: ', type);

    const [loading, setLoading] = useState(false);

    const translateX = useRef(new Animated.Value(0)).current;

    const [environment, setenvironment] = useState("SANDBOX");
    const [merchantId, setmerchantId] = useState("PGTESTPAYUAT86");
    const [appId, setappId] = useState(null);
    const [enableLogging, setenableLogging] = useState(true);

    const generatetransactionId = () => {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000000);
        const merchantPrefix = "T";
        return `${merchantPrefix}${timestamp}${random}`
    }

    const buyHandler = async () => {
        try {
            setLoading(true);

            const data = {
                id: item.id,
                type: type,
                coupon_id: null
            };

            const response = await axios.post(`/user/order/place`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('order response: ', response);

            const price = response?.data?.data?.order?.fee;

            if (response?.data?.status) {

                const submitHandler = async () => {
                    try {
                        console.log('Initializing PhonePe SDK...');
                        const initResponse = await phonepeSDK.init(environment, merchantId, appId, enableLogging);
                        console.log('PhonePe SDK initialized:', initResponse);

                        const requestBody = {
                            merchantId: merchantId,
                            merchantTransactionId: generatetransactionId(),
                            merchantUserId: "MUID123",
                            amount: price * 100,
                            callbackurl: "https://webhook.site/callback-url",
                            mobileNumber: userDetails?.[0]?.mobileNumber,
                            paymentInstrument: {
                                type: "PAY_PAGE",
                            },
                        }

                        const salt_key = "96434309-7796-489d-8924-ab56988a6076";
                        const salt_Index = 1;
                        const payload = JSON.stringify(requestBody);
                        console.log('payload: ', payload);
                        const payload_main = Base64.encode(payload);
                        console.log('payload_main: ', payload_main);
                        const string = payload_main + "/pg/v1/pay" + salt_key;

                        const checksum = sha256(string) + "###" + salt_Index;

                        console.log('checksum: ', checksum);
                        console.log('Starting transaction with payload: ', payload_main);

                        const transactionResponse = await phonepeSDK.startTransaction(
                            payload_main,
                            checksum,
                            null,
                            null
                        );

                        console.log('Transaction response: ', transactionResponse);

                        if (transactionResponse.status) {
                            navigation.navigate('OrderPlaced');
                        }
                    } catch (err) {
                        // console.error('Error during PhonePe transaction: ', err);
                    }
                }

                submitHandler();
            }

            // Toast.show({
            //     type: 'success',
            //     text1: "Successful",
            //     text2: response?.data?.message,
            //     position: 'top',
            //     topOffset: 5,
            // });

            // navigation.navigate('Main');

        } catch (error) {
            console.log('error', error);
        } finally {
            setLoading(false);
        }
    };

    // get coupons
    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const data = await fetchCoupons(userDetails);
                    // console.log('profile: ', data);

                    // setData(data);
                } catch (error) {
                    console.error('Error fetching boards: ', error);
                }
            };

            fetchData();
        }, [userDetails])
    );

    useEffect(() => {
        // Infinite loop for arrow movement
        Animated.loop(
            Animated.sequence([
                Animated.timing(translateX, {
                    toValue: 10, // Move arrows 10px to the right
                    duration: 500, // Half a second
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: 0, // Move arrows back to the original position
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [translateX]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingHorizontal: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, justifyContent: 'space-between', marginBottom: 10 }}>
                <TouchableOpacity style={{ borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: darkBlue }} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" style={{ color: '#fff' }} size={15} />
                </TouchableOpacity>
                <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.3) }}>Checkout</Text>
                <View style={{ width: 35, height: 35 }} />
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
                {/* Image */}
                <Image source={{ uri: item.image }} style={{ width: '100%', height: 200, marginVertical: 16 }} resizeMode='contain' />

                {/* Name */}
                <View style={{ width: '100%', paddingVertical: 12, borderRadius: 10, backgroundColor: lightBlue, borderColor: darkBlue, borderWidth: 1.5, justifyContent: 'center', flexDirection: 'row' }}>
                    <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: '600', color: darkBlue, textTransform: 'uppercase' }}>{item.name}</Text>
                </View>

                {/* Description */}
                <View style={{ elevation: 1, marginHorizontal: 1, alignSelf: 'center', marginTop: 15, width: '99%', borderRadius: 12, backgroundColor: '#fff', justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 15 }}>
                    <View style={{ backgroundColor: darkBlue, paddingVertical: 12, width: '100%', flexDirection: 'row', justifyContent: 'center', borderRadius: 10, marginBottom: 8 }}>
                        <Text style={{ color: '#fff', fontWeight: '500', fontSize: responsiveFontSize(2.1) }}>Description:</Text>
                    </View>

                    <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000', marginBottom: 8, lineHeight: 18, fontWeight: '400' }}>{item?.desc?.replace(/<[^>]+>/g, '')}</Text>

                    {/* Chapters */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5, width: '100%' }}>
                        <View style={{ backgroundColor: darkBlue, padding: 5, borderRadius: 8 }}>
                            <Ionicons name="book" size={15} color="#fff" />
                        </View>

                        <Text style={{ fontSize: responsiveFontSize(2), color: '#000', fontWeight: '500' }}>Chapters:</Text>

                        <Text style={{ fontSize: responsiveFontSize(2), color: '#000', fontWeight: '500' }}>{item.total_chapter}</Text>
                    </View>
                </View>

                {/* Coupons */}
                <View style={{ backgroundColor: '#fff', borderRadius: 15, padding: 12, elevation: 2, marginTop: 15, marginHorizontal: 1 }}>
                    <Text style={{ color: '#7c8b9b', fontSize: 14, textTransform: 'uppercase', fontWeight: '600', letterSpacing: 1, marginBottom: 10 }}>Savings Corner</Text>

                    {/* Apply Coupon Section */}
                    <TouchableOpacity onPress={() => navigation.navigate('Coupons')} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <View style={{ backgroundColor: darkBlue, borderRadius: 6, width: 22, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <MaterialIcons name="local-offer" size={13} color="#fff" />
                        </View>

                        <Text style={{ flex: 1, marginLeft: 10, color: '#4c5763', fontSize: responsiveFontSize(2), fontWeight: '600' }}>Apply Coupon</Text>

                        <MaterialIcons name="keyboard-arrow-right" size={20} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* Price Details */}
                <View style={{ backgroundColor: '#CC6600', borderRadius: 12, padding: 16, marginTop: 15, elevation: 1 }}>
                    <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: '600', color: '#fff', marginBottom: 10, textAlign: 'center', borderBottomColor: '#fff', borderBottomWidth: 1, paddingBottom: 10, textTransform: 'uppercase' }}>Price Details</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', fontWeight: '500' }}>Price:</Text>
                        <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', fontWeight: '500' }}>₹ {item.price}.00</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', fontWeight: '500' }}>Discount:</Text>
                        <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', fontWeight: '500' }}>₹ {item.discount || 0}.00</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#d9efff', paddingTop: 10 }}>
                        <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: 'bold', color: '#fff' }}>Total:</Text>
                        <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: 'bold', color: '#fff' }}>
                            ₹ {(item.price - (item.discount || 0)).toFixed(2)}
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Purchase button */}
            <LinearGradient
                colors={['#000', darkBlue]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ borderRadius: 14, elevation: 2, width: '100%', height: 48, position: 'absolute', bottom: 8, alignSelf: 'center', alignItems: 'center', flexDirection: 'row' }}
            >
                <TouchableOpacity
                    style={{ paddingVertical: 8, borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', gap: 5, width: '100%', paddingHorizontal: 7, height: '100%' }}
                    onPress={buyHandler}
                >
                    {loading ? (
                        <View style={{ width: '100%', alignSelf: 'center' }}>
                            <ActivityIndicator size='small' color={'#fff'} />
                        </View>
                    ) : (
                        <>
                            <View style={{ height: '100%', backgroundColor: '#fff', paddingHorizontal: 10, borderRadius: 8, height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: darkBlue, fontWeight: '800', fontSize: responsiveFontSize(2.3) }}>₹ {item.price}.00</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Text style={{ fontSize: responsiveFontSize(2.2), color: '#fff', fontWeight: 'bold' }}>Purchase Now</Text>

                                {/* Animated Arrows */}
                                <View style={{ flexDirection: 'row', overflow: 'hidden', paddingRight: 20, }}>
                                    {Array(3)
                                        .fill(0)
                                        .map((_, index) => (
                                            <Animated.Text
                                                key={index}
                                                style={{
                                                    transform: [{ translateX }],
                                                }}
                                            >
                                                <Ionicons name="caret-forward" style={{ color: '#fff' }} size={18} />
                                            </Animated.Text>
                                        ))}
                                </View>
                            </View>
                        </>
                    )}
                </TouchableOpacity>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default Checkout;