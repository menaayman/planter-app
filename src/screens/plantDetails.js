
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import {Text} from 'native-base';
import FlatButton from '../components/button';
import TextBox from '../components/textBox';

import {deletePlant} from '../../databases/allSchemas';

function PlantDetailsComponent(properties) {
  const [name, setName] = useState('Plant 1');
  const [description, setDescription] = useState('Plant description');
  const [production, setProduction] = useState('1000');
  const [picture, setPicture] = useState(undefined);
  const [lightCondition, setlightCondition] = useState('Semi-shade ');
  const [soilCondition, setsoilCondition] = useState('Silt Soil');
  const [waterCondition, setwaterCondition] = useState('Low  Water');
  const [goodNeighbours, setgoodNeighbours] = useState([]);
  const [badNeighbours, setbadNeighbours] = useState([]);

  useEffect(() => {
    if (
      properties.route.params !== undefined &&
      properties.route.params.plant !== undefined
    ) {
      //Get plant object from properties
      const plant = properties.route.params.plant;
      //Get Complete Plants List from properties
      const completePlantList = properties.route.params.plantList;

      // get Good Neigbhour Names from DB

      let goodNeighboursArray = [];
      if (
        plant.goodNeighborsList !== undefined &&
        plant.goodNeighborsList !== null &&
        plant.goodNeighborsList.length > 0 &&
        completePlantList !== undefined &&
        completePlantList !== null &&
        completePlantList.length > 0
      ) {
        plant.goodNeighborsList.map((neighbor, index) => {
          completePlantList.map((orginal,) => {
            if (orginal.id === neighbor) {
              let neighborObject = {
                name: orginal.name,
                key: index,
              };
              goodNeighboursArray.push(neighborObject);
            }
          });
        });
      }
      setgoodNeighbours(goodNeighboursArray);

      // get bad Neigbhour Names from DB
      let badNeighboursArray = [];
      if (
        plant.badNeighborsList !== undefined &&
        plant.badNeighborsList !== null &&
        plant.badNeighborsList.length > 0 &&
        completePlantList !== undefined &&
        completePlantList !== null &&
        completePlantList.length > 0
      ) {
        plant.badNeighborsList.map((neighbor, index) => {
          completePlantList.map((orginal,) => {
            if (orginal.id === neighbor) {
              let neighborObject = {
                name: orginal.name,
                key: index,
              };
              badNeighboursArray.push(neighborObject);
            }
          });
        });
      }
      setbadNeighbours(badNeighboursArray);
      setName(plant.name !== undefined ? plant.name : '');
      setPicture(plant.picture !== undefined ? plant.picture : '');
      setDescription(plant.description !== undefined ? plant.description : '');
      setProduction(
        plant.maxProduction !== undefined ? plant.maxProduction : '',
      );

      // assign  watering Condition Name
      if (plant.wateringConditionId === 1) {
        setwaterCondition('Low  Water');
      } else if (plant.wateringConditionId === 2) {
        setwaterCondition('Medium  Water');
      } else if (plant.wateringConditionId === 3) {
        setwaterCondition('High  Water');
      } else {
        setwaterCondition('');
      }

      // assign  Soil Condition Name
      if (plant.soilConditionId === 1) {
        setsoilCondition('Sandy Soil');
      } else if (plant.soilConditionId === 2) {
        setsoilCondition('Clay Soil');
      } else if (plant.soilConditionId === 3) {
        setsoilCondition('Silty Soil');
      } else {
        setsoilCondition('');
      }

      // assign  Lighting Condition Name
      if (plant.lightConditionId === 1) {
        setlightCondition('Full-Light');
      } else if (plant.lightConditionId === 2) {
        setlightCondition('Semi-Shade');
      } else if (plant.lightConditionId === 3) {
        setlightCondition('Shade');
      } else {
        setlightCondition('');
      }
    }
  }, [properties.route.params]);

  function deletePlantFunc() {
    if (
      properties.route.params !== undefined &&
      properties.route.params.plant !== undefined &&
      properties.route.params.plant.id !== undefined
    ) {
      const plantId = properties.route.params.plant.id;
      console.log('deleteisitcalled', plantId);
      deletePlant(plantId)
        .then(() => {
          console.log('delete success');
          Alert.alert('DELETED SUCCESSFULLY');
          properties.navigation.navigate('Home');
        })
        .catch((error) => {
          Alert.alert(`Insert new todoList error ${error}`);
        });
    }
  }

  const numColumns = 2;
  return (
    <ScrollView style={{backgroundColor: '#fbfbfb'}}>
      <View style={style.container}>
        <Image
          style={style.imageStyle}
          source={
            picture !== undefined && picture !== null
              ? {uri: picture}
              : require('../assets/images/planter_icon_image.png')
          }
        />

        <Text style={style.nameText}>{name}</Text>

        {description.length > 0 ? (
          <Text
            style={{marginBottom: 15, color: '#155E63', marginHorizontal: 10}}>
            {description}
          </Text>
        ) : null}

        {production.length > 0 ? (
          <Text style={style.borderText}> {production} grams per plant </Text>
        ) : null}

        <View style={style.conditionSperator}>
          {lightCondition.length > 0 ? <TextBox text={lightCondition} /> : null}

          {waterCondition.length > 0 ? <TextBox text={waterCondition} /> : null}

          {soilCondition.length > 0 ? <TextBox text={soilCondition} /> : null}
        </View>

        {goodNeighbours !== undefined &&
        goodNeighbours !== null &&
        goodNeighbours.length > 0 ? (
          <View style={style.neighbourCondition}>
            <Text style={{color: '#F9FAFC'}}> Good Neighbors</Text>
          </View>
        ) : null}

        {goodNeighbours !== undefined &&
        goodNeighbours !== null &&
        goodNeighbours.length > 0 ? (
          <FlatList
            data={goodNeighbours}
            renderItem={({item}) => (
              <Text style={style.listStyle}>{item.name}</Text>
            )}
            numColumns={numColumns}
          />
        ) : null}
        {badNeighbours !== undefined &&
        badNeighbours !== null &&
        badNeighbours.length > 0 ? (
          <View style={style.neighbourCondition}>
            <Text style={{color: '#F9FAFC'}}> Bad Neighbors</Text>
          </View>
        ) : null}

        {badNeighbours !== undefined &&
        badNeighbours !== null &&
        badNeighbours.length > 0 ? (
          <FlatList
            data={badNeighbours}
            renderItem={({item}) => (
              <Text style={style.listStyle}>{item.name}</Text>
            )}
            numColumns={numColumns}
          />
        ) : null}

        <View style={style.buttonSperator}>
          <View style={{marginHorizontal: 50}}>
            <FlatButton
              text="  edit  "
              onPress={() =>
                properties.navigation.navigate('AddEditPlant', {
                  plant: properties.route.params.plant,
                })
              }
            />
          </View>
          <View style={{marginHorizontal: 50}}>
            <FlatButton text="Delete" onPress={deletePlantFunc} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSperator: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  conditionSperator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  neighbourCondition: {
    borderRadius: 4,
    marginRight: 0,
    paddingVertical: 3,
    paddingRight: 250,
    backgroundColor: '#155E63',
    marginBottom: 20,
  },

  listStyle: {
    marginHorizontal: 10,
    borderRadius: 2,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#76B39D',
    marginBottom: 20,
    marginLeft: 50,
    marginRight: 50,
  },
  borderText: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#155E63',
    color: '#155E63',
    margin: 20,
  },

  nameText: {
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: 40,
    color: '#155E63',
    textAlign: 'center',
  },
  imageStyle: {
    borderColor: '#76B39D',
    borderWidth: 5,
    height: 200,
    width: 200,
    borderRadius: 200 / 2,
    marginTop: 20,
  },
});

export default PlantDetailsComponent;
