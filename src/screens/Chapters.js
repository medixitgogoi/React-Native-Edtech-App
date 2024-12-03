import { View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, darkBlue, lightBlue } from '../utils/colors';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const chaptersData = [
    { id: '1', title: 'Introduction to Algebra' },
    { id: '2', title: 'Linear Equations' },
    { id: '3', title: 'Quadratic Equations' },
    { id: '4', title: 'Polynomials' },
];

const Chapters = ({ navigation, route }) => {

    const { data } = route.params;

    const renderChapterItem = ({ item }) => (
        <TouchableOpacity
            style={{
                backgroundColor: lightBlue,
                padding: 12,
                borderRadius: 10,
                marginBottom: 15,
                borderColor: darkBlue,
                borderWidth: 1,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8
            }}
            onPress={() => navigation.navigate('CourseDetails', { data: item.title })}
        >
            <Entypo name="chevron-right" style={{ color: '#000' }} size={18} />
            <Text style={{ color: darkBlue, fontSize: responsiveFontSize(2.1), fontWeight: '500' }}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingHorizontal: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, justifyContent: 'space-between', marginBottom: 5 }}>
                <TouchableOpacity style={{ borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: darkBlue }} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" style={{ color: '#fff' }} size={15} />
                </TouchableOpacity>
                <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.3) }}>{data}</Text>
                <View style={{ width: 35, height: 35 }} />
            </View>

            <View style={{ marginBottom: 15, alignSelf: 'center' }}>
                <Text style={{ color: darkBlue, fontSize: responsiveFontSize(2.5), fontWeight: '600' }}>Explore Chapters</Text>
            </View>

            <FlatList
                data={chaptersData}
                renderItem={renderChapterItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </SafeAreaView>
    );
};

export default Chapters;