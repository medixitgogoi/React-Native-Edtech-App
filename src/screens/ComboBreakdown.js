import { View, Text, StatusBar, TouchableOpacity, FlatList, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { darkBlue } from '../utils/colors'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';

const ComboBreakdown = ({ navigation, route }) => {

  const { data } = route.params;
  console.log('subjects data: ', data);

  const [subjects, setSubjects] = useState(null);

  const [loading, setLoading] = useState(true);

  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setSubjects(data?.subjects);
  }, [subjects]);

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
          width: '100%',
        }}
      >
        <TouchableOpacity
          style={{ overflow: 'hidden' }}
          onPress={() => navigation.navigate('Chapters', { data: item.name, id: item.id, isCombo: true })}
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
              <Text style={{ fontSize: responsiveFontSize(1.5), color: '#000', fontWeight: '500' }}>{item.total_chapters} chapters</Text>
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

  useEffect(() => {
    // Infinite loop for arrow movement
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: 10, // Move arrows 10px to the right
          duration: 500, // Half a second
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0, // Move arrows back to the original position
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [translateX]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 10 }}>
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
        <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.3) }}>Combo Subjects</Text>
        <View style={{ width: 35, height: 35 }} />
      </View>

      {/* Individual Courses */}
      <View style={{ marginBottom: 20 }}>
        <FlatList
          data={subjects}
          keyExtractor={(item) => item.id}
          renderItem={cardItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        />
      </View>

      {/* Buy Button */}
      <LinearGradient
        colors={['#000', darkBlue]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ borderRadius: 14, elevation: 2, marginTop: 10, width: '100%', height: 53, position: 'absolute', bottom: 5, alignSelf: 'center', alignItems: 'center', flexDirection: 'row' }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('Checkout', { item: data, type: 2 })}
          style={{ gap: 8, height: '100%', borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: 8 }}
        >
          <View style={{ height: '100%', backgroundColor: '#fff', paddingHorizontal: 10, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: darkBlue, fontWeight: '800', fontSize: responsiveFontSize(2.3) }}>₹ {data.price}.00</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'center', flex: 1 }}>
            <MaterialCommunityIcons name="wallet-plus" style={{ color: '#fff' }} size={22} />
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600', textAlign: 'center', }}>Buy this course</Text>
          </View>

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
        </TouchableOpacity>
      </LinearGradient>
    </View>
  )
}

export default ComboBreakdown;