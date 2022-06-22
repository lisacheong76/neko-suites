import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
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
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import hotels from "../../consts/roomType";
import services from "../../consts/otherServices";
import { auth, firestore } from "../../../firebase";
// import { Icon } from "react-native-elements";

const { width } = Dimensions.get("screen");
const cardWidth = width / 1.8;

const Homepage = () => {
  const navigation = useNavigation();
  const photo = auth.currentUser.photoURL;
  const [numCols, setColumnNo] = useState(2);
  const [rooms, setRooms] = useState([]);

  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const roomRef = firestore.collection("rooms").orderBy("roomName");

  useEffect(async () => {
    roomRef.onSnapshot((querySnapshot) => {
      const roomArray = [];
      querySnapshot.forEach((doc) => {
        const { roomName, roomDetail, roomPax, roomPrice, roomImage } =
          doc.data();
        roomArray.push({
          id: doc.id,
          roomName,
          roomPax,
          roomDetail,
          roomPrice,
          roomImage,
        });
      });
      setRooms(roomArray);
    });
  }, []);

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

    rooms.sort((a, b) => {
      return a.roomPrice - b.roomPrice;
    });

    return (
      <TouchableOpacity
        disabled={activeCardIndex != index}
        activeOpacity={1}
        onPress={() => navigation.navigate("RoomDetails", hotel.id)}
      >
        <Animated.View style={{ ...style.card, transform: [{ scale }] }}>
          <Animated.View style={{ ...style.cardOverLay, opacity }} />
          <View style={style.priceTag}>
            <Text
              style={{ color: COLORS.white, fontSize: 20, fontWeight: "bold" }}
            >
              RM{hotel.roomPrice}
            </Text>
          </View>
          <Image source={{ uri: hotel.roomImage }} style={style.cardImage} />
          <View style={style.cardDetails}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    textAlign: "center",
                  }}
                >
                  {hotel.roomName}
                </Text>
                <Text
                  style={{
                    color: COLORS.grey,
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  {hotel.roomPax}
                </Text>
              </View>
            </View>
            {/* <View
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
              </View> */}
            {/* <Text style={{fontSize: 10, color: COLORS.grey}}>365reviews</Text> */}
            {/* </View> */}
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
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {service.name}
            </Text>
            <Text
              style={{ fontSize: 12, fontWeight: "bold", color: COLORS.grey }}
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
        <ScrollView showsVerticalScrollIndicator={false}>
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
              data={rooms}
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
    height: 90,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    position: "absolute",
    bottom: 0,
    padding: 20,
    width: "100%",
    alignItems: "center",
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
    width: Dimensions.get("window").width / 2.6,
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
