import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export default StyleSheet.create({
  notFoundC: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundT: {
    color: 'gray',
    fontSize: moderateScale(20),
  },
});
