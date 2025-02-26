import { View, Text, TextInput, TouchableOpacity, FlatList, Image, ScrollView, StatusBar, Dimensions, ImageBackground } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, darkBlue, darkerBlue, darkGreen, lightBlue, lightGreen } from '../utils/colors';
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
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import PagerView from 'react-native-pager-view';

const MyCourses = ({ navigation }) => {

    const userDetails = useSelector(state => state.user);

    const [activeTab, setActiveTab] = useState(0);
    const pagerRef = useRef(null); // Create a reference for PagerView

    // Handle tab click
    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex); // Update active tab
        pagerRef.current?.setPage(tabIndex); // Navigate to the respective page
    };

    // Handle page change on swipe
    const handlePageChange = (event) => {
        setActiveTab(event.nativeEvent.position); // Update active tab on swipe
    };

    const courses = [
        { id: '1', title: 'Biology for class X', author: 'By Smith J.', files: '17 lectures', time: '40 Mins', color: '#FFDAB9' },
        { id: '2', title: 'Math for class IX', author: 'By Smith J.', files: '20 lectures', time: '50 Mins', color: '#ADD8E6' },
    ];

    const comboCourses = [
        {
            id: '1',
            title: 'Biology + Chemistry Basics',
            files: '29 lectures', // 17 + 12
            price: 100,
            totalTime: '75 Mins' // 40 + 35
        },
        {
            id: '2',
            title: 'Physics + Math for class IX',
            files: '38 lectures', // 18 + 20
            price: 120,
            totalTime: '95 Mins' // 45 + 50
        },
        {
            id: '3',
            title: 'History of Arts + Geography',
            files: '25 lectures', // 10 + 15
            price: 90,
            totalTime: '70 Mins' // 30 + 40
        },
    ];

    const cardItem = ({ item }) => {
        return (
            <LinearGradient
                colors={['#98ccef', '#d9efff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                    flex: 1,
                    padding: 14,
                    borderRadius: 12,
                    backgroundColor: 'red',
                }}
            >
                <TouchableOpacity
                    style={{ overflow: 'hidden', width: '100%' }}
                    onPress={() => navigation.navigate('CourseDetails', { data: item.title })}
                >
                    {/* Title */}
                    <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: '600', color: '#000', marginBottom: 2, width: '73%' }} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>

                    {/* Author */}
                    <Text style={{ fontSize: responsiveFontSize(1.6), color: '#666', marginBottom: 10, fontWeight: '500', }}>{item.author}</Text>

                    {/* Key Highlights Heading with Star Icon */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, justifyContent: 'center' }}>
                        {/* Left line */}
                        <View style={{ flex: 1, height: 1, backgroundColor: '#999', marginRight: 8 }} />

                        {/* Text and icon */}
                        <View style={{ backgroundColor: '#f4c430', paddingVertical: 6, paddingHorizontal: 15, borderRadius: 16, alignItems: 'center', justifyContent: 'center', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 }}>
                            <Text style={{ fontSize: responsiveFontSize(1.5), fontWeight: '700', color: '#000', textAlign: 'center', letterSpacing: 1 }}>
                                Exclusive Benefits
                            </Text>
                        </View>

                        {/* Right line */}
                        <View style={{ flex: 1, height: 1, backgroundColor: '#999', marginLeft: 8 }} />
                    </View>

                    {/* Highlights Section */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }}>
                        {/* Subject Notes */}
                        <View style={{ alignItems: 'center' }}>
                            <MaterialCommunityIcons name="note-text" size={responsiveFontSize(2)} color={'#0073c4'} />
                            <Text style={{ fontSize: responsiveFontSize(1.5), color: '#000', fontWeight: '500' }}>Subject Notes</Text>
                        </View>

                        {/* Topic lectures with separators */}
                        <View style={{ alignItems: 'center', paddingHorizontal: 10 }}>
                            <FontAwesome name="video-camera" size={responsiveFontSize(2)} color={'#0073c4'} />
                            <Text style={{ fontSize: responsiveFontSize(1.5), color: '#000', fontWeight: '500' }}>{item.files}</Text>
                        </View>

                        {/* Subject PDFs */}
                        <View style={{ alignItems: 'center' }}>
                            <MaterialCommunityIcons name="file-pdf-box" size={responsiveFontSize(2)} color={'#0073c4'} />
                            <Text style={{ fontSize: responsiveFontSize(1.5), color: '#000', fontWeight: '500' }}>Subject PDFs</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Time */}
                <View style={{ position: 'absolute', top: 12, right: 5, alignItems: 'center', flexDirection: 'row', gap: 3, backgroundColor: darkBlue, paddingHorizontal: 6, paddingVertical: 4, borderColor: '#b2d9f3', borderWidth: 1, borderRadius: 7, justifyContent: 'center' }}>
                    <FontAwesome name="clock-o" size={responsiveFontSize(1.7)} color={'#b2d9f3'} />
                    <Text style={{ fontSize: responsiveFontSize(1.3), color: '#fff', fontWeight: '500' }}>{item.time}</Text>
                </View>
            </LinearGradient>
        );
    };

    const comboCardItem = ({ item }) => (
        <LinearGradient
            colors={['#006400', '#32CD32']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
                flex: 1,
                padding: 17,
                borderRadius: 14,
            }}
        >
            <TouchableOpacity
                style={{ overflow: 'hidden' }}
                onPress={() => navigation.navigate('CourseDetails', { data: item.title })}
            >
                {/* Title */}
                <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: '600', color: '#fff', marginBottom: 10, width: '73%' }}>{item.title}</Text>

                {/* Key Highlights Heading with Star Icon */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, justifyContent: 'center' }}>
                    {/* Left line */}
                    <View style={{ flex: 1, height: 1, backgroundColor: '#fff', marginRight: 8 }} />

                    {/* Text and icon */}
                    <View style={{ backgroundColor: '#f4c430', paddingVertical: 6, paddingHorizontal: 15, borderRadius: 16, alignItems: 'center', justifyContent: 'center', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 }}>
                        <Text style={{ fontSize: responsiveFontSize(1.5), fontWeight: '700', color: '#000', textAlign: 'center', letterSpacing: 1 }}>
                            Exclusive Benefits
                        </Text>
                    </View>

                    {/* Right line */}
                    <View style={{ flex: 1, height: 1, backgroundColor: '#fff', marginLeft: 8 }} />
                </View>

                {/* Highlights Section */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5, marginBottom: 15 }}>
                    {/* Subject Notes */}
                    <View style={{ alignItems: 'center' }}>
                        <MaterialCommunityIcons name="note-text" size={responsiveFontSize(2)} color={'#EDF7EC'} />
                        <Text style={{ fontSize: responsiveFontSize(1.5), color: '#fff', fontWeight: '500' }}>Subject Notes</Text>
                    </View>

                    {/* Topic lectures with separators */}
                    <View style={{ alignItems: 'center', paddingHorizontal: 10 }}>
                        <FontAwesome name="video-camera" size={responsiveFontSize(2)} color={'#EDF7EC'} />
                        <Text style={{ fontSize: responsiveFontSize(1.5), color: '#fff', fontWeight: '500' }}>{item.files}</Text>
                    </View>

                    {/* Subject PDFs */}
                    <View style={{ alignItems: 'center' }}>
                        <MaterialCommunityIcons name="file-pdf-box" size={responsiveFontSize(2)} color={'#EDF7EC'} />
                        <Text style={{ fontSize: responsiveFontSize(1.5), color: '#fff', fontWeight: '500' }}>Subject PDFs</Text>
                    </View>
                </View>

            </TouchableOpacity>

            {/* Time */}
            <View style={{ position: 'absolute', top: 12, right: 5, alignItems: 'center', flexDirection: 'row', gap: 3, backgroundColor: darkBlue, paddingHorizontal: 6, paddingVertical: 4, borderColor: '#b2d9f3', borderWidth: 1, borderRadius: 7, justifyContent: 'center' }}>
                <FontAwesome name="clock-o" size={responsiveFontSize(1.7)} color={'#b2d9f3'} />
                <Text style={{ fontSize: responsiveFontSize(1.3), color: '#fff', fontWeight: '500' }}>{item.totalTime}</Text>
            </View>
        </LinearGradient>
    );

    return (
        <View style={{ flex: 1, backgroundColor: background }}>

            {userDetails.length === 0 ? (
                <View style={{ width: '100%' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 10, paddingHorizontal: 12, alignSelf: 'flex-start' }}>
                        <Icon4 name="arrowleft" size={23} color={'#000'} />
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
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2.1), fontWeight: '500', marginBottom: 5 }}>Your Courses</Text>

                            <Text style={{ color: '#000', fontSize: responsiveFontSize(1.6), marginBottom: 20 }}>Login or sign up to view your purchased courses</Text>

                            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginBottom: 3, borderColor: darkBlue, borderWidth: 1, borderRadius: 8, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: darkBlue, fontWeight: '600', fontSize: responsiveFontSize(2) }}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ) : (
                <>
                    {/* Header */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: darkerBlue }} onPress={() => navigation.goBack()}>
                            <AntDesign name="arrowleft" style={{ color: '#fff' }} size={15} />
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.3) }}>My Courses</Text>
                        </View>

                        <View style={{ width: 35, height: 35 }}>

                        </View>
                    </View>

                    {/* Top Tab Bar */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        {/* All */}
                        <TouchableOpacity
                            style={{ height: 38, justifyContent: 'center', alignItems: 'center', flex: 1, borderBottomWidth: activeTab === 0 ? 2 : 0, borderBottomColor: darkBlue, backgroundColor: activeTab === 0 ? lightBlue : background }}
                            onPress={() => handleTabClick(0)} // Navigate to "All"
                        >
                            <Text style={{ fontSize: responsiveFontSize(2), color: activeTab === 0 ? darkBlue : '#6c6c6c', fontWeight: '600' }}>All</Text>
                        </TouchableOpacity>

                        {/* Individual */}
                        <TouchableOpacity
                            style={{ height: 38, justifyContent: 'center', alignItems: 'center', flex: 1, borderBottomWidth: activeTab === 1 ? 2 : 0, borderBottomColor: darkBlue, backgroundColor: activeTab === 1 ? lightBlue : background }}
                            onPress={() => handleTabClick(1)} // Navigate to "Individual"
                        >
                            <Text style={{ fontSize: responsiveFontSize(2), color: activeTab === 1 ? darkBlue : '#6c6c6c', fontWeight: '600' }}>Individual</Text>
                        </TouchableOpacity>

                        {/* Combo */}
                        <TouchableOpacity
                            style={{ height: 38, justifyContent: 'center', alignItems: 'center', flex: 1, borderBottomWidth: activeTab === 2 ? 2 : 0, borderBottomColor: darkBlue, backgroundColor: activeTab === 2 ? lightBlue : background }}
                            onPress={() => handleTabClick(2)} // Navigate to "Combo"
                        >
                            <Text style={{ fontSize: responsiveFontSize(2), color: activeTab === 2 ? darkBlue : '#6c6c6c', fontWeight: '600' }}>Combo</Text>
                        </TouchableOpacity>
                    </View>

                    {/* PagerView */}
                    <PagerView style={{ flex: 1 }} initialPage={0} onPageSelected={handlePageChange} ref={pagerRef}>
                        {/* All Courses */}
                        <ScrollView style={{ flex: 1 }} key="1">
                            {/* Individual courses */}
                            <FlatList
                                data={courses}
                                keyExtractor={(item) => item.id}
                                renderItem={cardItem}
                                contentContainerStyle={{ gap: 10, paddingHorizontal: 10, paddingTop: 10 }}
                            />

                            <FlatList
                                data={comboCourses} // Combo courses data array
                                keyExtractor={(item) => item.id}
                                renderItem={comboCardItem} // Separate card component or function for combo courses
                                contentContainerStyle={{ gap: 10, paddingHorizontal: 10, paddingTop: 10, marginBottom: 15 }}
                            />
                        </ScrollView>

                        {/* Individual Courses Content */}
                        <View style={{ flex: 1 }} key="2">
                            {/* Individual courses */}
                            <FlatList
                                data={courses}
                                keyExtractor={(item) => item.id}
                                renderItem={cardItem}
                                contentContainerStyle={{ gap: 8, paddingHorizontal: 10, paddingTop: 10 }}
                            />
                        </View>

                        {/* Combo Courses Content */}
                        <View style={{ flex: 1 }} key="3">
                            <FlatList
                                data={comboCourses}
                                keyExtractor={(item) => item.id}
                                renderItem={comboCardItem}
                                contentContainerStyle={{ gap: 10, paddingHorizontal: 10, paddingTop: 10, marginBottom: 15 }}
                            />
                        </View>
                    </PagerView>
                </>
            )}

        </View>
    )
}

export default MyCourses;