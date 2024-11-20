import { View, Text, TouchableOpacity, FlatList, StatusBar, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Foundation from 'react-native-vector-icons/dist/Foundation';
import { useNavigation } from '@react-navigation/native';
import { darkBlue, lightBlue } from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';

const lectures = [
    { id: '1', title: 'Lecture 1: Introduction to React', subtitle: 'Basics of React and its ecosystem' },
    { id: '2', title: 'Lecture 2: React Native Overview', subtitle: 'Understanding React Native basics' },
    { id: '3', title: 'Lecture 3: State Management', subtitle: 'Using state and props effectively' },
    { id: '4', title: 'Lecture 4: Styling Components', subtitle: 'Approaches to styling in React Native' },
    { id: '5', title: 'Lecture 5: Navigation in React Native', subtitle: 'Using React Navigation for multi-page apps' },
    { id: '6', title: 'Lecture 6: Debugging React Native Apps', subtitle: 'Tools and techniques for debugging' },
    { id: '7', title: 'Lecture 7: Handling API Calls', subtitle: 'Fetching data and managing async operations' },
    { id: '8', title: 'Lecture 8: Custom Components', subtitle: 'Creating and using reusable components' },
    { id: '9', title: 'Lecture 9: Animations in React Native', subtitle: 'Implementing animations for better UX' },
    { id: '10', title: 'Lecture 10: Introduction to Redux', subtitle: 'State management with Redux' },
    { id: '11', title: 'Lecture 11: Working with Context API', subtitle: 'Managing state without Redux' },
    { id: '12', title: 'Lecture 12: Optimizing Performance', subtitle: 'Improving app performance and efficiency' },
    { id: '13', title: 'Lecture 13: Forms and Validation', subtitle: 'Handling user input and form validation' },
    { id: '14', title: 'Lecture 14: React Native Hooks', subtitle: 'Using hooks like useState and useEffect' },
    { id: '15', title: 'Lecture 15: Accessing Device Features', subtitle: 'Working with camera, location, and storage' },
    { id: '16', title: 'Lecture 16: Testing React Native Apps', subtitle: 'Writing tests for React Native components' },
    { id: '17', title: 'Lecture 17: Publishing to App Stores', subtitle: 'Deploying your app to Google Play and App Store' },
    { id: '18', title: 'Lecture 18: Introduction to TypeScript', subtitle: 'Using TypeScript with React Native' },
    { id: '19', title: 'Lecture 19: Authentication in Apps', subtitle: 'Implementing login and signup functionality' },
    { id: '20', title: 'Lecture 20: Integrating Third-party Libraries', subtitle: 'Adding libraries and understanding linking' },
];

const ViewPdf = () => {

    const renderLecture = ({ item }) => (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: lightBlue,
                borderRadius: 12,
                padding: 14,
                elevation: 1
            }}
        >
            <View
                style={{
                    width: 45,
                    height: 45,
                    borderRadius: 25,
                    backgroundColor: darkBlue,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}
            >
                <FontAwesome name="file-pdf-o" size={22} color={'#fff'} />
            </View>

            <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', color: darkBlue }}>{item.title}</Text>
                <Text style={{ fontSize: responsiveFontSize(1.7), color: '#8b8b8b', fontWeight: '500' }}>{item.subtitle}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor="#fff"
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, justifyContent: 'space-between', marginBottom: 5 }}>
                <TouchableOpacity style={{ borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: darkBlue }} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" style={{ color: '#fff' }} size={15} />
                </TouchableOpacity>
                <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>View PDFs</Text>
                <View style={{ width: 35, height: 35 }} />
            </View>

            <FlatList
                data={lectures}
                renderItem={renderLecture}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 1, gap: 15, paddingTop: 3 }}
            />
        </SafeAreaView>
    );
};

export default ViewPdf;