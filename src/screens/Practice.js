import { StyleSheet, ScrollView, View, StatusBar, Image, Dimensions, FlatList, Text, Animated, TouchableOpacity } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Feather from 'react-native-vector-icons/dist/Feather';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Modal from "react-native-modal";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import SidebarModal from '../components/SidebarModal';
import TabBar from '../components/TabBar';

const { width } = Dimensions.get('window');
const screenWidth = Dimensions.get('window').width;

const Home = () => {

    const [sidebaropen, setsidebaropen] = useState(false);
    const [modelopen, setmodelopen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigation = useNavigation();

    const backgroundColor = "#fff";

    const scrollViewRef = useRef(null);

    const bannerImages = [
        require('../assets/banner1.jpg'),
        require('../assets/banner2.jpg'),
    ];

    // Banner scrolling
    useEffect(() => {
        let bannerIndex = 0;

        const interval = setInterval(() => {
            bannerIndex = (bannerIndex + 1) % bannerImages.length;
            scrollViewRef.current.scrollTo({ x: bannerIndex * width, animated: true });
        }, 3000);

        return () => clearInterval(interval);
    }, [bannerImages.length]);

    const images = [
        { id: '1', source: require('../assets/1.png') },
        { id: '2', source: require('../assets/2.png') },
        { id: '3', source: require('../assets/3.png') },
        { id: '4', source: require('../assets/4.png') },
    ];

    const scrollX = useRef(new Animated.Value(0)).current;

    const onViewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    };

    const viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 50,
    };

    const renderItem = ({ item, index }) => {

        const inputRange = [
            (index - 1) * width * 0.8,
            index * width * 0.8,
            (index + 1) * width * 0.8,
        ];

        const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6],
            extrapolate: 'clamp',
        });

        return (
            <TouchableOpacity
                // onPress={() => navigation.navigate("SubjectDetail")}
                // onPress={() => navigation.navigate("SubjectDetail")}
                onPress={() => setmodelopen(true)}
                // onPress={() =>purchasefunction(item)}

                style={styles.imageContainer}>
                <Animated.Image
                    source={item.source}
                    style={[
                        styles.imagess,
                        {
                            transform: [{ scale }],
                            opacity,
                        },
                    ]}
                />
            </TouchableOpacity>
        );
    };

    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, [animatedValue]);

    const animatedStyle = {
        transform: [
            {
                scale: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.5],
                }),
            },
        ],
    };

    const VideoItem = ({ navigation, imageSource, title, subtitle, language }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate("VideoPlayer")}
            style={{ marginHorizontal: 10, marginTop: 2 }}
        >
            <View style={{ width: "100%", flexDirection: "row", backgroundColor: 'rgba(255, 255, 255, 0.3)', padding: 10, borderRadius: 5 }}>
                <View style={{ width: "25%", alignItems: "center" }}>
                    <Image source={imageSource} style={{ height: 70, width: 70 }} />
                </View>
                <View style={{ width: "70%" }}>
                    <Text style={{ color: "#fff", fontSize: responsiveFontSize(2), fontWeight: "700", paddingLeft: 8, paddingTop: 5 }}>
                        {title}
                    </Text>
                    <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8), fontWeight: "300", paddingLeft: 8, paddingTop: 2 }}>
                        {subtitle}
                    </Text>
                    <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8), fontWeight: "300", paddingLeft: 8, paddingTop: 2 }}>
                        {language}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const boards = [
        {
            id: '1',
            name: 'SEBA'
        },
        {
            id: '2',
            name: 'CBSE'
        },
        {
            id: '3',
            name: 'ICSE'
        },
        {
            id: '4',
            name: 'IB'
        },
        {
            id: '5',
            name: 'NIOS'
        },
        {
            id: '6',
            name: 'AISSCE'
        },
    ];

    const classes = [
        { id: '1', name: 'Class 1' },
        { id: '2', name: 'Class 2' },
        { id: '3', name: 'Class 3' },
        { id: '4', name: 'Class 4' },
        { id: '5', name: 'Class 5' },
        { id: '6', name: 'Class 6' },
        { id: '7', name: 'Class 7' },
        { id: '8', name: 'Class 8' },
        { id: '9', name: 'Class 9' },
        { id: '10', name: 'Class 10' },
    ];

    const subjects = [
        { id: '1', name: 'Physics' },
        { id: '2', name: 'Mathematics' },
        { id: '3', name: 'Chemistry' },
        { id: '4', name: 'Statistics' },
        { id: '5', name: 'English' },
        { id: '5', name: 'Economics' },
    ];

    const chapters = [{ id: '1', name: 'Chapter 1' }, { id: '2', name: 'Chapter 2' }];

    const handleSelection = (nextStep) => {
        Animated.timing(scrollX, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start(() => setStep(nextStep));
    };

    const renderCard = ({ item }) => (
        <TouchableOpacity
            style={{ width: screenWidth / 3.5, height: screenWidth / 3.5, borderRadius: 16, overflow: 'hidden', marginBottom: 15 }}
            onPress={() => {
                if (step === 1) {
                    setStep(2); // Move to step 2 (class selection)
                } else if (step === 2) {
                    setStep(3); // Move to step 2 (class selection)
                } else if (step === 3) {
                    setStep(4); // Move to step 2 (class selection)
                }
            }}
        >
            <Image source={require("../assets/card-bg.png")} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
            <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <LinearGradient
                    colors={['#00000000', '#000']}
                    style={{ width: '100%', height: 60, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 6 }}
                >
                    <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', color: '#fff', textAlign: 'center', letterSpacing: 0.4 }}>{item.name}</Text>
                </LinearGradient>
            </View>
        </TouchableOpacity>
    );

    const [selectedBoard, setSelectedBoard] = useState(null); // State to store selected board
    const [selectedClass, setSelectedClass] = useState(null); // State to store selected class
    const [step, setStep] = useState(1); // To track the current step (1 or 2)

    return (
        <View style={{ flex: 1, backgroundColor }}>
            <StatusBar
                animated={true}
                backgroundColor="#000"
            />

            {/* Header */}
            <View style={{ backgroundColor, paddingVertical: 4, elevation: 1, position: 'relative', zIndex: 20, height: 45, paddingHorizontal: 10, justifyContent: "space-between", flexDirection: 'row', alignItems: "center" }}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <TouchableOpacity onPress={() => setsidebaropen(true)}>
                        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{ borderRadius: 50, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                            <MaterialCommunityIcons style={{ fontSize: responsiveFontSize(2.9), color: "#fff" }} name="view-dashboard-outline" />
                        </LinearGradient>
                    </TouchableOpacity>

                    <Text style={{ paddingLeft: 5, fontSize: responsiveFontSize(2.2), color: "#fff", fontWeight: "700" }}>Hey, Pollab 👋</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>

                    <View style={{}}>
                        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{ borderRadius: 50, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                            <MaterialIcons style={{ fontSize: responsiveFontSize(2.9), color: "#fff" }} name="notifications" />
                        </LinearGradient>
                    </View>
                </View>
            </View>

            {/* Content */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Banner */}
                <View style={{ marginTop: 8, height: 180 }}>
                    <ScrollView ref={scrollViewRef} horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                        {bannerImages.map((image, index) => (
                            <Image
                                key={index}
                                source={image}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        ))}
                    </ScrollView>
                </View>

                {/* Selection */}
                <View style={{ paddingHorizontal: 10, marginVertical: 25 }}>

                    {/* Heading */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{ borderRadius: 50, justifyContent: 'center', alignItems: 'center', width: 30, height: 30 }}>
                            <MaterialIcons size={15} style={{ color: "#fff", padding: 2 }} name="cast-for-education" />
                        </LinearGradient>
                        <Text style={{ color: '#fff', fontWeight: '500', fontSize: responsiveFontSize(2) }}>Start learning at the comfort of your home</Text>
                    </View>

                    {step === 1 && (
                        <>
                            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{ marginTop: 15, borderRadius: 8, gap: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                                <Text style={{ color: '#fff', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>STEP 1:</Text>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: responsiveFontSize(2.2),
                                    fontWeight: '600',
                                }}>
                                    Select Your Board Below
                                </Text>
                            </LinearGradient>

                            <FlatList
                                data={boards}
                                renderItem={renderCard}
                                keyExtractor={(item) => item.id}
                                numColumns={3} // Adjust this for the number of columns
                                columnWrapperStyle={{
                                    justifyContent: 'space-between', // Distributes space between items in each row
                                }}
                                contentContainerStyle={{
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    // paddingHorizontal: 10, // Padding for spacing from screen edges
                                }}
                            />
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{ marginTop: 15, borderRadius: 8, gap: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                                <Text style={{ color: '#fff', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>STEP 2:</Text>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: responsiveFontSize(2.2),
                                    fontWeight: '600',
                                }}>
                                    Select Your Class Below
                                </Text>
                            </LinearGradient>

                            <FlatList
                                data={classes}
                                renderItem={renderCard}
                                keyExtractor={(item) => item.id}
                                numColumns={3} // Adjust this for the number of columns
                                columnWrapperStyle={{
                                    justifyContent: 'space-between', // Distributes space between items in each row
                                }}
                                contentContainerStyle={{
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    // paddingHorizontal: 10, // Padding for spacing from screen edges
                                }}
                            />
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{ marginTop: 15, borderRadius: 8, gap: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                                <Text style={{ color: '#fff', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>STEP 3:</Text>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: responsiveFontSize(2.2),
                                    fontWeight: '600',
                                }}>
                                    Select Your Subject Below
                                </Text>
                            </LinearGradient>

                            <FlatList
                                data={subjects}
                                renderItem={renderCard}
                                keyExtractor={(item) => item.id}
                                numColumns={3} // Adjust this for the number of columns
                                columnWrapperStyle={{
                                    justifyContent: 'space-between', // Distributes space between items in each row
                                }}
                                contentContainerStyle={{
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                }}
                            />
                        </>
                    )}

                    {/* <View>
            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{ marginTop: 15, borderRadius: 8, gap: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
              <Text style={{ color: '#fff', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>STEP 1:</Text>
              <Text style={{
                color: '#fff',
                fontSize: responsiveFontSize(2.2),
                fontWeight: '600',
              }}>
                Select Your Board Below
              </Text>
            </LinearGradient>

            <FlatList
              data={boards}
              renderItem={renderCard}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{
                paddingTop: 10,
                paddingBottom: 10,
                paddingHorizontal: 5,
                justifyContent: 'space-between',
                flexDirection: 'row',
                flexWrap: 'wrap',

              }}
            />
          </View> */}
                </View>

                {/* <View style={{ paddingHorizontal: 5 }}>
          {step === 'Board' && <FlatList data={boards} renderItem={renderCard} numColumns={3} keyExtractor={(item) => item.id} />}
          {step === 'Class' && <FlatList data={classes} renderItem={renderCard} numColumns={3} keyExtractor={(item) => item.id} />}
          {step === 'Subject' && <FlatList data={subjects} renderItem={renderCard} numColumns={3} keyExtractor={(item) => item.id} />}
          {step === 'Chapters' && <FlatList data={chapters} renderItem={renderCard} numColumns={3} keyExtractor={(item) => item.id} />}
        </View> */}

                {/* Select Subjects */}
                <View>
                    <View style={{ marginTop: 15, marginLeft: 10, marginBottom: 15, flexDirection: 'row', alignItems: "center" }}>
                        <View style={{ backgroundColor: '#7e94f5', padding: 5, borderRadius: 10 }}>
                            <Animated.View style={[{ backgroundColor: '#7e94f5', padding: 2, borderRadius: 10 }, animatedStyle]}>
                                <Entypo
                                    style={{ fontSize: responsiveFontSize(2), color: "#fff" }}
                                    name="open-book"
                                />
                            </Animated.View>
                        </View>

                        <Text style={{ color: "#fff", fontSize: responsiveFontSize(2.5), fontWeight: "400", paddingLeft: 8 }}>
                            Select Subjects
                        </Text>
                    </View>

                    <Animated.FlatList
                        data={images}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onViewableItemsChanged={onViewableItemsChanged}
                        viewabilityConfig={viewabilityConfig}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: false }
                        )}
                        contentContainerStyle={{
                            paddingHorizontal: (width - width * 0.8) / 2,
                        }}
                        snapToInterval={width * 0.7}
                        decelerationRate="fast"
                    />

                    <View style={styles.dotContainer}>
                        {images.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    { backgroundColor: index === currentIndex ? '#fff' : '#9b9b9b' },
                                ]}
                            />
                        ))}
                    </View>
                </View>

                {/* Trending Concepts */}
                <View style={{ marginTop: 15, marginBottom: 15, flexDirection: 'row', alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <View style={{ backgroundColor: '#7e94f5', padding: 5, borderRadius: 10 }}>
                            <Animated.View style={[{ backgroundColor: '#7e94f5', padding: 2, borderRadius: 10 }, animatedStyle]}>
                                <Feather style={{ fontSize: responsiveFontSize(2), color: "#fff" }} name="book" />
                            </Animated.View>
                        </View>
                        <Text style={{ color: "#fff", fontSize: responsiveFontSize(2.5), fontWeight: "400", paddingLeft: 8 }}>
                            Trending Concepts
                        </Text>
                    </View>

                    <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', paddingHorizontal: 10, paddingVertical: 2, borderRadius: 5 }}>
                        <Text style={{ fontSize: responsiveFontSize(1.5), color: "#fff" }}>
                            View all
                        </Text>
                    </View>
                </View>

                <VideoItem
                    navigation={navigation}
                    imageSource={require('../assets/Chemicalreactions.png')}
                    title="Introduction"
                    subtitle="Chemical Reactions"
                    language="Science (English)"
                />

                <VideoItem
                    navigation={navigation}
                    imageSource={require('../assets/Chemicalreactions.png')}
                    title="Introduction"
                    subtitle="Chemical Reactions"
                    language="Science (English)"
                />

                <VideoItem
                    navigation={navigation}
                    imageSource={require('../assets/Chemicalreactions.png')}
                    title="Introduction"
                    subtitle="Chemical Reactions"
                    language="Science (English)"
                />

                <VideoItem
                    navigation={navigation}
                    imageSource={require('../assets/Chemicalreactions.png')}
                    title="Introduction"
                    subtitle="Chemical Reactions"
                    language="Science (English)"
                />

                <View style={{ marginBottom: 60 }}>

                </View>
            </ScrollView>

            {/* Modal */}
            <Modal
                isVisible={modelopen}
                onBackdropPress={() => setmodelopen(false)}
                onSwipeComplete={() => setmodelopen(false)}
                backdropOpacity={0.5}
                style={{ justifyContent: 'flex-end', margin: 0 }}
            >
                <View style={{ backgroundColor: "#fff", position: "absolute", bottom: 0, right: 0, left: 0, width: "100%", borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 15 }}>
                    <View style={{ flexDirection: "row", marginTop: 10, width: "100%" }}>
                        <View style={{ width: "40%" }}>
                            <Image source={require('../assets/1.png')} style={{ width: "100%", height: 160 }} resizeMode="stretch" />
                        </View>
                        <View style={{ marginLeft: 15, width: "60%" }}>
                            <Text style={{ color: "#000", fontSize: 20, fontWeight: "800" }}>Mathematics</Text>
                            <View style={{ marginTop: 10 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Feather style={{ color: "#07692d", fontSize: 20 }} name="check-circle" />
                                    <Text style={{ color: "#000", fontSize: 16, paddingLeft: 5 }}>Subject Notes</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                                    <Feather style={{ color: "#07692d", fontSize: 20 }} name="check-circle" />
                                    <Text style={{ color: "#000", fontSize: 16, paddingLeft: 5 }}>Topic Videos</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                                    <Feather style={{ color: "#07692d", fontSize: 20 }} name="check-circle" />
                                    <Text style={{ color: "#000", fontSize: 16, paddingLeft: 5 }}>Subject PDFs</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#0d1116" }}>Enrollment Fee: $99</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("SubjectDetail")} style={{ backgroundColor: "#0d1116", paddingVertical: 12, borderRadius: 5, marginTop: 10, alignItems: "center" }}>
                            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>Buy Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <SidebarModal isVisible={sidebaropen} onClose={() => setsidebaropen(false)} />
            <TabBar />
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    scrollView: {
        width: '100%',
    },
    image: {
        width: width - 20,
        height: 180,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: width * 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagess: {
        width: width * 0.7,
        height: width * 0.7,
        resizeMode: 'contain',
        borderRadius: 15,
    },
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    dot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    card: {
        // flex: 1,
        margin: 5,
        // aspectRatio: 1,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#222',
        justifyContent: 'flex-end',
        width: screenWidth * 3.3,
        height: 40
    },
    cardImage: {
        ...StyleSheet.absoluteFillObject,
    },
    cardTitle: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        textAlign: 'center',
        paddingVertical: 4,
        fontSize: responsiveFontSize(1.5),
    }
});








// https://dribbble.com/shots/20313464-Learn-In-The-eLearning-App

// https://dribbble.com/shots/14894539-Learning-App