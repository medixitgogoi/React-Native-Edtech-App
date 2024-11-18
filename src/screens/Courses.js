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
        { id: '1', title: 'Biology for class XIII', author: 'By Smith J.', files: '17 videos', time: '40 Mins', color: '#FFDAB9' },
        { id: '2', title: 'Math for class XIII', author: 'By Smith J.', files: '20 videos', time: '50 Mins', color: '#ADD8E6' },
        { id: '3', title: 'Chemistry Basics', author: 'By John D.', files: '12 videos', time: '35 Mins', color: '#98FB98' },
        { id: '4', title: 'Physics for Beginners', author: 'By Sarah L.', files: '18 videos', time: '45 Mins', color: '#FFB6C1' },
        { id: '5', title: 'History of Arts', author: 'By Alice K.', files: '10 videos', time: '30 Mins', color: '#E6E6FA' },
        { id: '6', title: 'Geography: World Maps', author: 'By David P.', files: '15 videos', time: '40 Mins', color: '#FFE4B5' },
        { id: '7', title: 'Introduction to Coding', author: 'By Emily W.', files: '25 videos', time: '60 Mins', color: '#AFEEEE' },
        { id: '8', title: 'Environmental Studies', author: 'By Thomas B.', files: '14 videos', time: '38 Mins', color: '#F0E68C' },
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
                    width: responsiveWidth(60),
                }}
            >
                <TouchableOpacity
                    style={{ overflow: 'hidden' }}
                    onPress={() => navigation.navigate('CourseDetails')}
                >
                    {/* Title */}
                    <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: '600', color: '#000', marginBottom: 3 }}>{item.title}</Text>

                    {/* Author */}
                    <Text style={{ fontSize: responsiveFontSize(1.6), color: '#666', marginBottom: 10, fontWeight: '500' }}>{item.author}</Text>

                    {/* Key Highlights Heading with Star Icon */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, justifyContent: 'center' }}>
                        <MaterialCommunityIcons name="star" size={responsiveFontSize(2)} color={'#f5b342'} style={{ marginRight: 3 }} />
                        <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: '600', color: '#333' }}>
                            Key Highlights
                        </Text>
                    </View>

                    {/* Highlights Section */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }}>
                        {/* Subject Notes */}
                        <View style={{ alignItems: 'center' }}>
                            <MaterialCommunityIcons name="note-text" size={responsiveFontSize(2)} color={'#3a8cc4'} />
                            <Text style={{ fontSize: responsiveFontSize(1.5), color: '#000', fontWeight: '500' }}>Notes</Text>
                        </View>

                        {/* Topic Videos */}
                        <View style={{ alignItems: 'center' }}>
                            <FontAwesome name="video-camera" size={responsiveFontSize(2)} color={'#3a8cc4'} />
                            <Text style={{ fontSize: responsiveFontSize(1.5), color: '#000', fontWeight: '500' }}>{item.files}</Text>
                        </View>

                        {/* Subject PDFs */}
                        <View style={{ alignItems: 'center' }}>
                            <MaterialCommunityIcons name="file-pdf-box" size={responsiveFontSize(2)} color={'#3a8cc4'} />
                            <Text style={{ fontSize: responsiveFontSize(1.5), color: '#000', fontWeight: '500' }}>PDFs</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </LinearGradient>
        );
    };

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

            <ScrollView style={{ paddingHorizontal: 12, flex: 1 }}>
                {/* Explore */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                    <Text style={{ color: '#ebedf0', }}>________________________ </Text>
                    <Text style={{ color: '#8593a2', fontWeight: '500', fontSize: responsiveFontSize(1.7), textTransform: 'uppercase', letterSpacing: 1.1 }}> Explore </Text>
                    <Text style={{ color: '#ebedf0', }}>________________________ </Text>
                </View>

                {/* Class 1 */}
                <View style={{ marginBottom: 20 }}>
                    {/* Heading */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: '600', color: '#333' }}>Courses for Class 1</Text>
                    </View>

                    <FlatList
                        data={courses}
                        horizontal
                        keyExtractor={(item) => item.id}
                        renderItem={cardItem}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 8 }}
                    />
                </View>

                {/* Class 2 */}
                <View style={{ marginBottom: 20 }}>
                    {/* Heading */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: '600', color: '#333' }}>Courses for Class 2</Text>
                    </View>

                    <FlatList
                        data={courses}
                        horizontal
                        keyExtractor={(item) => item.id}
                        renderItem={cardItem}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 8 }}
                    />
                </View>

                {/* Class 3 */}
                <View style={{ marginBottom: 20 }}>
                    {/* Heading */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: '600', color: '#333' }}>Courses for Class 3</Text>
                    </View>

                    <FlatList
                        data={courses}
                        horizontal
                        keyExtractor={(item) => item.id}
                        renderItem={cardItem}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 8 }}
                    />
                </View>

                {/* Class 4 */}
                <View style={{ marginBottom: 20 }}>
                    {/* Heading */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: '600', color: '#333' }}>Courses for Class 4</Text>
                    </View>

                    <FlatList
                        data={courses}
                        horizontal
                        keyExtractor={(item) => item.id}
                        renderItem={cardItem}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 8 }}
                    />
                </View>

                {/* Class 5 */}
                <View style={{ marginBottom: 20 }}>
                    {/* Heading */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: '600', color: '#333' }}>Courses for Class 5</Text>
                    </View>

                    <FlatList
                        data={courses}
                        horizontal
                        keyExtractor={(item) => item.id}
                        renderItem={cardItem}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 8 }}
                    />
                </View>

                {/* Class 6 */}
                <View style={{ marginBottom: 15 }}>
                    {/* Heading */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: '600', color: '#333' }}>Courses for Class 6</Text>
                    </View>

                    <FlatList
                        data={courses}
                        horizontal
                        keyExtractor={(item) => item.id}
                        renderItem={cardItem}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 8 }}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default Courses;