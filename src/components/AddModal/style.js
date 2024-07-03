import {StyleSheet} from 'react-native';
import {colors} from '../../theme';
import {scale} from 'react-native-size-matters';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: scale(15),
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: scale(18),
    fontWeight: 'bold',
    marginBottom: scale(10),
    color: colors.black,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 5,
    width: '100%',
    height: scale(40),
    paddingHorizontal: scale(10),
    marginBottom: scale(10),
    color: colors.black,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(10),
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: scale(100),
    right: scale(8),
    marginTop: 20,
  },
});
