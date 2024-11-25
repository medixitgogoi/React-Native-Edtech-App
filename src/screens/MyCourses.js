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
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { trending } from '../utils/trending';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/LoginSlice';
import PagerView from 'react-native-pager-view';

const MyCourses = () => {

    const [activeTab, setActiveTab] = useState(0);

    // Handle page change on swipe
    const handlePageChange = (event) => {
        setActiveTab(event.nativeEvent.position);
    };

    return (
        <View style={{ flex: 1, backgroundColor: background, }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: darkBlue }} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" style={{ color: '#fff' }} size={15} />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.3) }}>My Courses</Text>
                </View>

                <View style={{ width: 35, height: 35 }}>

                </View>
            </View>

            {/* Top Tab Bar */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 2, borderBottomColor: '#ccc' }}>
                <TouchableOpacity style={{ paddingVertical: 10, justifyContent: 'center', alignItems: 'center', flex: 1, borderBottomWidth: activeTab === 0 ? 4 : 0, borderBottomColor: '#1a3b72' }} onPress={() => setActiveTab(0)}>
                    <Text style={{ fontSize: 16, color: activeTab === 0 ? '#1a3b72' : '#000' }}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingVertical: 10, justifyContent: 'center', alignItems: 'center', flex: 1, borderBottomWidth: activeTab === 1 ? 4 : 0, borderBottomColor: '#1a3b72' }} onPress={() => setActiveTab(1)}>
                    <Text style={{ fontSize: 16, color: activeTab === 1 ? '#1a3b72' : '#000' }}>Individual</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingVertical: 10, justifyContent: 'center', alignItems: 'center', flex: 1, borderBottomWidth: activeTab === 2 ? 4 : 0, borderBottomColor: '#1a3b72' }} onPress={() => setActiveTab(2)}>
                    <Text style={{ fontSize: 16, color: activeTab === 2 ? '#1a3b72' : '#000' }}>Combo</Text>
                </TouchableOpacity>
            </View>

            {/* PagerView */}
            <PagerView style={{ flex: 1 }} initialPage={0} onPageSelected={handlePageChange}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} key="1">
                    <Text style={{ color: '#fff' }}>All Courses Content</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} key="2">
                    <Text>Individual Courses Content</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} key="3">
                    <Text>Combo Courses Content</Text>
                </View>
            </PagerView>
        </View>
    )
}

export default MyCourses;