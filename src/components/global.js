import {StyleSheet} from 'react-native';
import {Roboto_medium} from 'native-base';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  button1: {
    flex: 1,
    padding: 10,
    backgroundColor: '#76B39D',
    borderColor: '#155E63',
    alignItems: 'center',
  },
  border: {
    flex: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: '#155E63',
  },
  validation: {
    flex: 1,
    color: '#FF0000',
    fontFamily: Roboto_medium,
    fontSize: 12,
  },

  text: {
    flex: 1,
    alignItems: 'flex-start',
    fontSize: 14,
    fontFamily: Roboto_medium,
    borderColor: '#155E63',
  },

  Button: {
    marginBottom: 15,
    marginLeft: 70,
    marginRight: 70,
    textAlign: 'center',
    backgroundColor: '#155E63',
  },

  text2: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: Roboto_medium,
    justifyContent: 'center',
  },

  Picker: {
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
  },

  color: {
    backgroundColor: '#155E63',
  },

  PickerColor: {
    color: '#155E63',
  },
  save: {
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#155E63',
    padding: 8,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  save1: {
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#CCC',
    padding: 8,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
});
