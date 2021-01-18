import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';

export default function AddIcon({text, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={{
          marginVertical: 140,
          height: 300,
          width: 300,
        }}
        source={require('../assets/images/add.png')}
      />
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 40,
    backgroundColor: '#155E63',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
  },
});
