import { View, Text, TextInput, TouchableOpacity, FlatList, Image, ScrollView, StatusBar, Dimensions, ImageBackground } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, darkBlue, darkGreen, lightBlue, lightGreen } from '../utils/colors';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { trending } from '../utils/trending';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

const Courses = () => {

    const userDetails = useSelector(state => state.user);
    // console.log('userDetails', userDetails);

    const dispatch = useDispatch();

    const navigation = useNavigation();

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
        {
            id: '4',
            title: 'Coding + Environmental Studies',
            files: '39 lectures', // 25 + 14
            price: 110,
            totalTime: '98 Mins' // 60 + 38
        },
        {
            id: '5',
            title: 'Biology + Physics + Math',
            files: '55 lectures', // 17 + 18 + 20
            price: 150,
            totalTime: '135 Mins' // 40 + 45 + 50
        }
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
                    width: responsiveWidth(65),
                }}
            >
                <TouchableOpacity
                    style={{ overflow: 'hidden' }}
                    onPress={() => navigation.navigate('Chapters', { data: item.title })}
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

                        {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <AntDesign name="star" size={responsiveFontSize(2.1)} color={'#e5950c'} style={{ marginRight: 2 }} />
                            <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: '600', color: '#999' }}>What you'll get</Text>
                            <AntDesign name="star" size={responsiveFontSize(2.1)} color={'#e5950c'} style={{ marginLeft: 2 }} />
                        </View> */}

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
                padding: 14,
                borderRadius: 12,
                width: responsiveWidth(65),
            }}
        >
            <TouchableOpacity
                style={{ overflow: 'hidden' }}
                onPress={() => navigation.navigate('Chapters', { data: item.title })}
            >
                {/* Title */}
                <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: '600', color: '#fff', marginBottom: 10, width: '73%' }}>{item.title}</Text>

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
        <SafeAreaView style={{ flex: 1, backgroundColor: background, }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: darkBlue }} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" style={{ color: '#fff' }} size={15} />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.3) }}>All Courses</Text>
                </View>

                <View style={{ width: 35, height: 35 }}>

                </View>
            </View>

            <ScrollView style={{ paddingHorizontal: 12, flex: 1 }}>
                {/* Explore */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                    <Text style={{ color: '#ebedf0', }}>________________________ </Text>
                    <Text style={{ color: '#8593a2', fontWeight: '500', fontSize: responsiveFontSize(1.7), textTransform: 'uppercase', letterSpacing: 1.1 }}> Explore </Text>
                    <Text style={{ color: '#ebedf0', }}>________________________ </Text>
                </View>

                {/* Class 1 */}
                <View style={{ marginBottom: 30 }}>
                    {/* Class */}
                    <LinearGradient
                        colors={[darkBlue, '#76bbff']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            flex: 1,
                            borderRadius: 12,
                            marginBottom: 8
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingVertical: 10,
                            paddingHorizontal: 13,
                        }}>
                            <Text style={{
                                fontSize: responsiveFontSize(2), // Slightly larger font
                                fontWeight: '700', // Bold font
                                color: '#fff', // White text for contrast
                            }}>
                                Class 1
                            </Text>

                            {/* Optional Decorative Element */}
                            <View style={{
                                width: 20,
                                height: 20,
                                backgroundColor: darkBlue, // Dark Green for contrast
                                borderRadius: 10, // Circle
                            }} />
                        </View>
                    </LinearGradient>

                    <View style={{ borderLeftColor: '#c9c9c9', borderLeftWidth: 1 }}>
                        {/* Heading 1 */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 5 }}>
                            <View style={{ height: 1, backgroundColor: '#b9b9b9', width: 20 }}>
                            </View>
                            <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: '600', color: '#333' }}>Individual Courses</Text>
                        </View>

                        {/* Individual courses */}
                        <FlatList
                            data={courses}
                            horizontal
                            keyExtractor={(item) => item.id}
                            renderItem={cardItem}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 8, paddingLeft: 20 }}
                        />

                        {/* Combo Courses Section */}
                        <View style={{ marginTop: 12 }}>
                            {/* Heading 1 */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 5 }}>
                                <View style={{ height: 1, backgroundColor: '#b9b9b9', width: 20 }}>
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: '600', color: '#333' }}>Combo Courses</Text>
                            </View>

                            <FlatList
                                data={comboCourses} // Combo courses data array
                                horizontal
                                keyExtractor={(item) => item.id}
                                renderItem={comboCardItem} // Separate card component or function for combo courses
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ gap: 8, paddingLeft: 20 }}
                            />
                        </View>
                    </View>
                </View>

                {/* Class 2 */}
                <View style={{ marginBottom: 30 }}>
                    {/* Class */}
                    <LinearGradient
                        colors={[darkBlue, '#76bbff']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            flex: 1,
                            borderRadius: 12,
                            marginBottom: 8
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingVertical: 10,
                            paddingHorizontal: 13,
                        }}>
                            <Text style={{
                                fontSize: responsiveFontSize(2), // Slightly larger font
                                fontWeight: '700', // Bold font
                                color: '#fff', // White text for contrast
                            }}>
                                Class 2
                            </Text>

                            {/* Optional Decorative Element */}
                            <View style={{
                                width: 20,
                                height: 20,
                                backgroundColor: darkBlue, // Dark Green for contrast
                                borderRadius: 10, // Circle
                            }} />
                        </View>
                    </LinearGradient>

                    <View style={{ borderLeftColor: '#c9c9c9', borderLeftWidth: 1 }}>
                        {/* Heading 1 */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 5 }}>
                            <View style={{ height: 1, backgroundColor: '#b9b9b9', width: 20 }}>
                            </View>
                            <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: '600', color: '#333' }}>Individual Courses</Text>
                        </View>

                        {/* Individual courses */}
                        <FlatList
                            data={courses}
                            horizontal
                            keyExtractor={(item) => item.id}
                            renderItem={cardItem}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 8, paddingLeft: 20 }}
                        />

                        {/* Combo Courses Section */}
                        <View style={{ marginTop: 12 }}>
                            {/* Heading 1 */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 5 }}>
                                <View style={{ height: 1, backgroundColor: '#b9b9b9', width: 20 }}>
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: '600', color: '#333' }}>Combo Courses</Text>
                            </View>
                            <FlatList
                                data={comboCourses} // Combo courses data array
                                horizontal
                                keyExtractor={(item) => item.id}
                                renderItem={comboCardItem} // Separate card component or function for combo courses
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ gap: 8, paddingLeft: 20 }}
                            />
                        </View>
                    </View>
                </View>

                {/* Class 3 */}
                <View style={{ marginBottom: 30 }}>
                    {/* Class */}
                    <LinearGradient
                        colors={[darkBlue, '#76bbff']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            flex: 1,
                            borderRadius: 12,
                            marginBottom: 8
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingVertical: 10,
                            paddingHorizontal: 13,
                        }}>
                            <Text style={{
                                fontSize: responsiveFontSize(2), // Slightly larger font
                                fontWeight: '700', // Bold font
                                color: '#fff', // White text for contrast
                            }}>
                                Class 3
                            </Text>

                            {/* Optional Decorative Element */}
                            <View style={{
                                width: 20,
                                height: 20,
                                backgroundColor: darkBlue, // Dark Green for contrast
                                borderRadius: 10, // Circle
                            }} />
                        </View>
                    </LinearGradient>

                    <View style={{ borderLeftColor: '#c9c9c9', borderLeftWidth: 1 }}>
                        {/* Heading 1 */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 5 }}>
                            <View style={{ height: 1, backgroundColor: '#b9b9b9', width: 20 }}>
                            </View>
                            <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: '600', color: '#333' }}>Individual Courses</Text>
                        </View>

                        {/* Individual courses */}
                        <FlatList
                            data={courses}
                            horizontal
                            keyExtractor={(item) => item.id}
                            renderItem={cardItem}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 8, paddingLeft: 20 }}
                        />

                        {/* Combo Courses Section */}
                        <View style={{ marginTop: 12 }}>
                            {/* Heading 1 */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 5 }}>
                                <View style={{ height: 1, backgroundColor: '#b9b9b9', width: 20 }}>
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: '600', color: '#333' }}>Combo Courses</Text>
                            </View>
                            <FlatList
                                data={comboCourses} // Combo courses data array
                                horizontal
                                keyExtractor={(item) => item.id}
                                renderItem={comboCardItem} // Separate card component or function for combo courses
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ gap: 8, paddingLeft: 20 }}
                            />
                        </View>
                    </View>
                </View>

                {/* Class 4 */}
                <View style={{ marginBottom: 30 }}>
                    {/* Class */}
                    <LinearGradient
                        colors={[darkBlue, '#76bbff']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            flex: 1,
                            borderRadius: 12,
                            marginBottom: 8
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingVertical: 10,
                            paddingHorizontal: 13,
                        }}>
                            <Text style={{
                                fontSize: responsiveFontSize(2), // Slightly larger font
                                fontWeight: '700', // Bold font
                                color: '#fff', // White text for contrast
                            }}>
                                Class 4
                            </Text>

                            {/* Optional Decorative Element */}
                            <View style={{
                                width: 20,
                                height: 20,
                                backgroundColor: darkBlue, // Dark Green for contrast
                                borderRadius: 10, // Circle
                            }} />
                        </View>
                    </LinearGradient>

                    <View style={{ borderLeftColor: '#c9c9c9', borderLeftWidth: 1 }}>
                        {/* Heading 1 */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 5 }}>
                            <View style={{ height: 1, backgroundColor: '#b9b9b9', width: 20 }}>
                            </View>
                            <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: '600', color: '#333' }}>Individual Courses</Text>
                        </View>

                        {/* Individual courses */}
                        <FlatList
                            data={courses}
                            horizontal
                            keyExtractor={(item) => item.id}
                            renderItem={cardItem}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 8, paddingLeft: 20 }}
                        />

                        {/* Combo Courses Section */}
                        <View style={{ marginTop: 12 }}>
                            {/* Heading 1 */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 5 }}>
                                <View style={{ height: 1, backgroundColor: '#b9b9b9', width: 20 }}>
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: '600', color: '#333' }}>Combo Courses</Text>
                            </View>
                            <FlatList
                                data={comboCourses} // Combo courses data array
                                horizontal
                                keyExtractor={(item) => item.id}
                                renderItem={comboCardItem} // Separate card component or function for combo courses
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ gap: 8, paddingLeft: 20 }}
                            />
                        </View>
                    </View>
                </View>

                {/* Class 5 */}
                <View style={{ marginBottom: 30 }}>
                    {/* Class */}
                    <LinearGradient
                        colors={[darkBlue, '#76bbff']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            flex: 1,
                            borderRadius: 12,
                            marginBottom: 8
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingVertical: 10,
                            paddingHorizontal: 13,
                        }}>
                            <Text style={{
                                fontSize: responsiveFontSize(2), // Slightly larger font
                                fontWeight: '700', // Bold font
                                color: '#fff', // White text for contrast
                            }}>
                                Class 5
                            </Text>

                            {/* Optional Decorative Element */}
                            <View style={{
                                width: 20,
                                height: 20,
                                backgroundColor: darkBlue, // Dark Green for contrast
                                borderRadius: 10, // Circle
                            }} />
                        </View>
                    </LinearGradient>

                    <View style={{ borderLeftColor: '#c9c9c9', borderLeftWidth: 1 }}>
                        {/* Heading 1 */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 5 }}>
                            <View style={{ height: 1, backgroundColor: '#b9b9b9', width: 20 }}>
                            </View>
                            <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: '600', color: '#333' }}>Individual Courses</Text>
                        </View>

                        {/* Individual courses */}
                        <FlatList
                            data={courses}
                            horizontal
                            keyExtractor={(item) => item.id}
                            renderItem={cardItem}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 8, paddingLeft: 20 }}
                        />

                        {/* Combo Courses Section */}
                        <View style={{ marginTop: 12 }}>
                            {/* Heading 1 */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 5 }}>
                                <View style={{ height: 1, backgroundColor: '#b9b9b9', width: 20 }}>
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: '600', color: '#333' }}>Combo Courses</Text>
                            </View>
                            <FlatList
                                data={comboCourses} // Combo courses data array
                                horizontal
                                keyExtractor={(item) => item.id}
                                renderItem={comboCardItem} // Separate card component or function for combo courses
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ gap: 8, paddingLeft: 20 }}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Courses;