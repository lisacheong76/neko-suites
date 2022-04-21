import { useNavigation } from '@react-navigation/core';
import React, {Component} from 'react';
import {
  Dimensions,
  SectionList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import hotels from '../../consts/roomType';
import services from '../../consts/otherServices';
import { auth } from '../../../firebase';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;

const Dashboard = ({ route }) => {
  const navigation = useNavigation();
  // console.log('What is this:', route.params.paramKey);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => alert(error.message));
  };

  // const categories = ['All', 'Popular', 'Top Rated', 'Featured', 'Luxury'];
  // const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  // const CategoryList = ({navigation}) => {
  //   return (
  //     <View style={style.categoryListContainer}>
  //       {categories.map((item, index) => (
  //         <TouchableOpacity
  //           key={index}
  //           activeOpacity={0.8}
  //           onPress={() => setSelectedCategoryIndex(index)}>
  //           <View>
  //             <Text
  //               style={{
  //                 ...style.categoryListText,
  //                 color:
  //                   selectedCategoryIndex == index
  //                     ? COLORS.primary
  //                     : COLORS.grey,
  //               }}>
  //               {item}
  //             </Text>
  //             {selectedCategoryIndex == index && (
  //               <View
  //                 style={{
  //                   height: 3,
  //                   width: 30,
  //                   backgroundColor: COLORS.primary,
  //                   marginTop: 2,
  //                 }}
  //               />
  //             )}
  //           </View>
  //         </TouchableOpacity>
  //       ))}
  //     </View>
  //   );
  // };

  const ListData = [
    {
      title: "Recent Booking",
      data:[
        "Allen 12 Apr 10:32a.m", "Jay 14 Apr 10:32a.m" 
      ]
    }
  ];

  const Item = ({title}) => (
    <View style = {style.item}>
      <Text style = {style.title}>{title}</Text>
    </View>
  );

  

  const Card = ({ hotel, index }) => {
    const inputRange = [
      (index - 1) * cardWidth,
      index * cardWidth,
      (index + 1) * cardWidth,
    ];
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 0, 0.7],
    });
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });
    return (
      <TouchableOpacity
        disabled={activeCardIndex != index}
        activeOpacity={1}
        onPress={() => navigation.navigate('RoomDetails', hotel)}
      >
        <Animated.View style={{ ...style.card, transform: [{ scale }] }}>
          <Animated.View style={{ ...style.cardOverLay, opacity }} />
          <View style={style.priceTag}>
            <Text
              style={{ color: COLORS.white, fontSize: 20, fontWeight: 'bold' }}
            >
              RM{hotel.price}
            </Text>
          </View>
          <Image source={hotel.image} style={style.cardImage} />
          <View style={style.cardDetails}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                  {hotel.name}
                </Text>
                <Text style={{ color: COLORS.grey, fontSize: 12 }}>
                  {hotel.location}
                </Text>
              </View>
              <Icon name="bookmark-border" size={26} color={COLORS.primary} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.orange} />
              </View>
              {/* <Text style={{fontSize: 10, color: COLORS.grey}}>365reviews</Text> */}
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const TopHotelCard = ({ hotel }) => {
    return (
      <View style={style.topHotelCard}>
        {/* <View
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 1,
            flexDirection: 'row',
          }}>
          <Icon name="star" size={15} color={COLORS.orange} />
          <Text style={{color: COLORS.white, fontWeight: 'bold', fontSize: 15}}>
            5.0
          </Text>
        </View> */}
        <Image style={style.topHotelCardImage} source={hotel.image} />
        <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{hotel.name}</Text>
          <Text style={{ fontSize: 7, fontWeight: 'bold', color: COLORS.grey }}>
            {hotel.location}
          </Text>
        </View>
      </View>
    );
  };

  //   var userDict = {
  //     id: user.uid,
  //     fullname: user.displayName,
  //   };

  return (
    <SafeAreaView
    style={{ flex: 1, backgroundColor: COLORS.background, paddingTop: 20 }}
    >
      <View style={style.header}>
        <View style={{ paddingBottom: 0 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#665444' }}>
            Welcome {route.params.paramKey}
          </Text>
          {/* <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>in </Text>
            <Text
              style={{fontSize: 30, fontWeight: 'bold', color: COLORS.primary}}>
              Paris
            </Text>
          </View> */}
        </View>
        <Icon name="person-outline" size={30} color={COLORS.grey} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* <View style={style.searchInputContainer}>
          <Icon name="search" size={30} style={{marginLeft: 20}} />
          <TextInput
            placeholder="Search"
            style={{fontSize: 20, paddingLeft: 10}}
          />
        </View> */}
        {/* <View>
          <Animated.FlatList
            onMomentumScrollEnd={(e) => {
              setActiveCardIndex(
                Math.round(e.nativeEvent.contentOffset.x / cardWidth)
              );
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            horizontal
            data={hotels}
            contentContainerStyle={{
              paddingVertical: 30,
              paddingLeft: 20,
              paddingRight: cardWidth / 2 - 40,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <Card hotel={item} index={index} />
            )}
            snapToInterval={cardWidth}
          />
        </View> */}
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}
        >
          <Text style={{ fontWeight: 'bold', color: COLORS.grey }}>
            Other Services
          </Text> */}
          {/* <Text style={{color: COLORS.grey}}>Show all</Text> */}
       
        {/* <FlatList
          data={services}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 20,
            marginTop: 20,
            paddingBottom: 30,
          }}
          renderItem={({ item }) => <TopHotelCard hotel={item} />}
        /> */}
      </ScrollView>
      
      <SectionList 
          style = {style.container2}
          sections={ListData}
          keyExtractor = {(item, index) => item + index}
          renderItem = {({item}) => <Item title = {item}/>}
          renderSectionHeader = {({section: {title}}) => (
          <Text style = {style.header2}>{title}</Text>
      )}/>

      <View style={style.container1}>
      {/* <Text>Email: {auth.currentUser?.email}</Text> */}
      <TouchableOpacity onPress={handleSignOut} style={style.button}>
        <Text style={style.buttonText}>Sign out</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const style = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16
  },
  button: {
    backgroundColor: '#e8a468',
    width: '40%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    fontSize: 32
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    marginTop: 15,
    marginLeft: 20,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
  },
  categoryListText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  card: {
    height: 280,
    width: cardWidth,
    elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  cardImage: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceTag: {
    height: 60,
    width: 80,
    backgroundColor: COLORS.primary,
    position: 'absolute',
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDetails: {
    height: 100,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%',
  },
  cardOverLay: {
    height: 280,
    backgroundColor: COLORS.white,
    position: 'absolute',
    zIndex: 100,
    width: cardWidth,
    borderRadius: 15,
  },
  topHotelCard: {
    height: 120,
    width: 120,
    backgroundColor: COLORS.white,
    elevation: 15,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  topHotelCardImage: {
    height: 80,
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  header2: {
    fontSize: 26
  },
  item: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 8
  },
  title: {
    fontSize: 16
  }
});
