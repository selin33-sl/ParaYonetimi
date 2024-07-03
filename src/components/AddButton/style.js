import {StyleSheet} from 'react-native';
import {colors} from '../../theme';
import {moderateScale, scale} from 'react-native-size-matters';

export default StyleSheet.create({
  container: {
    width: scale(48),
    height: scale(48),
    backgroundColor: colors.blue,
    borderRadius: 100,
    position: 'absolute',
    bottom: scale(20),
    right: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: moderateScale(30),
    color: 'white',
    textAlign: 'center',
  },
});
