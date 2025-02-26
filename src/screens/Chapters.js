import { View, Text, FlatList, TouchableOpacity, StatusBar, Animated, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, darkBlue, darkerBlue, lightBlue } from '../utils/colors';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome5';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useState, useCallback, useRef, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { fetchSubjects } from '../utils/fetchSubjects';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import Modal from "react-native-modal";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const { width: width } = Dimensions.get('window');

const Chapters = ({ navigation, route }) => {

    const { data } = route.params;
    const { item } = route.params;
    const { id } = route.params;
    const { price } = route.params;
    const { isCombo } = route.params;

    // console.log('item: ', item);

    const [chapters, setChapters] = useState(null);
    const [loading, setLoading] = useState(true);

    const [modal, setModal] = useState(false);

    const [selectedChapter, setSelectedChapter] = useState(null);

    const translateX = useRef(new Animated.Value(0)).current;

    // get subjects
    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
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

    const showModal = (chapter) => {
        setModal(true);
        setSelectedChapter(chapter)
    }

    // Render Chapter Item 
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
            onPress={() => showModal(item.heading)}

        // onPress={() => navigation.navigate('CourseDetails', { title: item.heading, data: item })}
        >
            <Entypo name="chevron-right" style={{ color: '#000' }} size={18} />
            <Text style={{ color: darkBlue, fontSize: responsiveFontSize(2.1), fontWeight: '500' }}>{item.heading}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: background, paddingHorizontal: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, justifyContent: 'space-between', marginBottom: 10 }}>
                <TouchableOpacity style={{ borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: darkerBlue }} onPress={() => navigation.goBack()}>
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
                                style={{ width: 18, height: 20, borderRadius: 9 }}
                            />

                            {/* Placeholder for Text */}
                            <ShimmerPlaceHolder
                                autoRun={true}
                                visible={!loading}
                                style={{ width: '70%', height: 20, borderRadius: 5 }}
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

            {/* Buy Button */}
            {!isCombo && (
                <LinearGradient
                    colors={['#000', darkBlue]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ borderRadius: 14, elevation: 2, marginTop: 10, width: '100%', height: 53, position: 'absolute', bottom: 5, alignSelf: 'center', alignItems: 'center', flexDirection: 'row' }}
                >
                    <>
                        {loading ? (
                            <ShimmerPlaceHolder
                                autoRun={true}
                                visible={!loading}
                                style={{ width: '100%', height: 53, borderRadius: 9, elevation: 1 }}
                            />
                        ) : (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Checkout', { item: item, type: 1 })}
                                style={{ gap: 8, height: '100%', borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: 8 }}
                            >
                                <View style={{ height: '100%', backgroundColor: '#fff', paddingHorizontal: 10, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: darkBlue, fontWeight: '800', fontSize: responsiveFontSize(2.3) }}>₹ {price}.00</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <Text style={{ fontSize: responsiveFontSize(2.2), color: '#fff', fontWeight: 'bold' }}>Buy this course</Text>

                                    {/* Animated Arrows */}
                                    <View style={{ flexDirection: 'row', overflow: 'hidden', paddingRight: 20, }}>
                                        {Array(3)
                                            .fill(0)
                                            .map((_, index) => (
                                                <Animated.Text
                                                    key={index}
                                                    style={{
                                                        transform: [{ translateX }],
                                                    }}
                                                >
                                                    <Ionicons name="caret-forward" style={{ color: '#fff' }} size={18} />
                                                </Animated.Text>
                                            ))}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    </>
                </LinearGradient>
            )}

            {/* Modal */}
            <Modal
                isVisible={modal}
                onBackdropPress={() => {
                    // setSelectedBoard(null);
                    // setSelectedClass(null);
                    setModal(false);
                }}
                onSwipeComplete={() => {
                    // setSelectedBoard(null);
                    // setSelectedClass(null);
                    setModal(false);
                }}
                onRequestClose={() => {
                    // setSelectedBoard(null);
                    // setSelectedClass(null);
                    setModal(false);
                }}
                animationType="slide"
                swipeDirection={['down']}
                backdropOpacity={0.5}
                style={{ justifyContent: 'flex-end', margin: 0 }}
            >
                <View style={{ width: "100%", height: '100%', justifyContent: 'flex-end' }}>

                    {/* Close Button */}
                    <TouchableOpacity
                        style={{ alignSelf: 'center', backgroundColor: '#000', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 35, height: 35, borderRadius: 50, marginBottom: 10 }}
                        onPress={() => {
                            // setIsRateFocused(false);
                            setModal(false);
                        }}
                    >
                        <Ionicons name="close" size={20} style={{ color: '#fff' }} />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'column', backgroundColor: '#fff', borderTopLeftRadius: 15, borderTopRightRadius: 15, paddingTop: 20, paddingBottom: 5 }}>

                        <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: 'bold', color: darkBlue, textAlign: 'center' }}>Unlock Chapter</Text>

                        <Text style={{ marginTop: 10, fontSize: responsiveFontSize(2), textAlign: 'center', color: '#444', fontWeight: '500' }}>
                            You need to purchase this course to access "{selectedChapter}".
                        </Text>

                        {/* Buttons */}
                        <View style={{ width: '100%', flexDirection: 'row', paddingVertical: 6, justifyContent: 'space-evenly', alignItems: "center" }}>
                            {/* Cancel */}
                            <TouchableOpacity activeOpacity={0.7} onPress={() => setModal(false)} style={{ width: '47%', backgroundColor: '#fff', borderRadius: 12, gap: 5, borderColor: darkerBlue, borderWidth: 1, height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: darkerBlue, fontSize: responsiveFontSize(2.2), fontWeight: "600" }}>Cancel</Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 19, height: 19, alignItems: 'center', backgroundColor: darkerBlue, borderRadius: 5, borderColor: darkerBlue, borderWidth: 1 }}>
                                    <Ionicons name="close" size={13} style={{ color: '#fff' }} />
                                </View>
                            </TouchableOpacity>

                            {/* Buy Now */}
                            <TouchableOpacity style={{ height: 45, backgroundColor: darkerBlue, borderRadius: 12, justifyContent: 'center', flexDirection: 'row', width: '47%', alignSelf: 'center', elevation: 4, gap: 5, alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                    <Text style={{ color: '#fff', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>Buy Now</Text>

                                    <View style={{ backgroundColor: '#fff', width: 19, height: 19, borderRadius: 4, alignItems: 'center', justifyContent: 'center', borderColor: 'red', borderEndWidth: 0.6 }}>
                                        <Icon3 name="save" size={13} color={darkerBlue} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal >
        </View >
    );
};

export default Chapters;