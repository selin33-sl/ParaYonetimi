import React, {useState} from 'react';
import {View, Text, Modal, TextInput, Alert} from 'react-native';
import {RadioButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {scale} from 'react-native-size-matters';
import {Button} from '../Button';
import style from './style';
import {colors} from '../../theme';

export const AddModal = ({modalVisible, hideModal}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSave = async () => {
    if (title.trim() === '' || amount.trim() === '' || category === '') {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      let storageKey = category === 'Gelir' ? 'income' : 'expense';

      // Fetch existing data from AsyncStorage
      let existingData = await AsyncStorage.getItem(storageKey);
      if (!existingData) {
        existingData = '[]'; // Initialize with an empty array if no existing data
      }

      // Parse existing data
      let parsedData;
      try {
        parsedData = JSON.parse(existingData);
        if (!Array.isArray(parsedData)) {
          throw new Error('Parsed data is not an array');
        }
      } catch (error) {
        parsedData = []; // Default to an empty array if parsing fails
      }

      // Add new item to the existing data
      const newData = [...parsedData, {title, amount, category}];

      // Save updated data back to AsyncStorage
      await AsyncStorage.setItem(storageKey, JSON.stringify(newData));

      Alert.alert('Kaydedildi', `${category} kaydedildi.`);
      // Close modal and clear input fields
      hideModal();
      clean();
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
      Alert.alert('Error', 'Failed to save data.');
    }
  };

  const clean = () => {
    setTitle('');
    setAmount('');
    setCategory('');
  };

  const handleAmountChange = text => {
    // Allow only numbers and decimal points
    const numericValue = text.replace(/[^0-9.]/g, '');
    setAmount(numericValue);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={hideModal}>
      <View style={style.modalContainer}>
        <View style={style.modalContent}>
          <Text style={style.modalHeader}>Gelir/Gider Ekle</Text>
          <TextInput
            style={style.input}
            placeholder="Başlık"
            placeholderTextColor={'grey'}
            value={title}
            onChangeText={text => setTitle(text)}
          />
          <TextInput
            style={style.input}
            placeholder="Tutar"
            placeholderTextColor={'grey'}
            value={amount}
            onChangeText={handleAmountChange}
            keyboardType="numeric"
          />
          <View style={style.radioContainer}>
            <View style={style.radio}>
              <Text style={{color: colors.black}}>Gelir</Text>
              <RadioButton
                value="Gelir"
                status={category === 'Gelir' ? 'checked' : 'unchecked'}
                onPress={() => setCategory('Gelir')}
              />
            </View>
            <View style={style.radio}>
              <Text style={{color: colors.black}}>Gider</Text>
              <RadioButton
                value="Gider"
                status={category === 'Gider' ? 'checked' : 'unchecked'}
                onPress={() => setCategory('Gider')}
              />
            </View>
          </View>
          <View style={style.modalButtons}>
            <Button
              onPress={() => {
                hideModal();
                clean();
              }}
              backgroundColor={'gray'}
              title={'Cancel'}
            />
            <Button
              onPress={handleSave}
              backgroundColor={'blue'}
              title={'Save'}
              disabled={
                !(
                  title.trim() !== '' &&
                  amount.trim() !== '' &&
                  category !== ''
                )
              }
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
