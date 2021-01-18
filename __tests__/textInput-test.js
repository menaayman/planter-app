import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import TextInput from '../src/components/textInput';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

import {shallow} from 'enzyme';
import {JestEnvironment} from '@jest/environment';

Jest.mock(this.props.onChange(this.props.name, value));

test('should works', () => {
  expect(true).toBeTruthy();
});
it('renders correctly', () => {
  renderer.create(<TextInput />).toJSON();
});

test('should render the text input', () => {
  const wrapper = shallow(<TextInput />);
  expect(wrapper.find('Item'));
});
it('should return a text', () => {
  const instanceOf = renderer.create(<TextInput />).getInstance();
  instanceOf._handleChange('Menna');
  expect(instanceOf.state.val).toEqual('Menna');
});
