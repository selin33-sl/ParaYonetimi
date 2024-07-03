import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../theme';
import {moderateScale, scale} from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: colors.white,
  },
  header: {
    fontSize: moderateScale(25),
    color: colors.blue,
    textAlign: 'center',
    marginTop: scale(10),
  },
  pieC: {
    width: windowWidth,
    height: scale(200),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flex: 1,
  },
  totalT: {
    width: '100%',
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
