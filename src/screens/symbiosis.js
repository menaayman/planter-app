import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Thumbnail,
  Text,
  Button,
  View,
} from 'native-base';
import App from '../components/DropdownMultiCheck';
import {globalStyles} from '../components/global.js';
import {Neighbors, Symbiosis} from '../../databases/allSchemas';

export default class symbiosisComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      list: [],
      object: {
        list1: [],
        list2: [],
        list3: [],
        list4: [],
      },
    };
  }

  onSelectedItemsChangeGood = (selectedItems) => {
    selectedItems.length === 0
      ? this.setState({selectedItems: []})
      : this.setState({
          selectedItems: [selectedItems[selectedItems.length - 1]],
        });
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

  symbiosisRelations = () => {
    Symbiosis(this.state.selectedItems[0])
      .then((object) => {
        console.log('mmmm', object);
        this.setState({object});
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.NeighnorsList();
      // Screen was focused
      // Do something
      if (this.state.selectedItems !== undefined && this.state.selectedItems !== null && this.state.selectedItems.length > 0) {
        this.symbiosisRelations()

      }

    });
    this.NeighnorsList();
  }

  render() {
    return (
      <Container style={{backgroundColor: '#fbfbfb'}}>
        <Content>
          <View>
            <App
              label="Choose your plant"
              list={this.state.list}
              selectedItems={this.state.selectedItems}
              onSelectedItemsChange={this.onSelectedItemsChangeGood}
            />
            <Button style={globalStyles.save} onPress={this.symbiosisRelations}>
              <Text>Show Symbiosis Relations</Text>
            </Button>

            {this.state.object.list1.length > 0 ? (
              <View style={{backgroundColor: '#A0CD64'}}>
                <View style={style.Symbiosis}>
                  <Text style={{color: '#F9FAFC'}}> Mutualism </Text>
                </View>
                <List style={{marginBottom: 15}}>
                  {this.state.object.list1.map((plant) => (
                    <ListItem avatar>
                      <Left>
                        <Thumbnail
                          source={
                            plant.picture !== undefined &&
                            plant.picture !== null
                              ? {uri: plant.picture}
                              : require('../assets/images/planter_icon_image.png')
                          }
                        />
                      </Left>
                      <Body>
                        <Text>{plant.name}</Text>
                        <Text note>
                          {plant.description !== undefined &&
                          plant.description !== null
                            ? plant.description
                            : 'plant.description'}
                        </Text>
                      </Body>
                    </ListItem>
                  ))}
                </List>
              </View>
            ) : null}

            {this.state.object.list2.length > 0 ? (
              <View style={{backgroundColor: '#FFFC55'}}>
                <View style={style.Symbiosis}>
                  <Text style={{color: '#F9FAFC'}}> Commensalism </Text>
                </View>

                <List style={{marginBottom: 15}}>
                  {this.state.object.list2.map((plant) => (
                    <ListItem avatar>
                      <Left>
                        <Thumbnail
                          source={
                            plant.picture !== undefined &&
                            plant.picture !== null
                              ? {uri: plant.picture}
                              : require('../assets/images/planter_icon_image.png')
                          }
                        />
                      </Left>
                      <Body>
                        <Text>{plant.name}</Text>
                        <Text note>
                          {plant.description !== undefined &&
                          plant.description !== null
                            ? plant.description
                            : 'plant.description'}
                        </Text>
                      </Body>
                    </ListItem>
                  ))}
                </List>
              </View>
            ) : null}

            {this.state.object.list3.length > 0 ? (
              <View style={{backgroundColor: '#F07959'}}>
                <View style={style.Symbiosis}>
                  <Text style={{color: '#F9FAFC'}}> Amensalism </Text>
                </View>

                <List style={{marginBottom: 15}}>
                  {this.state.object.list3.map((plant) => (
                    <ListItem avatar>
                      <Left>
                        <Thumbnail
                          source={
                            plant.picture !== undefined &&
                            plant.picture !== null
                              ? {uri: plant.picture}
                              : require('../assets/images/planter_icon_image.png')
                          }
                        />
                      </Left>
                      <Body>
                        <Text>{plant.name}</Text>
                        <Text note>
                          {plant.description !== undefined &&
                          plant.description !== null
                            ? plant.description
                            : 'plant.description'}
                        </Text>
                      </Body>
                    </ListItem>
                  ))}
                </List>
              </View>
            ) : null}

            {this.state.object.list4.length > 0 ? (
              <View style={{backgroundColor: '#94B3DF'}}>
                <View style={style.Symbiosis}>
                  <Text style={{color: '#F9FAFC'}}> Parasitism </Text>
                </View>

                <List style={{marginBottom: 15}}>
                  {this.state.object.list4.map((plant) => (
                    <ListItem avatar>
                      <Left>
                        <Thumbnail
                          source={
                            plant.picture !== undefined &&
                            plant.picture !== null
                              ? {uri: plant.picture}
                              : require('../assets/images/planter_icon_image.png')
                          }
                        />
                      </Left>
                      <Body>
                        <Text>{plant.name}</Text>
                        <Text note>
                          {plant.description !== undefined &&
                          plant.description !== null
                            ? plant.description
                            : 'plant.description'}
                        </Text>
                      </Body>
                    </ListItem>
                  ))}
                </List>
              </View>
            ) : null}
          </View>
        </Content>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  Show: {
    borderRadius: 5,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#155E63',
    padding: 8,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  Symbiosis: {
    borderRadius: 5,
    marginLeft: 15,
    marginRight: 15,
    paddingVertical: 5,
    backgroundColor: '#155E63',
    marginTop: 15,
  },
});
