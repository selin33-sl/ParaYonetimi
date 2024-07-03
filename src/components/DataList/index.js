import React, {useEffect, useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import style from './style';
import {Card} from '../Card';
import {useDispatch, useSelector} from 'react-redux';
import {DetailModal} from '../DetailModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {scale} from 'react-native-size-matters';
import {setData} from '../../redux/slice/data-slice';

export const DataList = ({route}) => {
  const {
    incomeData: incomeData,
    expenseData: expenseData,
    combine: combine,
    colors: colors,
  } = useSelector(state => state.data);

  const {type} = route.params;
  const dispatch = useDispatch();
  const [listData, setListData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    switch (type) {
      case 'Gelir':
        setListData(incomeData);
        break;
      case 'Gider':
        setListData(expenseData);
        break;
      default:
        setListData(combine);
    }
  }, [type, incomeData, expenseData, combine]);

  const renderItem = ({item, index}) => (
    <Card
      title={item.title}
      amount={item.amount}
      onPress={() => handleCardPress(item)}
      category={item.category}
      backgroundColor={colors && colors.length > index ? colors[index] : 'gray'}
    />
  );

  const handleCardPress = item => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const deleteItem = async item => {
    try {
      const storageKey = item.category === 'Gelir' ? 'income' : 'expense';
      let existingData = await AsyncStorage.getItem(storageKey);

      if (existingData) {
        const parsedData = JSON.parse(existingData);
        const newData = await parsedData.filter(i => i.title !== item.title);

        await AsyncStorage.setItem(storageKey, JSON.stringify(newData));

        const updatedIncomeData = JSON.parse(
          (await AsyncStorage.getItem('income')) || '[]',
        );
        const updatedExpenseData = JSON.parse(
          (await AsyncStorage.getItem('expense')) || '[]',
        );

        dispatch(
          setData({
            incomeData: updatedIncomeData || [],
            expenseData: updatedExpenseData || [],
            combine: [
              ...(updatedIncomeData || []),
              ...(updatedExpenseData || []),
            ],
            colors: colors,
          }),
        );

        setListData(
          type === 'Gelir'
            ? updatedIncomeData
            : type === 'Gider'
            ? updatedExpenseData
            : [...updatedIncomeData, ...updatedExpenseData],
        );

        closeModal();
      }
    } catch (error) {
      console.error('Error deleting data from AsyncStorage:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      {listData?.length === 0 && (
        <View style={style.notFoundC}>
          <Text style={style.notFoundT}>Kayıt Yok</Text>
        </View>
      )}
      <FlatList
        data={listData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: scale(80)}}
      />

      <DetailModal
        selectedItem={selectedItem}
        closeModal={closeModal}
        modalVisible={modalVisible}
        deleteItem={deleteItem}
      />
    </View>
  );
};
