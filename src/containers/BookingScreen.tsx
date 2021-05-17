import React, {useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentToDp as hp,
  widthPercentToDp as wp,
} from '../utils/sizeUtils';
import COLORS from '../utils/colorUtils';
import OrangeButton from '../components/OrangeButton';
import {useNavigation} from '@react-navigation/native';
import IMAGES from '../images';

const BookingScreen = () => {
  const bookingData = [
    {
      name: 'DUBAI',
      image: IMAGES.dubai,
      info: 'The sea breeze on your face, sun-kissed warmth on your skin and a heart set on new adventures…can you feel it? Dubai has thrills for every traveller, endless coastline.',
    },
    {
      name: 'INDIA',
      image: IMAGES.india,
      info: 'Sustainable policy determination, openness for foreign direct investments, financial assistance to the private tourism entrepreneurs, etc. are also remarkable landmarks.',
    },
    {
      name: 'BALI',
      image: IMAGES.bali,
      info: 'It is world-renowned for its scenic rice terraces, fragrant cuisine, stunning beaches and a galore of culture and tradition. With its elaborate temples, endless coastline.',
    },
  ];
  const roomType = [
    {name: 'Normal', cost: '$50', image: IMAGES.normal},
    {name: 'Delux', cost: '$100', image: IMAGES.delux},
    {name: 'Monarch', cost: '$150', image: IMAGES.monarch},
    {name: 'Suite', cost: '$200', image: IMAGES.suite},
  ];
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [leftposition, setLeftposition] = useState(new Animated.Value(wp(100)));
  const [bottomPartFlex, setbottomPartFlex] = useState(new Animated.Value(1));
  const [infoClicked, setinfoClicked] = useState(false);
  const [selectedRoom, setselectedRoom] = useState(-1);
  const [isRoomBooked, setisRoomBooked] = useState(false);
  const [bookedLeftPosition, setbookedLeftPosition] = useState(
    new Animated.Value(wp(100)),
  );

  useEffect(() => {
    doAnimation(leftposition, 0, 250);
  }, [currentIndex]);

  useEffect(() => {
    if (infoClicked) {
      doAnimation(bottomPartFlex, 5, 500);
    } else {
      doAnimation(bottomPartFlex, 1, 500);
    }
  }, [infoClicked]);

  const doAnimation = (arg: any, value: number, timer: number) => {
    Animated.timing(arg, {
      toValue: value,
      duration: timer,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.topPartStyle, {left: leftposition}]}>
        <ImageBackground
          source={bookingData[currentIndex].image}
          style={{flex: 2}}>
          <TouchableOpacity
            style={styles.floatingButtonStyle}
            onPress={() => {
              if (infoClicked) {
                setinfoClicked(false);
              } else {
                if (currentIndex <= 1) {
                  setCurrentIndex(currentIndex + 1);
                } else {
                  setCurrentIndex(0);
                }
                doAnimation(leftposition, wp(100), 0);
              }
            }}>
            <Image
              source={IMAGES.right_arrow}
              style={[
                styles.rightArrowStyle,
                {
                  transform: [{rotate: infoClicked ? '180deg' : '0deg'}],
                },
              ]}
            />
          </TouchableOpacity>
          <Text style={styles.countryNameStyle}>
            {bookingData[currentIndex].name}
          </Text>
        </ImageBackground>
      </Animated.View>
      <Animated.View style={{flex: bottomPartFlex}}>
        <LinearGradient
          colors={[COLORS.GRADIENT_1, COLORS.GRADIENT_2, COLORS.GRADIENT_3]}
          style={{flex: 1}}>
          {infoClicked ? (
            isRoomBooked ? (
              <Animated.View
                style={[
                  styles.bookedSectionStyle,
                  {
                    left: bookedLeftPosition,
                  },
                ]}>
                <View style={styles.tickIconContainer}>
                  <Image source={IMAGES.tick} style={styles.tickIconStyle} />
                </View>
                <Text style={styles.confirmationTextStyle}>
                  Booking Done!!!
                </Text>
                <OrangeButton
                  text="Continue"
                  style={{alignSelf: 'center', marginVertical: hp(2)}}
                  onPress={() => {
                    setinfoClicked(false);
                    setisRoomBooked(false);
                    setselectedRoom(-1);
                    doAnimation(bookedLeftPosition, wp(100), 0);
                    navigation.navigate('welcome');
                  }}
                />
              </Animated.View>
            ) : (
              <View style={styles.detailsSectionStyle}>
                <View style={styles.infoHeaderStyle}>
                  <Text style={styles.infoTextStyle}>Rates & Room Type</Text>
                </View>
                <View style={styles.roomContainer}>
                  {roomType.map((room, index) => (
                    <TouchableOpacity
                      key={index.toString()}
                      style={{margin: wp(5), alignItems: 'center'}}
                      onPress={() => setselectedRoom(index)}>
                      <Text style={styles.detailsText}>{room.name}</Text>
                      <Image
                        source={room.image}
                        style={styles.roomImageStyle}
                      />
                      {selectedRoom === index && (
                        <View style={styles.roomSelectionStyle}>
                          <Image
                            source={IMAGES.tick}
                            style={styles.selectionTickStyle}
                          />
                        </View>
                      )}

                      <Text style={styles.detailsText}>{room.cost}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <OrangeButton
                  text="Book"
                  style={{alignSelf: 'center', marginVertical: hp(2)}}
                  onPress={() => {
                    if (selectedRoom >= 0) {
                      setisRoomBooked(true);
                      doAnimation(bookedLeftPosition, 0, 250);
                    }
                  }}
                />
              </View>
            )
          ) : (
            <View style={{flex: 1}}>
              <View style={{marginTop: hp(5), marginHorizontal: wp(4)}}>
                <Text style={styles.headerText}>Classic Culture</Text>
                <Text style={styles.descriptionText}>
                  {bookingData[currentIndex].info}
                </Text>
              </View>
              <OrangeButton
                text="INFO AND RATES"
                style={{alignSelf: 'center', marginVertical: hp(2)}}
                onPress={() => setinfoClicked(true)}
              />
            </View>
          )}
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.GRADIENT_1,
  },
  detailsText: {color: COLORS.WHITE, fontFamily: 'Montserrat'},
  topPartStyle: {flex: 2, zIndex: 2},
  floatingButtonStyle: {
    backgroundColor: COLORS.ORANGE,
    width: wp(16),
    height: wp(16),
    position: 'absolute',
    right: wp(10),
    bottom: hp(10),
    borderRadius: wp(8),
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    shadowColor: COLORS.ORANGE,
  },
  rightArrowStyle: {
    width: wp(10),
    height: wp(10),
    tintColor: COLORS.WHITE,
  },
  countryNameStyle: {
    fontFamily: 'Arialic Hollow',
    fontSize: wp(20),
    position: 'absolute',
    bottom: -hp(5),
    color: COLORS.WHITE,
    zIndex: 1,
  },
  bookedSectionStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: hp(6),
  },
  tickIconContainer: {
    padding: wp(8),
    borderWidth: wp(2),
    borderColor: COLORS.ORANGE,
    borderRadius: wp(8),
  },
  tickIconStyle: {
    width: wp(24),
    height: wp(24),
    tintColor: COLORS.ORANGE,
  },
  confirmationTextStyle: {
    color: COLORS.WHITE,
    fontFamily: 'Montserrat',
    fontSize: wp(10),
  },
  detailsSectionStyle: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: hp(6),
  },
  infoHeaderStyle: {
    backgroundColor: COLORS.ORANGE,
    width: wp(60),
    alignItems: 'center',
    padding: wp(1),
    borderRadius: wp(2),
  },
  infoTextStyle: {
    color: COLORS.WHITE,
    fontFamily: 'Montserrat-Bold',
  },
  roomContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: wp(5),
    justifyContent: 'center',
  },
  roomImageStyle: {
    width: wp(26),
    height: wp(26),
    borderRadius: wp(4),
  },
  roomSelectionStyle: {
    width: wp(26),
    height: wp(26),
    borderRadius: wp(4),
    position: 'absolute',
    backgroundColor: COLORS.GREY_OPACITY,
    marginTop: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectionTickStyle: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(4),
    tintColor: COLORS.ORANGE,
  },
  descriptionText: {
    fontFamily: 'Montserrat',
    color: COLORS.WHITE,
    letterSpacing: wp(0.1),
    marginVertical: hp(2),
  },
  headerText: {
    fontFamily: 'Montserrat-Bold',
    color: COLORS.WHITE,
    letterSpacing: wp(0.2),
  },
});
