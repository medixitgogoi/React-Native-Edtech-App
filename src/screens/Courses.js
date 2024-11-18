import { View, Text, TextInput, TouchableOpacity, FlatList, Image, ScrollView, StatusBar, Dimensions, ImageBackground } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, darkblue, darkGreen, lightGreen } from '../utils/colors';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { useEffect, useRef, useState } from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { trending } from '../utils/trending';
import LinearGradient from 'react-native-linear-gradient';

const Courses = () => {

    const navigation = useNavigation();

    // Sample data
    const courses = [
        { id: '1', title: 'Biology for class XIII', author: 'By Smith J.', files: '17 lessons', time: '40 Mins', color: '#FFDAB9' },
        { id: '2', title: 'Math for class XIII', author: 'By Smith J.', files: '20 lessons', time: '50 Mins', color: '#ADD8E6' },
        { id: '3', title: 'Chemistry Basics', author: 'By John D.', files: '12 lessons', time: '35 Mins', color: '#98FB98' },
        { id: '4', title: 'Physics for Beginners', author: 'By Sarah L.', files: '18 lessons', time: '45 Mins', color: '#FFB6C1' },
        { id: '5', title: 'History of Arts', author: 'By Alice K.', files: '10 lessons', time: '30 Mins', color: '#E6E6FA' },
        { id: '6', title: 'Geography: World Maps', author: 'By David P.', files: '15 lessons', time: '40 Mins', color: '#FFE4B5' },
        { id: '7', title: 'Introduction to Coding', author: 'By Emily W.', files: '25 lessons', time: '60 Mins', color: '#AFEEEE' },
        { id: '8', title: 'Environmental Studies', author: 'By Thomas B.', files: '14 lessons', time: '38 Mins', color: '#F0E68C' },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: background, }}>
            {/* Header */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, justifyContent: 'space-between' }}>
                <View style={{ borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: darkblue }}>
                    <AntDesign name="arrowleft" style={{ color: '#fff' }} size={15} />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.3) }}>All Courses</Text>
                </View>

                <View style={{ width: 35, height: 35 }}>

                </View>
            </TouchableOpacity>

            <View style={{ paddingHorizontal: 12 }}>
                
                {/* Explore */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                    <Text style={{ color: '#ebedf0', }}>________________________ </Text>
                    <Text style={{ color: '#8593a2', fontWeight: '500', fontSize: responsiveFontSize(1.7), textTransform: 'uppercase', letterSpacing: 1.1 }}> Explore </Text>
                    <Text style={{ color: '#ebedf0', }}>________________________ </Text>
                </View>
                {/* All Courses */}
                <View style={{ marginBottom: 20 }}>
                    {/* Heading */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '600', color: '#333' }}>All Courses</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Courses')}>
                            <Text style={{ color: '#0073c4', fontWeight: '600' }}>See all</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={courses}
                        horizontal
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <LinearGradient
                                colors={['#98ccef', '#d9efff']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{
                                    flex: 1,
                                    padding: 14,
                                    borderRadius: 12,
                                    width: responsiveWidth(60),
                                }}
                            >
                                <TouchableOpacity style={{ overflow: 'hidden' }} onPress={() => navigation.navigate('CourseDetails')}>
                                    {/* Text Content */}
                                    <Text
                                        style={{
                                            fontSize: responsiveFontSize(2.1),
                                            fontWeight: '600',
                                            color: '#000',
                                            marginBottom: 3,
                                        }}
                                    >
                                        {item.title}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: responsiveFontSize(1.6),
                                            color: '#666',
                                            marginBottom: 10,
                                            fontWeight: '500',
                                        }}
                                    >
                                        {item.author}
                                    </Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        {/* Files */}
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <MaterialCommunityIcons
                                                    name="file-multiple"
                                                    size={responsiveFontSize(1.8)}
                                                    color={'#0073c4'}
                                                />
                                            </View>
                                            <Text
                                                style={{
                                                    fontSize: responsiveFontSize(1.5),
                                                    color: '#000',
                                                    fontWeight: '500',
                                                }}
                                            >
                                                {item.files}
                                            </Text>
                                        </View>

                                        {/* Time */}
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <FontAwesome
                                                    name="clock-o"
                                                    size={responsiveFontSize(2)}
                                                    color={'#0073c4'}
                                                />
                                            </View>
                                            <Text
                                                style={{
                                                    fontSize: responsiveFontSize(1.5),
                                                    color: '#000',
                                                    fontWeight: '500',
                                                }}
                                            >
                                                {item.time}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </LinearGradient>
                        )}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 8 }}
                    />
                </View>
            </View>
        </View>
    )
}

export default Courses;