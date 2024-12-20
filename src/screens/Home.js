import { View, Text, TouchableOpacity, FlatList, Image, ScrollView, StatusBar, Dimensions, BackHandler, Alert } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, darkBlue } from '../utils/colors';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect, useNavigation, useIsFocused } from '@react-navigation/native';
import { trending } from '../utils/trending';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { fetchAppLoad } from '../utils/fetchAppLoad';

const { width: width } = Dimensions.get('window');

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const HomeScreen = () => {

  const userDetails = useSelector(state => state.user);
  // console.log('userDetails', userDetails);

  const navigation = useNavigation();

  const isFocused = useIsFocused(); // Hook to check if the current screen is focused

  const scrollViewRef = useRef(null);

  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  const [appLoad, setAppLoad] = useState(null);

  const [courses, setCourses] = useState(null);
  const [comboCourses, setComboCourses] = useState(null);

  const [loading, setLoading] = useState(true);

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
          onPress={() => navigation.navigate('Chapters', { data: item.name, id: item.id, price: item.price })}
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

  return (
    <View style={{ flex: 1, backgroundColor: background, paddingHorizontal: 10, paddingTop: 10 }}>
      <StatusBar
        animated={true}
        backgroundColor={background}
        barStyle="dark-content"
      />

      <ScrollView style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <View style={{ width: responsiveWidth(8), height: responsiveHeight(4), borderColor: darkBlue, borderWidth: 1, padding: 2, borderRadius: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {appLoad ? (
                <Image source={require('../assets/user2.png')} style={{ width: '100%', height: '100%', borderRadius: 40 }} />
              ) : (
                <Image source={require('../assets/avatar.png')} style={{ width: '100%', height: '100%', borderRadius: 40 }} />
              )}
            </View>

            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: '700', color: '#000' }}>Hello, {appLoad?.user?.name || 'User'}</Text>
              <Text style={{ fontSize: responsiveFontSize(1.7), fontWeight: '500', color: '#a2a2a2' }}>What are you learning today?</Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={{ backgroundColor: '#d9efff', borderRadius: 8, width: responsiveWidth(9), aspectRatio: 1 / 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 1 }}>
            <Ionicons name="notifications" size={18} color={darkBlue} />
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

        {/* Explore */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 15 }}>
          <Text style={{ color: '#ebedf0', }}>___________________ </Text>
          <Text style={{ color: '#8593a2', fontWeight: '500', fontSize: responsiveFontSize(1.6), textTransform: 'uppercase', letterSpacing: 1.1 }}> Explore courses </Text>
          <Text style={{ color: '#ebedf0', }}>___________________ </Text>
        </View>

        {/* Fallback text */}
        {userDetails.length === 0 && (
          <View style={{ width: '99%', alignSelf: 'center' }}>
            <View style={{ width: 260, aspectRatio: 1 / 1, alignSelf: 'center' }}>
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
                <FlatList
                  data={courses}
                  horizontal
                  keyExtractor={(item) => item.id}
                  renderItem={cardItem}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 8 }}
                />
              )}
            </View>

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
                <FlatList
                  data={comboCourses}
                  horizontal
                  keyExtractor={(item) => item.id}
                  renderItem={comboCardItem}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 8 }}
                />
              )}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;