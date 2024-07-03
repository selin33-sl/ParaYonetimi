import {StyleSheet} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';

export default StyleSheet.create({
  container: {
    width: scale(80),
    height: scale(30),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(10),
  },
  text: {
    fontSize: moderateScale(17),
    color: 'white',
    textAlign: 'center',
  },
});
