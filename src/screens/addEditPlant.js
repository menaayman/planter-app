import React, {Component} from 'react';
import {View, Alert} from 'react-native';
import {
  insertNewPlant,
  PlantNamesList,
  updateplant,
  Neighbors,
} from '../../databases/allSchemas';
import {Container, Content, Button, Text} from 'native-base';
import {globalStyles} from '../components/global.js';
import TextInput from '../components/textInput.js';
import Desc from '../components/multilinesInput.js';
import {Formik} from 'formik';
import * as yup from 'yup';
import AttachButton from '../components/attachButton.js';
import PickerList from '../components/pickerList';
import App from '../components/DropdownMultiCheck';

export default class RegularTextboxExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: '',
      description: '',
      picture: null,
      maxProduction: '',
      lightConditionId: 0,
      soilConditionId: 0,
      wateringConditionId: 0,
      validationPlantNamesList: [],
      goodNeighborsList: [],
      badNeighborsList: [],
      list: [],
      cond: false,
    };
  }
  onSelectedItemsChangeGood = (selectedItems) => {
    let duplicate = false;
    for (let p of this.state.badNeighborsList) {
      if (selectedItems.includes(p)) {
        alert('you cannot have the same plant on both lists');
        duplicate = true;
      }
    }
    if (!duplicate) {
      this.setState({goodNeighborsList: selectedItems});
    }
    //Set Selected Items
  };
  onSelectedItemsChangeBad = (selectedItems) => {
    let duplicate = false;
    for (let p of this.state.goodNeighborsList) {
      if (selectedItems.includes(p)) {
        alert('you cannot have the same plant on both lists');
        duplicate = true;
      }
    }
    if (!duplicate) {
      this.setState({badNeighborsList: selectedItems});
    }
    //Set Selected Items
  };
  NeighnorsList = () => {
    let IdCheck =
      this.props.route.params !== undefined
        ? this.props.route.params.plant.id
        : 0;
    Neighbors(IdCheck)
      .then((list) => {
        this.setState({list});
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  namesList = () => {
    PlantNamesList()
      .then((validationPlantNamesList) => {
        this.setState({validationPlantNamesList});
        console.log(
          'retreive data success',
          this.state.validationPlantNamesList,
        );
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  validateChange = (val) => {
    if (val !== undefined) {
      let flag = !this.state.validationPlantNamesList.includes(
        val.toLowerCase().trim(),
      );
      if (!this.state.cond) {
        return flag;
      }
      if (
        this.props.route.params.plant.name.toLowerCase().trim() ===
        val.toLowerCase().trim()
      ) {
        return true;
      }
      return flag;
    } else {
      return true;
    }
  };

  componentDidMount() {
    this.handleInitialEditValues();
    this.namesList();
    this.NeighnorsList();
  }
  handleInitialEditValues = () => {
    if (
      this.props.route.params !== undefined &&
      this.props.route.params.plant !== undefined
    ) {
      console.log('this.props.route.params.plant', this.state.cond);
      const plant = this.props.route.params.plant;

      this.setState({
        id: plant.id,
        name: plant.name,
        description: plant.description,
        picture: plant.picture,
        maxProduction: plant.maxProduction,
        lightConditionId: plant.lightConditionId,
        soilConditionId: plant.soilConditionId,
        wateringConditionId: plant.wateringConditionId,
        goodNeighborsList: plant.goodNeighborsList,
        badNeighborsList: plant.badNeighborsList,
        cond: true,
      });
    }
  };
  _handlesubmit = (values, onSubmitProps) => {
    console.log('addisitcalled');
    const newPlant = {
      id: this.state.cond ? values.id : Math.floor(Date.now() / 1000),
      name: values.name,
      description: values.description,
      picture: values.picture,
      maxProduction: values.maxProduction,
      wateringConditionId: values.wateringConditionId,
      soilConditionId: values.soilConditionId,
      lightConditionId: values.lightConditionId,
      goodNeighborsList: this.state.goodNeighborsList,
      badNeighborsList: this.state.badNeighborsList,
    };
    if (this.state.cond) {
      updateplant(newPlant)
        .then((returnObject) => {
          onSubmitProps.resetForm();
          Alert.alert('UPDATED SUCCESSFULLY');
          console.log('returnObject', returnObject);
          this.props.navigation.navigate('Home');
        })
        .catch((error) => {
          alert(`Insert new todoList error ${error}`);
        });
    } else {
      insertNewPlant(newPlant)
        .then((returnObject) => {
          onSubmitProps.resetForm();
          Alert.alert('ADDED SUCCESSFULLY');
          console.log('returnObject', returnObject);
          this.props.navigation.navigate('Home');
        })
        .catch((error) => {
          alert(`Insert new todoList error ${error}`);
        });
    }
  };

  ReviewSchema = yup.object({
    name: yup
      .string()
      .required('*This Field is Required')
      .min(3, '*Name has to be at least 3 characters')
      .test('is_duplicate', 'Plant Already Exists', (val) => {
        return this.validateChange(val);
      }),
    description: yup.string(),
    maxProduction: yup.number().typeError('*Production must be a number'),
  });

  render() {
    return (
      <Container style={{backgroundColor: '#fbfbfb'}}>
        <Content>
          <Formik
            enableReinitialize
            initialValues={{
              id: this.state.id,
              name: this.state.name,
              description: this.state.description,
              picture: this.state.picture,
              maxProduction: this.state.maxProduction,
              lightConditionId: this.state.lightConditionId,
              soilConditionId: this.state.soilConditionId,
              wateringConditionId: this.state.wateringConditionId,
            }}
            onSubmit={this._handlesubmit}
            validationSchema={this.ReviewSchema}>
            {({
              values,
              handleSubmit,
              setFieldValue,
              errors,
              touched,
              setFieldTouched,
              isValid,
              isSubmitting,
            }) => (
              <View>
                <TextInput
                  placeholderText="Plant Name"
                  value={values.name}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name="name"
                  error={touched.name && errors.name}
                />

                <Desc
                  placeholderText=" Plant Description"
                  value={values.description}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name="description"
                  error={touched.description && errors.description}
                />

                <TextInput
                  placeholderText="Maximum Production Per Plant"
                  value={values.maxProduction}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  keyboardType={'numeric'}
                  name="maxProduction"
                  error={touched.maxProduction && errors.maxProduction}
                />

                <AttachButton
                  name="picture"
                  value={values.picture}
                  onChange={setFieldValue}
                />

                <PickerList
                  name="wateringConditionId"
                  value={values.wateringConditionId}
                  onChange={setFieldValue}
                  label="Select Watering Level"
                  label1="Low"
                  label2="Medium"
                  label3="High"
                />

                <PickerList
                  name="soilConditionId"
                  value={values.soilConditionId}
                  onChange={setFieldValue}
                  label="Select Soil Type"
                  label1="Sandy Soil"
                  label2="Clay Soil"
                  label3="Silty Soil"
                />

                <PickerList
                  name="lightConditionId"
                  value={values.lightConditionId}
                  onChange={setFieldValue}
                  label="Select Light Condition"
                  label1="Full-Light"
                  label2="Semi-Shade"
                  label3="Shade"
                />
                <App
                  name="goodNeighborsList"
                  label="Good Neighbors"
                  value={values.goodNeighborsList}
                  onChange={setFieldValue}
                  list={this.state.list}
                  selectedItems={this.state.goodNeighborsList}
                  onSelectedItemsChange={this.onSelectedItemsChangeGood}
                />
                <App
                  name="badNeighborsList"
                  label="Bad Neighbors "
                  value={values.badNeighborsList}
                  onChange={setFieldValue}
                  list={this.state.list}
                  selectedItems={this.state.badNeighborsList}
                  onSelectedItemsChange={this.onSelectedItemsChangeBad}
                />
                <Button
                  disabled
                  block
                  style={isValid ? globalStyles.save : globalStyles.save1}
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}>
                  <Text>Save</Text>
                </Button>

                <Button
                  style={globalStyles.save}
                  onPress={() => this.props.navigation.navigate('Home')}>
                  <Text>Go To Home Page</Text>
                </Button>
              </View>
            )}
          </Formik>
        </Content>
      </Container>
    );
  }
}
