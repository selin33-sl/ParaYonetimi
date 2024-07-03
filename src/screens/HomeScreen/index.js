import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import style from './style';
import PieChart from 'react-native-pie-chart';
import {MyTabs} from '../../navigation/my-tabs';
import {AddButton} from '../../components/AddButton';
import {AddModal} from '../../components/AddModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setData} from '../../redux/slice/data-slice';
import {scale} from 'react-native-size-matters';

const randomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const [series, setSeries] = useState([]);
  const [sliceColor, setSliceColor] = useState([]);
  const [selectedCase, setSelectedCase] = useState('Gelir');
  const [modalVisible, setModalVisible] = useState(false);

  const nullSeries = [100];
  const nullColor = ['gray'];
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [combine, setCombine] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeData = await AsyncStorage.getItem('income');
        const expenseData = await AsyncStorage.getItem('expense');

        if (incomeData !== null) {
          setIncomes(JSON.parse(incomeData));
        }
        if (expenseData !== null) {
          setExpenses(JSON.parse(expenseData));
        }
        if (incomeData !== null || expenseData !== null) {
          setCombine([
            ...(JSON.parse(incomeData) || []),
            ...(JSON.parse(expenseData) || []),
          ]);
        }

        dispatch(
          setData({
            incomeData: JSON.parse(incomeData || '[]'),
            expenseData: JSON.parse(expenseData || '[]'),
            combine: [
              ...JSON.parse(incomeData || '[]'),
              ...JSON.parse(expenseData || '[]'),
            ],
            colors: sliceColor,
          }),
        );
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    };

    fetchData();
  }, [modalVisible, selectedCase]);

  const updateChartData = type => {
    let data = [];
    let colors = [];
    switch (type) {
      case 'Gelir':
        setSelectedCase('Gelir');
        data = incomes.map(item => parseFloat(item.amount));
        colors = incomes.map(() => randomColor());
        break;
      case 'Gider':
        setSelectedCase('Gider');
        data = expenses.map(item => parseFloat(item.amount));
        colors = expenses.map(() => randomColor());
        break;
      default:
        setSelectedCase('Tümü');
        data = combine.map(item => parseFloat(item.amount));
        colors = combine.map(() => randomColor());
    }
    setSeries(data.length > 0 ? data : nullSeries);
    setSliceColor(colors.length > 0 ? colors : nullColor);
  };

  useEffect(() => {
    dispatch(setData({colors: sliceColor}));
  }, [sliceColor, selectedCase]);

  useEffect(() => {
    updateChartData('Tümü');
  }, []);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const calculateTotal = () => {
    let total = 0;
    switch (selectedCase) {
      case 'Gelir':
        total = incomes.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
        break;
      case 'Gider':
        total = expenses.reduce(
          (acc, curr) => acc + parseFloat(-curr.amount),
          0,
        );
        break;
      default:
        total = combine.reduce((acc, curr) => {
          if (curr.category === 'Gelir') {
            return acc + parseFloat(curr.amount);
          } else if (curr.category === 'Gider') {
            return acc - parseFloat(curr.amount);
          }
          return acc;
        }, 0);
    }

    return total.toFixed(2);
  };

  const getTotalText = () => {
    switch (selectedCase) {
      case 'Gelir':
        return `${calculateTotal()}₺`;
      case 'Gider':
        return ` ${calculateTotal()}₺`;
      default:
        return `${calculateTotal()}₺`;
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.header}>Para Yönetimi</Text>
      <View style={style.pieC}>
        <PieChart
          showText
          widthAndHeight={170}
          series={series.length > 0 ? series : nullSeries}
          sliceColor={sliceColor.length > 0 ? sliceColor : nullColor}
          coverRadius={0.5}
        />
      </View>
      <View style={style.totalT}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            color: calculateTotal() < 0 ? 'red' : 'green',
            fontSize: scale(20),
          }}>
          {getTotalText()}
        </Text>
      </View>
      <View style={style.tabsContainer}>
        <MyTabs updateChartData={updateChartData} />
      </View>

      <AddButton onPress={showModal} />
      <AddModal modalVisible={modalVisible} hideModal={hideModal} />
    </View>
  );
};
