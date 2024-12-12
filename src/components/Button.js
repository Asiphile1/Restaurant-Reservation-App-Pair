import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ title, onPress, style }) => (
  <TouchableOpacity onPress={onPress} className={`py-2 px-4 bg-blue-500 rounded ${style}`}>
    <Text className="text-white font-bold">{title}</Text>
  </TouchableOpacity>
);

export default Button;
