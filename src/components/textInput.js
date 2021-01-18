import React, {Component} from 'react';
import {Input, Item, View, Text} from 'native-base';
import {globalStyles} from './global';

export default class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: '',
    };
  }
  _handleChange = (value) => {
    this.setState({val: value});
    this.props.onChange(this.props.name, value);
  };

  _handleTouch = () => {
    this.props.onTouch(this.props.name);
  };

  render() {
    const {placeholderText, error, ...rest} = this.props;
    return (
      <View style={globalStyles.container}>
        <Item style={globalStyles.text}>
          <Input
            style={globalStyles.text}
            onChangeText={this._handleChange}
            onBlur={this._handleTouch}
            placeholder={placeholderText}
            {...rest}
          />
        </Item>
        {error && <Text style={globalStyles.validation}>{error}</Text>}
      </View>
    );
  }
}
