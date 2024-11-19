import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// Import your screen components
import VideoPlayer from '../screens/VideoPlayer';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import Transactions from '../screens/Transactions';
import EnrolledCourses from '../screens/EnrolledCourses';
import CourseDetails from '../screens/CourseDetails';
import DownloadPDF from '../screens/DownloadPDF';
import Home from '../screens/Home';
import Notifications from '../screens/Notifications';
import Courses from '../screens/Courses';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Courses') {
                        iconName = focused ? 'book' : 'book-outline';
                    } else if (route.name === 'Notifications') {
                        iconName = focused ? 'notifications' : 'notifications-outline';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#6200EE',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Courses" component={Courses} />
            <Tab.Screen name="Notifications" component={Notifications} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}


// Bottom Tab Navigator
function GuestNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
            <Stack.Screen name="Main" component={BottomTabs} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
            <Stack.Screen name="Transactions" component={Transactions} />
            <Stack.Screen name="EnrolledCourses" component={EnrolledCourses} />
            <Stack.Screen name="CourseDetails" component={CourseDetails} />
            <Stack.Screen name="DownloadPDF" component={DownloadPDF} />
        </Stack.Navigator>
    );
}


export default GuestNavigator;