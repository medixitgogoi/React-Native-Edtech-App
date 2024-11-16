import { View, Text, TextInput, TouchableOpacity, FlatList, Image, ScrollView, StatusBar, Dimensions } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { darkGreen, lightGreen } from '../utils/colors';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const HomeScreen = () => {

    const navigation = useNavigation();

    const scrollViewRef = useRef(null);

    // Sample data
    const courses = [
        { id: '1', title: 'Biology for class XIII', author: 'By Smith J.', files: '17 Files', time: '40 Mins', color: '#FFDAB9' },
        { id: '2', title: 'Math for class XIII', author: 'By Smith J.', files: '17 Files', time: '40 Mins', color: '#ADD8E6' },
    ];

    const bannerImages = [
        require('../assets/banner1.jpg'),
        require('../assets/banner2.jpg'),
    ];

    // Banner scrolling
    useEffect(() => {
        let bannerIndex = 0;

        const interval = setInterval(() => {
            bannerIndex = (bannerIndex + 1) % bannerImages.length;
            scrollViewRef.current.scrollTo({ x: bannerIndex * width, animated: true });
        }, 3000);

        return () => clearInterval(interval);
    }, [bannerImages.length]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FB', paddingHorizontal: 10, paddingTop: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor='#F8F9FB'
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <View style={{ width: responsiveWidth(8), aspectRatio: 1 / 1, borderColor: '#000', borderWidth: 1, borderRadius: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 2, backgroundColor: '#d0fce0' }}>
                        <Image source={require('../assets/person.png')} style={{ width: '100%', height: '100%' }} />
                    </View>

                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: '600', color: darkGreen }}>Hello, Marshmallow</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.7), fontWeight: '500', color: '#a2a2a2' }}>What are you learning today?</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={{ backgroundColor: '#d0fce0', borderRadius: 8, width: responsiveWidth(9), aspectRatio: 1 / 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: darkGreen, elevation: 1 }}>
                    <Ionicons name="notifications" size={18} color={darkGreen} />
                </TouchableOpacity>
            </View>

            {/* Banner */}
            <View style={{ marginVertical: 8, height: 180 }}>
                <ScrollView ref={scrollViewRef} horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={{ width: '100%', backgroundColor: '#000' }}>
                    {bannerImages.map((image, index) => (
                        <Image
                            key={index}
                            source={image}
                            style={{
                                width: width - 20,
                                height: 180,
                                borderRadius: 10,
                                marginHorizontal: 10,
                            }}
                            resizeMode="cover"
                        />
                    ))}
                </ScrollView>
            </View>

            {/* Categories */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                <TouchableOpacity style={{ backgroundColor: '#ADD8E6', borderRadius: 10, padding: 20, flex: 1, marginRight: 10 }}>
                    <Text style={{ color: '#333', fontWeight: 'bold', fontSize: 16 }}>Basic Math Easy</Text>
                    <Text style={{ color: '#333', fontSize: 14 }}>28 Lessons</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#D8BFD8', borderRadius: 10, padding: 20, flex: 1 }}>
                    <Text style={{ color: '#333', fontWeight: 'bold', fontSize: 16 }}>Language Studies</Text>
                    <Text style={{ color: '#333', fontSize: 14 }}>28 Lessons</Text>
                </TouchableOpacity>
            </View>

            {/* Continue Course */}
            <View style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#333' }}>Continue Course</Text>
                    <TouchableOpacity>
                        <Text style={{ color: '#007BFF', fontWeight: '600' }}>See all</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ backgroundColor: '#FFF', borderRadius: 10, padding: 15, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#E6F7FF', padding: 10, borderRadius: 10, marginRight: 10 }}>
                        <Text style={{ fontSize: 20, color: '#007BFF' }}>△</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>Basic Calculus</Text>
                        <Text style={{ fontSize: 14, color: '#555' }}>Easy 6 steps can make perfect</Text>
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#007BFF' }}>60%</Text>
                </TouchableOpacity>
            </View>

            {/* All Courses */}
            <View style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#333' }}>All Courses</Text>
                    <TouchableOpacity>
                        <Text style={{ color: '#007BFF', fontWeight: '600' }}>See all</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={courses}
                    horizontal
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{ backgroundColor: item.color, borderRadius: 10, padding: 15, marginRight: 10, width: 200 }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 5 }}>{item.title}</Text>
                            <Text style={{ fontSize: 14, color: '#555', marginBottom: 10 }}>{item.author}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 12, color: '#777' }}>{item.files}</Text>
                                <Text style={{ fontSize: 12, color: '#777' }}>{item.time}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;