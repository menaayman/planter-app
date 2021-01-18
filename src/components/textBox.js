import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

export default function TextBox({text})
{
    return (
        <View style={style.conditionSperator}>
        <View style={style.plantCondition}>
          <Text style={{color: '#F9FAFC',fontSize: 15}}>{text}</Text>
        </View>
        </View>
      );
 
}

const style = StyleSheet.create({
    conditionSperator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  plantCondition: {
    marginHorizontal: 10,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#76B39D',
    marginBottom: 20,
  },
});

