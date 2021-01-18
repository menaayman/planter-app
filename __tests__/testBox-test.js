import React from 'react';
import TextBox from '../src/components/textBox';
import 'react-native';
import renderer from 'react-test-renderer';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

import {shallow} from 'enzyme';

test('should works', () => {
  expect(true).toBeTruthy();
});
it('renders correctly', () => {
  renderer.create(<TextBox />);
});
test('should render the text input', () => {
  const wrapper = shallow(<TextBox />);
  expect(wrapper.find('Text'));
});
