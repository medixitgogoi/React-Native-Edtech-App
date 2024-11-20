import { View, Text, TouchableOpacity, FlatList, StatusBar, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/dist/FontAwesome6';
import Foundation from 'react-native-vector-icons/dist/Foundation';
import { useNavigation } from '@react-navigation/native';
import { darkBlue, lightBlue } from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';

const CourseDetails = ({ route }) => {

    const { data } = route.params;

    const navigation = useNavigation();

    // Dummy data for videos
    const videos = [
        { id: '1', title: 'Introduction to Subject', description: 'A brief overview of the subject.' },
        { id: '2', title: 'Advanced Concepts', description: 'Detailed explanation of advanced topics.' },
        { id: '3', title: 'Practical Applications', description: 'Real-world use cases of the subject.' },
        { id: '4', title: 'Key Definitions', description: 'Important terms and definitions explained.' },
        { id: '5', title: 'Problem-Solving Techniques', description: 'Methods for solving typical problems in the subject.' },
        { id: '6', title: 'Interactive Examples', description: 'Step-by-step walkthroughs of example problems.' },
        { id: '7', title: 'FAQs', description: 'Answers to common questions about the subject.' },
        { id: '8', title: 'Subject History', description: 'An overview of how this field has evolved over time.' },
        { id: '9', title: 'Expert Tips', description: 'Tips and tricks from industry professionals.' },
        { id: '10', title: 'Future Trends', description: 'Predictions and upcoming advancements in the field.' },
    ];

    const renderVideoCard = ({ item }) => (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: lightBlue,
                borderRadius: 12,
                padding: 14,
                elevation: 1
            }}
            onPress={() => navigation.navigate('VideoPlayer', { data: item.title })}
        >
            <View
                style={{
                    width: 45,
                    height: 45,
                    borderRadius: 25,
                    backgroundColor: darkBlue,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <AntDesign name="playcircleo" size={22} color="#fff" />
            </View>

            <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold', color: darkBlue }}>
                    {item.title}
                </Text>
                <Text style={{ fontSize: responsiveFontSize(1.7), color: '#8b8b8b', fontWeight: '500' }}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor="#fff"
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: darkBlue }} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" style={{ color: '#fff' }} size={15} />
                </TouchableOpacity>
                <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.3) }}>{data}</Text>
                <View style={{ width: 35, height: 35 }} />
            </View>

            {/* Headline */}
            <View style={{ marginTop: 5, marginBottom: 20 }}>
                <Text style={{ fontSize: responsiveFontSize(1.9), textAlign: 'center', color: '#888', fontWeight: '500', width: '95%', }}>Welcome to the detailed course breakdown. Access notes, videos, and resources below</Text>
            </View>

            {/* Resources */}
            <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: 'bold', color: '#000', marginBottom: 8 }}>Resources</Text>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                {/* View */}
                <TouchableOpacity onPress={() => navigation.navigate("ViewPdf")} style={{ width: "48%", height: 65 }}>
                    <LinearGradient
                        colors={['#4c669f', '#3b5998', '#192f6a']}
                        style={{ width: "100%", borderRadius: 12, padding: 10, alignItems: "center", flexDirection: 'column', justifyContent: 'center', height: '100%' }}
                    >
                        <FontAwesome6 name="file-pdf" style={{ fontSize: responsiveFontSize(2.5), }} />
                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.9), fontWeight: '500', paddingTop: 5 }}>View</Text>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Notes */}
                <TouchableOpacity style={{ width: "48%", height: 65 }} onPress={() => navigation.navigate("Notes")}>
                    <LinearGradient
                        colors={['#4c669f', '#3b5998', '#192f6a']}
                        style={{ width: "100%", borderRadius: 12, padding: 10, alignItems: "center", flexDirection: 'column', justifyContent: 'center', height: '100%' }}
                    >
                        <Foundation name="clipboard-notes" style={{ fontSize: responsiveFontSize(2.5), }} />
                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.9), fontWeight: '500', paddingTop: 2 }}>Notes</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            {/* Sections */}
            <View style={{ marginTop: 20, flex: 1, paddingBottom: 20 }}>
                {/* Topic Videos */}
                <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: 'bold', color: '#000', marginBottom: 10 }}>
                    Topic Videos
                </Text>

                <FlatList
                    data={videos}
                    renderItem={renderVideoCard}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: 12, paddingHorizontal: 1 }}
                />
            </View>

            <View style={{ marginVertical: 20 }}>
                <TouchableOpacity style={{ backgroundColor: '#000', padding: 5, borderRadius: 8, alignSelf: 'center', width: '50%' }} onPress={() => navigation.navigate('Login')}>
                    <Text style={{ color: '#fff', fontWeight: '600', fontSize: responsiveFontSize(1.9) }}>Log in</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default CourseDetails;