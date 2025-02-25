import { View, Text, TouchableOpacity, FlatList, StatusBar, ScrollView } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { useFocusEffect } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { background, darkBlue, lightBlue } from '../utils/colors';
import { useSelector } from 'react-redux';
import { useCallback, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getOrders } from '../utils/getOrders';
import { Image } from 'react-native-animatable';
import PagerView from 'react-native-pager-view';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Transactions = ({ navigation }) => {

    const userDetails = useSelector(state => state.user);

    const [singles, setSingles] = useState(null);
    const [combos, setCombos] = useState(null);
    const [all, setAll] = useState(null);

    const [loading, setLoading] = useState(true);

    const [activeTab, setActiveTab] = useState(0);
    const pagerRef = useRef(null);

    // Handle tab click
    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex); // Update active tab
        pagerRef.current?.setPage(tabIndex); // Navigate to the respective page
    };

    // Handle page change on swipe
    const handlePageChange = (event) => {
        setActiveTab(event.nativeEvent.position); // Update active tab on swipe
    };

    // fetch orders
    useFocusEffect(
        useCallback(() => {
            if (userDetails.length !== 0) {

                const fetchData = async () => {
                    try {
                        const data = await getOrders(userDetails);
                        console.log('fetch orders: ', data);

                        setSingles(data?.single);
                        setCombos(data?.combo);
                        setAll([...data?.single, ...data?.combo]);
                    } catch (error) {
                        console.error('Error fetching appLoad: ', error);
                    } finally {
                        setLoading(false);
                    }
                };

                fetchData();
            }
        }, [userDetails])
    );

    const renderCourse = ({ item }) => {

        const subject = item.subject[0];

        return (
            <TouchableOpacity onPress={() => navigation.navigate('PurchaseDetails', { data: item })} style={{ borderColor: darkBlue, borderWidth: 0.5, backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', elevation: 1, flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <Image source={{ uri: subject.image }} style={{ width: 100, height: 100, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} />

                <View style={{ flex: 1, padding: 10 }}>
                    <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', marginBottom: 8, color: '#000', textTransform: 'uppercase' }}>{subject.name}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: 20, justifyContent: 'center' }}>
                            <FontAwesome name="money" size={13} color={darkBlue} />
                        </View>
                        <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000', fontWeight: '500' }}>Price:</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.8), color: darkBlue, fontWeight: '700' }}>₹{subject.price}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: 20, justifyContent: 'center' }}>
                            <FontAwesome name="calendar" size={13} color={darkBlue} />
                        </View>
                        <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000', fontWeight: '500' }}>Purchased Date:</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.8), color: darkBlue, fontWeight: '700' }}>{item.purchased_date}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: 20, justifyContent: 'center' }}>
                            <FontAwesome name="calendar" size={13} color={darkBlue} />
                        </View>
                        <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000', fontWeight: '500' }}>Expiry Date:</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.8), color: darkBlue, fontWeight: '700' }}>{item.expiry_date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    return (
        <View style={{ flex: 1, backgroundColor: background, paddingHorizontal: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />

            {/* Content */}
            {userDetails.length === 0 ? (
                <View style={{ width: '100%' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 10, paddingHorizontal: 12, alignSelf: 'flex-start' }}>
                        <AntDesign name="arrowleft" size={23} color={'#000'} />
                    </TouchableOpacity>

                    <View style={{ width: 300, aspectRatio: 1 / 1, alignSelf: 'center' }}>
                        <Image
                            source={require('../assets/fallback.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={{ paddingHorizontal: 12 }}>
                        <View style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', borderRadius: 10, elevation: 3, padding: 15 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2.1), fontWeight: '500', marginBottom: 5 }}>Your Transactions</Text>

                            <Text style={{ color: '#000', fontSize: responsiveFontSize(1.6), marginBottom: 20 }}>Login or sign up to view your complete profile</Text>

                            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginBottom: 3, borderColor: darkBlue, borderWidth: 1, borderRadius: 8, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: darkBlue, fontWeight: '600', fontSize: responsiveFontSize(2) }}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ) : (
                <>
                    {/* Header */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: darkBlue }} onPress={() => navigation.goBack()}>
                            <AntDesign name="arrowleft" style={{ color: '#fff' }} size={15} />
                        </TouchableOpacity>
                        <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.3) }}>Your Transactions</Text>
                        <View style={{ width: 35, height: 35 }} />
                    </View>

                    {/* Top Tab Bar */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        {/* All */}
                        <TouchableOpacity
                            style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 38, justifyContent: 'center', alignItems: 'center', flex: 1, borderBottomWidth: activeTab === 0 ? 2 : 0, borderBottomColor: darkBlue, backgroundColor: activeTab === 0 ? lightBlue : background }}
                            onPress={() => handleTabClick(0)} // Navigate to "All"
                        >
                            <Text style={{ fontSize: responsiveFontSize(2), color: activeTab === 0 ? darkBlue : '#6c6c6c', fontWeight: '600' }}>All</Text>
                        </TouchableOpacity>

                        {/* Individual */}
                        <TouchableOpacity
                            style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 38, justifyContent: 'center', alignItems: 'center', flex: 1, borderBottomWidth: activeTab === 1 ? 2 : 0, borderBottomColor: darkBlue, backgroundColor: activeTab === 1 ? lightBlue : background }}
                            onPress={() => handleTabClick(1)} // Navigate to "Individual"
                        >
                            <Text style={{ fontSize: responsiveFontSize(2), color: activeTab === 1 ? darkBlue : '#6c6c6c', fontWeight: '600' }}>Individual</Text>
                        </TouchableOpacity>

                        {/* Combo */}
                        <TouchableOpacity
                            style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 38, justifyContent: 'center', alignItems: 'center', flex: 1, borderBottomWidth: activeTab === 2 ? 2 : 0, borderBottomColor: darkBlue, backgroundColor: activeTab === 2 ? lightBlue : background }}
                            onPress={() => handleTabClick(2)} // Navigate to "Combo"
                        >
                            <Text style={{ fontSize: responsiveFontSize(2), color: activeTab === 2 ? darkBlue : '#6c6c6c', fontWeight: '600' }}>Combo</Text>
                        </TouchableOpacity>
                    </View>

                    {/* PagerView */}
                    <PagerView style={{ flex: 1 }} initialPage={0} onPageSelected={handlePageChange} ref={pagerRef}>
                        {/* All */}
                        <View style={{ flex: 1 }} key="1">
                            {loading ? (
                                <FlatList
                                    data={[1, 1, 1, 1, 1]}
                                    renderItem={() => (
                                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderColor: '#ccc', borderWidth: 0.5, borderRadius: 14, overflow: 'hidden', elevation: 1, padding: 10 }}>
                                            {/* Image Placeholder */}
                                            <ShimmerPlaceHolder style={{ width: 100, height: 100, borderRadius: 8 }} />

                                            {/* Content Placeholder */}
                                            <View style={{ flex: 1, padding: 10 }}>
                                                {/* Title */}
                                                <ShimmerPlaceHolder style={{ width: '80%', height: 20, borderRadius: 5, marginBottom: 8 }} />

                                                {/* Price Row */}
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 }}>
                                                    <ShimmerPlaceHolder style={{ width: 20, height: 20, borderRadius: 10 }} />
                                                    <ShimmerPlaceHolder style={{ width: '20%', height: 15, borderRadius: 5 }} />
                                                    <ShimmerPlaceHolder style={{ width: '30%', height: 15, borderRadius: 5 }} />
                                                </View>

                                                {/* Purchased Date Row */}
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 }}>
                                                    <ShimmerPlaceHolder style={{ width: 20, height: 20, borderRadius: 10 }} />
                                                    <ShimmerPlaceHolder style={{ width: '20%', height: 15, borderRadius: 5 }} />
                                                    <ShimmerPlaceHolder style={{ width: '30%', height: 15, borderRadius: 5 }} />
                                                </View>

                                                {/* Expiry Date Row */}
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                                    <ShimmerPlaceHolder style={{ width: 20, height: 20, borderRadius: 10 }} />
                                                    <ShimmerPlaceHolder style={{ width: '20%', height: 15, borderRadius: 5 }} />
                                                    <ShimmerPlaceHolder style={{ width: '30%', height: 15, borderRadius: 5 }} />
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                    contentContainerStyle={{ gap: 12, paddingHorizontal: 1, paddingTop: 10 }}
                                />
                            ) : (
                                <FlatList
                                    data={all}
                                    keyExtractor={(item) => item.id}
                                    renderItem={renderCourse}
                                    contentContainerStyle={{ gap: 12, paddingHorizontal: 1, paddingTop: 10 }}
                                />
                            )}
                        </View>

                        {/* Individual Courses Content */}
                        <View style={{ flex: 1 }} key="2">
                            {/* Individual courses */}
                            <FlatList
                                data={singles}
                                keyExtractor={(item) => item.id}
                                renderItem={renderCourse}
                                contentContainerStyle={{ gap: 12, paddingHorizontal: 1, paddingTop: 10 }}
                            />
                        </View>

                        {/* Combo Courses Content */}
                        <View style={{ flex: 1 }} key="3">
                            <FlatList
                                data={combos}
                                keyExtractor={(item) => item.id}
                                renderItem={renderCourse}
                                contentContainerStyle={{ gap: 12, paddingHorizontal: 1, paddingTop: 10, marginBottom: 15 }}
                            />
                        </View>
                    </PagerView>
                </>
            )}
        </View>
    )
}

export default Transactions;