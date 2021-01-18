

import React, {useEffect, useState} from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Header,
  Thumbnail,
  Text,
  Item,
  Icon,
  Input,
  Button,
  View,
} from 'native-base';
import AddIcon from '../components/addButton';


import {queryAllPlants, searchAllPlants} from '../../databases/allSchemas';
import realm from '../../databases/allSchemas';

function HomeScreen({navigation}) {
  const [plantsList, setPlantsList] = useState([]);
  useEffect(() => {
    reloadData();
    realm.addListener('change', () => {
      reloadData();
    });
  }, []);

  function reloadData() {
    queryAllPlants()
      .then((plantsListArray) => {
        setPlantsList(plantsListArray);
        console.log('retreive data success', plantsListArray.length);
      })
      .catch((error) => {
        setPlantsList([]);
        console.log('error', error);
      });
  }
  function searchData(textValue) {
    searchAllPlants(textValue)
      .then((plantsListArray) => {
        setPlantsList(plantsListArray);
      })
      .catch((error) => {
        setPlantsList([]);
        console.log('error', error);
      });
  }
  return (
    <>
      <Container style={{backgroundColor: '#fbfbfb'}}>
        <Content>
          <Header
            rounded
            style={{backgroundColor: '#155E63'}}
            androidStatusBarColor="#155E63"
            searchBar
            autoCorrect={false}>
            <Item>
              <Icon name="ios-search" />
              <Input
                onChangeText={(text) => searchData(text)} // <-- Here
                placeholder="Search"
              />
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
          </Header>
          {plantsList.length > 0 ? (
            <List>
              {plantsList.map((plant) => (
                <ListItem
                  onPress={() =>
                    navigation.navigate('Details', {
                      plant: plant,
                      plantList: plantsList,
                    })
                  }
                  avatar>
                  <Left>
                    <Thumbnail
                      source={
                        plant.picture !== undefined && plant.picture !== null
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
          ) : (
            <View style={{alignItems: 'center', opacity: 10}}>
              <AddIcon
                text ="  Add Plant  "
                onPress={() => navigation.navigate('AddEditPlant')}
              />
            </View>
          )}
        </Content>
      </Container>
    </>
  );
}
export default HomeScreen;
