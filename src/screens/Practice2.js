import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { fetchCoupons } from '../utils/fetchCoupons';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, darkBlue } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const Coupons = ({ navigation }) => {

    const userDetails = useSelector(state => state.user);

    const [coupons, setCoupons] = useState(null);

    // get coupons
    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const data = await fetchCoupons(userDetails);
                    console.log('coupons: ', data);

                    setCoupons(data);
                } catch (error) {
                    console.error('Error fetching boards: ', error);
                }
            };

            fetchData();
        }, [userDetails])
    );

    const cardItem = ({ item }) => (
        <View style={{ flexDirection: 'row', borderRadius: 14, backgroundColor: '#EDF7EC', elevation: 1 }}>
            {/* Left Section */}
            <View style={{ backgroundColor: '#5EC467', borderTopLeftRadius: 12, borderBottomLeftRadius: 12, paddingHorizontal: 5, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#EDF7EC', fontWeight: 'bold', textTransform: 'uppercase', fontSize: responsiveFontSize(1.7), textAlign: 'center', transform: [{ rotate: '-90deg' }] }}>Flat {item?.percentage}% Off</Text>
            </View>

            {/* Right Section */}
            <View style={{ flex: 1, elevation: 1, padding: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: 'bold', color: '#000' }}>{item?.name}</Text>
                    <TouchableOpacity>
                        <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000', fontWeight: '800', letterSpacing: 0.4 }}>APPLY</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ color: '#7c8b9b', fontSize: 14, marginTop: 5 }}>Items added are not eligible for discount</Text>
                <Text style={{ color: '#000', fontSize: 14, marginVertical: 5 }}>Get Flat Rs.175 off</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingHorizontal: 10 }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, marginBottom: 10, gap: 8 }}>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: 30, height: 30 }} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" style={{ color: '#586573' }} size={20} />
                </TouchableOpacity>

                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                    <Text style={{ textTransform: 'uppercase', color: '#000', fontSize: responsiveFontSize(2.1), fontWeight: '700' }}>Apply coupon</Text>
                    <Text style={{ color: '#708092', fontSize: responsiveFontSize(1.6), fontWeight: '400' }}>Your Cart: ₹100</Text>
                </View>
            </View>

            <FlatList
                data={coupons}
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                renderItem={cardItem}
                contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20, paddingTop: 3, gap: 12 }}
                ListEmptyComponent={<Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>No coupons available</Text>}
            />

            {/* <View style={{}}>
            </View> */}

        </SafeAreaView>
    )
}

export default Coupons;