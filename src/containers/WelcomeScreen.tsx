import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentToDp as hp,
  widthPercentToDp as wp,
} from '../utils/sizeUtils';
import COLORS from '../utils/colorUtils';
import OrangeButton from '../components/OrangeButton';
import {useNavigation} from '@react-navigation/native';

interface WelcomeScreenProps {}

const WelcomeScreen = (props: WelcomeScreenProps) => {
  const {} = props;
  const navigation = useNavigation();
  const [startClicked, setStartClicked] = useState(false);
  useEffect(() => {
    if (startClicked) {
      Animated.timing(bottomFlex, {
        toValue: 8,
        duration: 250,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start();
    } else {
      Animated.timing(bottomFlex, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start();
    }
  }, [startClicked]);
  const [bottomFlex, setbottomFlex] = useState(new Animated.Value(1));
  return (
    <LinearGradient
      colors={[COLORS.GRADIENT_1, COLORS.GRADIENT_2, COLORS.GRADIENT_3]}
      style={styles.container}>
      <View style={styles.topPart}>
        <Text style={styles.bookTextStyle}>BO</Text>
        <Text style={styles.bookTextStyle}>OK</Text>
      </View>
      <Animated.View style={[styles.bottomPart, {flex: bottomFlex}]}>
        {startClicked ? (
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.WHITE,
              borderTopLeftRadius: wp(20),
            }}>
            <Text style={styles.loginTextStyle}>LOGIN</Text>
            <TextInput
              style={styles.textInputStyle}
              placeholder="EMAIL"
              placeholderTextColor={COLORS.WHITE}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.textInputStyle}
              placeholder="PASSWORD"
              placeholderTextColor={COLORS.WHITE}
              secureTextEntry
            />
            <OrangeButton
              text="Login"
              onPress={() => navigation.navigate('book')}
              style={{
                alignSelf: 'center',
                marginVertical: hp(2),
              }}
            />
          </View>
        ) : (
          <OrangeButton
            text="Start with us"
            onPress={() => setStartClicked(true)}
            style={{
              alignSelf: 'center',
            }}
          />
        )}
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  topPart: {
    flex: 2,
    justifyContent: 'flex-end',
    paddingVertical: hp(10),
    alignItems: 'center',
  },
  bottomPart: {},
  bookTextStyle: {
    color: COLORS.WHITE,
    fontSize: wp(14),
    letterSpacing: wp(4),
    fontFamily: 'Montserrat-Light',
  },
  loginTextStyle: {
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: hp(1),
    color: COLORS.BLACK,
    fontSize: wp(8),
    letterSpacing: wp(0.1),
    fontFamily: 'Montserrat',
  },
  textInputStyle: {
    borderRadius: wp(8),
    width: wp(70),
    height: hp(6),
    backgroundColor: COLORS.GRADIENT_OPACITY,
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: hp(2),
    color: COLORS.WHITE,
    fontSize: wp(4),
    letterSpacing: wp(0.1),
    fontFamily: 'Montserrat',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    shadowColor: COLORS.GRADIENT_3,
  },
});

export default WelcomeScreen;
