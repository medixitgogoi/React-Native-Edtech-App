import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// Import your screen components
import VideoPlayer from '../screens/VideoPlayer';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import Transactions from '../screens/Purchases';
import EnrolledCourses from '../screens/EnrolledCourses';
import CourseDetails from '../screens/CourseDetails';
import Home from '../screens/Home';
import Notifications from '../screens/Notifications';
import Courses from '../screens/Courses';
import { darkBlue } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { Text } from 'react-native';
import Purchases from '../screens/Purchases';
import Notes from '../screens/Notes';
import ViewPdf from '../screens/ViewPDF';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Courses') {
                        iconName = focused ? 'book' : 'book-outline';
                    } else if (route.name === 'Purchases') {
                        iconName = focused ? 'cash' : 'cash-outline';
                    }

                    return <Icon name={iconName} size={20} color={color} />;
                },
                tabBarActiveTintColor: darkBlue,
                tabBarInactiveTintColor: '#000',
                headerShown: false,
                tabBarStyle: {
                    height: 45, // Set the height of the tab bar
                    paddingBottom: 10, // Adjust padding for label/icon alignment
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16
                },
                tabBarLabel: ({ focused }) => (
                    <Text
                        style={{
                            marginTop: -2, // Adjust gap between icon and label
                            fontSize: responsiveFontSize(1.4), // Label font size
                            fontWeight: focused ? '600' : '400', // Font weight on focus
                            color: focused ? darkBlue : '#000',
                        }}
                    >
                        {route.name}
                    </Text>
                ),
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Courses" component={Courses} />
            <Tab.Screen name="Purchases" component={Purchases} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

// Bottom Tab Navigator
function GuestNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
            <Stack.Screen name="Main" component={BottomTabs} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="EnrolledCourses" component={EnrolledCourses} />
            <Stack.Screen name="CourseDetails" component={CourseDetails} />
            <Stack.Screen name="ViewPdf" component={ViewPdf} />
            <Stack.Screen name="Notes" component={Notes} />
        </Stack.Navigator>
    );
}

export default GuestNavigator;