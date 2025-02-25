import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { fetchCoupons } from '../utils/fetchCoupons';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, darkBlue } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Coupons = ({ navigation }) => {

    const userDetails = useSelector(state => state.user);

    const [coupons, setCoupons] = useState(null);

    const [loading, setLoading] = useState(true);

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
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }, [userDetails])
    );

    const cardItem = ({ item }) => (
        <View style={{ flexDirection: 'row', borderRadius: 14, backgroundColor: '#EDF7EC', elevation: 1 }}>
            {/* Left Section */}
            <View style={{ backgroundColor: '#5EC467', borderTopLeftRadius: 12, borderBottomLeftRadius: 12, paddingHorizontal: 5, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#EDF7EC', fontWeight: 'bold', textTransform: 'uppercase', fontSize: responsiveFontSize(1.7), textAlign: 'center', transform: [{ rotate: '-90deg' }], }}>Flat {item?.percentage}% Off</Text>
            </View>

            {/* Right Section */}
            <View style={{ flex: 1, elevation: 1, padding: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: 'bold', color: '#000' }}>{item?.name}</Text>

                    <TouchableOpacity style={{ backgroundColor: darkBlue, paddingHorizontal: 7, paddingVertical: 3, borderRadius: 6, elevation: 1 }} onPress={() => navigation.goBack()}>
                        <Text style={{ fontSize: responsiveFontSize(1.7), color: '#fff', fontWeight: '800', letterSpacing: 0.4 }}>APPLY</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ color: '#7c8b9b', fontSize: responsiveFontSize(1.8), fontWeight: '500', marginTop: 5 }}>{item?.desc}</Text>
                <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9), fontWeight: '500', marginVertical: 5 }}>Get a maximum discount of ₹{item.max_discount} off</Text>
            </View>
        </View>
    )

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

            {loading ? (
                <View style={{ flexDirection: 'row', borderRadius: 14, backgroundColor: '#EDF7EC', elevation: 1, marginBottom: 12 }}>
                    {/* Left Section Shimmer */}
                    <View style={{ backgroundColor: '#5EC467', borderTopLeftRadius: 12, borderBottomLeftRadius: 12, paddingHorizontal: 5, justifyContent: 'center', alignItems: 'center', width: 50 }}>
                        <ShimmerPlaceHolder style={{ width: 20, height: 100 }} />
                    </View>

                    {/* Right Section Shimmer */}
                    <View style={{ flex: 1, elevation: 1, padding: 12 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                            <ShimmerPlaceHolder style={{ width: 100, height: 20, borderRadius: 5 }} />
                            <ShimmerPlaceHolder style={{ width: 50, height: 25, borderRadius: 6 }} />
                        </View>
                        <ShimmerPlaceHolder style={{ width: '90%', height: 15, borderRadius: 4, marginBottom: 5 }} />
                        <ShimmerPlaceHolder style={{ width: '70%', height: 15, borderRadius: 4, marginBottom: 5 }} />
                    </View>
                </View>
            ) : (
                <FlatList
                    data={coupons}
                    keyExtractor={(item) => item.id}
                    renderItem={cardItem}
                    ListEmptyComponent={<Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.2), textAlign: 'center', marginTop: 10 }}>No coupons available</Text>}
                    contentContainerStyle={{ paddingHorizontal: 1, gap: 14 }}
                />
            )}
        </SafeAreaView>
    )
}

export default Coupons;