import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import style from './style';

export const Button = ({backgroundColor, title, onPress, disabled}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        ...style.container,
        backgroundColor: disabled ? 'gray' : backgroundColor,
      }}>
      <Text style={style.text}>{title}</Text>
    </TouchableOpacity>
  );
};
