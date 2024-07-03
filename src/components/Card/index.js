import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import style from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Card = ({title, amount, onPress, category, backgroundColor}) => (
  <TouchableOpacity onPress={onPress} style={style.container}>
    <View style={{...style.color, backgroundColor: backgroundColor}}></View>
    <View style={style.iconTitle}>
      <Icon
        name={category == 'Gelir' ? 'plus-circle' : 'minus-circle-outline'}
        size={24}
        color={category == 'Gelir' ? 'green' : 'red'}
      />
      <Text style={style.titleT} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
    </View>

    <Text
      numberOfLines={1}
      ellipsizeMode="tail"
      style={{...style.amountT, color: category == 'Gelir' ? 'green' : 'red'}}>
      {category === 'Gelir' ? '+' : '-'}
      {amount}
    </Text>
  </TouchableOpacity>
);
