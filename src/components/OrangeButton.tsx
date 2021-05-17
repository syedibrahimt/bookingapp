import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {
  heightPercentToDp as hp,
  widthPercentToDp as wp,
} from '../utils/sizeUtils';
import COLORS from '../utils/colorUtils';

interface OrangeButtonProps {
  text: string | number;
  onPress?: () => void;
  style?: ViewStyle;
}

const OrangeButton = (props: OrangeButtonProps) => {
  const {text, onPress, style} = props;
  return (
    <TouchableOpacity
      style={[styles.orangeButtonStyle, style]}
      onPress={onPress}>
      <Text style={styles.startTextStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orangeButtonStyle: {
    backgroundColor: COLORS.ORANGE,
    height: hp(5),
    width: wp(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(5),
    shadowColor: COLORS.GREY,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  startTextStyle: {
    color: COLORS.WHITE,
    fontFamily: 'Montserrat-Regular',
    letterSpacing: wp(0.5),
  },
});

export default OrangeButton;
