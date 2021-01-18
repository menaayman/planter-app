import React, {Component} from 'react';
import {View, Picker} from 'native-base';
import {globalStyles} from './global.js';

export default class PickerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
    };
  }
  onValueChange(value) {
    this.props.onChange(this.props.name, value);
    this.setState({
      selected: value,
    });
  }
  render() {
    const {label, label1, label2, label3, error, ...rest} = this.props;
    return (
      <View style={globalStyles.container}>
        <Picker
          mode="dropdown"
          selectedValue={this.state.selected}
          onValueChange={this.onValueChange.bind(this)}>
          <Picker.Item label={label} value={0} />
          <Picker.Item label={label1} value={1} />
          <Picker.Item label={label2} value={2} />
          <Picker.Item label={label3} value={3} />
        </Picker>
      </View>
    );
  }
}
