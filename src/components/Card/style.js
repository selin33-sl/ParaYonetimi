import {StyleSheet} from 'react-native';
import {colors} from '../../theme';
import {scale} from 'react-native-size-matters';

export default StyleSheet.create({
  container: {
    padding: scale(17),
    margin: scale(7),
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconTitle: {
    flexDirection: 'row',
    maxWidth: scale(180),
    width: 'auto',
    alignItems: 'center',
  },
  amountT: {fontWeight: '500', fontSize: scale(17)},
  titleT: {
    color: colors.black,
    marginLeft: scale(10),
  },
  color: {
    width: scale(15),
    height: scale(55),
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,

    position: 'absolute',
  },
});
