import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import TextInput from '../components/textInput.js';
import {Container, Content, Button, Text} from 'native-base';
import {globalStyles} from '../components/global.js';
import App from '../components/DropdownMultiCheck';
import { Neighbors, DesignSort , MennaResolution} from '../../databases/allSchemas';
import DynamicList from '../components/dynamicList';

export default class gardenDesignComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodNeighborsList: [],
      Design: [],
      list: [],
    };
  }
  onSelectedItemsChangeGood = (selectedItems) => {
    this.setState({goodNeighborsList: selectedItems});
  };

  NeighnorsList = () => {
    Neighbors(0)
      .then((list) => {
        this.setState({list});
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  componentDidMount() {
    this.NeighnorsList();
  }

  press = () => {
    this.setState({Design: this.state.goodNeighborsList});
    DesignSort(this.state.goodNeighborsList)
      .then((list1) => {
        console.log('returnlist', list1 )
        MennaResolution(list1)
          .then((nameList) => {
            console.log('nameList', nameList)
            this.setState({ nameList });
          })
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  render() {
    return (
      <Container style={{backgroundColor: '#fbfbfb'}}>
        <Content>
          <View>
            <App
              label="Choose your plant"
              list={this.state.list}
              selectedItems={this.state.goodNeighborsList}
              onSelectedItemsChange={this.onSelectedItemsChangeGood}
            />

            <Button style={globalStyles.save} onPress={this.press}>
              <Text>Generate</Text>
            </Button>

            <View
              style={{
                borderRadius: 5,
                marginLeft: 15,
                marginRight: 15,
                paddingVertical: 5,
                backgroundColor: '#402905',
                marginTop: 15,
              }}>
              <Text style={{color: '#F9FAFC'}}> Garden design </Text>
            </View>

            <DynamicList items={this.state.nameList} />
          </View>
        </Content>
      </Container>
    );
  }
}
