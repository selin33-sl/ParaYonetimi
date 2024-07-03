import {TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import style from './style';

export const AddButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style.container}>
      <Icon name={'plus'} size={27} color={'white'} />
    </TouchableOpacity>
  );
};
