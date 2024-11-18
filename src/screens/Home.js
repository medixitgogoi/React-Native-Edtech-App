import { View, Text, TextInput, TouchableOpacity, FlatList, Image, ScrollView, StatusBar, Dimensions, ImageBackground } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, darkGreen, lightGreen } from '../utils/colors';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { useEffect, useRef, useState } from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { trending } from '../utils/trending';

const { width } = Dimensions.get('window');

const HomeScreen = () => {

  const navigation = useNavigation();

  const scrollViewRef = useRef(null);

  const [activeBannerIndex, setActiveBannerIndex] = useState(0); // State for active banner index

  // Sample data
  const courses = [
    { id: '1', title: 'Biology for class XIII', author: 'By Smith J.', files: '17 Files', time: '40 Mins', color: '#FFDAB9' },
    { id: '2', title: 'Math for class XIII', author: 'By Smith J.', files: '17 Files', time: '40 Mins', color: '#ADD8E6' },
  ];

  // Banner Images
  const bannerImages = [
    require('../assets/banner2.jpg'),
    require('../assets/banner5.png'),
    require('../assets/banner4.png'),
  ];

  /// Automatic scrolling
  useEffect(() => {
    let bannerIndex = 0;

    const interval = setInterval(() => {
      bannerIndex = (bannerIndex + 1) % bannerImages.length;
      scrollViewRef.current.scrollTo({ x: bannerIndex * width, animated: true });
    }, 3000);

    return () => clearInterval(interval);
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingHorizontal: 10, paddingTop: 10 }}>
      <StatusBar
        animated={true}
        backgroundColor={background}
        barStyle="dark-content"
      />

      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <View style={{ width: responsiveWidth(8), aspectRatio: 1 / 1, borderColor: '#fff', borderWidth: 1, borderRadius: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 2 }}>
            <Image source={require('../assets/person.png')} style={{ width: '100%', height: '100%' }} />
          </View>

          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: '700', color: '#000' }}>Hello, Marshmallow</Text>
            <Text style={{ fontSize: responsiveFontSize(1.7), fontWeight: '500', color: '#a2a2a2' }}>What are you learning today?</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={{ backgroundColor: '#d8fce5', borderRadius: 8, width: responsiveWidth(9), aspectRatio: 1 / 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: darkGreen, elevation: 1 }}>
          <Ionicons name="notifications" size={18} color={darkGreen} />
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
          style={{ width: '100%', borderRadius: 10, overflow: 'hidden' }}
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

      {/* Categories */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <TouchableOpacity style={{ backgroundColor: '#ADD8E6', borderRadius: 10, padding: 20, flex: 1, marginRight: 10 }}>
          <Text style={{ color: '#333', fontWeight: 'bold', fontSize: 16 }}>Basic Math Easy</Text>
          <Text style={{ color: '#333', fontSize: 14 }}>28 Lessons</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#D8BFD8', borderRadius: 10, padding: 20, flex: 1 }}>
          <Text style={{ color: '#333', fontWeight: 'bold', fontSize: 16 }}>Language Studies</Text>
          <Text style={{ color: '#333', fontSize: 14 }}>28 Lessons</Text>
        </TouchableOpacity>
      </View>

      {/* All Courses */}
      <View style={{ marginBottom: 20 }}>
        {/* Heading */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '600', color: '#333' }}>All Courses</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Courses')}>
            <Text style={{ color: darkGreen, fontWeight: '600' }}>See all</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={courses}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ backgroundColor: item.color, borderRadius: 10, padding: 15, marginRight: 10, width: 200 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 5 }}>{item.title}</Text>
              <Text style={{ fontSize: 14, color: '#555', marginBottom: 10 }}>{item.author}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 12, color: '#777' }}>{item.files}</Text>
                <Text style={{ fontSize: 12, color: '#777' }}>{item.time}</Text>
              </View>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Trending Courses */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '600', color: '#333' }}>Trending Courses</Text>
      </View>

      <FlatList
        data={trending}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("VideoPlayer")} style={{ width: responsiveWidth(41), aspectRatio: 1 / 1.22, borderRadius: 10, overflow: 'hidden', backgroundColor: '#f9f9f9', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, elevation: 2 }}>
            {/* Image */}
            <View style={{ backgroundColor: '#fff', height: '53%', borderBottomRightRadius: 10, overflow: 'hidden', borderBottomLeftRadius: 10 }}>
              <Image
                source={require('../assets/trending.jpeg')}
                style={{
                  width: '100%',
                  height: '100%',
                  opacity: 0.9
                }}
                resizeMode="cover"
              />

              <View style={{ position: 'absolute', bottom: '38%', left: '39%' }}>
                <AntDesign name="play" size={30} color={'#4c669f'} />
              </View>
            </View>

            {/* Details */}
            <View style={{ paddingVertical: 12, paddingHorizontal: 6 }}>
              {/* Title */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3, gap: 4, paddingHorizontal: 4 }}>
                <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: 'bold', color: '#333' }}>{item.name}</Text>
              </View>

              {/* Author */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 4, paddingHorizontal: 4 }}>
                <Text style={{ fontSize: responsiveFontSize(1.7), color: '#888', fontWeight: '500' }}>By {item.teacher}</Text>
              </View>

              {/* Details */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
                {/* Files */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                  <View style={{ width: responsiveWidth(5), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="file-multiple" size={responsiveFontSize(1.8)} color={'#4b66ca'} style={{}} />
                  </View>
                  <Text style={{ fontSize: responsiveFontSize(1.5), color: '#000', fontWeight: '500' }}>{item.lessons} lessons</Text>
                </View>

                {/* Time */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                  <View style={{ width: responsiveWidth(5), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <FontAwesome name="clock-o" size={responsiveFontSize(2)} color={'#4b66ca'} style={{}} />
                  </View>
                  <Text style={{ fontSize: responsiveFontSize(1.5), color: '#000', fontWeight: '500' }}>{item.duration} Mins</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 1 }}
      />

    </SafeAreaView>
  );
};

export default HomeScreen;