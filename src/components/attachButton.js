import React, {Component} from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {globalStyles} from './global';

const Options = {
  title: 'Select Avatar',
  takePhotoButtonTitle: 'Take a photo with your camera',
  chooseFromLibraryButtonTitles: 'choose a photo from your gallery',
};

export default class AttachButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: 'Add photo',
    };
  }

  menna = () =>
    ImagePicker.showImagePicker(Options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let source = 'file://' + response.path;
        this.props.onChange(this.props.name, source);
        this.setState({
          file: response.fileName,
        });
      }
    });

  render() {
    return (
      <View style={globalStyles.row}>
        <View style={globalStyles.border}>
          <Text>{this.state.file}</Text>
        </View>

        <TouchableOpacity onPress={this.menna}>
          <View style={globalStyles.button1}>
            <Image source={require('../assets/images/clip.png')} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
