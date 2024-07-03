import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: scale(300),
    padding: scale(10),
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: 'black',
    marginBottom: scale(10),
  },
  modalAmount: {
    fontSize: scale(14),
    marginBottom: scale(2),
    color: 'black',
  },
  modalCategory: {
    fontSize: scale(14),
    marginBottom: scale(8),
    color: 'black',
  },

  buttonC: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
