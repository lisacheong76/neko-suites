import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Animated,
  ImageBackground,
  StatusBar,
} from "react-native";
import { Header } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import hotels from "../../consts/roomType";
import services from "../../consts/otherServices";
import { auth } from "../../../firebase";

const { width } = Dimensions.get("screen");
const cardWidth = width / 1.8;

const Homepage = () => {
  const navigation = useNavigation();
  const photo = auth.currentUser.photoURL;
  const [numCols, setColumnNo] = useState(2);

  // const handleSignOut = () => {
  //   auth
  //     .signOut()
  //     .then(() => {
  //       navigation.replace("Login");
  //     })
  //     .catch((error) => alert(error.message));
  // };

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
        onPress={() => navigation.navigate("RoomDetails", hotel)}
      >
        <Animated.View style={{ ...style.card, transform: [{ scale }] }}>
          <Animated.View style={{ ...style.cardOverLay, opacity }} />
          <View style={style.priceTag}>
            <Text
              style={{ color: COLORS.white, fontSize: 20, fontWeight: "bold" }}
            >
              RM{hotel.price}
            </Text>
          </View>
          <Image source={hotel.image} style={style.cardImage} />
          <View style={style.cardDetails}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
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
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
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

  const ServiceCard = ({ service }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate("ServiceLists", service)}
      >
        <Animated.View style={style.ServiceCard}>
          <Image style={style.ServiceCardImage} source={service.image} />
          <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 13, fontWeight: "bold" }}>
              {service.name}
            </Text>
            <Text
              style={{ fontSize: 11, fontWeight: "bold", color: COLORS.grey }}
            >
              {service.location}
            </Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
        {/* <Header
          backgroundColor="#e8a468"
          placement="center"
          leftComponent={
            <TouchableOpacity>
              <Icon
                name="menu"
                size={23}
                color={"#fff"}
                style={{ paddingTop: 10 }}
              />
            </TouchableOpacity>
          }
          centerComponent={{
            text: "NEKO SUITES",
            style: {
              color: "#fff",
              fontWeight: "bold",
              fontSize: 18,
              paddingTop: 10,
            },
          }}
          rightComponent={
            <TouchableOpacity onPress={() => navigation.replace("UserProfile")}>
              <ImageBackground
                source={{ uri: photo }}
                style={{ width: 38, height: 38 }}
                imageStyle={{ borderRadius: 25 }}
              />
            </TouchableOpacity>
          }
        /> */}

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <View style={style.searchInputContainer}>
          <Icon name="search" size={30} style={{marginLeft: 20}} />
          <TextInput
            placeholder="Search"
            style={{fontSize: 20, paddingLeft: 10}}
          />
        </View> */}
          <View>
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
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "#665444",
                marginLeft: 12,
                marginBottom: -30,
              }}
            >
              Other Services
            </Text>
          </View>
          <FlatList
            data={services}
            contentContainerStyle={{
              paddingLeft: 20,
              marginTop: 20,
              paddingBottom: 30,
            }}
            key={numCols}
            numColumns={numCols}
            renderItem={({ item, index }) => (
              <ServiceCard service={item} index={index} />
            )}
          />
          {/* <View style={style.container}> */}
          {/* <Text>Email: {auth.currentUser?.email}</Text> */}
          {/* <TouchableOpacity onPress={handleSignOut} style={style.button}>
              <Text style={style.buttonText}>Sign out</Text>
            </TouchableOpacity>
          </View> */}
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Homepage;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#e8a468",
    width: "40%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    marginTop: 15,
    marginLeft: 20,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 30,
  },
  categoryListText: {
    fontSize: 17,
    fontWeight: "bold",
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
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceTag: {
    height: 60,
    width: 80,
    backgroundColor: COLORS.primary,
    position: "absolute",
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  cardDetails: {
    height: 100,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    position: "absolute",
    bottom: 0,
    padding: 20,
    width: "100%",
  },
  cardOverLay: {
    height: 280,
    backgroundColor: COLORS.white,
    position: "absolute",
    zIndex: 100,
    width: cardWidth,
    borderRadius: 15,
  },
  ServiceCard: {
    height: 160,
    width: Dimensions.get('window').width/2.6,
    backgroundColor: COLORS.white,
    elevation: 15,
    marginHorizontal: 13,
    borderRadius: 10,
    marginTop: 15,
  },
  ServiceCardImage: {
    height: 100,
    width: "100%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
