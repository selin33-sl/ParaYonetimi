import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import style from './style';
import {Button} from '../Button';

export const DetailModal = ({
  modalVisible,
  closeModal,
  selectedItem,
  deleteItem,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}>
      <View style={style.modalContainer}>
        <View style={style.modalContent}>
          <Text style={style.modalTitle} numberOfLines={1} ellipsizeMode="tail">
            {selectedItem?.title}
          </Text>
          <Text style={style.modalAmount}>Tutar: {selectedItem?.amount}₺</Text>
          <Text style={style.modalCategory}>Tür: {selectedItem?.category}</Text>
          <View style={style.buttonC}>
            <Button
              onPress={closeModal}
              backgroundColor={'gray'}
              title={'Kapat'}
            />
            <Button
              onPress={() => deleteItem(selectedItem)}
              backgroundColor={'red'}
              title={'Sil'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
