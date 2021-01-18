import React, {Component} from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import {globalStyles} from './global';

export default class App extends Component {
  render() {
    const {
      label,
      list,
      onSelectedItemsChange,
      selectedItems,
      error,
    } = this.props;
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, padding: 20}}>
          <MultiSelect
            hideTags
            items={list}
            uniqueKey="id"
            ref={(component) => {
              this.multiSelect = component;
            }}
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText={label}
            searchInputPlaceholderText="Search Items..."
            onChangeInput={(text) => console.log(text)}
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{color: '#CCC'}}
            submitButtonColor="#155E63"
            submitButtonText="Select "
          />
          {error && <Text style={globalStyles.validation}>{error}</Text>}
        </View>
      </SafeAreaView>
    );
  }
}
