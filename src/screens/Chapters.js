import { View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, darkBlue, lightBlue } from '../utils/colors';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { fetchSubjects } from '../utils/fetchSubjects';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Chapters = ({ navigation, route }) => {

    const { data } = route.params;
    const { id } = route.params;

    const [chapters, setChapters] = useState(null);
    const [loading, setLoading] = useState(false);

    // get subjects
    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    setLoading(true);
                    const data = await fetchSubjects(id);
                    console.log('subjects data: ', data);

                    setChapters(data?.subject?.chapter);
                } catch (error) {
                    console.error('Error fetching appLoad: ', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }, [id])
    );

    const renderChapterItem = ({ item }) => (
        <TouchableOpacity
            style={{
                backgroundColor: lightBlue,
                padding: 13,
                borderRadius: 10,
                marginBottom: 15,
                borderColor: darkBlue,
                borderWidth: 1.2,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8
            }}
            onPress={() => navigation.navigate('CourseDetails', { title: item.heading, data: item })}
        >
            <Entypo name="chevron-right" style={{ color: '#000' }} size={18} />
            <Text style={{ color: darkBlue, fontSize: responsiveFontSize(2.1), fontWeight: '500' }}>{item.heading}</Text>
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
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, justifyContent: 'space-between', marginBottom: 10 }}>
                <TouchableOpacity style={{ borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: darkBlue }} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" style={{ color: '#fff' }} size={15} />
                </TouchableOpacity>
                <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.3) }}>{data}</Text>
                <View style={{ width: 35, height: 35 }} />
            </View>

            {/* Sub heading */}
            <View style={{ marginBottom: 20, borderRadius: 13, overflow: 'hidden' }}>
                <LinearGradient
                    colors={['#52a8ff', '#0066cc']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ paddingVertical: 15, justifyContent: 'center', alignItems: 'center', elevation: 5, width: '100%' }}
                >
                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.2), fontWeight: '700', textAlign: 'center' }}>
                        Explore Chapters
                    </Text>
                </LinearGradient>
            </View>

            {loading ? (
                <FlatList
                    data={[1, 1, 1, 1, 1]} // Dummy data for shimmer placeholders
                    renderItem={() => (
                        <View style={{ backgroundColor: '#fff', padding: 13, borderRadius: 10, marginBottom: 15, elevation: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            {/* Placeholder for Chevron Icon */}
                            <ShimmerPlaceHolder
                                autoRun={true}
                                visible={!loading}
                                style={{ width: 18, height: 22, borderRadius: 9 }}
                            />

                            {/* Placeholder for Text */}
                            <ShimmerPlaceHolder
                                autoRun={true}
                                visible={!loading}
                                style={{ width: '70%', height: 22, borderRadius: 5 }}
                            />
                        </View>
                    )}
                    keyExtractor={(_, index) => index.toString()} // Unique key for shimmer items
                    contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 1, paddingVertical: 1 }}
                />
            ) : (
                <FlatList
                    data={chapters}
                    renderItem={renderChapterItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}

        </SafeAreaView>
    );
};

export default Chapters;