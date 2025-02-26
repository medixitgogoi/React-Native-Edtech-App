import { View, Text, TouchableOpacity, FlatList, Image, ScrollView, StatusBar, Dimensions, BackHandler, Alert, ImageBackground, ActivityIndicator, Animated } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { background, darkBlue, darkerBlue, lightBlue } from '../utils/colors';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { useCallback, useEffect, useRef, useState } from 'react';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome5';
import { useFocusEffect, useNavigation, useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";
import { useSelector } from 'react-redux';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { fetchAppLoad } from '../utils/fetchAppLoad';
import { fetchBoards } from '../utils/fetchBoards';
import Toast from 'react-native-toast-message';
import { fetchClasses } from '../utils/fetchClasses';

const { width: width } = Dimensions.get('window');

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const HomeScreen = () => {

  const userDetails = useSelector(state => state.user);
  // console.log('userDetails', userDetails);

  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const scrollViewRef = useRef(null);

  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  const slideAnim = useRef(new Animated.Value(0)).current;

  const [appLoad, setAppLoad] = useState(null);

  const [courses, setCourses] = useState(null);
  const [comboCourses, setComboCourses] = useState(null);

  const [modal, setModal] = useState(false);

  const [boards, setBoards] = useState(null);
  const [selectedBoard, setSelectedBoard] = useState(null);

  const [classes, setClasses] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  const [loading, setLoading] = useState(true);
  const [boardLoading, setBoardLoading] = useState(false);

  // Get Boards
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBoards();
        console.log('boards: ', data);

        setBoards(data);

      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    };

    fetchData();
  }, []);

  // Preventing from navigating back
  useEffect(() => {
    if (!isFocused) return; // Skip adding the BackHandler if not on Home

    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit?', [
        { text: 'Cancel', onPress: () => null, style: 'cancel' },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
      return true; // Prevent default back button behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove(); // Cleanup
  }, [isFocused]);

  // app load
  useFocusEffect(
    useCallback(() => {
      if (userDetails) {

        const fetchData = async () => {
          try {
            const data = await fetchAppLoad(userDetails);
            console.log('appLoad: ', data);

            setAppLoad(data);
            setCourses(data?.subject);
            setComboCourses(data?.combo);
          } catch (error) {
            console.error('Error fetching appLoad: ', error);
          } finally {
            setLoading(false);
          }
        };

        fetchData();
      }
    }, [userDetails])
  );

  // Banner Images
  const bannerImages = [
    require('../assets/banner2.jpg'),
    require('../assets/banner5.png'),
    require('../assets/banner4.png'),
  ];

  // Automatic scrolling
  useEffect(() => {
    let bannerIndex = 0;

    const interval = setInterval(() => {
      bannerIndex = (bannerIndex + 1) % bannerImages.length;
      scrollViewRef.current?.scrollTo({ x: bannerIndex * width, animated: true });
    }, 3000);

    return () => clearInterval(interval); // Clean up interval
  }, [bannerImages.length]);

  // handle scroll
  const handleScroll = (event) => {
    // Calculate the current index based on the horizontal scroll position
    const xOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(xOffset / width);
    setActiveBannerIndex(index);
  };

  // displaying the slide full
  const handleMomentumScrollEnd = (event) => {
    // Snap the slide to the nearest index
    const xOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(xOffset / width);
    setActiveBannerIndex(index);
    scrollViewRef.current.scrollTo({ x: index * width, animated: true });
  };

  // Card
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
          width: responsiveWidth(65),
        }}
      >
        <TouchableOpacity
          style={{ overflow: 'hidden' }}
          onPress={() => navigation.navigate('Chapters', { data: item.name, id: item.id, price: item.price, item: item, type: 1, isCombo: false })}
        >
          {/* Title */}
          <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: '600', color: '#000', marginBottom: 2, width: '73%' }} numberOfLines={2} ellipsizeMode="tail">{item.name}</Text>

          {/* Author */}
          <Text style={{ fontSize: responsiveFontSize(1.6), color: '#666', marginBottom: 10, fontWeight: '500', }}>By S. Smith</Text>

          {/* Key Highlights Heading with Star Icon */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, justifyContent: 'center' }}>
            {/* Left line */}
            <View style={{ flex: 1, height: 1, backgroundColor: '#999', marginRight: 8 }} />

            {/* Text and icon */}
            <View style={{ backgroundColor: '#f4c430', paddingVertical: 6, paddingHorizontal: 15, borderRadius: 16, alignItems: 'center', justifyContent: 'center', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 }}>
              <Text style={{ fontSize: responsiveFontSize(1.5), fontWeight: '700', color: '#000', textAlign: 'center', letterSpacing: 1 }}>
                Exclusive Benefits
              </Text>
            </View>

            {/* Right line */}
            <View style={{ flex: 1, height: 1, backgroundColor: '#999', marginLeft: 8 }} />
          </View>

          {/* Highlights Section */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }}>
            {/* Subject Notes */}
            <View style={{ alignItems: 'center' }}>
              <MaterialCommunityIcons name="note-text" size={responsiveFontSize(2)} color={'#0073c4'} />
              <Text style={{ fontSize: responsiveFontSize(1.5), color: '#000', fontWeight: '500' }}>Subject Notes</Text>
            </View>

            {/* Topic lectures with separators */}
            <View style={{ alignItems: 'center', paddingHorizontal: 10 }}>
              <FontAwesome name="video-camera" size={responsiveFontSize(2)} color={'#0073c4'} />
              <Text style={{ fontSize: responsiveFontSize(1.5), color: '#000', fontWeight: '500' }}>{item.total_chapter} chapters</Text>
            </View>

            {/* Subject PDFs */}
            <View style={{ alignItems: 'center' }}>
              <MaterialCommunityIcons name="file-pdf-box" size={responsiveFontSize(2)} color={'#0073c4'} />
              <Text style={{ fontSize: responsiveFontSize(1.5), color: '#000', fontWeight: '500' }}>Subject PDFs</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Time */}
        <View style={{ position: 'absolute', top: 12, right: 5, alignItems: 'center', flexDirection: 'row', gap: 3, backgroundColor: darkBlue, paddingHorizontal: 6, paddingVertical: 4, borderColor: '#b2d9f3', borderWidth: 1, borderRadius: 7, justifyContent: 'center' }}>
          <FontAwesome name="clock-o" size={responsiveFontSize(1.7)} color={'#b2d9f3'} />
          <Text style={{ fontSize: responsiveFontSize(1.3), color: '#fff', fontWeight: '500' }}>40 mins</Text>
        </View>
      </LinearGradient>
    );
  };

  // Combo Card
  const comboCardItem = ({ item }) => {

    const totalChapters = item.subjects.reduce((acc, subject) => acc + subject.total_chapters, 0);

    return (
      <LinearGradient
        colors={['#006400', '#32CD32']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          flex: 1,
          padding: 14,
          borderRadius: 12,
          width: responsiveWidth(65),
        }}
      >
        <TouchableOpacity
          style={{ overflow: 'hidden' }}
          onPress={() => navigation.navigate('ComboBreakdown', { data: item })}
        >
          {/* Title */}
          <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: '600', color: '#fff', marginBottom: 10, width: '73%' }}>{item.name}</Text>

          {/* Key Highlights Heading with Star Icon */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, justifyContent: 'center', marginTop: 8 }}>
            {/* Left line */}
            <View style={{ flex: 1, height: 1, backgroundColor: '#999', marginRight: 8 }} />

            {/* Text and icon */}
            <View style={{ backgroundColor: '#f4c430', paddingVertical: 6, paddingHorizontal: 15, borderRadius: 16, alignItems: 'center', justifyContent: 'center', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 }}>
              <Text style={{ fontSize: responsiveFontSize(1.5), fontWeight: '700', color: '#000', textAlign: 'center', letterSpacing: 1 }}>
                Exclusive Benefits
              </Text>
            </View>

            {/* Right line */}
            <View style={{ flex: 1, height: 1, backgroundColor: '#999', marginLeft: 8 }} />
          </View>

          {/* Highlights Section */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5, marginBottom: 15 }}>
            {/* Subject Notes */}
            <View style={{ alignItems: 'center' }}>
              <MaterialCommunityIcons name="note-text" size={responsiveFontSize(2)} color={'#EDF7EC'} />
              <Text style={{ fontSize: responsiveFontSize(1.5), color: '#fff', fontWeight: '500' }}>Subject Notes</Text>
            </View>

            {/* Topic lectures with separators */}
            <View style={{ alignItems: 'center', paddingHorizontal: 10 }}>
              <FontAwesome name="video-camera" size={responsiveFontSize(2)} color={'#EDF7EC'} />
              <Text style={{ fontSize: responsiveFontSize(1.5), color: '#fff', fontWeight: '500' }}>{totalChapters} chapters</Text>
            </View>

            {/* Subject PDFs */}
            <View style={{ alignItems: 'center' }}>
              <MaterialCommunityIcons name="file-pdf-box" size={responsiveFontSize(2)} color={'#EDF7EC'} />
              <Text style={{ fontSize: responsiveFontSize(1.5), color: '#fff', fontWeight: '500' }}>Subject PDFs</Text>
            </View>
          </View>

        </TouchableOpacity>

        {/* Time */}
        <View style={{ position: 'absolute', top: 12, right: 5, alignItems: 'center', flexDirection: 'row', gap: 3, backgroundColor: darkBlue, paddingHorizontal: 6, paddingVertical: 4, borderColor: '#b2d9f3', borderWidth: 1, borderRadius: 7, justifyContent: 'center' }}>
          <FontAwesome name="clock-o" size={responsiveFontSize(1.7)} color={'#b2d9f3'} />
          <Text style={{ fontSize: responsiveFontSize(1.3), color: '#fff', fontWeight: '500' }}>60 mins</Text>
        </View>
      </LinearGradient>
    )
  };

  const handleBoardSubmit = async () => {
    if (!selectedBoard) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Select a board to continue',
        position: 'top',
        topOffset: 5,
      });

      return;
    }

    try {
      setBoardLoading(true);

      // Call fetchClasses and handle the response
      const classes = await fetchClasses(selectedBoard?.id);

      if (classes) {

        setClasses(classes); // Update state with the fetched classes

        Animated.timing(slideAnim, {
          toValue: slideAnim._value - width, // Move the slide animation to the next section
          duration: 300,
          useNativeDriver: true,
        }).start();
      }

    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setBoardLoading(false);
    }
  };

  const handleClassSubmit = () => {
    setModal(false);
  };

  useEffect(() => {
    if (modal) {
      // Reset animation to Slide 1 when modal opens
      Animated.timing(slideAnim, {
        toValue: 0, // Moves back to Slide 1
        duration: 0, // Instantly reset (no animation)
        useNativeDriver: true,
      }).start();
    }
  }, [modal]);

  return (
    <View style={{ flex: 1, backgroundColor: background, paddingHorizontal: 10, paddingTop: 10 }}>
      <StatusBar
        animated={true}
        backgroundColor={background}
        barStyle="dark-content"
      />

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <View style={{ width: responsiveWidth(8), height: responsiveHeight(4), borderColor: darkBlue, borderWidth: 1, padding: 2, borderRadius: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {appLoad ? (
                <Image source={require('../assets/mal.png')} style={{ width: '100%', height: '100%', borderRadius: 40 }} />
              ) : (
                <Image source={require('../assets/avatar.png')} style={{ width: '100%', height: '100%', borderRadius: 40 }} />
              )}
            </View>

            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: '700', color: '#000' }}>Hello, {appLoad?.user?.name || 'User'}</Text>
              <Text style={{ fontSize: responsiveFontSize(1.7), fontWeight: '400', color: '#a2a2a2' }}>What are you learning today?</Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={{ elevation: 4, backgroundColor: darkerBlue, borderRadius: 8, width: responsiveWidth(9), aspectRatio: 1 / 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="notifications" size={18} color={lightBlue} />
          </TouchableOpacity>
        </View>

        {/* Banner */}
        <View style={{ marginBottom: 15, height: 180 }}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            onMomentumScrollEnd={handleMomentumScrollEnd} // Snap to nearest slide
            scrollEventThrottle={16}
            style={{ width: '100%', borderRadius: 12, overflow: 'hidden' }}
          >
            {bannerImages.map((image, index) => (
              <Image
                key={index}
                source={image}
                style={{
                  width: width,
                  height: 180,
                }}
                resizeMode="cover"
              />
            ))}
          </ScrollView>

          {/* Dots */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            {bannerImages.map((_, index) => (
              <View
                key={index}
                style={{
                  width: activeBannerIndex === index ? 7 : 5,
                  height: activeBannerIndex === index ? 7 : 5,
                  borderRadius: 5,
                  marginHorizontal: 5,
                  backgroundColor: activeBannerIndex === index ? '#007BFF' : '#ccc',
                }}
              />
            ))}
          </View>
        </View>

        {userDetails?.length != 0 && (
          <>
            {/* What you get */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
              <Text style={{ color: '#ebedf0', }}>____________________ </Text>
              <Text style={{ color: '#8593a2', fontWeight: '500', fontSize: responsiveFontSize(1.6), textTransform: 'uppercase', letterSpacing: 1.1 }}> What you get </Text>
              <Text style={{ color: '#ebedf0', }}>____________________ </Text>
            </View>

            {/* Board showcase */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                <View style={{ backgroundColor: lightBlue, elevation: 1, borderColor: darkBlue, borderWidth: 0.5, width: 27, height: 27, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <MaterialCommunityIcons name="book-open-variant" size={16} color={darkerBlue} />
                </View>

                <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: '600', color: darkerBlue, textAlign: 'center' }}>
                  Available boards
                </Text>
              </View>

              {/* Change board button */}
              {userDetails?.length !== 0 && (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: darkerBlue,
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    borderRadius: 25,
                    elevation: 3,
                  }}
                  onPress={() => setModal(true)}
                >
                  <Ionicons name={'grid-outline'} size={15} color={lightBlue} style={{ marginRight: 5 }} />
                  <Text style={{ color: lightBlue, fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>Change Board</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Boards */}
            <View style={{ paddingHorizontal: 0, paddingVertical: 0, borderRadius: 12, marginBottom: 15, marginHorizontal: 1 }}>
              <FlatList
                data={boards}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{ justifyContent: 'space-between', width: '100%' }}
                contentContainerStyle={{ gap: 12, width: '100%' }}
                renderItem={({ item }) => (
                  <ImageBackground
                    source={require('../assets/sub.png')}
                    style={{ width: 103, height: 120, justifyContent: 'flex-end', alignItems: 'center', borderRadius: 10, overflow: 'hidden', elevation: 3 }}
                    imageStyle={{ borderRadius: 12 }}
                    resizeMode='cover'
                  >
                    {/* Fading Bottom Effect */}
                    <View style={{ width: '100%', height: '25%', flexDirection: 'row', gap: 5, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                      <MaterialCommunityIcons name="school-outline" size={18} color="#fff" />
                      <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: '600', color: '#fff', textAlign: 'center' }}>
                        {item.name}
                      </Text>
                    </View>
                  </ImageBackground>
                )}
              />
            </View>
          </>
        )}

        {/* Explore */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 15 }}>
          <Text style={{ color: '#ebedf0', }}>___________________ </Text>
          <Text style={{ color: '#8593a2', fontWeight: '500', fontSize: responsiveFontSize(1.6), textTransform: 'uppercase', letterSpacing: 1.1 }}> Explore courses </Text>
          <Text style={{ color: '#ebedf0', }}>___________________ </Text>
        </View>

        {/* Fallback text */}
        {userDetails.length === 0 && (
          <View style={{ width: '99%', alignSelf: 'center', marginBottom: 20 }}>
            <View style={{ width: 200, aspectRatio: 1 / 1, alignSelf: 'center' }}>
              <Image
                source={require('../assets/fall.png')}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                resizeMode="contain"
              />
            </View>

            <View style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', borderRadius: 12, elevation: 3, padding: 15 }}>
              <Text style={{ color: '#000', fontSize: responsiveFontSize(2.1), fontWeight: '500', marginBottom: 5 }}>Your Space</Text>

              <Text style={{ color: '#000', fontSize: responsiveFontSize(1.6), marginBottom: 20 }}>Login or sign up to buy courses and access study materials</Text>

              <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginBottom: 3, borderColor: darkBlue, borderWidth: 1, borderRadius: 8, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: darkBlue, fontWeight: '600', fontSize: responsiveFontSize(2) }}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Individual Courses and Combo Courses */}
        {userDetails?.length !== 0 && (
          <>
            {/* Individual courses */}
            <View style={{ marginBottom: 20 }}>
              {/* Heading */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 5 }}>
                <AntDesign name="caretright" style={{ color: darkBlue }} size={18} />
                <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '600', color: '#333' }}>Individual Courses</Text>
              </View>

              {loading ? (
                <FlatList
                  data={[1, 1, 1, 1, 1]} // Dummy data for placeholders
                  horizontal
                  renderItem={() => (
                    <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 10, width: responsiveWidth(65), elevation: 1 }}>
                      <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: '80%', height: 18, borderRadius: 8 }} />
                      <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: '40%', height: 18, marginVertical: 10, borderRadius: 8 }} />
                      <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: '60%', height: 20, marginBottom: 5, marginTop: 10, borderRadius: 8, alignSelf: 'center' }} />

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: 40, height: 25, borderRadius: 8 }} />
                        <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: 40, height: 25, borderRadius: 8 }} />
                        <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: 40, height: 25, borderRadius: 8 }} />
                      </View>
                    </View>
                  )}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 1, gap: 8, paddingVertical: 1 }}
                />
              ) : (
                courses?.length > 0 ? (
                  <FlatList
                    data={courses}
                    horizontal
                    keyExtractor={(item) => item.id}
                    renderItem={cardItem}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 8 }}
                  />
                ) : (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
                    <View style={{ width: 150, height: 150, marginBottom: 10 }}>
                      <Image source={require('../assets/fallback_courses.png')} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
                    </View>

                    <Text style={{ fontSize: responsiveFontSize(1.9), color: '#999', textAlign: 'center', fontWeight: '500' }}>No courses available at the moment. Please check back later!</Text>
                  </View>
                )
              )}
            </View>

            {/* Combo courses */}
            <View style={{ marginBottom: 20 }}>
              {/* Heading */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 5 }}>
                <AntDesign name="caretright" style={{ color: darkBlue }} size={18} />
                <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '600', color: '#333' }}>Combo Courses</Text>
              </View>

              {loading ? (
                <FlatList
                  data={[1, 1, 1, 1, 1]} // Dummy data for placeholders
                  horizontal
                  renderItem={() => (
                    <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 10, width: responsiveWidth(65), elevation: 1 }}>
                      <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: '80%', height: 18, borderRadius: 8 }} />
                      <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: '40%', height: 18, marginVertical: 10, borderRadius: 8 }} />
                      <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: '60%', height: 20, marginBottom: 5, marginTop: 10, borderRadius: 8, alignSelf: 'center' }} />

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: 40, height: 25, borderRadius: 8 }} />
                        <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: 40, height: 25, borderRadius: 8 }} />
                        <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: 40, height: 25, borderRadius: 8 }} />
                      </View>
                    </View>
                  )}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 1, gap: 8, paddingVertical: 1 }}
                />
              ) : (
                comboCourses?.length > 0 ? (
                  <FlatList
                    data={comboCourses}
                    horizontal
                    keyExtractor={(item) => item.id}
                    renderItem={comboCardItem}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 8 }}
                  />
                ) : (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
                    <View style={{ width: 150, height: 150, marginBottom: 10 }}>
                      <Image source={require('../assets/fallback_courses.png')} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
                    </View>

                    <Text style={{ fontSize: responsiveFontSize(1.9), color: '#999', textAlign: 'center', fontWeight: '500' }}>No combo courses available at the moment. Please check back later!</Text>
                  </View>
                )
              )}
            </View>
          </>
        )}
      </ScrollView>

      {/* Modal */}
      <Modal
        isVisible={modal}
        onBackdropPress={() => {
          setSelectedBoard(null);
          setSelectedClass(null);
          setModal(false);
        }}
        onSwipeComplete={() => {
          setSelectedBoard(null);
          setSelectedClass(null);
          setModal(false);
        }}
        onRequestClose={() => {
          setSelectedBoard(null);
          setSelectedClass(null);
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

          {/* Slidable sections */}
          <Animated.View
            style={{
              flexDirection: 'row',
              width: width * 2, // The total width (2 sections)
              transform: [{ translateX: slideAnim }], // Apply the sliding animation
            }}
          >
            {/* Slide 1 - Boards */}
            <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 15, borderTopRightRadius: 15, elevation: 1, paddingVertical: 8, width: width, }}>
              {/* Headline */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, marginVertical: 8, marginBottom: 10 }}>
                <Text style={{ textAlign: 'center', color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.2), }}>Choose one of the boards below</Text>
              </View>

              {/* Boards */}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flexWrap: 'wrap', alignSelf: 'center', marginBottom: 20, marginTop: 10 }}>
                {boards?.map(item => (
                  <TouchableOpacity onPress={() => setSelectedBoard(item)} key={item?.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 3, elevation: 1, backgroundColor: selectedBoard?.id === item?.id ? darkerBlue : '#fff', paddingHorizontal: 8, height: 30, borderRadius: 8, borderColor: darkBlue, borderWidth: selectedBoard?.id === item?.id ? 0 : 1, alignSelf: 'flex-start' }}>
                    {selectedBoard?.id === item?.id && <AntDesign name="check" style={{ color: '#fff' }} size={15} />}

                    <Text style={{ color: selectedBoard?.id === item.id ? '#fff' : darkBlue, fontWeight: '600', fontSize: responsiveFontSize(1.8) }}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Buttons */}
              <View style={{ width: '100%', flexDirection: 'row', paddingVertical: 6, justifyContent: 'space-evenly', alignItems: "center" }}>
                {/* Cancel */}
                <TouchableOpacity activeOpacity={0.7} onPress={() => setModal(false)} style={{ width: '47%', backgroundColor: '#fff', borderRadius: 12, gap: 3, borderColor: darkerBlue, borderWidth: 1, height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: darkerBlue, fontSize: responsiveFontSize(2.2), fontWeight: "600" }}>Cancel</Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 19, height: 19, alignItems: 'center', backgroundColor: darkerBlue, borderRadius: 5, borderColor: darkerBlue, borderWidth: 1 }}>
                    <Ionicons name="close" size={13} style={{ color: '#fff' }} />
                  </View>
                </TouchableOpacity>

                {/* Confirm */}
                <TouchableOpacity onPress={handleBoardSubmit} style={{ height: 45, backgroundColor: loading ? '#e1e1e1' : darkerBlue, borderRadius: 12, justifyContent: 'center', flexDirection: 'row', width: '47%', alignSelf: 'center', elevation: loading ? 2 : 4, borderColor: loading ? '#000' : '', borderWidth: loading ? 0.3 : 0, gap: 4, alignItems: 'center' }}>
                  {boardLoading ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                      <ActivityIndicator size="small" color='#fff' />
                      {/* <Text style={{ color: '#5a5a5a', fontSize: responsiveFontSize(2) }}>Submitting data ...</Text> */}
                    </View>
                  ) : (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      <Text style={{ color: '#fff', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>Submit</Text>

                      <View style={{ backgroundColor: '#fff', width: 19, height: 19, borderRadius: 4, alignItems: 'center', justifyContent: 'center', borderColor: 'red', borderEndWidth: 0.6 }}>
                        <Icon3 name="save" size={13} color={darkerBlue} />
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Slide 2 - Classes */}
            <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 15, borderTopRightRadius: 15, elevation: 1, paddingVertical: 8, width: width, }}>
              {/* Headline */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, marginVertical: 8, marginBottom: 10 }}>
                <Text style={{ textAlign: 'center', color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.2), }}>Choose one of the classes below</Text>
              </View>

              {/* Classes */}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flexWrap: 'wrap', alignSelf: 'center', marginBottom: 20, marginTop: 10 }}>
                {classes?.map(item => (
                  <TouchableOpacity onPress={() => setSelectedClass(item)} key={item.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 3, elevation: 1, backgroundColor: selectedClass?.id === item.id ? darkerBlue : '#fff', paddingHorizontal: 8, height: 30, borderRadius: 8, borderColor: darkBlue, borderWidth: selectedClass?.id === item.id ? 0 : 1, alignSelf: 'flex-start' }}>
                    {selectedClass?.id === item.id && <AntDesign name="check" style={{ color: '#fff' }} size={15} />}

                    <Text style={{ color: selectedClass?.id === item.id ? '#fff' : darkBlue, fontWeight: '600', fontSize: responsiveFontSize(1.8) }}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Buttons */}
              <View style={{ width: '100%', flexDirection: 'row', paddingVertical: 6, justifyContent: 'space-evenly', alignItems: "center" }}>
                {/* Cancel */}
                <TouchableOpacity activeOpacity={0.7} onPress={() => setModal(false)} style={{ width: '47%', backgroundColor: '#fff', borderRadius: 12, gap: 3, borderColor: darkerBlue, borderWidth: 1, height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: darkerBlue, fontSize: responsiveFontSize(2.2), fontWeight: "600" }}>Cancel</Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 19, height: 19, alignItems: 'center', backgroundColor: darkerBlue, borderRadius: 5, borderColor: darkerBlue, borderWidth: 1 }}>
                    <Ionicons name="close" size={13} style={{ color: '#fff' }} />
                  </View>
                </TouchableOpacity>

                {/* Confirm */}
                <TouchableOpacity onPress={handleClassSubmit} style={{ height: 45, backgroundColor: loading ? '#e1e1e1' : darkerBlue, borderRadius: 12, justifyContent: 'center', flexDirection: 'row', width: '47%', alignSelf: 'center', elevation: loading ? 2 : 4, borderColor: loading ? '#000' : '', borderWidth: loading ? 0.3 : 0, gap: 4, alignItems: 'center' }}>
                  {loading ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                      <ActivityIndicator size="small" color='#fff' />
                      {/* <Text style={{ color: '#5a5a5a', fontSize: responsiveFontSize(2) }}>Updating data ...</Text> */}
                    </View>
                  ) : (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      <Text style={{ color: '#fff', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>Submit</Text>

                      <View style={{ backgroundColor: '#fff', width: 19, height: 19, borderRadius: 4, alignItems: 'center', justifyContent: 'center', borderColor: 'red', borderEndWidth: 0.6 }}>
                        <Icon3 name="save" size={13} color={darkerBlue} />
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;