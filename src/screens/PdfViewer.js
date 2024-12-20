import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Pdf from 'react-native-pdf';
import { darkBlue } from '../utils/colors';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import { useState } from 'react';

const PdfViewer = ({ navigation, route }) => {

  const { data } = route.params;
  const { heading } = route.params;
  // console.log('pdf: ', data);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const source = { uri: data, cache: false };

  return (
    <View style={{ flex: 1, backgroundColor: '#faf7f7', paddingHorizontal: 10 }}>
      <StatusBar
        animated={true}
        backgroundColor="#faf7f7"
        barStyle="dark-content"
      />

      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, justifyContent: 'space-between', marginBottom: 50 }}>
        <TouchableOpacity style={{ borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: darkBlue }} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" style={{ color: '#fff' }} size={15} />
        </TouchableOpacity>
        <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.3) }}>{heading}</Text>
        <View style={{ width: 35, height: 35 }} />
      </View>

      <View style={styles.container}>
        {/* <Text style={{ color: '#000', marginBottom: 5 }}>{heading}: {currentPage}/{totalPages} pages</Text> */}
        <Pdf
          source={source}
          trustAllCerts={false}
          enablePaging
          horizontal
          onLoadComplete={(numberOfPages, filePath) => {
            setTotalPages(numberOfPages);
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            setCurrentPage(page);
            console.log(`Current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        />
      </View>
    </View>
  )
}

export default PdfViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    backgroundColor: '#faf7f7',
    flex: 0.9,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center'
  }
});